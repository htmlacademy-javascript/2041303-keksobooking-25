import { getRandomJsObject } from './infoHotel.js';
const NUMBER_OBJEKT_JS = 1;
const arrayTenRandomHjtelObject = Array.from({length:NUMBER_OBJEKT_JS}, getRandomJsObject);
const CARD = document.querySelector('#card').content;
const PALACE_AD=document.querySelector('.map__canvas');

const getAd = function(numArrayAd){
  const ArrayAd = arrayTenRandomHjtelObject[numArrayAd];
  const [author, offer]=  ArrayAd;

  const cloneForm = CARD.cloneNode(true);
  const headline = cloneForm.querySelector('.popup__title');
  headline.textContent= offer.title;
  const address = cloneForm.querySelector('.popup__text--address');
  address.textContent=offer.address;
  const price = cloneForm.querySelector('.popup__text--price');
  price.textContent = `${offer.price} ${price.childNodes[1].textContent}`;
  const typeHouseObjekt = {
    palace:'Дворец',
    flat:'Квартира',
    house:'Дом',
    bungalow:'Бунгало',
    hotel:'Отель'
  };
  const housing = cloneForm.querySelector('.popup__type');
  housing.textContent=typeHouseObjekt[offer.type];
  const roomAndGuests = cloneForm.querySelector('.popup__text--capacity');
  roomAndGuests.textContent= `${offer.rooms} комнаты для ${offer.guests} гостей`;
  const checkinCheckout = cloneForm.querySelector('.popup__text--time');
  checkinCheckout.textContent=`Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  const features = cloneForm.querySelector('.popup__features');
  const featuresList = cloneForm.querySelectorAll('.popup__feature');
  const arrFeatures = [];
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
  // featuresList.forEach(featuresListItem => {

  //   const featuresPruf= offer.features.some(userFeatures=>{
  //     featuresListItem.classList.contains(`popup__feature--${userFeatures}`);

  //    })
  //   if(!featuresPruf){
  //        featuresListItem.remove();
  //   }
  // }

  const description = cloneForm.querySelector('.popup__description');
  description.textContent = offer.description;

  const photos = cloneForm.querySelector('.popup__photos');
  const photo = cloneForm.querySelector('.popup__photo');
  for(const elem of offer.photos){
    const newFoto = photo.cloneNode(false);
    newFoto.src=elem;
    photos.appendChild(newFoto);
  }
  photo.remove();
  const avatar = cloneForm.querySelector('.popup__avatar');
  avatar.src=author.avatar;
  PALACE_AD.appendChild(cloneForm);
};
getAd(0);
