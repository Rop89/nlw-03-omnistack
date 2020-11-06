import React, {useEffect, useState} from "react";
import mapMarkerImg from "../imgs/map-marker.svg";
import { Link } from "react-router-dom";
import { FiArrowRight, FiPlus } from "react-icons/fi";
import "../styles/pages/orphanages-map.css";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import api from "../services/api";
import MapIcon from "../utils/mapIcon";

interface Orphanage {
  id : number;
  latitude: number;
  longitude: number
  name: string
}

function OrphanagesMap() {
  const [orphanages,setOrphanages] = useState <Orphanage[]>([]);

  console.log(orphanages) 

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data)
    })
  }, []); // Primeiro params qual acao a utilizar, Segundo params - Quando


  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>
        <footer>
          <strong>Rio do Sul</strong>
          <span>Santa Catarina </span>
        </footer>
      </aside>
      <Map
        center={[-27.2160932, -49.6435018]}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {orphanages.map(orphanage => {
        return (
          <Marker
          icon = {MapIcon}
          position = {[orphanage.latitude, orphanage.longitude]}
          key={orphanage.id}
          >
            <Popup closeButton = {false} minWidth ={240} maxWidth = {240} className ='map-popup' >
              {orphanage.name} 
              <Link to = {`/orphanages/${orphanage.id}`}>
                <FiArrowRight size={20} color="#FFF"/>
                </Link>
            </Popup>
          </Marker>
        )
      })}
      </Map>
      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
