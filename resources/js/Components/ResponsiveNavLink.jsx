import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={`block w-full pl-3 pr-4 py-2.5 border-l-4 text-left text-base font-medium transition-all duration-300 ease-in-out focus:outline-none rounded-r-lg ${
                active
                    ? 'border-primary-500 text-primary-700 bg-primary-50 shadow-sm'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300'
            } ${className}`}
        >
            {children}
        </Link>
    );
}