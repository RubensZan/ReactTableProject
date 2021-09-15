//Imports
import React, { Component } from 'react';
import CustomTable from '../components/customTable';
import CustomAlerts from '../components/customAlerts';
import OnLoadPage from '../components/onLoadPage';
import OnErrorPage from '../components/onErrorPage';

export default class HistoryTable extends Component {
    constructor(props) {
        super(props);

        // States
        this.state = {
            isLoaded: false,
            error: null,
            historyData: null,
            showCustomAlert: false,
            historyDataCollumns: [
                { headerName: "Ip", collumnValue: "userIp", type: "text" },
                { headerName: "User Agent", collumnValue: "userAgent", type: "text" },
                { headerName: "Data de inclusão", collumnValue: "inclusionDate", type: "text" },
                { headerName: "Página acessada", collumnValue: "accessPath", type: "text" }
            ]
        };


        // Binds
        this.showAlert = this.showAlert.bind(this)
        this.getCollumnFormattedData = this.getCollumnFormattedData.bind(this);

    };

    componentDidMount() {
        Promise.all([
            fetch("http://localhost:3010/listRequisitionHistory").then(res => res.json())
        ]).then(([data]) => {
            this.setState({
                historyData: data,
                isLoaded: true
            });
        }).catch(err => {
            console.log("ERRO!! ", err);
            this.setState({
                error: true,
                isLoaded: true
            });
        })
    };

    /**
     * @function getCollumnFormattedData
     * @summary this function will format the data in an row and return the data formatted
     * @param {Object} row - Object that contains the fieldvalues inside it
     * @param {string} fieldName - fieldName is object inside the row that will be traveled
     * @param {string} fieldKey - fieldKeys are the fields that are supposed to be returned 
     * @returns{string} the formatted data
     */
    getCollumnFormattedData(row, fieldName, fieldKey) {
        // console.log(row);
        let allDataReturn = [];
        let rowData = row[fieldName];
        for (let i = 0; i < rowData.length; i++) {
            let fieldValue = rowData[i];
            if (fieldValue[fieldKey])
                allDataReturn += fieldValue[fieldKey] + " | ";
        }
        if (typeof allDataReturn === "string")
            allDataReturn = allDataReturn.substring(0, allDataReturn.length - 3);
        return allDataReturn;
    }

    showAlert() {
        this.setState({
            showCustomAlert: true
        })
    };



    render() {
        console.log("history data", this.state.historyData);
        return (
            <>
                {this.state.isLoaded ?
                    !this.state.error ?
                        <div style={{ height: "100vh" }}>
                            <h1 style={{ display: "flex", justifyContent: "center", width: "100%", backgroundColor: "#8570fa", margin: "0 0", color: "#fff" }}>
                                Tabela de Histórico
                            </h1>
                            <CustomTable
                                expansible={true}
                                key="historyTable"
                                tableName="historyTable"
                                tableCollumn={this.state.historyDataCollumns}
                                tableRowsValues={this.state.historyData}
                                expandedType="table"
                                expansible={false}
                            />
                        </div> :
                        <OnErrorPage />
                    :
                    <div style={{ height: "100vh" }}>
                        <h1 style={{ display: "flex", justifyContent: "center", width: "100%", backgroundColor: "#8570fa", margin: "0 0", color: "#fff" }}>
                            Tabela de Histórico
                        </h1>
                        <OnLoadPage />
                    </div>
                }
            </>
        )
    };
}
