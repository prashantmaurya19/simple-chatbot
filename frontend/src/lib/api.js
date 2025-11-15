//@ts-nocheck
const base_link = "http://localhost:3000";
const paraller_requests = 1;
/** @type {Record<import("@/components/chatbox/chatmsg-box").SenderType,string>} */
export const PROMPT_SENDER_NAME_SUBSTITUTION = {
  You: "user",
  "Ai Response": "you",
};

/**
 * @param {string} endpoint
 * @param {RequestInit} param
 * @returns {Promise<Response>}
 */
export function fetchApi(endpoint, param) {
  return fetch(base_link + endpoint, param);
}
const status = {
  requests: 0,
};
/**
 * @param {string} prompt
 * @param {boolean} [title=undefind] - chat title require or not
 * @returns {Promise<object>}
 */
export async function fetchAiResponse(prompt, title) {
  if (status.requests > paraller_requests) return;
  status.requests++;
  const result = await (
    await fetchApi(`/prompt/`, {
      method: "POST",
      body: JSON.stringify({
        prompt,
        title,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  status.requests--;
  return result;
}

export function formatPrompt(sender, prompt) {
  return `${PROMPT_SENDER_NAME_SUBSTITUTION[sender]}: ${prompt}`;
}
