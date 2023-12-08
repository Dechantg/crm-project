require('dotenv').config();

const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function assistent(value) { 
  const assistant = { id: process.env.OPENAI_ASSISTANT_ID };  
  const query = JSON.stringify(value)

  const thread = await openai.beta.threads.create();

  const message = await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: query,
  });
  
  const interval = 1000;
  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id,
  });

  const messages = await openai.beta.threads.messages.list(thread.id);

  let timeout = 30000;
  let timeElapsed = 0;
  let jsonObject;


  while (timeElapsed < timeout) {
    let retrievedRun = await openai.beta.threads.runs.retrieve(thread.id, run?.id);

    if (retrievedRun && retrievedRun.status === "completed") {
      const messagesFromThread = await openai.beta.threads.messages.list(thread.id);

      const jsonStringWithText = messagesFromThread.data[0].content[0].text.value;
 
    try {

      jsonObject = JSON.parse(jsonString);
      jsonObject.description = description;

    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
      return jsonObject;
  }
    await new Promise((resolve) => setTimeout(resolve, interval));
    timeElapsed += interval;
}

}
module.exports = assistent;