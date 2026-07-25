import {
  cart,
  removeFromCart,
  //updateCartQuantity as updateCartQuantityCheckout,
  updateQuantity,
  saveFunctionality,
  updateDeliveryOption,
} from "../../data/cart.js";
import { getProduct, products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {
  deliveryOptions,
  getDeliveryOption,
  calculateDeliveryDate,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderOrderSummary() {
  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);

    const deliveryOption = getDeliveryOption(cartItem);
    let dateString = calculateDeliveryDate(deliveryOption);
    cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container  js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">Delivery date: ${dateString}</div>

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
                ${deliveryOptionf(cartItem)}
              </div>
            </div>
        </div>
    `;
  });

  function deliveryOptionf(matchingProduct) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption);
      const priceString =
        deliveryOption.priceCents > 0
          ? `$${formatCurrency(deliveryOption.priceCents)} -`
          : "FREE";
      let isChecked =
        matchingProduct.deliveryOptionId === deliveryOption.id ? "checked" : "";

      html += `<div class="delivery-option js-delivery-option" data-product-id=${matchingProduct.productId} data-delivery-option-id=${deliveryOption.id}>
      <input
        type="radio"
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.productId}"  ${isChecked}
      />
      <div>
        <div class="delivery-option-date">${dateString}</div>
        <div class="delivery-option-price">${priceString} Shipping</div>
      </div>
    </div>`;
    });
    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`,
      );
      //container.remove();
      // Exercise 15h
      renderOrderSummary();
      //updateCartQuantity();
      renderPaymentSummary();
    });
  });

  //renderCheckoutHeader();

  document.querySelectorAll(".js-update-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

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
      saveFunctionality(productId);
      renderPaymentSummary();
      renderCheckoutHeader();
    });
  });

  document.querySelector("body").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      document.querySelectorAll(".js-save-quantity-link").forEach((save) => {
        const productId = save.dataset.productId;
        const inputValue = Number(
          document.querySelector(`.js-quantity-input-${productId}`).value,
        );
        const inputEl = document.querySelector(
          `.js-quantity-input-${productId}`,
        );

        if (getComputedStyle(inputEl).display.trim() !== "none") {
          saveFunctionality(productId);
          renderOrderSummary();
          renderPaymentSummary();
          renderCheckoutHeader();
        }
      });
    }
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    const { productId, deliveryOptionId } = element.dataset;
    element.addEventListener("click", () => {
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
