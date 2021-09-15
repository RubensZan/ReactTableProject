import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose, faBars } from '@fortawesome/free-solid-svg-icons';

export default function Home(props){
    const [sidebarExpanded, setSidebarExpanded] = useState(false);
    
    return (
        <div className="container" style={style.container}>
            <header style={style.header}>
                <h1 style={{display: "flex", justifyContent: "center"}}>TABELAS</h1>
            </header>
            <article style={!sidebarExpanded ? style.homeBody : style.homeBodyActive}> 
                <p>Clique nos links abaixo para ser redirecionado a tabela desejada:</p>
                <div style={style.bodyBox}>
                    <p>
                        Tabela de produtos, com os campos de <strong>produto, companhia,
                        material, departamento e preço, </strong>ao clicar em uma linha mostra os consumidores
                        do produto.
                    </p>
                    <p><Link to="/products_table">Tabela de Produtos</Link></p>
                </div>
                <div style={style.bodyBox}>
                    <p>
                        Tabela de usuários, com os campos de <strong>nomes, data de nascimento,
                        profissão, salário e carro</strong>, ao clicar em uma linha mostra boxes 
                        , as quais ao serem clicadas mostram as informações específicas
                        do usuário clicado.
                    </p>
                    <p><Link to="/users_table">Tabela de Usuários</Link></p>
                </div>
                <div style={style.bodyBox}> 
                    <p>
                        Tabela de histórico, com os campos de <strong>ip, user agent,
                        página acessada, data de inclusão.</strong>
                    </p>
                    <p><Link to="/history_table">Tabela de Histórico</Link></p>
                </div>
            </article>
            <div style={sidebarExpanded ? style.sidebarActive : style.sidebar}>
                <FontAwesomeIcon 
                    style={sidebarExpanded ? style.navIcon : style.sidebarIcon} icon={sidebarExpanded ? faWindowClose : faBars} 
                    onClick={()=>setSidebarExpanded(!sidebarExpanded)}/>
                    {
                        sidebarExpanded ?
                        <p>blablabla</p>
                        :null
                    }
            </div>
        </div>
    );
};

const style = {
    container: {
        width: "100%",
        height: "100%",
        margin: "0 0"
    },
    header: {
        position: "fixed",
        top: "0",
        width: "100%",
        backgroundColor: "#48b073",
        height: "10%"
    },
    homeBody: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center", 
        padding: "8% 2%"
    },
    homeBodyActive: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center", 
        padding: "8% 21%"
    },
    navIcon: {
        padding: "0 30%",
        fontSize: "40px"
    },
    sidebarIcon: {
        padding: "0 20%",
        fontSize: "40px"
    },
    bodyBox:{
        backgroundColor: "rgb(194 230 217 / 55%)",
        margin: "10px 0"
    },
    sidebar: {
        width: "80px",
        position: "absolute",
        top: "40px",
        left: "0"
    },
    sidebarActive:{
        width: "20%",
        position: "absolute",
        top: "40px",
        left: "0",
        height: "100vh",
        backgroundColor: "#48b073",
        overflowY: "hidden"
    }
};
