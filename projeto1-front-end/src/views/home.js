import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <div className="container">
            <div>
                <h1>HOME PAGE</h1>
                <p>LINKS TO THE THREE TABLES </p>
            </div>
            <div>
                <p><Link to="/products_table">Tabela de Produtos</Link></p>
                <p><Link to="/users_table">Tabela de Usuários</Link></p>
                <p><Link to="/history_table">Tabela de Histórico</Link></p>
            </div>
        </div>
    );
};
export default Home;