import React from 'react';

/**
 * @file module:src/components/expandedRowContent/index.jsx
 * @param {boolean} props.fieldValues - the fieldValues from the user fields in the expanded row 
 * @param {array} props.fieldList - The array containing the fieldLabel and the fieldKey, to access the fieldValue
 * @returns customized input
 */
export default function ExpandedRowContent(props){
    console.log("PROPS PASSADAS",props);

    /**
     * @summary Function to mount the fieldList, with the fieldKeys
     * @returns the content of the expanded row 
     */
    function mountFieldList(){
        let fieldValues = props.fieldValues;
        console.log("FV EH :",fieldValues);
        return (
            props.fieldList.map((field, i) =>
            {return ( 
                <div key={"extendedTableRow:"+i}>
                    <p style={style.extendedTableRowText}>
                        <strong>{field.label}: </strong>
                        {fieldValues[field.fieldKey]}
                    </p>
                </div>
            )})
    )};

    return (
        <div style={style.container}>
            {mountFieldList()}
        </div>
    )
};

const style = {
    container: {
        width: "100%",
        flexDirection: "row"
    },
    extendedTableRowText: {
        fontFamily: "sanserif",
        fontSize: "18px"
    }
};