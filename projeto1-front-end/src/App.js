//Imports
import React,{Component} from 'react';
import {UAParser} from 'ua-parser-js'; 
import CustomTable from './components/customTable';
import ModalCar from './components/carModal';   
import CustomAlerts from './components/customAlerts';
import data from './user/users.js';
import job from './user/users_job.js';
import address from './user/users_address.js';
import cars from './user/users_cars.js';
import access from './user/users_access.js';
import products from './user/users_products_buyed.js';
import OnLoadPage from './components/onLoadPage';
import OnErrorPage from './components/onErrorPage';



class ContainerTable extends Component{
  constructor(props){ 
    super(props);
  
    // States
    this.state = {
      isLoaded: false, 
      error: null,
      usersData: null, 
      productsData: null, 
      showModalCar : null,
      allUsers : this.myUserList,
      showCustomAlert: false,
      userTablefieldListConfig: {
        "Acesso": [
          {label: "Rede",fieldKey: "user_access_business_technoloy"},
          {label: "Login",fieldKey: "user_access_login"},
          {label: "SO",fieldKey: "user_access_user_agent"},
          {label: "IP",fieldKey: "user_access_ip_address"}
        ],
        "Endereço" : [
          {label: "País",fieldKey: "user_address_country"},
          {label: "Estado",fieldKey: "user_address_state"},
          {label: "Cidade",fieldKey: "user_address_city"},
          {label: "Rua",fieldKey: "user_address_street_name"},
          {label: "Endereço",fieldKey: "user_address_street_address"}
        ],
        "Emprego": [
          {label: "Emprego",fieldKey: "user_job_title"},
          {label: "Endereço do emprego",fieldKey: "user_job_address"}
        ], 
        "Produto Comprado": [
          {label: "Empresa",fieldKey: "user_product_buyed_company_name"},
          {label: "Nome",fieldKey: "user_product_buyed_product_name"},
          {label: "Material",fieldKey: "user_product_buyed_product_material"},
          {label: "Descrição",fieldKey: "user_product_buyed_product_description"} 
        ]
      },
      userTableCollumns: [
        {headerName: "Nomes",collumnValue: "user_first_name", type: "text"},
        {headerName: "Data de Nascimento",collumnValue: "user_birth_date", type: "text"},
        {headerName: "Genero",collumnValue: "user_gender", type: "text"},
        {headerName: "Trabalho",collumnValue: "currentJob", type: "text",valueFormatter: (currentJob)=> currentJob.user_job_title},
        {headerName: "Salario",collumnValue: "currentJob",type: "text",valueFormatter: (currentJob)=>`${currentJob.user_job_salary_currency_symbol} ${currentJob.user_job_salary}`},
        {headerName: "Endereço",collumnValue: "currentAddress",type: "text",valueFormatter: (currentAddress)=> currentAddress.user_address_city},
        {headerName: "Carro",collumnValue: "currentCar",type: "button",handleClick: this.showModal},
        {headerName: "Status",collumnValue: "",type: "icon"}
      ],
      productTableCollumns: [
        {headerName: "Produto",collumnValue: "product_name", type: "text" },
        {headerName: "Companhia",collumnValue: "company_name", type: "text"},
        {headerName: "Material",collumnValue: "material", type: "text"},
        {headerName: "Departamento",collumnValue: "buyed_commerce_department", type: "text"},
        {headerName: "Preço",collumnValue: "price", type: "text"}
      ]
    }; 


    // Binds
    this.setUsersChanges = this.setUsersChanges.bind(this)
    this.showModal = this.showModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.showAlert = this.showAlert.bind(this)
    this.mountExtendedProductTable = this.mountExtendedProductTable.bind(this); 

  };

  //Functions
  componentDidMount(){
    Promise.all([
      fetch("http://localhost:3010/users/list").then(res => res.json()),
      fetch("http://localhost:3010/products/list").then(res => res.json())
    ]).then(([usersData,productsData])=>{
      this.setState({
        usersData: usersData,
        productsData: productsData,
        isLoaded: true
      });
    }).catch(err => {
          console.log("ERRO!! ",err);
          this.setState({
            error: true,
            isLoaded: true
          });
        })
  };

  setUsersChanges (carChanged){
    const newList = this.state.allUsers ;  
    const search = (element) =>  element.user_id === carChanged.userID; 
    let index = newList.findIndex(search);
    newList[index].currentCar = carChanged; 
    this.setState({allUsers: newList, showCustomAlert: true}); 
    setTimeout(()=>{
      this.setState({showCustomAlert: false}); 
    },5000) 
    this.closeModal();
  };

  showModal(carObject){
    console.log("SHOW MODAL : ",carObject);
    this.setState({
      showModalCar: carObject
      })
  };

  closeModal(){
    this.setState({
      showModalCar: null
    })
  };

  showAlert(){
    this.setState({
      showCustomAlert: true
    })
  };

