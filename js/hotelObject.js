import { arrayRandomFunction } from './utilitRandomNum.js';
import { hotelNumberInfo } from './hotelInfo.js';
const [
  getRandomInteger,
  getRandomFraction,
  getRandomArrayForObject,
  getRandomAuthor,
] = arrayRandomFunction;
const [
  arrayType,
  arrayTime,
  arrayFeatures,
  arrayPhotos,
] = hotelNumberInfo;

const getRandomJsObject = ()=> {
  const randomlat = getRandomFraction(35.65000, 35.70000, 5);
  const randomlng = getRandomFraction(139.70000, 139.80000, 5);
  const author = {
    avatar:`img/avatars/user${getRandomAuthor()}.png`
  };
  const offer = {
    title: 'Нашь оффис находится',
    address: `${randomlat} ${randomlng}`,
    price: getRandomInteger(10000,1100000),
    type: arrayType[getRandomInteger(0, arrayType.length-1)],
    rooms:getRandomInteger(1, 5),
    guests: getRandomInteger(1, 5),
    checkin: arrayTime[getRandomInteger(0, arrayTime.length-1)],
    checkout:arrayTime[getRandomInteger(0, arrayTime.length-1)],
    features:getRandomArrayForObject(arrayFeatures),
    description:'описание помещения',
    photos:getRandomArrayForObject(arrayPhotos),

  };
  const location ={
    lat: getRandomFraction(35.65000, 35.70000, 5),
    lng: getRandomFraction(139.70000, 139.80000, 5),
  };
  return [author, offer, location];
};
export{getRandomJsObject};
