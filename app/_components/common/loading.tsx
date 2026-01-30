type LoadingAnimationProps = {
  className?: string;
};

export default function LoadingAnimation({
  className = "",
}: LoadingAnimationProps) {
  return (
    <div
      className={`h-50 w-50 animate-spin rounded-full border-12 border-slate-200 border-t-[#86AFCF] ${className}`}
      aria-hidden="true"
    />
  );
}

