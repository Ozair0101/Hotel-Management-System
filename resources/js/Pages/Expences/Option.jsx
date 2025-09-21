import React from "react";
import { components } from "react-select";

const Option = (props) => {
    return (
        <components.Option {...props}>
            <div className="">
                <div className="font-bold h-2 flex items-center text-sm">
                    {props.data.label}
                </div>
                <div className="text-xs text-gray-600">
                    {props.data.position && `Position: ${props.data.position}`}
                </div>
            </div>
        </components.Option>
    );
};

export default Option;
