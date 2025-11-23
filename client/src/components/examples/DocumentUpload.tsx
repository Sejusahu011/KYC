import { useState } from "react";
import DocumentUpload from "../DocumentUpload";

export default function DocumentUploadExample() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="p-8 bg-background max-w-2xl">
      <DocumentUpload
        title="Upload Aadhar Card Front"
        description="Please upload a clear image of the front side of your Aadhar card"
        onUpload={(file) => {
          console.log("File uploaded:", file.name);
          setFile(file);
        }}
        onRemove={() => {
          console.log("File removed");
          setFile(null);
        }}
        uploadedFile={file}
      />
    </div>
  );
}
