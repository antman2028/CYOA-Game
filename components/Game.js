'use client';
import {useState, useEffect} from "react";
import generateStory from "@/utils/generateStory";
import StaggeredText from "@/components/StaggeredText";
import {v4 as uuidv4} from 'uuid';

export default function Game() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleChunk = (chunk) => {
        setData(prevData => [...prevData, {id: prevData.length, text: chunk}]);
    };

    const fetchMoreStory = () => {
        setIsLoading(true);
        console.log("Fetching more story");

        const lastText = data.length > 0 ? data[data.length - 1].text : "";
        if (lastText === "") {
            generateStory([], handleChunk)
                .then(() => setIsLoading(false))
                .catch(err => {
                    console.error("Error fetching more story:", err);
                    setIsLoading(false);
                });
        } else {
            generateStory([{"context": lastText, "input": "Continue story..."}], handleChunk)
                .then(() => setIsLoading(false))
                .catch(err => {
                    console.error("Error fetching more story:", err);
                    setIsLoading(false);
                });
        }

    };

    useEffect(() => {
        fetchMoreStory();
    }, []);

    return (
        <div>
            <h1>Info:</h1>
            <div className={"flex flex-wrap"}>
                {data.map((item, index) => (
                    <StaggeredText
                        className="point-font"
                        size="small"
                        key={index}
                        text={item.text + " "}/>

                ))}
            </div>
            <button onClick={fetchMoreStory} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Get More Story'}
            </button>
        </div>
    );
}