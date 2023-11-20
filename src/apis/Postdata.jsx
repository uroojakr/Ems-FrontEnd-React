import axios from "axios"

export const postData = async (path, data) => {
    const api = `https://localhost:7295/${path}`
    try {
        const authToken = localStorage.getItem('token');
        const response = await axios.post(api, data, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            }
        })
        return response.data;
    } catch (err) {
        throw err
    }
}