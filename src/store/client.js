import axios from 'axios';

const http = axios.create({
  withCredentials: true,
});

export class Client {

  _request(url, method, params, data) {
    const headers = {};
    return http.request({
      baseURL: 'http://localhost:8080/static',
      method, url, params, data, headers,
    }).then((res) => {
      return res.data;
    });
  }

  get(url, params = {}) {
    return this._request(url, 'get', params, {});
  }

  post(url, data = {}) {
    return this._request(url, 'post', {}, data);
  }
}
