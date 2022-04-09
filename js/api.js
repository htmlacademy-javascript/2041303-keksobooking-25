import {onRemoveMessage} from'./form.js';
const getData = (onSuccess, onError) => fetch(
  'https://25.javascript.pages.academy/keksobooking/data',
  {
    method:'GET',
    credentials: 'same-origin',
  },
)
  .then((response) => {
    if(response.ok) {
      return response.json();
    }
    throw new Error (`${response.status} ${response.statusText}`);
  }
  )
  .then((data) => onSuccess(data))
  .catch((err) => {
    onError(err);
  });

const getSubmit = (onSuccessSubmit, onErrorSubmite, formData) => {
  fetch(
    'https://25.javascript.pages.academy/keksobooking',
    {
      method:'POST',
      body: formData,
    }
  )
    .then( () => {
      onSuccessSubmit(onRemoveMessage);
    })
    .catch(( ) => {
      onErrorSubmite(onRemoveMessage);

    });
};
export{getData, getSubmit};
