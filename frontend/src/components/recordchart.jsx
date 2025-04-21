import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryDoughnutChart = ({ records }) => {
  const categoryTotals = {};

  records.forEach((record) => {
    const category = record.category;
    const amount = Number(record.amount);

    if (!categoryTotals[category]) {
      categoryTotals[category] = 0;
    }

    categoryTotals[category] += amount;
  });

  const chartData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "₹ Spent",
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#8B0000",
          "#228B22",
          "#00CED1",
          "#FF69B4",
        ],
        borderColor: "#fff",
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#333",
          font: {
            size: 14,
            weight: "500",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `₹ ${context.raw}`;
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#444" }}>
        Expenses chart by category
      </h2>
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
};

export default CategoryDoughnutChart;
