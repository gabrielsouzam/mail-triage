import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'gradient' | 'glass';
  hover?: boolean;
  className?: string;
}

export function Card({ children, variant = 'default', hover = true, className = '' }: CardProps) {
  const baseClasses = "relative overflow-hidden rounded-2xl p-6 transition-all duration-300";

  const variants = {
    default: "bg-white border border-[#d4c4a8] shadow-md",
    gradient: "bg-gradient-to-br from-white via-[#f9f6f1] to-[#f3ede3] border border-[#e8dcc4]/30 shadow-xl",
    glass: "bg-white/70 backdrop-blur-xl border border-[#d4c4a8]/20 shadow-2xl"
  };

  const hoverClasses = hover ? "hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`${baseClasses} ${variants[variant]} ${hoverClasses} ${className}`}
    >
      {hover && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
      )}

      {children}
    </motion.div>
  );
}
