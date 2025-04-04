import Curd from "@/utils/curd";

class CmdApi extends Curd{
    sendcmd(id){
        return this.get(id)
    }
}

const cmdApi=new CmdApi('test')

export default cmdApi