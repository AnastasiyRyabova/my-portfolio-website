import React, { useState, useEffect } from 'react';
import emailIcon from '../../image/emailIcon.png';
import passwordIcon from '../../image/passwordIcon.png';
import persone from '../../image/persone.png';
import emailErrorIcon from '../../image/emailErrorIcon.png';
import passwordErrorIcon from '../../image/passwordErrorIcon.png';
import personeErrorIcon from '../../image/personeErrorIcon.png';
import InputField from '../InputField/InputField';
import type { AuthFormData } from '../../api/types';

interface RegistrationFormProps {
  formData: AuthFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValidityChange: (isValid: boolean) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  formData,
  handleChange,
  onValidityChange,
}) => {
  const [validity, setValidity] = useState({
    email: true,
    name: true,
    surname: true,
    password: true,
    confirmPassword: true,
  });

  useEffect(() => {
    const emailValid = formData.email.includes('@') && formData.email.length > 0;
    const nameValid = (formData.name ?? '').length >= 4;
    const surnameValid = (formData.surname ?? '').length >= 4;
    const passwordValid = formData.password.length >= 6;
    const confirmPasswordValid = formData.confirmPassword === formData.password;

    const allValid =
      emailValid && nameValid && surnameValid && passwordValid && confirmPasswordValid;

    setValidity({
      email: emailValid,
      name: nameValid,
      surname: surnameValid,
      password: passwordValid,
      confirmPassword: confirmPasswordValid,
    });

    onValidityChange(allValid);
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
        type="text"
        name="name"
        placeholder="Имя"
        value={formData.name ?? ''}
        onChange={handleChange}
        isValid={validity.name}
        icon={persone}
        errorIcon={personeErrorIcon}
      />
      <InputField
        type="text"
        name="surname"
        placeholder="Фамилия"
        value={formData.surname ?? ''}
        onChange={handleChange}
        isValid={validity.surname}
        icon={persone}
        errorIcon={personeErrorIcon}
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
      <InputField
        type="password"
        name="confirmPassword"
        placeholder="Подтвердите пароль"
        value={formData.confirmPassword ?? ''}
        onChange={handleChange}
        isValid={validity.confirmPassword}
        icon={passwordIcon}
        errorIcon={passwordErrorIcon}
      />
    </>
  );
};

export default RegistrationForm;
