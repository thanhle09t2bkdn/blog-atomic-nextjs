import React, { useState } from 'react';
import { Button, Text } from '../../atoms';
import { Search, Card } from '../../molecules';
import Icon from '../../atoms/icon/Icon';

interface Column<T = Record<string, unknown>> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: unknown, record: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
}

interface DataTableProps<T = Record<string, unknown>> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  loading?: boolean;
  pagination?: {
    current: number;
    total: number;
    pageSize: number;
    onChange: (page: number, pageSize?: number) => void;
  };
  onSearch?: (query: string) => void;
  actions?: React.ReactNode;
  emptyText?: string;
  className?: string;
}

function DataTable<T = Record<string, unknown>>({
  data,
  columns,
  title,
  loading = false,
  pagination,
  onSearch,
  actions,
  emptyText = 'No data available',
  className = '',
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const renderCell = (
    column: Column<T>,
    record: T,
    index: number
  ): React.ReactNode => {
    if (column.render) {
      return column.render(record[column.dataIndex as keyof T], record, index);
    }
    const value = record[column.dataIndex as keyof T];
    return String(value ?? '');
  };

  const headerActions = (
    <div className='flex items-center space-x-3'>
      {onSearch && (
        <Search onSearch={onSearch} placeholder='Search table...' size='sm' />
      )}
      {actions}
    </div>
  );

  return (
    <Card
      title={title}
      headerActions={headerActions}
      className={`${className}`}
      padding='none'
    >
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-gray-50 dark:bg-gray-800'>
            <tr>
              {columns.map(column => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400 ${column.sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700' : ''} ${column.align === 'center' ? 'text-center' : ''} ${column.align === 'right' ? 'text-right' : ''} `}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className='flex items-center'>
                    <span>{column.title}</span>
                    {column.sortable && (
                      <Icon size='xs' className='ml-1'>
                        {sortColumn === column.key ? (
                          sortDirection === 'asc' ? (
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                            >
                              <path
                                fillRule='evenodd'
                                d='M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z'
                                clipRule='evenodd'
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                            >
                              <path
                                fillRule='evenodd'
                                d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                                clipRule='evenodd'
                              />
                            </svg>
                          )
                        ) : (
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                            className='opacity-40'
                          >
                            <path
                              fillRule='evenodd'
                              d='M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z'
                              clipRule='evenodd'
                            />
                          </svg>
                        )}
                      </Icon>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900'>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className='px-6 py-12 text-center'>
                  <div className='flex items-center justify-center'>
                    <Icon size='lg' className='mr-2 animate-spin'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <circle
                          cx='12'
                          cy='12'
                          r='10'
                          stroke='currentColor'
                          strokeWidth='4'
                          className='opacity-25'
                        />
                        <path
                          fill='currentColor'
                          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                          className='opacity-75'
                        />
                      </svg>
                    </Icon>
                    <Text color='muted'>Loading...</Text>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className='px-6 py-12 text-center'>
                  <Text color='muted' size='lg'>
                    {emptyText}
                  </Text>
                </td>
              </tr>
            ) : (
              data.map((record, index) => (
                <tr
                  key={index}
                  className='hover:bg-gray-50 dark:hover:bg-gray-800/50'
                >
                  {columns.map(column => (
                    <td
                      key={column.key}
                      className={`px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-gray-100 ${column.align === 'center' ? 'text-center' : ''} ${column.align === 'right' ? 'text-right' : ''} `}
                    >
                      {renderCell(column, record, index)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className='border-t border-gray-200 px-6 py-3 dark:border-gray-700'>
          <div className='flex items-center justify-between'>
            <Text size='sm' color='muted'>
              Showing {(pagination.current - 1) * pagination.pageSize + 1} to{' '}
              {Math.min(
                pagination.current * pagination.pageSize,
                pagination.total
              )}{' '}
              of {pagination.total} results
            </Text>
            <div className='flex items-center space-x-2'>
              <Button
                size='sm'
                variant='outline'
                disabled={pagination.current === 1}
                onClick={() => pagination.onChange(pagination.current - 1)}
              >
                Previous
              </Button>
              <Button
                size='sm'
                variant='outline'
                disabled={
                  pagination.current * pagination.pageSize >= pagination.total
                }
                onClick={() => pagination.onChange(pagination.current + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

export default DataTable;
