import axios from 'axios';

class RequestService {
	constructor() {
		this.config = {
      apiPath:                    'http://192.168.1.100:4000',

      globalConfig: {
        headers: {
          'Content-Type':         'application/json',
          'Accept':               'application/json'
        }
      }
    }
	}
	get(url) {
	  return this._request(url, 'GET')
	}

	post(url, body) {
	  return this._request(url, 'POST', body || {})
	}

	put(url, body) {
	  return this._request(url, 'PUT', body)
	}

	delete(url, body) {
	  return this._request(url, 'DELETE', body)
	}

	_request(url, method, body) {
	  const options = {
	    method: method,
	    headers: this.config.globalConfig.headers,
	    data: JSON.stringify(body),
	  };

	  let full_path = this.config.apiPath + url;

	  return new Promise((resolve, reject) => {
	    axios(full_path, options)
	    .then((response) => {
	      resolve(response.data);
	    })
	    .catch((err) => {
	      reject(err);
	    });
	  });
	}
}

export default new RequestService();