import { useState } from "react";
import { Shield, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProgressStepper from "@/components/ProgressStepper";
import DocumentUpload from "@/components/DocumentUpload";
import PhotoCapture from "@/components/PhotoCapture";
import SignaturePad from "@/components/SignaturePad";
import VerificationComplete from "@/components/VerificationComplete";

interface KYCData {
  aadharFront: File | null;
  aadharBack: File | null;
  panCard: File | null;
  photo: File | null;
  signature: string | null;
}

export default function KYCVerification() {
  const [currentStep, setCurrentStep] = useState(1);
  const [kycData, setKycData] = useState<KYCData>({
    aadharFront: null,
    aadharBack: null,
    panCard: null,
    photo: null,
    signature: null,
  });
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    { id: 1, label: "Aadhar Card", completed: currentStep > 1, current: currentStep === 1 },
    { id: 2, label: "PAN Card", completed: currentStep > 2, current: currentStep === 2 },
    { id: 3, label: "Photo", completed: currentStep > 3, current: currentStep === 3 },
    { id: 4, label: "Signature", completed: currentStep > 4, current: currentStep === 4 },
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return kycData.aadharFront !== null && kycData.aadharBack !== null;
      case 2:
        return kycData.panCard !== null;
      case 3:
        return kycData.photo !== null;
      case 4:
        return kycData.signature !== null;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit and show completion
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateReferenceNumber = () => {
    return `KYC${new Date().getFullYear()}${Math.random().toString().slice(2, 14)}`;
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                <h1 className="text-xl font-bold text-foreground">Secure KYC Verification</h1>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <VerificationComplete
            data={{
              ...kycData,
              referenceNumber: generateReferenceNumber(),
            }}
            onDownload={() => {
              console.log("Download verification summary");
            }}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground">Secure KYC Verification</h1>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>256-bit SSL Encrypted</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-12">
          <ProgressStepper steps={steps} />
        </div>

        <div className="space-y-8">
          {currentStep === 1 && (
            <>
              <DocumentUpload
                title="Aadhar Card - Front Side"
                description="Upload a clear image of the front side of your Aadhar card"
                onUpload={(file) => setKycData({ ...kycData, aadharFront: file })}
                onRemove={() => setKycData({ ...kycData, aadharFront: null })}
                uploadedFile={kycData.aadharFront}
              />
              <DocumentUpload
                title="Aadhar Card - Back Side"
                description="Upload a clear image of the back side of your Aadhar card"
                onUpload={(file) => setKycData({ ...kycData, aadharBack: file })}
                onRemove={() => setKycData({ ...kycData, aadharBack: null })}
                uploadedFile={kycData.aadharBack}
              />
            </>
          )}

          {currentStep === 2 && (
            <DocumentUpload
              title="PAN Card"
              description="Upload a clear image of your PAN card"
              onUpload={(file) => setKycData({ ...kycData, panCard: file })}
              onRemove={() => setKycData({ ...kycData, panCard: null })}
              uploadedFile={kycData.panCard}
            />
          )}

          {currentStep === 3 && (
            <PhotoCapture
              onCapture={(file) => setKycData({ ...kycData, photo: file })}
              onRemove={() => setKycData({ ...kycData, photo: null })}
              capturedPhoto={kycData.photo}
            />
          )}

          {currentStep === 4 && (
            <SignaturePad
              onSave={(signature) => setKycData({ ...kycData, signature })}
              savedSignature={kycData.signature}
            />
          )}
        </div>

        <div className="flex gap-4 mt-12 pt-8 border-t">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            data-testid="button-previous"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="ml-auto"
            data-testid="button-next"
          >
            {currentStep === 4 ? "Submit" : "Next"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </main>
    </div>
  );
}
