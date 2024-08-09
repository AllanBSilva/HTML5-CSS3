interface Product {
    name: string;
    seller: string;
    price: string;
    description: string;
    images: string[];
}

const product: Product = {
    name: "Fita VHS Basf T-120 Extra Quality",
    seller: "POR OLD ELETRÔNICO",
    price: "DESCONTO 10% no PIX",
    description: "Se você está em busca de uma fita VHS de alta qualidade, a FITA VHS BASF T-120 Extra Quality é a escolha ideal para você.",
    images: [
        "708b0d2afb2c13bc0c4f21bea0a4d931.png",
        "8aae202485e32e635a8934963d58e889.png",
        "99498b8e52c023d9f8d6cf63a7b8b492.png",
        "f915db432b2c712dd9e2eee410446d22.png",
    ]
};

const mainImage = document.getElementById("main-image") as HTMLImageElement;
const thumbnailContainer = document.getElementById("thumbnail-container") as HTMLDivElement;
const productName = document.getElementById("product-name") as HTMLHeadingElement;
const productSeller = document.getElementById("product-seller") as HTMLParagraphElement;
const productPrice = document.getElementById("product-price") as HTMLParagraphElement;
const productDescription = document.getElementById("product-description") as HTMLParagraphElement;
const quantityInput = document.getElementById("quantity") as HTMLInputElement;
const addToCartButton = document.getElementById("add-to-cart") as HTMLButtonElement;
const cartCount = document.getElementById("cart") as HTMLDivElement;

let originalImage = product.images[0];
mainImage.src = originalImage;

productName.textContent = product.name;
productSeller.textContent = product.seller;
productPrice.textContent = product.price;
productDescription.textContent = product.description;

product.images.forEach((image, index) => {
    const img = document.createElement("img");
    img.src = image;
    img.alt = `Imagem ${index + 1}`;
    img.addEventListener("mouseover", () => {
        mainImage.src = image;
    });
    img.addEventListener("mouseout", () => {
        mainImage.src = originalImage;
    });
    thumbnailContainer.appendChild(img);
});

addToCartButton.addEventListener("click", () => {
    const quantity = parseInt(quantityInput.value, 10);
    const currentCount = parseInt(cartCount.textContent!, 10);
    cartCount.textContent = (currentCount + quantity).toString();
    alert("Produto adicionado ao carrinho!");
});
