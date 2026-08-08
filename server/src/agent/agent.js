// // import OpenAI from "openai";

// // import { calculator } from "./tools/calculator.js";

// // const openai = new OpenAI({
// //   apiKey: process.env.GROQ_API_KEY,
// //    baseURL: "https://api.groq.com/openai/v1"
// // });

// // const tools = [
// //   {
// //     type: "function",
// //     name: "calculator",
// //     description:
// //       "Perform basic mathematical calculations such as addition, subtraction, multiplication and division.",
// //     parameters: {
// //       type: "object",
// //       properties: {
// //         a: {
// //           type: "number",
// //           description: "The first number",
// //         },
// //         b: {
// //           type: "number",
// //           description: "The second number",
// //         },
// //         operation: {
// //           type: "string",
// //           enum: ["add", "subtract", "multiply", "divide"],
// //           description: "The mathematical operation to perform",
// //         },
// //       },
// //       required: ["a", "b", "operation"],
// //       additionalProperties: false,
// //     },
// //     strict: true,
// //   },
// // ];

// // export async function runAgent(userMessage) {
// //   let input = [
// //     {
// //       role: "user",
// //       content: userMessage,
// //     },
// //   ];

// //   while (true) {
// //     const response = await openai.responses.create({
// //       model: "llama-3.3-70b-versatile",
// //       instructions: `
// //         You are a helpful AI agent.

// //         You have access to a calculator tool.

// //         Use the calculator when the user asks you to perform
// //         mathematical calculations.

// //         For normal questions, answer directly.
// //       `,
// //       tools,
// //       input,
// //     });

// //     const toolCalls = response.output.filter(
// //       (item) => item.type === "function_call"
// //     );

// //     if (toolCalls.length === 0) {
// //       return response.output_text;
// //     }

// //     input.push(...response.output);

// //     for (const toolCall of toolCalls) {
// //       if (toolCall.name === "calculator") {
// //         const args = JSON.parse(toolCall.arguments);

// //         const result = calculator(
// //           args.a,
// //           args.b,
// //           args.operation
// //         );

// //         input.push({
// //           type: "function_call_output",
// //           call_id: toolCall.call_id,
// //           output: String(result),
// //         });
// //       }
// //     }
// //   }
// // }


// // import OpenAI from "openai";

// // import { calculator } from "./tools/calculator.js";

// // const groq = new OpenAI({
// //   apiKey: process.env.GROQ_API_KEY,
// //   baseURL: "https://api.groq.com/openai/v1",
// // });

// // const tools = [
// //   {
// //     type: "function",
// //     function: {
// //       name: "calculator",
// //       description:
// //         "Perform basic mathematical calculations such as addition, subtraction, multiplication and division.",

// //       parameters: {
// //         type: "object",

// //         properties: {
// //           a: {
// //             type: "number",
// //             description: "The first number",
// //           },

// //           b: {
// //             type: "number",
// //             description: "The second number",
// //           },

// //           operation: {
// //             type: "string",

// //             enum: [
// //               "add",
// //               "subtract",
// //               "multiply",
// //               "divide",
// //             ],

// //             description:
// //               "The mathematical operation to perform",
// //           },
// //         },

// //         required: ["a", "b", "operation"],
// //       },
// //     },
// //   },
// // ];

// // export async function runAgent(userMessage) {
// //   const activities = [];

// //   activities.push({
// //     type: "thinking",
// //     message: "Understanding the request",
// //   });

// //   const messages = [
// //     {
// //       role: "system",

// //       content: `
// // You are a helpful AI agent.

// // You have access to a calculator tool.

// // Use the calculator whenever the user asks you
// // to perform mathematical calculations.

// // For normal questions, answer directly.
// //       `,
// //     },

// //     {
// //       role: "user",
// //       content: userMessage,
// //     },
// //   ];

// //   while (true) {
// //     const response = await groq.chat.completions.create({
// //       model: "llama-3.3-70b-versatile",

// //       messages,

// //       tools,

// //       tool_choice: "auto",
// //     });

// //     const assistantMessage = response.choices[0].message;

// //     messages.push(assistantMessage);

// //     // No tool required
// //     if (!assistantMessage.tool_calls) {
// //       activities.push({
// //         type: "complete",
// //         message: "Task completed",
// //       });

// //       return {
// //         response: assistantMessage.content,
// //         activities,
// //       };
// //     }

// //     // Tool requested
// //     for (const toolCall of assistantMessage.tool_calls) {
// //       if (toolCall.function.name === "calculator") {
// //         activities.push({
// //           type: "tool",
// //           message: "Using calculator",
// //         });

