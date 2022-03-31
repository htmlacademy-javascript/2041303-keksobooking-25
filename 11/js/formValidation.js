import { addSlider } from './utilitSlaider.js';
import { getMapMarker } from './addMap.js';
import {getSubmit} from './api.js';
const success = document.querySelector('#success').content;
const error = document.querySelector('#error').content;
const placeMassage = document.querySelector("body");
const form = document.querySelector('.ad-form');
const formFilter = document.querySelector('.map__filters');
const reset = form.querySelector('.ad-form__reset')
const title = form.querySelector('#title');
const typeHousOptions = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};
const typeHous = document.querySelector('#type');
const price = form.querySelector('#price');
const roomOptions = {
  '1':['1'],
  '2':['1', '2'],
  '3':['1', '2', '3'],
  '100':['0'],
};
const capacityErrorMassageOptions = {
  '1':' только для 1 гостя',
  '2':' только для 2 гостей или 1 гостя',
  '3':' для 3 гостей, для 2 гостей или 1 гостя',
  '100':'только для фирм',
};
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const buttonSubmit = document.querySelector('.ad-form__submit');
const time = form.querySelector('.ad-form__element--time');
const slaider = form.querySelector('.ad-form__slider');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form--invalid',
  successClass: 'ad-form--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error',
});

function getValidationTitle (value) {
  return value.length >=30 && value.length <= 100;
}

pristine.addValidator(
  title,
  getValidationTitle,
  'От 30 до 100 символов',
);


function getValidationPrice (value) {
  if(value === undefined){
    return false;
  }
  return value>= typeHousOptions[typeHous.value] && value<= 100000;
}
function getPriceErrorMassage () {
  return `От ${typeHousOptions[typeHous.value]} до 100000`;
}
pristine.addValidator(
  price,
  getValidationPrice,
  getPriceErrorMassage,
);

function getValidateCapacity(){
  return roomOptions[roomNumber.value].includes(capacity.value);
}

function getCapacityErrorMassage (){
  return capacityErrorMassageOptions[roomNumber.value];
}

pristine.addValidator(
  capacity,
  getValidateCapacity,
  getCapacityErrorMassage
);

roomNumber.addEventListener('change', ()=>{
  getValidateCapacity();
  pristine.validate(capacity);
});

typeHous.addEventListener('change', ()=>{
  getValidationPrice();
  pristine.validate(price);
});

time.addEventListener('change', (evt)=>{
  const actual = evt.target.value;
  form.querySelector('#timein').value=actual;
  form.querySelector('#timeout').value=actual;
});

buttonSubmit.disabled=true;
window.onload=buttonSubmit.disabled=false;
addSlider(slaider, price,typeHousOptions, typeHous);

function onSaccessSubmit(cb){
  const successClone = success.cloneNode(true);
  const successMassage = successClone.querySelector('.success');
  placeMassage.appendChild(successMassage);
  cb(successMassage,successMassage);
  form.reset();
  formFilter.reset();
  price.value= 1000;
  getMapMarker()
 }
function onRemoveMassage (place){
  place.addEventListener('click', ()=>{
    place.remove();
    document.removeEventListener('keydown', onRemoveMassage);
  })
  const button = place.querySelector('button')
  if(button!== null){
  button.addEventListener('click', ()=>{
    place.remove();
  document.removeEventListener('keydown', onRemoveMassage);
  })}
  document.addEventListener('keydown', (evt)=>{
    if(evt.key==='Escape'){
      evt.preventDefault();
      place.remove();
      document.removeEventListener('keydown', onRemoveMassage);
     }
    })
}
function onErrorSubmite (err, cb){
console.log(err)
  const errorClone = error.cloneNode(true);
  const errorMassage = errorClone.querySelector('.error');
  placeMassage.appendChild(errorMassage);
  cb(errorMassage);
}
reset.addEventListener('click', (evt)=>{
  evt.preventDefault();
  form.reset();
  formFilter.reset();
  price.value= 1000;
  getMapMarker()
})
getSubmit(onSaccessSubmit, onErrorSubmite, form, buttonSubmit,pristine)
export{onRemoveMassage};
