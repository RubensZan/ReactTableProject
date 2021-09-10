//Imports
import React, { Component } from 'react';
import { UAParser } from 'ua-parser-js';
import CustomTable from './components/customTable';
import ModalCar from './components/carModal';
import CustomAlerts from './components/customAlerts';
// import data from './user/users.js';
// import job from './user/users_job.js';
// import address from './user/users_address.js';
// import cars from './user/users_cars.js';
// import access from './user/users_access.js';
// import products from './user/users_products_buyed.js';
import OnLoadPage from './components/onLoadPage';
import OnErrorPage from './components/onErrorPage';



class ContainerTable extends Component {
  constructor(props) {
    super(props);

    // States
    this.state = {
      carsArrows: false, 
      isLoaded: false,
      error: null,
      usersData: null,
      usersAccessData: null, 
      productsData: null,
      productsConsumersData: null, 
      showModalCar: null,
      usersCarsData: null, 
      allUsers: this.myUserList,
      showCustomAlert: false,
      userTablefieldListConfig: {
        "Acesso": [
          { label: "Rede", fieldKey: "user_access_business_technoloy" },
          { label: "Login", fieldKey: "user_access_login" },
          { label: "SO", fieldKey: "user_access_user_agent" },
          { label: "IP", fieldKey: "user_access_ip_address" }
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
      ],
      productTableCollumns: [
        { headerName: "Produto", collumnValue: "product_name", type: "text" },
        { headerName: "Companhia", collumnValue: "company_name", type: "text" },
        { headerName: "Material", collumnValue: "material", type: "text" },
        { headerName: "Departamento", collumnValue: "buyed_commerce_department", type: "text" },
        { headerName: "Preço", collumnValue: "price", type: "text" }
      ]
    };


    // Binds
    this.setUsersChanges = this.setUsersChanges.bind(this)
    this.showModal = this.showModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.showAlert = this.showAlert.bind(this)
    this.mountExtendedProductTable = this.mountExtendedProductTable.bind(this);
    this.mountExtendedUserTable = this.mountExtendedUserTable.bind(this);
    this.getJobsTitles = this.getJobsTitles.bind(this);
    this.getSalary = this.getSalary.bind(this);
    this.getJobAddress = this.getJobAddress.bind(this);
    this.getAccessLogin = this.getAccessLogin.bind(this);

  };

  //Functions
  componentDidMount() {
    Promise.all([
      fetch("http://localhost:3010/users/list").then(res => res.json()),
      fetch("http://localhost:3010/products/list").then(res => res.json()),
      fetch("http://localhost:3010/users/cars").then(res => res.json()),
      fetch("http://localhost:3010/products/consumers").then(res => res.json()),
      fetch("http://localhost:3010/users/access").then(res => res.json()),
    ]).then(([usersData, productsData, usersCarsData, consumersData, usersAccessData]) => {
      this.setState({
        usersData: usersData,
        productsData: productsData,
        usersCarsData: usersCarsData, 
        productsConsumersData: consumersData,
        usersAccessData: usersAccessData,
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

  // map the jobs array and return the job(s) title(s)
  getJobsTitles(row){
    // console.log(row);
    let allJobsTitles = []; 
    let jobs = row.jobs; 
    for (let i = 0; i < jobs.length; i++){
      let job = jobs[i];
      if (job.jobTitle)
        allJobsTitles += job.jobTitle + " | "; 
    }
    if (typeof allJobsTitles === "string")
      allJobsTitles = allJobsTitles.substring(0, allJobsTitles.length - 3); 
    return allJobsTitles; 
  }
  /**
  * @function- getSalary
  * @param{array} - row from the user that contains the jobs data 
  * @returns array containing the job salary data 
  */
  getSalary(row){
    let allJobsSalary = []; 
    let jobs = row.jobs; 
    for (let i = 0; i < jobs.length; i++){
      let job = jobs[i]; 
      if (job.salary)
        allJobsSalary += job.salary + " | "; 
    }
    if (typeof allJobsSalary === "string")
      allJobsSalary = allJobsSalary.substring(0, allJobsSalary.length - 3); 
    return allJobsSalary;
  }

  getJobAddress(row){
    let allJobsAddress = []; 
    let jobs = row.jobs; 
    for (let i = 0; i < jobs.length; i++){
      let job = jobs[i]; 
      if (job.address)
      allJobsAddress += job.address + " | "; 
    }
    if (typeof allJobsAddress === "string")
      allJobsAddress = allJobsAddress.substring(0, allJobsAddress.length - 3); 
    return allJobsAddress;
  }

  getAccessLogin(row){

  }

  // receiving user id
  showModal(dataId, currentCar) {
    console.log("DATA ID : ", dataId);
    // console.log("car from user",this.state.usersCarsData[dataId]);
    let carObject = this.state.usersCarsData[dataId]; 
    console.log("CAR OBJ",carObject);
    // if exist a first car
    if (carObject[0].carName){

      if (carObject.length < 2)
        this.setState({
          showModalCar: carObject[0],
          carsArrows: false 
        })
      else
        this.setState({
          showModalCar: carObject[currentCar],
          carsArrows: true 
        }) 
    }
    else 
      console.log("NO CAR!!!");
      
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

  // Function that will mount the expanded table when called 
  mountExtendedProductTable(productId) {
    // let consumer = this.consumerControll[productId] || {};
    let consumer = this.state.productsConsumersData[productId] || {}; 
    console.log("CONSUMERS",consumer);
    if (consumer[0].userName)
      return (
        <div style={{ border: "10px solid #cfc7ff" }}>
          <CustomTable
            expansible={false}
            key="ExtendedProductTable"
            tableName="ExtendedProductTable"
            tableCollumn={[
              { headerName: "Nomes", collumnValue: "userName", type: "text" },
              { headerName: "Data de Nascimento", collumnValue: "userBirthDate", type: "text" }
              // { headerName: "Trabalho", collumnValue: "currentJob", type: "text", valueFormatter: (currentJob) => currentJob.user_job_title },
              // { headerName: "Salario", collumnValue: "currentJob", type: "text", valueFormatter: (currentJob) => `${currentJob.user_job_salary_currency_symbol} ${currentJob.user_job_salary}` },
              // { headerName: "Endereço", collumnValue: "currentAddress", type: "text", valueFormatter: (currentAddress) => currentAddress.user_address_city }
            ]}
            tableRowsValues={consumer}
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

  // Function that will mount the expanded table when called 
  mountExtendedUserTable(userId, rowId) {
    console.log("USERID:",userId,"ROWCLICKED",rowId);
    // Access
    if (rowId === 0)
      return (
      <div>
      </div>)
    // Address
    else if (rowId === 1)
      return (<div>"1"</div>)
    // Job
    else if (rowId === 2){
      // console.log(this.state.usersData[userId]);
      return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", margin: "0 2%"}}>
          <p> <strong>Profissão:</strong>{this.getJobsTitles(this.state.usersData[userId])} </p>
          <p> <strong>Salário:</strong>{this.getSalary(this.state.usersData[userId])} </p>
          <p> <strong>Endereço:</strong>{this.getJobAddress(this.state.usersData[userId])} </p>
      </div>)}
    // Product Buyed
    else if (rowId === 3)
      return (<div>"3"</div>)
  };


  render() {
    console.log("user data", this.state.usersData);
    console.log("products data", this.state.productsData);
    console.log("users cars data", this.state.usersCarsData);
    console.log("products consumers", this.state.productsConsumersData);
    console.log(" access data", this.state.usersAccessData);
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
                  carObject={
                    this.state.showModalCar
                  }
                  closeHandler={
                    this.closeModal
                  }
                  saveChanges={
                    this.setUsersChanges
                  }
                  carsArrows = {
                    this.state.carsArrows
                  }
                />
                :
                null
              }


              <div style={{ height: "50vh", overflowY: "scroll" }}>
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
                    { headerName: "Profissão", collumnValue: "jobs", type: "text",valueFormatter: this.getJobsTitles },
                    { headerName: "Salário", collumnValue: "jobs", type: "text",valueFormatter: this.getSalary },
                    { headerName: "Carro",collumnValue: "carName",type: "button",handleClick: this.showModal}


                    // {headerName: "Trabalho",collumnValue: "currentJob", type: "text",valueFormatter: (currentJob)=> currentJob.user_job_title},
                    // {headerName: "Salario",collumnValue: "currentJob",type: "text",valueFormatter: (currentJob)=>`${currentJob.user_job_salary_currency_symbol} ${currentJob.user_job_salary}`},
                    // {headerName: "Endereço",collumnValue: "currentAddress",type: "text",valueFormatter: (currentAddress)=> currentAddress.user_address_city},
                    // {headerName: "Carro",collumnValue: "currentCar",type: "button",handleClick: this.showModal}
                  ]}
                  tableRowsValues={this.state.usersData}
                  fieldList={
                    this.state.userTablefieldListConfig
                  }
                  fieldValues={{ "Acesso": 0, "Endereço": 1, "Emprego": 2, "Produto Comprado": 3}}
                  expandedType="lines"
                  mountExpanded={this.mountExtendedUserTable}
                />
              </div>
              <div style={{ height: "50vh", overflowY: "scroll" }}>
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
              </div>
            </div> :
            <OnErrorPage />
          :
          <div style={{ height: "100vh" }}>

            <div style={{ height: "50vh", overflowY: "scroll" }}>
              <h1 style={{ display: "flex", justifyContent: "center", width: "100%", backgroundColor: "#8570fa", margin: "0 0", color: "#fff" }}>
                Tabela de Usuários
              </h1>
              <OnLoadPage />
            </div>
            <div style={{ height: "50vh", overflowY: "scroll" }}>
              <h1 style={{ display: "flex", justifyContent: "center", width: "100%", backgroundColor: "#8570fa", margin: "0 0", color: "#fff" }}>
                Tabela de Produtos
              </h1>
              <OnLoadPage />
            </div>
          </div>
        }
      </>
    )
  };
}

export default ContainerTable;
