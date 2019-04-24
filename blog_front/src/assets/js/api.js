import axios from 'axios';

const Instance = axios.create({
  baseURL: 'http://localhost:9999'
})
let Http = {};
Http.post = bizData => new Promise((resolve, reject) => {
  const {url, data} = bizData;
  Instance.post(url, data)
  .then(response => {
    resolve(response.data);
  })
  .catch(error => reject(error)); 
})
export default Http;