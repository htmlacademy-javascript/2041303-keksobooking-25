const form = document.querySelector('.ad-form');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form--invalid',
  successClass: 'ad-form--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error',
});
const title = form.querySelector('#title');

function getValidationTitle (value) {
  return value.length >=30 && value.length <= 100;
}

pristine.addValidator(
  title,
  getValidationTitle,
  'От 30 до 100 символов',
);
const price = form.querySelector('#price');

function getValidationPrice (value) {
  return value<= 100000;
}
pristine.addValidator(
  price,
  getValidationPrice,
  'Максимальное значение — 100 000'
);

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

const buttonSubmit = document.querySelector('.ad-form__submit');
buttonSubmit.disabled=true;
window.onload=buttonSubmit.disabled=false;
form.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  buttonSubmit.disabled=true;
  pristine.validate();
});
