import React from 'react';
import logo from '../../assets/loading-buffering.gif'
/**
 * @file module:src/components/onLoadPage/index.jsx
 * @returns an on load page
 */
export default function OnLoadPage(props){
    return (
        <div style={{height: "100%", width: "100%", display: "flex",flexDirection: "column",alignItems: "center",alignContent: "center"}}>
            
            <h1 style={{textDecoration: "bold"}}> 
                LOADING
            </h1>
            <img src={logo} alt="loading..." />

        </div>
    )
} ;