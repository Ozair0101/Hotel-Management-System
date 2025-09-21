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
                <div className="error-text">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default CustomeInput;