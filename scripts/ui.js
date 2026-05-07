export function renderProducts(productsArray) {
    const container = document.getElementById('products_container');
    
    if (!container) return; 

    container.innerHTML = ''; 

    productsArray.forEach(product => {
        
        // NOWOŚĆ: Generujemy HTML dla listy specyfikacji
        let specsHTML = '';
        if (product.specs && product.specs.length > 0) {
            specsHTML = '<ul>';
            product.specs.forEach(spec => {
                // Wrzucamy każdą cechę w tag <li> (element listy)
                specsHTML += `<li><strong>${spec.split(':')[0]}:</strong> ${spec.split(':')[1]}</li><br>`;
            });
            specsHTML += '</ul>';
        }

        const productHTML = `
            <br>
            <section class="product">
                <a href="${product.pageLink}" class="product_title">
                    <h2>${product.name}</h2>
                </a>

                <div class="product_left">
                    <a href="${product.pageLink}">
                        <img class="product_img" alt="Zdjęcie produktu" src="${product.image}">
                    </a>
                    <h2 class="price">${product.price.toFixed(2)} PLN</h2>
                    <a href="${product.pageLink}">
                        <button class="button">Kup</button>
                    </a>
                </div>

                <p>
                    <strong>Specyfikacja produktu:</strong><br><br>
                    ${product.shortDescription}
                </p>
                ${specsHTML} 
            </section>
        `;
        
        container.innerHTML += productHTML;
    });
}