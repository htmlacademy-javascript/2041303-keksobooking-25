const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoidGVtbmlnb3IiLCJhIjoiY2wwbWkzMWx5MDJ0eTNrcWk5dmRtc2Q3cSJ9.ijd9ztHpKenzTe2H5DTAbQ'
}).addTo(map);

const AD_FORM = document.querySelector('.ad-form');
const MAP_FILTER = document.querySelector('.map__filters');
const MAP_CONTRY=document.querySelector('#map');
const getDisabled = function(){
  MAP_CONTRY.classList.add('hidden');
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
  MAP_CONTRY.classList.remove('hidden');
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
