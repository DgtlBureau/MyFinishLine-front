"use client";

import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";

const Map = ({ coordinates }: { coordinates: any }) => {
  return (
    <MapContainer
      center={coordinates[0]}
      zoom={5}
      scrollWheelZoom={true}
      className="w-full h-full z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={coordinates} color="blue" />
      {coordinates?.length &&
        coordinates.map((coordinate) => (
          <Marker key={coordinate} position={coordinate}></Marker>
        ))}
    </MapContainer>
  );
};

export default Map;
