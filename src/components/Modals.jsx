import Modal from './Modal';
import { useDropzone } from 'react-dropzone';
import '../styles/_modal-upload-files.scss';
import { useCallback, useState } from 'react';
import { uploadImgProfile } from '../services/cloudinary/uploadImgProfile';

const Modals = ({ view, closeModal }) => {
  const [images, setImages] = useState([]);
  const [imagesListener, setImagesListener] = useState([]);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles, rejectFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const binaryStr = reader.result;
        setImages((prevImages) => [...prevImages, binaryStr]);
      };
      reader.readAsDataURL(file);
    });
    console.log(rejectFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  const handleUpload = (e) => {
    console.log('handleUpload');
    e.preventDefault();
    setLoading(true);
    const promises = images.map((img) => uploadImgProfile(img));
    Promise.all(promises)
      .then((urls) => {
        console.log('urls', urls);
        setImagesListener(urls);
        setLoading(false);
      })
      .catch((err) => console.log('err', err));
  };

  const deleteImage = (i) => {
    setImages((prevImages) => prevImages.filter((img, index) => index !== i));
  };
  console.log(view);

  return (
    <Modal
      modalView={view}
      closeButton={closeModal}
      handleUpload={(e) => handleUpload(e)}
    >
      {loading && (
        <div className='is-loading'>
          {loading && (
            <>
              Subiendo... <i className='fas fa-spinner fa-spin'></i>
            </>
          )}
        </div>
      )}
      {view === 'Images' ? (
        <div className='modal-images'>
          <div
            className={
              images.length === 0 ? 'upload-images upload' : 'upload-images'
            }
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <div>
              <i className='fas fa-cloud-upload-alt'></i>
              {isDragActive ? (
                <p>Listo sueltalos... :D</p>
              ) : (
                <>
                  <p>Arrastra las imágenes aquí</p>
                  <p>o usa el buton "+ Imagenes"</p>
                </>
              )}
            </div>
          </div>
          {images?.map((image, index) => (
            <div key={index} className='image-container'>
              <img src={image} alt='imagen' />
              <i
                className='far fa-trash-alt'
                onClick={() => deleteImage(index)}
              ></i>
            </div>
          ))}
          {imagesListener?.map((img) => (
            <div
              className='item-image'
              style={{
                backgroundImage:
                  imagesListener.length === 0 ? 'none' : `url(${img})`,
              }}
              key={img}
            ></div>
          ))}
        </div>
      ) : (
        <div className='modal-files'>
          <div className='titles-file'>
            <p>Nombre archivo</p>
            <p>Cargado</p>
            <p>Usuario</p>
          </div>
          <div className='file-content'>
            {imagesListener?.map((img) => (
              <div className='item-file' key={img}>
                <div className='file-name'>
                  <i className='far fa-copy'></i>{' '}
                  <span>File_lorem_ipsum.pdf</span>
                </div>
                <div className='file-date'>01/01/2020 12:12:12 hrs</div>
                <div className='file-user'>PepitoPablo</div>
                <i className='far fa-trash-alt'></i>
              </div>
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default Modals;
