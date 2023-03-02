// import Axios from "axios";
// import * as _ from "lodash";
// const CancelToken = Axios.CancelToken;
// const source = CancelToken.source();
// class ApiRequest {
//   public _axios = Axios.create({
//     cancelToken: source.token,
//   });
//   constructor() {
//     this.setRequestInterceptors();
//     this.setResponseInterceptors();
//   }

//   /**
//    * 设置axios的请求拦截器
//    */
//   setRequestInterceptors() {
//     try {
//       this._axios.interceptors.request.use(
//         async (config: any) => {
//           return config;
//         },
//         (error: any) => {
//           return Promise.reject(error);
//         }
//       );
//     } catch (error) {
//       throw Object.assign(
//         {},
//         { error, details: "Axios interceptor initialization failed." }
//       );
//     }
//   }

//   /**
//    * 设置axios响应的拦截器
//    */
//   setResponseInterceptors() {
//     try {
//       this._axios.interceptors.response.use(
//         (resp) => {
//           let result = { ...resp };
//           return result;
//         },
//         (error) => {
//           return {
//             error: true,
//             status: _.get(error, "response.status"),
//             result:
//               _.get(error, "response.data.error") ||
//               _.get(error, "response.data"),
//           };
//         }
//       );
//     } catch (error) {
//       throw Object.assign(
//         {},
//         { error, details: "Axios interceptor initialization failed." }
//       );
//     }
//   }
// }
// const apiRequest = new ApiRequest();

// export default apiRequest._axios;
