import Curd from "@/utils/curd";

class LogApi extends Curd {
  getLog(id, params) {
    return this.get(id, params);
  }
}
const logApi = new LogApi('log');
export default logApi;