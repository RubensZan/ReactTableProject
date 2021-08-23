import React, { useEffect, useState } from 'react';
import CustomCloseButton from '../customCloseButton';

/**
 * @file module:src/components/customAlerts/index.jsx
 * @param {string} props.textAlert - The message that will be showed 
 * @param {boolean} props.successAlert - case the alert is a success alert or a failure alert
 * @returns customized alert 
 */
export default function CustomAlerts(props){
    const [fade, setFadeEffect] = useState(false);
    
    useEffect(()=>
    {
        if (!fade) 
        {
            setFadeEffect(true); 
        }     
    });

    return (
        <div style= { fade ? style.mountedAlert : style.unmountedAlert} >
            <div style={{position: "relative"}}>
                <p style={{fontSize: "20px",marginLeft:"5%"}} >
                    {props && props.textAlert ? props.textAlert : "no message!"}
                </p>
                <CustomCloseButton
                    bgColor= { props && props.successAlert ? "#75eb95" :  "#fc8d8d"}
                />
            </div>     
        </div>
    )
} ;

const style = {
    unmountedAlert : {
        position:"fixed",
        width: "300px",
        height:"100px", 
        display: "flex",
        alignContent:"center",
        alignItems:"center",
        backgroundColor: "#fffbe3",
        top:"-250px",
        left:"-250px",
        transition: "all 0.5s"
    },
    mountedAlert: {
        position:"fixed",
        width: "300px",
        height:"100px", 
        display: "flex",
        alignContent:"center",
        alignItems:"center",
        backgroundColor: "#6ecc7e",
        top:"10px",
        left:"10px",
        transition: "all 0.5s"
    }, 

    failAlert: {
        position:"absolute",
        width: "300px",
        height:"100px", 
        display: "flex",
        alignContent:"center",
        alignItems:"center",
        backgroundColor: "#e32727"
    }
}