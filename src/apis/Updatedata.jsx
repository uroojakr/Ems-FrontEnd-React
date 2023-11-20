import axios from "axios"

export const putData = async (path) => {
    const api = `https://localhost:7295/${path}`
    try {
        const authToken = localStorage.getItem('token');
        const response = await axios.get(api, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            }
        })
        return response.data;
    } catch (err) {
        throw err
    }
}