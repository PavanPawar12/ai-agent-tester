export const toolDefinitions = [
  {
    type: "function",

    function: {
      name: "get_weather",

      description:
        "Get the current weather information for a specific city or location. Use this tool whenever the user asks about current weather, temperature, humidity, rainfall, wind, or weather conditions.",

      parameters: {
        type: "object",

        properties: {
          location: {
            type: "string",
            description:
              "The city or location to get weather information for. Example: Pune, Mumbai, London.",
          },
        },

        required: ["location"],
      },
    },
  },

  {
    type: "function",

    function: {
      name: "calculate",

      description:
        "Perform mathematical calculations. Use this tool when the user asks for arithmetic or numerical calculations.",

      parameters: {
        type: "object",

        properties: {
          expression: {
            type: "string",
            description:
              "Mathematical expression to calculate. Example: 125 * 48",
          },
        },

        required: ["expression"],
      },
    },
  },

  {
  type: "function",

  function: {
    name: "web_search",

    description:
      "Search the internet for current, recent, or up-to-date information. Use this when the user asks about latest news, recent events, current technology developments, current companies, current prices, or information that may have changed recently.",

    parameters: {
      type: "object",

      properties: {

        query: {
          type: "string",

          description:
            "A clear search query to find relevant information on the web.",
        },

      },

      required: ["query"],
    },
  },
}
];