import React, { createContext, useState, useContext, ReactNode } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { SlideProps } from "@mui/material/Slide";

interface AlertState {
  message: string;
  severity: "success" | "error" | "warning" | "info";
  variant: "filled" | "outlined" | "standard";
}

interface AlertContextType {
  showAlert: (
    message: string,
    severity?: AlertState["severity"],
    variant?: AlertState["variant"]
  ) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

interface AlertProviderProps {
  children: ReactNode;
}

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction='up' />;
}

export function AlertProvider({ children }: AlertProviderProps) {
  const [alert, setAlert] = useState<AlertState | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const showAlert = (
    message: string,
    severity: AlertState["severity"] = "success",
    variant: AlertState["variant"] = "filled"
  ) => {
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

export function useAlert(): AlertContextType {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
}
