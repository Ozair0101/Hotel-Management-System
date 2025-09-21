import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    Legend,
    LinearScale,
    Title,
    Tooltip,
    PointElement,
    LineElement,
    Filler,
    plugins,
} from "chart.js";
import { useState } from "react";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Filler,
    Tooltip,
    Legend
);
const generated7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        days.push(date.toISOString().split("T")[0]);
    }
    return days;
};

const Charts = ({ weeklyReport }) => {
    const last7Days = generated7Days();

    // convert API data to key-value pairs (date => sales)
    const salesMap = weeklyReport.reduce((acc, curr) => {
        acc[curr.date] = curr.sales;
        return acc;
    }, {});

    const completeSalesData = last7Days.map((date) => ({
        date,
        totalSales: salesMap[date] || 0,
    }));

    const labels = completeSalesData.map((data) => {
        return new Date(data.date).toLocaleDateString("en-US", {
            weekday: "short", // "Mon", "Sun", "Tue"
        });
    });

    const salesData = completeSalesData.map((data) => data.totalSales);
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Weekly Sales",
                data: salesData,
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
        ],
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: "top" },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
            x: {
                ticks: { font: { size: 14, weight: "bold" } },
            },
        },
    };
    return (
        <>
            <Bar data={data} options={options} />
        </>
    );
};

export default Charts;
