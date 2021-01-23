
import './App.css';
import React,{ Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Barra from './components/BarraNavegacion'
import Inicio from './components/inicio'
//import Customers from './components/Customer'
import Orders from './components/Orders'
import Customers2 from './components/Customers2'
import Productos from './components/Products'
import { BrowserRouter as Router,Switch, Route} from 'react-router-dom';


class App extends Component {
  
  render(){
   
  return <div>
    <Router>
      <Barra/>
      <div className="container my-3">
      <Switch>
        <Route path="/" exact component={Inicio}/>
        <Route path="/products" component={Productos}/>
        <Route path="/customers2" component={Customers2}/>
        <Route path="/orders" component={Orders}/>
      </Switch>
      </div>
    </Router>
   
   
  </div>
    
  
}
}
export default App;