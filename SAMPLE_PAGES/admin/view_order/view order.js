// view_order.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MOCK DATA ---
    // In a real application, the Order ID would be extracted from the URL (e.g., /view_order/TG9876) 
    // and this data would be fetched from an API.
    const mockOrder = {
        id: 'TG9876',
        customer: {
            name: 'Emma T.',
            email: 'emma.t@example.com',
            address: '45 Thrift St, Apt 2B, Los Angeles, CA 90001'
        },
        date: '2025-10-23',
        payment: 'Credit Card',
        status: 'Delivered', // Initial Status
        items: [
            { name: 'Vintage Plaid Shirt', price: 25.00, qty: 1 },
            { name: 'Levi\'s 501 Jeans (Used)', price: 40.00, qty: 1 },
            { name: 'Knit Beanie Hat', price: 5.00, qty: 1 }
        ],
        subtotal: 70.00,
        shipping: 5.00,
        tax: 3.25,
        total: 78.25
    };
    
    // --- 2. STATUS CYCLE LOGIC (Reused from orders.js) ---
    const statusCycle = {
        'Pending': 'Shipped',
        'Shipped': 'Delivered',
        'Delivered': 'Pending',
        'Cancelled': 'Pending'
    };

    const statusBadgeEl = document.getElementById('summary-status');
    const updateStatusBtn = document.getElementById('update-status-btn');
    
    /**
     * Renders the order details onto the page.
     */
    function renderOrderDetails() {
        const order = mockOrder;
        
        // Update main title
        document.getElementById('order-detail-title').textContent = `Order #${order.id} Details`;

        // Update Summary Card
        document.getElementById('summary-date').textContent = order.date;
        document.getElementById('summary-payment').textContent = order.payment;
        document.getElementById('summary-total').textContent = `$${order.total.toFixed(2)}`;

        // Update Customer Details
        document.getElementById('customer-name').textContent = order.customer.name;
         document.getElementById('customer-number').textContent = order.customer.name;
        document.getElementById('customer-email').textContent = order.customer.email;
        document.getElementById('customer-address').textContent = order.customer.address;
        
        // Update Status Badge
        updateStatusBadge(order.status);
        
        // Render Items Table
        renderItems(order.items, order.shipping, order.tax, order.total);
    }

    /**
     * Updates the status badge and button text.
     * @param {string} newStatus - The new status value (e.g., 'Shipped').
     */
    function updateStatusBadge(newStatus) {
        statusBadgeEl.className = 'status-badge'; // Reset classes
        statusBadgeEl.textContent = newStatus;
        statusBadgeEl.classList.add(`status-${newStatus}`);
        
        // Update button data-attribute for action
        updateStatusBtn.setAttribute('data-current-status', newStatus);
        
        // Change button text based on the next status
        const nextStatus = statusCycle[newStatus] || 'Change Status';
        updateStatusBtn.textContent = `Set to ${nextStatus}`;
    }

    /**
     * Renders the list of items in the table.
     * @param {Array} items - Array of item objects.
     */
    function renderItems(items, shipping, tax, total) {
        const tableBody = document.getElementById('items-table-body');
        tableBody.innerHTML = ''; // Clear items

        let itemRowsHTML = '';
        let currentSubtotal = 0;

        items.forEach(item => {
            const lineTotal = item.price * item.qty;
            currentSubtotal += lineTotal;
            itemRowsHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td class="text-right">$${item.price.toFixed(2)}</td>
                    <td class="text-right">${item.qty}</td>
                    <td class="text-right">$${lineTotal.toFixed(2)}</td>
                </tr>
            `;
        });
        
        // Add Summary Rows
        const summaryRowsHTML = `
            <tr><td colspan="3" class="text-right"><strong>Subtotal:</strong></td><td class="text-right">$${currentSubtotal.toFixed(2)}</td></tr>
            <tr><td colspan="3" class="text-right">Shipping:</td><td class="text-right">$${shipping.toFixed(2)}</td></tr>
            <tr><td colspan="3" class="text-right">Tax:</td><td class="text-right">$${tax.toFixed(2)}</td></tr>
            <tr class="total-line">
                <td colspan="3" class="text-right"><strong>TOTAL:</strong></td>
                <td class="text-right total-amount">$${total.toFixed(2)}</td>
            </tr>
        `;
        
        tableBody.innerHTML = itemRowsHTML + summaryRowsHTML;
    }

    // --- 3. EVENT LISTENERS ---
    
    // Status Update Click
    updateStatusBtn.addEventListener('click', () => {
        const currentStatus = updateStatusBtn.getAttribute('data-current-status');
        const nextStatus = statusCycle[currentStatus];
        
        if (nextStatus) {
            // In a real app, you'd make an API call here to change the status
            mockOrder.status = nextStatus;
            updateStatusBadge(nextStatus);
            console.log(`Order ${mockOrder.id} status updated to: ${nextStatus}`);
        }
    });

    // Cancel Order Click (Example Action)
    document.getElementById('cancel-order-btn').addEventListener('click', () => {
        if (confirm(`Are you sure you want to cancel Order #${mockOrder.id}?`)) {
            // In a real app, you'd send an API call to cancel the order
            mockOrder.status = 'Cancelled';
            updateStatusBadge('Cancelled');
            console.log(`Order ${mockOrder.id} has been cancelled.`);
            // Disable buttons after cancellation
            updateStatusBtn.disabled = true; 
            document.getElementById('cancel-order-btn').disabled = true;
        }
    });

    // Initial render
    renderOrderDetails();
});