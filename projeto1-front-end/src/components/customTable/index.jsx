import React, { Component, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faBan} from '@fortawesome/free-solid-svg-icons'; 

import TableRow from '../tableRow';
import { faUserAlt, faUserAltSlash } from '@fortawesome/free-solid-svg-icons';
/**
 * @file module:src/components/table/index.jsx  
 * @param {number} props.index - Is the index of the line in the table
 * @returns the lines from the table, and in case of click 
 */


class CustomTable extends Component {
    constructor(props) {
        super(props);
    };
    gettabledatas() {
        let rows = (typeof this.props.tableRowsValues === "array" ? this.props.tableRowsValues : Object.values(this.props.tableRowsValues));
        let collumns = (typeof this.props.tableCollumn === "array" ? this.props.tableCollumn : Object.values(this.props.tableCollumn));
        console.log("COLUNAS",collumns);
        return (
            rows.map((row, i) => {
                return (
                    <TableRow
                    mountExpanded = {this.props.mountExpanded ? this.props.mountExpanded : "NOT DEFINED"} 
                    expansible = {this.props.expansible}
                    key={this.props.tableName+"RowKey:"+"->"+i}  
                    index={row.user_id ? row.user_id : row.user_product_buyed_id }  
                    userData={row} 
                    fieldList={this.props.fieldList}
                    fieldValues={this.props.fieldValues}
                    expandedType = {this.props.expandedType}
                    >
                        {collumns.map((collumn, j) => {
                            let value = row[collumn.collumnValue]; 
                            if (collumn.valueFormatter && typeof collumn.valueFormatter === "function")
                                value = collumn.valueFormatter(value,row);

                                if (collumn.type === "text")
                                    return (
                                        
                                        <td key={"CollumnsKey:"+row+value} 
                                        style={
                                                { backgroundColor: i % 2 === 0 ? "#ffffff" : "#c2c2c2", 
                                                paddingLeft: "2%", fontSize: "12px"}
                                            }>
                                            {value}
                                        </td>
                                    )
                                else if (collumn.type === "button")
                                            return(
                                                <td key={"CollumnsButtonKey:"+row+value} 
                                                    style={
                                                            { backgroundColor: i % 2 === 0 ? "#ffffff" : "#c2c2c2", 
                                                            paddingLeft: "2%", fontSize: "12px"}
                                                        }
                                                    onClick={(event)=>event.stopPropagation()}
                                                >   
                                                    <button onClick={()=>collumn.handleClick(value)}>Visualizar</button>
                                                </td>
                                            )

                                else if (collumn.type === "icon")
                                            return(
                                                <td key={"CollumnsButtonKey:"+row+value} 
                                                    style={
                                                            { backgroundColor: i % 2 === 0 ? "#ffffff" : "#c2c2c2", 
                                                            paddingLeft: "2%", fontSize: "12px"}
                                                        }
                                                >   {(i % 2 === 0) && (i % 3 === 0)? 
                                                    <FontAwesomeIcon icon={faBan}></FontAwesomeIcon>
                                                    :
                                                    <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
                                                    }
                                                    
                                                </td>
                                            )
                            }
                        )}
                    </TableRow>
                );
            })
        );
    };

    getHeader() {
        let headerTitles = (typeof this.props.tableCollumn === "array" ? this.props.tableCollumn : Object.values(this.props.tableCollumn));
        return (
            headerTitles.map((headerTitle,i) => {
                return (
                    <th key={"TableHeaderKey:"+headerTitles.headerName+i}>
                        {headerTitle.headerName}
                    </th>
                )
            })
        )
    };


    render() {
        return (
            <table style={{width: "100%",align: "center", borderCollapse: "collapse"}}>
                <thead style={{ backgroundColor: "#ff7070"}}>
                    <tr>
                        {this.getHeader()}
                    </tr>
                </thead>
                <tbody>
                    {this.gettabledatas()}
                </tbody>
            </table>
        )
    }

};

export default CustomTable;


