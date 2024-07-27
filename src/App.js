import React, { useState, useEffect } from 'react';
import PhotoCapture from './PhotoCapture';
import Map from './Map';
import './App.css';
import amznLogo from './assets/amzn_logo.png'; // Ensure this path is correct
import sendEmail from './EmailService'; // Import the email service

const App = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [zoomIn, setZoomIn] = useState(false);

  useEffect(() => {
    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  }, []);

  const handleCapture = (capturedPhotos) => {
    const updatedCoordinates = capturedPhotos.map(photo => ({ ...photo, latitude: photo.latitude, longitude: photo.longitude }));
    setCoordinates(updatedCoordinates);
    setPhotos(capturedPhotos);
    if (capturedPhotos.length === 4) {
      setZoomIn(true);
      setIsConfirmed(false);
    } else {
      setZoomIn(false);
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
    setZoomIn(false);
  };

  const handleRetake = (index) => {
    setIsConfirmed(false);
    setZoomIn(false);
  };

  return (
    <div className="App">
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
      {userLocation && (
        <div className="map-container">
          <Map
            userLocation={userLocation}
            coordinates={coordinates}
            onConfirm={handleConfirm}
            onStartOver={handleStartOver}
            onRetake={handleRetake}
            zoomIn={zoomIn}
          />
        </div>
      )}
      {coordinates.length === 4 && !isConfirmed && (
        <button onClick={() => handleConfirm()} disabled={coordinates.length !== 4}>Submit</button>
      )}
    </div>
  );
};

export default App;