  // Function that will mount the expanded table when called 
  mountExtendedProductTable(productId){
    let consumer = this.consumerControll[productId] || {};  
      if (consumer.length)
        return(
          <div style={{border: "10px solid #cfc7ff"}}>
            <CustomTable
                expansible = {false}
                key="ExtendedProductTable"
                tableName="ExtendedProductTable"
                tableCollumn = {[
                  {headerName: "Nomes",collumnValue: "user_first_name", type: "text"},
                  {headerName: "Data de Nascimento",collumnValue: "user_birth_date", type: "text"},
                  {headerName: "Trabalho",collumnValue: "currentJob",type: "text",valueFormatter: (currentJob)=> currentJob.user_job_title},
                  {headerName: "Salario",collumnValue: "currentJob",type: "text",valueFormatter: (currentJob)=>`${currentJob.user_job_salary_currency_symbol} ${currentJob.user_job_salary}`},
                  {headerName: "Endereço",collumnValue: "currentAddress",type: "text",valueFormatter: (currentAddress)=> currentAddress.user_address_city}
                ]}
                tableRowsValues = {consumer}
            />
          </div>
        )
      return(
        <div style={{border: "10px solid #cfc7ff"}}>
          <h2 style={{fontSize: "20px",color: "#fff",display: "flex", textAlign: "center", justifyContent: "center", fontWeight: "bold"}}>
            Sem consumidores!
          </h2>
        </div>
      )
  };

  mountFieldList(fieldValues, fieldList){
    
    console.log("FV EH :",fieldValues);
    return (
        fieldList.map((field, i) =>
          {return ( 
              <div key={"extendedTableRow:"+i}>
                  <p>
                      <strong>{field.label}: </strong>
                      {fieldValues[field.fieldKey]}
                  </p>
              </div>
          )}
        )
  )};
  
  // componentDidMount() {
  //   const intervalId = setInterval(() => {
  //     this.setState(prevState => {
  //       return {
  //         timer: prevState.timer + 1,
  //       };
  //     });
  //   }, 1000);
  // }

  
  render(){
    console.log("user data",this.state.usersData);
    console.log("products data",this.state.productsData);
    return ( 
      <>
      
      {this.state.isLoaded ? 
        !this.state.error? 
        <div style={{height: "100vh"}}>
          {this.state.showCustomAlert ?
            <CustomAlerts
              textAlert= "Carro foi alterado com sucesso! "
              successAlert = {true}
              alertObject ={
                this.state.showCustomAlert
              }
              showCustomAlert = {
                this.showAlert
              }
              closeTime = {4000}
            /> 
            :
            null
          } 
          {this.state.showModalCar ?
              <ModalCar 
                carObject={
                  this.state.showModalCar
                }
                closeHandler = {
                  this.closeModal
                } 
                saveChanges = {
                  this.setUsersChanges
                }
              />
              : 
              null
            }

            
            <div style={{height: "50vh", overflowY: "scroll"}}>
                <h1 style={{display: "flex", justifyContent: "center",width: "100%", backgroundColor: "#8570fa", margin: "0 0",color: "#fff"}}>
                  Tabela de Usuários
                </h1>
              <CustomTable
                expansible = {true}
                key="UserTable"
                tableName="userTable"
                tableCollumn = {[
                  {headerName: "Nomes",collumnValue: "userName", type: "text"},
                  {headerName: "Data de Nascimento",collumnValue: "userBirthDate", type: "text"},
                  {headerName: "Profissão",collumnValue: "jobTitle", type: "text"},
                  {headerName: "Salário",collumnValue: "salary", type: "text"},

                  // {headerName: "Trabalho",collumnValue: "currentJob", type: "text",valueFormatter: (currentJob)=> currentJob.user_job_title},
                  // {headerName: "Salario",collumnValue: "currentJob",type: "text",valueFormatter: (currentJob)=>`${currentJob.user_job_salary_currency_symbol} ${currentJob.user_job_salary}`},
                  // {headerName: "Endereço",collumnValue: "currentAddress",type: "text",valueFormatter: (currentAddress)=> currentAddress.user_address_city},
                  // {headerName: "Carro",collumnValue: "currentCar",type: "button",handleClick: this.showModal}
                ]}
                tableRowsValues = {this.state.usersData}
                fieldList = {
                  this.state.userTablefieldListConfig
                }
                fieldValues = {{"Acesso": "currentAccess","Endereço": "currentAddress","Emprego": "currentJob","Produto Comprado": "productsBuyed"}}
                expandedType = "lines"
              />
            </div>
            <div style={{height: "50vh", overflowY: "scroll"}}>
              <h1 style={{display: "flex", justifyContent: "center", width: "100%", backgroundColor: "#8570fa",margin: "0 0",color: "#fff"}}>
                Tabela de Produtos
              </h1>
              <CustomTable
                expansible = {true}
                key="ProductTable"
                tableName="productTable"
                tableCollumn = {this.state.productTableCollumns}
                tableRowsValues = {this.state.productsData}
                expandedType = "table"
                mountExpanded = {this.mountExtendedProductTable}

                // fieldList = {{
                //   "Compradores": [
                //     {label: "Comprador",fieldKey: "consumer"}
                //   ]
                // }}
                // fieldValues = "consumer"
              />
            </div>
          </div> :
          <OnErrorPage/>
        : 
        <OnLoadPage/>
      }
      </>
    )
  };
}

export default ContainerTable;
