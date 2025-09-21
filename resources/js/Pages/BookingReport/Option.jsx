import React from "react";
import { components } from "react-select";

const Option = (props) => {
    return (
        <components.Option {...props}>
            <div className="">
                <div className="h-4 font-bold">
                    {props.data.label}
                    {/* {props.data.value} */}
                </div>
            </div>
        </components.Option>
    );
};

export default Option;
