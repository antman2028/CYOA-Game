import {useState} from "react";
import generateStory from "@/utils/generateStory";

export default function Game() {
    const [data, setData] = useState([]);
    generateStory(data)

    return (
        <div>
            <h1>Game</h1>
        </div>
    )
}