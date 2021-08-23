
import React, {useState } from 'react';

import ExtendedTableRow from '../extendedTableRow';

/**
 * @file module:src/components/tableRow/index.jsx  
 * @param {number} props.index - Is the index of the line in the table
 * @param {array of components} props.children - will be each line table content passed from app.js   
 * @param {number} props.id - Is the index of the element in the user data array  
 * @param {array of data}  props.userData - Is the data from all users in the table
 * @returns the lines from the table, and in case of click 
 */
export default function TableRow(props) {
    const [extend, setExtendTable] = useState(false);

    /**
     * @function module:src/components/tableRow/tableRow~extendtable
     * @summary - when the line is clicked, alternate the state of the extended line
     * @returns - set the line extended state as it´s contrary 
     */
    function extendtable() {
        setExtendTable(!extend);
    }

    
    return (
        <>
            <tr 
                onClick={() => extendtable()} 
                style={
                    { backgroundColor: props.index % 2 === 0 ? 
                        "#cfcfcf" : "#fafffb", fontSize: "12px" }
                    }>
                {props.children}
            </tr>
            {extend ?
                    <tr>
                        <td style={{backgroundColor:"#f76060"}} colSpan="100%">
                            <ExtendedTableRow
                                id={props.id}
                                index={props.index}
                                thisUserData= {props.userData}
                                fieldList = {props.fieldList}
                                fieldValues = {props.fieldValues}
                                expandedType = {props.expandedType}
                            />
                        </td>
                    </tr>
                :
                null
            }
        </>
    )
};