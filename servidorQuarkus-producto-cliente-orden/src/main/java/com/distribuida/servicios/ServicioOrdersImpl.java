package com.distribuida.servicios;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;

import com.distribuida.entidades.Orders;

@ApplicationScoped
public class ServicioOrdersImpl implements ServicioOrders{
	@Inject
    EntityManager em;
	@Override
	public Orders insertarOrdenes(Orders P) {
		Orders cust = null;
		em.persist(P);
		cust = em.find(Orders.class, P.getId());
		return cust;
		
	}

	@Override
	public List<Orders> obtenerOrdenes() {
		List<Orders> ord;
		ord =em.createQuery("select u from Orders u ", Orders.class).getResultList();
		return ord;
		
	}

	@Override
	public void eliminarOrdenes(Integer id) {
		Long id2=Long.valueOf(id);
		Orders order=null;
		order= em.find(Orders.class, id2);
		if (!order.equals(null)) {
			
			em.remove(order);
		}else {
			System.out.println("No se pudo eliminar, orden no existe en BD");
		}	
		
	}

	@Override
	public void actualizarOrdenes(Orders p) {
		Orders order = null;
		order = em.find(Orders.class, p.getId());
		order.setCustomers(p.getCustomers());
		order.setProducts(p.getProducts());
		em.merge(order);	
		
	}

	@Override
	public Orders obtenerOrdenesPorId(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Orders> obtenerOrdenesporIdCustomer(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

}
