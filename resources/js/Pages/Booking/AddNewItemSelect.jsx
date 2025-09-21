import React, { useEffect, useState } from "react";
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

const AddNewItemSelect = ({
    placeholder,
    itemServices,
    dataBooking,
    setDataBooing,
    select,
    setSelect,
}) => {
    // Map the products into react-select options

    const newItems = itemServices.filter(
        (item1) => !dataBooking.some((item2) => item1.id === item2.id)
    );

    const options = newItems.map((type) => ({
        value: type.id ? type.id : 0,
        label: type.name,
        quantity: type.quantity,
    }));

    return (
        <Select
            isSearchable
            value={select}
            options={options}
            components={{ Option }} // use our custom option component
            onChange={(optionsSelect) => {
                if (optionsSelect != 0) {
                    setSelect(optionsSelect);
                }
                // setFieldValue(name, optionsSelect);
            }}
            placeholder={placeholder}
            className="w-64"
            styles={customStyles}
        />
    );
};

export default AddNewItemSelect;
