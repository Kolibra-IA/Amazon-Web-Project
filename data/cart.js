export let cart;

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: "1",
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: "2",
    },
  ];
}

loadFromStorage();

export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  return cartQuantity;
}

export function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();

  const cartQuanty = document.querySelector(".js-cart-quantity");
  if (cartQuanty) {
    cartQuanty.innerHTML = cartQuantity;
  }
  return cartQuantity;
}

export function addToCart(productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  if (matchingItem) {
    matchingItem.quantity++;
  } else {
    cart.push({ quantity: 1, productId, deliveryOptionId: "1" });
  }
  saveToStorage(cart);
}

function saveToStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (productId !== cartItem.productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage(cart);
}

export function updateQuantity(productId, newQuantity) {
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      cartItem.quantity = newQuantity;
    }
  });
}

export function saveFunctionality(productId) {
  const inputValue = Number(
    document.querySelector(`.js-quantity-input-${productId}`).value,
  );
  if (inputValue > 0 && inputValue < 1000) {
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
    //updateCartQuantity();
    saveToStorage(cart);
  } else {
    document.querySelector(`.js-quantity-input-${productId}`).style.border =
      "red 1px solid";
    document.querySelector(`.js-quantity-input-${productId}`).focus();
  }
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage(cart);
}
