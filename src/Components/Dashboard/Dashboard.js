// Library
import React from 'react';
// Own Files
import styles from './Dashboard.module.css';
// Components
import LeftColumnDashboard from './LeftColumnDashboard/LeftColumnDashboard';
import QuizzCreator from './QuizzCreator/QuizzCreator';
import RightColumnDashboard from './RightColumnDashboard/RightColumnDashboard';

const Dashboard = () => {
  return (
    <div className={styles.Dashboard}>
      <LeftColumnDashboard />
      <QuizzCreator />
      <RightColumnDashboard />
    </div>
  );
};

export default Dashboard;
