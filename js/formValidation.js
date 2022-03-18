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
const typeHousOptions = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};
const typeHous = document.querySelector('#type');
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
  if(value === undefined){
    return false;
  }
  return value>= typeHousOptions[typeHous.value] && value<= 100000;
}
function getPriceErrorMassage (value) {
  return `От ${typeHousOptions[typeHous.value]} до 100000`;
}
pristine.addValidator(
  price,
  getValidationPrice,
  getPriceErrorMassage,
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

typeHous.addEventListener('change', ()=>{
  getValidationPrice();
  pristine.validate(price);
});

const time = document.querySelector('.ad-form__element--time');
const timein = document.querySelector('#timein');
const timeout = document.querySelector('#timeout');
const timeinCollection = timein.children;
const timeoutCollection = timeout.children;

time.addEventListener('change', (evt)=>{
  const index = evt.target.selectedIndex;
  for( const element of timeinCollection ){
    element.removeAttribute('selected');
  }
  for(const element of timeoutCollection){
    element.removeAttribute('selected');
  }
  timeoutCollection[index].setAttribute('selected', 'selected');
  timeinCollection[index].setAttribute('selected', 'selected');
  console.log(timeoutCollection[index]);
  console.log(timeinCollection[index]);
});

const buttonSubmit = document.querySelector('.ad-form__submit');
buttonSubmit.disabled=true;
window.onload=buttonSubmit.disabled=false;
form.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  buttonSubmit.disabled=true;
  pristine.validate();
});
