import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Logo from '../components/Logo';
import LogoIcon from '../components/LogoIcon';

import '../styles/css/index.css';

const Index: React.FC = () => {
  
  const [username, setUsername] = useState<string>("");
  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }
  
  function goToRegister() {

    if (!username.trim()) {
      return alert('Preencha um nome.');
    }

    const name = username.toLowerCase();
    const nameWithoutSpaces = name.replace(/\s/g, "_");
    
    return window.location.href = `/${nameWithoutSpaces}/registrar`;
  }
  
  return (
    <>
      <section className="index-container">
        <Logo />
        <LogoIcon />
        <Input
          type="text"
          placeholder="Digite um nome..."
          maxLength={100}
          onChange={handleChange}
        />
        <div className="index-button-container">
          <Button
            onClick={goToRegister}
            value="Enviar"
          />
        </div>
      </section>
    </>
  );
}

export default Index;