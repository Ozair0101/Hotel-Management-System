export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'form-checkbox rounded border-gray-300 text-primary-600 shadow-sm focus:ring-primary-500 focus:ring-offset-0 ' +
                className
            }
        />
    );
}