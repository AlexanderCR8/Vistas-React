package com.distribuida.rest;

import java.io.IOException;
import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

import com.distribuida.entidades.Products;
import com.distribuida.servicios.ServicioProduct;

@Path("/products")
@ApplicationScoped
//@Provider
public class ProductsRest  {
	@Inject 
	ServicioProduct serviProduct;
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Products> listaProducts() {	
		
		List<Products> lista = serviProduct.obtenerProductos();	
		return lista;
	}
	
	
	@POST
	@Transactional
	@Path("/crear")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Products crearProducto(Products p) {
		Products cust = null;
		try {
			cust = serviProduct.insertarProducto(p);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return cust;
	}
	
	
	@PUT
	@Transactional
	@Path("/actualizar")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response actualizarProducto(Products p){
		if (p.getId() == null) {
            throw new WebApplicationException("el id se establecio de forma no valida.", 422);
        }
		serviProduct.actualizarProducto(p);
		
		return Response.ok(p).build();
	}
	
	@Transactional
	@DELETE
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/eliminar/{id}")
	public Response elimarProducts(@PathParam (value="id") Integer id) {
		//System.out.println("eliminando");
		try {
			serviProduct.eliminarProducto(id);
			return Response.noContent().build();
		} catch (Exception e) {
			return Response.status(Response.Status.NOT_FOUND).build();
		}
		
	}
	
	//este metodo es para habilitar las solicitudes de dominios (cuando use react para la vista debia habilitar access control)
//			@Override
//			public void filter(final ContainerRequestContext requestContext,
//		            final ContainerResponseContext cres) throws IOException {
//			cres.getHeaders().add("Access-Control-Allow-Origin", "*"); //aqui habilito a todos los hosts 
//			cres.getHeaders().add("Access-Control-Allow-Headers", "origin, content-type, accept, authorization");
//			cres.getHeaders().add("Access-Control-Allow-Credentials", "true");
//			cres.getHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
//			cres.getHeaders().add("Access-Control-Max-Age", "1209600");
//			}



}
