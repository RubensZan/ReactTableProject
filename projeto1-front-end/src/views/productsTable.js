//Imports
import React, { Component } from 'react';
import { UAParser } from 'ua-parser-js';
import CustomTable from '../components/customTable';
import CustomAlerts from '../components/customAlerts';
import OnLoadPage from '../components/onLoadPage';
import OnErrorPage from '../components/onErrorPage';


class ProductsTable extends Component {
  constructor(props) {
    super(props);

    // States
    this.state = {
      isLoaded: false,
      error: null,
      usersData: null,
      productsData: null,
      showCustomAlert: false,
      productTableCollumns: [
        { headerName: "Produto", collumnValue: "productName", type: "text" },
        { headerName: "Companhia", collumnValue: "companyName", type: "text" },
        { headerName: "Material", collumnValue: "material", type: "text" },
        { headerName: "Departamento", collumnValue: "buyedCommerceDepartment", type: "text" },
        { headerName: "Preço", collumnValue: "price", type: "text" }
      ]
    };


    // Binds
    this.showAlert = this.showAlert.bind(this)
    this.mountExtendedProductTable = this.mountExtendedProductTable.bind(this);
    this.getCollumnFormattedData = this.getCollumnFormattedData.bind(this);

  };

  componentDidMount() {
    Promise.all([
      fetch("http://localhost:3010/listUsersAndProducts").then(res => res.json())
    ]).then(([data]) => {
      this.setState({
        productsData: data.productsData,
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

  /**
   * @function mountExtendedProductTable
   * @summary function that will mount the table with the consumer from the product clicked table
   * @param {integer} productId - id from the row clicked
   * @returns 
   */
  mountExtendedProductTable(productId) {
    // let consumer = this.consumerControll[productId] || {};
    let consumers = this.state.productsData[productId].consumers;
    if (consumers && consumers[0].consumerName)
      return (
        <div style={{ border: "10px solid #cfc7ff" }}>
          <CustomTable
            expansible={false}
            key="ExtendedProductTable"
            tableName="ExtendedProductTable"
            tableCollumn={[
              { headerName: "Nomes", collumnValue: "consumerName", type: "text" },
              { headerName: "Data de Nascimento", collumnValue: "consumerBirthDate", type: "text" }
            ]}
            tableRowsValues={consumers}
          />
        </div>
      )
    return (
      <div style={{ border: "10px solid #cfc7ff" }}>
        <h2 style={{ fontSize: "20px", color: "#fff", display: "flex", textAlign: "center", justifyContent: "center", fontWeight: "bold" }}>
          Sem consumidores!
        </h2>
      </div>
    )
  };

  render() {
    console.log("products data", this.state.productsData);
    return (
      <>

        {this.state.isLoaded ?
          !this.state.error ?
              <div style={{ height: "100vh" }}>
                <h1 style={{ display: "flex", justifyContent: "center", width: "100%", backgroundColor: "#8570fa", margin: "0 0", color: "#fff" }}>
                  Tabela de Produtos
                </h1>
                <CustomTable
                  expansible={true}
                  key="ProductTable"
                  tableName="productTable"
                  tableCollumn={this.state.productTableCollumns}
                  tableRowsValues={this.state.productsData}
                  expandedType="table"
                  mountExpanded={this.mountExtendedProductTable}
                />
              </div>:
            <OnErrorPage />
          :
          <div style={{ height: "100vh"}}>
            <h1 style={{ display: "flex", justifyContent: "center", width: "100%", backgroundColor: "#8570fa", margin: "0 0", color: "#fff" }}>
              Tabela de Produtos
            </h1>
            <OnLoadPage />
          </div>
        }
      </>
    )
  };
}

export default ProductsTable;