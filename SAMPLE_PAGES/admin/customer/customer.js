document.addEventListener("DOMContentLoaded", async () => {
  const customerList = document.getElementById("customerList");

  try {
    // Simulate fetching from backend
    // Replace this with your API call once backend is ready:
    // const response = await fetch("/api/customers");
    // const customers = await response.json();

    // Temporary placeholder data
    const customers = []; // change to mock data if you want to test

    // Clear previous rows
    customerList.innerHTML = "";

    if (customers.length === 0) {
      customerList.innerHTML = `
        <tr class="empty-state">
          <td colspan="5">No customers found yet.</td>
        </tr>
      `;
      return;
    }

    customers.forEach(customer => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${customer.id}</td>
        <td>${customer.name}</td>
        <td>${customer.email}</td>
        <td>${customer.phone || "N/A"}</td>
        <td>${new Date(customer.registeredDate).toLocaleDateString()}</td>
      `;
      customerList.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading customers:", error);
    customerList.innerHTML = `
      <tr class="empty-state">
        <td colspan="5">⚠️ Failed to load customers. Please try again later.</td>
      </tr>
    `;
  }
});
