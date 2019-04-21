
export const getMessage = () => {
  
    return fetch(`/newMessage`, {
      headers: new Headers({
        'content-type': 'application/json'
      }),
    })
    .catch( err => Promise.reject({ code: 'network', err }) )
    .then( response => {
      if(response.ok) {
        return response.json();
      }
      return Promise.reject({ code: 'something is wrong', err: response.statusText });
    })
  };


  export const newMessage = (message) => {
    return fetch(`/postMessage`, {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify({message})
    })
    .catch( err => Promise.reject({ code: 'network', err }) )
    .then( response => {
      if(response.ok) {
        return response.json();
      }
      return Promise.reject({ code: 'poop', err: response.statusText });
    })
  };

  export const newUser = (user) => {
    return fetch(`/postUser`, {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify({user})
    })
    .catch( err => Promise.reject({ code: 'network', err }) )
    .then( response => {
      if(response.ok) {
        return response.json();
      }
      return Promise.reject({ code: 'poop', err: response.statusText });
    })
  };