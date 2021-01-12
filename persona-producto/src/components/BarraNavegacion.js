import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav,Navbar,Form,FormControl,Button,NavLink} from 'react-bootstrap'
import { Link } from 'react-router-dom';

export default class BarraNavegacion extends Component {
    render() {
        return (
            <div>
                <Navbar className="Navbar" variant="dark">
                   
                    <Nav className="mr-auto" variant="tabs" activeKey >
                        
                        <Nav.Link  as={Link}  className="navbar-item" activeClassName="is-active" to="/">Home</Nav.Link>
                        
                        
                        <Nav.Link  as={Link} className="navbar-item" to="/products"  >Productos</Nav.Link>
                        
                        
                        <Nav.Link  as={Link} className="navbar-item"  to="/customers2">Clientes</Nav.Link>
                        <Nav.Link  as={Link} className="navbar-item"  to="/orders">Ordenes</Nav.Link>
                    </Nav>
                    <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                    </Form>
                </Navbar>
            </div>
        )
    }
}
