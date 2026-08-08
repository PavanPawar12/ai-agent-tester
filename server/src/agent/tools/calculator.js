// export function calculator(a, b, operation) {
//   switch (operation) {
//     case "add":
//       return a + b;

//     case "subtract":
//       return a - b;

//     case "multiply":
//       return a * b;

//     case "divide":
//       if (b === 0) {
//         throw new Error("Cannot divide by zero");
//       }

//       return a / b;

//     default:
//       throw new Error("Invalid operation");
//   }
// }

export function calculate({ a, b, operation }) {
  try {
    if (typeof a !== "number" || typeof b !== "number") {
      return {
        success: false,
        error: "a and b must be numbers.",
      };
    }

    let result;

    switch (operation) {
      case "add":
        result = a + b;
        break;

      case "subtract":
        result = a - b;
        break;

      case "multiply":
        result = a * b;
        break;

      case "divide":
        if (b === 0) {
          return {
            success: false,
            error: "Cannot divide by zero.",
          };
        }

        result = a / b;
        break;

      default:
        return {
          success: false,
          error: "Invalid operation.",
        };
    }

    return {
      success: true,
      calculation: `${a} ${operation} ${b}`,
      result,
    };
  } catch (error) {
    console.error("Calculator Tool Error:", error);

    return {
      success: false,
      error: error.message,
    };
  }
}