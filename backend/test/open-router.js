import dotenv from "dotenv";
dotenv.config();

const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    Authorization: "Bearer " + process.env.OPEN_ROUTER_API_KEY,
    // "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
    // "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "mistralai/mistral-small-24b-instruct-2501:free",
    messages: [
      {
        role: "user",
        content: "write a node js script radix sort a number array ",
      },
    ],
  }),
});

const data = await res.json();
if (data.choices !== undefined) {
  for (const i of data.choices) {
    console.log(i.index, i.message.role, i.message.content);
  }
} else console.log(data);
