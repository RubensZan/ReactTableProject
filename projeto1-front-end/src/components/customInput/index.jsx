import React from 'react';

/**
 * @file module:src/components/customInput/index.jsx
 * @param {boolean} props.readOnly - case the input info is read only
 * @param {string} props.labelName - The name of the label from the input
 * @param {input type} props.type - The type of the input 
 * @param {input value} props.value - The initial value of the input
 * @param {function} props.onChange - When the input value is altered this function will do something
 * @param {boolean} props.autoFocus - If the input is autofocus
 * @returns customized input
 */
export default function CustomInput(props){
    return (
        <div style={{display:"flex", margin:"30px 5%"}}>
            <label style={{
                    color:"#4f4f4f", 
                    fontSize:"20px",  
                    width: "40%"
                }}>{props && props.labelName ? props.labelName : "" }</label>
            <input  
                autoFocus={props.autoFocus}
                style={{
                    fontSize:"15px",
                    padding:"10px 10px",
                    display: "inline",
                    color: "black",
                    width: "60%",
                    height: "10px",
                    backgroundColor: props && props.readOnly ?   "#e0e0e0" :  "#ffffff"
                }}
                type={props && props.type ? props.type : "text"}
                value={props && props.value ? props.value : ""}
                onChange={props && props.onChange ? props.onChange : ""}
                disabled={props && props.readOnly ? true : false}
            /> 
        </div>
    )
} ;