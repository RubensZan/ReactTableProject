import React, { Component, useState } from 'react';

// import CustomAlerts from './components/customAlerts';
import TableRow from '../tableRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
        let rows = this.props.tableRowsValues;
        let collumns = this.props.tableCollumn;
        
        return (
            rows.map((row, i) => {
                return (
                    <TableRow
                    expansible = {this.props.expansible}
                    key={this.props.tableName+"RowKey:"+"->"+i}  
                    index={i}  
                    userData={row} 
                    fieldList={this.props.fieldList}
                    fieldValues={this.props.fieldValues}
                    expandedType = {this.props.expandedType}
                    >
                        {collumns.map((collumn, j) => {
                            let value = row[collumn.collumnValue]; 
                            if (collumn.valueFormatter && typeof collumn.valueFormatter === "function")
                                value = collumn.valueFormatter(value,row);
                            return (
                                <td key={"Collumns key"+row+value} 
                                style={
                                        { backgroundColor: i % 2 === 0 ? "#ffffff" : "#c2c2c2", 
                                        paddingLeft: "2%", fontSize: "12px"}
                                    }>
                                    {value}
                                </td>
                            )}
                        )}
                    </TableRow>
                );
            })
        );
    };

    getHeader() {
        let headerTitles = this.props.tableCollumn;
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


