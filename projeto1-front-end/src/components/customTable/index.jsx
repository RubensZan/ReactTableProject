import React, { Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faBan} from '@fortawesome/free-solid-svg-icons'; 
import TableRow from '../tableRow';
/**
 * @file module:src/components/table/index.jsx  
 * @param {Array} tableRowsValues - all values from the table rows
 * @param {Array} tableCollumn - all values from the table collumns 
 * @param {Array of objects} fieldList - array containing objects with the field titles and keys to acces fieldvalues  
 * @param {Array} fieldValues - fieldvalues are the objects to be accessed when line is expanded
 * @param {function} mountExpanded - function to extend the line when it is clicked
 * @param {string} tableName - Is the name of the table
 * @param {number} expandedType - The type of the expanded line when expanded
 * @param {boolean} expansible - If the table rows are expansible  
 * @returns table
 */
class CustomTable extends Component {
    constructor(props){
        super(props);

        let pageRows = 16; 
        let totalRows = this.props.tableRowsValues.length;
        let totalPages = Math.ceil(totalRows / pageRows);  
        this.state = {
            pageIndex: 1,
            canForward: true,
            canPrevious: false,
            rowsPerPage: 14,
            totalRows: totalRows,
            totalPages: totalPages
        }


    };
    gettabledatas() {
        console.log("TOTAL ROWS",this.state.totalRows);
        console.log("PAGINAS TOTAIS",this.state.totalPages);
        // not altering it's data
        let rows = (Array.isArray(this.props.tableRowsValues) ? this.props.tableRowsValues : Object.values(this.props.tableRowsValues));
        let collumns = (Array.isArray(this.props.tableCollumn) ? this.props.tableCollumn : Object.values(this.props.tableCollumn));
        return (
            rows.map((row, i) => {
                // let windowRows = (
                return (
                    i < ( this.state.rowsPerPage * this.state.pageIndex) ? 
                        <TableRow
                        lineIndex = {i}
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
                                            <td key={"CollumnsKey:"+row+value}>
                                                {value}
                                            </td>
                                        )

                                    else if (collumn.type === "button")
                                                return(
                                                    <td key={"CollumnsButtonKey:"+row+value} 
                                                        onClick={(event)=>event.stopPropagation()}
                                                    >   
                                                        <button onClick={()=>collumn.handleClick(value)}>Visualizar</button>
                                                    </td>
                                                )

                                    else if (collumn.type === "icon")
                                                return(
                                                    <td key={"CollumnsButtonKey:"+row+value} 
                                                        style={{position: "relative"}}
                                                    >   
                                                        {(i % 2 === 0) && (i % 3 === 0) ? 
                                                            <FontAwesomeIcon icon={faBan} style={{fontSize: "18px", position: "absolute",
                                                                top: "50%",left: "50%",transform: "translate(-50%, -50%)"
                                                            }}/>
                                                        :
                                                            <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: "18px",position: "absolute",
                                                                top: "50%",left: "50%",transform: "translate(-50%, -50%)"}}/>
                                                        }
                                                    </td>
                                                )
                                    else return null
                                }
                            )}
                        </TableRow>
                    : null
                )
            })
            
        );
    };

    getHeader() {
        let headerTitles = (Array.isArray(this.props.tableCollumn) ? this.props.tableCollumn : Object.values(this.props.tableCollumn));
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
            <table style={{width: "100%",textAlign: "center", borderCollapse: "collapse"}}>
                <thead style={{ backgroundColor: "#8570fa"}}>
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


