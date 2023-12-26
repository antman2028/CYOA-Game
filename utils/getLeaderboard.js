export default async function getLeaderboard() {
    const url = "https://o685d2sp4g.execute-api.us-east-1.amazonaws.com/Prod/leaderboard"
    const res = await fetch(url,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
    if (res.ok) {
        const leaderboard = await res.json();
        return leaderboard;
    }
    else {
        throw new Error('Error: Could not get leaderboard');
    }
}

