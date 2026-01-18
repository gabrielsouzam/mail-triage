interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'gray' | 'green' | 'red' | 'coral';
  className?: string;
}

export function Badge({ children, variant = 'blue', className = '' }: BadgeProps) {
  const variants = {
    blue: 'bg-[#cce1e7] text-[#2C5F6F] border-[#99c3cf]',
    coral: 'bg-[#faf0ed] text-[#D4745E] border-[#ebc3b7]',
    gray: 'bg-[#f3ede3] text-[#5c5342] border-[#d4c4a8]',
    green: 'bg-[#e5e9e3] text-[#8B9D83] border-[#cbd3c7]',
    red: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
