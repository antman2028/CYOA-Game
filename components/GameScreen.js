'use client';
import {motion} from "framer-motion";
import {useState, useEffect} from "react";
import StaggeredText from "@/components/StaggeredText";
import generateStory from "@/utils/generateStory";
import Game from "@/components/Game";

export default function GameScreen() {

    const [score, setScore] = useState(0);
    const [data, addData] = useState([
        {id: 1, text: "This is a test. hodsahbfidsahf idsa foih afsodi hasoifh dsoiahf odisahdoisas afoi fdgasdf"},
        {id: 2, text: "This is a test. hodsahbfidsahf idsa foih afsodi hasoifh dsoiahf odisahdoisas afoi fdgasdf"},

    ]);

    const scoreHandler = () => {
        setScore(score + 1);
    }

    console.log(generateStory(data).then((res) => {
        console.log(JSON.parse(JSON.stringify(res)).choices[0]);


    }))


    return (
        <div>
            <div className={"fixed w-full h-[10%] flex justify-center items-end flex-col"}>
                <ul className={"pr-5"}>
                    <StaggeredText className="point-font" size="medium" text= {`Pts: ${score}`} />
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
                <button onClick={scoreHandler}>Click me</button>
            </div>
            <div className={"w-full h-[10vh]"}></div>
            <div className={"scroll-container"}>
                <div className={"scroll-text"}>
                    {data.map((item) => (
                        <StaggeredText key={item.id} className="point-font" speed="fast" size="small" text= {item.text} />
                    ))}
                    <Game/>
                </div>

            </div>

        </div>
    )
}