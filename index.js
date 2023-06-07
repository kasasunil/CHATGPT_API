const express=require('express');
const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.post('/getResponse',async (req,res)=>{
    console.log(req.body.message);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: req.body.message },
      ],
    });
    console.log(completion.data.choices[0].message);
    return res.status(200).send(completion.data.choices[0].message['content']);
});   

app.listen(5000,()=>{
    console.log("app is listening");
});