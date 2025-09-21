import React from "react";
import Select from "react-select";
import Option from "@/Components/PurchaseOption"; // import the custom Option component

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

const ProrductSelectOptions = ({
    options1,
    placeholder,
    name,
    values,
    setFieldValue,
}) => {
    // Map the products into react-select options
    const options = options1.map((product, index) => {
        return {
            value: product.id,
            label: product.product_name,
            category: product.category,
            madeFrom: product.made_from,
        };
    });

    return (
        <Select
            styles={customStyles}
            isSearchable
            options={options}
            value={values[name]}
            components={{ Option }} // use our custom option component
            onChange={(option) => {
                setFieldValue(name, option);
            }}
            placeholder={placeholder}
            className={`lg:w-64 md:w-64 sm:w-52`} // Tailwind class for full width (adjust as needed)
            required
        />
    );
};

export default ProrductSelectOptions;
