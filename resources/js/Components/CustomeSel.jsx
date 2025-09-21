import React from "react";
import Select from "react-select";
import Option from "./Option";

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        minHeight: "42px",
        height: "42px",
        display: "flex",
        alignItems: "center",
        borderRadius: "0.75rem",
        border: state.isFocused ? "1px solid #4f46e5" : "1px solid #d1d5db",
        boxShadow: state.isFocused ? "0 0 0 4px rgba(79, 70, 229, 0.2)" : "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        transition: "all 0.2s ease",
        "&:hover": {
            border: "1px solid #4f46e5",
        }
    }),
    valueContainer: (provided) => ({
        ...provided,
        height: "42px",
        padding: "0 12px",
        display: "flex",
        alignItems: "center",
    }),
    input: (provided) => ({
        ...provided,
        margin: "0px",
        padding: "0px",
    }),
    placeholder: (provided) => ({
        ...provided,
        margin: "0px",
        padding: "0px",
        display: "flex",
        alignItems: "center",
        color: "#9ca3af",
    }),
    singleValue: (provided) => ({
        ...provided,
        margin: "0px",
        padding: "0px",
        display: "flex",
        alignItems: "center",
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        height: "42px",
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        padding: "8px",
        color: state.isFocused ? "#4f46e5" : "#9ca3af",
        "&:hover": {
            color: "#4f46e5",
        }
    }),
    clearIndicator: (provided) => ({
        ...provided,
        padding: "8px",
    }),
    menu: (provided) => ({
        ...provided,
        borderRadius: "0.75rem",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        border: "1px solid #e5e7eb",
        marginTop: "4px",
    }),
    menuList: (provided) => ({
        ...provided,
        borderRadius: "0.75rem",
        padding: "4px",
    }),
};

const CustomeSel = ({
    products,
    name,
    onChange,
    placeholder,
    values,
    setFieldValue,
    className = "",
}) => {
    // Map the products into react-select options
    const options = products.map((product) => ({
        value: product.id,
        label: product.name,
    }));

    return (
        <div className={`w-full ${className}`}>
            <Select
                options={options}
                value={values[name]}
                components={{ Option }}
                onChange={(options) => {
                    setFieldValue(name, options);
                }}
                placeholder={placeholder}
                styles={customStyles}
                className="w-full"
                required
            />
        </div>
    );
};

export default CustomeSel;