
const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');

const getDisabled = () => {
  adForm.classList.add('ad-form--disabled');
  const adFormFieldsetList = adForm.querySelectorAll('fieldset');
  for( const elem of adFormFieldsetList ) {
    elem.disabled = true;
  }
  mapFilter.classList.add('map__filters--disabled');
  const mapFilterFieldsetList = mapFilter.children;
  for( const elem of mapFilterFieldsetList ) {
    elem.disabled = true;
  }
};

const getActive =  () => {
  adForm.classList.remove('ad-form--disabled');
  const adFormFieldsetList = adForm.querySelectorAll('fieldset');
  for( const elem of adFormFieldsetList ){
    elem.disabled = false;
  }
  mapFilter.classList.remove('map__filters--disabled');
  const mapFilterFieldsetList = mapFilter.children;
  for( const elem of mapFilterFieldsetList ) {
    elem.disabled = false;
  }
};
const getDisabledFilter = () => {
  mapFilter.classList.add('map__filters--disabled');
  const mapFilterFieldsetList = mapFilter.children;
  for( const elem of mapFilterFieldsetList ){
    elem.disabled = true;
  }
};
export{getActive, getDisabled, getDisabledFilter};
