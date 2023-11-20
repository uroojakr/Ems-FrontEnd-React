import axios from "axios"

export const deleteData = async (path) => {
    const api = `https://localhost:7295/${path}`
    try {
        const authToken = localStorage.getItem('token');
        const response = await axios.delete(api, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            }
        })
        return response;
    } catch (err) {
        throw err
    }
}