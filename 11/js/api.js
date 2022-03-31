import {onRemoveMassage} from'./formValidation.js';
const getData = (onSuccess, onError)=>{
  return fetch(
'https://25.javascript.pages.academy/keksobooking/data',
  {
    method:'GET',
    credentials: 'same-origin',
  },
)
  .then((response)=>{
    if(response.ok){
    return response.json()
    }
    throw new Error(`${response.status} ${response.statusText}`)
  }
    )
  .then((data)=>{
   return onSuccess(data)
  })
  .catch((err)=>{
    onError(err)
})
}

const getSubmit = (onSaccessSubmit, onErrorSubmite, form, buttonSubmit,pristine)=>{
form.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  buttonSubmit.disabled=true;
  const isValid = pristine.validate();
if (isValid){
  const formData = new FormData(evt.target);
  fetch(
    'https://25.javascript.pages.academy/keksobooking',
  {
    method:'POST',
   body: formData,
  }
)
  .then(()=>{
    onSaccessSubmit(onRemoveMassage)
  })
  .catch((err)=>{
   onErrorSubmite(err,onRemoveMassage)

  });
}
});
};
export{getData, getSubmit}
