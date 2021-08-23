import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp,faArrowRight} from '@fortawesome/free-solid-svg-icons'; 
import ExpandedRowContent from '../expandedRowContent';
import CustomTable from '../customTable';

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

    function getExpandibleBoxes(){
        let titles = Object.keys(props.fieldList); 
        let fieldList = Object.values(props.fieldList);
        let fieldValues = Object.values(props.fieldValues);
        return(
            titles.map((title,index)=>{
                    return (
                        <div key={"BoxWrapper",title} style={style.boxWrapper}>
                            <h1 style={style.extendedLineTitle}>{title}</h1>
                            <button onClick={()=>handleClick(index)} style={style.boxButton}>
                                { (boxColapsed === index) ? 
                                    <FontAwesomeIcon icon={faArrowUp} id={props.index}  style={{fontSize:"30px",color:"#363636"}}/> 
                                    : 
                                    <FontAwesomeIcon icon={faArrowRight} id={props.index} style={{fontSize:"30px",color:"#363636"}}/>
                                }
                            </button>
                            { props.expandedType === "lines" ? 
                                (boxColapsed === index) ? 
                                    <ExpandedRowContent
                                        key= {"ExpandedRowContent",index}
                                        fieldList = {fieldList[index]}
                                        fieldValues = {props.thisUserData[fieldValues[index]]}
                                    />
                                    :
                                    null
                                
                                :   (boxColapsed === index) ? 
                                
                                    <CustomTable
                                        expansible = {false}
                                        tableCollumn = {[
                                            {headerName: "Nome",collumnValue: "user_product_buyed_product_name" },
                                            {headerName: "Sobrenome",collumnValue: "user_product_buyed_company_name"},
                                            {headerName: "Companhia",collumnValue: "user_product_buyed_product_material"},
                                            {headerName: "Cidade",collumnValue: "user_product_buyed_commerce_department"}
                                        ]}
                                        tableRowsValues = {Object.values(props.thisUserData)}
                                    />
                                    :
                                    null
                            }
                        </div>
                    );    
                })
        )
        
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
        backgroundColor: "#ffa3a3"
    },
    extendedLineTitle:{
        display: "flex",
        textAlign: "center",
        justifyContent: "center", 
        fontSize : "18px",
        color: "#000000",
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
