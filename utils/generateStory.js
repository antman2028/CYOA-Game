
export default async function generateStory(data, chunkHandler) {
    console.log(data);
    const res = await fetch('http://localhost:3001/CYOA-api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"data": data}),
    });
    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    const regexPattern = /\d+[.:)].+\n/g;
    let isChoice = false;
    let choices = ""

    while (true) {
        const {done, value} = await reader.read();
        if (done) {
            break;
        }
        const chunk = decoder.decode(value, {stream: true});
        const rp = /\d[.:)]/
        if (chunk.includes("\n\n")) {
            isChoice = true;
        }
        if (!isChoice) {
            chunkHandler(chunk)
        } else {
            choices += chunk
        }
    }

    const matches = choices.match(regexPattern);
    if (matches) {
        chunkHandler(choices.split(regexPattern)[0].trim())
        chunkHandler(matches)
    } else {
        chunkHandler(choices)
        chunkHandler("[The End]")
    }

}

