import React from "react";
import { components } from "react-select";

const Option = (props) => {
    return (
        <components.Option {...props}>
            <div className="">
                <div className="font-bold text-sm">
                    {props.data.label}
                    {/* {props.data.value} */}
                </div>
                <div className="text-xs text-gray-600">
                    {props.data.lastName && `LastName: ${props.data.lastName}`}
                    {props.data.quantity &&
                        `Quantity: ${props.data.quantity} | Price: ${props.data.price} | Batch: ${props.data.batch}`}
                </div>
            </div>
        </components.Option>
    );
};

export default Option;
