import React, { Component } from 'react'
//import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav,Navbar,Form,FormControl,Button,NavLink} from 'react-bootstrap'
import { Link } from 'react-router-dom';

export default class BarraNavegacion extends Component {
    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link  as={Link}  className="navbar-item"  to="/">Home</Nav.Link>
                        <Nav.Link  as={Link} className="navbar-item" to="/products"  >Productos</Nav.Link>
                        <Nav.Link  as={Link} className="navbar-item"  to="/customers2">Clientes</Nav.Link>
                        <Nav.Link  as={Link} className="navbar-item"  to="/orders">Ordenes</Nav.Link>
                    </Nav>
                    
                </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}
