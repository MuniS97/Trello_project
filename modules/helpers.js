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