import {getActive, getDisabled} from './switching.js';
import {getData} from './api.js';
import {onSuccess, onError}from './hotel-popup.js';
import {changeMapFilter}from './map-filter.js';
const MAP_ZOOM = 10;
const MAIN_MARKER_LAT = 35.69410994928452;
const MAIN_MARKER_LNG = 139.75982666015628;
const AMOUNT_MARKER_ON_MAP = 10;
getDisabled ( );
const arrayElements = Promise.resolve(getData( onSuccess, onError));
const address = document.querySelector('#address');

const map = L.map('map-canvas')
  .setView({
    lat: MAIN_MARKER_LAT,
    lng: MAIN_MARKER_LNG
  }, MAP_ZOOM);

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
    lat: MAIN_MARKER_LAT,
    lng: MAIN_MARKER_LNG,
  },
  {
    draggable: true,
    icon: mainIcon,
  },
);
const markerGroup = L.layerGroup().addTo(map);

map.addEventListener('load', getActive());
mainMarker.addTo(map);
address.value = `Lat ${MAIN_MARKER_LAT.toFixed(5)}  Lng ${MAIN_MARKER_LNG.toFixed(5)}`;

const getMapMarker = (arrayElement) => {
  markerGroup.clearLayers();
  mainMarker.setLatLng({
    lat: MAIN_MARKER_LAT,
    lng: MAIN_MARKER_LNG,
  });
  map.setView({
    lat: MAIN_MARKER_LAT,
    lng: MAIN_MARKER_LNG
  }, MAP_ZOOM);
  address.value = `Lat ${MAIN_MARKER_LAT.toFixed(5)}  Lng ${MAIN_MARKER_LNG.toFixed(5)}`;
  if (arrayElement === undefined){
    arrayElement = arrayElements;
  }
  arrayElement.then( (array) => {
    const mapMarkerArray = array.slice(0, AMOUNT_MARKER_ON_MAP);
    for(let i = 0; i < mapMarkerArray.length; i++ ) {
      const marker = L.marker(
        {
          lat: mapMarkerArray [i][0].lat,
          lng: mapMarkerArray [i][0].lng,
        },
        {
          icon: adIcon,
        },
      );
      marker.addTo(markerGroup)
        .bindPopup(mapMarkerArray[i][1]);
    }
  });
};
getMapMarker (arrayElements);
mainMarker.on( 'moveend', (evt) => {
  address.value = `Lat ${evt.target.getLatLng().lat.toFixed(5)}  Lng ${evt.target.getLatLng().lng.toFixed(5)}`;
});
changeMapFilter(getMapMarker, arrayElements);

export{getMapMarker};
