import React, { useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";

import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";
import DetailsDropDown from "../Components/DetailsDropDown/DetailsDropDown";
import CustomeModal from "../tools/Modal";

import "./Layout.css";

function PageDetailsLayout() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [activeModalContent, setActiveModalContent] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = (content) => {
    setActiveModalContent(content);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setActiveTab(null);
  };

  return (
    <div>
      <NavBar />
      <div className="bottom_drop">
        <DetailsDropDown handleOpenModal={handleOpenModal}/>
      </div>
      <div>
        <Outlet />
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

export default PageDetailsLayout;
