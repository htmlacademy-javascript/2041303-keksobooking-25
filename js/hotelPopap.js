import {getDisabledFilter} from './switchingModes.js';
const card = document.querySelector('#card').content;
const typeHouseObjekt = {
  palace:'Дворец',
  flat:'Квартира',
  house:'Дом',
  bungalow:'Бунгало',
  hotel:'Отель'
};
function getfilterSelectedText (selected){
  return typeHouseObjekt [selected.value];
}
const checkFillingText = (...checkElemrnt)=>{
  checkElemrnt.forEach((element)=>{
    if(element.textContent.length === 0){
      element.classList.add('hidden');
    }
  });
};

const checkFeatures = (checkElemrnt)=>{
  if(checkElemrnt.children.length === 0 ){
    checkElemrnt.classList.add('hidden');
  }
};

const checkPhotos = (checkElemrnt)=>{
  const elementColection = checkElemrnt.children;
  for(const element of elementColection) {
    if( element.src === document.location.href ||
    element.src === null ) {
      element.classList.add('hidden');
    }
  }
};

const getAdForm = (successObject)=>{
  const arrayAd = successObject;
  const {author, offer, location} = arrayAd;
  const formForMapMarker = [];
  const cloneForm = card.cloneNode(true);
  const headline = cloneForm.querySelector('.popup__title');
  const address = cloneForm.querySelector('.popup__text--address');
  const price = cloneForm.querySelector('.popup__text--price');
  const housing = cloneForm.querySelector('.popup__type');
  const roomAndGuests = cloneForm.querySelector('.popup__text--capacity');
  const checkinCheckout = cloneForm.querySelector('.popup__text--time');
  const features = cloneForm.querySelector('.popup__features');
  const featuresList = cloneForm.querySelectorAll('.popup__feature');
  const arrFeatures = [];
  const description = cloneForm.querySelector('.popup__description');
  const photos = cloneForm.querySelector('.popup__photos');
  const photo = cloneForm.querySelector('.popup__photo');
  const avatar = cloneForm.querySelector('.popup__avatar');
  headline.textContent= offer.title;
  address.textContent=offer.address;
  price.textContent = `${offer.price} ${price.childNodes[1].textContent}`;
  housing.textContent=typeHouseObjekt[offer.type];
  roomAndGuests.textContent= `${offer.rooms} комнаты для ${offer.guests} гостей`;
  checkinCheckout.textContent=`Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  if(offer.features!==undefined){
    featuresList.forEach((featuresListItem)=>{
      for( const element of offer.features ) {
        if ( featuresListItem.classList[1] === (`popup__feature--${element}`) ) {
          arrFeatures.push(featuresListItem);
        }}
    });
  }
  for( const elem of featuresList ) {
    elem.remove();
  }
  for( const elem of arrFeatures ) {
    features.appendChild(elem);
  }
  description.textContent = offer.description;
  if( offer.photos !== undefined ) {
    offer.photos.forEach((element)=>{
      const newFoto = photo.cloneNode(false);
      newFoto.src = element;
      photos.appendChild(newFoto);
    });
  }
  photo.remove();
  avatar.src = author.avatar;
  checkFillingText(headline, address, price, housing, roomAndGuests, checkinCheckout, description);
  checkFeatures(features);
  checkPhotos(photos);
  formForMapMarker.push(location);
  formForMapMarker.push(cloneForm);
  return formForMapMarker;
};

const onSuccess = (data)=>{
  const adForms = [];
  for( const element of data ) {
    adForms.push(getAdForm(element) );
  }
  return adForms;
};

const onError = (err)=>{
  const ALERT_SHOW_TIME = 10000;
  const map = document.querySelector('.map__canvas');
  const placeError = document.createElement('div');
  placeError.style.display='flex';
  placeError.style.justifySelf='center';
  placeError.style.position='fixed';
  placeError.style.width = '1150px';
  placeError.style.border = '2px solid red';
  placeError.style.margin = '20px';
  placeError.style.padding='30px';
  placeError.style.fontFamily='"Roboto", "Arial", sans-serif';
  placeError.style.fontSize= '22px';
  placeError.style.textAlign= 'center';
  placeError.style.fontWeight='700';
  placeError.style.overflow='auto';
  placeError.style.zIndex='999999';
  placeError.textContent=`Произошла ошибка загрузки маркеров ${err}`;
  getDisabledFilter();
  map.appendChild(placeError);
  setTimeout(()=>{
    placeError.remove();
  }, ALERT_SHOW_TIME);

};

export{onSuccess, onError, getfilterSelectedText};


