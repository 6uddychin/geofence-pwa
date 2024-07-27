import React, { useState } from 'react';
import PhotoCapture from './PhotoCapture';
import Map from './Map';
import './App.css';
import amznLogo from './assets/amzn_logo.png'; // Update the path based on your structure

const App = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(1);

  const handleCapture = (photos) => {
    if (photos.length === 4) {
      setCoordinates(photos.map(photo => ({ ...photo, latitude: photo.latitude, longitude: photo.longitude })));
      setIsConfirmed(false);
    }
    setCurrentPhoto(photos.length + 1);
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
    // Handle confirmed bounding box, e.g., save to server
  };

  const handleStartOver = () => {
    setCoordinates([]);
    setIsConfirmed(false);
    setCurrentPhoto(1);
  };

  const handleRetake = (index) => {
    setIsConfirmed(false);
    setCurrentPhoto(index + 1);
  };

  return (
    <div>
      <header>
        <img src={amznLogo} alt="Amazon Logo" />
        <h1>Photo Geo Logger</h1>
      </header>
      {coordinates.length < 4 && !isConfirmed && <h3>Take Photo {currentPhoto} of 4</h3>}
      {!isConfirmed && <PhotoCapture onCapture={handleCapture} />}
      {coordinates.length === 4 && !isConfirmed && (
        <>
          <div className="photo-gallery">
            {coordinates.map((coord, index) => (
              <div key={index}>
                <h4>Photo {index + 1} (of 4)</h4>
                <img src={coord.imageUrl} alt={`Photo ${index + 1}`} />
              </div>
            ))}
          </div>
          <Map
            coordinates={coordinates}
            onConfirm={handleConfirm}
            onStartOver={handleStartOver}
            onRetake={handleRetake}
          />
          <button onClick={handleConfirm} disabled={coordinates.length !== 4}>Submit</button>
        </>
      )}
    </div>
  );
};

export default App;