package com.distribuida.servicios;


import java.util.List;


import com.distribuida.entidades.Customer;

public interface ServicioCustomer {
	
	public Customer insertarCustomer( Customer P);
	 
	 public List<Customer> obtenerCustomer() ;
	 
	 void eliminarCustomer(Integer id) ;
	 
	 void actualizarCustomer(Customer p ) ;
	 
	 Customer obtenerCustomerPorId(Integer id);
	 
	 public List <Customer> obtenerCustomerporApellido(String surname);
	
}
