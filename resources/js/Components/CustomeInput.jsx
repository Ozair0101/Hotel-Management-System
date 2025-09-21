import { useField } from "formik";

const CustomeInput = ({
    placeholder = "",
    width = "",
    value = "",
    type = "text",
    ...props
}) => {
    const [field, meta, helpers] = useField(props);

    return (
        <div>
            <input
                defaultValue={value}
                placeholder={placeholder}
                {...field}
                type={type}
                {...props}
                className={` ${width} py-1 rounded-[4px] border-gray-300 shadow-sm ${
                    meta.touched && meta.error && "border-red-300"
                }`}
            />
        </div>
    );
};

export default CustomeInput;
