import {getfilterSelectedText}from './hotel-popup.js';
const formMapFilter = document.querySelector('.map__filters');
const housingType = formMapFilter.querySelector('#housing-type');
const price = formMapFilter.querySelector('#housing-price');
const room = formMapFilter.querySelector('#housing-rooms');
const guest = formMapFilter.querySelector('#housing-guests');
const TIME_TIMEOUT_FILTER = 500;
const DEFAULT_FILTER_VALUE = 'any';
const PRICE_VALUE_LOW = 'low';
const PRICE_VALUE_MIDDLE = 'middle';
const PRICE_VALUE_HIGH = 'high';
const PRISE_FILTER_LOW = 10000;
const PRISE_FILTER_HIGH = 50000;
const NOTATION = 10;
const FEATURES_MIN_LENGTH = 1;

let timeoutId;

const debounce = (cb, timeoutDelay) => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(cb, timeoutDelay);
};
const getNumber = (string) => {
  let array = string.split(' ');
  array = array.filter((element) => {
    if( !isNaN(element) ) {
      return true;
    }
  });
  return array;
};
const isHouseNotDefult = () => housingType.value !== DEFAULT_FILTER_VALUE;
const getHouseElement = (element) => element[1].querySelector('.popup__type').textContent;
const isHouseCondition = (houseElement) => houseElement === getfilterSelectedText(housingType);
const filterHouseCondition = (element) => isHouseCondition(getHouseElement(element));
const getTypeHouse  = (array) => {
  if(isHouseNotDefult()) {
    array = array.filter(filterHouseCondition);
    return array;
  }
  return array;
};
const isPriceLow = () => price.value === PRICE_VALUE_LOW;
const isPriceMiddle = () => price.value === PRICE_VALUE_MIDDLE;
const isPriceHigh = () => price.value === PRICE_VALUE_HIGH;
const getPriceElement = (element) => element[1].querySelector('.popup__text--price').textContent;
const getPriceLowCondition = (priceElement) => parseInt (priceElement, NOTATION) <= PRISE_FILTER_LOW;
const getPriceMiddleCondition = (priceElement) => PRISE_FILTER_LOW <= parseInt( priceElement, NOTATION )
&& parseInt( priceElement, NOTATION) <= PRISE_FILTER_HIGH;
const getPriceHighCondition = (priceElement) => parseInt( priceElement, NOTATION ) > PRISE_FILTER_HIGH;
const getPriceCondition = (element, priceCondition) => priceCondition(getPriceElement(element));
const filterPriceConditionLow = (element) => getPriceCondition(element, getPriceLowCondition);
const filterPriceConditionMiddle = (element) => getPriceCondition(element, getPriceMiddleCondition);
const filterPriceConditionHigh = (element) => getPriceCondition(element, getPriceHighCondition);
const getPrice = (array, examination, filterPrice) => {
  if(examination()) {
    array = array.filter(filterPrice);
    return array;
  }
  return array;
};
const isRoomDefult = () => room.value !== DEFAULT_FILTER_VALUE;
const getRoomElement = (element) => getNumber(element[1].querySelector('.popup__text--capacity').textContent);
const getRoomCondition = (roomElement) => room.value === roomElement[0];
const filterRoom = (element) => getRoomCondition(getRoomElement(element));
const getRoom = (array) => {
  if( isRoomDefult()){
    array = array.filter(filterRoom);
    return array;
  }
  return array;
};
const isGuestDefult = () => guest.value !== DEFAULT_FILTER_VALUE;
const getGuestElement = (element) => getNumber(element[1].querySelector('.popup__text--capacity').textContent);
const getGeustCondition = (guestElement) => guest.value === guestElement[1];
const filterGuest = (element) => getGeustCondition(getGuestElement(element));
const getGuest = (array) => {
  if(isGuestDefult()){
    array = array.filter(filterGuest);
    return array;
  }
  return array;
};
const isFeatureExist = (features) => features.length >= FEATURES_MIN_LENGTH;
const featuresPopups = (element) => element[1].querySelectorAll('.popup__feature');
const getRankFeatures = (element, features) => {
  let rank = 0;
  features.forEach((elementFeatures) => {
    for( const elementPopup of featuresPopups(element)) {
      if( `popup__feature--${elementFeatures.value}` === elementPopup.classList[1] ) {
        rank+=1;
      }
    }
  });
  return rank;
};
const getFeaturesCondition = (element, features) => getRankFeatures(element, features) === features.length;
const getFeatures = (array) => {
  const features = formMapFilter.querySelectorAll('input[type="checkbox"]:checked');
  if(isFeatureExist(features)){
    array = array.filter((element) => getFeaturesCondition(element, features));
    return array;
  }
  return array;
};

const getMarkerFilter = (arrayElements) => arrayElements.then((array) => {
  array = getTypeHouse(array);
  return array;
})
  .then((array) => {
    array = getPrice(array, isPriceLow, filterPriceConditionLow);
    array = getPrice(array, isPriceMiddle, filterPriceConditionMiddle);
    array = getPrice(array, isPriceHigh, filterPriceConditionHigh);
    return array;
  })
  .then((array) => {
    array = getRoom(array);
    return array;
  })
  .then((array) => {
    array = getGuest(array);
    return array;
  })
  .then((array) => {
    array = getFeatures(array);
    return array;
  });

const changeMapFilter = (getMapMarker, arrayElements) => {
  formMapFilter.addEventListener('change', () => {
    const mapMarkerFilter  = getMarkerFilter(arrayElements);
    debounce (() => {getMapMarker(mapMarkerFilter);}, TIME_TIMEOUT_FILTER);
  });
};
export{changeMapFilter};
