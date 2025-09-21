import img1 from "./dollar.png";
import img2 from "./price.png";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Graph from "./Charts/Graph";
import Reservation from "./Dashboard/Reservation";
import Charts from "./Charts/Charts";
import Card from "@/Components/Card";

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
                <h2 className="section-title">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-2">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        <Card>
                            <Card.Body>
                                <div className="flex items-center">
                                    <div className="rounded-lg bg-primary-100 p-3 mr-4">
                                        <img src={img2} className="w-8 h-8" alt="Purchase" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Purchase Summary</p>
                                        <div className="flex space-x-4 mt-1">
                                            <span className="text-sm">Daily: <strong>{dailyPurchase}</strong></span>
                                            <span className="text-sm">Weekly: <strong>{weeklyPurchase}</strong></span>
                                            <span className="text-sm">Monthly: <strong>{monthlyPurchase}</strong></span>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                        
                        <Card>
                            <Card.Body>
                                <div className="flex items-center">
                                    <div className="rounded-lg bg-yellow-100 p-3 mr-4">
                                        <img src={img1} className="w-8 h-8" alt="Booking" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Booking Summary</p>
                                        <div className="flex space-x-4 mt-1">
                                            <span className="text-sm">Daily: <strong>{dailyBooking}</strong></span>
                                            <span className="text-sm">Weekly: <strong>{weeklyBooking}</strong></span>
                                            <span className="text-sm">Monthly: <strong>{monthlyBooking}</strong></span>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                        
                        <Card>
                            <Card.Body>
                                <div className="flex items-center">
                                    <div className="rounded-lg bg-green-100 p-3 mr-4">
                                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Sales Summary</p>
                                        <div className="flex space-x-4 mt-1">
                                            <span className="text-sm">Daily: <strong>{dailySales}</strong></span>
                                            <span className="text-sm">Weekly: <strong>{weeklySales}</strong></span>
                                            <span className="text-sm">Monthly: <strong>{monthlySales}</strong></span>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <Card.Header>
                                <Card.Title>Sales Overview (Last 3 Months)</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Graph salesData={salesData} />
                            </Card.Body>
                        </Card>
                        
                        <Card>
                            <Card.Header>
                                <Card.Title>
                                    Sales Overview (Last 7 Days)
                                    <span className="text-xs text-blue-500 ml-2">
                                        Total: {weeklySales}
                                    </span>
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Charts weeklyReport={weeklyReport} />
                            </Card.Body>
                        </Card>
                    </div>
                    
                    <div className="mt-6">
                        <Reservation reservated={reservated} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}