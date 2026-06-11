import {
  cart,
  removeFromCart,
  updateCartQuantity as updateCartQuantityCheckout,
  updateQuantity,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let cartSummaryHTML = "";

cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">Delivery date: Tuesday, June 21</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingProduct.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                 ${matchingProduct.name}
                </div>
                <div class="product-price">${formatCurrency(matchingProduct.priceCents)}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span> </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link js-update-quantity-link-${matchingProduct.id}" data-product-id= "${matchingProduct.id}">
                    Update
                  </span>
                  <input class='quantity-input js-quantity-input-${matchingProduct.id}'>
                  <span class='save-quantity-link js-save-quantity-link link-primary' data-product-id='${matchingProduct.id}'>Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id = ${matchingProduct.id}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Tuesday, June 21</div>
                    <div class="delivery-option-price">FREE Shipping</div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Wednesday, June 15</div>
                    <div class="delivery-option-price">$4.99 - Shipping</div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Monday, June 13</div>
                    <div class="delivery-option-price">$9.99 - Shipping</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;
});

document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`,
    );
    container.remove();
    updateCartQuantity();
  });
});

function updateCartQuantity() {
  document.querySelector(".js-checkout-header-middle-section").innerHTML =
    `Checkout (<a class="return-to-home-link js-return-to-home-link" href="amazon.html">${updateCartQuantityCheckout()} items</a>)`;
}

updateCartQuantity();

document.querySelectorAll(".js-update-quantity-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    console.log(productId);

    document
      .querySelector(`.js-cart-item-container-${productId}`)
      .classList.add("is-editing-quantity");

    link.style.display = "none";
    document.querySelector(`.js-quantity-label-${productId}`).style.display =
      "none";

    /*
    const quantityLink = document.querySelector(
      `.js-quantity-label-${productId}`,
    );

    if (link.textContent.trim() === "Update") {
      link.textContent = "Save";
      const quantity = quantityLink.textContent;
      quantityLink.innerHTML = `<input type='text' value ='${quantity}' class = 'quantity-input'>`;
      quantityLink.querySelector("input").focus();
    } else if (link.textContent.trim() === "Save") {
      link.textContent = "Update";
      const quantity = Number(quantityLink.querySelector("input").value);
      quantityLink.innerHTML = quantity;
      cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          cartItem.quantity = quantity;
          console.log(cart);
        }
      });
    }
    */
  });
});

document.querySelectorAll(".js-save-quantity-link").forEach((save) => {
  save.addEventListener("click", () => {
    const productId = save.dataset.productId;
    const inputValue = Number(
      document.querySelector(`.js-quantity-input-${productId}`).value,
    );

    document
      .querySelector(`.js-cart-item-container-${productId}`)
      .classList.remove("is-editing-quantity");

    document.querySelector(`.js-quantity-label-${productId}`).textContent =
      inputValue;
    document.querySelector(`.js-quantity-label-${productId}`).style.display =
      "initial";
    document.querySelector(
      `.js-update-quantity-link-${productId}`,
    ).style.display = "initial";
    updateQuantity(productId, inputValue);
    console.log(cart);
  });
});
