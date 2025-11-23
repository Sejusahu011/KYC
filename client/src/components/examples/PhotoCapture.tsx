import { useState } from "react";
import PhotoCapture from "../PhotoCapture";

export default function PhotoCaptureExample() {
  const [photo, setPhoto] = useState<File | null>(null);

  return (
    <div className="p-8 bg-background max-w-2xl">
      <PhotoCapture
        onCapture={(file) => {
          console.log("Photo captured:", file.name);
          setPhoto(file);
        }}
        onRemove={() => {
          console.log("Photo removed");
          setPhoto(null);
        }}
        capturedPhoto={photo}
      />
      <p className="mt-4 text-sm text-muted-foreground">
        Click "Take Photo" to open the camera. You can switch between front and back cameras using the switch button.
      </p>
    </div>
  );
}
