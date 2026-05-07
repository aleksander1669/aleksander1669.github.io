export async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:3000/products');
        
        if (!response.ok) {
            throw new Error('Server nie odpowiada!');
        }

        const data = await response.json();
        return data; 
        
    } catch (error) {
        console.error("Błąd połączenia z serverem:", error);
        
        const container = document.getElementById('products_container');
        if (container) {
            container.innerHTML = "<h2 style='color: white; text-align: center;'>Błąd bazy danych. Sprawdź terminal!</h2>";
        }
        return []; 
    }
}