'use client';
import {motion} from 'framer-motion';

const StaggeredText = ({text, size, speed}) => {
    let sizeClass = size === 'large' ? 'site-font-home' : 'site-font-base';
    const speedClass = speed === 'fast' ? 0.02 : 0.05;
    if (size === 'small')
        sizeClass = 'site-font-sm'


    const characters = Array.from(text);

    const containerVariants = {
        visible: {
            transition: {
                staggerChildren: speedClass, // This creates the staggering effect
            },
        },
    };

    const childVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {opacity: 1, y: 0},
    };

    return (
        <motion.h1 className={`${sizeClass} glow`} variants={containerVariants} initial="hidden" animate="visible">
            {characters.map((char, index) => (
                <motion.span key={index} variants={childVariants}>
                    {char}
                </motion.span>
            ))}
        </motion.h1>
    );
};

export default StaggeredText;