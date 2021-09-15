//Imports
import React, { Component } from 'react';
import { UAParser } from 'ua-parser-js';
import CustomTable from '../components/customTable';
import ModalCar from '../components/carModal';
import CustomAlerts from '../components/customAlerts';
import OnLoadPage from '../components/onLoadPage';
import OnErrorPage from '../components/onErrorPage';

class UsersTable extends Component {
  constructor(props) {
    super(props);

    // States
    this.state = {
      carsArrows: false,
      isLoaded: false,
      error: null,
      usersData: null,
      showModalCar: null,
      showCustomAlert: false,
      userTablefieldListConfig: {
        "Acesso": [
          { label: "Rede", fieldKey: "businessTechnology" },
          { label: "Login", fieldKey: "userLogin" },
          { label: "SO", fieldKey: "userAgent" },
          { label: "IP", fieldKey: "ipAddress" }
        ],
        "Endereço": [
          { label: "País", fieldKey: "user_address_country" },
          { label: "Estado", fieldKey: "user_address_state" },
          { label: "Cidade", fieldKey: "user_address_city" },
          { label: "Rua", fieldKey: "user_address_street_name" },
          { label: "Endereço", fieldKey: "user_address_street_address" }
        ],
        "Emprego": [
          { label: "Emprego", fieldKey: "user_job_title" },
          { label: "Endereço do emprego", fieldKey: "user_job_address" }
        ],
        "Produto Comprado": [
          { label: "Empresa", fieldKey: "user_product_buyed_company_name" },
          { label: "Nome", fieldKey: "user_product_buyed_product_name" },
          { label: "Material", fieldKey: "user_product_buyed_product_material" },
          { label: "Descrição", fieldKey: "user_product_buyed_product_description" }
        ]
      },
      userTableCollumns: [
        { headerName: "Nomes", collumnValue: "user_first_name", type: "text" },
        { headerName: "Data de Nascimento", collumnValue: "user_birth_date", type: "text" },
        { headerName: "Genero", collumnValue: "user_gender", type: "text" },
        { headerName: "Trabalho", collumnValue: "currentJob", type: "text", valueFormatter: (currentJob) => currentJob.user_job_title },
        { headerName: "Salario", collumnValue: "currentJob", type: "text", valueFormatter: (currentJob) => `${currentJob.user_job_salary_currency_symbol} ${currentJob.user_job_salary}` },
        { headerName: "Endereço", collumnValue: "currentAddress", type: "text", valueFormatter: (currentAddress) => currentAddress.user_address_city },
        { headerName: "Carro", collumnValue: "currentCar", type: "button", handleClick: this.showModal },
        { headerName: "Status", collumnValue: "", type: "icon" }
      ]
    };


    // Binds
    this.setUsersChanges = this.setUsersChanges.bind(this)
    this.showModal = this.showModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.showAlert = this.showAlert.bind(this)
    this.mountExtendedUserTable = this.mountExtendedUserTable.bind(this);
    this.getCollumnFormattedData = this.getCollumnFormattedData.bind(this);

  };

