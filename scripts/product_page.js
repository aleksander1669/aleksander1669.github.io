import { Get_Api } from "./api.js";

async function Render_Product() {
    const container = document.getElementById("product_container");
    const data = await Get_Api();

    if (data == "error") {
        container.innerHTML = `<section class="loading"><h1>Serwer nie działa...<br>Spróbuj ponownie później</h1></section>`;
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) return;
    const product = data.find(item => item.id === productId);
    if (!product) {
        container.innerHTML = `
        <section class="error fade-in">
            <h2>Błąd 404: Nie znaleziono części</h2>
            <p style="font-size: 1.5em; margin-top: 20px;">Taki produkt nie istnieje w naszym asortymencie. Prawdopodobnie rdza zjadła ten numer VIN.</p>
            <a href="index.html" class="buy_button" style="width: 200px; margin-top: 30px;">Wróć na stronę główną</a>
        </section>`;
        return;
    }

    let specsHTML = ``;
    product.specs.forEach(spec => {
        specsHTML += `<li>${spec}</li>`;
    });

    container.innerHTML = `
    <section class="product_page fade-in">
        <h2 class="product_page_title">${product.name}</h2>
        
        <div class="product_page_image_box">
            <button id="arrow_left" class="arrow">&#10094;</button>
            <img id="main_product_img" class="main_product_img" src="${product.gallery[0]}">
            <button id="arrow_right" class="arrow">&#10095;</button>
        </div>
        
        <div>
            <button id="add_to_cart_btn" class="buy_button">Dodaj do koszyka</button>
        </div>

        <div class="accordion_container">
            <button class="accordion_btn">Szybki podgląd</button>
            <div class="accordion_content">
                <p>${product.shortDescription}</p>
            </div>

            <button class="accordion_btn">Specyfikacja techniczna</button>
            <div class="accordion_content">
                <ul>${specsHTML}</ul>
            </div>

            <button class="accordion_btn">Szczegółowy opis</button>
            <div class="accordion_content">
                <p>${product.fullDescription}</p>
                <img class="product_page_display" src="${product.displayImage}" alt="Zdjęcie poglądowe" style="width: 100%; max-width: 600px; display: block; margin: 20px auto;">
            </div>

            <button class="accordion_btn">Dostawa i zwroty</button>
            <div class="accordion_content">
                <ul>
                    <li>Błyskawiczna wysyłka: Zamówienia procesujemy w ciągu 24h.</li>
                    <li>Bezpieczne pakowanie: Każda część podróżuje w dedykowanym kartonie.</li>
                    <li>Pełne wsparcie: Masz pytania? Nasz zespół chętnie pomoże.</li>
                    <li>Gwarancja dopasowania: Produkt zgodny z opisem i specyfikacją OEM.</li>
                </ul>
            </div>
        </div>
    </section>
    `;

    document.getElementById("add_to_cart_btn").addEventListener("click", () => {
        let cart = JSON.parse(localStorage.getItem("alibaba_cart")) || [];
        const existing = cart.find(item => item.id === product.id);
        
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.gallery[0],
                quantity: 1
            });
        }
        localStorage.setItem("alibaba_cart", JSON.stringify(cart));
        window.location.href = "koszyk.html";
    });

    if (product.gallery && product.gallery.length > 0) {
        let currentImageIndex = 0;
        const imgElement = document.getElementById("main_product_img");
        
        document.getElementById("arrow_left").addEventListener("click", () => {
            currentImageIndex--;
            if (currentImageIndex < 0) currentImageIndex = product.gallery.length - 1;
            imgElement.src = product.gallery[currentImageIndex];
        });

        document.getElementById("arrow_right").addEventListener("click", () => {
            currentImageIndex++;
            if (currentImageIndex >= product.gallery.length) currentImageIndex = 0;
            imgElement.src = product.gallery[currentImageIndex];
        });
    }

    const acc = document.querySelectorAll(".accordion_btn");
    acc.forEach(btn => {
        btn.addEventListener("click", function() {
            this.classList.toggle("active");
            let content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null; 
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
}

Render_Product();