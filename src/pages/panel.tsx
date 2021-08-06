import { AxiosError } from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

import api from '../services/api';

import '../styles/css/panel.css';

type User = {
  id: number;
  name: string;
  email: string;
  CPF: string;
  contact?: string;
  knowledge?: string[];
  validated: boolean;
  validatedAt?: null | string;
}

const Panel: React.FC = () => {

  const [users, setUsers] = useState<User[]>([]);

  const [searched, setSearched] = useState<string>('');
  const [filteredData, setFilteredData] = useState<User[]>([]);

  useEffect(() => {
    async function loadUsers() {
      await api.get('/registros')
        .then((response) => {
          const list = response.data.users;

          return setUsers(list);
        })
        .catch((error: AxiosError) => console.log(error));
    }

    loadUsers();
  }, [users]);

  function handleClick(user: User) {
    const name = user.name.toLowerCase();
    const nameWithoutSpaces = name.replace(/\s/g, "_");

    return window.location.href = `/${nameWithoutSpaces}/validar?id=${user.id}`;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const searchWord = e.target.value;
    setSearched(searchWord);
    const newFilter = users.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  }

  const validatedStyle = { 'background': '#26D64E' };
  const invalidatedStyle = { 'background': '#C1121F' };

  if (searched.length > 1) {
    return (
      <>
        <Header />
        <div className="mango-admin-container">
          <SearchBar onChange={handleChange} />
          {filteredData?.map((user, i) => {
            return <Card
              key={i}
              name={user.name}
              status={(user.validated) ? 'Validado' : 'Não validado'}
              style={(user.validated) ? validatedStyle : invalidatedStyle }
              email={user.email}
              CPF={user.CPF}
              validatedAt={user.validatedAt}
              onClick={() => { handleClick(user) }}
            />
          })}
        </div>
      </>
    );
  }

  if (users.length < 1) {
    return (
      <>
        <Header />
        <section className="empty-users">
          <img
            src="https://i.imgur.com/TLXFGSm.png"
            alt="confused"
          />
          <h3 className="empty-users-title">
            Parece que você não tem novos registros no momento.
          </h3>
        </section>
      </>
    );
  }

  return (
    <>
        <Header />
        <div className="mango-admin-container">
          <SearchBar onChange={handleChange} />
          <div className="cards-container">
            {users?.map((user, i) => {
              return <Card
                key={i}
                name={user.name}
                status={(user.validated) ? 'Validado' : 'Não validado'}
                style={(user.validated) ? validatedStyle : invalidatedStyle }
                email={user.email}
                CPF={user.CPF}
                validatedAt={user.validatedAt}
                onClick={() => { handleClick(user) }}
              />
            })}
          </div>
        </div>
    </>
  );
}

export default Panel;