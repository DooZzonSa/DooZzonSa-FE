type ProgressBarProps = {
  currentStep: number;
  totalSteps?: number;
};

export default function ProgressBar({
  currentStep,
  totalSteps = 3,
}: ProgressBarProps) {
  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${totalSteps}, minmax(0, 1fr))` }}
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
    >
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isActive = index < currentStep;
        return (
          <div
            key={`step-${index + 1}`}
            className={`h-1 rounded-lg transition-colors ${
              isActive ? "bg-[#194268]" : "bg-slate-200"
            }`}
          />
        );
      })}
    </div>
  );
}

