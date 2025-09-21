import img1 from "./dollar.png";
import img2 from "./price.png";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Graph from "./Charts/Graph";
import Reservation from "./Dashboard/Reservation";
import Charts from "./Charts/Charts";

export default function Dashboard({
    dailyPurchase,
    weeklyPurchase,
    monthlyPurchase,
    dailySales,
    weeklySales,
    monthlySales,
    dailyBooking,
    weeklyBooking,
    monthlyBooking,
    reservated,
    salesData,
    weeklyReport,
}) {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleDateString("en-US", { month: "long" });
    const year = today.getFullYear();

    const handleChange = (event) => {
        setSelectedFilter(event);
        router.get(route("home"), { filter: event });
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden max-w-7xl bg-white shadow-sm sm:rounded-lg">
                        <div dir="rtl" className="px-4 flex justify-between">
                            <Reservation reservated={reservated} />
                            <div
                                dir="ltr"
                                className="flex lg:w-2/5 md:w-1/2  gap-3"
                            >
                                <div className="bg-green-400 flex flex-col self-center justify-center px-6 mt-4 rounded-md shadow-md py-4 border w-full">
                                    <img
                                        src={img2}
                                        className="w-8 mx-auto mb-4"
                                        alt=""
                                    />
                                    <h2 className="font-bold mx-auto text-xs mb-2">
                                        Purchase Summary
                                    </h2>
                                    <p className="text-sm">
                                        Daily: <strong>{dailyPurchase}</strong>{" "}
                                    </p>
                                    <p className="text-sm">
                                        Weekly:{" "}
                                        <strong>{weeklyPurchase}</strong>
                                    </p>
                                    <p className="text-sm">
                                        Monthly:{" "}
                                        <strong>{monthlyPurchase}</strong>{" "}
                                    </p>
                                </div>
                                <div className="bg-yellow-400 flex flex-col self-center justify-center px-6 mt-4 rounded-md shadow-md py-4 border w-full">
                                    <img
                                        src={img1}
                                        className="w-8 mx-auto mb-4"
                                        alt=""
                                    />
                                    <h2 className="font-bold mx-auto text-xs mb-2">
                                        Booking Summary
                                    </h2>
                                    <p className="text-sm">
                                        Daily: <strong>{dailyBooking}</strong>
                                    </p>
                                    <p className="text-sm">
                                        Weekly: <strong>{weeklyBooking}</strong>
                                    </p>
                                    <p className="text-sm">
                                        Monthly:
                                        <strong>{monthlyBooking}</strong>
                                    </p>
                                </div>

                                {/* 
                                    <p className="text-sm">
                                       
                                    </p>
                                    <p className="text-sm">
                                       
                                    </p>
                                </div> */}
                            </div>
                        </div>
                        <div className="flex gap-6 justify-between mt-4 p-4 ">
                            <div className="w-1/2 self-center mx-auto">
                                <h2 className="text-xl mb-2 font-medium">
                                    Sales Overview ( Last 3 Months )
                                </h2>
                                <div className="">
                                    <Graph salesData={salesData} />
                                </div>
                            </div>
                            <div className="w-1/2">
                                <h2 className="text-xl mb-2 font-medium">
                                    Sales Overview ( Last 7 Days ){" "}
                                    <span className="text-xs text-blue-500">
                                        Total:{weeklySales}
                                    </span>
                                </h2>
                                <div className="">
                                    <Charts weeklyReport={weeklyReport} />
                                </div>
                            </div>
                        </div>
                        {/* <div className="flex flex-col justify-center px-6 mt-4 rounded-md shadow-md py-4  self-center border w-fit">
                            <h2 className="font-bold mb-2">Sales Summary</h2>
                            <p className="text-sm">
                                Daily: <strong>{dailySales} </strong>
                            </p>
                            <p className="text-sm">
                                Weekly: <strong>{weeklySales}</strong>
                            </p>
                            <p className="text-sm">
                                Monthly: <strong>{monthlySales} </strong>
                            </p>
                        </div>*/}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

{
    /* <div className="flex justify-end px-4 ">
    <div className="flex mt-4 flex-col items-center text-gray-600 px-12 lg:px-16 md:px-14 sm:px-12 justify-end max-w-fit border shadow-md rounded-md py-2">
        <p className="text-sm">{month}</p>
        <p className="text-8xl ">{day}</p>
        <p className="text-sm">{year}</p>
    </div>
</div> */
}
