import React from "react";
import { Backdrop, Fade, Box, Modal } from "@mui/material";
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

function CustomeModal({openModal,
    handleCloseModal,
    activeModalContent,
    isLargeScreen}) {

  return (
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
          <Box
            sx={style}
            style={{
              width: isLargeScreen ? "70%" : "100%",
              height: isLargeScreen ? "100%" : "80%",
            }}
          >
            {activeModalContent === "favorites" ? (
              <FavoritesList />
            ) : (
              <Watchlist />
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default CustomeModal;
