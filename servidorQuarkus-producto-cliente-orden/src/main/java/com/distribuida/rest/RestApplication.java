package com.distribuida.rest;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.context.Destroyed;
import javax.enterprise.context.Initialized;
import javax.enterprise.event.Observes;
import javax.inject.Inject;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.core.Application;
import javax.ws.rs.ext.Provider;

import org.eclipse.microprofile.config.inject.ConfigProperty;

// Path es el mapeo de nuestros servicios
@ApplicationPath("/")
@Provider
public class RestApplication extends Application implements ContainerResponseFilter{
	
//	@Inject
//    @ConfigProperty(name="quarkus.http.port", defaultValue = "8082")
//    private Integer port;
//
//    public void init(@Observes @Initialized(ApplicationScoped.class) Object event) throws Exception{
//    	//conexion con zookeeper
//        CuratorFramework client = CuratorFrameworkFactory
//                .newClient("localhost:2181", new RetryForever(5));
//        client.start();
//        
//        //registro  de la instancia en zookeeper
//        ServiceInstance<Object> serviceInstance = ServiceInstance.builder()
//                .id("customer-server: " + port)
//                .name("customer-server")
//                .port(port)
//                .address("127.0.0.1")
//                .uriSpec(new UriSpec("{scheme}://{address}:{port}"))
//                .build();
//
//        ServiceDiscoveryBuilder.builder(Object.class)
//                .basePath("services")
//                .client(client)
//                .thisInstance(serviceInstance)
//                .build()
//                .start();
//        
//     
//
//    }
//
//    public void destroy(@Observes @Destroyed(ApplicationScoped.class) Object event) {
//        System.out.println("destroy");
//    }
	
	//este metodo es para habilitar las solicitudes de dominios (cuando use react para la vista debia habilitar access control)
	@Override
	public void filter(final ContainerRequestContext requestContext,
            final ContainerResponseContext cres) throws IOException {
	cres.getHeaders().add("Access-Control-Allow-Origin", "*"); //aqui habilito a todos los hosts 
	cres.getHeaders().add("Access-Control-Allow-Headers", "origin, content-type, accept, authorization");
	cres.getHeaders().add("Access-Control-Allow-Credentials", "true");
	cres.getHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
	cres.getHeaders().add("Access-Control-Max-Age", "1209600");
	}

}
