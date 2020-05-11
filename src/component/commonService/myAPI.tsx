import axios from 'axios'

const baseURL = '/api';

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {"content-type": "application/json; charset=utf-8"}
});

axiosInstance.interceptors.request.use((request) => {
    if(sessionStorage.getItem('token')) {
        request.headers['x-token'] = "Bearer " + sessionStorage.getItem('token');
    }
    return request;
})

// axiosInstance.interceptors.response.use(response => {
//     return response;
// }, err => {
//     return new Promise((resolve, reject) => {
//         const originalReq = err.config;
//         if ( err.response.status === 401 && sessionStorage.getItem('token'))
//         {
//             originalReq._retry = true;

//             let res = fetch(baseURL + '/public/refresh', {
//                 method: 'POST',
//                 cache: 'no-cache',
//                 credentials: 'same-origin',
//                 headers: {
//                     'content-Type': 'application/json',
//                 },
//                 redirect: 'follow',
//                 referrer: 'no-referrer',
//                 body: sessionStorage.getItem("token"),
//             }).then(response => response.json()).then (response => {
//                 if(response.token) {
//                     sessionStorage.setItem('token', response.token);
//                     originalReq.headers['x-token'] = response.token;
//                     return axios(originalReq);
//                 }
//             });


//             resolve(res);
//         }


//         return Promise.reject(err);
//     });
// });
export default axiosInstance;