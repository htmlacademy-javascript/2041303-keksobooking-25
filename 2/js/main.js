
function getRandomInteger (rangeStart, rangeEnd){
  let start=0;
  let end = 0;
  let result = 0;
  if (rangeStart> rangeEnd ) {
    start = rangeEnd;
    end = rangeStart;
  }else{
    start = rangeStart;
    end = rangeEnd;
  }
  if(start < 0){
    start =0;
  }

  result = Math.floor(((Math.random()*(end-start))+start));
  return result;
}
getRandomInteger(10, 3);

const getRandomFraction = function (rangeStart, rangeEnd, fractionLength ){
  let start=0;
  let end = 0;
  let result = 0;
  if (rangeStart> rangeEnd ) {
    start = rangeEnd;
    end = rangeStart;
  }else{
    start = rangeStart;
    end = rangeEnd;
  }
  if(start < 0){
    start =0;
  }
  result = ((Math.random()*(end-start))+start);
  result = Number(result.toFixed(fractionLength));
  return result;
};
getRandomFraction(27, -6, 7);
