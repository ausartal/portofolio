interface TagProps {
  readonly label: string;
  readonly className?: string;
}

/** Pill-shaped category tag with the 1px hairline border used throughout the comp. */
export function Tag({ label, className = "" }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-hairline px-3 py-[0.375rem] font-[family-name:var(--font-inter)] text-micro leading-none text-muted-soft whitespace-nowrap ${className}`}
    >
      {label}
    </span>
  );
}
