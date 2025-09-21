import React from 'react';

const Badge = ({ 
    children, 
    className = '', 
    variant = 'primary',
    size = 'md',
    ...props 
}) => {
    const baseClasses = 'badge';
    const variantClasses = {
        primary: 'badge-primary',
        secondary: 'badge-secondary',
        success: 'badge-success',
        warning: 'badge-warning',
        danger: 'badge-danger',
        muted: 'badge-muted'
    };
    const sizeClasses = {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-xs px-3 py-1',
        lg: 'text-sm px-4 py-1.5'
    };
    
    return (
        <span
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
            {...props}
        >
            {children}
        </span>
    );
};

export default Badge;