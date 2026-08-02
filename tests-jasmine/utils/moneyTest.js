import { formatCurrency } from "../../scripts/utils/money.js";

describe("Test Suite: Format Currency", () => {
  it("Convert Cents into Dollars", () => {
    expect(formatCurrency("2095")).toEqual("20.95");
  });
  it("Works with 0", () => {
    expect(formatCurrency("0")).toEqual("0.00");
  });
  it("Round up to the nearest cent", () => {
    expect(formatCurrency("2000.5")).toEqual("20.01");
  });
  it("Round up to the nearest cent: Exercise 16a", () => {
    expect(formatCurrency("2000.4")).toEqual("20.00");
  });
  it("Round up to the nearest cent: Exercise 16b", () => {
    expect(formatCurrency("-2000.4")).toEqual("-20.00");
  });
});
