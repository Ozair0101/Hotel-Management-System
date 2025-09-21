import React from "react";
import Select from "react-select";
import Option from "./Option"; // import the custom Option component
import { Quantity } from "@/schema/Quantity";

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

const SelectMenu = ({
    placeholder,
    values,
    setFieldValue,
    name,
    menus,
    setDataBooking,
    setMenuName,
    setPrice,
    setPersonQuantity,
    setRemoveItems,
    setNewAddItems,
}) => {
    // Map the products into react-select options

    const options = menus.map((menu) => ({
        value: menu.id,
        label: menu.menu,
        price: menu.price,
        service_items: menu.service_items,
    }));

    return (
        <Select
            isSearchable
            options={options}
            value={values[name]}
            components={{ Option }} // use our custom option component
            onChange={(optionsSelect) => {
                setFieldValue(name, optionsSelect);
                setDataBooking(optionsSelect.service_items);
                setMenuName(optionsSelect.label);
                setPersonQuantity(parseInt(values["personQuantity"]));
                setPrice(parseInt(optionsSelect.price));
                setRemoveItems([]);
                setNewAddItems([]);
            }}
            placeholder={placeholder}
            className="w-64"
            styles={customStyles}
            required
        />
    );
};

export default SelectMenu;
