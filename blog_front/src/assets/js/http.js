import axios from 'axios';

const Instance = axios.create({
  // baseURL: 'http://localhost:9999',
  baseURL: 'http://localhost:80'  //ngnix反向代理
})
let Http = {};
Http.post = bizData => new Promise((resolve, reject) => {
  const { url, data } = bizData;
  Instance.post(url, data)
    .then(response => {
      resolve(response.data);
    })
    .catch(error => reject(error));
})

Http.get = (bizData) => new Promise((resolve, reject) => {
  const { url, data } = bizData;
  Instance.get(url, {
    params: data
  })
    .then(function (response) {
      resolve(response.data);
    })
    .catch(function (error) {
      reject(error);
  });
})
export default Http;