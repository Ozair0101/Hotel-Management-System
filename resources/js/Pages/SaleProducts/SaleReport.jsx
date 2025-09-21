import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CListDropDown from "./CListDropDown";
import { Link } from "@inertiajs/react";

const SaleReport = ({ report }) => {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Sales Report
                </h2>
            }
        >
            <div className="relative flex flex-col max-w-7xl mx-auto mt-6 h-full overflow-x-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                <table className="w-full text-left table-auto min-w-max text-slate-800">
                    <thead>
                        <tr className="text-white border-b border-slate-300 bg-blue-500">
                            <th className="p-4">
                                <p className="text-base leading-none font-normal">
                                    ...
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Invoice Number
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Customers Name
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Sale Date
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Payment Type
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    CR
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Receipt
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Balance
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
                                <td className="px-4">
                                    {/* <p className="text-base hover:text-xl cursor-pointer">
                                        <CListDropDown id={item.id} />
                                    </p> */}
                                    <Link
                                        href={route(
                                            "salePayment.create",
                                            item.id
                                        )}
                                        className="text-blue-500 text-base"
                                    >
                                        &#xe095;
                                    </Link>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">
                                        {item.invoice_number}
                                    </p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">{item.customer}</p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">{item.sale_date}</p>
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
                                        {item.payment.amount_paid}
                                    </p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">
                                        {item.payment.remaining_amount}
                                    </p>
                                </td>
                            </tr>
                        ))}{" "}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
};

export default SaleReport;
