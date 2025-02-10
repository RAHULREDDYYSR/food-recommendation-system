import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export const calculateBMI = (weightKg, heightCm) => {
  if (typeof weightKg !== 'number' || typeof heightCm !== 'number' || isNaN(weightKg) || isNaN(heightCm)) {
    return null; // Or throw an error, depending on your error handling strategy
  }

  if (!weightKg || !heightCm || heightCm <= 0) {
    return null;
  }

  const heightM = heightCm / 100;

  if (heightM <= 0) {
    return null;
  }

  const bmi = weightKg / (heightM * heightM);
  return bmi.toFixed(1);
};