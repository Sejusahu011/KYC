import { useState } from "react";
import SignaturePad from "../SignaturePad";

export default function SignaturePadExample() {
  const [signature, setSignature] = useState<string | null>(null);

  return (
    <div className="p-8 bg-background max-w-2xl">
      <SignaturePad
        onSave={(sig) => {
          console.log("Signature saved");
          setSignature(sig);
        }}
        savedSignature={signature}
      />
    </div>
  );
}
