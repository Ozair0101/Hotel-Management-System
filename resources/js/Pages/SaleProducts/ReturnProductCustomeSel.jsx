import React from "react";
import Select from "react-select";
import Option from "./Option"; // import the custom Option component
import { useField } from "formik";

const CustomProductSelect = ({
    options1,
    placeholder,
    name,
    values,
    setFieldValue,
}) => {
    // Map the products into react-select options
    const options = options1.map((product) => {
        return {
            value: product.item_id,
            label: product.productName,
            quantity: product.quantity,
            price: product.unit_price,
            batch: product.batch,
            discount: product.discount,
            unit_price: product.unit_price,
            sell_price: product.unit_price,
            product_id: product.product_id,
        };
    });
    console.log(options1);
    return (
        <Select
            name={name}
            options={options}
            components={{ Option }} // use our custom option component
            onChange={(option) => {
                setFieldValue(name, option);
            }}
            placeholder={placeholder}
            className={`w-96`} // Tailwind class for full width (adjust as needed)
            required
        />
    );
};

export default CustomProductSelect;
