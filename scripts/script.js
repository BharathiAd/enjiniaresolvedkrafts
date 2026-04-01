const products = [
  {id: 1, name: "Oceanic Smart Speaker", category: "Audio", price: 79.99, rating: 4.6, description: "Optimized build quality for quick prototype assembly testing.", image: "https://via.placeholder.com/640x400.png?text=Oceanic%20Smart%20Speaker"},
  {id: 2, name: "Arctic Sleep Pillow", category: "Home", price: 24.50, rating: 4.2, description: "High-comfort composite shell with CNC-cut foam insert.", image: "https://via.placeholder.com/640x400.png?text=Arctic%20Sleep%20Pillow"},
  {id: 3, name: "Solar Fitness Tracker", category: "Wearables", price: 129.00, rating: 4.8, description: "Precision micro-fit housing resistant to dust and moisture.", image: "https://via.placeholder.com/640x400.png?text=Solar%20Fitness%20Tracker"},
  {id: 4, name: "Graphite Wireless Mouse", category: "Computing", price: 38.90, rating: 4.4, image: "https://via.placeholder.com/640x400.png?text=Graphite%20Wireless%20Mouse"},
  {id: 5, name: "Skyline Drone Camera", category: "Photography", price: 249.99, rating: 4.7, image: "https://via.placeholder.com/640x400.png?text=Skyline%20Drone%20Camera"},
  {id: 6, name: "TrackPro Tennis Racket", category: "Sports", price: 89.25, rating: 4.3, image: "https://via.placeholder.com/640x400.png?text=TrackPro%20Tennis%20Racket"},
  {id: 7, name: "Lunar Candle Set", category: "Lifestyle", price: 33.10, rating: 4.1, image: "https://via.placeholder.com/640x400.png?text=Lunar%20Candle%20Set"},
  {id: 8, name: "Aurora E-Reader", category: "Gadgets", price: 159.00, rating: 4.5, image: "https://via.placeholder.com/640x400.png?text=Aurora%20E-Reader"},
  {id: 9, name: "Pulse Road Bike", category: "Outdoors", price: 999.00, rating: 4.9, image: "https://via.placeholder.com/640x400.png?text=Pulse%20Road%20Bike"},
  {id: 10, name: "Nova Desk Lamp", category: "Office", price: 45.00, rating: 4.3, image: "https://via.placeholder.com/640x400.png?text=Nova%20Desk%20Lamp"}
];

const productsEl = document.getElementById("products");
const searchEl = document.getElementById("search");

function renderProducts(list) {
  productsEl.innerHTML = "";
  if (!list.length) {
    productsEl.innerHTML = '<p style="grid-column:1/-1; text-align:center; color:#64748b">No products match your search.</p>';
    return;
  }

  list.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";
    const imageUrl = product.image || "https://via.placeholder.com/640x400?text=No+Image";
    card.innerHTML = `
      <img src="${imageUrl}" alt="${product.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/640x400?text=Image+Unavailable'" />
      <div class="info">
        <h3>${product.name}</h3>
        <div class="tagline"><span>${product.category}</span> <span>⭐ ${product.rating.toFixed(1)}</span></div>
        <p>${product.description || "High precision solution, optimized for modern workflows."}</p>
        <p class="price">$${product.price.toFixed(2)}</p>
      </div>
    `;
    productsEl.appendChild(card);
  });
}

function filterProducts(query) {
  const normalized = query.trim().toLowerCase();
  const filtered = normalized
    ? products.filter((p) => p.name.toLowerCase().includes(normalized) || p.category.toLowerCase().includes(normalized))
    : products;
  renderProducts(filtered);
}

searchEl.addEventListener("input", (event) => filterProducts(event.target.value));

// Dropdown menu interactivity
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
  dropdown.addEventListener('mouseenter', () => {
    const menu = dropdown.querySelector('.dropdown-menu');
    if (menu) menu.style.display = 'block';
  });

  dropdown.addEventListener('mouseleave', () => {
    const menu = dropdown.querySelector('.dropdown-menu');
    if (menu) menu.style.display = 'none';
  });
});

renderProducts(products);
