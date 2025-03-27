// Desc: http请求封装
import axios from 'axios'
const http =async (url, method, data={},headers={}) => {
  try{
    const response=await axios({
        url: url,
        method: method,
        data: data,
        headers: {...headers},
    })
    console.log(response)
    return response.data
  }catch(error){
    console.log('http error',error)
    throw error.response?error.response.data:error
  }
}

export default http