// //         const args = JSON.parse(
// //           toolCall.function.arguments
// //         );

// //         const result = calculator(
// //           args.a,
// //           args.b,
// //           args.operation
// //         );

// //         activities.push({
// //           type: "result",
// //           message: `Calculator result: ${result}`,
// //         });

// //         messages.push({
// //           role: "tool",

// //           tool_call_id: toolCall.id,

// //           content: String(result),
// //         });
// //       }
// //     }
// //   }
// // }


// import Groq from "groq-sdk";

// // import { getWeather } from "../tools/weather.tool.js";
// import { getWeather } from "./tools/weather.tool.js";

// import { calculate } from "../tools/calculator.tool.js";
// import { toolDefinitions } from "../tools/toolDefinitions.js";
// import { webSearch } from "../tools/webSearch.tool.js";
// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY,
// });

// const MODEL = "llama-3.3-70b-versatile";

// const MAX_TOOL_ITERATIONS = 5;


// // ======================================================
// // TOOL MAP
// // ======================================================

// const availableTools = {
//   get_weather: getWeather,
//   calculate: calculate,
//    web_search: webSearch,
// };


// // ======================================================
// // MAIN AGENT
// // ======================================================

// export async function runAgent(userMessage) {

//   const activities = [];

//   const messages = [

//     {
//       role: "system",

//       content: `
// You are AgentForge, an intelligent AI agent.

// You have access to three tools.

// TOOLS:

// 1. calculate
// Use when the user needs mathematical calculations.

// 2. get_weather
// Use when the user asks about current weather,
// temperature, humidity, rainfall, wind, or weather conditions.

// 3. web_search
// Use when the user needs current, recent, or changing information,
// including latest news, technology updates, current events,
// companies, products, or other information that may have changed.

// IMPORTANT:

// - Decide yourself whether a tool is necessary.
// - Do not call tools unnecessarily.
// - Never invent weather information.
// - Never invent search results.
// - Never invent calculation results.
// - After receiving a tool result, analyze it before answering.
// - Give the user a clear final answer.
// `,
//     },

//     {
//       role: "user",
//       content: userMessage,
//     },

//   ];


//   try {

//     for (
//       let iteration = 0;
//       iteration < MAX_TOOL_ITERATIONS;
//       iteration++
//     ) {

//       activities.push({
//         type: "thinking",
//         message: "Analyzing the request",
//       });


//       // ==================================================
//       // ASK MODEL
//       // ==================================================

//       const response =
//         await groq.chat.completions.create({

//           model: MODEL,

//           messages,

//           tools: toolDefinitions,

//           tool_choice: "auto",

//           temperature: 0.2,
//         });


//       const assistantMessage =
//         response.choices[0].message;


//       messages.push(assistantMessage);


//       // ==================================================
//       // NO TOOL → FINAL ANSWER
//       // ==================================================

//       if (
//         !assistantMessage.tool_calls ||
//         assistantMessage.tool_calls.length === 0
//       ) {

//         activities.push({
//           type: "complete",
//           message: "Task completed",
//         });

//         return {
//           response:
//             assistantMessage.content ||
//             "I couldn't generate a response.",

//           activities,
//         };
//       }


//       // ==================================================
//       // TOOL CALLS
//       // ==================================================

//       for (
//         const toolCall of assistantMessage.tool_calls
//       ) {

//         const functionName =
//           toolCall.function.name;

//         const functionArguments =
//           JSON.parse(
//             toolCall.function.arguments
//           );


//         // activities.push({
//         //   type: "tool",
//         //   message: `Using ${functionName} tool`,
//         // });


//         const toolNames = {
//   calculate: "Calculator",
//   get_weather: "Weather",
//   web_search: "Web Search",
// };

// activities.push({
//   type: "tool",
//   message: `Using ${toolNames[functionName] || functionName} tool`,
// });

//         const toolFunction =
//           availableTools[functionName];


//         if (!toolFunction) {

//           messages.push({
//             role: "tool",

//             tool_call_id:
//               toolCall.id,

//             name:
//               functionName,

//             content: JSON.stringify({
//               success: false,
//               error:
//                 `Tool ${functionName} does not exist.`,
//             }),
//           });

//           continue;
//         }


//         // ==================================================
//         // EXECUTE TOOL
//         // ==================================================

//         const result =
//           await toolFunction(
//             functionArguments
//           );


//         // activities.push({
//         //   type: "result",
//         //   message: `${functionName} returned a result`,
//         // });

//         activities.push({
//   type: "result",
//   message: `${toolNames[functionName] || functionName} returned a result`,
// });


