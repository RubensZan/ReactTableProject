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





class ContainerTable extends Component{
  constructor(props){ 
    super(props);
      // array with the consumer x product buyed relation
      this.consumerControll = []; 
      this.consumerControll.length = 100; 
      // console.log("ConsumerControll",this.consumerControll);
      let copy = JSON.parse(JSON.stringify(products));
      this.myProductsList = Object.values(copy); 
      this.myUserList = data.map(user=>{
        const myUser = JSON.parse(JSON.stringify(user));  
        myUser.currentJob = job[myUser.user_job_id] || {};
        myUser.currentAddress =  address[myUser.user_address_id] || {}; 
        myUser.currentAccess = access[myUser.user_access_id] || {};
        myUser.productsBuyed = products[myUser.user_product_buyed_id] || {};  
        if (cars[myUser.user_car_id] )
          myUser.currentCar = {...cars[myUser.user_car_id], userID: myUser.user_id }
        else 
          myUser.currentCar = {}; 
        let productId = myUser.productsBuyed.user_product_buyed_id; 
        if (this.consumerControll[productId])
          this.consumerControll[productId].push(myUser); 
        else  
          this.consumerControll[productId] = [(myUser)]; 
        
        // console.log("COMPROU:",myUser.user_product_buyed_id);
        // console.log(this.myProductsList.filter((product)=>product.user_product_buyed_id === myUser.user_product_buyed_id));
        return myUser;
      });

      // console.log("CONSUMER CONTROLL:",this.consumerControll);
  
    // States
    this.state = {
      showModalCar : null,
      allUsers : this.myUserList,
      showCustomAlert: false,
      userTablefieldListConfig: {
        "Acesso": [
          {label: "Rede",fieldKey: "user_access_business_technoloy"},
          {label: "Login",fieldKey: "user_access_login"},
          {label: "SO",fieldKey: "userOs"},
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
        {headerName: "Produto",collumnValue: "user_product_buyed_product_name", type: "text" },
        {headerName: "Companhia",collumnValue: "user_product_buyed_company_name", type: "text"},
        {headerName: "Material",collumnValue: "user_product_buyed_product_material", type: "text"},
        {headerName: "Departamento",collumnValue: "user_product_buyed_commerce_department", type: "text"},
        {headerName: "Preço",collumnValue: "user_product_buyed_product_price", type: "text"}
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
    return ( 
      <div style={{height: "100vh"}}>
      {/* <p>Session Time: {this.state.timer}</p>
      <p>Cars altereds: {this.state.alteredCar}</p> */}
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
        <div style={{height: "50vh"}}>
            <h1 style={{display: "flex", justifyContent: "center",width: "100%", backgroundColor: "#8570fa", margin: "0 0",color: "#fff"}}>
              Tabela de Usuários
            </h1>
          <CustomTable
            expansible = {true}
            key="UserTable"
            tableName="userTable"
            tableCollumn = {[
              {headerName: "Nomes",collumnValue: "user_first_name", type: "text"},
              {headerName: "Data de Nascimento",collumnValue: "user_birth_date", type: "text"},
              {headerName: "Genero",collumnValue: "user_gender", type: "text"},
              {headerName: "Trabalho",collumnValue: "currentJob", type: "text",valueFormatter: (currentJob)=> currentJob.user_job_title},
              {headerName: "Salario",collumnValue: "currentJob",type: "text",valueFormatter: (currentJob)=>`${currentJob.user_job_salary_currency_symbol} ${currentJob.user_job_salary}`},
              {headerName: "Endereço",collumnValue: "currentAddress",type: "text",valueFormatter: (currentAddress)=> currentAddress.user_address_city},
              {headerName: "Carro",collumnValue: "currentCar",type: "button",handleClick: this.showModal},
              {headerName: "Status",collumnValue: "",type: "icon"}
            ]}
            tableRowsValues = {this.myUserList}
            fieldList = {
              this.state.userTablefieldListConfig
            }
            fieldValues = {{"Acesso": "currentAccess","Endereço": "currentAddress","Emprego": "currentJob","Produto Comprado": "productsBuyed"}}
            expandedType = "lines"
          />
        </div>
        
        <div style={{height: "50vh"}}>
          <h1 style={{display: "flex", justifyContent: "center", width: "100%", backgroundColor: "#8570fa",margin: "0 0",color: "#fff"}}>
            Tabela de Produtos
          </h1>
          <CustomTable
            expansible = {true}
            key="ProductTable"
            tableName="productTable"
            tableCollumn = {this.state.productTableCollumns}
            tableRowsValues = {this.myProductsList}
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
      </div>
    )
  };
}

export default ContainerTable;
