const model_names = [
  "kwaipilot/kat-coder-pro:free",
  "nvidia/nemotron-nano-12b-v2-vl:free",
  "alibaba/tongyi-deepresearch-30b-a3b:free",
  "meituan/longcat-flash-chat:free",
  "nvidia/nemotron-nano-9b-v2:free",
  "deepseek/deepseek-chat-v3.1:free",
  "openai/gpt-oss-20b:free",
  "z-ai/glm-4.5-air:free",
  "qwen/qwen3-coder:free",
  "moonshotai/kimi-k2:free",
  "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",
  "google/gemma-3n-e2b-it:free",
  "tngtech/deepseek-r1t2-chimera:free",
  "mistralai/mistral-small-3.2-24b-instruct:free",
  "deepseek/deepseek-r1-0528-qwen3-8b:free",
  "deepseek/deepseek-r1-0528:free",
  "google/gemma-3n-e4b-it:free",
  "qwen/qwen3-4b:free",
  "qwen/qwen3-30b-a3b:free",
  "qwen/qwen3-14b:free",
  "qwen/qwen3-235b-a22b:free",
  "tngtech/deepseek-r1t-chimera:free",
  "microsoft/mai-ds-r1:free",
  "arliai/qwq-32b-arliai-rpr-v1:free",
  "agentica-org/deepcoder-14b-preview:free",
  "qwen/qwen2.5-vl-32b-instruct:free",
  "deepseek/deepseek-chat-v3-0324:free",
  "mistralai/mistral-small-3.1-24b-instruct:free",
  "google/gemma-3-4b-it:free",
  "google/gemma-3-12b-it:free",
  "google/gemma-3-27b-it:free",
  "mistralai/mistral-small-24b-instruct-2501:free",
  "deepseek/deepseek-r1-distill-llama-70b:free",
  "deepseek/deepseek-r1:free",
  "google/gemini-2.0-flash-exp:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "qwen/qwen-2.5-coder-32b-instruct:free",
  "meta-llama/llama-3.2-3b-instruct:free",
  "qwen/qwen-2.5-72b-instruct:free",
  "nousresearch/hermes-3-llama-3.1-405b:free",
  "mistralai/mistral-nemo:free",
  "mistralai/mistral-7b-instruct:free",
];

export function formatPromptForChatReply(prompt) {
  return `
intruction for reply:
1) use plain text only (no markdown)
2) below is conversation between you and user 
3) replay for last below user prompt

${prompt}
`;
}

export function formatPromptForChatTitle(prompt) {
  return `4) create a shortest conversation title for below conversation
5) create title based on user's msg
6) title will be in last line in format eg. title => <chat_title>

${prompt}
`;
}

/**
 * @param {string} prompt
 * @returns {{output_text:string,title}}
 */
export function extractTitle(prompt) {
  for (let i = prompt.length - 1; i > -1; i--) {
    if (prompt.charAt(i) === "\n") {
      // console.log(prompt.substring(i + 1, i + 6), prompt.substring(i + 9));
      return {
        output_text: prompt.substring(0, i).trim(),
        title:
          prompt.substring(i + 1, i + 6) === "title"
            ? prompt.substring(i + 9)
            : "No Tile",
      };
    }
  }
}

export async function getChatReplyFromAi(prompt) {
  for (let i = 0; i < 2; i++)
    for (const model of model_names) {
      try {
        const res = await (
          await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: "Bearer " + process.env.OPEN_ROUTER_API_KEY,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model,
              messages: [
                {
                  role: "user",
                  content: prompt,
                },
              ],
            }),
          })
        ).json();
        if (res.choices == undefined) continue;
        // console.log(res);
        return {
          output_text: res.choices[0].message.content,
          role: res.choices[0].message.role,
        };
      } catch (e) {
        console.error(e);
      }
    }
  return {
    output_text: "Something Went Wrong",
    role: "server",
    error: true,
  };
}
