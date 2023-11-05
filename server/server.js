import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello from Me",
  });
});

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    openai.Completion.create(
      {
        engine: "text-davinci-002",
        prompt: `${prompt}`,
        max_tokens: 3000,
      },
      function (error, response) {
        if (error) {
          console.error(error);
          res.status(500).send("Something went wrong");
        } else {
          const botResponse = response.choices[0].text;
          console.log(botResponse);
          res.status(200).send({
            bot: botResponse,
          });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

app.listen(5000, () =>
  console.log("AI server started on http://localhost:5000")
);
