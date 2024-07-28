import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import html2canvas from 'html2canvas';
import L from 'leaflet';

// Fix marker icon issue by setting default icon path
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Map = ({ userLocation, coordinates, onConfirm, onStartOver, onRetake, zoomIn }) => {
  const mapRef = useRef(null);

  const captureMapImage = async () => {
    if (mapRef.current) {
      const canvas = await html2canvas(mapRef.current);
      const imgData = canvas.toDataURL('image/png');
      return imgData;
    }
  };

  const handleConfirm = async () => {
    const mapImage = await captureMapImage();
    onConfirm(mapImage);
  };

  function CenterMap({ center }) {
    const map = useMap();
    useEffect(() => {
      if (center) {
        map.setView(center, 13);
      }
    }, [center, map]);
    return null;
  }

  function ZoomMap({ zoomIn }) {
    const map = useMap();
    useEffect(() => {
      if (zoomIn) {
        const currentZoom = map.getZoom();
        map.setZoom(currentZoom + 4);
      }
    }, [zoomIn, map]);
    return null;
  }

  return (
    <div>
      <div ref={mapRef} style={{ width: '100vw', height: '50vh' }}>
        <MapContainer center={[userLocation.latitude, userLocation.longitude]} zoom={13} style={{ width: '100%', height: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <CenterMap center={[userLocation.latitude, userLocation.longitude]} />
          <ZoomMap zoomIn={zoomIn} />
          {coordinates.length > 0 && (
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
      </div>
      <button onClick={handleConfirm}>Confirm</button>
      <button onClick={onStartOver}>Start Over</button>
    </div>
  );
};

export default Map;