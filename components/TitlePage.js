'use strict';
import {motion} from "framer-motion";
import {useState} from "react";
import StaggeredText from "@/components/StaggeredText";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";


export default function TitlePage({onGameStart}) {
    const [disappear, setDisappear] = useState(false);

    const eventHandler = () => {
        setDisappear(true);
        onGameStart();
    }

    return (
        <motion.div
            animate={{
                opacity: disappear ? 0 : 1,
                y: disappear ? 20 : 0,
                visibility: disappear ? "hidden" : "visible",
            }}
            transition={{duration: 0.5}}
        >
            <div className="bg-[#0d0d0d] z-11 flex items-center justify-center w-full h-screen ">
                <div className="fixed  z-1   flex justify-center items-center">
                    <div className="justify-items-stretch items-center">
                        <div className={"p-3"}>
                            <StaggeredText  size="large" text="Choose your own story"/>
                        </div>
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
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 1}}
                        >
                            <button className="home-button" onClick={eventHandler}>
                                Start
                                <span><KeyboardDoubleArrowRightIcon/></span>
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}