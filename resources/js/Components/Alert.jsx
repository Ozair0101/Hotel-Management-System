import React from 'react';

const Alert = ({ 
    children, 
    className = '', 
    variant = 'primary',
    title = '',
    ...props 
}) => {
    const variantClasses = {
        primary: 'alert-primary',
        secondary: 'alert-secondary',
        success: 'alert-success',
        warning: 'alert-warning',
        danger: 'alert-danger'
    };
    
    return (
        <div className={`alert ${variantClasses[variant]} ${className}`} {...props}>
            {title && <div className="font-bold text-sm mb-1">{title}</div>}
            {children}
        </div>
    );
};

export default Alert;