import http from "./http-common";

class TutorialProductService {
  getAll() {
    return http.get("/products");
  }

  get(id) {
    return http.get(`/products/product/${id}`);
  }

  create(data) {
    return http.post("/products/crear", data);
  }

  update(data) {
    return http.put("/products/actualizar",data);
  }

  delete(id) {
    return http.delete(`/products/eliminar/${id}`);
  }

}

export default new TutorialProductService();