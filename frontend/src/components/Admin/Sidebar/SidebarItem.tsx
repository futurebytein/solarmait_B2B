'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SidebarItem = ({ item, pageName, setPageName }: any) => {
  const pathname = usePathname();
  const isActive =
    pathname === item.route ||
    item.children?.some((child: any) => pathname === child.route);

  const handleClick = () => {
    if (item.children) {
      setPageName(
        pageName === item.label.toLowerCase() ? '' : item.label.toLowerCase()
      );
    }
  };

  return (
    <li>
      <Link
        href={item.route || '#'}
        onClick={handleClick}
        className={`group flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
          isActive
            ? 'bg-yellow_1 text-blue_1'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <span className="flex-shrink-0 w-6 h-6 mr-3">{item.icon}</span>
        <span className="flex-1">{item.label}</span>
        {item.children && (
          <svg
            className={`ml-auto h-5 w-5 transform transition-transform duration-200 ${
              pageName === item.label.toLowerCase() ? 'rotate-180' : ''
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </Link>

      {item.children && pageName === item.label.toLowerCase() && (
        <ul className="mt-1 pl-8 space-y-1">
          {item.children.map((child: any, index: number) => (
            <li key={index}>
              <Link
                href={child.route}
                className={`group flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                  pathname === child.route
                    ? 'bg-silver text-blue_1'
                    : 'text-gray-700 hover:bg-silver'
                }`}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarItem;