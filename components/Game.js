'use client';
import {useState, useEffect, Fragment, useRef} from "react";
import generateStory from "@/utils/generateStory";
import GameComponent from "@/components/GameComponent";
import ChoiceComponent from "@/components/ChoiceComponent";
import submitScore from "@/utils/submitScore";
import StaggeredText from "@/components/StaggeredText";

export default function Game({scoreHandler, finishHandler}) {
    const [data, setData] = useState([]);
    const [currentGeneration, setCurrentGeneration] = useState('');
    const [hasEnded, setEnded] = useState(false);
    const nameValue = useRef(null);
    const [score, setScore] = useState(0);

    const handleChunk = (chunk) => {
        if(Array.isArray(chunk)){
            setData(prevData => [...prevData, {id: prevData.length, text:'', choices: chunk}]);
        } else {
            setData(prevData => [...prevData, {id: prevData.length, text: chunk, choices:[]}]);
            setCurrentGeneration(prevGen => prevGen + chunk);
            if (chunk.includes("[The End]")) {
                setEnded(true);
            }
        }
    };

    const selectionHandler = (choice) => {
        setScore(score + 1);
        scoreHandler();
        fetchMoreStory(choice);
    }

    const fetchMoreStory = (input) => {

        if (currentGeneration === "") {
            generateStory([], handleChunk)
                .catch(err => {
                    console.error("Error fetching more story:", err);

                });
        } else {
            setCurrentGeneration('')
            generateStory([{"context": currentGeneration, "input": input}], handleChunk)
                .catch(err => {
                    console.error("Error fetching more story:", err);

                });
        }

    };

    useEffect(() => {
        fetchMoreStory("None");
    }, []);

    return (
        <div>
            <div className={"flex flex-wrap"}>
                {data.map((item) => {
                    if(item.text){
                        return(
                            <GameComponent key={`game-${item.id}`} text={item.text}/>
                        )
                    } else {
                        return(
                            <Fragment key={`choice-${item.id}`}>
                                <div className={"mr-96"}/>
                                <ChoiceComponent key={item.id} choices={item.choices} selectionHandler={selectionHandler}/>
                            </Fragment>
                    )
                    }
                })}
            </div>
            {hasEnded && (
                <>
                    <StaggeredText className="point-font" size="medium" text={"Thank you for playing"}/>
                    <input className={"text-black p-4 t"} ref={nameValue} type="text" placeholder={"your-name"} maxLength={"10"} />
                    <button className={"end-button"} onClick={() => {
                        finishHandler()
                        submitScore(nameValue.current.value, score)
                    }}>
                        Submit Score :)
                    </button>
                </>
            )}
        </div>
    );
}