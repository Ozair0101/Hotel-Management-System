export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p
            {...props}
            className={'error-text ' + className}
        >
            {message}
        </p>
    ) : null;
}
