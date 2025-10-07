import React, { useState, useEffect } from 'react';
import emailIcon from '../../image/emailIcon.png';
import passwordIcon from '../../image/passwordIcon.png';
import emailErrorIcon from '../../image/emailErrorIcon.png';
import passwordErrorIcon from '../../image/passwordErrorIcon.png';
import InputField from '../InputField/InputField';
import type { AuthFormData } from '../../api/types';

interface LoginFormProps {
  formData: AuthFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValidityChange: (isValid: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ formData, handleChange, onValidityChange }) => {
  const [validity, setValidity] = useState({
    email: true,
    password: true,
  });

  useEffect(() => {
    const emailValid = formData.email.includes('@') && formData.email.length > 0;
    const passwordValid = formData.password.length >= 6;
    setValidity({ email: emailValid, password: passwordValid });
    onValidityChange(emailValid && passwordValid);
  }, [formData, onValidityChange]);

  return (
    <>
      <InputField
        type="email"
        name="email"
        placeholder="Электронная почта"
        value={formData.email}
        onChange={handleChange}
        isValid={validity.email}
        icon={emailIcon}
        errorIcon={emailErrorIcon}
      />
      <InputField
        type="password"
        name="password"
        placeholder="Пароль"
        value={formData.password}
        onChange={handleChange}
        isValid={validity.password}
        icon={passwordIcon}
        errorIcon={passwordErrorIcon}
      />
    </>
  );
};

export default LoginForm;
