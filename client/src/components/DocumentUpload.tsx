import { Upload, X, FileText } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface DocumentUploadProps {
  title: string;
  description: string;
  onUpload: (file: File) => void;
  onRemove?: () => void;
  uploadedFile?: File | null;
  accept?: string;
}

export default function DocumentUpload({
  title,
  description,
  onUpload,
  onRemove,
  uploadedFile,
  accept = "image/*",
}: DocumentUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>

      {uploadedFile ? (
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground" data-testid="text-uploaded-filename">
                  {uploadedFile.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {(uploadedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={onRemove}
              data-testid="button-remove-file"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      ) : (
        <Card
          className={`border-2 border-dashed transition-colors cursor-pointer hover-elevate ${
            dragActive ? "border-primary bg-primary/5" : "border-border"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleClick}
          data-testid="card-upload-zone"
        >
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG up to 5MB
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleChange}
            data-testid="input-file"
          />
        </Card>
      )}
    </div>
  );
}
