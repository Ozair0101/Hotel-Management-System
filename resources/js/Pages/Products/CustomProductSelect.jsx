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
    products,
    name,
    placeholder,
    values = { values },
    setFieldValue,
    batch,
    unitPrice,
    sellPrice,
    discount,
    setQuantity,
}) => {
    // Map the products into react-select options
    const options = products.map((product, index) => ({
        value: index,
        label: product.name,
        quantity: product.quantity,
        price: product.unit_price,
        batch: product.batch,
        discount:
            product.purchaseItems?.find(
                (item) => item.product_id === product.product_id
            )?.discount_per_unit || 0,
        unit_price: product.unit_price,
        sell_price: product.unit_price,
        expire_date: product.expire_date,
        purchase_id: product.purchase_id,
        bill_number: product.bill_number,
        payment_type: product.payment_type,
        stock_id: product.stock_id,
    }));

    return (
        <Select
            options={options}
            isSearchable
            value={values[name]}
            components={{ Option }} // use our custom option component
            onChange={(selectedOption) => {
                setFieldValue(name, selectedOption);
                setFieldValue(batch, selectedOption.batch);
                setFieldValue(unitPrice, selectedOption.unit_price);
                setFieldValue(sellPrice, selectedOption.sell_price);
                setFieldValue(discount, selectedOption.discount);
                setQuantity(selectedOption.quantity);
            }}
            styles={customStyles}
            placeholder={placeholder}
            required
            className={`w-96`} // Tailwind class for full width (adjust as needed)
        />
    );
};

export default CustomProductSelect;
