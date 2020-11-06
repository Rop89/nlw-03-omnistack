import mapMarkerImg from '../imgs/map-marker.svg';
import Leaflet from 'leaflet';

const MapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [0, -60]
  })
  
  export default MapIcon;