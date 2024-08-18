import React, { createContext, useState, useContext } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

const AlertContext = createContext();

function SlideTransition(props) {
  return <Slide {...props} direction='up' />;
}

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const showAlert = (message, severity = "success", variant) => {
    setAlert({ message, severity, variant });
    setOpenSnackbar(true);
    setTimeout(() => {
      setOpenSnackbar(false);
    }, 4000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar open={openSnackbar} autoHideDuration={4000} TransitionComponent={SlideTransition}>
        <Alert severity={alert?.severity || "success"} variant={alert?.variant}>
          {alert?.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
}

export function useAlert() {
  return useContext(AlertContext);
}
