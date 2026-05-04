// ===== Shop Management System =====

// Sample Data
const sampleProducts = [
    { id: 1, name: 'Wireless Headphones', sku: 'WH-001', category: 'electronics', price: 79.99, stock: 45, status: 'active', image: '🎧' },
    { id: 2, name: 'Smart Watch Pro', sku: 'SW-002', category: 'electronics', price: 199.99, stock: 23, status: 'active', image: '⌚' },
    { id: 3, name: 'Cotton T-Shirt', sku: 'CT-003', category: 'clothing', price: 24.99, stock: 120, status: 'active', image: '👕' },
    { id: 4, name: 'Leather Wallet', sku: 'LW-004', category: 'accessories', price: 49.99, stock: 8, status: 'active', image: '👛' },
    { id: 5, name: 'Bluetooth Speaker', sku: 'BS-005', category: 'electronics', price: 59.99, stock: 3, status: 'active', image: '🔊' },
    { id: 6, name: 'Running Shoes', sku: 'RS-006', category: 'clothing', price: 89.99, stock: 67, status: 'active', image: '👟' },
    { id: 7, name: 'Desk Lamp', sku: 'DL-007', category: 'home', price: 34.99, stock: 52, status: 'active', image: '💡' },
    { id: 8, name: 'Backpack', sku: 'BP-008', category: 'accessories', price: 64.99, stock: 15, status: 'inactive', image: '🎒' },
    { id: 9, name: 'Sunglasses', sku: 'SG-009', category: 'accessories', price: 129.99, stock: 28, status: 'active', image: '🕶️' },
    { id: 10, name: 'Plant Pot Set', sku: 'PP-010', category: 'home', price: 19.99, stock: 5, status: 'active', image: '🪴' },
];

const sampleOrders = [
    { id: 'ORD-001', customer: 'Alice Johnson', email: 'alice@email.com', products: 3, total: 234.97, date: '2025-05-03', status: 'delivered' },
    { id: 'ORD-002', customer: 'Bob Smith', email: 'bob@email.com', products: 1, total: 79.99, date: '2025-05-03', status: 'shipped' },
    { id: 'ORD-003', customer: 'Carol White', email: 'carol@email.com', products: 5, total: 459.95, date: '2025-05-02', status: 'processing' },
    { id: 'ORD-004', customer: 'David Brown', email: 'david@email.com', products: 2, total: 124.98, date: '2025-05-02', status: 'pending' },
    { id: 'ORD-005', customer: 'Eva Martinez', email: 'eva@email.com', products: 4, total: 289.96, date: '2025-05-01', status: 'delivered' },
    { id: 'ORD-006', customer: 'Frank Wilson', email: 'frank@email.com', products: 1, total: 199.99, date: '2025-05-01', status: 'cancelled' },
    { id: 'ORD-007', customer: 'Grace Lee', email: 'grace@email.com', products: 3, total: 174.97, date: '2025-04-30', status: 'delivered' },
    { id: 'ORD-008', customer: 'Henry Taylor', email: 'henry@email.com', products: 2, total: 149.98, date: '2025-04-30', status: 'shipped' },
];

const sampleCustomers = [
    { id: 1, name: 'Alice Johnson', email: 'alice@email.com', phone: '+1 234-567-8901', orders: 12, spent: 1456.78, joined: '2024-03-15', avatar: 'AJ' },
    { id: 2, name: 'Bob Smith', email: 'bob@email.com', phone: '+1 234-567-8902', orders: 8, spent: 892.50, joined: '2024-05-22', avatar: 'BS' },
    { id: 3, name: 'Carol White', email: 'carol@email.com', phone: '+1 234-567-8903', orders: 23, spent: 3421.90, joined: '2023-11-08', avatar: 'CW' },
    { id: 4, name: 'David Brown', email: 'david@email.com', phone: '+1 234-567-8904', orders: 5, spent: 567.25, joined: '2024-08-30', avatar: 'DB' },
    { id: 5, name: 'Eva Martinez', email: 'eva@email.com', phone: '+1 234-567-8905', orders: 15, spent: 2134.60, joined: '2024-01-12', avatar: 'EM' },
    { id: 6, name: 'Frank Wilson', email: 'frank@email.com', phone: '+1 234-567-8906', orders: 3, spent: 289.99, joined: '2025-02-18', avatar: 'FW' },
];

