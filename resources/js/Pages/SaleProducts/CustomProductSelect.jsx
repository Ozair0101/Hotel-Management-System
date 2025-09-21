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

const CustomProductSelect = ({
    options1,
    placeholder,
    name,
    values,
    setFieldValue,
    fields,
    setQuantity,
    unitPrice,
    sellPrice,
}) => {
    // Map the products into react-select options
    const options = options1.map((product, index) => {
        return {
            value: index,
            label: product.productName,
            item_id: product.item_id,
            quantity: product.quantity,
            price: product.sale_price,
            batch: product.batch,
            discount: product.discount,
            unit_price: product.unit_price,
            sell_price: product.sale_price,
            product_id: product.product_id,
            sale_id: product.sale_id,
            payment_id: product.payment_id,
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
                setFieldValue(fields.batch, option.batch);
                setFieldValue(unitPrice, option.unit_price);
                setFieldValue(sellPrice, option.sell_price);
                setFieldValue(fields.discount, option.discount);
                setQuantity(option.quantity);
            }}
            placeholder={placeholder}
            className={`lg:w-80 md:w-80 sm:w-64`} // Tailwind class for full width (adjust as needed)
            required
        />
    );
};

export default CustomProductSelect;
