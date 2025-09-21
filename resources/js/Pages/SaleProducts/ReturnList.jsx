import { Link, usePage } from "@inertiajs/react";
// import { AddPurchaseToDB } from "./AddPurchaseToDB";
import { useEffect } from "react";
import { AddSaleToDB } from "./AddSaleToDB";
import { ReturnAddSaleToDB } from "./ReturnAddSaleToDB";

export const ReturnList = (props) => {
    const { errors } = usePage().props;

    const hasErrors = (index) => {
        return (
            errors[`products.${index}.sellPrice`] ||
            errors[`products.${index}.productName`] ||
            errors[`products.${index}.customerName`] ||
            errors[`products.${index}.bill_number`] ||
            errors[`products.${index}.unitPrice`] ||
            errors[`products.${index}.company`] ||
            errors[`products.${index}.batch`] ||
            errors[`products.${index}.quantity`] ||
            errors[`products.${index}.totalPrice`] ||
            errors[`products.${index}.discount`]
        );
    };

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            const firstErrorKey = Object.keys(errors)[0];
            const index = firstErrorKey.split(".")[1];
            document
                .getElementById(`product-${index}`)
                .scrollIntoView({ behavior: "smooth" });
        }
    }, [errors]);

    const clearErrorsHandler = (index) => {
        delete errors[`products.${index}.sellPrice`];
        delete errors[`products.${index}.sellPrice`];
        delete errors[`products.${index}.productName`];
        delete errors[`products.${index}.customerName`];
        delete errors[`products.${index}.bill_number`];
        delete errors[`products.${index}.unitPrice`];
        delete errors[`products.${index}.company`];
        delete errors[`products.${index}.batch`];
        delete errors[`products.${index}.quantity`];
        delete errors[`products.${index}.totalPrice`];
        delete errors[`products.${index}.discount`];
    };
    return (
        <>
            <div className="relative flex flex-col max-w-7xl mx-auto h-full overflow-x-scroll text-gray-700 bg-white shadow-md bg-clip-border">
                <table className="w-full text-left table-auto min-w-max text-slate-800">
                    <thead>
                        <tr className="text-white border-b border-slate-300  bg-blue-500">
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Product Name
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Customer Name
                                </p>
                            </th>

                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    quantity
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Unit Price
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Sell Price
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Batch
                                </p>
                            </th>

                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Discount
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    total Price
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Action
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.products.map((item, index) => {
                            return (
                                <tr
                                    className={` ${
                                        hasErrors(index)
                                            ? "bg-red-200"
                                            : "hover:bg-slate-100"
                                    }`}
                                    key={item.id}
                                    id={`product-${index}`}
                                >
                                    <td className="p-4">
                                        <p className="text-sm font-bold">
                                            {item.productName}
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <p className="text-sm">
                                            {item.customerName}
                                        </p>
                                    </td>

                                    <td className="p-4">
                                        <p className="text-sm">
                                            {item.quantity}
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <p className="text-sm">
                                            {item.unitPrice}
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <p className="text-sm">
                                            {item.sellPrice}
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <p className="text-sm">{item.batch}</p>
                                    </td>

                                    <td className="p-4">
                                        <p className="text-sm">
                                            {item.discount}
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <p className="text-sm">
                                            {item.totalPrice}
                                        </p>
                                    </td>

                                    <td className="p-4">
                                        <a
                                            onClick={() => {
                                                clearErrorsHandler(index);
                                                props.removeProduct(item.id);
                                            }}
                                            className="text-sm text-red-500 cursor-pointer font-semibold hover:underline hover:text-blue-500 "
                                        >
                                            X
                                        </a>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <ReturnAddSaleToDB
                products={props.products}
                setProduct={props.setProduct}
            />
        </>
    );
};
