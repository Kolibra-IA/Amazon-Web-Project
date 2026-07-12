import { formatCurrency } from "../scripts/utils/money.js";

console.log("Format Currency Test Suite");

//Test Case 1:
console.log("Conversion from cents to dollars:");
if (formatCurrency(2095) === "20.95") {
  console.log("Passed!");
} else {
  console.log("Failed!");
}

//Test Case 2:
console.log("Testing zero (0):");
if (formatCurrency(0) === "0.00") {
  console.log("Passed!");
} else {
  console.log("Failed!");
}

//Test Case 3:
console.log("Rounding up:");
if (formatCurrency(2000.5) === "20.01") {
  console.log("Passed!");
} else {
  console.log("Failed!");
}
