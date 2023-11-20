'use client';
import {motion} from "framer-motion";
import {useState} from "react";
import StaggeredText from "@/animatedComponents/StaggeredText";

export default function GameScreen() {

    const [score, setScore] = useState(0);

    const eventHandler = () => {
        setScore(score + 1);
    }

    return (
        <div>
            <div className={"fixed w-full h-[10%] flex justify-center items-end flex-col"}>
                <ul className={"pr-5"}>
                    <StaggeredText className="point-font" size="small" text= {`Pts: ${score}`} />
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
            <div className={"w-full h-[10vh]"}/>
            <h1>Game</h1>
        </div>
    )
}