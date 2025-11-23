import ProgressStepper from "../ProgressStepper";

export default function ProgressStepperExample() {
  const steps = [
    { id: 1, label: "Aadhar Card", completed: true, current: false },
    { id: 2, label: "PAN Card", completed: false, current: true },
    { id: 3, label: "Photo", completed: false, current: false },
    { id: 4, label: "Signature", completed: false, current: false },
  ];

  return (
    <div className="p-8 bg-background">
      <ProgressStepper steps={steps} />
    </div>
  );
}
