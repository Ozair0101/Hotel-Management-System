import React from "react";
import { components } from "react-select";

const Option = (props) => {
    return (
        <components.Option {...props}>
            <div className="">
                <div className="font-bold">
                    {props.data.label}
                    {/* {props.data.value} */}
                </div>
                <div className="text-xs text-gray-600">
                    {`Category: ${props.data.category} | MadeFrom: ${props.data.madeFrom}`}
                </div>
            </div>
        </components.Option>
    );
};

export default Option;
