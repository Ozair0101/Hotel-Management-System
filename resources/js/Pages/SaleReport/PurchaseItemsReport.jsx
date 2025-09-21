import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";

const PurchaseItemsReport = (props) => {
    const setTotalPticeHandler = (price, quantity, discount) => {
        const disPerItem = (price * discount) / 100;
        const diTotal = price - disPerItem;
        const totalPrice = diTotal * quantity;
        const totalPriceDes = parseFloat(totalPrice.toFixed(2));
        return totalPriceDes;
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Purchase Items Report
                </h2>
            }
        >
            <div
                className="relative mt-6 flex flex-col max-w-7xl mx-auto h-full overflow-x-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border"
                dir="rtl"
            >
                <table className="w-full text-right table-auto min-w-max text-slate-800">
                    <thead>
                        <tr className="text-white border-b border-slate-300 bg-blue-500">
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    No
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    نام محصول
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    نام شرکت
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    تاریخ خرید
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    تذکر
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.report.map((item, index) => (
                            <tr
                                key={index}
                                className={index % 2 != 0 ? "bg-gray-200" : ""}
                            >
                                <td className="px-4 py-1">
                                    <p className="text-sm">{index + 1}</p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">{item.product}</p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">{item.company}</p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">{item.date}</p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">{item.remark}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
};
export default PurchaseItemsReport;
