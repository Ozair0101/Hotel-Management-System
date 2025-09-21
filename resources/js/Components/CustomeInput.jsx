import { useField } from "formik";

const CustomeInput = ({
    placeholder = "",
    width = "",
    value = "",
    type = "text",
    className = "",
    ...props
}) => {
    const [field, meta, helpers] = useField(props);

    return (
        <div className="w-full">
            <input
                defaultValue={value}
                placeholder={placeholder}
                {...field}
                type={type}
                {...props}
                className={`input input-md ${width} ${className} ${
                    meta.touched && meta.error ? "input-error" : ""
                }`}
            />
            {meta.touched && meta.error ? (
                <div className="form-error flex items-center mt-1">
                    <svg className="w-4 h-4 inline mr-1.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                    </svg>
                    <span>{meta.error}</span>
                </div>
            ) : null}
        </div>
    );
};

export default CustomeInput;