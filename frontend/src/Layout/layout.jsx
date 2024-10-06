import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../Components/Sidebare/sideBare";
import TopBar from "../Components/TopBar/topBar";
import "./Layout.css";

import DropDownBar from "../Components/DropDownBar/DropDownBar";
import CustomeModal from "../tools/Modal";

import { useMediaQuery, useTheme } from "@mui/material";

function Layout() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const [activeModalContent, setActiveModalContent] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  const handleOpenModal = (content) => {
    setActiveModalContent(content);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setActiveTab(null);
  };

  return (
    <div className="layout-container w-full">
      <SideBar handleOpenModal={handleOpenModal} />
      <div className="main-content">
        <TopBar />
        <div className="page-content overflow-x-hidden">
          <Outlet />
        </div>
      </div>

      <div className="dropdown-bar">
        <DropDownBar
          handleOpenModal={handleOpenModal}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <div>
        <CustomeModal
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          activeModalContent={activeModalContent}
          isLargeScreen={isLargeScreen}
        />
      </div>
    </div>
  );
}

export default Layout;
