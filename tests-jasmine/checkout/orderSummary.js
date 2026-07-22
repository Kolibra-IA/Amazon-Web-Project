import {
  renderOrderSummary,
  loadFromStorage,
} from "../../scripts/checkout/orderSummary";

describe("Test suite: renderOrderSummary", () => {
  it("Display the cart", () => {
    document.querySelector(".js-test-container").innerHTML =
      `<div class='js-order-summary></div>`;
    spyOn(localStorage, "getItem").and.callFake(() => {
      return [
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
    });
    loadFromStorage();
    renderOrderSummary();
  });
});
