import React from 'react';

const Form = ({ children, className = '', ...props }) => {
    return (
        <form className={`w-full ${className}`} {...props}>
            {children}
        </form>
    );
};

const FormGroup = ({ children, className = '' }) => {
    return (
        <div className={`form-group ${className}`}>
            {children}
        </div>
    );
};

const FormRow = ({ children, className = '' }) => {
    return (
        <div className={`form-row ${className}`}>
            {children}
        </div>
    );
};

const FormCol = ({ children, className = '', size = 'full' }) => {
    const sizeClasses = {
        full: 'w-full',
        half: 'w-full md:w-1/2',
        third: 'w-full md:w-1/2 lg:w-1/3',
        quarter: 'w-full md:w-1/2 lg:w-1/4'
    };
    
    return (
        <div className={`px-3 mb-6 ${sizeClasses[size]} ${className}`}>
            {children}
        </div>
    );
};

const Label = ({ children, className = '', required = false, ...props }) => {
    return (
        <label 
            className={`label ${required ? 'label-required' : ''} ${className}`} 
            {...props}
        >
            {children}
        </label>
    );
};

Form.Group = FormGroup;
Form.Row = FormRow;
Form.Col = FormCol;
Form.Label = Label;

export default Form;