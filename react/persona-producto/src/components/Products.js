import React, {useEffect, useState } from 'react'
//import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {Modal, ModalBody,ModalFooter, ModalHeader} from 'reactstrap';
import { getProducts,postProducts,putProducts,deleteProducts} from '../services/ProductService'


export default function Products () {
    const [products, setProducts]= useState([])
    const [formProducts, setFormProducts]= useState({
        id:'',
        name:'',
        descripcion:'',
        price:''
    })

    const [modalInsertarProducts, setModalInsertarProducts]=useState(false)
    const [modalEliminarProducts, setModalEliminarProducts]=useState(false)
    const [tipoModal, setTipoModal]=useState('')

    const PeticionGetProducts=async()=>{
        //console.log("mostrar")
        const response = await getProducts()
        if(response.status===200){
          setProducts(response.data);
        }
    }

    const modalInsertar=()=>{
        setModalInsertarProducts(!modalInsertarProducts);
    }

    const seleccionarProducts=(product)=>{
        //console.log("seleccionar")
        setTipoModal('actualizar')
        setFormProducts({
            id:product.id,
            name:product.name,
            descripcion:product.descripcion,
            price:product.price
        })
    }

    const handleChange= async e=>{
        e.persist();
        await setFormProducts({
        ...formProducts,
            [e.target.name]:e.target.value
        });

        console.log(formProducts);
    }

    
    useEffect(()=>{
        //console.log("useeffect")
        PeticionGetProducts();
     },[])


     const peticionPostProducts= async()=>{
         //console.log("insertando")
        delete formProducts.id;
        postProducts(formProducts).then(response=>{
          modalInsertar();
          PeticionGetProducts();
        }).catch(error=>{
          console.log(error.message)
        })
      }

      const peticionPutProducts=async()=>{
        // console.log("actualizando")
         putProducts(formProducts).then(response=>{
           modalInsertar();
           PeticionGetProducts();
         }).catch(error=>{
           console.log(error.message)
         })
       }
 
       const peticionDeleteProducts=()=>{
        // console.log("eliminando")
         deleteProducts(formProducts.id).then(response=>{
           setModalEliminarProducts(false)
           PeticionGetProducts();
         }).catch(error=>{
           console.log(error.message)
         })
     
       }
        return (
            <div className="App">
                <br></br>
                <button className="btn btn-success" onClick={()=>{setFormProducts(null);setTipoModal('insertar'); modalInsertar()}}> Agregar Productos</button>
                <br/> <br/>
                <table className="table table-striped table-success">
                  <thead>
                  <tr>
                    <th>Id</th>
                    <th>Item</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                  </tr>
                  </thead>
                  <tbody>
                    {products.map(products=>{
                        return(
                          <tr key={products.id}> 
                            <td>{products.id}</td>
                            <td>{products.name}</td>
                            <td>{products.descripcion}</td>
                            <td>{products.price}</td>
                            <td>
                              <button className="btn btn-primary" onClick={()=>{seleccionarProducts(products); modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                              {"  "}
                              <button className="btn btn-danger" onClick={()=>{seleccionarProducts(products); setModalEliminarProducts(true)}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                            </td>
                          </tr>
                        )
                    
                    })}
                  </tbody>
                  
                </table>
        
                <Modal isOpen={modalInsertarProducts}>
                          <ModalHeader>
                            <span style={{float:'right'}} onClick={()=>modalInsertar()}>x</span>
                          </ModalHeader>
                          <ModalBody>
                            <div className="form-group">
                            <label htmlFor="name">Id</label>
                              <input className="form-control" type="text" name="id" id="id" readOnly onChange={handleChange} value={formProducts?formProducts.id: ''}/>
                              <br/>
                              <label htmlFor="name">Item</label>
                              <input className="form-control" type="text" name="name" id="name" onChange={handleChange} value={formProducts?formProducts.name:''}/>
                              <br/>
                              <label htmlFor="descripcion">Descripcion</label>
                              <input className="form-control" type="text" name="descripcion" id="descripcion" onChange={handleChange} value={formProducts?formProducts.descripcion:''}/>
                              <br/>
                              <label htmlFor="price">Precio</label>
                              <input className="form-control" type="text" name="price" id="price" onChange={handleChange} value={formProducts?formProducts.price:''}/>
                              <br/>
            
                            </div>
                          </ModalBody>
                          <ModalFooter>
                            {tipoModal==='insertar'?
                            <button className="btn btn-success" onClick={()=> peticionPostProducts()}>
                            Insertar
                          </button>:<button className="btn btn-primary" onClick={()=> peticionPutProducts()}>
                            Actualizar
                          </button>
                          
                          }
                            <button className="btn btn-danger" onClick={()=>modalInsertar()}>
                              Cancelar
                            </button>
                          </ModalFooter>
                      </Modal>
        
                      <Modal isOpen={modalEliminarProducts}>
                        <ModalBody>
                          Estas seguro que deseas eliminar este producto {formProducts && formProducts.name}
                        </ModalBody>
                        <ModalFooter>
                          <button className="btn btn-danger" onClick={()=>peticionDeleteProducts()}> Si</button>
                          <button className="btn btn-secundary" onClick={()=>setModalEliminarProducts(false)}>No</button>
                        </ModalFooter>
                      </Modal>
                      
                </div>
        )
    
}
