interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  online?: boolean;
  className?: string;
}

const Avatar = ({
  src,
  alt,
  name,
  size = 'md',
  online = false,
  className = '',
}: AvatarProps) => {
  const sizes = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-2xl',
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        className={`${sizes[size]} rounded-full overflow-hidden bg-gradient-primary flex items-center justify-center text-white font-heading font-bold ring-4 ring-white shadow-lg`}
      >
        {src ? (
          <img src={src} alt={alt || name} className="w-full h-full object-cover" />
        ) : (
          <span>{name ? getInitials(name) : '??'}</span>
        )}
      </div>
      {online && (
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
      )}
    </div>
  );
};

export default Avatar;
