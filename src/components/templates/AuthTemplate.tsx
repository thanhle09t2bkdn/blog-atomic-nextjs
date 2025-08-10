import React from 'react';
import Text from '../atoms/text/Text';

interface AuthTemplateProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  logo?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const AuthTemplate: React.FC<AuthTemplateProps> = ({
  children,
  title,
  subtitle,
  backgroundImage,
  logo,
  footer,
  className = '',
}) => {
  return (
    <div className={`flex min-h-screen ${className}`}>
      {/* Left side - Form */}
      <div className='flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8'>
        <div className='w-full max-w-md space-y-8'>
          {logo && <div className='text-center'>{logo}</div>}

          {(title || subtitle) && (
            <div className='text-center'>
              {title && (
                <h2 className='text-3xl font-bold text-gray-900 dark:text-white'>
                  {title}
                </h2>
              )}
              {subtitle && (
                <Text color='muted' className='mt-2'>
                  {subtitle}
                </Text>
              )}
            </div>
          )}

          <div>{children}</div>

          {footer && <div className='text-center'>{footer}</div>}
        </div>
      </div>

      {/* Right side - Background/Image */}
      <div className='hidden lg:block lg:w-1/2'>
        <div
          className='from-brand-500 to-brand-700 flex h-full w-full items-center justify-center bg-gradient-to-br'
          style={
            backgroundImage
              ? {
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : {}
          }
        >
          <div className='p-8 text-center text-white'>
            <h3 className='mb-4 text-2xl font-bold'>Welcome Back!</h3>
            <p className='text-lg opacity-90'>
              Join thousands of users who trust our platform for their business
              needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthTemplate;
