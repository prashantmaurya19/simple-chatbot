import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import {
  extractTitle,
  formatPromptForChatReply,
  formatPromptForChatTitle,
  getChatReplyFromAi,
} from "./ai-api/index.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(
  express.static(
    path.join(__dirname.substring(0, __dirname.length - 4), "public"),
  ),
);

app.get(/^(?!.*prompt).*$/, function (req, res) {
  res.sendFile(
    path.join(
      __dirname.substring(0, __dirname.length - 4),
      "public",
      "index.html",
    ),
  );
});

app.post("/prompt", async (req, res) => {
  const chat_replay = await getChatReplyFromAi(
    formatPromptForChatReply(
      req.body.title
        ? formatPromptForChatTitle(req.body.prompt)
        : req.body.prompt,
    ),
  );
  if (req.body.title) {
    // chat_replay = extractTitle(chat_replay.output_text.trim());
    res.send({
      ...chat_replay,
      ...extractTitle(chat_replay.output_text.trim()),
    });
  } else res.send(chat_replay);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
