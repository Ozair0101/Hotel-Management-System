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
    }),
    clearIndicator: (provided) => ({
        ...provided,
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
}) => {
    // Map the products into react-select options
    const options = products.map((product) => ({
        value: product.id,
        label: product.name,
    }));

    return (
        <Select
            options={options}
            value={values[name]}
            components={{ Option }} // use our custom option component
            onChange={(options) => {
                setFieldValue(name, options);
            }}
            placeholder={placeholder}
            styles={customStyles}
            className="w-96"
            required
        />
    );
};

export default CustomeSel;
