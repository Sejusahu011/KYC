import { Camera, Upload, X, SwitchCamera } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PhotoCaptureProps {
  onCapture: (file: File) => void;
  onRemove?: () => void;
  capturedPhoto?: File | null;
}

export default function PhotoCapture({
  onCapture,
  onRemove,
  capturedPhoto,
}: PhotoCaptureProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [cameraError, setCameraError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup camera stream on unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    // Restart camera when facing mode changes
    if (isCameraActive) {
      initializeCamera();
    }
  }, [facingMode]);

  const initializeCamera = async () => {
    try {
      setCameraError(null);
      
      // Stop existing stream if any
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const constraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setIsCameraActive(true);
    } catch (error) {
      console.error("Camera error:", error);
      setCameraError("Unable to access camera. Please check permissions.");
      setIsCameraActive(false);
    }
  };

  const startCamera = () => {
    initializeCamera();
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const switchCamera = () => {
    setFacingMode(prev => prev === "user" ? "environment" : "user");
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to blob and then to file
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `selfie-${Date.now()}.jpg`, {
          type: "image/jpeg",
        });
        onCapture(file);
        stopCamera();
      }
    }, "image/jpeg", 0.95);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onCapture(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-foreground">Facial Photo Verification</h3>
      <p className="text-sm text-muted-foreground">
        Take a clear selfie or upload a recent photo
      </p>

      {capturedPhoto ? (
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
                <img
                  src={URL.createObjectURL(capturedPhoto)}
                  alt="Captured"
                  className="w-full h-full object-cover"
                  data-testid="img-captured-photo"
                />
              </div>
              <div>
                <p className="font-medium text-foreground">Photo captured</p>
                <p className="text-sm text-muted-foreground">
                  {(capturedPhoto.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={onRemove}
              data-testid="button-remove-photo"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      ) : isCameraActive ? (
        <Card className="p-4">
          <div className="relative bg-black rounded-md overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full aspect-video object-cover"
              data-testid="video-camera-preview"
            />
            <canvas ref={canvasRef} className="hidden" />
            
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                size="icon"
                variant="secondary"
                onClick={switchCamera}
                data-testid="button-switch-camera"
                className="bg-black/50 backdrop-blur-sm hover:bg-black/70 border-white/20"
              >
                <SwitchCamera className="w-5 h-5 text-white" />
              </Button>
            </div>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
              <Button
                variant="secondary"
                onClick={stopCamera}
                data-testid="button-cancel-camera"
                className="bg-black/50 backdrop-blur-sm hover:bg-black/70 border-white/20 text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={capturePhoto}
                data-testid="button-capture-photo"
                className="bg-primary hover:bg-primary/90"
              >
                <Camera className="w-4 h-4 mr-2" />
                Capture Photo
              </Button>
            </div>
          </div>
          {cameraError && (
            <p className="text-sm text-destructive mt-2">{cameraError}</p>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            className="border-2 border-dashed cursor-pointer hover-elevate active-elevate-2"
            onClick={handleUploadClick}
            data-testid="card-upload-photo"
          >
            <div className="p-8 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-3">
                <Upload className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground mb-1">Upload Photo</p>
              <p className="text-xs text-muted-foreground">From gallery</p>
            </div>
          </Card>

          <Card
            className="border-2 border-dashed cursor-pointer hover-elevate active-elevate-2"
            onClick={startCamera}
            data-testid="card-capture-photo"
          >
            <div className="p-8 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-3">
                <Camera className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground mb-1">Take Photo</p>
              <p className="text-xs text-muted-foreground">Use camera</p>
            </div>
          </Card>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileSelect}
        data-testid="input-photo"
      />
    </div>
  );
}