// State Management
let state = {
    products: [...sampleProducts],
    orders: [...sampleOrders],
    customers: [...sampleCustomers],
    currentSection: 'dashboard',
    darkMode: false,
    pagination: {
        products: { page: 1, perPage: 5 },
        orders: { page: 1, perPage: 5 },
        customers: { page: 1, perPage: 5 }
    }
};

// DOM Elements
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.content-section');
const pageTitle = document.getElementById('pageTitle');
const modalOverlay = document.getElementById('modalOverlay');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalFooter = document.getElementById('modalFooter');
const modalClose = document.getElementById('modalClose');
const toastContainer = document.getElementById('toastContainer');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSidebar();
    initDashboard();
    initProducts();
    initOrders();
    initCustomers();
    initSettings();
    initModal();
    initSearch();
});

// ===== Navigation =====
function initNavigation() {
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;
            navigateToSection(section);
        });
    });

    // View all links
    document.querySelectorAll('.view-all').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            navigateToSection(section);
        });
    });
}

function navigateToSection(section) {
    state.currentSection = section;
    
    // Update nav active state
    navItems.forEach(item => {
        item.classList.toggle('active', item.dataset.section === section);
    });
    
    // Show correct section
    sections.forEach(s => {
        s.classList.toggle('active', s.id === section);
    });
    
    // Update page title
    pageTitle.textContent = section.charAt(0).toUpperCase() + section.slice(1);
    
    // Close mobile sidebar
    sidebar.classList.remove('mobile-open');
}

// ===== Sidebar =====
function initSidebar() {
    sidebarToggle.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
            sidebar.classList.toggle('mobile-open');
        } else {
            sidebar.classList.toggle('collapsed');
        }
    });
}

// ===== Dashboard =====
function initDashboard() {
    renderRecentOrders();
    renderTopProducts();
    renderLowStock();
    renderSalesChart();
}

function renderRecentOrders() {
    const container = document.getElementById('recentOrdersList');
    const recentOrders = state.orders.slice(0, 5);
    
    container.innerHTML = recentOrders.map(order => `
        <div class="order-item">
            <div class="order-info">
                <span class="order-id">${order.id}</span>
                <span class="order-customer">${order.customer}</span>
            </div>
            <div class="order-meta">
                <span class="order-amount">$${order.total.toFixed(2)}</span>
                <span class="order-date">${formatDate(order.date)}</span>
            </div>
        </div>
    `).join('');
}

function renderTopProducts() {
    const container = document.getElementById('topProductsList');
    const topProducts = [...state.products]
        .sort((a, b) => (100 - a.stock) - (100 - b.stock))
        .slice(0, 5);
    
    container.innerHTML = topProducts.map((product, index) => `
        <div class="product-item">
            <span class="product-rank">${index + 1}</span>
            <div class="product-info">
                <span class="product-name">${product.name}</span>
                <span class="product-category">${product.category}</span>
            </div>
            <span class="product-sales">$${(product.price * (100 - product.stock)).toFixed(2)}</span>
        </div>
    `).join('');
}

function renderLowStock() {
    const container = document.getElementById('lowStockList');
    const lowStockItems = state.products
        .filter(p => p.stock <= 10)
        .sort((a, b) => a.stock - b.stock)
        .slice(0, 5);
    
    container.innerHTML = lowStockItems.map(product => `
        <div class="stock-item">
            <div class="stock-info">
                <span class="stock-name">${product.name}</span>
                <span class="stock-sku">${product.sku}</span>
            </div>
            <span class="stock-count ${product.stock <= 5 ? 'critical' : 'warning'}">${product.stock} left</span>
        </div>
    `).join('');
}

