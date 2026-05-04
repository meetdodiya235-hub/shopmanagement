// State Management
let products = JSON.parse(localStorage.getItem('products')) || [
    { id: 1, name: "Wireless Mouse", category: "Electronics", price: 25.00, stock: 12 },
    { id: 2, name: "Gaming Keyboard", category: "Electronics", price: 85.00, stock: 4 }
];
let sales = JSON.parse(localStorage.getItem('sales')) || [];

// Navigation Logic
const navItems = document.querySelectorAll('.nav-links li');
const sections = document.querySelectorAll('section');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const target = item.getAttribute('data-target');
        
        // Update UI
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        sections.forEach(s => s.classList.remove('active-section'));
        document.getElementById(target).classList.add('active-section');
        
        renderData();
    });
});

// Modal Logic
const modal = document.getElementById('modal');
document.getElementById('open-modal').onclick = () => modal.style.display = 'flex';
document.getElementById('close-modal').onclick = () => modal.style.display = 'none';

// Core Functions
function renderData() {
    // 1. Dashboard Stats
    document.getElementById('total-sales').innerText = sales.length;
    const revenue = sales.reduce((sum, s) => sum + s.total, 0);
    document.getElementById('total-revenue').innerText = `$${revenue.toFixed(2)}`;
    document.getElementById('low-stock-count').innerText = products.filter(p => p.stock < 5).length;

    // 2. Inventory Table
    const invBody = document.querySelector('#inventory-table tbody');
    invBody.innerHTML = products.map(p => `
        <tr>
            <td>${p.name}</td>
            <td>${p.category}</td>
            <td>$${p.price.toFixed(2)}</td>
            <td><span style="color: ${p.stock < 5 ? 'var(--danger)' : 'inherit'}">${p.stock}</span></td>
            <td><button class="btn-primary" style="padding: 5px 10px;" onclick="sellOne(${p.id})">Sell One</button></td>
        </tr>
    `).join('');

    // 3. Sales Table
    const salesBody = document.querySelector('#sales-table tbody');
    salesBody.innerHTML = sales.map(s => `
        <tr>
            <td>${s.date}</td>
            <td>${s.name}</td>
            <td>${s.qty}</td>
            <td>$${s.total.toFixed(2)}</td>
        </tr>
    `).join('');

    // Save to storage
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('sales', JSON.stringify(sales));
}

function sellOne(id) {
    const product = products.find(p => p.id === id);
    if(product.stock > 0) {
        product.stock--;
        sales.push({
            date: new Date().toLocaleDateString(),
            name: product.name,
            qty: 1,
            total: product.price
        });
        renderData();
    } else {
        alert("Out of stock!");
    }
}

document.getElementById('save-product').onclick = () => {
    const name = document.getElementById('p-name').value;
    const cat = document.getElementById('p-cat').value;
    const price = parseFloat(document.getElementById('p-price').value);
    const stock = parseInt(document.getElementById('p-stock').value);

    if(name && cat && price && stock) {
        products.push({ id: Date.now(), name, category: cat, price, stock });
        modal.style.display = 'none';
        renderData();
        // Clear inputs
        document.querySelectorAll('.modal-content input').forEach(i => i.value = '');
    }
};

// Initial Render
renderData();
