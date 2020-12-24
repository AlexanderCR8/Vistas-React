import logo from './logo.svg';
import './App.css';
import React,{ Component} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBurn, faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {Modal, ModalBody,ModalFooter, ModalHeader} from 'reactstrap';

const url= "http://localhost:8080/customers"
class App extends Component {
  state={
    customers:[],
    modalInsertarCusomer:false,
    modalEliminarCustomer:false,
    formCustomer:{
      id:'',
      name:'',
      surname:''
    },
    tipoModal:''
  }
  peticionGetCustomers=()=>{
    axios.get(url).then(response=>{
      this.setState({customers:response.data});
    }).catch(error=>{
      console.log(error.message)
    })
  }
  modalInsertarCusomer=()=>{
    this.setState({modalInsertarCusomer:!this.state.modalInsertarCusomer});
  }

  seleccionarCustomer=(customer)=>{
    this.setState({
      tipoModal:'actualizar',
      formCustomer:{
        id:customer.id,
        name:customer.name,
        surname:customer.surname
      }
    })
  }
  handleChange= async e=>{
    e.persist();
    await this.setState({
      formCustomer:{
        ...this.state.formCustomer,
        [e.target.name]:e.target.value
      }
    });
    console.log(this.state.formCustomer);
  }
  componentDidMount() {
    this.peticionGetCustomers();
  }
  
  peticionPostCustomer= async()=>{
    delete this.state.formCustomer.id;
    await axios.post(url+'/crear',this.state.formCustomer).then(response=>{
      this.modalInsertarCusomer();
      this.peticionGetCustomers();
    }).catch(error=>{
      console.log(error.message)
    })
  }
  peticionPutCustomer=async()=>{
   
    await axios.put(url+'/actualizar',this.state.formCustomer).then(response=>{
      this.modalInsertarCusomer();
      this.peticionGetCustomers();
    }).catch(error=>{
      console.log(error.message)
    })
  }
  peticionDeleteCustomer=()=>{
    axios.delete(url+'/eliminar/'+this.state.formCustomer.id).then(response=>{
      this.setState({modalEliminarCustomer:false});
      this.peticionGetCustomers();
    }).catch(error=>{
      console.log(error.message)
    })

  }
  render(){
    const {formCustomer}=this.state;
  return (
    <div className="App">
      <br></br>
      <button className="btn btn-success" onClick={()=>{this.setState({form:null,tipoModal:'insertar'}); this.modalInsertarCusomer()}}> Agregar Customers</button>
      <br/> <br/>
      <table className="table">
        <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Acciones</th>
        </tr>
        </thead>
        <tbody>
          {this.state.customers.map(customer=>{
              return(
                <tr>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.surname}</td>
                  <td>
                    <button className="btn btn-primary" onClick={()=>{this.seleccionarCustomer(customer); this.modalInsertarCusomer()}}><FontAwesomeIcon icon={faEdit}/></button>
                    {"  "}
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarCustomer(customer); this.setState({modalEliminarCustomer:true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                  </td>
                </tr>
              )
          
          })}
        </tbody>
        
      </table>

          <Modal isOpen={this.state.modalInsertarCusomer}>
              <ModalHeader>
                <spam style={{float:'right'}} onClick={()=>this.modalInsertarCusomer()}>x</spam>
              </ModalHeader>
              <ModalBody>
                <div className="form-group">
                <label htmlFor="name">Id</label>
                  <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={formCustomer?formCustomer.id: ''}/>
                  <br/>
                  <label htmlFor="name">Nombre</label>
                  <input className="form-control" type="text" name="name" id="name" onChange={this.handleChange} value={formCustomer?formCustomer.name:''}/>
                  <br/>
                  <label htmlFor="surname">Apellido</label>
                  <input className="form-control" type="text" name="surname" id="surname" onChange={this.handleChange} value={formCustomer?formCustomer.surname:''}/>
                  <br/>

                </div>
              </ModalBody>
              <ModalFooter>
                {this.state.tipoModal=='insertar'?
                <button className="btn btn-success" onClick={()=> this.peticionPostCustomer()}>
                Insertar
              </button>:<button className="btn btn-primary" onClick={()=> this.peticionPutCustomer()}>
                Actualizar
              </button>
              
              }
                <button className="btn btn-danger" onClick={()=>this.modalInsertarCusomer()}>
                  Cancelar
                </button>
              </ModalFooter>
          </Modal>
          
          <Modal isOpen={this.state.modalEliminarCustomer}>
            <ModalBody>
              Estas seguro que deseas eliminar este cliente {formCustomer && formCustomer.name}
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionDeleteCustomer()}> Si</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminarCustomer:false})}>No</button>
            </ModalFooter>
          </Modal>



    </div>
  );
}
}
export default App;