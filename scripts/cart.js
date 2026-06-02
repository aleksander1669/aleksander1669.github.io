function Render_Cart() {
    const cartContainer = document.getElementById("cart-items");
    const totalContainer = document.getElementById("cart-total");
    
    if (!cartContainer || !totalContainer) return;

    let cart = JSON.parse(localStorage.getItem("alibaba_cart")) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = `<h2 style="text-align: center; color: black; padding: 50px; font-family: font2;">Twój koszyk jest pusty. Wróć na szrot!</h2>`;
        totalContainer.innerText = "0.00";
        return;
    }

    let html = "";
    let totalPrice = 0;

    cart.forEach((item, index) => {
        totalPrice += (item.price * item.quantity);

        html += `
            <div style="background: rgba(0,0,0,0.4); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                <div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
                    <img src="${item.image}" alt="${item.name}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 10px; box-shadow: 0 0 10px black;">
                    <div style="flex: 1;">
                        <h3 style="margin: 0 0 8px 0; font-family: font2; font-size: 1.3em;">${item.name}</h3>
                        <p style="margin: 4px 0; font-family: font2;">Cena za sztukę: ${item.price.toFixed(2)} PLN</p>
                        <div style="display: flex; align-items: center; gap: 10px; margin: 8px 0; font-family: font2;">
                            Ilość:
                            <button class="add_button minus_btn" data-index="${index}">-</button>
                            <span style="font-size: 1.2em; min-width: 20px; text-align: center;">${item.quantity}</span>
                            <button class="add_button plus_btn" data-index="${index}">+</button>
                        </div>
                        <p style="margin: 4px 0; font-family: font2;"><strong>Razem: ${(item.price * item.quantity).toFixed(2)} PLN</strong></p>
                    </div>
                </div>
                <div style="margin-top: 15px;">
                    <button class="remove_button delete_btn" data-index="${index}">Usuń produkt z koszyka</button>
                </div>
            </div>
        `;
    });

    cartContainer.innerHTML = html;
    totalContainer.innerText = totalPrice.toFixed(2);
}

const cartContainer = document.getElementById("cart-items");

if (cartContainer) {
    cartContainer.addEventListener("click", function(event) {
        const btn = event.target;
        const index = parseInt(btn.getAttribute("data-index"));
        let cart = JSON.parse(localStorage.getItem("alibaba_cart")) || [];

        if (btn.classList.contains("delete_btn")) {
            cart.splice(index, 1);
        }
        else if (btn.classList.contains("minus_btn")) {
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1);
            }
        }
        else if (btn.classList.contains("plus_btn")) {
            cart[index].quantity += 1;
        }
        else return;

        localStorage.setItem("alibaba_cart", JSON.stringify(cart));
        Render_Cart();
    });
}

Render_Cart();


const orderButton = document.querySelector(".cart_summary .remove_button");

if (orderButton) {
    orderButton.removeAttribute("onclick");

    orderButton.addEventListener("click", () => {
        const cart = JSON.parse(localStorage.getItem("alibaba_cart")) || [];
        const toast = document.getElementById("toast");

        if (cart.length === 0) {
            toast.innerText = "Błąd: Nie możesz złożyć pustego zamówienia!";
            toast.style.backgroundColor = "darkred";
            toast.style.color = "white";
            toast.className = "toast_notification show";
            setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
            return; 
        }

        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const adress = document.getElementById("adress").value.trim();
        const postcode = document.getElementById("postcode").value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9\-\+]{9,15}$/; 
        const postcodeRegex = /^[0-9]{2}-[0-9]{3}$/; 

        let errors = [];

        if (!emailRegex.test(email)) errors.push("Podaj poprawny adres e-mail.");
        if (!phoneRegex.test(phone)) errors.push("Podaj poprawny numer telefonu.");
        if (adress.length < 5) errors.push("Podaj pełny adres dostawy.");
        if (!postcodeRegex.test(postcode)) errors.push("Podaj poprawny kod pocztowy (XX-XXX).");


        if (errors.length > 0) {
            toast.innerText = "Błąd: " + errors[0]; 
            toast.style.backgroundColor = "darkred";
            toast.style.color = "white";
            toast.className = "toast_notification show";
            
            setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
            
        } else {
            toast.innerText = "Zamówienie w drodze!";
            toast.style.backgroundColor = "green";
            toast.style.color = "white";
            toast.className = "toast_notification show";
            
            setTimeout(() => { 
                toast.className = toast.className.replace("show", ""); 
                localStorage.removeItem("alibaba_cart");
                window.location.href = "index.html";
            }, 3000);
        }
    });
}