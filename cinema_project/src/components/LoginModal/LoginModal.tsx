import React, { useState, useEffect } from 'react';
import './LoginModal.css';
import ConfirmationMessage from '../ConfirmationMessage/ConfirmationMessage';
import LoginForm from '../LoginForm/LoginForm';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import ModalLayout from '../ModalLayout/ModalLayout';
import logo from '../../image/маруся.png';
import type { LoginModalProps } from '../../api/types';
import type { AuthFormData } from '../../api/loginService';
import { login, register } from '../../api/loginService';

const initialLoginData: AuthFormData = {
  email: '',
  password: '',
};

const initialRegisterData: AuthFormData = {
  email: '',
  password: '',
  name: '',
  surname: '',
  confirmPassword: '',
};

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, setUser }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<AuthFormData>(initialLoginData);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsRegistering(false);
      setIsRegistered(false);
      setFormData(initialLoginData);
      setIsFormValid(false);
    }
  }, [isOpen]);

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setFormData(!isRegistering ? initialRegisterData : initialLoginData);
    setIsFormValid(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsLoading(true);

    try {
      const userData = isRegistering
        ? await register(formData)
        : await login(formData);

      if (userData) {
        setUser(userData);
        if (isRegistering) setIsRegistered(true);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ошибка авторизации';
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = () => {
    setIsRegistered(false);
    setIsRegistering(false);
    setFormData(initialLoginData);
    setIsFormValid(false);
  };

  if (!isOpen) return null;

  return (
    <ModalLayout onClose={onClose}>
      {isRegistered ? (
        <ConfirmationMessage onLoginClick={handleLoginClick} />
      ) : (
        <>
          <img src={logo} alt="Логотип" className="login-modal__logo" />
          <form onSubmit={handleSubmit}>
            {isRegistering ? (
              <RegistrationForm
                formData={formData}
                handleChange={handleChange}
                onValidityChange={setIsFormValid}
              />
            ) : (
              <LoginForm
                formData={formData}
                handleChange={handleChange}
                onValidityChange={setIsFormValid}
              />
            )}
            <button
              className="login-modal__button-login"
              type="submit"
              disabled={isLoading || !isFormValid}
            >
              {isLoading ? 'Загрузка...' : isRegistering ? 'Зарегистрироваться' : 'Войти'}
            </button>
          </form>
          <button className="login-modal__button-if" onClick={toggleMode} disabled={isLoading}>
            {isRegistering ? 'У меня есть пароль' : 'Регистрация'}
          </button>
        </>
      )}
    </ModalLayout>
  );
};

export default LoginModal;
