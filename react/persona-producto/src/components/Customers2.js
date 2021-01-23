import React, {useEffect, useState } from 'react'
//import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {Modal, ModalBody,ModalFooter, ModalHeader} from 'reactstrap';
import { getCustomers,postCustomers,putCustomers,deleteCustomers } from '../services/CustomerService'
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, numberFilter } from 'react-bootstrap-table2-filter';
//import Select from 'react-select'


    export default function Customers2() {
        
      
      const linkFollow = (cell, row) => {
        return (
          <div>
             <button className="btn btn-primary" onClick={()=>{seleccionarCustomer(row); modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                              {"  "}
          <button className="btn btn-danger" onClick={()=>{seleccionarCustomer(row); setModalEliminarCustomer(true)}}><FontAwesomeIcon icon={faTrashAlt}/></button>
          </div>
         
        );
      };

      const columns = [{
        dataField: 'id',
        text: 'ID',
        filter: numberFilter()
      }, {
        dataField: 'name',
        text: 'Nombre',
        sort:true,
        filter: textFilter()
      }, {
        dataField: 'surname',
        text: 'Apellido',
        sort:true,
        filter: textFilter()
      },{
        dataField: "follow",
        text: "Acciones",
        formatter: linkFollow,      
      }];

    const [customers, setCustomers]= useState([])
    const [formCustomer, setFormCustomer]= useState({
        id:'',
        name:'',
        surname:''
    })

    const [modalInsertarCusomer, setModalInsertarCustomer]=useState(false)
    const [modalEliminarCustomer, setModalEliminarCustomer]=useState(false)
    const [tipoModal, setTipoModal]=useState('')

    const pagination = paginationFactory({
      
      sizePerPageList: [ {
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: 'All', value: customers.length
      } ], // you can change the dropdown list for size per page
      sizePerPage: 5,  // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 3,  // the pagination bar size
      firstPageText: 'First', // First page button text
      lastPageText: 'Last', // Last page button text
      paginationShowsTotal: true,  // Accept bool or function
      paginationPosition: 'top',  // default is bottom, top and both is all available
      showTotal:true
    })

    const PeticionGetCustomers=async()=>{
          const response =await getCustomers()
          if(response.status===200){
            setCustomers(response.data)
          }
    }

    const modalInsertar=()=>{
        setModalInsertarCustomer(!modalInsertarCusomer);
    }

    const seleccionarCustomer=(customer)=>{
        //console.log("seleccionar")
        setTipoModal('actualizar')
        setFormCustomer({
            id:customer.id,
            name:customer.name,
            surname:customer.surname
        })
    }

    const handleChange= async e=>{
        e.persist();
        await setFormCustomer({
        ...formCustomer,
            [e.target.name]:e.target.value
        });

        console.log(formCustomer);
    }

    useEffect(()=>{
        //console.log("useeffect")
        PeticionGetCustomers();
     },[])


     const peticionPostCustomer= async()=>{
         //console.log("insertando")
        delete formCustomer.id;
        const post= postCustomers(formCustomer)
        post.then(response=>{
          modalInsertar();
          PeticionGetCustomers();
        }).catch(error=>{
          console.log(error.message)
        })        
      }

      const peticionPutCustomer=async()=>{
       // console.log("actualizando")
       putCustomers(formCustomer).then(response=>{
          modalInsertar();
          PeticionGetCustomers();
        }).catch(error=>{
          console.log(error.message)
        })
      }

      const peticionDeleteCustomer=()=>{
       // console.log("eliminando")
        deleteCustomers(formCustomer.id).then(response=>{
          setModalEliminarCustomer(false)
          PeticionGetCustomers();
        }).catch(error=>{
          console.log(error.message)
        })
      }

       
            return(
                <div className="App">
                <br></br>
                <button className="btn btn-success" onClick={()=>{setFormCustomer(null);setTipoModal('insertar'); modalInsertar()}}> Agregar Customers</button>
                <br/> <br/>
                <BootstrapTable
                 bootstrap4
                 classes="table table-striped table-success"
                 keyField='id'
                 data={ customers }
                 columns={ columns }
                 pagination={pagination}
                 filter={ filterFactory()}
                  />
                
        
                <Modal isOpen={modalInsertarCusomer}>
                          <ModalHeader>
                            <span style={{float:'right'}} onClick={()=>modalInsertar()}>x</span>
                          </ModalHeader>
                          <ModalBody>
                            <div className="form-group">
                            <label htmlFor="name">Id</label>
                              <input className="form-control" type="text" name="id" id="id" readOnly onChange={handleChange} value={formCustomer?formCustomer.id: ''}/>
                              <br/>
                              <label htmlFor="name">Nombre</label>
                              <input className="form-control" type="text" name="name" id="name" onChange={handleChange} value={formCustomer?formCustomer.name:''}/>
                              <br/>
                              <label htmlFor="surname">Apellido</label>
                              <input className="form-control" type="text" name="surname" id="surname" onChange={handleChange} value={formCustomer?formCustomer.surname:''}/>
                              <br/>
            
                            </div>
                          </ModalBody>
                          <ModalFooter>
                            {tipoModal==='insertar'?
                            <button className="btn btn-success" onClick={()=> peticionPostCustomer()}>
                            Insertar
                          </button>:<button className="btn btn-primary" onClick={()=> peticionPutCustomer()}>
                            Actualizar
                          </button>
                          
                          }
                            <button className="btn btn-danger" onClick={()=>modalInsertar()}>
                              Cancelar
                            </button>
                          </ModalFooter>
                      </Modal>
        
                      <Modal isOpen={modalEliminarCustomer}>
                        <ModalBody>
                          Estas seguro que deseas eliminar este cliente {formCustomer && formCustomer.name}
                        </ModalBody>
                        <ModalFooter>
                          <button className="btn btn-danger" onClick={()=>peticionDeleteCustomer()}> Si</button>
                          <button className="btn btn-secundary" onClick={()=>setModalEliminarCustomer(false)}>No</button>
                        </ModalFooter>
                      </Modal>
                      
                </div>
        
             )
        
     
 }

