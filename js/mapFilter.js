import {getfilterSelectedText}from './hotelPopap.js';
const formMapFilter = document.querySelector('.map__filters');
const housingType = formMapFilter.querySelector('#housing-type');
const price = formMapFilter.querySelector('#housing-price');
const room = formMapFilter.querySelector('#housing-rooms');
const guest = formMapFilter.querySelector('#housing-guests');
const TIME_TIMEOUT_FILTER = 500;
let timeoutId;

const debounce = ( cb, timeoutDelay )=>{
  clearTimeout(timeoutId);
  timeoutId = setTimeout(cb, timeoutDelay);
};
const getNumber = ( string )=>{
  let array = string.split(' ');
  array = array.filter( (element)=>{
    if( !isNaN (element) ) {
      return true;
    }
  });
  return array;
};
const getMarkerFilter = (arrayElements)=>{
  const features = formMapFilter.querySelectorAll('input[type="checkbox"]:checked');
  return arrayElements.then((array)=>{
    if( housingType.value !== 'any') {
      array = array.filter((element)=>{
        const houseElement = element[1].querySelector('.popup__type').textContent;
        if( houseElement === getfilterSelectedText(housingType) ) {
          return true;
        }
      });
      return array;
    }
    return array;
  })
    .then((array)=>{
      if( price.value === 'middle' ) {
        array = array.filter((element)=>{
          const priceElement = element[1].querySelector('.popup__text--price').textContent;
          if ( 10000 <= parseInt( priceElement, 10 ) && parseInt( priceElement, 10) <= 50000 ) {
            return true;
          }
        });
        return array;
      }
      if( price.value === 'low') {
        array = array.filter((element)=>{
          const priceElement = element[1].querySelector('.popup__text--price').textContent;
          if ( parseInt( priceElement, 10 ) <= 10000 ) {
            return true;
          }
        });
        return array;
      }
      if( price.value === 'high') {
        array = array.filter((element)=>{
          const priceElement = element[1].querySelector('.popup__text--price').textContent;
          if ( parseInt( priceElement, 10 ) > 50000 ) {
            return true;
          }
        });
        return array;
      }
      return array;
    })
    .then((array)=>{
      if(room.value !== 'any'){
        array = array.filter((element)=>{
          const roomElement = element[1].querySelector('.popup__text--capacity').textContent;
          const numberRoom = getNumber(roomElement);
          if (room.value === numberRoom[0]){
            return true;
          }
        });
        return array;
      }
      return array;
    })
    .then((array)=>{
      if(guest.value !== 'any') {
        array = array.filter((element)=>{
          const guestElement = element[1].querySelector('.popup__text--capacity').textContent;
          const numberGuest = getNumber(guestElement);
          if (guest.value === numberGuest[1]){
            return true;
          }
        });
        return array;
      }
      return array;
    })
    .then((array) => {
      array = array.filter ( (element)=>{
        if( getRankFeatures(element) === features.length ){
          return true;
        }
      });
      return array;
    });

  function getRankFeatures (element){
    let rank = 0;
    const featuresPopups = element[1].querySelectorAll('.popup__feature');
    features.forEach((elementFeatures)=>{
      for( const elementPopup of featuresPopups ) {
        if( `popup__feature--${elementFeatures.value}` === elementPopup.classList[1] ) {
          rank+=1;
        }
      }
    });
    return rank;
  }
};

const changeMapFilter = (getMapMarker, arrayElements)=>{
  formMapFilter.addEventListener('change', ()=>{
    const mapMarkerFilter  = getMarkerFilter(arrayElements);
    debounce ( ()=>{getMapMarker(mapMarkerFilter);}, TIME_TIMEOUT_FILTER);
  });
};

export{changeMapFilter};
