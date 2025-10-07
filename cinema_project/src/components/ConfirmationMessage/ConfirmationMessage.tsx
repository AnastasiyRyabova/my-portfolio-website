import React from 'react';
import logo from '../../image/маруся.png';

interface ConfirmationMessageProps {
  onLoginClick: () => void;
}

const ConfirmationMessage: React.FC<ConfirmationMessageProps> = ({ onLoginClick }) => {
  return (
    <>
      <img src={logo} alt="Логотип" className="modal-logo" />
      <h2>Регистрация завершена</h2>
      <p>Используйте вашу электронную почту для входа</p>
      <button className='button-login' onClick={onLoginClick}>Войти</button>
    </>
  );
};

export default ConfirmationMessage;
