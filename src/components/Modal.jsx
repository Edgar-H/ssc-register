const Modal = ({ children, modalView, closeButton, handleUpload }) => {
  const handleModalContainerClick = (e) => e.stopPropagation();

  return (
    <div className='modal' onClick={() => closeButton(false)}>
      <div className='modal-container' onClick={handleModalContainerClick}>
        <i className='fas fa-times' onClick={() => closeButton(false)}></i>
        <h3>{modalView} cargadas</h3>
        <div className='modal-view'>{children}</div>
        <div className='btn-modal'>
          <button
            onClick={handleUpload}
            className='col-s-100 col-m-35'
            type='button'
          >
            Cargar {modalView}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
