import React, { ChangeEventHandler } from 'react';

import '../styles/css/Checkbox.css';

interface CheckboxProps {
  value?: string;
  id: string;
  title: string;
  onChange?: ChangeEventHandler;
  name?: string;
}

const Button: React.FC<CheckboxProps> = (props) => {
  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        className="checkbox"
        id={props.id}
        onChange={props.onChange}
        name={props.name}
      />
      <label
        className="label"
        htmlFor={props.value}
      > {props.title} </label>
    </div>
  );
}

export default Button;