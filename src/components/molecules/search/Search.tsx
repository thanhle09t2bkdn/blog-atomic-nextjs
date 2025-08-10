import React, { useState } from 'react';
import Button from '../../atoms/button/Button';
import Icon from '../../atoms/icon/Icon';

interface SearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onClear?: () => void;
  className?: string;
  size?: 'sm' | 'md';
  showSearchButton?: boolean;
  showClearButton?: boolean;
}

const Search: React.FC<SearchProps> = ({
  placeholder = 'Search...',
  onSearch,
  onClear,
  className = '',
  size = 'md',
  showSearchButton = false,
  showClearButton = true,
}) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Call onSearch immediately for real-time search
    if (onSearch && !showSearchButton) {
      onSearch(value);
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onClear) {
      onClear();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(query);
    }
  };

  const sizeClasses = {
    sm: 'text-sm px-3 py-2',
    md: 'text-base px-4 py-3',
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      <div className='relative flex-1'>
        <input
          type='text'
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className={`focus:border-brand-500 focus:ring-brand-500 dark:focus:border-brand-400 w-full rounded-lg border border-gray-300 bg-white transition focus:ring-1 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white ${sizeClasses[size]} ${showSearchButton ? 'pr-20' : showClearButton && query ? 'pr-10' : ''} `}
        />

        {showClearButton && query && (
          <button
            onClick={handleClear}
            className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
          >
            <Icon size='sm'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path d='M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z' />
              </svg>
            </Icon>
          </button>
        )}
      </div>

      {showSearchButton && (
        <Button
          size={size}
          onClick={handleSearch}
          className='ml-2'
          startIcon={
            <Icon size='sm'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z'
                  clipRule='evenodd'
                />
              </svg>
            </Icon>
          }
        >
          Search
        </Button>
      )}
    </div>
  );
};

export default Search;
