
function addToCart(productId, productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('alibaba_cart')) || [];
    
    let existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        let newItem = {
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        };
        cart.push(newItem);
    }

    localStorage.setItem('alibaba_cart', JSON.stringify(cart));
    alert(`Dodano ${productName} do koszyka.`);
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('alibaba_cart')) || [];
    
    cart = cart.filter(item => item.id !== productId);
    
    localStorage.setItem('alibaba_cart', JSON.stringify(cart));
    displayCart();
}


function changeQuantity(productId, zmiana) {
    let cart = JSON.parse(localStorage.getItem('alibaba_cart')) || [];
    let item = cart.find(i => i.id === productId);

    if (item) {
        item.quantity += zmiana;
        
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== productId);
        }
        
        localStorage.setItem('alibaba_cart', JSON.stringify(cart));
        displayCart(); 
    }
}

function displayCart() {
    let cartItemsContainer = document.getElementById('cart-items');
    let cartTotalElement = document.getElementById('cart-total');

    if (!cartItemsContainer) return; 

    let cart = JSON.parse(localStorage.getItem('alibaba_cart')) || [];

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p style='text-align: center; font-size: 1.5em;'>Twój koszyk jest pusty. Dodaj jakiś zderzak!</p>";
        cartTotalElement.innerText = "0.00";
        return;
    }

    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(function(item) {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;


        let productHTML = `
            <div class="cart_item" style="border-bottom: 2px solid black; padding: 20px; margin-bottom: 20px;">
                <h3>${item.name}</h3>
                <p>Cena za sztukę: ${item.price} PLN</p>
                <p>
                    Ilość:
                    <button class="add_button" onclick="changeQuantity('${item.id}', -1)">-</button>
                    <span style="font-weight: bold; margin: 0 10px;">${item.quantity}</span>
                    <button class="add_button" onclick="changeQuantity('${item.id}', 1)">+</button>
                </p>
                <h4>Razem: ${itemTotal} PLN</h4>
                <br>
                <button class="remove_button" onclick="removeFromCart('${item.id}')">
                    Usuń produkt z koszyka
                </button>
            </div>
        `;

        cartItemsContainer.innerHTML += productHTML;
    });

    cartTotalElement.innerText = total.toFixed(2);
}

displayCart();