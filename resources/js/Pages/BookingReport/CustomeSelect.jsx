import React from "react";
import Select from "react-select";
import Option from "./Option"; // import the custom Option component

const customStyles = {
    control: (provided) => ({
        ...provided,
        minHeight: "24px",
        height: "24px",
        display: "flex",
        alignItems: "center",
        borderColor: "#444",
    }),
    valueContainer: (provided) => ({
        ...provided,
        height: "24px",
        padding: "0 8px",
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
        color: "#333",
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
        height: "24px",
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        padding: "4px",
        color: "#333",
    }),
    clearIndicator: (provided) => ({
        ...provided,
        padding: "4px",
    }),
};

const CustomeSelect = ({
    options,
    placeholder,
    name,
    values,
    setFieldValue,
}) => {
    // Map the products into react-select options
    const option = options.map((product, index) => {
        return {
            value: product.id,
            label: product.name,
        };
    });

    return (
        <Select
            styles={customStyles}
            isSearchable
            options={option}
            value={values[name]}
            components={{ Option }} // use our custom option component
            onChange={(option) => {
                setFieldValue(name, option);
            }}
            placeholder={placeholder}
            className={`w-44 `} // Tailwind class for full width (adjust as needed)
            required
        />
    );
};

export default CustomeSelect;
