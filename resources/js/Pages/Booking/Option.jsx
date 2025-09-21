import React from "react";
import { components } from "react-select";

const Option = (props) => {
    return (
        <components.Option {...props}>
            <div className="">
                <div className="font-bold mb-1 h-2 flex items-center text-sm">
                    {props.data.label}
                </div>
                <div className="text-xs text-gray-600">
                    {props.data.capacity && `ظرفیت: ${props.data.capacity}`}
                    {props.data.price && `Price: ${props.data.price}`}
                    {props.data.quantity && `مقدار: ${props.data.quantity}`}
                </div>
            </div>
        </components.Option>
    );
};

export default Option;
