import axios from "axios"
const base_url = import.meta.env.VITE_BASE_URL
console.log(base_url);

export const getData = async (resource) => {
    try {
        const res = await axios.get(base_url + resource)
    
        return res
    } catch(e) {
        console.log(e);
        return null
    }
}