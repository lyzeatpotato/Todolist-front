import axios from 'axios';
import QS from "qs";
//1. 创建新的axios实例，
const service = axios.create({
    // // 公共接口
    baseURL: '/api/shuhistorytest', // url = base url + request url
    // 超时时间 单位是ms，这里设置了3s的超时时间
    timeout: 3 * 1000
  })

service.interceptors.request.use(config => {
  // config.headers.post['Content-Type'] = 'multipart/form-data' ;
  // //  if (localStorage.getItem('user_token')) {
  // //   config.headers.token = localStorage.getItem('user_token');
  // //  }
  //   config.headers.token = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwic3ViIjoicm9vdCIsImlzcyI6IndzZyIsImlhdCI6MTY4NDQ4NjExOSwiZXhwIjoxNjg3MDc4MTE5fQ.4esZYgiihn5bpD8rkG4_RH0e0bu2nTiRk-aQdQ76F5c';
    return config;
  },error => {
    console.log(error)
    return 'token failed';
  });

service.interceptors.response.use(
  response => {   
      // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
      // 否则的话抛出错误
      if (response.status === 200) {   
          // if(response.data.code === 0) {
              // console.log(response.data)
              return Promise.resolve(response.data);        
          // }
          // else {
          //     return Promise.reject(response.data);        
          // }         
      } else {            
          return Promise.reject(response);        
      }    
  },  
  error => {
      // if (error.response.status) {
      //     switch(error.response.status) {
              // case 401:
              //     break
              // default:

      //     }
      // }
    return Promise.reject(error);
  });


/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
 export function get(url, params){    
  return new Promise((resolve, reject) =>{        
    service.get(url, {            
          params: params        
      }).then(res => {
          resolve(res.data);
      }).catch(err =>{
          reject(err.data)        
  })    
});}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
 export function post(url, params) {
  return new Promise((resolve, reject) => {
    service.post(url, QS.stringify(params))
      .then(res => {
          resolve(res.data);
      })
      .catch(err =>{
          reject(err.data)
      })
  });
}

export default service;