//         // ==================================================
//         // SEND RESULT BACK TO MODEL
//         // ==================================================

//         messages.push({

//           role: "tool",

//           tool_call_id:
//             toolCall.id,

//           name:
//             functionName,

//           content:
//             JSON.stringify(result),

//         });

//       }

//     }


//     return {
//       response:
//         "The agent reached the maximum number of tool steps.",

//       activities,
//     };


//   } catch (error) {

//     console.error(
//       "AI Agent Error:",
//       error
//     );


//     activities.push({
//       type: "error",
//       message: "Agent execution failed",
//     });


//     throw error;
//   }
// }


import Groq from "groq-sdk";

import { getWeather } from "./tools/weather.tool.js";
import { calculate } from "./tools/calculator.js";
import { toolDefinitions } from "./tools/toolDefinitions.js";
import { webSearch } from "./tools/webSearch.tool.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const MODEL = "llama-3.3-70b-versatile";

const MAX_TOOL_ITERATIONS = 5;

// ======================================================
// TOOL MAP
// ======================================================

const availableTools = {
  get_weather: getWeather,
  calculate: calculate,
  web_search: webSearch,
};

// ======================================================
// MAIN AGENT
// ======================================================

export async function runAgent(userMessage) {
  const activities = [];

  const messages = [
    {
      role: "system",

      content: `
You are AgentForge, an intelligent AI agent.

You have access to three tools.

TOOLS:

1. calculate
Use when the user needs mathematical calculations.

2. get_weather
Use when the user asks about current weather,
temperature, humidity, rainfall, wind, or weather conditions.

3. web_search
Use when the user needs current, recent, or changing information,
including latest news, technology updates, current events,
companies, products, or other information that may have changed.

IMPORTANT:

- Decide yourself whether a tool is necessary.
- Do not call tools unnecessarily.
- Never invent weather information.
- Never invent search results.
- Never invent calculation results.
- After receiving a tool result, analyze it before answering.
- Give the user a clear final answer.
      `,
    },

    {
      role: "user",
      content: userMessage,
    },
  ];

  try {
    for (
      let iteration = 0;
      iteration < MAX_TOOL_ITERATIONS;
      iteration++
    ) {
      activities.push({
        type: "thinking",
        message: "Analyzing the request",
      });

      // ==================================================
      // ASK MODEL
      // ==================================================

      const response = await groq.chat.completions.create({
        model: MODEL,

        messages,

        tools: toolDefinitions,

        tool_choice: "auto",

        temperature: 0.2,
      });

      const assistantMessage = response.choices[0].message;

      messages.push(assistantMessage);

      // ==================================================
      // NO TOOL → FINAL ANSWER
      // ==================================================

      if (
        !assistantMessage.tool_calls ||
        assistantMessage.tool_calls.length === 0
      ) {
        activities.push({
          type: "complete",
          message: "Task completed",
        });

        return {
          response:
            assistantMessage.content ||
            "I couldn't generate a response.",

          activities,
        };
      }

      // ==================================================
      // TOOL CALLS
      // ==================================================

      for (const toolCall of assistantMessage.tool_calls) {
        const functionName = toolCall.function.name;

        const functionArguments = JSON.parse(
          toolCall.function.arguments
        );

        // Friendly tool names for frontend
        const toolNames = {
          calculate: "Calculator",
          get_weather: "Weather",
          web_search: "Web Search",
        };

        activities.push({
          type: "tool",
          message: `Using ${
            toolNames[functionName] || functionName
          } tool`,
        });

        // ==================================================
        // FIND TOOL
        // ==================================================

        const toolFunction = availableTools[functionName];

        if (!toolFunction) {
          messages.push({
            role: "tool",

            tool_call_id: toolCall.id,

            name: functionName,

            content: JSON.stringify({
              success: false,
              error: `Tool ${functionName} does not exist.`,
            }),
          });

          continue;
        }

        // ==================================================
        // EXECUTE TOOL
        // ==================================================

        const result = await toolFunction(functionArguments);

        activities.push({
          type: "result",
          message: `${
            toolNames[functionName] || functionName
          } returned a result`,
        });

        // ==================================================
        // SEND TOOL RESULT BACK TO MODEL
        // ==================================================

        messages.push({
          role: "tool",

          tool_call_id: toolCall.id,

          name: functionName,

          content: JSON.stringify(result),
        });
      }
    }

    return {
      response:
        "The agent reached the maximum number of tool steps.",

      activities,
    };
  } catch (error) {
    console.error("AI Agent Error:", error);

    activities.push({
      type: "error",
      message: "Agent execution failed",
    });

    throw error;
  }
}