import React from "react";
import { Modal, Box, Button } from "@mui/material";
import "../styles/confirm.css";

export default function ConfirmationModal({ open, onClose, onConfirm, str }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className='modal-box' sx={{ padding: 2, backgroundColor: "white", borderRadius: 1 }}>
        <div className='content'>
          <h2>Ви впевнені що хочете видалити {str}?</h2>
          <button className='btn btn-danger' onClick={onConfirm}>
            Видалити
          </button>
          <button className='btn login' onClick={onClose}>
            Скасувати
          </button>
        </div>
      </Box>
    </Modal>
  );
}
