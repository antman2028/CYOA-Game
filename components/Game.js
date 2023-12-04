'use client';
import {useState, useEffect} from "react";
import generateStory from "@/utils/generateStory";
import GameComponent from "@/components/GameComponent";
import ChoiceComponent from "@/components/ChoiceComponent";

export default function Game({scoreHandler}) {
    const [data, setData] = useState([]);
    const [currentGeneration, setCurrentGeneration] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChunk = (chunk) => {
        if(Array.isArray(chunk)){
            setData(prevData => [...prevData, {id: prevData.length, text:'', choices: chunk}]);
        } else {
            setData(prevData => [...prevData, {id: prevData.length, text: chunk, choices:[]}]);
            setCurrentGeneration(prevGen => prevGen + chunk);
        }
    };

    const selectionHandler = (choice) => {
        scoreHandler();
        fetchMoreStory(choice);
    }

    const fetchMoreStory = (input) => {
        setIsLoading(true);
        console.log("Fetching more story");


        if (currentGeneration === "") {
            generateStory([], handleChunk)
                .then(() => setIsLoading(false))
                .catch(err => {
                    console.error("Error fetching more story:", err);
                    setIsLoading(false);
                });
        } else {
            setCurrentGeneration('')
            generateStory([{"context": currentGeneration, "input": input}], handleChunk)
                .then(() => {
                    setIsLoading(false)
                })
                .catch(err => {
                    console.error("Error fetching more story:", err);
                    setIsLoading(false);
                });
        }

    };

    useEffect(() => {
        fetchMoreStory("None");
    }, []);

    return (
        <div>
            <h1>Info:</h1>
            <div className={"flex flex-wrap"}>
                {data.map((item, index) => {
                    if(item.text){
                        return(
                            <GameComponent key={index} text={item.text}/>
                        )
                    } else {
                        return(
                            <ChoiceComponent key={index} choices={item.choices} selectionHandler={selectionHandler}/>
                        )
                    }
                })}
            </div>
        </div>
    );
}