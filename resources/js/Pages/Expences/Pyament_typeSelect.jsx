import React, { useEffect } from "react";
import Option from "../Booking/Option"; // import the custom Option component
import Select from "react-select";

const customStyles = {
    control: (provided) => ({
        ...provided,
        minHeight: "32px",
        height: "32px",
        display: "flex",
        alignItems: "center",
        border: "none",
        backgroundColor: "#fff",
        border: "1 solid #e5e7eb",
    }),
    valueContainer: (provided) => ({
        ...provided,
        height: "32px",
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
        height: "32px",
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

const Payment_typeSelect = ({ placeholder, options, setData, data, name }) => {
    // Map the products into react-select options

    const options1 = options.map((menu, index) => ({
        value: menu.id,
        label: menu.name,
    }));

    return (
        <Select
            isSearchable
            options={options1}
            value={data[name]}
            components={{ Option }} // use our custom option component
            onChange={(optionsSelect) => {
                setData("payment_method", optionsSelect);
            }}
            placeholder={placeholder}
            className="w-full text-sm"
            styles={customStyles}
            required
        />
    );
};

export default Payment_typeSelect;
