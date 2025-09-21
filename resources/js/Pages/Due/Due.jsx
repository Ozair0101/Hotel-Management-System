import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";

const links = [
    { name: "Booking", link: "Due.booking" },
    { name: "Sale", link: "Due.sale" },
    { name: "Purchase", link: "Due.purchase" },
];
const Due = ({ report, paymentLink, name }) => {
    const [searchDate, setSerchDate] = useState("");
    const [searchName, setSerchName] = useState("");

    const filteredData = report.filter((item) => {
        const matchName = item.name
            .toLowerCase()
            .includes(searchName.toLowerCase());

        const matchDate = item.payment_date.includes(searchDate);

        return matchDate && matchName;
    });

    const setFilter = (e) => {
        router.get(route(e));
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {name} Report
                </h2>
            }
        >
            <div className="relative mt-6 flex justify-between max-w-7xl mx-auto h-full text-gray-700  bg-clip-border">
                <div className="flex gap-2 items-center">
                    <label htmlFor="" className="text-sm font-bold">
                        Filtering:
                    </label>
                    <select
                        className="h-5 w-fit flex items-center border-gray-300 py-0 bg-gray-50 rounded-sm text-sm"
                        onChange={(e) => {
                            setFilter(e.target.value);
                        }}
                    >
                        <option value="">Search</option>
                        {links.map((item, index) => (
                            <option
                                value={item.link}
                                className="p-1"
                                key={index}
                            >
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div dir="rtl" className="text-right pr-12">
                    {/* <div className="flex gap-2 items-center">
                        <label htmlFor="" className="text-xs font-bold">
                            جستجو تاریخ :
                        </label>
                        <input
                            type="date"
                            value={searchDate}
                            onChange={(e) => {
                                setSerchDate(e.target.value);
                            }}
                            placeholder="Search by date"
                            className="border text-sm h-6 w-44 p-2 border-gray-300 shadow-sm  focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div> */}
                    <div className="flex gap-2 items-center mt-2">
                        <label htmlFor="" className="text-xs font-bold ml-2">
                            جستجو نام :
                        </label>
                        <input
                            type="text"
                            value={searchName}
                            onChange={(e) => {
                                setSerchName(e.target.value);
                            }}
                            placeholder="Search by date"
                            className="border text-sm h-6 w-44 p-2 border-gray-300 shadow-sm  focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            className="text-xs hover:text-blue-500 hover:underline"
                            onClick={() => {
                                setSerchDate("");
                                setSerchName("");
                            }}
                        >
                            See all
                        </button>
                    </div>
                </div>
            </div>
            <div
                className="relative flex flex-col max-w-7xl mx-auto mt-6 h-full overflow-x-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border"
                dir="rtl"
            >
                <table className="w-full text-right table-auto min-w-max text-slate-800">
                    <thead>
                        <tr className="text-white border-b border-slate-300 bg-blue-500">
                            <th className="p-4">
                                <p className="text-base leading-none font-normal">
                                    ...
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Number
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    نام
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    تاریخ
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Payment Type
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    پول قابل پرداخت
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    رسید
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    قرض
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr
                                key={index}
                                className={index % 2 != 0 ? "bg-gray-200" : ""}
                            >
                                <td className="px-4">
                                    <Link
                                        href={route(paymentLink, item.id)}
                                        className="text-blue-500 text-base"
                                    >
                                        &#xe095;
                                    </Link>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">
                                        {item.check_number}
                                    </p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">{item.name}</p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">
                                        {item.payment_date}
                                    </p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">
                                        {item.payment_type}
                                    </p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">
                                        {item.final_amount}
                                    </p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">
                                        {item.amount_paid}
                                    </p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">{item.due}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
};

export default Due;
