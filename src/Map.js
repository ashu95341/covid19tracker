import React from "react";
import "./Map.css";
import { MapContainer as LeafletMap } from "react-leaflet";
import {TileLayer as OurLayer} from 'react-leaflet';
// import MapContainer from "react-leaflet"

function Map({ center, zoom }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <OurLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </LeafletMap>
    </div>
  );
}

export default Map;
