
// ==============recipe rest calls:=============

export const getRecipe = () => {

  return fetch(`/new-recipe`, {
    headers: new Headers({
      'content-type': 'application/json'
    }),
  })
    .catch(err => Promise.reject({ code: 'network', err }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject({ code: 'server is not connected', err: response.statusText });
    })
};


export const newRecipe = (recipe) => {
  return fetch(`/post-recipe`, {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({ recipe })
  })
    .catch(err => Promise.reject({ code: 'network', err }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject({ code: 'server is not connected', err: response.statusText });
    })
};

export const fetchRecipe = (recipeId) => {
  console.log("test 11: " + recipeId);
  return fetch(`/fetch-recipe`, {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({ recipeId })
  })
    .catch(err => Promise.reject({ code: 'network', err }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject({ code: 'server is not connected', err: response.statusText });
    })
};

// ==============user rest calls:=============

export const newUser = (user) => {
  return fetch(`/post-user`, {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({ user })
  })
    .catch(err => Promise.reject({ code: 'network', err }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject({ code: 'server is not connected', err: response.statusText });
    })
};

export const deleteUser = (user) => {
  console.log('test2222: ' + user)
  return fetch(`/delete-user`, {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({ user })
  })
    .catch(err => Promise.reject({ code: 'network', err }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject({ code: 'server is not connected', err: response.statusText });
    })
};

