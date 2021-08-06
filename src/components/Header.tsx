import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import '../styles/css/Header.css'
import MangoAdminLogo from './MangoAdminLogo';

interface HeaderProps {
  showReturnButton?: boolean;
}

const Header: React.FC<HeaderProps> = (props) => {

  const [returnButton, setReturnButton] = useState<boolean>(false);

  useEffect(() => {
    if (props.showReturnButton) {
      setReturnButton(true);
    } else {
      setReturnButton(false);
    }
  })

  function GoToRegisters() {
    return window.location.href = '/registros';
  }

  return (
    <header className="header-container">
      {(returnButton) ? (
        <div onClick={GoToRegisters} className="return-button-container">
          <img
            src="https://i.imgur.com/ea3W7N6.png"
            alt="return"
          />
          <p>retornar</p>
        </div>
      ) : (
        <div></div>
      )}
      <div className="header-logo-container">
        <MangoAdminLogo />
      </div>
      <div></div>
    </header>
  );
}

export default Header;