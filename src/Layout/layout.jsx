import React from 'react'
import SideBar from '../Components/Sidebare/sideBare'
import TopBar from '../Components/TopBar/topBar'
import './Layout.css'
function Layout({ children }) {
  return (
    <div className="layout-container w-full">
      <SideBar />
      <div className="main-content">
        <TopBar />
        <div className="page-content overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout