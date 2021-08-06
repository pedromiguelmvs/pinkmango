import React, { ButtonHTMLAttributes, MouseEvent } from 'react';
import { CSSProperties } from 'react';

import '../styles/css/Card.css';

interface CardProps {
  name: string;
  status: boolean | string;
  email: string;
  CPF: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  style: CSSProperties;
  validatedAt: string | null | undefined;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <section className="card-container" onClick={props.onClick}>
      <div className="user-info">
        <div className="name-and-status-container">
          <h3 className="card-title">{props.name}</h3>
          <div style={props.style} className="user-status">
            <p>{props.status}</p>
          </div>
        </div>
        <div className="card-info">
          <div className="email-info">
            <img src="https://i.imgur.com/UXAbEoB.png" alt="email" />
            <p>{props.email}</p>
          </div>
          <div className="cpf-info">
            <img src="https://i.imgur.com/0TEFswC.png" alt="cpf" />          
            <p>{props.CPF}</p>          
          </div>
          <div className="cpf-info">
            <img src="https://i.imgur.com/HjJLNXH.png" alt="date" />          
            <p>
              {(props.validatedAt) ? props.validatedAt.slice(0, 10) : 'Sem veredito.'}
            </p>          
          </div>
        </div>
      </div>
      <div className="card-arrow-container">
        <img
          className="card-arrow"
          src="https://i.imgur.com/xYqBaPe.png"
          alt="arrow"
        />
      </div>
    </section>
  );
}

export default Card;