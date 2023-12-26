export default async function submitScore(playerName, score) {
    const url = "https://o685d2sp4g.execute-api.us-east-1.amazonaws.com/Prod/submit-score"
    const res = await fetch(url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"playerName":playerName,"score": score}),
        })
    if (res.ok) {
        console.log("Score submitted successfully");
    }
}

