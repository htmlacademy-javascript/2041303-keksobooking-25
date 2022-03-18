
const AD_FORM = document.querySelector('.ad-form');
const MAP_FILTER = document.querySelector('.map__filters');
const getDisabled = function(){
  AD_FORM.classList.add('ad-form--disabled');
  const adFormFieldsetList = AD_FORM.querySelectorAll('fieldset');
  for(const elem of adFormFieldsetList){
    elem.disabled=true;
  }
  MAP_FILTER.classList.add('map__filters--disabled');
  const mapFilterFieldsetList = MAP_FILTER.children;
  for(const elem of mapFilterFieldsetList){
    elem.disabled=true;
  }
};
getDisabled();

const getActive = function(){
  AD_FORM.classList.remove('ad-form--disabled');
  const adFormFieldsetList = AD_FORM.querySelectorAll('fieldset');
  for(const elem of adFormFieldsetList){
    elem.disabled=false;
  }
  MAP_FILTER.classList.remove('map__filters--disabled');
  const mapFilterFieldsetList = MAP_FILTER.children;
  for(const elem of mapFilterFieldsetList){
    elem.disabled=false;
  }
};
getActive();
