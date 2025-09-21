import { usePage } from "@inertiajs/react";
import SelectMenu from "./Select";
import { useEffect, useMemo, useState } from "react";

const options = [
    {
        name: "Night",
        id: 1,
    },
    {
        name: "Day",
        id: 2,
    },
];

const Reservation = ({ reservated }) => {
    const { halls } = usePage().props;
    // State for filtering
    const [filteredDays, setFilteredDays] = useState("Night");
    const [filteredHalls, setFilteredHalls] = useState(halls[0]["name"]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    // console.log(halls[0]["name"]);
    useEffect(() => {
        generateReport();
    }, [filteredDays, filteredHalls]);

    // Function to generate next 7 days' bookings
    const generateReport = () => {
        let current = new Date();
        let end1 = new Date();
        end1.setDate(current.getDate() + 7); // Next 7 days

        let bookings = [];

        while (current <= end1) {
            const dateStr = current.toISOString().split("T")[0];

            // Find booking for this date and selected filters
            const booking = reservated.find(
                (b) =>
                    b.date === dateStr &&
                    b.hall_name === filteredHalls &&
                    b.typeDays === filteredDays
            );

            // Add to the list
            bookings.push({
                date: dateStr,
                hall: filteredHalls,
                timeOfDay: filteredDays,
                booking: booking
                    ? `${booking.firstName} ${booking.lastName}`
                    : "No Booking",
            });

            // Move to next day
            current.setDate(current.getDate() + 1);
        }

        setFilteredBookings(bookings);
    };

    // Handle select changes
    const handleFilterChange = (event, type) => {
        const value = event.target.value;
        if (type === "salon") setFilteredHalls(value);
        if (type === "time") setFilteredDays(value);
    };
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleDateString("en-US", { month: "long" });
    const year = today.getFullYear();

    return (
        <div
            className="flex items-end mt-4 space-y-2 w-1/2 lg:w-1/2 md:w-2/3 sm:w-2/3"
            dir="rtl"
        >
            <div>
                <div className=" border-b flex items-center justify-between">
                    <h1 className="text-xl text-gray-600 font-medium">
                        Reservations
                    </h1>
                    <div className="flex mt-4 items-center text-gray-600 gap-1 max-w-fit py-2">
                        <div className="text-[0.6rem]">
                            <p className="">{month}</p>
                            <p className="">{year}</p>
                        </div>
                        <p className="text-4xl font-medium">{day}</p>
                    </div>
                </div>
                <div className="font-medium my-3 flex justify-between">
                    <select
                        value={filteredHalls}
                        onChange={(e) => handleFilterChange(e, "salon")}
                        className="h-5 flex items-center py-0 text-gray-600 bg-gray-100 border-none rounded-sm text-sm"
                    >
                        {halls.map((salon, index) => (
                            <option key={index} value={salon.name}>
                                {salon.name}
                            </option>
                        ))}
                    </select>
                    <div className="w-18">
                        <select
                            value={filteredDays}
                            onChange={(e) => handleFilterChange(e, "time")}
                            className="h-5 flex items-center py-0 text-gray-600 bg-gray-100 border-none rounded-sm text-sm"
                        >
                            <option value="Night">Night</option>
                            <option value="Day">Day</option>
                        </select>
                    </div>
                </div>
                <div className="relative mt-2 flex flex-col mx-auto h-full text-gray-700 bg-white ">
                    <table className="table-auto min-w-max text-slate-800 text-right">
                        <thead>
                            <tr className="border-b font-bold border-slate-300 bg-gray-50">
                                <th className="px-4 py-2">
                                    <p className="text-sm leading-none">نام</p>
                                </th>

                                <th className="px-4">
                                    <p className="text-sm leading-none">
                                        تاریخ
                                    </p>
                                </th>
                                <th className="px-4">
                                    <p className="text-sm leading-none">
                                        شب یا روز
                                    </p>
                                </th>
                                <th className="px-4">
                                    <p className="text-sm leading-none">
                                        صالون
                                    </p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.map((item, index) => (
                                <tr
                                    className={`${
                                        item.booking !== "No Booking"
                                            ? "bg-green-100"
                                            : ""
                                    } "border-b border-slate-200"`}
                                    key={index}
                                >
                                    <td className="px-4">
                                        <p
                                            className={`text-sm ${
                                                item.booking === "No Booking"
                                                    ? "text-red-700"
                                                    : ""
                                            }`}
                                        >
                                            {item.booking}
                                        </p>
                                    </td>

                                    <td className="px-4">
                                        <p className="text-sm">{item.date}</p>
                                    </td>
                                    <td className="px-4">
                                        <p className="text-sm">
                                            {item.timeOfDay}
                                        </p>
                                    </td>
                                    <td className="px-4">
                                        <p className="text-sm">{item.hall}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Reservation;
