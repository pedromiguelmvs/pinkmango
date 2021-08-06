import React from 'react';

import '../styles/css/MangoAdminLogo.css'

const MangoAdminLogo: React.FC = () => {

  function handleClick() {
    return window.location.href = '/';
  }

  return (
    <div className="mango-admin-logo-container" onClick={handleClick}>
      <img
        className="mango-admin-logo-icon"
        src="https://i.imgur.com/U0WMpj9.png"
        alt="mango-admin"
      />
      <h3 className="mango-admin-title">
        Mango
        <span className="mango-admin-pink-bold-font">Admin</span>
      </h3>
    </div>
  );
}

export default MangoAdminLogo;