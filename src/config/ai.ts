import OpenAI from "openai";

let ai: any = {};

const openai = new OpenAI({});

ai.generateFlashcards = async function (prompt: string) {
  const res = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: "gpt-3.5-turbo",
  });
  if (
    res.choices[0] &&
    res.choices[0].message &&
    res.choices[0].message.content
  ) {
    const data = JSON.parse(await res.choices[0]?.message?.content);
  }
};

// const openai = new OpenAIApi(new Configuration({
// }))
//
// let msg: ChatCompletionRequestMessage = {
//   role: ChatCompletionRequestMessageRoleEnum.System,
//   content: "write me a short story"
// }
//
//
// openai.createChatCompletion({
//   model: "gpt-3.5-turbo",
//   messages: [msg],
//   temperature: 0
// }).then(res => {
//   console.log(JSON.parse(res.data.choices[0].message.content))
// }).catch(err => console.log(err.response.data))
