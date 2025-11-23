import { CheckCircle2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface VerificationData {
  aadharFront: File | null;
  aadharBack: File | null;
  panCard: File | null;
  photo: File | null;
  signature: string | null;
  referenceNumber: string;
}

interface VerificationCompleteProps {
  data: VerificationData;
  onDownload?: () => void;
}

export default function VerificationComplete({
  data,
  onDownload,
}: VerificationCompleteProps) {
  const documents = [
    { label: "Aadhar Front", file: data.aadharFront },
    { label: "Aadhar Back", file: data.aadharBack },
    { label: "PAN Card", file: data.panCard },
    { label: "Photo", file: data.photo },
  ];

  return (
    <div className="max-w-3xl mx-auto text-center space-y-8">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-12 h-12 text-primary" data-testid="icon-success" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Verification Complete!
        </h2>
        <p className="text-muted-foreground">
          Your KYC documents have been submitted successfully
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Reference Number</p>
            <p className="text-xl font-semibold text-foreground" data-testid="text-reference-number">
              {data.referenceNumber}
            </p>
          </div>

          <div className="pt-4 border-t">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Uploaded Documents
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {documents.map((doc, index) => (
                doc.file && (
                  <div key={index} className="space-y-2">
                    <div className="aspect-square bg-muted rounded-md overflow-hidden">
                      <img
                        src={URL.createObjectURL(doc.file)}
                        alt={doc.label}
                        className="w-full h-full object-cover"
                        data-testid={`img-document-${index}`}
                      />
                    </div>
                    <p className="text-xs font-medium text-muted-foreground text-center">
                      {doc.label}
                    </p>
                  </div>
                )
              ))}
              {data.signature && (
                <div className="space-y-2">
                  <div className="aspect-square bg-muted rounded-md overflow-hidden flex items-center justify-center p-2">
                    <img
                      src={data.signature}
                      alt="Signature"
                      className="max-w-full max-h-full object-contain"
                      data-testid="img-signature"
                    />
                  </div>
                  <p className="text-xs font-medium text-muted-foreground text-center">
                    Signature
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      <Button onClick={onDownload} data-testid="button-download-summary">
        <Download className="w-4 h-4 mr-2" />
        Download Verification Summary
      </Button>
    </div>
  );
}
