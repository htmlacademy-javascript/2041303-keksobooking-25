import { arrayRandomFunctions } from './utilitRandomNum.js';
import { hotelNumbersInfo } from './hotelInfo.js';
const [
  getRandomInteger,
  getRandomFraction,
  getRandomArrayForObject,
  getRandomAuthor,
] = arrayRandomFunctions;
const [
  arrayTyps,
  arrayTims,
  arrayFeatures,
  arrayPhotos,
] = hotelNumbersInfo;

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
    type: arrayTyps[getRandomInteger(0, arrayTyps.length-1)],
    rooms:getRandomInteger(1, 5),
    guests: getRandomInteger(1, 5),
    checkin: arrayTims[getRandomInteger(0, arrayTims.length-1)],
    checkout:arrayTims[getRandomInteger(0, arrayTims.length-1)],
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
