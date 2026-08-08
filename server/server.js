// import express from 'express';
// import cors from 'cors'
// import dotenv from 'dotenv';
// // import chatRoutes from './src/routes/chat.routes.js'
// import chatRoutes from './src/routes/chat.routes.js'
// dotenv.config();
// const app = express();


// app.use(cors());
// app.use(express.json());
// const PORT = process.env.PORT || 5000;
// console.log("Open Ap API key: ",process.env.OPENAI_API_KEY)
// app.use('/api/chat', chatRoutes);
// app.listen(PORT, () => {
//     console.log(`Server running on PORT: ${PORT}`);
// })

import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import chatRoutes from './src/routes/chat.routes.js';

const app = express();

app.use(app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
));
app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AgentForge API is running 🚀",
  });
});
const PORT = process.env.PORT || 5000;

console.log(
  'Groq API key loaded',
  process.env.GROQ_API_KEY ? 'YES' : 'NO'
);


app.use('/api/chat', chatRoutes);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});