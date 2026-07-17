import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

// localStorage.setItem("hello", "how-far");

describe("Test Suite: addToCart", () => {
  it("Add an existing product to the cart", () => {});
  it("Add a new product to the cart", () => {
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    spyOn(localStorage, "getItem").and.callFake(() => {
      return "omo nao";
    });
    /*
    console.log(localStorage.getItem("hello"));
    console.log(localStorage.getItem("cart"));
    */
  });
});

/*
setTimeout(() => {
  console.log(localStorage.getItem("hello"));
  console.log(localStorage.getItem("cart"));
}, 10000);
*/
