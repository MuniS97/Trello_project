import axios from "axios"

const base_url = import.meta.env.VITE_BASE_URL

export async function getData(path) {
    try {
        const res = await axios.get(base_url + path)

        return res
    } catch(e) {
        console.log(e);
    }
}
export async function postData(path, body) {
    try {
        const res = await axios.post(base_url + path, body)

        return res
    } catch(e) {
        console.log(e);
    }
}
export async function patchData(path, body) {
    try {
        const res = await axios.patch(base_url + path, body)
        console.log(res);
        return res
    } catch(e) {
        console.log(e);
    }
}
export async function deleteData(path, id) {
    try {
        const res = await axios.delete(base_url + path + id)

        return res
    } catch(e) {
        console.log(e);
    }
}
