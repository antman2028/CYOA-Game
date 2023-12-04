const express = require('express');
const axios = require('axios');
const app = express();
const dotenv = require('dotenv')
const {getSetting, numValidChoices} = require('./utilModule');
const cors = require('cors');
const url = 'https://api.openai.com/v1/chat/completions';

dotenv.config();
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000',
}
app.use(cors(corsOptions));


app.listen(3001, () => {
    console.log("Server is running on port 3000");
});

app.post('/CYOA-api', async (req, res) => {
    const storyContext = JSON.parse(JSON.stringify(req.body));
    if (storyContext.data.length === 0) {
        try {
            console.log("Starting new story");
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
                            "For every chunk of the story you write, you will ALWAYS produce FOUR choices listed 1 to 4 for the player to choose from (no sub-choices), Choices should be formatted `1. 'choice'` on a separate line each"
                    }],
                    model: 'gpt-3.5-turbo',
                    stream: true,
                }),
            });

            // const data = await openAiRes.json();
            // res.json(data);

            const reader = openAiRes.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let buffer = "";

            while (true) {
                const {done, value} = await reader.read();
                if (done) {
                    break;
                }
                buffer += decoder.decode(value, {stream: true});

                let newlineIndex;
                while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
                    const line = buffer.slice(0, newlineIndex);
                    buffer = buffer.slice(newlineIndex + 1);

                    if (line.length !== 0 && !line.includes("[DONE]")) {
                        console.log("Line:", line); // Debugging: Log the raw line
                        const cleanedLine = line.replace(/^data: /, "").trim();

                        console.log("Raw Line:", cleanedLine); // Debugging: Log the raw line

                        try {
                            const parsedLine = JSON.parse(cleanedLine);
                            console.log("Parsed Line:", parsedLine); // Debugging: Log the parsed object

                            const {choices} = parsedLine;
                            const {delta} = choices[0];

                            if (delta && delta.content) {
                                res.write(delta.content)
                            }
                        } catch (parseError) {
                            console.error("JSON Parse Error:", parseError);
                            res.end()
                        }
                    }
                }
            }
            res.end()
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Server Error"});
        }
    } else {
        try {
            console.log("Continuing story");
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
                            content: `This is the story so far: ${storyContext.data[0].context}, create the next chunk of the story based on the user input below of AT MOST 200 words, and create with FOUR CHOICES listed 1 to 4, ${numValidChoice} of which will IMMEDIATELY result in the player\'s death.` +
                                "Choices should be formatted `1. 'choice'` on a separate line each, separate story chunk and choices by three separation lines, do not create choices if the player dies in the chunk you are writing."
                        },
                        {role: "user", content: `The player decides to ${storyContext.data[0].input}`}
                    ],
                    model: 'gpt-3.5-turbo',
                    stream: true,
                }),

            });
            const reader1 = openAiRes.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let buffer = "";

            while (true) {
                const {done, value} = await reader1.read();
                if (done) {
                    break;
                }
                buffer += decoder.decode(value, {stream: true});

                let newlineIndex;
                while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
                    const line = buffer.slice(0, newlineIndex);
                    buffer = buffer.slice(newlineIndex + 1);

                    if (line.length !== 0 && !line.includes("[DONE]")) {
                        const cleanedLine = line.replace(/^data: /, "").trim();

                        console.log("Raw Line:", cleanedLine); // Debugging: Log the raw line

                        try {
                            const parsedLine = JSON.parse(cleanedLine);
                            console.log("Parsed Line:", parsedLine); // Debugging: Log the parsed object

                            const {choices} = parsedLine;
                            const {delta} = choices[0];

                            if (delta && delta.content) {
                                res.write(delta.content)
                            }
                        } catch (parseError) {
                            console.error("JSON Parse Error:", parseError);
                            res.end()
                        }
                    }
                }
            }
            res.end()
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
    }
}); 

