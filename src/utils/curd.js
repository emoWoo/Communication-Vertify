import http from "./http";
import BASE_URL from "@/constants/const";

class Curd {
  constructor(baseUrl) {
    this.baseUrl = BASE_URL + baseUrl;
  }

  get = this._get.bind(this);
  post = this._post.bind(this);

  _get(params) {
    return http(this.baseUrl, "get", params);
  }

  _post(id = null, params) {
    return http(this.baseUrl + (id ? `/${id}` : ' '), "post", params);
  }
}

export default Curd;
