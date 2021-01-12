package com.distribuida.servicios;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;

import com.distribuida.entidades.Customer;
import com.distribuida.entidades.Products;

@ApplicationScoped
public class ServicioProductImpl implements ServicioProduct{
	@Inject
    EntityManager em;
	
	@Override
	public List<Products> obtenerProductos() {
		List<Products> prod;
		prod =em.createQuery("select u from Products u ", Products.class).getResultList();
		return prod;
	}

	@Override
	public Products insertarProducto(Products P) {
		Products cust = null;
		em.persist(P);
		cust = em.find(Products.class, P.getId());
		return cust;
		
	}

	@Override
	public void eliminarProducto(Integer id) {
		Long id2=Long.valueOf(id);
		Products prod=null;
		prod = em.find(Products.class, id2);
		if (!prod.equals(null)) {
			
			em.remove(prod);
		}else {
			System.out.println("No se pudo eliminar, customer no existe en BD");
		}	
		
	}

	@Override
	public void actualizarProducto(Products p) {
		Products cust = null;
		cust = em.find(Products.class, p.getId());
		cust.setDescripcion(p.getDescripcion());
		cust.setName(p.getName());
		cust.setPrice(p.getPrice());
		em.merge(cust);	
		
	}

}
