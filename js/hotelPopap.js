import { getRandomJsObject } from './hotelObject.js';
const card = document.querySelector('#card').content;

const checkFillingText = function(...checkElemrnt){
  checkElemrnt.forEach((element)=>{
    if(element.textContent.length === 0){
      element.classList.add('hidden');
    }
  });
};
const checkFeatures = function(checkElemrnt){
  if(checkElemrnt.children.length === 0 ){
    checkElemrnt.classList.add('hidden');
  }
};

const checkPhotos = function(checkElemrnt){
  const elementColection = checkElemrnt.children;
  for(const element of elementColection){
    if(element.src === document.location.href ||
    element.src === null ){
      element.classList.add('hidden');
    }
  }
};
const getAds = function S(num){
  const adForms = [];
  const arrayTenRandomHjtelObject = Array.from({length:num}, getRandomJsObject);

  const getAdForm = function(numArrayAd){
    const ArrayAd = arrayTenRandomHjtelObject[numArrayAd];
    const [author, offer]=  ArrayAd;
    const cloneForm = card.cloneNode(true);
    const headline = cloneForm.querySelector('.popup__title');

    const address = cloneForm.querySelector('.popup__text--address');
    const price = cloneForm.querySelector('.popup__text--price');
    const typeHouseObjekt = {
      palace:'Дворец',
      flat:'Квартира',
      house:'Дом',
      bungalow:'Бунгало',
      hotel:'Отель'
    };
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
    featuresList.forEach((featuresListItem) => {
      for( const element of offer.features)
      {if (featuresListItem.classList[1]===(`popup__feature--${element}`)){
        arrFeatures.push(featuresListItem);
      }}
    });
    for(const elem of featuresList){
      elem.remove();
    }
    for(const elem of arrFeatures){
      features.appendChild(elem);
    }
    description.textContent = offer.description;
    for(const elem of offer.photos){
      const newFoto = photo.cloneNode(false);
      newFoto.src=elem;
      photos.appendChild(newFoto);
    }
    photo.remove();
    avatar.src = author.avatar;
    checkFillingText(headline, address, price, housing, roomAndGuests, checkinCheckout, description);
    checkFeatures(features);
    checkPhotos(photos);
    return cloneForm;
  };
  arrayTenRandomHjtelObject.forEach( (element,index)=>{
    adForms.push(getAdForm(index));
  });

  return adForms;
};
export{getAds};
