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

const ReturnCustomerSelect = ({
    customers,
    placeholder,
    name,
    values,
    setFieldValue,
}) => {
    const options = customers.map((customer) => ({
        value: customer.id,
        label: customer.first_name,
    }));

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
            className={`lg:w-80 md:w-80 sm:w-64`} // Tailwind class for full width (adjust as needed)
            required
        />
    );
};

export default ReturnCustomerSelect;
