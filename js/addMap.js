import {getActive, getDisabled} from './switchingModes.js';
import {getData} from './api.js';
import {onSuccess, onError}from './hotelPopap.js';
getDisabled( );
const arrayElements = Promise.resolve(getData(onSuccess, onError));
console.log(arrayElements)
const address = document.querySelector('#address');
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
  iconSize: [40, 40],
  iconAnchor: [20, 40],
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
address.value = `Lat ${35.69410994928452.toFixed(5)}  Lng ${139.75982666015628.toFixed(5)}`;
function getMapMarker (){
  mainMarker.setLatLng({
    lat: 35.69410994928452,
    lng: 139.75982666015628,
  });
  map.setView({
    lat: 35.69410994928452,
    lng: 139.75982666015628
  }, 10);
  address.value = `Lat ${35.69410994928452.toFixed(5)}  Lng ${139.75982666015628.toFixed(5)}`;
  arrayElements.then((array)=>{
    for(let i = 0; i < array.length; i++ ) {
      const marker = L.marker(
        {
          lat: array[i][0].lat,
          lng: array[i][0].lng,
        },
        {
          icon: adIcon,
        },
      );
      marker.addTo(markerGroup)
        .bindPopup(array[i][1]);
    }
  });
}
getMapMarker();
mainMarker.on('moveend', (evt)=>{
  address.value = `Lat ${evt.target.getLatLng().lat.toFixed(5)}  Lng ${evt.target.getLatLng().lng.toFixed(5)}`;
});
export{getMapMarker};