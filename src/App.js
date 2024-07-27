import React, { useState } from 'react';
import PhotoCapture from './PhotoCapture';
import Map from './Map';

const App = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleCapture = (photos) => {
    if (photos.length === 4) {
      setCoordinates(photos.map(photo => ({ latitude: photo.latitude, longitude: photo.longitude })));
      setIsConfirmed(false);
    }
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
    // Handle confirmed bounding box, e.g., save to server
  };

  const handleStartOver = () => {
    setCoordinates([]);
    setIsConfirmed(false);
  };

  const handleRetake = (index) => {
    // Handle retake photo at index
    setIsConfirmed(false);
  };

  return (
    <div>
      <h1>Photo Geo Logger</h1>
      {!isConfirmed && <PhotoCapture onCapture={handleCapture} />}
      {coordinates.length === 4 && !isConfirmed && (
        <Map
          coordinates={coordinates}
          onConfirm={handleConfirm}
          onStartOver={handleStartOver}
          onRetake={handleRetake}
        />
      )}
    </div>
  );
};

export default App;