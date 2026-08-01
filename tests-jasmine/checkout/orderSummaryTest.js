import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";

import { loadFromStorage, cart } from "../../data/cart.js";

describe("Test suite: renderOrderSummary", () => {
  it("Display the cart", () => {
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
    document.querySelector(".js-test-container").innerHTML =
      `<div class='js-order-summary'></div>`;
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
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
      ]);
    });
    loadFromStorage();
    renderOrderSummary();
    expect(cart.length).toEqual(
      document.querySelectorAll(".js-cart-item-container").length,
    );

    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText,
    ).toContain("Quantity: 2");
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText,
    ).toContain("Quantity: 1");
  });
  it("remove from cart", () => {
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
    document.querySelector(".js-test-container").innerHTML =
      `<div class='js-order-summary'></div> <div class='js-payment-summary'></div>`;
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
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
      ]);
    });
    loadFromStorage();
    renderOrderSummary();
    document
      .querySelector(".js-delete-link-e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
      .click();
    expect(
      document.querySelector(
        ".js-delete-link-e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      ),
    ).toEqual(null);
  });
});
