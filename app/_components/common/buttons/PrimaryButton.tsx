import type { ButtonHTMLAttributes, ReactNode } from "react";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export default function PrimaryButton({
  children,
  className = "",
  type = "button",
  ...rest
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-2xl bg-slate-200 px-10 py-4 text-lg font-semibold text-slate-700 shadow-sm transition duration-200 enabled:hover:bg-slate-300 enabled:hover:shadow-md enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

