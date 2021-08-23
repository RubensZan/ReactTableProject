//Imports
import React,{Component} from 'react';
import {UAParser} from 'ua-parser-js'; 
import CustomTable from './components/customTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserAlt, faUserAltSlash } from '@fortawesome/free-solid-svg-icons'; 
import ModalCar from './components/carModal';   
import CustomAlerts from './components/customAlerts';
import TableRow from './components/tableRow'; 
import data from './user/users.js';
import job from './user/users_job.js';
import address from './user/users_address.js';
import cars from './user/users_cars.js';
import access from './user/users_access.js';
import products from './user/users_products_buyed.js';

class ContainerTable extends Component{
  constructor(props){ 
    super(props);
      
      this.myProductsList = Object.values(products); 
      // console.log("meu produto",this.myProductsList);
      this.myUserList = data.map(user=>{
        const myUser = user;  
        if (job[myUser.user_job_id] )
          myUser.currentJob = job[myUser.user_job_id]; 
        else 
          myUser.currentJob = {}; 
        
        if (address[myUser.user_address_id] )
          myUser.currentAddress= address[myUser.user_address_id]; 
        else 
          myUser.currentAddress = {}; 
        
        if (cars[myUser.user_car_id] ){
          myUser.currentCar = cars[myUser.user_car_id]; 
          myUser.currentCar = {...myUser.currentCar,userID: myUser.user_id}
        }
        else 
          myUser.currentCar = {}; 
        
        if (access[myUser.user_access_id] )
          myUser.currentAccess = access[myUser.user_access_id]; 
        else 
          myUser.currentAccess = {}; 
        
        if (products[myUser.user_product_buyed_id] )
          myUser.productsBuyed = products[myUser.user_product_buyed_id]; 
        else 
          myUser.productsBuyed = {};  

        if(user.user_product_buyed_id)
          if(!this.myProductsList[user.user_product_buyed_id].consumer){
            this.myProductsList[user.user_product_buyed_id].consumerName = user.user_first_name;
            this.myProductsList[user.user_product_buyed_id].consumerLastName = user.user_last_name;
            this.myProductsList[user.user_product_buyed_id].consumerCompany = myUser.currentJob;
            this.myProductsList[user.user_product_buyed_id].consumerCity = myUser.currentAddress.user_address_city;
          }
          else {
            this.myProductsList[user.user_product_buyed_id].consumerName.push(user.user_first_name);
            this.myProductsList[user.user_product_buyed_id].consumerBirthDate.push(user.user_birth_date);
            this.myProductsList[user.user_product_buyed_id].consumerCompany.push(myUser.currentJob.user_job_title);
            this.myProductsList[user.user_product_buyed_id].consumerCity.push(myUser.currentAddress.user_address_city);
          }
        return myUser;
      });
      console.log(this.myProductsList);

    // States
    this.state = {
      showModalCar : null,
      allUsers : this.myUserList,
      showCustomAlert: false
    }; 

    // Binds
    this.setUsersChanges = this.setUsersChanges.bind(this)
    this.showModal = this.showModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.defaultAlert = this.defaultAlert.bind(this)
    this.showAlert = this.showAlert.bind(this)

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

  defaultAlert (alertObject)
  {
    this.setState({
      showCustomAlert: false  
    })
  }; 

  showAlert(){
    this.setState({
      showCustomAlert: true
    })
  };

  // getuserdatas(){
  //   return (
  //     this.myUserList.map((user,i)=>
  //       {return ( 
  //         <TableRow
  //           key={"user key:",user.user_id}  
  //           index={i}  
  //           userData={this.myUserList}    
  //         > 
  //           <td key={"TableRowCollumnKey:Name",user} >{user.user_first_name}</td> 
  //           <td key={"TableRowCollumnKey:BirthDate",user}>{user.user_birth_date}</td>
  //           <td key={"TableRowCollumnKey:Gender",user}>{user.user_gender}</td>
  //           <td key={"TableRowCollumnKey:Job",user}>{ user.currentJob.user_job_title ?  user.currentJob.user_job_title : ''}</td>
  //           <td key={"TableRowCollumnKey:Salary",user}>{ user.currentJob.user_job_salary && user.currentJob.user_job_salary_currency_symbol ?  user.currentJob.user_job_salary_currency_symbol +' '+ user.currentJob.user_job_salary : ''}</td>
  //           <td key={"TableRowCollumnKey:Address",user}>{ user.currentAddress.user_address_city ?  user.currentAddress.user_address_city : ''}</td>
  //           <td key={"TableRowCollumnKey:viewButton",user} onClick={(event)=>event.stopPropagation()}><button name="Botao" onClick={()=>this.showModal(user.currentCar)} >Visualizar</button></td>
  //           <td key={"TableRowCollumnKey:toggleButton",user} style={{display:"flex",justifyContent: "center"}}>
  //             {(i % 2 === 0) && (i % 4 === 0) ? 
  //               <FontAwesomeIcon icon={faUserAlt} style={{fontSize:"25px",color:"#15a36f"}}/> 
  //               : 
  //               <FontAwesomeIcon icon={faUserAltSlash} style={{fontSize:"25px",color:"#a8140c"}}/>
  //             }
  //           </td>
  //         </TableRow> 
  //       )}
  //     )
  //   )
  // };

  render(){
    return ( 
      <>
        <CustomTable
          key="UserTable"
          tableName="userTable"
          tableCollumn = {[
            {headerName: "Nomes",collumnValue: "user_first_name" },
            {headerName: "Data de Nascimento",collumnValue: "user_birth_date"},
            {headerName: "Genero",collumnValue: "user_gender"},
            {headerName: "Trabalho",collumnValue: "currentJob",valueFormatter: (currentJob)=> currentJob.user_job_title},
            {headerName: "Salario",collumnValue: "currentJob",valueFormatter: (currentJob)=>`${currentJob.user_job_salary_currency_symbol} ${currentJob.user_job_salary}`},
            {headerName: "Endereço",collumnValue: "currentAddress",valueFormatter: (currentAddress)=> currentAddress.user_address_city},
            {headerName: "Carro",collumnValue: "currentCar",valueFormatter: (currentCar)=> currentCar.car_name}
          ]}
          tableRowsValues = {this.myUserList}
          fieldList = {{
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
          }}
          fieldValues = {{"Acesso": "currentAccess","Endereço": "currentAddress","Emprego": "currentJob","Produto Comprado": "productsBuyed"}}
          expandedType = "lines"
        />
        <br></br>

        <CustomTable
          key="ProductTable"
          tableName="productTable"
          tableCollumn = {[
            {headerName: "Produto",collumnValue: "user_product_buyed_product_name" },
            {headerName: "Companhia",collumnValue: "user_product_buyed_company_name"},
            {headerName: "Material",collumnValue: "user_product_buyed_product_material"},
            {headerName: "Departamento",collumnValue: "user_product_buyed_commerce_department"},
            {headerName: "Preço",collumnValue: "user_product_buyed_product_price"}
          ]}
          tableRowsValues = {this.myProductsList}
          fieldList = {{
            "Compradores": [
              {label: "Comprador",fieldKey: "consumer"}
            ]
          }}
          fieldValues = "consumer"
          expandedType = "table"
        />
      </>
    )
  };
}

export default ContainerTable;
