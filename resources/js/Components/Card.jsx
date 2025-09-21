import React from 'react';

const Card = ({ children, className = '' }) => {
    return (
        <div className={`card ${className}`}>
            {children}
        </div>
    );
};

const CardHeader = ({ children, className = '' }) => {
    return (
        <div className={`card-header ${className}`}>
            {children}
        </div>
    );
};

const CardTitle = ({ children, className = '' }) => {
    return (
        <h3 className={`card-title ${className}`}>
            {children}
        </h3>
    );
};

const CardBody = ({ children, className = '' }) => {
    return (
        <div className={`card-body ${className}`}>
            {children}
        </div>
    );
};

const CardFooter = ({ children, className = '' }) => {
    return (
        <div className={`card-footer ${className}`}>
            {children}
        </div>
    );
};

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;