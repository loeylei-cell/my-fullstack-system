const products = [
  {
    id: 1,
    name: "Retro Fade Tee",
    description: "Soft cotton tee with natural vintage fade. Feels broken-in and comfy.",
    price: 99.00,
    condition: "Good",
    image: "p1.jpg"
  },
  {
    id: 2,
    name: "Checkmate Polo",
    description: "Classic check pattern with that clean thrift find vibe.",
    price: 120.00,
    condition: "Like New",
    image: "p2.jpg"
  },
  {
    id: 3,
    name: "Street Rider Jacket",
    description: "Sleek bomber jacket perfect for layering. Lightly worn, still sharp.",
    price: 180.00,
    condition: "Excellent",
    image: "p3.jpg"
  },
  {
    id: 4,
    name: "Striped Chill Shirt",
    description: "Relaxed fit with cool stripes. Everyday essential piece.",
    price: 85.00,
    condition: "Good",
    image: "p4.jpg"
  },
  {
    id: 5,
    name: "Faith Print Tee",
    description: "Worn-in graphic tee with soft fabric and a story to tell.",
    price: 75.00,
    condition: "Used",
    image: "p5.jpg"
  },
  {
    id: 6,
    name: "Sunset Graphic Tee",
    description: "Eye-catching print, comfy and breathable for daily wear.",
    price: 90.00,
    condition: "Prestine",
    image: "p6.jpg"
  },
  {
    id: 7,
    name: "Classic Stripe Polo",
    description: "Timeless thrift gem with soft texture and laid-back style.",
    price: 110.00,
    condition: "Almost New",
    image: "p7.jpg"
  }
];   
   
   const grid = document.getElementById("productGrid");
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    function renderProducts(filter = "") {
      grid.innerHTML = "";
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(filter.toLowerCase()) ||
        p.description.toLowerCase().includes(filter.toLowerCase())
      );

      if (filtered.length === 0) {
        grid.innerHTML = "<p class='no-results'>No matching products found.</p>";
        return;
      }

      filtered.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <img src="${p.image}" alt="${p.name}">
          <div class="card-details">
            <p class="description"><b>${p.name}</b> ${p.description}</p>
            <div class="price-condition">
              <span class="price">₱${p.price}</span>
              <span class="condition">${p.condition}</span>
            </div>
            <div class="card-actions">
              <button class="btn add-btn">Add</button>
              <button class="btn buy-btn">Buy Now</button>
            </div>
          </div>`;
        grid.appendChild(card);
      });
    }

    searchBtn.addEventListener("click", () => renderProducts(searchInput.value));
    searchInput.addEventListener("input", () => renderProducts(searchInput.value));

    renderProducts();


