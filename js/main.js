/* eslint-disable no-template-curly-in-string */

function getRandomInteger (min, max){
  if (max< min ) {
    throw RangeError('не допустимое значение параметра max');
  }
  if(min < 0){
    throw RangeError('не допустимое значение параметра min');
  }

  return Math.floor(((Math.random()*(max-min))+min));

}
getRandomInteger(7, 13);

const getRandomFraction = function (min, max, fractionLength ){
  if (max< min ) {
    throw RangeError('не допустимое значение параметра max');
  }
  if(min < 0){
    throw RangeError('не допустимое значение параметра min');
  }

  return +((Math.random()*(max-min))+min).toFixed(fractionLength);
};
getRandomFraction(5, 16, 7);


const flagArayAvatarsRandomNum=[];

function getNonRepeatingNum (){
  const result = getRandomInteger(1,11);
  if(flagArayAvatarsRandomNum.includes(result) === false){
    flagArayAvatarsRandomNum.push(result);
    return result;
  }
  return getNonRepeatingNum();
}

function getRandomArrayForObject (array){
  const flagArray = [];
  const randomLength = getRandomInteger(0, array.length);
  function getNonRepeatNum (){
    const result = getRandomInteger(0, array.length);
    if(flagArray.includes(result)===false){
      return result;
    }
    return getNonRepeatNum();
  }

  for (let i = 0; i<= randomLength; i++){
    flagArray.push(array[getNonRepeatNum()]);
  }

  return flagArray;
}
const getRandomAuthor = ()=>{
  let result= getNonRepeatingNum ();
  if (10>result){
    result = `0${result}`;
    return result;
  }
  return result;
};
const arrayType = [
    'palace',
    'flat',
    'house',
    'bungalow',
    'hotel'
  ];
  const arrayTime = [
    '12:00',
    '13:00',
    '14:00',
  ];
  const arrayFeatures = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner',
  ];
  const arrayPhotos = [

    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  ];
const NUMBER_OBJEKT_JS = 10;
const getRandomJsObject = ()=> {
  const randomlat = getRandomFraction(35.65000, 35.70000, 5);
  const randomlng = getRandomFraction(139.70000, 139.80000, 5);
  const author = {
    avatar:`img/avatars/user${getRandomAuthor()}`
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
const arrayTenRandomObject = Array.from({length:NUMBER_OBJEKT_JS}, getRandomJsObject);
