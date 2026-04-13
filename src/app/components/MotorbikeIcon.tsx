interface MotorbikeIconProps {
  className?: string;
}

export function MotorbikeIcon({ className = "w-6 h-6" }: MotorbikeIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Rear wheel */}
      <circle cx="5.5" cy="17" r="2.5" />
      {/* Front wheel */}
      <circle cx="18.5" cy="17" r="2.5" />
      {/* Main frame: rear axle → seat post → head tube */}
      <path d="M5.5 17 L9 10 L14 10 L18.5 17" />
      {/* Fuel tank / body top */}
      <path d="M9 10 L11 6.5 L15.5 6.5 L17 10" />
      {/* Seat */}
      <path d="M11 6.5 L14 6.5" />
      {/* Handlebar */}
      <path d="M17 8 L20.5 8" />
      <path d="M20.5 7 L20.5 9.5" />
    </svg>
  );
}
