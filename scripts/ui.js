import { Get_Api } from "./api.js"
export async function Render(){

    const container = document.getElementById("products_container");

    const data = await Get_Api();

    if (data == "error"){
        container.innerHTML = `
        <section class="error">
            <h2>Server is down...<br>Sorry for inconvenience, please try agian later</h2>
    </section>
    `
    } else {
        container.innerHTML = "";

        data.forEach(product => {

            let product_list = `<ul class="">`;
            product.specs.forEach(spec => {
                product_list += `<li>${spec}</li>`
            })
            product_list += `</ul>`
            
            container.innerHTML += `
                <section class="product">
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
    }
}