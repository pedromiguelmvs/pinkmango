import React, { CSSProperties } from 'react';

import '../styles/css/Button.css';

interface ButtonProps {
  value: string;
  type?: 'submit' | 'reset' | 'button';
  style?: CSSProperties;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      type={props.type}
      className={"button"}
      style={props.style}
      onClick={props.onClick}
    > {props.value} </button>
  );
}

export default Button;