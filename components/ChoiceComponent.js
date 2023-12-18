'use client';
import {useState} from 'react';
import {motion} from 'framer-motion';


const ChoiceComponent = ({choices, selectionHandler}) => {
    const [disabled, setDisabled] = useState(false);
    const [clickedButton, setClickedButton] = useState(null);

    let nums = 0;

    return (
        <div>
            {choices && (
                <div>
                    <div className={"mr-96"}></div>
                    <div className={"grid-container"}>
                        {choices.map((choice, index) => {
                            if (nums > 3) {
                                return;
                            } else {
                                nums++;
                            }
                            return (<motion.button

                                key={index}
                                disabled={disabled}
                                className={`grid-item ${disabled ? 'button-disabled' : ''} ${clickedButton === index ? 'button-highlighted' : ''}`}
                                onClick={() => {
                                    console.log("Choice:", choice);
                                    selectionHandler(choice);
                                    setDisabled(true);
                                    setClickedButton(index);
                                }}
                                initial={{y: 20}}
                                animate={{y: 0}}
                                transition={{duration: 0.5}}
                            >
                                <p className={"site-font-sm "}>{choice}</p>
                            </motion.button>)
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChoiceComponent;