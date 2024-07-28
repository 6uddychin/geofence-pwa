import emailjs from 'emailjs-com';

const sendEmail = (photos, coordinates, mapImage) => {
  const serviceId = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
  const templateId = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID
  const userId = 'YOUR_USER_ID'; // Replace with your EmailJS user ID

  const formData = new FormData();
  photos.forEach((photo, index) => {
    formData.append(`photo${index + 1}`, photo.file, `photo${index + 1}.jpg`);
  });

  const templateParams = {
    coordinates: coordinates.map((coord, index) => `Photo ${index + 1}: ${coord.latitude}, ${coord.longitude}`).join('\n'),
    mapImage,
  };

  emailjs.send(serviceId, templateId, templateParams, userId)
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
    }, (error) => {
      console.error('FAILED...', error);
    });
};

export default sendEmail;