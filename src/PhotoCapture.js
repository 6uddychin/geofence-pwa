import React, { useState } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';

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
    if (index !== undefined) {
      newPhotos[index] = photoData;
    } else {
      newPhotos.push(photoData);
    }

    setPhotos(newPhotos);
    onCapture(newPhotos);
  };

  const startOver = () => {
    setPhotos([]);
    onCapture([]);
  };

  return (
    <div>
      {photos.length < 4 && <button onClick={() => takePhoto()}>Take Photo</button>}
      {photos.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
          {photos.map((photo, index) => (
            <div key={index} style={{ margin: '0 10px', textAlign: 'center' }}>
              <h4>Photo {index + 1} (of 4)</h4>
              <img src={photo.imageUrl} alt={`Photo ${index + 1}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
              <p>Lat: {photo.latitude}, Lng: {photo.longitude}</p>
              <button onClick={() => takePhoto(index)}>Retake Photo {index + 1}</button>
            </div>
          ))}
        </div>
      )}
      {photos.length === 4 && (
        <div>
          <button onClick={startOver}>Start Over</button>
        </div>
      )}
    </div>
  );
};

export default PhotoCapture;