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
      <circle cx="5" cy="17" r="2.5" />
      {/* Front wheel */}
      <circle cx="19" cy="17" r="2.5" />
      {/* Step-through floor (key scooter feature — horizontal, not a bicycle V-frame) */}
      <path d="M7.5 14.5 L17 14.5" />
      {/* Rear body: from rear wheel up to seat */}
      <path d="M5 14.5 L6.5 11 L9 9.5" />
      {/* Seat (horizontal, slightly raised at rear) */}
      <path d="M8.5 9.5 L12.5 9.5" />
      {/* Main body connecting seat down to floor */}
      <path d="M6.5 11 L7.5 14.5" />
      {/* Front fairing: from seat area forward and down */}
      <path d="M12.5 9.5 L15.5 10.5 L17 14.5" />
      {/* Front fork */}
      <path d="M17 14.5 L18 14 L19 14.5" />
      {/* Headtube / front upper fork */}
      <path d="M16 10 L17.5 8" />
      {/* Handlebars */}
      <path d="M15.5 8 L20.5 8" />
      <path d="M20.5 7 L20.5 9.5" />
    </svg>
  );
}
