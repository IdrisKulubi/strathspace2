interface BadgeProps {
  children: React.ReactNode;
  variant?: 'pink' | 'blue' | 'yellow' | 'success' | 'default';
  size?: 'sm' | 'md';
  className?: string;
}

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}: BadgeProps) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-full font-medium';

  const variants = {
    pink: 'bg-brand-pink/10 text-brand-pink',
    blue: 'bg-brand-blue/10 text-brand-blue',
    yellow: 'bg-brand-yellow/20 text-yellow-700',
    success: 'bg-green-100 text-green-700',
    default: 'bg-gray-100 text-gray-700',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
