// import express from "express";

// // import { runAgent } from "../agent/agent.js";
// import { runAgent } from "../agent/agent.js";

// const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     const { message } = req.body;

//     if (!message) {
//       return res.status(400).json({
//         message: "Message is required",
//       });
//     }

//     const response = await runAgent(message);

//     res.json({
//       response,
//     });
//   } catch (error) {
//     console.error("AI Agent Error:", error);

//     res.status(500).json({
//       message: "Something went wrong",
//     });
//   }
// });

// export default router;


import express from "express";

import { runAgent } from "../agent/agent.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    const result = await runAgent(message);

    res.json(result);
  } catch (error) {
    console.error("AI Agent Error:", error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

export default router;