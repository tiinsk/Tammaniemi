import React from 'react';

const Modal = ({isOpen, children}) => {
    if(isOpen) {
      return (
        <div className='modal'>
          <div className="modal-content">
            <div className="row">
              <div className="col-md-12">
                {children}
              </div>
            </div>
          </div>
        </div>
      );
    }

   return null;
};

export default Modal;
