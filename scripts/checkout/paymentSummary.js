import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";

export function renderPaymentSummary() {
  let productPriceCent = 0;
  let shippingPriceCent = 0;
  cart.forEach((cartItem) => {
    let matchingProduct = getProduct(cartItem.productId);
    productPriceCent += matchingProduct.priceCents * cartItem.quantity;
    deliveryOption = getDeliveryOption(cartItem);
    shippingPriceCent += deliveryOption.priceCents * cartItem.quantity;
  });
  productPriceCent = productPriceCent / 100;
  shippingPriceCent = shippingPriceCent / 100;
}
