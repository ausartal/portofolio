interface TagProps {
  readonly label: string;
  readonly className?: string;
}

/** Sharp rectangular category tag with 0 corner radius matching Figma comp. */
export function Tag({ label, className = "" }: TagProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-none border border-[#DADDDC] px-3 h-[26px] font-inter text-[12px] leading-none text-[#C6C6C6] whitespace-nowrap transition-colors duration-200 ${className}`}
    >
      {label}
    </span>
  );
}
