import React from 'react';
import { Search } from '../../molecules';
import Icon from '../../atoms/icon/Icon';

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  children?: NavigationItem[];
}

interface NavigationProps {
  items: NavigationItem[];
  onItemClick?: (item: NavigationItem) => void;
  className?: string;
  variant?: 'horizontal' | 'vertical' | 'sidebar';
  showSearch?: boolean;
  onSearch?: (query: string) => void;
  logo?: React.ReactNode;
  actions?: React.ReactNode;
}

const Navigation: React.FC<NavigationProps> = ({
  items,
  onItemClick,
  className = '',
  variant = 'horizontal',
  showSearch = false,
  onSearch,
  logo,
  actions,
}) => {
  const variantClasses = {
    horizontal: 'flex items-center justify-between',
    vertical: 'flex flex-col space-y-2',
    sidebar: 'flex flex-col h-full',
  };

  const renderNavigationItem = (item: NavigationItem, level = 0) => {
    const baseClasses =
      variant === 'sidebar'
        ? 'flex items-center w-full text-left px-3 py-2 rounded-md transition-colors'
        : 'flex items-center px-3 py-2 rounded-md transition-colors';

    const activeClasses = item.isActive
      ? 'bg-brand-500 text-white'
      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800';

    const indentClasses = level > 0 ? `ml-${level * 4}` : '';

    return (
      <div key={item.id}>
        <button
          className={`${baseClasses} ${activeClasses} ${indentClasses}`}
          onClick={() => onItemClick?.(item)}
        >
          {item.icon && (
            <Icon size='sm' className='mr-2'>
              {item.icon}
            </Icon>
          )}
          <span>{item.label}</span>
        </button>

        {item.children && (
          <div className={variant === 'sidebar' ? 'ml-4' : ''}>
            {item.children.map(child => renderNavigationItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className={`${variantClasses[variant]} ${className}`}>
      {logo && variant === 'horizontal' && (
        <div className='flex items-center'>{logo}</div>
      )}

      {variant === 'sidebar' && logo && (
        <div className='border-b border-gray-200 p-4 dark:border-gray-700'>
          {logo}
        </div>
      )}

      <div
        className={
          variant === 'horizontal'
            ? 'flex items-center space-x-1'
            : 'flex-1 py-4'
        }
      >
        {items.map(item => renderNavigationItem(item))}
      </div>

      {showSearch && variant === 'horizontal' && (
        <div className='mx-4 max-w-md flex-1'>
          <Search onSearch={onSearch} placeholder='Search...' />
        </div>
      )}

      {actions && (
        <div
          className={
            variant === 'horizontal'
              ? 'flex items-center space-x-2'
              : 'border-t border-gray-200 p-4 dark:border-gray-700'
          }
        >
          {actions}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
