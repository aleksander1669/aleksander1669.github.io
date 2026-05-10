import { Get_Api } from "./api.js";

async function Render_Product() {
    const container = document.getElementById("product_container");
    const data = await Get_Api();

    if (data == "error") {
        container.innerHTML = `<section class="loading"><h1>Server nie działa...<br>Spróbuj ponownie później</h1></section>`;
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) return;
    const product = data.find(item => item.id === productId);
    if (!product) return;

    let specsHTML = ``;
    product.specs.forEach(spec => {
        specsHTML += `<li>${spec}</li>`;
    });

    container.innerHTML = `
    <section class="product_page">
        <h2 class="product_page_title">${product.name}</h2>
        
        <div class="product_page_image_box">
            <button id="arrow_left" class="arrow">&#10094;</button>
            <img id="main_product_img" class="main_product_img" src="${product.gallery[0]}">
            <button id="arrow_right" class="arrow">&#10095;</button>
        </div>
        
        <div>
            <button id="add_to_cart_btn" class="buy_button">Zamawiam</button>
        </div>

        <h2 class="opis">Opis Produktu:</h2>
        <p>
            ${product.shortDescription}
            <br><br>
            Specyfikacja produktu:
        </p>
        <ul>
            ${specsHTML}
        </ul>

        <img class="product_page_display" src="${product.displayImage}" alt="Zdjęcie na aucie">

        <p>${product.fullDescription}</p>

        <ul>
            <li>Błyskawiczna wysyłka: Zamówienia procesujemy w ciągu 24h. Korzystamy z zaufanych kurierów, którzy wiedzą, jak obchodzić się z gabarytami.</li>
            <li>Bezpieczne pakowanie: Każda część podróżuje w dedykowanym, wzmocnionym kartonie. Ryzyko uszkodzeń w transporcie ograniczamy do minimum.</li>
            <li>Pełne wsparcie: Masz pytania dotyczące montażu lub dopasowania? Nasz zespół chętnie pomoże Ci przejść przez proces instalacji.</li>
            <li>Gwarancja dopasowania: Produkt jest uniwersalny lub dedykowany, nasi koneserzy zawsze doradzą!</li>
        </ul>
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
}

Render_Product();