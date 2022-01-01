import Modal from './Modal';
import { useDropzone } from 'react-dropzone';
import '../styles/_modal-upload-files.scss';
import { useCallback, useState } from 'react';
import { uploadImgProfile } from '../services/cloudinary/uploadImgProfile';
import { uploadFile } from '../services/firebase/storage';

const Modals = ({ view, closeModal }) => {
  const [prevUpload, setPrevUpload] = useState([]);
  const [imagesListener, setImagesListener] = useState([]);
  const [filesListener, setFilesListener] = useState([]);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles, rejectFiles) => {
      if (view === 'Images') {
        acceptedFiles.forEach((file) => {
          const reader = new FileReader();
          reader.onload = () => {
            const binaryStr = reader.result;
            setPrevUpload((prevFile) => [...prevFile, binaryStr]);
          };
          reader.readAsDataURL(file);
        });
      }

      acceptedFiles.forEach((file) => {
        setPrevUpload((prevFile) => [...prevFile, file]);
      });

      rejectFiles.forEach((file) => {
        console.log('rejectFiles', file);
      });
    },
    [view]
  );

  const typeFile =
    view === 'Images' ? { accept: 'image/*' } : { accept: '.doc, .docx, .pdf' };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: typeFile.accept,
  });

  const handleUpload = (e) => {
    e.preventDefault();
    setLoading(true);
    if (view === 'Images') {
      const promises = prevUpload.map((img) => uploadImgProfile(img));
      Promise.all(promises)
        .then((urls) => {
          setImagesListener(urls);
          setLoading(false);
        })
        .catch((err) => console.log('err', err));
    } else {
      const promises = prevUpload.map((file) => uploadFile(file, 'files-test'));
      Promise.all(promises)
        .then((file) => {
          setFilesListener(file);
          setLoading(false);
        })
        .catch((err) => console.log('err', err));
    }
  };

  const deleteFile = (i) => {
    setPrevUpload((prevFile) => prevFile.filter((file, index) => index !== i));
  };

  return (
    <Modal
      modalView={view}
      closeButton={closeModal}
      handleUpload={(e) => handleUpload(e)}
      getInputProps={() => getInputProps()}
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
              prevUpload.length === 0 ? 'upload-images upload' : 'upload-images'
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
                </>
              )}
            </div>
          </div>
          {prevUpload?.map((image, index) => (
            <div key={index} className='image-container'>
              <img src={image} alt='imagen' />
              <i
                className='far fa-trash-alt'
                onClick={() => deleteFile(index)}
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
          <div className='upload-files'>
            <div className='upload-images' {...getRootProps()}>
              <input {...getInputProps()} />
              <div>
                <i className='fas fa-cloud-upload-alt'></i>
                {isDragActive ? (
                  <p>Listo sueltalos... :D</p>
                ) : (
                  <>
                    <p>Arrastra los archivos aquí</p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className='titles-file'>
            <p>Nombre archivo</p>
            <p>Cargado</p>
            <p>Usuario</p>
          </div>
          <div className='file-content'>
            {prevUpload?.map((file, index) => (
              <div className='item-file' key={index}>
                <div className='file-name'>
                  <i className='far fa-copy'></i>
                  <span>{file.name}</span>
                </div>
                <i
                  className='far fa-trash-alt'
                  onClick={() => deleteFile(index)}
                ></i>
              </div>
            ))}
            {filesListener?.map((file) => (
              <div className='item-file' key={file.metadata.generation}>
                <div className='file-name'>
                  <i className='far fa-copy'></i>
                  <span>{file.metadata.name}</span>
                </div>
                <div className='file-date'>{file.metadata.timeCreated}</div>
                <div className='file-user'>PepitoPablo</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default Modals;
