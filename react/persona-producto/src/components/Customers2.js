import React, {useEffect, useState } from 'react'
//import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import { getCustomers,postCustomers,putCustomers,deleteCustomers } from '../services/CustomerService'
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, numberFilter } from 'react-bootstrap-table2-filter';
import Swal from 'sweetalert2';
import DialogCustomer from './DialogCustomer'
//import Select from 'react-select'

//crud de customer con props, hooks , BootstrapTable, y SweetAlert2
    export default function Customers2() {
        
      
      const linkFollow = (cell, row) => {
        return (
          <div>
             <button className="btn btn-primary" onClick={()=>{seleccionarCustomer(row); modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                              {"  "}
          <button className="btn btn-danger" onClick={()=>{eliminarCust(row)}}><FontAwesomeIcon icon={faTrashAlt}/></button>
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
          Swal.fire('Insertado',`Customer ${formCustomer.name}  con exito`,'success')
          modalInsertar();
          PeticionGetCustomers();
        }).catch(error=>{
          console.log(error.message)
        })        
      }

      const peticionPutCustomer=async()=>{
       // console.log("actualizando")
       putCustomers(formCustomer).then(response=>{
        Swal.fire('Modificado',`Customer ${formCustomer.name} actualizado con exito`,'success')
          modalInsertar();
          PeticionGetCustomers();
        }).catch(error=>{
          console.log(error.message)
        })
      }

      const peticionDeleteCustomer=(id)=>{
        console.log(id)
        deleteCustomers(id).then(response=>{
         // setModalEliminarCustomer(false)
          PeticionGetCustomers();
        }).catch(error=>{
          console.log(error.message)
        })
        
      }

      const eliminarCust=(customer)=>{
        console.log('customer '+customer.id)
        Swal.fire({
          title: 'Estas seguro?',
          text: "¡No podrás revertir esto!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, Eliminar!'
        }).then((result) => {
          if (result.isConfirmed) {
            peticionDeleteCustomer(customer.id);
            Swal.fire('Eliminado','Cliente: '+customer.name+' eliminado con exito','success') 
           
          }
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
                
                <DialogCustomer ActivarModal={modalInsertarCusomer} CerrarModal={modalInsertar}
                                handleChange={handleChange} formCustomer={formCustomer} 
                                tipoModal={tipoModal} peticionPostCustomer={peticionPostCustomer}
                                peticionPutCustomer={peticionPutCustomer}/>
                      
                </div>
        
             )
        
     
 }

