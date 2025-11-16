import { initChatModel } from "langchain";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";
dotenv.config();

// console.log(process.env.GOOGLE_API_KEY);

const model = new ChatGoogleGenerativeAI({
  modelName: "gemini-pro", // Or "gemini-pro-vision" for multimodal
  apiKey: process.env.GOOGLE_API_KEY,
  // Optional: Configure safety settings
  safetySettings: [
    {
      category: "HARM_CATEGORY_HARASSMENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
  ],
});

const response = await model.invoke("Why do parrots talk?");

console.log(response);
