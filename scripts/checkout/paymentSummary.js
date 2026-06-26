import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
s;

let totalPrice = 0;
cart.forEach((cartItem, index) => {
  let matchingProduct = getProduct(cartItem.productId);
  totalPrice += (matchingProduct.priceCents / 100) * cartItem.quantity;
});

totalPrice = totalPrice.toFixed(2);
