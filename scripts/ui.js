import { Get_Api } from "./api.js"

let allProducts = [];      
let filteredProducts = [];  
let currentPage = 1;       
const productsPerPage = 6;  

export async function Render(){
    const container = document.getElementById("products_container");
    const paginationContainer = document.getElementById("pagination_container");
    const searchInput = document.getElementById("search_input");
    const sortSelect = document.getElementById("sort_select");
    const priceMinInput = document.getElementById("price_min");
    const priceMaxInput = document.getElementById("price_max");
    const applyFiltersBtn = document.getElementById("apply_filters");
    const resetFiltersBtn = document.getElementById("reset_filters");

    
    if (allProducts.length === 0) {
        container.innerHTML = `<section class="loading"><h1>Trwa ładowanie magazynu...</h1></section>`;
        const data = await Get_Api();
        if (data == "error"){
            container.innerHTML = `
            <section class="error">
                <h2>Serwer API (bazy danych) nie odpowiada.</h2>
            </section>`;
            return;
        }
        allProducts = data;
        filteredProducts = [...allProducts]; 
    }

    
    const displayPage = (page) => {
        container.innerHTML = "";
        paginationContainer.innerHTML = "";
        
        if (filteredProducts.length === 0) {
            container.innerHTML = `<h2 style="color:white; text-align:center; font-family:font2; padding: 50px;">Brak produktów spełniających podane kryteria. Spróbuj zmienić filtry.</h2>`;
            return;
        }
    
        
        const startIndex = (page - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const productsToDisplay = filteredProducts.slice(startIndex, endIndex);

        productsToDisplay.forEach(product => {
            let product_list = `<ul class="">`;
            product.specs.forEach(spec => {
                product_list += `<li>${spec}</li>`
            })
            product_list += `</ul>`
            
            container.innerHTML += `
                <section class="product fade-in" style="margin: 0; width: 100%;">
                    <a href="product.html?id=${product.id}" class="product_title"><h2>${product.name}</h2></a>

                    <div class="product_left">
                        <a href="product.html?id=${product.id}"><img class="product_img" alt="Zdjęcie produktu" src="${product.image}"></a>
                        <h2 class="price">${product.price.toFixed(2)} PLN</h2>
                        <a href="product.html?id=${product.id}"><button>Kup</button></a>
                    </div>

                    <div class="product_right"><p><strong>Specyfikacja produktu:</strong><br><br>${product.shortDescription}</p>${product_list}</div>
                </section>
            `;
        });

        
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        if (totalPages <= 1) return; 

        const prevBtn = document.createElement("button");
        prevBtn.className = "pagination_btn";
        prevBtn.innerHTML = "&#10094; Poprzednia";
        prevBtn.disabled = page === 1; 
        prevBtn.addEventListener("click", () => {
            currentPage--;
            displayPage(currentPage);
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
        });
        paginationContainer.appendChild(prevBtn);


        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement("button");
            pageBtn.className = `pagination_btn ${i === page ? 'active' : ''}`;
            pageBtn.innerText = i;
            pageBtn.addEventListener("click", () => {
                currentPage = i;
                displayPage(currentPage);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            paginationContainer.appendChild(pageBtn);
        }

        const nextBtn = document.createElement("button");
        nextBtn.className = "pagination_btn";
        nextBtn.innerHTML = "Następna &#10095;";
        nextBtn.disabled = page === totalPages;
        nextBtn.addEventListener("click", () => {
            currentPage++;
            displayPage(currentPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        paginationContainer.appendChild(nextBtn);
    };

    const handleFilters = () => {
        filteredProducts = [...allProducts];
        
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
        const sortValue = sortSelect ? sortSelect.value : "default";
        const minPrice = priceMinInput && priceMinInput.value !== "" ? parseFloat(priceMinInput.value) : 0;
        const maxPrice = priceMaxInput && priceMaxInput.value !== "" ? parseFloat(priceMaxInput.value) : Infinity;

        if (searchTerm) {
            filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(searchTerm) || p.shortDescription.toLowerCase().includes(searchTerm));
        }

        filteredProducts = filteredProducts.filter(p => p.price >= minPrice && p.price <= maxPrice);

        if (sortValue === "price_asc") {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortValue === "price_desc") {
            filteredProducts.sort((a, b) => b.price - a.price);
        } else if (sortValue === "name_asc") {
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        }
        currentPage = 1;
        displayPage(currentPage);
    };

    const resetFilters = () => {
        if(searchInput) searchInput.value = "";
        if(priceMinInput) priceMinInput.value = "";
        if(priceMaxInput) priceMaxInput.value = "";
        if(sortSelect) sortSelect.value = "default";
        
        filteredProducts = [...allProducts];
        currentPage = 1;
        displayPage(currentPage);
    };

    if (applyFiltersBtn) applyFiltersBtn.addEventListener("click", handleFilters);
    if (resetFiltersBtn) resetFiltersBtn.addEventListener("click", resetFilters);
    if (searchInput) searchInput.addEventListener("input", handleFilters);
    if (sortSelect) sortSelect.addEventListener("change", handleFilters);


    displayPage(currentPage);
}