import axios from 'axios';

const http = axios.create({
  withCredentials: true,
});

export class RestClient {
  request(url, method, params, data) {
    const headers = {};
    return http.request({
      method, url, params, data, headers,
    });
  }
}
