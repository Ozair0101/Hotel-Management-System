import React from "react";
import { components } from "react-select";

const Option = (props) => {
    return (
        <components.Option {...props}>
            <div className="py-2 px-3 rounded-lg hover:bg-primary-50 transition-colors duration-200">
                <div className="font-medium text-gray-900">
                    {props.data.label}
                </div>
                {props.data.quantity && (
                    <div className="text-xs text-gray-500 mt-1">
                        Quantity: {props.data.quantity} | Price: {props.data.price} | Batch: {props.data.batch}
                    </div>
                )}
            </div>
        </components.Option>
    );
};

export default Option;