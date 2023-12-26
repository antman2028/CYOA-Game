'use client';
import {motion} from "framer-motion";
import {useState, useEffect} from "react";
import StaggeredText from "@/components/StaggeredText";
import generateStory from "@/utils/generateStory";
import Game from "@/components/Game";
import LeaderBoardScreen from "@/components/LeaderBoardScreen";

export default function GameScreen() {

    const [score, setScore] = useState(0);
    const [done, setDone] = useState(false);
    const [showLeaderboard, setShowLeaderboard] = useState(false);

    const scoreHandler = () => {
        setScore(score + 1);
    }

    const finishHandler = () => {
        setDone(true);
        setShowLeaderboard(true)
    }

    return (
        <>
            <div>
                <div className={"fixed w-full h-[10%] flex justify-center items-end flex-col bar-fade"}>
                    <ul className={"pr-5"}>
                        <StaggeredText className="point-font" size="medium" text={`Score: ${score}`}/>
                        <motion.div
                            initial={{width: 0}}
                            animate={{width: "100%"}}
                            transition={{duration: 1}}
                            style={{
                                height: "2px",
                                background: "white",
                                margin: "0 auto",
                            }}
                        />
                    </ul>
                </div>
                <div className={"w-full h-[10vh]"}></div>
                <div className={"scroll-container"}>
                        <div className={"scroll-text"}>
                            {!done &&
                                <Game scoreHandler={scoreHandler} finishHandler={finishHandler}/>
                            }
                            {showLeaderboard && (
                                <LeaderBoardScreen/>
                            )}
                        </div>
                </div>
            </div>
        </>
    )
}