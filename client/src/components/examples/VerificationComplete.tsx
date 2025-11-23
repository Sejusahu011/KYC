import VerificationComplete from "../VerificationComplete";

export default function VerificationCompleteExample() {
  // Create mock files for demonstration
  const createMockFile = (name: string) => {
    return new File([""], name, { type: "image/jpeg" });
  };

  const mockData = {
    aadharFront: createMockFile("aadhar-front.jpg"),
    aadharBack: createMockFile("aadhar-back.jpg"),
    panCard: createMockFile("pan-card.jpg"),
    photo: createMockFile("photo.jpg"),
    signature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
    referenceNumber: "KYC2024001234567",
  };

  return (
    <div className="p-8 bg-background">
      <VerificationComplete
        data={mockData}
        onDownload={() => console.log("Download clicked")}
      />
    </div>
  );
}
