import { formatCurrency } from "../scripts/utils/money.js";

describe("Test Suite: Format Currency", () => {
  it("Convert Cents into Dollars", () => {
    expect(formatCurrency("2095")).toEqual("20.95");
  });
});
