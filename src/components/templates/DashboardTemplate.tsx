import React from 'react';
import Heading from '../atoms/text/Heading';

interface DashboardTemplateProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  navigation?: React.ReactNode;
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const DashboardTemplate: React.FC<DashboardTemplateProps> = ({
  children,
  title,
  subtitle,
  navigation,
  header,
  sidebar,
  footer,
  className = '',
}) => {
  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${className}`}>
      {/* Header Navigation */}
      {header && (
        <header className='border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800'>
          {header}
        </header>
      )}

      <div className='flex h-full'>
        {/* Sidebar */}
        {sidebar && (
          <aside className='hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col'>
            <div className='flex flex-grow flex-col border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'>
              {sidebar}
            </div>
          </aside>
        )}

        {/* Main content */}
        <main className={`flex-1 ${sidebar ? 'lg:pl-64' : ''}`}>
          {/* Page Navigation */}
          {navigation && (
            <div className='border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'>
              {navigation}
            </div>
          )}

          {/* Page Header */}
          {(title || subtitle) && (
            <div className='border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800'>
              {title && (
                <Heading level={1} size='2xl' className='mb-1'>
                  {title}
                </Heading>
              )}
              {subtitle && (
                <p className='text-gray-600 dark:text-gray-400'>{subtitle}</p>
              )}
            </div>
          )}

          {/* Content */}
          <div className='p-6'>{children}</div>

          {/* Footer */}
          {footer && (
            <footer className='border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'>
              {footer}
            </footer>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardTemplate;
