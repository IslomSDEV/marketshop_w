import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  CloseButton,
  CallButton,
  DeveloperIcon,
} from "../../../../assets/icon";
import { Link } from "react-router-dom";
import { t } from "i18next";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  width: 540,
  borderRadius: "15px",
};

function CallModal({ number }) {
  const [open, setOpen] = React.useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const [count, setCount] = useState(3);
  const handleOpen = () => {
    setOpen(true);
    setCount(count - 1 < 0 ? 0 : count - 1);
  };
  const handleClose = () => setOpen(false);

  return (
    <div className="delete">
      <button onClick={handleOpen} className="call__link">
        {t("hello101")}
      </button>
      <Modal
        className="delete-modal-product"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        {accessToken ? (
          count === 0 ? (
            <Box sx={style}>
              <div className="delete-list">
                <img src={CloseButton} alt="" />
                <h3 className="delete-name">{t("hello102")}</h3>
                <p className="delete-text">
                {t("hello103")}
                </p>
                <button onClick={handleClose} className="call__link">
                  {t("hello104")}
                </button>
              </div>
            </Box>
          ) : (
            <Box sx={style}>
              <div className="delete-list">
                <img src={CallButton} alt="" />
                <h3 className="delete-name">{number}</h3>
                <p className="delete-text">
                  {t("hello105")}
                </p>
                <a href={`tel:+${number}`} className="call__link">
                  {t("hello106")}
                </a>
              </div>
            </Box>
          )
        ) : (
          <Box sx={style}>
            <div className="delete-list">
              <img src={DeveloperIcon} alt="" />
              <h3 className="delete-name">{t("hello107")}</h3>
              <p className="delete-text">
                {t("hello108")}
              </p>
              <Link to="/" className="call__link">
                {t("hello109")}
              </Link>
            </div>
          </Box>
        )}
      </Modal>
    </div>
  );
}

export default CallModal;
