const addBtn = document.getElementById("addProductBtn");
const modal = document.getElementById("productModal");
const cancelBtn = document.getElementById("cancelBtn");
const saveBtn = document.getElementById("saveProductBtn");
const tableBody = document.getElementById("productTableBody");

let products = [];
let editIndex = null;

// Open modal
addBtn.addEventListener("click", () => {
  modal.setAttribute("aria-hidden", "false");
  document.getElementById("modalTitle").textContent = "Add Product";
  clearForm();
  editIndex = null;
});

// Close modal
cancelBtn.addEventListener("click", () => modal.setAttribute("aria-hidden", "true"));

// Save product
saveBtn.addEventListener("click", () => {
  const name = document.getElementById("productName").value.trim();
  const category = document.getElementById("productCategory").value.trim();
  const price = document.getElementById("productPrice").value.trim();
  const stock = document.getElementById("productStock").value.trim();
  const imageFile = document.getElementById("productImage").files[0];

  if (!name || !category || !price || !stock) return alert("Please fill all fields.");

  const imageUrl = imageFile ? URL.createObjectURL(imageFile) : "https://via.placeholder.com/60";

  const productData = { name, category, price, stock, imageUrl };

  if (editIndex !== null) {
    products[editIndex] = productData;
  } else {
    products.push(productData);
  }

  renderTable();
  modal.setAttribute("aria-hidden", "true");
});

// Render product table
function renderTable() {
  tableBody.innerHTML = "";
  products.forEach((product, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${product.imageUrl}" alt="${product.name}"></td>
      <td>${product.name}</td>
      <td>${product.category}</td>
      <td>₱${product.price}</td>
      <td>${product.stock}</td>
      <td>
        <div class="row-actions">
          <button class="edit-btn" onclick="editProduct(${index})">Edit</button>
          <button class="delete-btn" onclick="deleteProduct(${index})">Delete</button>
        </div>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Edit
function editProduct(index) {
  const product = products[index];
  document.getElementById("modalTitle").textContent = "Edit Product";
  document.getElementById("productName").value = product.name;
  document.getElementById("productCategory").value = product.category;
  document.getElementById("productPrice").value = product.price;
  document.getElementById("productStock").value = product.stock;
  editIndex = index;
  modal.setAttribute("aria-hidden", "false");
}

// Delete
function deleteProduct(index) {
  if (confirm("Delete this product?")) {
    products.splice(index, 1);
    renderTable();
  }
}

function clearForm() {
  document.getElementById("productName").value = "";
  document.getElementById("productCategory").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productStock").value = "";
  document.getElementById("productImage").value = "";
}
