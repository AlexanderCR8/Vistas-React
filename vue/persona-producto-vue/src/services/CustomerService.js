import http from "./http-common";

class TutorialDataService {
  getAll() {
    return http.get("/customers");
  }

  get(id) {
    return http.get(`/customers/customer/${id}`);
  }

  create(data) {
    return http.post("/customers/crear", data);
  }

  update(data) {
    return http.put("/customers/actualizar",data);
  }

  delete(id) {
    return http.delete(`/customers/eliminar/${id}`);
  }

}

export default new TutorialDataService();