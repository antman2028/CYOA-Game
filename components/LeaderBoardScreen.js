import StaggeredText from "@/components/StaggeredText";
import {motion} from "framer-motion";
import getLeaderboard from "@/utils/getLeaderboard";
import {useEffect, useState} from "react";
export default function LeaderBoardScreen() {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        getLeaderboard().then((res) => {
            setLeaderboard(res);
        }).catch((err) => {
            console.error("Error getting leaderboard:", err);
        })
    },[]);

    return (
        <div className={"flex items-center justify-center bg-gray-600 rounded-md leaderboard flex-col max-w-full"}>
            <StaggeredText  size="large" text="Top Scores"/>
            <div className={"flex p-4 min-w-full flex-col"}>
            {leaderboard.map((item, index) => {
                return (
                    <div key={index} className={"p-1"}>
                        <StaggeredText  size="medium" text={`${index + 1}. ${item.PlayerName} - ${item.Score}`}/>
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
                    </div>
                )
            })}
            </div>
        </div>
    )
}