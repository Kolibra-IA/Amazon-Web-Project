import { cart, calculateCartQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";

export function renderPaymentSummary() {
  let productPriceCent = 0;
  let shippingPriceCent = 0;
  cart.forEach((cartItem) => {
    let matchingProduct = getProduct(cartItem.productId);
    productPriceCent += matchingProduct.priceCents * cartItem.quantity;
    let deliveryOption = getDeliveryOption(cartItem);
    shippingPriceCent += deliveryOption.priceCents * cartItem.quantity;
  });
  productPriceCent = productPriceCent / 100;
  shippingPriceCent = shippingPriceCent / 100;

  const totalBeforeTax = Number(
    (productPriceCent + shippingPriceCent).toFixed(2),
  );
  const taxCents = Number((totalBeforeTax * 0.1).toFixed(2));
  const totalCents = Number((totalBeforeTax + taxCents).toFixed(2));

  const paymentSummaryHTML = `<div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div class='js-items'>Items (3):</div>
            <div class="payment-summary-money">$${productPriceCent}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${shippingPriceCent}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${totalBeforeTax}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${taxCents}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${totalCents}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;

  document.querySelector(".js-items").innerHTML =
    `Items(${calculateCartQuantity()})`;
}
