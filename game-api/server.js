const express = require('express');
const axios = require('axios');
const app = express();
const dotenv = require('dotenv')
const {getSetting, numValidChoices} = require('./utilModule');
const url = 'https://api.openai.com/v1/chat/completions';

dotenv.config();
app.use(express.json());

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

app.post('/stream-response', async (req, res) => {
    const storyContext = JSON.parse(JSON.stringify(req.body));

    if (storyContext.length === {}) {
        try {
            const setting = getSetting();
            const openAiRes = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [{
                        role: "system",
                        content: `You are a storyteller that creates a choose your own adventure story with no definite end in ${setting}.` +
                            "For every chunk of the story you write, you will produce 4 choices listed 1 to 4 for the player to choose from." +
                            "One choice will immediately kill the player and end the game" +
                            "You will be given a choice to either continue the story or end it."
                    }],
                    model: 'gpt-3.5-turbo',
                    stream: true,
                }),
            });
            // const data = await openAiRes.json();
            // res.json(data);
            openAiRes.body.pipe(res);
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Server Error"});
        }
    } else {
        try {
            const numValidChoice = numValidChoices();
            const openAiRes = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [
                        {
                            role: "system",
                            content: `This is the story so far: ${storyContext.context}, create the next part of the story along with 4 choices, ${numValidChoice} of which will result in the player\'s death.`
                        },
                        {role: "user", content: storyContext.input}
                    ],
                    model: 'gpt-3.5-turbo',
                }),

            });
            const data = await openAiRes.json();
            res.json(data);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    }
});

