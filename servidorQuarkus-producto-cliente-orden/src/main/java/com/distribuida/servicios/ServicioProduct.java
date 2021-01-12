package com.distribuida.servicios;

import java.util.List;


import com.distribuida.entidades.Products;

public interface ServicioProduct {
	 public List<Products> obtenerProductos() ;
	 public Products insertarProducto( Products P);
	 void eliminarProducto(Integer id) ;
	 
	 void actualizarProducto(Products p ) ;
}
