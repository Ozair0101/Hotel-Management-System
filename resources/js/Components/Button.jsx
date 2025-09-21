import React from 'react';

const Button = ({ 
    children, 
    className = '', 
    variant = 'primary', 
    size = 'md', 
    type = 'button',
    ...props 
}) => {
    const baseClasses = 'btn';
    const variantClasses = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        accent: 'btn-accent',
        success: 'btn-success',
        warning: 'btn-warning',
        danger: 'btn-danger',
        outline: 'btn-outline',
        ghost: 'btn-ghost'
    };
    const sizeClasses = {
        sm: 'btn-sm',
        md: 'btn-md',
        lg: 'btn-lg'
    };
    
    return (
        <button
            type={type}
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;