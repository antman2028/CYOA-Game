'use client';
import {useState} from 'react';

const ChoiceComponent = ({choices, selectionHandler}) => {
    const [disabled, setDisabled] = useState(false);

    const containerVariants = {
        visible: {
            transition: {
                hidden: {opacity: 0, y: 20},
                visible: {opacity: 1, y: 0}, // This creates the staggering effect
            },
        },
    };
    let nums = 0;

    return (
        <div>
            {choices && (
                <div className={"grid-container"}>
                    {choices.map((choice, index) => {
                        if (nums > 4) {
                            return;
                        } else {
                            nums++;
                        }
                        return (<button
                            key={index}
                            disabled={disabled}
                            className={"grid-item"}
                            onClick={() => {
                                console.log("Choice:", choice);
                                selectionHandler(choice);
                                setDisabled(true);
                            }}
                        >
                            {choice}
                        </button>)
                    })}
                </div>
            )}
        </div>
    );
};

export default ChoiceComponent;