function renderSalesChart() {
    const container = document.getElementById('salesChart');
    const salesData = [
        { label: 'Mon', value: 1200 },
        { label: 'Tue', value: 1900 },
        { label: 'Wed', value: 1500 },
        { label: 'Thu', value: 2200 },
        { label: 'Fri', value: 2800 },
        { label: 'Sat', value: 3100 },
        { label: 'Sun', value: 2400 }
    ];
    
    const maxValue = Math.max(...salesData.map(d => d.value));
    
    container.innerHTML = `
        <div class="bar-chart">
            ${salesData.map(data => `
                <div class="bar">
                    <span class="bar-value">$${data.value}</span>
                    <div class="bar-fill" style="height: ${(data.value / maxValue) * 200}px"></div>
                    <span class="bar-label">${data.label}</span>
                </div>
            `).join('')}
        </div>
    `;
}

// ===== Products =====
function initProducts() {
    renderProductsTable();
    
    document.getElementById('productSearch').addEventListener('input', (e) => {
        renderProductsTable(e.target.value);
    });
    
    document.getElementById('categoryFilter').addEventListener('change', (e) => {
        renderProductsTable(document.getElementById('productSearch').value, e.target.value);
    });
    
    document.getElementById('addProductBtn').addEventListener('click', () => {
        showProductModal();
    });
}

function renderProductsTable(search = '', category = '') {
    const tbody = document.getElementById('productsTableBody');
    let filtered = state.products;
    
    if (search) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.sku.toLowerCase().includes(search.toLowerCase())
        );
    }
    
    if (category) {
        filtered = filtered.filter(p => p.category === category);
    }
    
    const { page, perPage } = state.pagination.products;
    const start = (page - 1) * perPage;
    const paginated = filtered.slice(start, start + perPage);
    
    tbody.innerHTML = paginated.map(product => `
        <tr>
            <td><input type="checkbox" data-id="${product.id}"></td>
            <td>
                <div class="product-cell">
                    <span class="product-thumb">${product.image}</span>
                    <span>${product.name}</span>
                </div>
            </td>
            <td>${product.sku}</td>
            <td>${capitalizeFirst(product.category)}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.stock}</td>
            <td><span class="status-badge ${product.status}">${capitalizeFirst(product.status)}</span></td>
            <td>
                <div class="action-btns">
                    <button class="action-btn edit" onclick="editProduct(${product.id})">✏️</button>
                    <button class="action-btn delete" onclick="deleteProduct(${product.id})">🗑️</button>
                </div>
            </td>
        </tr>
    `).join('');
    
    renderPagination('products', filtered.length);
}

function showProductModal(product = null) {
    const isEdit = product !== null;
    modalTitle.textContent = isEdit ? 'Edit Product' : 'Add New Product';
    
    modalBody.innerHTML = `
        <form id="productForm">
            <div class="form-group">
                <label>Product Name</label>
                <input type="text" id="productName" value="${isEdit ? product.name : ''}" required>
            </div>
            <div class="form-group">
                <label>SKU</label>
                <input type="text" id="productSku" value="${isEdit ? product.sku : ''}" required>
            </div>
            <div class="form-group">
                <label>Category</label>
                <select id="productCategory" required>
                    <option value="electronics" ${isEdit && product.category === 'electronics' ? 'selected' : ''}>Electronics</option>
                    <option value="clothing" ${isEdit && product.category === 'clothing' ? 'selected' : ''}>Clothing</option>
                    <option value="accessories" ${isEdit && product.category === 'accessories' ? 'selected' : ''}>Accessories</option>
                    <option value="home" ${isEdit && product.category === 'home' ? 'selected' : ''}>Home & Garden</option>
                </select>
            </div>
            <div class="form-group">
                <label>Price</label>
                <input type="number" id="productPrice" step="0.01" value="${isEdit ? product.price : ''}" required>
            </div>
            <div class="form-group">
                <label>Stock</label>
                <input type="number" id="productStock" value="${isEdit ? product.stock : ''}" required>
            </div>
        </form>
    `;
    
    modalFooter.innerHTML = `
        <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="saveProduct(${isEdit ? product.id : 'null'})">${isEdit ? 'Update' : 'Add'} Product</button>
    `;
    
    openModal();
}

