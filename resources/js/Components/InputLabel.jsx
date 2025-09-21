export default function InputLabel({
    value,
    className = "",
    children,
    required = false,
    ...props
}) {
    return (
        <label 
            {...props} 
            className={`label ${required ? 'label-required' : ''} ${className}`}
        >
            {value ? value : children}
        </label>
    );
}