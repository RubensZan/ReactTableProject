//file: src/webpages/index.js
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './home';
import UsersTable from './usersTable';
import ProductsTable from './productsTable';
const Views = () => {
    return(
        <Router>
            <Route exact path="/" component= {Home} />
            <Route path = "/products_table" component = {ProductsTable} />
            <Route path = "/users_table" component = {UsersTable} />
        </Router>
    );
};
export default Views;