const Modal = ({ children, modalView, closeButton }) => {
  const handleModalContainerClick = (e) => e.stopPropagation();
  // const fileHandle = (e) => {
  //   console.log('ALGO');
  // };
  return (
    <div className='modal' onClick={() => closeButton(false)}>
      <div className='modal-container' onClick={handleModalContainerClick}>
        <i className='fas fa-times' onClick={() => closeButton(false)}></i>
        <h3>{modalView} cargadas</h3>
        <div className='modal-view'>{children}</div>
        <div className='btn-modal'>
          {/* <input type='file' value='algo' onChange={fileHandle} /> */}
          <button className='col-s-100 col-m-25'>
            <i className='fas fa-plus'></i> {modalView}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
