// import axiosInstance from './ApiSetup';

// export const getAPIDataWithToken = async (endpoint) => {
//   try {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       throw new Error('Token not found');
//     }

//     const response = await axiosInstance.get(endpoint, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error('API GET request failed:', error);
//     throw error;
// };
// }

