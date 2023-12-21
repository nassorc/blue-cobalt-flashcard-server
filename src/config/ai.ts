import OpenAI from "openai";


let ai: any = {}

const openai = new OpenAI({
  apiKey: "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"
})

ai.generateFlashcards = async function(prompt: string) {
  const res = await openai.chat.completions.create({
    messages: [{role: "system", content: prompt}],
    model: "gpt-3.5-turbo"
  })
  const data = JSON.parse(await res.choices[0].message.content);
}


// const openai = new OpenAIApi(new Configuration({
//   apiKey: "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"
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
