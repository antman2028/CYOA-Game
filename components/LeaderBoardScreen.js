import StaggeredText from "@/components/StaggeredText";
import {motion} from "framer-motion";

export default function LeaderBoardScreen() {
    return (
        <div className={"flex items-center justify-center bg-gray-600 rounded-md leaderboard flex-col"}>
            <StaggeredText  size="large" text="Top Scores"/>
            <div className={"flex p-4 min-w-full flex-col"}>
                <h1>hello</h1>
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
                <h1>hello</h1>
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
        </div>
    )
}