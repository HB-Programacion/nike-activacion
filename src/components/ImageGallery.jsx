import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage';
import { TailSpin } from 'react-loader-spinner';


const ImageGallery = () => {
   const { hour } = useParams();
   const [images, setImages] = useState([]);
   const [selectedImage, setSelectedImage] = useState(null);
   const [isLoading, setIsLoading] = useState(true);


   useEffect(() => {
      const firebaseConfig = {
         apiKey: 'AIzaSyArZPWD_Pk9SJmb244XMa5ImDNQPH8GrEU',
         authDomain: 'nike-activacion.firebaseapp.com',
         projectId: 'nike-activacion',
         storageBucket: 'nike-activacion.appspot.com',
         messagingSenderId: '698494064253',
         appId: '1:698494064253:web:c24869caf8c3bed5f9c314'
      };
      const app = initializeApp(firebaseConfig);

      const storage = getStorage(app);
      const hourRef = ref(storage, hour);

      const storedImageUrls = JSON.parse(localStorage.getItem(hour));

      if (storedImageUrls) {
      setImages(storedImageUrls);
      setIsLoading(false);
      } else {
      listAll(hourRef)
         .then(async (res) => {
            const imageList = await Promise.all(res.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return {
               id: item.name,
               name: item.name,
               url: url
            };
            }));
            setImages(imageList);
            localStorage.setItem(hour, JSON.stringify(imageList));
            setIsLoading(false);
         })
         .catch((error) => {
            console.error('Error al cargar las imágenes:', error);
            setIsLoading(false);
         });
      }
   }, [hour]);

   const openModal = (image) => {
      setSelectedImage(image);
   };

   const closeModal = () => {
      setSelectedImage(null);
   };

   const handleDownload = () => {
      if (selectedImage) {
      const link = document.createElement('a');
      link.href = selectedImage.url;
      link.download = selectedImage.name;
      link.click();
      }
   };

   return (
      <div className="image-gallery">
      {isLoading ? (
         <div className="loading">
         <TailSpin
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
         />
         </div>
      ) : (
         images.map((image) => (
            <img
            key={image.id}
            src={image.url}
            alt={image.name}
            onClick={() => openModal(image)}
            className="thumbnail"
            />
         ))
      )}

      <Modal isOpen={selectedImage !== null} onRequestClose={closeModal}>
         {selectedImage && (
            <div>
            <img src={selectedImage.url} alt={selectedImage.name} />
            <button onClick={handleDownload}>
               Descargar
            </button>
            <button onClick={closeModal}>Cerrar</button>
            </div>
         )}
      </Modal>
      </div>
   );
};

export default ImageGallery;