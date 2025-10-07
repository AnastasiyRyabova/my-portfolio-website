import React from 'react';

interface InputFieldProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean;
  icon: string;
  errorIcon: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  isValid,
  icon,
  errorIcon,
}) => {
  return (
    <div className="input-container input-bottom">
      <img src={isValid ? icon : errorIcon} alt={`${name} Icon`} className="input-icon" />
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={isValid ? '' : 'error'}
      />
    </div>
  );
};

export default InputField;
