import React from 'react'
import {Modal, ModalBody,ModalFooter, ModalHeader} from 'reactstrap';

export default function DialogCustomer(props) {
 
        return (
            <div>
               <Modal isOpen={props.ActivarModal}>
                          <ModalHeader>
                          <span style={{float:'right'}} onClick={()=>props.CerrarModal()}>x</span>
                          </ModalHeader>
                          <ModalBody>
                          <div className="form-group">
                            <label htmlFor="name">Id</label>
                              <input className="form-control" type="text" name="id" id="id" readOnly  value={props.formCustomer?props.formCustomer.id: ''}/>
                              <br/>
                              <label htmlFor="name">Nombre</label>
                              <input className="form-control" type="text" name="name" id="name" onChange={props.handleChange} value={props.formCustomer?props.formCustomer.name:''}/>
                              <br/>
                              <label htmlFor="surname">Apellido</label>
                              <input className="form-control" type="text" name="surname" id="surname" onChange={props.handleChange} value={props.formCustomer?props.formCustomer.surname:''}/>
                              <br/>
            
                            </div>
                          </ModalBody>
                          <ModalFooter>
                          {props.tipoModal==='insertar'?
                            <button className="btn btn-success" onClick={()=> props.peticionPostCustomer()}>
                            Insertar
                          </button>:<button className="btn btn-primary" onClick={()=> props.peticionPutCustomer()}>
                            Actualizar
                          </button>
                          
                          }
                            <button className="btn btn-danger" onClick={()=>props.CerrarModal()}>
                              Cancelar
                            </button>
                          </ModalFooter>
                </Modal>

            </div>
        )
    
}
