import React, { useEffect } from "react";
import Select from "react-select";
import Option from "../Booking/Option"; // import the custom Option component

const customStyles = {
    control: (provided) => ({
        ...provided,
        minHeight: "24px",
        height: "24px",
        display: "flex",
        alignItems: "center",
        border: "none",
        backgroundColor: "rgb(243 244 246)",
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

const SelectMenu = ({
    placeholder,
    values,
    setFieldValue,
    name,
    options,
    setFilteredHalls,
    filteredHalls,
}) => {
    // Map the products into react-select options

    const options1 = options.map((menu, index) => ({
        value: menu.value,
        label: menu.label,
    }));
    // useEffect(() => {
    //     setFilteredHalls(options1[0]);
    // }, []);
    return (
        <Select
            isSearchable
            options={options1}
            value={filteredHalls}
            components={{ Option }} // use our custom option component
            onChange={(optionsSelect) => {
                setFilteredHalls(optionsSelect);
            }}
            placeholder={placeholder}
            className="w-full text-sm"
            styles={customStyles}
            required
        />
    );
};

export default SelectMenu;
