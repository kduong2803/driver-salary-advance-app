interface MotorbikeIconProps {
  className?: string;
}

export function MotorbikeIcon({ className = "w-6 h-6" }: MotorbikeIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label="motorbike"
    >
      <path d="M19 7c0-1.1-.9-2-2-2h-3l2 4h-5.5l-.5-2H8C5.79 7 4 8.79 4 11s1.79 4 4 4 4-1.79 4-4h4c0 2.21 1.79 4 4 4s4-1.79 4-4h-3l-2-4h1c.55 0 1-.45 1-1V7zm-11 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm8 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
    </svg>
  );
}
