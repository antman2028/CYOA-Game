'use client';
import {motion} from 'framer-motion';

const GameComponent = ({text}) => {

    return (
        <div>
            <motion.h2
                className={`${"site-font-base"} glow pr-2`}
                initial={{y: 20, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 0.5}}
            >
                {text}
            </motion.h2>
        </div>
    );
};

export default GameComponent;