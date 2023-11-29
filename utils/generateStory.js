
async function generateStory(data) {
    const res = await fetch('http://localhost:3001/CYOA-api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"data":data}),
    });
    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");

    while (true) {
        const {done, value} = await reader.read();
        if (done) {
            break;
        }
        const buffer = decoder.decode(value, {stream: true});
        console.log(buffer)


    }

}

generateStory([])
