import axios from 'axios'
import { baseURL } from './config'

const instance = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});
export const getProduct = () => instance.get(baseURL)
export const postProduct = (params) => instance.post(baseURL,params)
export const putProduct = (id,params) => instance.put(baseURL+'/'+id,params)
export const deleteProduct = (params) => instance.delete(params)