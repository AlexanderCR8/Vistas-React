import React, {useEffect, useState } from 'react'
//import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {Modal, ModalBody,ModalFooter, ModalHeader} from 'reactstrap';
import { getOrders,postOrders,putOrders,deleteOrders} from '../services/OrderService'
import { getCustomers} from '../services/CustomerService'
import { getProducts} from '../services/ProductService'
//import Select from 'react-select'


export default function Orders() {
      const [formCustomer, setFormCustomer]= useState({
        id:'',
        name:'',
        surname:''
    })
    const [formProducts, setFormProducts]= useState({
      id:'',
      name:'',
      descripcion:'',
      price:''
  })  
    const [orders, setOrders]= useState([])
    const [formOrders, setFormOrders]= useState({
        id:'',
        customers:formCustomer,
        products:formProducts
    })

    const[customers, setCustomers]=useState([])
   
    const[products, setProducts]=useState([])

    const [modalInsertarOrders, setModalInsertarOrders]=useState(false)
    const [modalEliminarOrders, setModalEliminarOrders]=useState(false)
    const [tipoModal, setTipoModal]=useState('')

    const PeticionGetOrders=async()=>{
        //console.log("mostrar")
        const  response = await getOrders()
        if(response.status===200){
          setOrders(response.data);
        } 
    }
    
    const PeticionGetCustomers=async()=>{
      const response =await getCustomers()
      if(response.status===200){
        setCustomers(response.data)
      }
    }

    const PeticionGetProducts=async()=>{
      const response = await getProducts()
      if(response.status===200){
        setProducts(response.data);
      }
    }

    const modalInsertar=()=>{

      console.log(tipoModal)
      
        setModalInsertarOrders(!modalInsertarOrders);
      
        
    }

    const seleccionarOrders=(order)=>{
        console.log("paso x seleccionar")
        setTipoModal('actualizar')
        setFormCustomer({
          id:order.customers.id,
          name:order.customers.name,
          surname:order.customers.surname
        })
        setFormProducts({
          id:order.products.id,
          name:order.products.name,
          descripcion:order.products.descripcion,
          price:order.products.price
        })
        console.log(order.id+" "+order.customers.name)
        setFormOrders({
            id:order.id,
            customers:formCustomer,
            products:formProducts
        })
    }

    const limpiarRegistros=()=>{
      
        setFormCustomer({
          id:'',
          name:'',
          surname:''
        })
        setFormProducts({
          id:'',
          name:'',
          descripcion:'',
          price:''
        })
        
        setFormOrders({
            id:'',
            customers:formCustomer,
            products:formProducts
        })
      
    }

    const handleChange= async e=>{
        e.persist();
        await setFormOrders({
        ...formOrders,
            [e.target.name]:e.target.value
        });

        console.log(formOrders);
    }

    const handleChange2= async e=>{
      e.persist();
        await setFormCustomer({
        ...formCustomer,
            [e.target.name]:e.target.value
        });

        console.log(formCustomer);
  }

  const handleChange3= async e=>{
    e.persist();
        await setFormProducts({
        ...formProducts,
            [e.target.name]:e.target.value
        });

        console.log(formProducts);
}


    
    useEffect(()=>{
        //console.log("useeffect")
        PeticionGetOrders();
        PeticionGetCustomers();
        PeticionGetProducts();
     },[])

     const peticionPostOrders= async()=>{
       // console.log(formOrders)
       delete formOrders.id;
       let myData={
        "customers":formCustomer,
        "products":formProducts
    }
    console.log(myData)
       postOrders(myData).then(response=>{
         modalInsertar();
         PeticionGetOrders();
       }).catch(error=>{
         console.log(error.message)
       })
     }
     
     const peticionPutOrders=async()=>{
       
        let myData={
            "id":formOrders.id,
            "customers":formCustomer,
            "products":formProducts
        }
        console.log("actualizando")  
         console.log(myData)
        putOrders(myData).then(response=>{
           modalInsertar();
           PeticionGetOrders();
         }).catch(error=>{
           console.log(error.message)
         })

        
       }

       const peticionDeleteOrders=()=>{
        // console.log("eliminando")
         deleteOrders(formOrders.id).then(response=>{
           setModalEliminarOrders(false)
           PeticionGetOrders();
         }).catch(error=>{
           console.log(error.message)
         })
     
       }

        return (
            <div className="App">
            <br></br>
            <button className="btn btn-success" onClick={()=>{limpiarRegistros();setTipoModal('insertar'); modalInsertar()}}> Agregar Productos</button>
            <br/> <br/>
            <table className="table table-striped table-success">
              <thead>
              <tr>
                <th>Id</th>
                <th>Datos Cliente</th>
                <th>Datos Producto</th>
                <th>Acciones</th>
                
              </tr>
              </thead>
              <tbody>
                {orders.map(orders=>{
                    return(
                      <tr key={orders.id}> 
                        <td>{orders.id}</td>
                        <td>{orders.customers.name} {orders.customers.surname}</td>
                        <td>{orders.products.name}</td>
                        
                        <td>
                          <button className="btn btn-primary" onClick={()=>{ seleccionarOrders(orders); modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                          {"  "}
                          <button className="btn btn-danger" onClick={()=>{seleccionarOrders(orders); setModalEliminarOrders(true)}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                        </td>
                      </tr>
                    )
                
                })}
              </tbody>
              
            </table>
    
            <Modal isOpen={modalInsertarOrders}>
                      <ModalHeader>
                        <span style={{float:'right'}} onClick={()=>modalInsertar()}>x</span>
                      </ModalHeader>
                      <ModalBody>
                        <div className="form-group">
                        <label htmlFor="name">Id</label>
                          <input className="form-control" type="text" name="id" id="id" readOnly onChange={handleChange} value={formOrders?formOrders.id: ''}/>
                          <br/>
                          <label htmlFor="id">ID Cliente</label>
                          <select  className="custom-select " id="mySelect" name="id" onChange={handleChange2}>
                                 <option  key={formOrders.customers.id} id="id" selected  name="id" 
                                 value={formCustomer.id}>{formCustomer?formCustomer.name+" "+formCustomer.surname:''} </option>
                              {customers.map(item=>(
                                 
                                  <option key={item.id} value={item.id} name="id">
                                      {item.name} {item.surname}
                                  </option>
                              ))}  
                              </select>
                          <br/>
                          <label htmlFor="products">ID producto</label>
                          <select className="custom-select " id="mySelectProducts" name="id" onChange={handleChange3}>
                          <option  key={formOrders.products.id} id="id" selected  name="id" 
                                 value={formProducts.id}>{formProducts?formProducts.name+" "+formProducts.price:''} </option>
                              {products.map(item=>(
                                  <option key={item.id} value={item.id} name="id">
                                      {item.name} {item.price}
                                  </option>
                              ))}  
                          </select>
                          <br/>
                          
                          
                           
        
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        {tipoModal==='insertar'?
                        <button className="btn btn-success" onClick={()=> peticionPostOrders()}>
                        Insertar
                      </button>:<button className="btn btn-primary" onClick={()=> peticionPutOrders()}>
                        Actualizar
                      </button>
                      
                      }
                        <button className="btn btn-danger" onClick={()=>modalInsertar()}>
                          Cancelar
                        </button>
                      </ModalFooter>
                  </Modal>
    
                  <Modal isOpen={modalEliminarOrders}>
                    <ModalBody>
                      Estas seguro que deseas eliminar esta Orden {formOrders && formOrders.id}
                    </ModalBody>
                    <ModalFooter>
                      <button className="btn btn-danger" onClick={()=>peticionDeleteOrders()}> Si</button>
                      <button className="btn btn-secundary" onClick={()=>setModalEliminarOrders(false)}>No</button>
                    </ModalFooter>
                  </Modal>
                  
            </div>
        )
    
}