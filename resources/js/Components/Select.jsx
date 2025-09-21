import { useField } from "formik";
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

const CustomeSelect = ({
    products,
    placeholder,
    values,
    setFieldValue,
    name,
}) => {
    // Map the products into react-select options
    const options = products.map((product) => ({
        value: product.id,
        label: product.name,
    }));
    return (
        <Select
            isSearchable
            options={options}
            value={values[name]}
            components={{ Option }} // use our custom option component
            onChange={(optionsSelect) => {
                setFieldValue(name, optionsSelect);
            }}
            placeholder={placeholder}
            className="w-80"
            styles={customStyles}
            required
        />
    );
};

export default CustomeSelect;
