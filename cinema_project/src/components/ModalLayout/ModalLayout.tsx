import React from 'react';
import close from '../../image/closebutton.png';
import '../LoginModal/LoginModal.css'

interface ModalLayoutProps {
  children: React.ReactNode;
  onClose: () => void;
}

const ModalLayout: React.FC<ModalLayoutProps> = ({ children, onClose }) => {
  return (
    <div className="login-modal__overlay" onClick={onClose}>
      <div className="login-modal__content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button className="login-modal__close" onClick={onClose}>
          <img src={close} alt="Close" />
        </button>
      </div>
    </div>
  );
};

export default ModalLayout;
