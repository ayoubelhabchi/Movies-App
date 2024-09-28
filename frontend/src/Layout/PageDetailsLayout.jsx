import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../Components/NavBar/NavBar';

function PageDetailsLayout() {
  return (
    <div >
      <NavBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default PageDetailsLayout;