function saveProduct(id) {
    const name = document.getElementById('productName').value;
    const sku = document.getElementById('productSku').value;
    const category = document.getElementById('productCategory').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const stock = parseInt(document.getElementById('productStock').value);
    
    if (!name || !sku || !price || stock === undefined) {
        showToast('Please fill all fields', 'error');
        return;
    }
    
    if (id === null) {
        // Add new product
        const newProduct = {
            id: Math.max(...state.products.map(p => p.id)) + 1,
            name,
            sku,
            category,
            price,
            stock,
            status: 'active',
            image: '📦'
        };
        state.products.push(newProduct);
        showToast('Product added successfully', 'success');
    } else {
        // Update existing product
        const index = state.products.findIndex(p => p.id === id);
        if (index !== -1) {
            state.products[index] = { ...state.products[index], name, sku, category, price, stock };
            showToast('Product updated successfully', 'success');
        }
    }
    
    closeModal();
    renderProductsTable();
    updateDashboardStats();
}

function editProduct(id) {
    const product = state.products.find(p => p.id === id);
    if (product) {
        showProductModal(product);
    }
}

function deleteProduct(id) {
    modalTitle.textContent = 'Delete Product';
    modalBody.innerHTML = '<p>Are you sure you want to delete this product? This action cannot be undone.</p>';
    modalFooter.innerHTML = `
        <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
        <button class="btn btn-danger" onclick="confirmDeleteProduct(${id})">Delete</button>
    `;
    openModal();
}

function confirmDeleteProduct(id) {
    state.products = state.products.filter(p => p.id !== id);
    closeModal();
    renderProductsTable();
    updateDashboardStats();
    showToast('Product deleted successfully', 'success');
}

// ===== Orders =====
function initOrders() {
    renderOrdersTable();
    
    document.getElementById('orderSearch').addEventListener('input', (e) => {
        renderOrdersTable(e.target.value);
    });
    
    document.getElementById('orderStatusFilter').addEventListener('change', (e) => {
        renderOrdersTable(document.getElementById('orderSearch').value, e.target.value);
    });
}

function renderOrdersTable(search = '', status = '') {
    const tbody = document.getElementById('ordersTableBody');
    let filtered = state.orders;
    
    if (search) {
        filtered = filtered.filter(o => 
            o.id.toLowerCase().includes(search.toLowerCase()) ||
            o.customer.toLowerCase().includes(search.toLowerCase())
        );
    }
    
    if (status) {
        filtered = filtered.filter(o => o.status === status);
    }
    
    const { page, perPage } = state.pagination.orders;
    const start = (page - 1) * perPage;
    const paginated = filtered.slice(start, start + perPage);
    
    tbody.innerHTML = paginated.map(order => `
        <tr>
            <td><strong>${order.id}</strong></td>
            <td>${order.customer}</td>
            <td>${order.products} items</td>
            <td>$${order.total.toFixed(2)}</td>
            <td>${formatDate(order.date)}</td>
            <td><span class="status-badge ${order.status}">${capitalizeFirst(order.status)}</span></td>
            <td>
                <div class="action-btns">
                    <button class="action-btn edit" onclick="viewOrder('${order.id}')">👁️</button>
                    <button class="action-btn" onclick="updateOrderStatus('${order.id}')">📝</button>
                </div>
            </td>
        </tr>
    `).join('');
    
    renderPagination('orders', filtered.length);
}

function viewOrder(id) {
    const order = state.orders.find(o => o.id === id);
    if (!order) return;
    
    modalTitle.textContent = `Order ${order.id}`;
    modalBody.innerHTML = `
        <div class="order-details">
            <p><strong>Customer:</strong> ${order.customer}</p>
            <p><strong>Email:</strong> ${order.email}</p>
            <p><strong>Products:</strong> ${order.products} items</p>
            <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
            <p><strong>Date:</strong> ${formatDate(order.date)}</p>
            <p><strong>Status:</strong> <span class="status-badge ${order.status}">${capitalizeFirst(order.status)}</span></p>
        </div>
    `;
    modalFooter.innerHTML = `
        <button class="btn btn-secondary" onclick="closeModal()">Close</button>
    `;
    openModal();
}

