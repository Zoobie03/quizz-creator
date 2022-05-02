// Librairies
import React from 'react';
import { ToastContainer } from 'react-toastify';
// Components
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

const Layout = (props) => {
  return (
    <div>
      <Header />

      {props.children}

      <ToastContainer position='bottom-right' newestOnTop />

      <Footer />
    </div>
  );
};

export default Layout;
