import { getRandomJsObject } from './hotelObject.js';
const NUMBER_OBJEKT_JS = 1;
const arrayTenRandomHjtelObject = Array.from({length:NUMBER_OBJEKT_JS}, getRandomJsObject);
const CARD = document.querySelector('#card').content;

const getAd = function(numArrayAd){
  const ArrayAd = arrayTenRandomHjtelObject[numArrayAd];
  const [author, offer]=  ArrayAd;
  const cloneForm = CARD.cloneNode(true);
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
  avatar.src=author.avatar;
};
getAd(0);
