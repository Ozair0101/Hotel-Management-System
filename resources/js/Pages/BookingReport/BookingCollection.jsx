import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import { FaMoneyBill } from "react-icons/fa";

const BookingCollection = ({ reservation }) => {
    const [searchDate, setSerchDate] = useState("");
    const [searchName, setSerchName] = useState("");

    // const filteredData = searchDate
    //     ? reservation.filter((item) => item.date.includes(searchDate))
    //     : reservation;
    const filteredData = reservation.filter((item) => {
        const matchName = item.firstName
            .toLowerCase()
            .includes(searchName.toLowerCase());

        const matchDate = item.date.includes(searchDate);

        return matchDate && matchName;
    });

    const submit = (id1) => {
        const id = {
            id: id1,
        };
        router.get(route("hotelPayment.create"), id);
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Booking Collection
                </h2>
            }
        >
            <div dir="rtl" className="text-right pr-12 mt-4">
                <div className="flex gap-2 items-center">
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
                </div>
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
                                    نام
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    تخلص
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    تاریخ
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    شب یا روز
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    نوع
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Menu No
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Menu Price
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    صالون
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    پول قابل پرداخت
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    قرض
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    رسید
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
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => {
                                            submit(item.id);
                                        }}
                                        className="text-blue-500 text-base"
                                    >
                                        {/* &#xe095; */}
                                        <FaMoneyBill />
                                    </button>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">{item.firstName}</p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">{item.lastName}</p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">{item.date}</p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">{item.typeDays}</p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">{item.type}</p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">{item.menu_no}</p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">{item.menu_price}</p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">{item.hall_name}</p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">
                                        {item.personQuantity * item.menu_price}
                                    </p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">{item.due}</p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm">
                                        {item.amount_paid}
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

export default BookingCollection;
