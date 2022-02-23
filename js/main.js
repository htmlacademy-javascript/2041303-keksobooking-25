
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
