import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";

const Report = ({ report, end, start }) => {
    const [filter, setFilter] = useState("all");

    const filterdExpenses = report.filter((expense) => {
        if (filter === "all") return true;
        if (filter === "without_salary")
            return expense.expense_type.toLocaleLowerCase() !== "salary";
        return expense.expense_type.toLocaleLowerCase() === filter;
    });
    const totalPrice = report.reduce(
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
            <div className="relative mt-6 flex flex-col max-w-7xl mx-auto h-full text-gray-700  bg-clip-border">
                <select
                    value={filter}
                    className="h-5 w-fit flex items-center py-0  bg-gray-50 rounded-sm text-sm"
                    // className="w-fit h-8  border-gray-500"
                    onChange={(e) => {
                        setFilter(e.target.value);
                    }}
                >
                    <option value="all">All</option>
                    <option value="salary">Salary</option>
                    <option value="without_salary">مصارف</option>
                </select>
            </div>
            <div
                className="relative mt-6 flex flex-col max-w-7xl mx-auto h-full overflow-x-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border"
                dir="rtl"
            >
                <table className="w-full text-right table-auto min-w-max text-slate-800">
                    <thead>
                        <tr className="text-white border-b border-slate-300 bg-blue-500">
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Name
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Amount
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Expense Type
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Date
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Remark
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterdExpenses.length > 0 ? (
                            filterdExpenses.map((item, index) => (
                                <tr
                                    key={index}
                                    className={
                                        index % 2 != 0 ? "bg-gray-200" : ""
                                    }
                                >
                                    <td className="px-4">
                                        <p className="text-sm">{item.name}</p>
                                    </td>
                                    <td className="px-4">
                                        <p className="text-sm">{item.amount}</p>
                                    </td>
                                    <td className="px-4">
                                        <p className="text-sm">
                                            {item.expense_type}
                                        </p>
                                    </td>
                                    <td className="px-4">
                                        <p className="text-sm">{item.date}</p>
                                    </td>
                                    <td className="px-4">
                                        <p className="text-sm">
                                            {item.remark ? item.remark : ""}
                                        </p>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <td
                                colSpan={5}
                                className="py-4 text-center text-xl font-bold"
                            >
                                Empty
                            </td>
                        )}
                    </tbody>
                </table>
            </div>
            <div
                className="relative mt-6 flex flex-col max-w-7xl mx-auto h-full text-gray-700  bg-clip-border"
                dir="rtl"
            >
                <p className="font-bold px-6 py-2 rounded-md bg-blue-500 text-white w-fit">
                    Total: {totalPrice}
                </p>
            </div>
        </AuthenticatedLayout>
    );
};
export default Report;
