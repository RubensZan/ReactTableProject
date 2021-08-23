import React from 'react';

/**
 * @file module:src/components/customCloseButton/index.jsx
 * @param {function} props.handlecClick - The function that in case of click will do something
 * @param {color=} props.bgColor - The background color of the button
 * @returns customized circle button
 */
export default function CustomButton(props){
    return (
        <button style={{
                fontSize: "15px",
                backgroundColor: props && props.bgColor ? props.bgColor : "#ffabab",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                borderColor: "#ffff",
                position: "absolute",
                top: "0px",
                right: "-8px",
                color: "#525252"
            }}
            onClick={props && props.handleClick ? ()=>props.handleClick() : null }>
        </button>
    )
}
