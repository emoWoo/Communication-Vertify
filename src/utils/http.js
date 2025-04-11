// Desc: http请求封装
import router from "@/router";
const http = async (url, method, data = {}, headers = {}) => {
  console.log(url);

  const token = localStorage.getItem("token");

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (method === "POST") {
    headers["content-type"] = "application/json";
  }

  const options = {
    method,
    headers: { ...headers },
  };

  if (method === "POST") {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      if (response.status === 401) {
        // 清除本地 token
        localStorage.removeItem("token");

        // 跳转登录页
        router.push("/");
      }
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    console.log("Response:", result);
    return result;
  } catch (error) {
    console.log("http error", error);
    throw error;
  }
};

export default http;
