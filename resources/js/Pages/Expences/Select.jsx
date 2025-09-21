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
        border: "1px solid #e5e7eb",
        backgroundColor: "#fff",
        borderRadius: "0.5rem",
        boxShadow: "none",
        "&:hover": {
            borderColor: "#d1d5db"
        },
        "&:focus": {
            borderColor: "#6366f1",
            boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)"
        }
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
        color: "#9ca3af"
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
        color: "#9ca3af",
        "&:hover": {
            color: "#6366f1"
        }
    }),
    clearIndicator: (provided) => ({
        ...provided,
        padding: "4px",
        color: "#9ca3af",
        "&:hover": {
            color: "#ef4444"
        }
    }),
};

const SelectType1 = ({
    placeholder,
    options,
    setData,
    setSelectType,
    vendor,
    data,
    name,
    employee,
}) => {
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
                setData(name, optionsSelect);
                setData("payTo", "");

                if (optionsSelect.label.toLocaleLowerCase() == "salary") {
                    setSelectType(employee);
                } else {
                    setSelectType(vendor);
                }
            }}
            placeholder={placeholder}
            className="w-full text-sm"
            styles={customStyles}
            required
        />
    );
};

export default SelectType1;