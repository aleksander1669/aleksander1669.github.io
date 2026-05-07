import { fetchProducts } from './api.js';
import { renderProducts } from './ui.js';

async function startApp() {
    const products = await fetchProducts();
    
    renderProducts(products); 
}

startApp();