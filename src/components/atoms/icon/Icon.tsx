import React from 'react';

interface IconProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'muted'
    | 'current';
  className?: string;
  onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({
  children,
  size = 'md',
  color = 'current',
  className = '',
  onClick,
}) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
    '2xl': 'w-10 h-10',
  };

  const colorClasses = {
    primary: 'text-gray-900 dark:text-white',
    secondary: 'text-gray-700 dark:text-gray-300',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    error: 'text-red-600 dark:text-red-400',
    muted: 'text-gray-500 dark:text-gray-400',
    current: 'text-current',
  };

  const classes = `
    ${sizeClasses[size]}
    ${colorClasses[color]}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `.trim();

  return (
    <span className={classes} onClick={onClick}>
      {children}
    </span>
  );
};

export default Icon;
