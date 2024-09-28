import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../Components/Sidebare/sideBare";
import TopBar from "../Components/TopBar/topBar";
import "./Layout.css";
import DropDownBar from "../Components/DropDownBar/DropDownBar";

import { Backdrop, Fade, Box, Modal } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";

import FavoritesList from "../Components/Favorites/FavoritesList";
import Watchlist from "../Components/Watchlist/Watchlist";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  outline: "none",
  p: 2,
};

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
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openModal}
          onClose={handleCloseModal}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
              sx: {
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
            },
          }}
        >
          <Fade in={openModal}>
            <Box sx={style} style={{ width: isLargeScreen ? '70%' : '100%', height: isLargeScreen ? '100%' : '80%' }}>
              {activeModalContent === "favorites" ? (
                <FavoritesList />
              ) : (
                <Watchlist />
              )}
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}

export default Layout;
