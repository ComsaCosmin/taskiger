import React, { useState, useContext, createContext } from "react";
import { Toast } from "react-bootstrap";

// Create a Context for the Toast
const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const showToast = (msg, messageType) => {
    setMessage(msg);
    setShow(true);
    setType(messageType);
  };

  const hideToast = () => {
    setShow(false);
  };

  const toastStyle =
    type === "error"
      ? { backgroundColor: "red", color: "white" }
      : { backgroundColor: "green", color: "white" };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      <Toast
        onClose={hideToast}
        show={show}
        delay={3000}
        autohide
        style={toastStyle}
      >
        <Toast.Body>{message}</Toast.Body>
      </Toast>
      {children}
    </ToastContext.Provider>
  );
}
