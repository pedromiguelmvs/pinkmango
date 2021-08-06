import React from 'react';
import { useState } from 'react';

import Button from '../components/Button';
import Input from '../components/Input';
import Logo from '../components/Logo';
import Checkbox from '../components/Checkbox';

import api from '../services/api';

import '../styles/css/register.css'
import { AxiosError, AxiosResponse } from 'axios';
import LogoIcon from '../components/LogoIcon';

interface RegisterProps {}

const Register: React.FC<RegisterProps> = (props) => {

  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [CPF, setCPF] = useState<string>();
  const [contact, setContact] = useState<string>();
  const [skills, setSkills] = useState<string[]>([]);

  // states responsáveis pela mensagem de erro
  // no caso de um campo mal formatado
  const [validName, setValidName] = useState<boolean>(true);
  const [validEmail, setValidEmail] = useState<boolean>(true);
  const [validCPF, setValidCPF] = useState<boolean>(true);
  const [validContact, setValidContact] = useState<boolean>(true);


  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    const email = e.target.value;

    const removeDoubleSignIn = email.replace('@@', '@');
    const removeDoubleDots = removeDoubleSignIn.replace('..', '.');

    e.target.value = removeDoubleDots;
    
    if(e.target.value.includes('@') && e.target.value.includes('.')) {
      setValidEmail(true);
    } else {
      return setValidEmail(false);
    }

    setEmail(e.target.value)
  }

  function handleChangeCPF(e: React.ChangeEvent<HTMLInputElement>) {
    const CPF = e.target.value;

    const CPFMask = CPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4"); 

    e.target.value = CPFMask;
    
    const verifyCPF = CPFMask.toString();

    if (verifyCPF.length === 14) {
      setValidCPF(true);
    } else {
      return setValidCPF(false);
    }

    setCPF(e.target.value);
  }

  function handleChangeContact(e: React.ChangeEvent<HTMLInputElement>) {
    const contact = e.target.value;

    const contactMask = contact.replace(/(\d{2})(\d{5})(\d{4})/g,"(\$1) \$2-\$3"); 

    e.target.value = contactMask;

    if (contactMask.length === 15) {
      setValidContact(true);
    } else {
      return setValidContact(false);
    }

    setContact(e.target.value);
  }

  function handleChangeCheckboxGit(e: React.ChangeEvent<HTMLInputElement>) {
    const list = skills;

    if (!e.target.checked) {
      const index = list.indexOf(e.target.name);
      list.splice(index, 1);
    }

    if (list.length === 3) {
      return e.target.checked = false;
    }

    if (e.target.checked) {
      list.push(e.target.name)
    }

    setSkills(list);
  }

  function handleChangeCheckboxReact(e: React.ChangeEvent<HTMLInputElement>) {
    const list = skills;

    if (!e.target.checked) {
      const index = list.indexOf(e.target.name);
      list.splice(index, 1);
    }

    if (list.length === 3) {
      return e.target.checked = false;
    }

    if (e.target.checked) {
      list.push(e.target.name)
    }

    setSkills(list);
  }

  function handleChangeCheckboxPHP(e: React.ChangeEvent<HTMLInputElement>) {
    const list = skills;

    if (!e.target.checked) {
      const index = list.indexOf(e.target.name);
      list.splice(index, 1);
    }

    if (list.length === 3) {
      return e.target.checked = false;
    }

    if (e.target.checked) {
      list.push(e.target.name)
    }

    setSkills(list);
  }

  function handleChangeCheckboxNodeJS(e: React.ChangeEvent<HTMLInputElement>) {
    const list = skills;

    if (!e.target.checked) {
      const index = list.indexOf(e.target.name);
      list.splice(index, 1);
    }

    if (list.length === 3) {
      return e.target.checked = false;
    }

    if (e.target.checked) {
      list.push(e.target.name)
    }

    setSkills(list);
  }

  function handleChangeCheckboxDevOps(e: React.ChangeEvent<HTMLInputElement>) {
    const list = skills;

    if (!e.target.checked) {
      const index = list.indexOf(e.target.name);
      list.splice(index, 1);
    }

    if (list.length === 3) {
      return e.target.checked = false;
    }

    if (e.target.checked) {
      list.push(e.target.name)
    }

    setSkills(list);
  }

  function handleChangeCheckboxDatabase(e: React.ChangeEvent<HTMLInputElement>) {
    const list = skills;

    if (!e.target.checked) {
      const index = list.indexOf(e.target.name);
      list.splice(index, 1);
    }

    if (list.length === 3) {
      return e.target.checked = false;
    }

    if (e.target.checked) {
      list.push(e.target.name)
    }

    setSkills(list);
  }

  function handleChangeCheckboxTypeScript(e: React.ChangeEvent<HTMLInputElement>) {
    const list = skills;

    if (!e.target.checked) {
      const index = list.indexOf(e.target.name);
      list.splice(index, 1);
    }

    if (list.length === 3) {
      return e.target.checked = false;
    }

    if (e.target.checked) {
      list.push(e.target.name)
    }

    setSkills(list);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name?.trim() || !email?.trim() || !CPF?.trim()) {
      return alert('Preencha todos os campos obrigatórios.')
    }

    if (!validEmail || !validCPF || !validContact) {
      return alert('Preencha os campos com informações válidas.')
    }

    if (skills.length < 1) {
      return alert('Preencha no mínimo uma (1) habilidade.');
    }

    let verifyCPF = true;

    await api.post('/cpf', {
      CPF
    })
    .then((response: AxiosResponse) => {
      if(!response.data.error) {
        // CPF já cadastrado
        return verifyCPF = false;
      }
    })
    .catch((error: AxiosError) => {
      console.log(error);
    })

    if (!verifyCPF) {
      return alert('CPF já cadastrado.')
    }

    await api.post('/name/registrar', {
      bodyName: name,
      email,
      CPF,
      contact,
      knowledge: skills
    })
    .then((response: AxiosResponse) => {
      console.log(response);
    })
    .catch((error: AxiosError) => {
      return console.log(error);
    });

    return window.location.reload();
  }

  return (
    <section className="register-container">
      <form onSubmit={handleSubmit} className="form">
        <Input
          type="text"
          placeholder="Nome: "
          onChange={handleChangeName}
          alert="Nome inválido."
          valid={validName}
          maxLength={100}
        />
        <Input
          type="email"
          placeholder="Email: "
          onChange={handleChangeEmail}
          alert="Email inválido."
          valid={validEmail}
          maxLength={100}
        />
        <Input
          type="text"
          placeholder="CPF: "
          onChange={handleChangeCPF}
          alert="CPF inválido."
          valid={validCPF}
          maxLength={14}
        />
        <Input
          type="text"
          placeholder="Celular (opcional): "
          onChange={handleChangeContact}
          alert="Número inválido."
          valid={validContact}
          maxLength={15}
        />
        <div>
          <h3 className="skills-title">Suas habilidades: </h3>
          <h4 className="skills-subtitle">Escolha até três (3) delas.</h4>
        </div>
        <div className="register-checkbox-container">
          <div className="line">
            <Checkbox
              id="git"
              value="git"
              title="Git"
              onChange={handleChangeCheckboxGit}
              name="Git"
            />
            <Checkbox
              id="react"
              value="react"
              title="React"
              onChange={handleChangeCheckboxReact}
              name="React"
            />
            <Checkbox
              id="php"
              value="php"
              title="PHP"
              onChange={handleChangeCheckboxPHP}
              name="PHP"
            />
          </div>
          <div className="line">
            <Checkbox
              id="nodejs"
              value="nodejs"
              title="NodeJS"
              onChange={handleChangeCheckboxNodeJS}
              name="NodeJS"
            />
            <Checkbox
              id="devops"
              value="devops"
              title="DevOps"
              onChange={handleChangeCheckboxDevOps}
              name="DevOps"
            />
          </div>
          <div className="line">
            <Checkbox
              id="database"
              value="database"
              title="Banco de Dados"
              onChange={handleChangeCheckboxDatabase}
              name="Banco de Dados"
            />
            <Checkbox
              id="typescript"
              value="typescript"
              title="TypeScript"
              onChange={handleChangeCheckboxTypeScript}
              name="TypeScript"
            />
          </div>
        </div>
        <div className="form-btn">
          <Button
            type="submit"
            value="Cadastrar-se"
          />
        </div>
      </form>
      <Logo />
      <LogoIcon />
    </section>
  );
}

export default Register;