function updateOrderStatus(id) {
    const order = state.orders.find(o => o.id === id);
    if (!order) return;
    
    modalTitle.textContent = 'Update Order Status';
    modalBody.innerHTML = `
        <div class="form-group">
            <label>Status</label>
            <select id="newOrderStatus">
                <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>
        </div>
    `;
    modalFooter.innerHTML = `
        <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="saveOrderStatus('${id}')">Update</button>
    `;
    openModal();
}

function saveOrderStatus(id) {
    const newStatus = document.getElementById('newOrderStatus').value;
    const index = state.orders.findIndex(o => o.id === id);
    if (index !== -1) {
        state.orders[index].status = newStatus;
        closeModal();
        renderOrdersTable();
        renderRecentOrders();
        showToast('Order status updated', 'success');
    }
}

// ===== Customers =====
function initCustomers() {
    renderCustomersTable();
    
    document.getElementById('customerSearch').addEventListener('input', (e) => {
        renderCustomersTable(e.target.value);
    });
    
    document.getElementById('addCustomerBtn').addEventListener('click', () => {
        showCustomerModal();
    });
}

function renderCustomersTable(search = '') {
    const tbody = document.getElementById('customersTableBody');
    let filtered = state.customers;
    
    if (search) {
        filtered = filtered.filter(c => 
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase())
        );
    }
    
    const { page, perPage } = state.pagination.customers;
    const start = (page - 1) * perPage;
    const paginated = filtered.slice(start, start + perPage);
    
    tbody.innerHTML = paginated.map(customer => `
        <tr>
            <td>
                <div class="product-cell">
                    <div class="user-avatar">${customer.avatar}</div>
                    <span>${customer.name}</span>
                </div>
            </td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.orders}</td>
            <td>$${customer.spent.toFixed(2)}</td>
            <td>${formatDate(customer.joined)}</td>
            <td>
                <div class="action-btns">
                    <button class="action-btn edit" onclick="editCustomer(${customer.id})">✏️</button>
                    <button class="action-btn delete" onclick="deleteCustomer(${customer.id})">🗑️</button>
                </div>
            </td>
        </tr>
    `).join('');
    
    renderPagination('customers', filtered.length);
}

function showCustomerModal(customer = null) {
    const isEdit = customer !== null;
    modalTitle.textContent = isEdit ? 'Edit Customer' : 'Add New Customer';
    
    modalBody.innerHTML = `
        <form id="customerForm">
            <div class="form-group">
                <label>Full Name</label>
                <input type="text" id="customerName" value="${isEdit ? customer.name : ''}" required>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" id="customerEmail" value="${isEdit ? customer.email : ''}" required>
            </div>
            <div class="form-group">
                <label>Phone</label>
                <input type="tel" id="customerPhone" value="${isEdit ? customer.phone : ''}" required>
            </div>
        </form>
    `;
    
    modalFooter.innerHTML = `
        <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="saveCustomer(${isEdit ? customer.id : 'null'})">${isEdit ? 'Update' : 'Add'} Customer</button>
    `;
    
    openModal();
}

function saveCustomer(id) {
    const name = document.getElementById('customerName').value;
    const email = document.getElementById('customerEmail').value;
    const phone = document.getElementById('customerPhone').value;
    
    if (!name || !email || !phone) {
        showToast('Please fill all fields', 'error');
        return;
    }
    
    if (id === null) {
        const newCustomer = {
            id: Math.max(...state.customers.map(c => c.id)) + 1,
            name,
            email,
            phone,
            orders: 0,
            spent: 0,
            joined: new Date().toISOString().split('T')[0],
            avatar: name.split(' ').map(n => n[0]).join('').toUpperCase()
        };
        state.customers.push(newCustomer);
        showToast('Customer added successfully', 'success');
    } else {
        const index = state.customers.findIndex(c => c.id === id);
        if (index !== -1) {
            state.customers[index] = { ...state.customers[index], name, email, phone };
            showToast('Customer updated successfully', 'success');
        }
    }
    
    closeModal();
    renderCustomersTable();
    updateDashboardStats();
}

function editCustomer(id) {
    const customer = state.customers.find(c => c.id === id);
    if (customer) {
        showCustomerModal(customer);
    }
}

