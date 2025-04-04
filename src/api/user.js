import Curd from "@/utils/curd";

class UserApi extends Curd {
  login(data){
    return this.post(data)
  }
}

const userApi = new UserApi('login')

export default userApi