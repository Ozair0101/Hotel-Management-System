import NavLink from "@/Components/NavLink";
import prieIcon from "../price.png";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import { Link, router } from "@inertiajs/react";

const SaleReport = ({ reservation, start, end, hall_name }) => {
    const [searchDate, setSerchDate] = useState("");
    const [reportData, setReportData] = useState([]);

    useEffect(() => {
        generateReport();
    }, [start, end, reservation, hall_name]);

    const generateReport = () => {
        // Convert to Date objects
        let current = new Date(start);
        let end1 = new Date(end);

        let tempArray = [];

        // Loop from start to end date
        while (current <= end1) {
            const dateStr = current.toISOString().split("T")[0]; // "YYYY-MM-DD"

            const hallNames = [...new Set(reservation.map((b) => b.hall_name))];

            const filteredHalls = hall_name
                ? hallNames.filter((name) => name === hall_name)
                : hallNames;

            filteredHalls.forEach((hall) => {
                // Find if we have a booking for "Day" on this date
                const dayBooking = reservation.find(
                    (b) =>
                        b.date === dateStr &&
                        b.typeDays === "Day" &&
                        b.hall_name == hall
                );
                // Find if we have a booking for "Night" on this date
                const nightBooking = reservation.find(
                    (b) =>
                        b.date === dateStr &&
                        b.typeDays === "Night" &&
                        b.hall_name == hall
                );
                // Add an entry for this date
                tempArray.push({
                    date: dateStr,
                    hallName: hall,
                    booking: dayBooking || null,
                    timeOfDay: "Day",
                });
                tempArray.push({
                    date: dateStr,
                    hallName: hall,
                    timeOfDay: "Night",
                    booking: nightBooking || null,
                });
            });
            // Move to the next day
            current.setDate(current.getDate() + 1);
        }
        setReportData(tempArray);
    };

    const submit = (id1) => {
        const id = {
            id: id1,
        };
        router.get(route("hotelPayment.create"), id);
    };
    const filteredData = searchDate
        ? reportData.filter((item) => item.date.includes(searchDate))
        : reportData;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Booking Report
                </h2>
            }
        >
            <div className="max-w-7xl pt-4 p-0 lg:px-8 md:px-0 flex items-center gap-4">
                <label htmlFor="" className="text-xs font-bold">
                    Search By Date:
                </label>
                <input
                    type="date"
                    value={searchDate}
                    onChange={(e) => {
                        setSerchDate(e.target.value);
                    }}
                    placeholder="Search by date"
                    className="border text-sm h-8 p-2 border-gray-300 shadow-sm  focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    className="text-xs hover:text-blue-500 hover:underline"
                    onClick={() => {
                        setSerchDate("");
                    }}
                >
                    See all
                </button>
            </div>
            <div className="relative flex flex-col max-w-7xl mx-auto mt-6 h-full overflow-x-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                <table className="w-full text-left table-auto min-w-max text-slate-800">
                    <thead>
                        <tr className="text-white border-b border-slate-300 bg-blue-500">
                            <th className="p-4 border-r border-gray-400">
                                <p className="text-sm leading-none font-normal">
                                    ...
                                </p>
                            </th>
                            <th className="p-4 border-r border-gray-400">
                                <p className="text-sm leading-none font-normal">
                                    Date
                                </p>
                            </th>
                            <th className="p-4 border-r border-gray-400">
                                <p className="text-sm leading-none font-normal">
                                    Time of Date
                                </p>
                            </th>
                            <th className="p-4 border-r border-gray-400">
                                <p className="text-sm leading-none font-normal">
                                    Hall
                                </p>
                            </th>
                            <th className="p-4 border-r border-gray-400">
                                <p className="text-sm leading-none font-normal">
                                    Customers Name
                                </p>
                            </th>
                            <th className="p-4 border-r border-gray-400">
                                <p className="text-sm leading-none font-normal">
                                    LastName
                                </p>
                            </th>
                            <th className="p-4 border-r border-gray-400">
                                <p className="text-sm leading-none font-normal">
                                    Menu No
                                </p>
                            </th>
                            <th className="p-4 border-r border-gray-400">
                                <p className="text-sm leading-none font-normal">
                                    Type
                                </p>
                            </th>
                            <th className="p-4 border-r border-gray-400">
                                <p className="text-sm leading-none font-normal">
                                    Price
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item, index) => {
                                // We'll create 2 rows: one for Day, one for Night
                                return (
                                    <React.Fragment key={index}>
                                        {/* --- DAY ROW --- */}
                                        <tr
                                            className={`${
                                                item.booking
                                                    ? item.booking.due == 0
                                                        ? "bg-green-100"
                                                        : "bg-yellow-100"
                                                    : ""
                                            } border-b border-gray-400`}
                                        >
                                            <td className="pl-4 border-r border-gray-400">
                                                <button
                                                    onClick={() => {
                                                        if (item.booking) {
                                                            submit(
                                                                item.booking.id
                                                            );
                                                        }
                                                    }}
                                                    className="text-blue-500 text-base"
                                                >
                                                    &#xe095;
                                                </button>
                                            </td>
                                            <td className="px-4 py-1 border-r border-gray-400">
                                                {item.date}
                                            </td>
                                            <td className="px-4 py-1 border-r border-gray-400">
                                                {item.timeOfDay}
                                            </td>
                                            <td className="px-4 py-1 border-r border-gray-400">
                                                {item.hallName}
                                            </td>
                                            {item.booking ? (
                                                <>
                                                    <td className="px-4 py-1 border-r border-gray-400">
                                                        {item.booking.firstName}
                                                    </td>
                                                    <td className="px-4 py-1 border-r border-gray-400">
                                                        {item.booking.lastName}
                                                    </td>
                                                    <td className="px-4 py-1 border-r border-gray-400">
                                                        {item.booking.menu_no}
                                                    </td>
                                                    <td className="px-4 py-1 border-r border-gray-400">
                                                        {item.booking.type}
                                                    </td>
                                                    <td className="px-4 py-1 border-r border-gray-400">
                                                        {item.booking
                                                            .menu_price *
                                                            item.booking
                                                                .personQuantity}
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td
                                                        colSpan="3"
                                                        className="px-4 py-1"
                                                        style={{
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        No Booking
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                        {/* --- NIGHT ROW ---
                                        <tr
                                            className={`${
                                                item.nightBooking
                                                    ? item.nightBooking.due == 0
                                                        ? "bg-green-100"
                                                        : "bg-yellow-100"
                                                    : ""
                                            } border-b border-gray-400`}
                                        >
                                            <td className="px-4 py-1 border-r border-gray-400">
                                                <button
                                                    onClick={() => {
                                                        if (item.nightBooking) {
                                                            submit(
                                                                item
                                                                    .nightBooking
                                                                    .id
                                                            );
                                                        }
                                                    }}
                                                    className="text-blue-500 text-base"
                                                >
                                                    &#xe095;
                                                </button>
                                            </td>
                                            <td className="px-4 py-1 border-r border-gray-400">
                                                {item.date}
                                            </td>
                                            <td className="px-4 py-1 border-r border-gray-400 ">
                                                Night
                                            </td>
                                            <td className="px-4 py-1 border-r border-gray-400">
                                                {" "}
                                                {item.nightBooking &&
                                                    item.nightBooking.hall_name}
                                            </td>
                                            {item.nightBooking ? (
                                                <>
                                                    <td className="px-4 py-1 border-r border-gray-400">
                                                        {
                                                            item.nightBooking
                                                                .firstName
                                                        }
                                                    </td>
                                                    <td className="px-4 py-1 border-r border-gray-400">
                                                        {
                                                            item.nightBooking
                                                                .lastName
                                                        }
                                                    </td>
                                                    <td className="px-4 py-1 border-r border-gray-400">
                                                        {item.nightBooking.type}
                                                    </td>
                                                    <td className="px-4 py-1 border-r border-gray-400">
                                                        {item.nightBooking
                                                            .menu_price *
                                                            item.nightBooking
                                                                .personQuantity}
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td
                                                        colSpan="3"
                                                        className="px-4 py-1"
                                                        style={{
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        No Booking
                                                    </td>
                                                </>
                                            )}
                                        </tr> */}
                                    </React.Fragment>
                                );
                            })
                        ) : (
                            <tr className="">
                                {" "}
                                <td
                                    className="px-4 py-2 font-bold text-center"
                                    colSpan="7"
                                >
                                    No results found!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
};

export default SaleReport;