  componentDidMount() {
    Promise.all([
      fetch("http://localhost:3010/listUsersAndProducts").then(res => res.json())
    ]).then(([data]) => {
      this.setState({
        usersData: data.usersData,
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
  setUsersChanges(carChanged) {
    const newList = this.state.allUsers;
    const search = (element) => element.user_id === carChanged.userID;
    let index = newList.findIndex(search);
    newList[index].currentCar = carChanged;
    this.setState({ allUsers: newList, showCustomAlert: true });
    setTimeout(() => {
      this.setState({ showCustomAlert: false });
    }, 5000)
    this.closeModal();
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

  // receiving user id
  showModal(dataId) {
    console.log("DATA ID : ", dataId);
    // console.log("car from user",this.state.usersCarsData[dataId]);
    let carObject = this.state.usersData[dataId].cars;
    console.log("CAR OBJ", carObject);
    // if exist a first car
    if (carObject[0].carName) {

      if (carObject.length < 2)
        this.setState({
          showModalCar: carObject,
          carsArrows: false
        })
      else
        this.setState({
          showModalCar: carObject,
          carsArrows: true
        })
    }
    else
      alert("User has no car!");

  };

  closeModal() {
    this.setState({
      showModalCar: null
    })
  };

  showAlert() {
    this.setState({
      showCustomAlert: true
    })
  };


  /**
   * @function mountExtendedUserTable
   * @summary function to mount the extended user table row when clicked in a box extended
   * @param {integer} userId - id from the user of the row clicked 
   * @param {integer} rowId  - id from the extended row clicked 
   * @returns{div} - div with the extended box clicked
   */
  mountExtendedUserTable(userId, rowId) {
    // Access
    if (rowId === 0) {
      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", margin: "0 2%" }}>
          <p> <strong>Login:</strong>{this.getCollumnFormattedData(this.state.usersData[userId], "access", "userLogin")} </p>
          <p> <strong>Bussiness Tech:</strong>{this.getCollumnFormattedData(this.state.usersData[userId], "access", "businessTechnology")} </p>
          <p> <strong>Ip:</strong>{this.getCollumnFormattedData(this.state.usersData[userId], "access", "ipAddress")} </p>
        </div>
      )
    }
    // Address
    else if (rowId === 1) {
      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", margin: "0 2%" }}>
          <p> <strong>Estado:</strong>{this.getCollumnFormattedData(this.state.usersData[userId], "address", "state")} </p>
          <p> <strong>Cidade:</strong>{this.getCollumnFormattedData(this.state.usersData[userId], "address", "city")} </p>
          <p> <strong>Endereço:</strong>{this.getCollumnFormattedData(this.state.usersData[userId], "address", "streetAddress")} </p>
        </div>
      )
    }
    // Job
    else if (rowId === 2) {
      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", margin: "0 2%" }}>
          <p> <strong>Cidade:</strong>{this.getCollumnFormattedData(this.state.usersData[userId], "jobs", "jobTitle")} </p>
          <p> <strong>Salário:</strong>{this.getCollumnFormattedData(this.state.usersData[userId], "jobs", "salary")} </p>
          <p> <strong>Endereço:</strong>{this.getCollumnFormattedData(this.state.usersData[userId], "jobs", "jobAddress")} </p>
        </div>
      )
    }
    // Product Buyed
    else if (rowId === 3) {
      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", margin: "0 2%" }}>
          <p> <strong>Produto:</strong>{this.getCollumnFormattedData(this.state.usersData[userId], "products", "productName")} </p>
          <p> <strong>Preço:</strong>{this.getCollumnFormattedData(this.state.usersData[userId], "products", "price")} </p>
          <p> <strong>Descrição:</strong>{this.getCollumnFormattedData(this.state.usersData[userId], "products", "description")} </p>
        </div>
      )
    }
  };


  render() {
    console.log("user data", this.state.usersData);
    return (
      <>

        {this.state.isLoaded ?
          !this.state.error ?
            <div style={{ height: "100vh" }}>
              {this.state.showCustomAlert ?
                <CustomAlerts
                  textAlert="Carro foi alterado com sucesso! "
                  successAlert={true}
                  alertObject={
                    this.state.showCustomAlert
                  }
                  showCustomAlert={
                    this.showAlert
                  }
                  closeTime={4000}
                />
                :
                null
              }
              {this.state.showModalCar ?
                <ModalCar
                  carsList={
                    this.state.showModalCar
                  }
                  closeHandler={
                    this.closeModal
                  }
                  saveChanges={
                    this.setUsersChanges
                  }
                  carsArrows={
                    this.state.carsArrows
                  }
                />
                :
                null
              }


              
                <h1 style={{ display: "flex", justifyContent: "center", width: "100%", backgroundColor: "#8570fa", margin: "0 0", color: "#fff" }}>
                  Tabela de Usuários
                </h1>
                <CustomTable
                  expansible={true}
                  key="UserTable"
                  tableName="userTable"
                  tableCollumn={[
                    { headerName: "Nomes", collumnValue: "userName", type: "text" },
                    { headerName: "Data de Nascimento", collumnValue: "userBirthDate", type: "text" },
                    { headerName: "Profissão", collumnValue: "jobs", type: "text", valueFormatter: this.getCollumnFormattedData, fieldName: "jobs", fieldKey: "jobTitle" },
                    { headerName: "Salário", collumnValue: "jobs", type: "text", valueFormatter: this.getCollumnFormattedData, fieldName: "jobs", fieldKey: "salary" },
                    { headerName: "Carro", collumnValue: "carName", type: "button", handleClick: this.showModal }


                    // {headerName: "Trabalho",collumnValue: "currentJob", type: "text",valueFormatter: (currentJob)=> currentJob.user_job_title},
                    // {headerName: "Salario",collumnValue: "currentJob",type: "text",valueFormatter: (currentJob)=>`${currentJob.user_job_salary_currency_symbol} ${currentJob.user_job_salary}`},
                    // {headerName: "Endereço",collumnValue: "currentAddress",type: "text",valueFormatter: (currentAddress)=> currentAddress.user_address_city},
                    // {headerName: "Carro",collumnValue: "currentCar",type: "button",handleClick: this.showModal}
                  ]}
                  tableRowsValues={this.state.usersData}
                  fieldList={
                    this.state.userTablefieldListConfig
                  }
                  fieldValues={{ "Acesso": 0, "Endereço": 1, "Emprego": 2, "Produto Comprado": 3 }}
                  expandedType="lines"
                  mountExpanded={this.mountExtendedUserTable}
                />
              
            </div> :
            <OnErrorPage />
          :
          <div style={{ height: "100vh" }}>
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

export default UsersTable;