import http from "./http-common";

class TutorialOrderservice {
  getAll() {
    return http.get("/orders");
  }

  get(id) {
    return http.get(`/orders/order/${id}`);
  }

  create(data) {
    return http.post("/orders/crear", data);
  }

  update(data) {
    return http.put("/orders/actualizar",data);
  }

  delete(id) {
    return http.delete(`/orders/eliminar/${id}`);
  }

}

export default new TutorialOrderservice();