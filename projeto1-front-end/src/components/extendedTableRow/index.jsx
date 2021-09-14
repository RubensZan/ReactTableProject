import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp,faArrowRight} from '@fortawesome/free-solid-svg-icons'; 

/**
 * @file module:src/components/extendedTableRow/index.jsx  
 * @param {array} props.thisUserData - Array containing data from the user __currentAccess, currentAddress, currentJob, productsBuyed__
 * @param {array} props.fieldList - Array containing the list of boxes that can be expanded
 * @param {array} props.fieldValues - Array containing keys to access values from thisUserData
 * @param {string} props.expandedType - String containing the type of the box when expanded
 * @returns - extended row, when click in the button will show the content of the field name clicked 
 */
export default function ExtendedTableRow(props){  
    const [boxColapsed, setBoxColapsed] = useState(null); 
    /**
     * @function module:src/components/extendedTableRow/extendedTableRow~handleClick
     * @summary - when the button is clicked, open only the clicked field in the device window 
     * @param {number} newIndex - When a box is clicked, the index of it´s box will be passed      
     */
    function handleClick(newIndex) {
        let currentIndex = boxColapsed; 
        if (newIndex !== currentIndex)
            currentIndex = newIndex; 
        else
            currentIndex = null; 
        setBoxColapsed(currentIndex);
    }
    useEffect(()=>{
    },[boxColapsed])
 /**
     * @function module:src/components/extendedTableRow/extendedTableRow~getExpandibleBoxes
     * @summary - get the expandible box(es) according to the expanded type
     * @return expansible boxes of expanded row
     */
    function getExpandibleBoxes(){
        // not altering its values 
        // the keys of the fieldlist are the titles from the box(es)
        let titles;      
        if (props.expansible && props.expandedType === "lines" ){
            titles = Object.keys(props.fieldList); 
            return(
                titles.map((title,field)=>{
                        return (
                            <div key={"BoxWrapper"+title} style={style.boxWrapper}>
                                <h1 style={style.extendedLineTitle}>{title}</h1>
                                <button onClick={()=>handleClick(field)} style={style.boxButton}>
                                    { (boxColapsed === field) ? 
                                        <FontAwesomeIcon icon={faArrowUp} id={props.index}  style={{fontSize:"30px",color:"#363636"}}/> 
                                        : 
                                        <FontAwesomeIcon icon={faArrowRight} id={props.index} style={{fontSize:"30px",color:"#363636"}}/>
                                    }
                                </button>
                                {(boxColapsed === field && typeof props.mountExpanded === "function") ?
                                        props.mountExpanded(props.index, field)
                                    :
                                    null
                                }
                            </div>
                        );    
                    })
                )}

                else if (typeof props.mountExpanded === "function")
                    return props.mountExpanded(props.index)
    };
    
    return (   
        <div id="container" style={style.container}>
            {getExpandibleBoxes()}
        </div>
    )
}


const style = {
    container: {
        width: "100%",
        height: "100%",
        flexDirection: "row"
    },
    boxWrapper:{
        position: "relative",
        backgroundColor: "#8570fa"
    },
    extendedLineTitle:{
        display: "flex",
        textAlign: "center",
        justifyContent: "center", 
        fontSize : "18px",
        color: "#fff",
        padding: "16px 0"
    },
    boxButton:{
        border: "none",
        textDecoration: "none",
        cursor: "pointer",
        borderRadius: "50%",
        position: "absolute",
        left: "10px",
        top: "8px"
    }
};
