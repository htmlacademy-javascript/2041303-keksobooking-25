

const getRandomInteger = (min, max)=>{
  if (max< min ) {
    throw RangeError('не допустимое значение параметра max');
  }
  if(min < 0){
    throw RangeError('не допустимое значение параметра min');
  }

  return Math.floor(((Math.random()*(max-min))+min));

};

const getRandomFraction = (min, max, fractionLength )=>{
  if (max< min ) {
    throw RangeError('не допустимое значение параметра max');
  }
  if(min < 0){
    throw RangeError('не допустимое значение параметра min');
  }

  return +((Math.random()*(max-min))+min).toFixed(fractionLength);
};


const flagArayAvatarsRandomNum=[];

const getNonRepeatingNum= ()=>{
  const result = getRandomInteger(1,11);
  if(flagArayAvatarsRandomNum.includes(result) === false){
    flagArayAvatarsRandomNum.push(result);
    return result;
  }
  return getNonRepeatingNum();
};

const getRandomArrayForObject = (array)=>{
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
};
const getRandomAuthor = ()=>{
  let result= getNonRepeatingNum ();
  if (10>result){
    result = `0${result}`;
    return result;
  }
  return result;
};
const arrayRandomFunction = [
  getRandomInteger,
  getRandomFraction,
  getRandomArrayForObject,
  getRandomAuthor,
];
export{arrayRandomFunction};
