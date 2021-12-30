import Modal from './Modal';
import '../styles/_modal-upload-files.scss';

const Modals = ({ view, closeModal }) => {
  const numImages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <Modal modalView={view} closeButton={closeModal}>
      {view === 'Images' ? (
        <div className='modal-images'>
          <div className='upload-images'>
            <i className='fas fa-cloud'></i>
          </div>
          {numImages.map((img) => (
            <div
              className='item-image'
              style={{
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1628375385881-1cc69cee648a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=764&q=80)',
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
            {numImages.map((img) => (
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
