import React, { Component } from 'react';
import { ControlButton, ViewModal } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faBan } from '@fortawesome/free-solid-svg-icons';
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
    constructor(props) {
        super(props);
        // console.log(window.innerWidth);
        // setting the quantity of rows in the page in relation with the vw
        const pageRows =
            window.innerWidth > 1200 ?
                30
                : window.innerWidth > 1000 ?
                    18 :
                    10;
        // console.log(pageRows);
        const totalRows = this.props.tableRowsValues.length;
        const totalPages = Math.ceil(totalRows / pageRows);
        //states
        this.state = {
            pageIndex: 1,
            firstRow: 0,
            canForward: totalPages > 1 ? true : false,
            canPrevious: false,
            rowsPerPage: pageRows,
            totalRows: totalRows,
            totalPages: totalPages,
            selectedOption: 1,
            currentCar: 0
        }

        // binds
        this.goForward = this.goForward.bind(this)
        this.goPrevious = this.goPrevious.bind(this)
        this.gettabledatas = this.gettabledatas.bind(this)
        this.getOptions = this.getOptions.bind(this)
        this.mountCollumnsData = this.mountCollumnsData.bind(this)
        this.setChangedSelect = this.setChangedSelect.bind(this)

        // console.log("WINDOW INNER HEIGHT",window.innerHeight);
    };

    goForward() {
        // is the last page
        if (this.state.pageIndex === this.state.totalPages) {
            // alert("CAN??T GO FORWARD");
            return;
        }

        // is the penultimate
        if (this.state.pageIndex === this.state.totalPages - 1) {
            this.setState({
                canPrevious: true,
                canForward: false,
                pageIndex: this.state.pageIndex + 1,
                firstRow: this.state.firstRow + this.state.rowsPerPage

            });
            return;
        }

        this.setState({
            canPrevious: true,
            canForward: true,
            pageIndex: this.state.pageIndex + 1,
            firstRow: this.state.firstRow + this.state.rowsPerPage

        });
    };

    goPrevious() {
        //First page
        if (this.state.pageIndex === 1) {
            return;
        }

        //Second page
        if (this.state.pageIndex === 2) {
            this.setState({
                canForward: true,
                canPrevious: false,
                pageIndex: this.state.pageIndex - 1,
                firstRow: this.state.firstRow - this.state.rowsPerPage
            });
            return;
        }

        this.setState({
            canForward: true,
            canPrevious: true,
            pageIndex: this.state.pageIndex - 1,
            firstRow: this.state.firstRow - this.state.rowsPerPage

        });

    };

    mountCollumnsData(collumn, row, i) {
        let value = row[collumn.collumnValue];
        if (collumn.valueFormatter && typeof collumn.valueFormatter === "function")
            value = collumn.valueFormatter(row, collumn.fieldName, collumn.fieldKey);
        if (collumn.type === "text")
            return (
                <td key={"CollumnsKey:" + row + value}>
                    {value}
                </td>
            )

        else if (collumn.type === "button"){
            // console.log("VALUE",value);    
            return (
                <td key={"CollumnsButtonKey:" + row + value}
                    onClick={(event) => event.stopPropagation()}
                >
                    <ViewModal able={value ? true : false} onClick={() => collumn.handleClick(row.userId, this.state.currentCar)}>Visualizar</ViewModal>
                </td>
            )}

        else if (collumn.type === "icon")
            return (
                <td key={"CollumnsButtonKey:" + row + value}
                    style={{ position: "relative" }}
                >
                    {(i % 2 === 0) && (i % 3 === 0) ?
                        <FontAwesomeIcon icon={faBan} style={{
                            fontSize: "18px", position: "absolute",
                            top: "50%", left: "50%", transform: "translate(-50%, -50%)"
                        }} />
                        :
                        <FontAwesomeIcon icon={faCheckCircle} style={{
                            fontSize: "18px", position: "absolute",
                            top: "50%", left: "50%", transform: "translate(-50%, -50%)"
                        }} />
                    }
                </td>
            )
        else return null
    };

    gettabledatas() {
        // not altering it's data
        let rows = (Array.isArray(this.props.tableRowsValues) ? this.props.tableRowsValues : Object.values(this.props.tableRowsValues));
        let collumns = (Array.isArray(this.props.tableCollumn) ? this.props.tableCollumn : Object.values(this.props.tableCollumn));
        let windowRows = [];
        for (let i = this.state.firstRow; i < this.state.firstRow + this.state.rowsPerPage && i < this.state.totalRows; i++) {
            if (rows[i]) {
                let row = rows[i];
                windowRows.push(
                    <TableRow
                        lineIndex={i}
                        mountExpanded={this.props.mountExpanded ? this.props.mountExpanded : "NOT DEFINED"}
                        expansible={this.props.expansible}
                        key={this.props.tableName + "RowKey:" + i}
                        index={row.userId ? row.userId : row.productId}
                        userData={row}
                        fieldList={this.props.fieldList}
                        fieldValues={this.props.fieldValues}
                        expandedType={this.props.expandedType}
                    >
                        {collumns.map((collumn, j) => {
                            return this.mountCollumnsData(collumn, row, i);
                        })}
                    </TableRow>
                )
            }
        }

        return windowRows;
    };

    getHeader() {
        let headerTitles = (Array.isArray(this.props.tableCollumn) ? this.props.tableCollumn : Object.values(this.props.tableCollumn));
        return (
            headerTitles.map((headerTitle, i) => {
                return (
                    <th key={"TableHeaderKey:" + headerTitles.headerName + i}>
                        {headerTitle.headerName}
                    </th>
                )
            })
        )
    };

    getOptions() {
        // let options = [<option onChange={this.setChangedSelect} selected key={"SelectOption"+this.state.pageIndex}>{this.state.pageIndex}</option>];
        let options = [];
        for (let index = 1; index <= this.state.totalPages; index++) {
            options.push(<option key={"SelectOption:" + index}>{index}</option>);
        }
        return options;
    };

    setChangedSelect(event) {
        let newIndex = Number(event.target.value);
        // console.log("NOVO INDEX",newIndex);
        this.setState({
            pageIndex: newIndex,
            firstRow: (newIndex - 1) * this.state.rowsPerPage,
            canForward: newIndex === this.state.totalPages ? false : true,
            canPrevious: newIndex === 2 || newIndex === 1 ? false : true
        });
    };

    render() {
        return (
            <>
                <div style={{ backgroundColor: "rgb(133 112 250)", width: "100%" }}>
                    <ControlButton able={this.state.canPrevious} onClick={this.goPrevious}> &lt;&lt; </ControlButton>
                    <ControlButton able={this.state.canForward} onClick={this.goForward}>  &gt;&gt; </ControlButton>
                    <select onChange={this.setChangedSelect} value={this.state.pageIndex}>
                        {this.getOptions()}
                    </select>
                </div>
                <table style={{ width: "100%", textAlign: "center", borderCollapse: "collapse" }}>
                    <thead style={{ backgroundColor: "#8570fa" }}>
                        <tr>
                            {this.getHeader()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.gettabledatas()}
                    </tbody>
                </table>
            </>
        )
    }
};

export default CustomTable;


