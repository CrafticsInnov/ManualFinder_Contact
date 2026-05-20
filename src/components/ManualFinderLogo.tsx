import { motion } from "motion/react";

export function ManualFinderLogo({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 300 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <path 
        d="M50 50V250M250 50V250M50 100C100 100 150 150 150 150C150 150 200 100 250 100M50 150C100 150 150 100 150 100C150 100 200 150 250 150" 
        stroke="#7EB1C2" 
        strokeWidth="20" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
}
