import React from "react";
import Select from "react-select";
import Option from "../SaleProducts/Option"; // import the custom Option component

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

const SaleCustomeSelect = ({
    products,
    placeholder,
    name,
    values,
    setFieldValue,
    fields,
    setQuantity,
    unitPrice,
}) => {
    const options = products.map((product) => ({
        value: product.product_id,
        label: product.name,
        price: product.unit_price,
        quantity: product.quantity,
        batch: product.batch,
        unit_price: product.unit_price,
        sell_price: product.unit_price,
        stock_id: product.stock_id,
        product_id: product.product_id,
    }));

    return (
        <Select
            isSearchable
            styles={customStyles}
            options={options}
            value={values[name]}
            components={{ Option }} // use our custom option component
            onChange={(option) => {
                setFieldValue(name, option);
                setFieldValue(fields.batch, option.batch);
                setFieldValue(unitPrice, option.unit_price);
                setFieldValue(fields.discount, option.discount);
                setQuantity(option.quantity);
            }}
            placeholder={placeholder}
            className={`w-80 lg:w-80 md:w-80 sm:w-64`} // Tailwind class for full width (adjust as needed)
            required
        />
    );
};

export default SaleCustomeSelect;
