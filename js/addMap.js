import {getActive, getDisabled} from './switchingModes.js';
import {getAds} from './hotelPopap.js';
getDisabled( );
const adForms = getAds(10);
const address = document.querySelector('#address');
const buttonSubmit = document.querySelector('.ad-form__submit');
const map = L.map('map-canvas')
  .setView({
    lat: 35.69410994928452,
    lng: 139.75982666015628
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const adIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: 35.69410994928452,
    lng: 139.75982666015628,
  },
  {
    draggable: true,
    icon: mainIcon,
  },
);
const markerGroup = L.layerGroup().addTo(map);
map.addEventListener('load', getActive());
mainMarker.addTo(map);
buttonSubmit.addEventListener('submit', ()=>{
  mainMarker.setLatLng({
    lat: 35.69410994928452,
    lng: 139.75982666015628,
  });

  map.setView({
    lat: 35.69410994928452,
    lng: 139.75982666015628
  }, 10);

});
//.clearLayers();
const createMarkers = ()=>{
  mainMarker.on('moveend', (evt)=>{
    address.value = `Lat ${evt.target.getLatLng().lat.toFixed(5)}  Lng ${evt.target.getLatLng().lng.toFixed(5)}`;
  });

  for(let i = 0; i< adForms.length;i++ ){
    const addressPopap = adForms[i].querySelector('.popup__text--address');
    const addressLatLang = addressPopap.textContent.split(' ');
    const marker = L.marker(
      {
        lat:addressLatLang[0],
        lng:addressLatLang[1]
      },
      {
        icon: adIcon,
      },
    );
    marker.addTo(markerGroup)
      .bindPopup(adForms[i]);
  }
};
createMarkers();
