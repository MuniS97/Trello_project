import axios from 'axios'
const base_url = 'http://localhost:8080'

export const getData = async (resource) => {
  const res = await axios.get(base_url + resource)

  return res
}

export const postData = async (resource, body) => {
  const res = await axios.post(base_url + resource, body)

  return res
}

export const editData = async (resource, body) => {
  const res = await axios.patch(base_url + resource, body)
}

export const removeData = async (body) => {
  const res =  await axios.delete(base_url + body)
}