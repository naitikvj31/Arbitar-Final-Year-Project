import axios, { InternalAxiosRequestConfig } from "axios";
import { removeUser } from "../Slices/UserSlice";
import { removeJwt } from "../Slices/JwtSlice";

// Use environment variable for base URL
const baseURL = process.env.NODE_ENV === 'production' 
    ? 'https://arbitar-backend.onrender.com' 
    : 'http://localhost:8080';

const axiosInstance = axios.create({
    baseURL: baseURL
});

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export const setupResponseInterceptor = (navigate: any, dispatch: any) => {
    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response?.status === 401) {
                dispatch(removeUser());
                dispatch(removeJwt());
                navigate('/login');
            }
            return Promise.reject(error);
        }
    )
}

export default axiosInstance;





// import axios, { InternalAxiosRequestConfig } from "axios";
// import { removeUser } from "../Slices/UserSlice";
// import { removeJwt } from "../Slices/JwtSlice";

// const axiosInstance = axios.create({
//     baseURL: 'http://localhost:8080'
// });

// axiosInstance.interceptors.request.use(
//     (config: InternalAxiosRequestConfig) => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// )

// export const setupResponseInterceptor = (navigate: any, dispatch: any) => {
//     axiosInstance.interceptors.response.use(
//         (response) => {
//             return response;
//         },
//         (error) => {
//             if (error.response?.status === 401) {

//                 dispatch(removeUser());
//                 dispatch(removeJwt());
//                 navigate('/login');
//             }
//             return Promise.reject(error);
//         }
//     )
// }

export default axiosInstance;
