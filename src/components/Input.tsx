import React, { ChangeEventHandler } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import '../styles/css/input.css';

interface InputProps {
  type: string;
  placeholder: string;
  className?: string;
  onChange?: ChangeEventHandler;
  alert: string;
  valid: boolean;
  maxLength: number;
}

const Input: React.FC<InputProps> = (props) => {
  
  const [validated, setValidated] = useState<boolean>(true);

  useEffect(() => {
    if (props.valid) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  }, [props.valid])

  return (
    <div>
      <input
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        className={"input" || props.className}
        maxLength={props.maxLength}
      />
      {(!validated) ? (
        <p className="invalid-field">
          {props.alert}
        </p>
      ) : null}
    </div>
  );
}

export default Input;