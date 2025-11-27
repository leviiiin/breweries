'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const icon = L.icon({
  iconUrl: '/marker-icon.png',
  iconSize: [40, 40],
  iconAnchor: [12, 41],
});

interface Props {
  latitude: number;
  longitude: number;
  name: string;
}

export default function BreweryMap({ latitude, longitude, name }: Props) {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      scrollWheelZoom={false}
      className="w-full h-72 rounded-lg overflow-hidden shadow"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={[latitude, longitude]} icon={icon}>
        <Popup>{name}</Popup>
      </Marker>
    </MapContainer>
  );
}
