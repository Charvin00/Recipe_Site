
export const getMessage = () => {
  
    return fetch(`/new-message`, {
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
    return fetch(`/post-message`, {
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
      return Promise.reject({ code: 'something is wrong', err: response.statusText });
    })
  };

  export const newUser = (user) => {
    return fetch(`/post-user`, {
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
      return Promise.reject({ code: 'something is wrong', err: response.statusText });
    })
  };

  export const deleteUser = (user) => {
    console.log('test2222: ' + user)
    return fetch(`/delete-user`, {
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
      return Promise.reject({ code: 'something is wrong', err: response.statusText });
    })
  };

  export const fetchMessage = (messageId) => {
    console.log("test 11: " + messageId);
    return fetch(`/fetch-message`, {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify({messageId})
    })
    .catch( err => Promise.reject({ code: 'network', err }) )
    .then( response => {
      if(response.ok) {
        return response.json();
      }
      return Promise.reject({ code: 'something is wrong', err: response.statusText });
    })
  };