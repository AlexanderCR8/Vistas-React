package com.distribuida.servicios;


import java.util.List;


import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;

import com.distribuida.entidades.Customer;



@ApplicationScoped
public class ServicioCustomerImpl implements ServicioCustomer{
	@Inject
    EntityManager em;
	

	@Override
	public Customer insertarCustomer(Customer P) {
		Customer cust = null;
		em.persist(P);
		cust = em.find(Customer.class, P.getId());
		return cust;
	}

	@Override
	public List<Customer> obtenerCustomer() {
		List<Customer> cust;
		cust =em.createQuery("select u from Customer u ", Customer.class).getResultList();
		return cust;
	}

	@Override
	public void eliminarCustomer(Integer id) {
		Long id2=Long.valueOf(id);
		Customer usuario=null;
		usuario = em.find(Customer.class, id2);
		if (!usuario.equals(null)) {
			
			em.remove(usuario);
		}else {
			System.out.println("No se pudo eliminar, customer no existe en BD");
		}	
		
	}

	@Override
	public void actualizarCustomer(Customer p) {
		Customer cust = null;
		cust = em.find(Customer.class, p.getId());
		cust.setName(p.getName());
		cust.setSurname(p.getSurname());
		em.merge(cust);	
		
	}

	@Override
	public Customer obtenerCustomerPorId(Integer id) {
		Customer cust = null;
		cust = em.find(Customer.class, id);
		return cust;
		
	}

	@Override
	public List<Customer> obtenerCustomerporApellido(String surname) {
		return em.createNamedQuery("Customer.findBySurname", Customer.class).setParameter("surname", surname).getResultList();
		
	}


	}
	
	
