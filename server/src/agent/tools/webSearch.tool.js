import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


export async function webSearch({ query }) {

  try {

    if (!query) {
      return {
        success: false,
        error: "Search query is required.",
      };
    }


    const response =
      await groq.chat.completions.create({

        model: "groq/compound",

        messages: [

          {
            role: "system",

            content:
              "Search the web for the user's query and provide accurate, concise information. Prefer recent and reliable sources.",
          },

          {
            role: "user",

            content: query,
          },

        ],

      });


    const message =
      response.choices[0].message;


    return {

      success: true,

      query,

      answer:
        message.content || "",

      sources:
        message.executed_tools || [],

    };

  } catch (error) {

    console.error(
      "Web Search Tool Error:",
      error
    );

    return {

      success: false,

      error:
        "Unable to perform web search.",

    };

  }

}