function deleteCustomer(id) {
    modalTitle.textContent = 'Delete Customer';
    modalBody.innerHTML = '<p>Are you sure you want to delete this customer? This action cannot be undone.</p>';
    modalFooter.innerHTML = `
        <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
        <button class="btn btn-danger" onclick="confirmDeleteCustomer(${id})">Delete</button>
    `;
    openModal();
}

function confirmDeleteCustomer(id) {
    state.customers = state.customers.filter(c => c.id !== id);
    closeModal();
    renderCustomersTable();
    updateDashboardStats();
    showToast('Customer deleted successfully', 'success');
}

// ===== Settings =====
function initSettings() {
    const settingsNavItems = document.querySelectorAll('.settings-nav-item');
    
    settingsNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            settingsNavItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkMode');
    darkModeToggle.addEventListener('change', (e) => {
        state.darkMode = e.target.checked;
        document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : 'light');
        showToast(`Dark mode ${state.darkMode ? 'enabled' : 'disabled'}`, 'info');
    });
    
    // General form
    document.getElementById('generalForm').addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Settings saved successfully', 'success');
    });
}

// ===== Modal =====
function initModal() {
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
}

function openModal() {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== Search =====
function initSearch() {
    const globalSearch = document.getElementById('globalSearch');
    globalSearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length < 2) return;
        
        // Search across all data
        const productResults = state.products.filter(p => 
            p.name.toLowerCase().includes(query)
        );
        const orderResults = state.orders.filter(o => 
            o.id.toLowerCase().includes(query) || 
            o.customer.toLowerCase().includes(query)
        );
        const customerResults = state.customers.filter(c => 
            c.name.toLowerCase().includes(query) ||
            c.email.toLowerCase().includes(query)
        );
        
        console.log('Search results:', { productResults, orderResults, customerResults });
    });
}

// ===== Pagination =====
function renderPagination(type, totalItems) {
    const container = document.getElementById(`${type}Pagination`);
    const { page, perPage } = state.pagination[type];
    const totalPages = Math.ceil(totalItems / perPage);
    
    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }
    
    let html = `
        <button class="page-btn" onclick="changePage('${type}', ${page - 1})" ${page === 1 ? 'disabled' : ''}>‹</button>
    `;
    
    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="page-btn ${i === page ? 'active' : ''}" onclick="changePage('${type}', ${i})">${i}</button>`;
    }
    
    html += `
        <button class="page-btn" onclick="changePage('${type}', ${page + 1})" ${page === totalPages ? 'disabled' : ''}>›</button>
    `;
    
    container.innerHTML = html;
}

function changePage(type, newPage) {
    const totalItems = state[type].length;
    const totalPages = Math.ceil(totalItems / state.pagination[type].perPage);
    
    if (newPage < 1 || newPage > totalPages) return;
    
    state.pagination[type].page = newPage;
    
    if (type === 'products') renderProductsTable();
    else if (type === 'orders') renderOrdersTable();
    else if (type === 'customers') renderCustomersTable();
}

// ===== Dashboard Stats Update =====
function updateDashboardStats() {
    document.getElementById('totalProducts').textContent = state.products.length;
    document.getElementById('totalOrders').textContent = state.orders.length.toLocaleString();
    document.getElementById('totalCustomers').textContent = state.customers.length.toLocaleString();
    
    const totalRevenue = state.orders.reduce((sum, o) => sum + o.total, 0);
    document.getElementById('totalRevenue').textContent = `$${totalRevenue.toLocaleString()}`;
    
    renderLowStock();
    renderTopProducts();
}

// ===== Toast Notifications =====
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${getToastIcon(type)}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'toastSlide 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function getToastIcon(type) {
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    return icons[type] || icons.info;
}

// ===== Utility Functions =====
function formatDate(dateString) {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Make functions globally accessible
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.confirmDeleteProduct = confirmDeleteProduct;
window.saveProduct = saveProduct;
window.viewOrder = viewOrder;
window.updateOrderStatus = updateOrderStatus;
window.saveOrderStatus = saveOrderStatus;
window.editCustomer = editCustomer;
window.deleteCustomer = deleteCustomer;
window.confirmDeleteCustomer = confirmDeleteCustomer;
window.saveCustomer = saveCustomer;
window.closeModal = closeModal;
window.changePage = changePage;
