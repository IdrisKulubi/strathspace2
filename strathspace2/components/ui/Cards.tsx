import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gradient' | 'hover-lift';
  padding?: 'sm' | 'md' | 'lg';
}

const Card = ({
  variant = 'default',
  padding = 'md',
  children,
  className = '',
  ...props
}: CardProps) => {
  const baseStyles = 'rounded-3xl transition-all duration-300';

  const variants = {
    default: 'bg-white shadow-lg',
    glass: 'glass-effect border border-white/20',
    gradient: 'bg-gradient-primary text-white',
    'hover-lift':
      'bg-white shadow-lg hover:shadow-card-hover hover:-translate-y-2 cursor-pointer',
  };

  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
