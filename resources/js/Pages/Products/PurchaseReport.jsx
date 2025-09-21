import Dropdown from "@/Components/CustomeDropDown";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CListDropDown from "./CListDropDown";
import { Link } from "@inertiajs/react";

const PurchaseReport = ({ report }) => {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Purchases Report
                </h2>
            }
        >
            <div
                className="relative flex flex-col max-w-7xl mx-auto mt-4 h-full overflow-x-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border"
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
                                    بل نمبر
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    شرکت
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    شهر
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    شماره تماس
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    تاریخ خرید
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
                        {report.map((item, index) => (
                            <tr
                                key={index}
                                className={index % 2 != 0 ? "bg-gray-200" : ""}
                            >
                                <td className="px-4 py-2">
                                    {/* <p className="text-base hover:text-xl font-bold cursor-pointer">
                                        <CListDropDown id={item.bill_number} />
                                    </p> */}
                                    <Link
                                        href={route("payment.create", item.id)}
                                        className="text-blue-500 text-base"
                                    >
                                        &#xe095;
                                    </Link>
                                </td>
                                <td className="px-4 py-2">
                                    <p className="text-sm">
                                        {item.bill_number}
                                    </p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">{item.supplier}</p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">{item.city}</p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">{item.phone}</p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">
                                        {item.purchase_date}
                                    </p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">
                                        {item.payment.payment_type}
                                    </p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">
                                        {item.final_amount}
                                    </p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">
                                        {item.payment.paid_amount}
                                    </p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm ">
                                        {item.payment.remaining_amount}
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
};

export default PurchaseReport;
