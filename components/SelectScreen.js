'use client';
import GameScreen from "@/components/GameScreen";
import {useState} from "react";
import TitlePage from "@/components/TitlePage";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";


export default function SelectScreen() {
    const [start, setStart] = useState(false);

    const startGame = () => {
        setTimeout(() => {
            setStart(true);
        }, 501);
        console.log("start game");

    }

    return (
        <div>
            <div>{!start && <TitlePage onGameStart={startGame}/>}</div>

            <div>{start && <GameScreen/>}</div>
        </div>
    )
}
