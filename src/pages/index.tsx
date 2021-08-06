import React from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Logo from '../components/Logo';
import LogoIcon from '../components/LogoIcon';

import '../styles/css/index.css';

const Index: React.FC = () => {
  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    return window.location.href = `/${e.target.value}/registro`;
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
          <Button value="Enviar" />
        </div>
      </section>
    </>
  );
}

export default Index;