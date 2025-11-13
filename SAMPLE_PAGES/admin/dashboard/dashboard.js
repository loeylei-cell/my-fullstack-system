document.addEventListener("DOMContentLoaded", () => {
  // Revenue line chart
  const ctxRevenue = document.getElementById("revenueChart").getContext("2d");
  new Chart(ctxRevenue, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Revenue (₱)",
          data: [0, 0, 0, 0, 0, 0],
          borderColor: "#ee4d2d",
          backgroundColor: "rgba(238, 77, 45, 0.1)",
          tension: 0.3,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true },
      },
    },
  });

  // Top Selling Products bar chart
  const ctxProduct = document.getElementById("productChart").getContext("2d");
  new Chart(ctxProduct, {
    type: "bar",
    data: {
      labels: ["Nike", "Champion", "Adidas", "Carthart", "Chrome"],
      datasets: [
        {
          label: "Units Sold",
          data: [0, 0, 0, 0, 0],
          backgroundColor: "#ee4d2d",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true },
      },
    },
  });
});
