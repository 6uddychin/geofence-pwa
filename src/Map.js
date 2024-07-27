import React from 'react';
import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ coordinates, onConfirm, onStartOver, onRetake }) => {
  return (
    <div style={{ width: '100vw', height: '50vh' }}>
      <MapContainer center={[coordinates[0].latitude, coordinates[0].longitude]} zoom={13} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {coordinates.length === 4 && (
          <Polygon positions={coordinates.map(coord => [coord.latitude, coord.longitude])}>
            {coordinates.map((coord, index) => (
              <Marker key={index} position={[coord.latitude, coord.longitude]}>
                <Popup>
                  Photo {index + 1}
                  <br />
                  <button onClick={() => onRetake(index)}>Retake Photo {index + 1}</button>
                </Popup>
              </Marker>
            ))}
          </Polygon>
        )}
      </MapContainer>
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onStartOver}>Start Over</button>
    </div>
  );
};

export default Map;