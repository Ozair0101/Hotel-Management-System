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
    plugins,
    Filler,
} from "chart.js";
import { useState } from "react";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Filler,
    Tooltip,
    Legend
);
const Graph = ({ salesData }) => {
    // Extract months and sales values
    const months = salesData.map((data) => {
        const [year, month] = data.month.split("-");
        return new Date(year, month - 1).toLocaleDateString("default", {
            month: "short",
        });
    });
    const sales = salesData.map((data) => data.totalSales);
    // Chart.js data configuration
    const data = {
        labels: months,
        datasets: [
            {
                label: "Sales Trend",
                data: sales,
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointBackgroundColor: "red",
                pointBorderColor: "#fff",
                pointHoverRadius: 8,
            },
        ],
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: false,
                ticks: { font: { size: 14 } },
            },
            x: {
                ticks: { font: { size: 16, weight: "bold" } },
            },
        },
        plugins: {
            Legend: {
                display: true,
                labels: {
                    font: {
                        size: 14,
                    },
                },
            },
        },
    };
    return (
        <>
            <Line data={data} options={options} />
        </>
    );
};

export default Graph;
