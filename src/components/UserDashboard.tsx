import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import api from '../services/api';

import '../styles/css/UserDashboard.css';
import Button from './Button';

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

const UserDashboard: React.FC = () => {

  const [user, setUser] = useState<User>()
  const [showAskModal, setShowAskModal] = useState<boolean>(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');
    
    async function loadUsers() {
      
      if (!id) {
        return window.location.href = '/registros';
      }
      
      await api.get(`/${id}/validar`, { params: { _id: id } })
        .then((response) => {
          const user = response.data.user;

          return setUser(user);
        })
        .catch((error: AxiosError) => console.log(error));
    }

    loadUsers();
  });

  function confirmShowAskModal() {
    setShowAskModal(true);
  }

  function hideAskModal() {
    setShowAskModal(false);
  }

  async function invalidateUser() {
    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');
    
    await api.put(`/${id}/validar`, {
      params: { _id: id },
      validated: false 
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error: AxiosError) => console.log(error));

    return window.location.href = '/registros';
  }

  async function validateUser() {
    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');
    
    await api.put(`/${id}/validar`, {
      params: { _id: id },
      validated: true 
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error: AxiosError) => console.log(error));

    return window.location.href = '/registros';
  }

  return (
    <section className="user-dashboard-container">

      {(showAskModal) ? (
        <div onClick={hideAskModal} className="ask-modal-container">
          <div className="ask-modal">
            <h3 className="ask-modal-title">
              Tem certeza que deseja invalidar este usuário?
            </h3>
            <h4 className="ask-modal-subtitle">
              Se prosseguir, este usuário não poderá se registrar no sistema.
            </h4>
            <div className="ask-modal-buttons">
              <Button
                onClick={invalidateUser}
                value="Sei o que estou fazendo!"
              />
              <Button 
                style={{
                  'background': 'none',
                  'color': '#EF476F',
                  'border': '3px solid #EF476F',
                  'fontSize': '18px'
                }}
                value="Não! Voltar para o painel."
                onClick={hideAskModal}
              />
            </div>
          </div>
        </div>
      ) : null}

      <header className="user-dashboard-header">
        <h3 className="user-dashboard-header-title">{user?.name}</h3>
        <h4 className="user-dashboard-header-subtitle">Detalhes e informações pessoais.</h4>
      </header>
      <div className="user-dashboard">
        <div className="user-dashboard-field">
          <h3 className="user-dashboard-title">Nome Completo: </h3>
          <h3 className="user-dashboard-subtitle">{user?.name}</h3>
        </div>
        <div className="user-dashboard-field">
          <h3 className="user-dashboard-title">Email: </h3>
          <h3 className="user-dashboard-subtitle">{user?.email}</h3>
        </div>
        <div className="user-dashboard-field">
          <h3 className="user-dashboard-title">CPF: </h3>
          <h3 className="user-dashboard-subtitle">{user?.CPF}</h3>
        </div>
        <div className="user-dashboard-field">
          <h3 className="user-dashboard-title">Celular: </h3>
          <h3 className="user-dashboard-subtitle">
            {(user?.contact) ? user?.contact : 'Não informado'}
          </h3>
        </div>
        <div className="user-dashboard-field">
          <h3 className="user-dashboard-title">Habilidades: </h3>
          <h3 className="user-dashboard-subtitle">
            {user?.knowledge?.map(skill => skill).join(', ')}
          </h3>
        </div>
        <div className="buttons">
          <div className="validate-button">
            <Button
              value="Validar"
              onClick={validateUser}
            />
          </div>
          <div className="validate-button">
            <Button 
              style={{
                'background': 'none',
                'color': '#EF476F',
                'border': '3px solid #EF476F',
                'fontSize': '18px'
              }}
              value="Invalidar"
              onClick={confirmShowAskModal}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserDashboard;