export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `btn btn-primary px-4 py-2 text-sm ${disabled && "opacity-50"} ` +
                className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
