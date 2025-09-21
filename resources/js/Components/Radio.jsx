export default function Radio({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="radio"
            className={
                'form-radio rounded-full border-gray-300 text-primary-600 shadow-sm focus:ring-primary-500 focus:ring-offset-0 ' +
                className
            }
        />
    );
}