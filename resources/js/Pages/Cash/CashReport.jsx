import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";

const CashReport = ({ sale, booking, expense, end, start, purchase }) => {
    const salePrice = sale.reduce(
        (sum, item) => sum + parseFloat(item.amount_paid),
        0
    );
    const purchasePrice = purchase.reduce(
        (sum, item) => sum + parseFloat(item.amount_paid),
        0
    );
    const bookingPrice = booking.reduce(
        (sum, item) => sum + parseFloat(item.amount_paid),
        0
    );

    const groupExpenses = expense.reduce((acc, expence) => {
        if (acc[expence.expense_type]) {
            acc[expence.expense_type] += parseFloat(expence.amount);
        } else {
            acc[expence.expense_type] = parseFloat(expence.amount);
        }
        return acc;
    }, {});

    const groupArray = Object.entries(groupExpenses).map(
        ([expense_type, amount]) => ({ type: expense_type, amount })
    );
    const expensePrice = groupArray.reduce(
        (sum, item) => sum + parseFloat(item.amount),
        0
    );

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Expenses
                    </h2>
                    <p className="font-medium">
                        {start}-----{end}
                    </p>
                </div>
            }
        >
            <div className="px-4 pt-2 mx-auto flex items-center gap-2 max-w-7xl sm:px-6 lg:px-8">
                <div>
                    <p className="text-xs mb-1 font-medium">Profit: </p>
                    <p className="text-sm bg-blue-400 font-semibold px-4 w-fit rounded-md py-2">
                        {bookingPrice +
                            salePrice -
                            (expensePrice + purchasePrice)}
                    </p>
                </div>
                <p className="translate-y-2">=</p>
                <div>
                    <p className="text-xs mb-1 font-medium">درامد: </p>
                    <p className="text-sm bg-green-400 font-semibold px-4 w-fit rounded-md py-2">
                        {bookingPrice + salePrice}
                    </p>
                </div>
                <p className="translate-y-2">+</p>
                <div>
                    <p className="text-xs mb-1 font-medium">مصارف</p>
                    <p className="text-sm bg-red-400 font-semibold px-4 w-fit rounded-md py-2">
                        {expensePrice + purchasePrice}
                    </p>
                </div>
            </div>
            <div
                className="mx-auto flex max-w-7xl sm:px-6 lg:px-8 py-4"
                dir="rtl"
            >
                <div className="relative w-full mt-2 flex flex-col mx-auto h-full text-gray-700 bg-white ">
                    <table className="table-auto border-l min-w-max text-slate-800 text-right">
                        <thead className="">
                            <tr className="border-b text-white bg-blue-500 font-bold text-center border-slate-300">
                                <th className="px-4 py-3" colSpan={2}>
                                    <p className="text-sm leading-none">
                                        درامد
                                    </p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="font-medium border-b text-center">
                                <td className="px-4 py-2">
                                    <p className="text-sm">نوعیت</p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">مقدار</p>
                                </td>
                            </tr>
                            <tr className="border-b text-center">
                                <td className="px-4 py-2">
                                    <p className="text-sm">Booking</p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">{bookingPrice}</p>
                                </td>
                            </tr>
                            <tr className="text-center">
                                <td className="px-4 py-2">
                                    <p className="text-sm">فروشات</p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">{salePrice}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="relative w-full mt-2 flex flex-col mx-auto h-full text-gray-700 bg-white ">
                    <table className="table-auto min-w-max text-slate-800 text-right">
                        <thead>
                            <tr className="border-b font-bold border-slate-300 bg-blue-500 text-white">
                                <th
                                    className="px-4 py-3 text-center"
                                    colSpan={2}
                                >
                                    <p className="text-sm leading-none">
                                        مصارف
                                    </p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="font-medium border-b text-center">
                                <td className="px-4 py-2">
                                    <p className="text-sm">نوعیت</p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">مقدار</p>
                                </td>
                            </tr>
                            <tr className="text-center border-t">
                                <td className="px-4 py-2">
                                    <p className="text-sm">خرید</p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">{purchasePrice}</p>
                                </td>
                            </tr>
                            {groupArray.map((item, index) => (
                                <tr
                                    className="text-center border-t"
                                    key={index}
                                >
                                    <td className="px-4 py-2">
                                        <p className="text-sm">{item.type}</p>
                                    </td>
                                    <td className="px-4">
                                        <p className="text-sm">{item.amount}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
export default CashReport;
