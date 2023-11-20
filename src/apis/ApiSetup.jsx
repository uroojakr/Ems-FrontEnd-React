import axios from "axios";

const instance = axios.create({
    baseURL: 'https://localhost:7295/api/',
    headers: {
        'Content-Type': 'application/json'
    }
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
 export default instance;
// export async function HandleAPI(apiUrl, method, token, data) {
//     const config = {
//         method: method,
//         url: apiUrl,
//         data: data,
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     }
 
//     try {
//         const response = await axios(config);
//         return response.data
//     }
//     catch (err) {
//         console.error('API Request Error:', err.response.status, err.response.data);
//         throw (err.response.data)
//     }
// }

// export default HandleAPI;