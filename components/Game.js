'use client';
import {useState, useEffect, Fragment} from "react";
import generateStory from "@/utils/generateStory";
import GameComponent from "@/components/GameComponent";
import ChoiceComponent from "@/components/ChoiceComponent";
import LeaderBoardScreen from "@/components/LeaderBoardScreen";

export default function Game({scoreHandler, finishHandler}) {
    const [data, setData] = useState([]);
    const [currentGeneration, setCurrentGeneration] = useState('');
    const [hasEnded, setEnded] = useState(false);
    const [leaderboard, setLeaderboard] = useState(false);

    const handleChunk = (chunk) => {
        if(Array.isArray(chunk)){
            setData(prevData => [...prevData, {id: prevData.length, text:'', choices: chunk}]);
        } else {
            setData(prevData => [...prevData, {id: prevData.length, text: chunk, choices:[]}]);
            setCurrentGeneration(prevGen => prevGen + chunk);
            if (chunk.includes("[The End]")) {
                console.log("The End");
                setEnded(true);
            }
        }
    };

    const selectionHandler = (choice) => {
        scoreHandler();
        fetchMoreStory(choice);
    }

    const fetchMoreStory = (input) => {
        console.log("Fetching more story");

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
                <GameComponent  text={"This is a  idsahf idosaf hdoias fdoisafaois faosi fdsioaf oias foid safiodsh afoi hdasf dssfdsafd as asdfasdfasfda sdsa fdfdfd df sds sds sd"}/>
                <div className={"mr-96"}/>
                <ChoiceComponent choices={["None ashfdosahfdoisaf hoi sadhfioasf iodash fdosia fsioa fodsa hfo sadfhdiosahfdsioafh dosaf hdsaf  asfhid fhdso fosa dfoashiois afoisa hfois afoai sdfo iashoi fasd", "None", "None", "None", "None"]} selectionHandler={selectionHandler}/>
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
            {!hasEnded && (
                <button className={"end-button"} onClick={() => {
                    finishHandler()

                }}>
                    Input Score :)
                </button>
            )}
            {!leaderboard && (
                <LeaderBoardScreen/>
            )}
        </div>
    );
}