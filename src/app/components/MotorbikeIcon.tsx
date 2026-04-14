interface MotorbikeIconProps {
  className?: string;
}

export function MotorbikeIcon({ className = "w-6 h-6" }: MotorbikeIconProps) {
  return (
    <span className={`flex items-center justify-center leading-none select-none ${className}`} role="img" aria-label="motorbike">
      🛵
    </span>
  );
}
