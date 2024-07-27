import React, { useState } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import blueCamera from './assets/blue_camera.png'; // Ensure this path is correct
import greenCamera from './assets/green_camera.png'; // Ensure this path is correct

const PhotoCapture = ({ onCapture }) => {
  const [photos, setPhotos] = useState([]);

  const takePhoto = async (index) => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });

    const coordinates = await Geolocation.getCurrentPosition();

    const photoData = {
      imageUrl: image.webPath,
      latitude: coordinates.coords.latitude,
      longitude: coordinates.coords.longitude
    };

    const newPhotos = [...photos];
    newPhotos[index] = photoData;

    setPhotos(newPhotos);
    onCapture(newPhotos);
  };

  const startOver = () => {
    setPhotos([]);
    onCapture([]);
  };

  return (
    <div>
      <div className="photo-gallery" style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
        {[0, 1, 2, 3].map((index) => (
          <div key={index} style={{ margin: '0 10px', textAlign: 'center' }}>
            {/* <h4>Photo {index + 1} (of 4)</h4> */}
            <div className="camera-button" onClick={() => takePhoto(index)}>
              <img
                src={photos[index] ? greenCamera : blueCamera}
                alt={`Camera Icon ${index + 1}`}
                style={{ width: '50px', height: '50px' }}
              />
            </div>
            {photos[index] && (
              <>
                <img src={photos[index].imageUrl} alt={`Photo ${index + 1}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                {/* <p>Lat: {photos[index].latitude}, Lng: {photos[index].longitude}</p> */}
                {/* <button onClick={() => takePhoto(index)}>Retake Photo {index + 1}</button> */}
              </>
            )}
          </div>
        ))}
      </div>
      {/* {photos.length === 4 && (
        <div>
          <button onClick={startOver}>Start Over</button>
        </div>
      )} */}
    </div>
  );
};

export default PhotoCapture;