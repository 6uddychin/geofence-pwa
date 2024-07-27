import React, { useState } from 'react';
import PhotoCapture from './PhotoCapture';
import Map from './Map';
import './App.css';
import amznLogo from './assets/amzn_logo.png'; // Ensure this path is correct
import sendEmail from './EmailService'; // Import the email service

const App = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [photos, setPhotos] = useState([]);

  const handleCapture = (capturedPhotos) => {
    if (capturedPhotos.length === 4) {
      setCoordinates(capturedPhotos.map(photo => ({ ...photo, latitude: photo.latitude, longitude: photo.longitude })));
      setPhotos(capturedPhotos);
      setIsConfirmed(false);
    }
  };

  const handleConfirm = async (mapImage) => {
    setIsConfirmed(true);
    sendEmail(photos, coordinates, mapImage);
    // Handle confirmed bounding box, e.g., save to server
  };

  const handleStartOver = () => {
    setCoordinates([]);
    setPhotos([]);
    setIsConfirmed(false);
  };

  const handleRetake = (index) => {
    setIsConfirmed(false);
  };

  return (
    <div>
      <header>
        <img src={amznLogo} alt="Amazon Logo" />
        <h1>Photo Geo Logger</h1>
      </header>
      <div className='instructions'>
        <p>You will need to take 4 images from each corner of the desired geofence</p>
        <ul>
          <li>To take a photo, simply press the blue camera icon</li>
          <li>To retake a photo, simply press the green camera icon</li>
        </ul>
        <hr className='divider' />
      </div>
      {!isConfirmed && <PhotoCapture onCapture={handleCapture} />}
      {coordinates.length === 4 && !isConfirmed && (
        <>
          <div className="photo-gallery">
            {coordinates.map((coord, index) => (
              // <div key={index} style={{ margin: '0 10px', textAlign: 'center' }}>
              //   <h4>Photo {index + 1} (of 4)</h4>
              //   <img src={coord.imageUrl} alt={`Photo ${index + 1}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
              // </div>
            ))}
          </div>
          <div className="map-container">
            <Map
              coordinates={coordinates}
              onConfirm={handleConfirm}
              onStartOver={handleStartOver}
              onRetake={handleRetake}
            />
          </div>
          <button onClick={() => handleConfirm()} disabled={coordinates.length !== 4}>Submit</button>
        </>
      )}
    </div>
  );
};

export default App;