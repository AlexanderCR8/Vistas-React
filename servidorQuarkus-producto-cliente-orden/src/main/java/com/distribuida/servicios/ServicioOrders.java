package com.distribuida.servicios;

import java.util.List;



import com.distribuida.entidades.Orders;

public interface ServicioOrders {
	Orders insertarOrdenes( Orders P);
	 
	 public List<Orders> obtenerOrdenes();
	 
	 void eliminarOrdenes(Integer id) ;
	 
	 void actualizarOrdenes(Orders p );
	 
	 Orders obtenerOrdenesPorId(Integer id);
	 
	 public List<Orders> obtenerOrdenesporIdCustomer(Integer id);
	 
	
	
}
