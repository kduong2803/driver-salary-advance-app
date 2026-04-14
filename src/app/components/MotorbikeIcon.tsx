import { Bike } from "lucide-react";

interface MotorbikeIconProps {
  className?: string;
}

export function MotorbikeIcon({ className = "w-6 h-6" }: MotorbikeIconProps) {
  return <Bike className={className} />;
}
