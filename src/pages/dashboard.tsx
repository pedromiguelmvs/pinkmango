import React from 'react';
import Header from '../components/Header';
import UserDashboard from '../components/UserDashboard';

const Dashboard: React.FC = () => {
  return (
    <>
      <Header showReturnButton={true} />
      <UserDashboard />
    </>
  );
}

export default Dashboard;