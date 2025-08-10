import React from 'react';
import Heading from '../../atoms/text/Heading';
import Text from '../../atoms/text/Text';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: 'default' | 'bordered' | 'shadow' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  headerActions?: React.ReactNode;
  footer?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  headerActions,
  footer,
}) => {
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800',
    bordered:
      'bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700',
    shadow: 'bg-white shadow-sm dark:bg-gray-800',
    elevated: 'bg-white shadow-lg rounded-lg dark:bg-gray-800',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  };

  const classes = `
    ${variantClasses[variant]}
    ${paddingClasses[padding]}
    ${variant === 'elevated' ? 'rounded-lg' : 'rounded-md'}
    ${className}
  `.trim();

  return (
    <div className={classes}>
      {(title || subtitle || headerActions) && (
        <div className='mb-4 flex items-center justify-between'>
          <div>
            {title && (
              <Heading level={3} size='lg' className='mb-1'>
                {title}
              </Heading>
            )}
            {subtitle && (
              <Text variant='caption' color='muted'>
                {subtitle}
              </Text>
            )}
          </div>
          {headerActions && <div>{headerActions}</div>}
        </div>
      )}

      <div>{children}</div>

      {footer && (
        <div className='mt-4 border-t border-gray-200 pt-4 dark:border-gray-700'>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
