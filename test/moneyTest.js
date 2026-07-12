import { formatCurrency } from "../scripts/utils/money.js";

//Test Case 1:
if (formatCurrency(2095) === "20.95") {
  console.log("Passed!");
} else {
  console.log("Failed!");
}

//Test Case 2:
if (formatCurrency(0) === "0.00") {
  console.log("Passed!");
} else {
  console.log("Failed!");
}
