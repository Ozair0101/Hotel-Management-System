export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={`btn btn-outline px-4 py-2 text-sm ${disabled && 'opacity-50'} ` + className}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
