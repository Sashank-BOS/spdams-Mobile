import Remote from '../Config/remote';

const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: Remote.APP_KEY,
}

class RequestService {

  getRequest(url) {

    let data = fetch(url, {
      headers: HEADERS
    })
      .then(response => {
        return response;
      })
      .catch(error => {
        return error;
      });
    return data;

  }

  postRequest(url, params) {

    let data = fetch(url, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(params),
    })
      .then(response => {
        return response;
      })
      .catch(error => {
        return error;
      });
    return data;
    
  }

  putRequest(url, params) {

    let data = fetch(url, {
      method: 'PUT',
      headers: HEADERS,
      body: JSON.stringify(params),
    })
      .then(response => {
        return response;
      })
      .catch(error => {
        return error;
      });
    return data;

  }

  patchRequest(url, params) {

    let data = fetch(url, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify(params),
    })
      .then(response => {
        return response;
      })
      .catch(error => {
        return error;
      });
    return data;

  }

}

export default new RequestService();
