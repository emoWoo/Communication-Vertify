import http from "./http";
import BASE_URL from "@/constants/const";

class Curd {
  constructor(baseUrl) {
    this.baseUrl = BASE_URL + baseUrl;
  }

  get = this._get.bind(this);
  post = this._post.bind(this);

  _get(id,params) {
    return http(this.baseUrl+(id ? `/${id}` : ''), "GET",params);
  }

  _post(params) {
    return http(this.baseUrl, "POST", params);
  }
}

export default Curd;
