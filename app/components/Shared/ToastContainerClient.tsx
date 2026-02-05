"use client";

import { Slide, ToastContainer } from "react-toastify";

export function ToastContainerClient() {
  return (
    <ToastContainer
      position="top-center"
      draggable={false}
      transition={Slide}
      closeButton={true}
      autoClose={5000}
      pauseOnHover={false}
      pauseOnFocusLoss={false}
      hideProgressBar={false}
      newestOnTop
      limit={3}
      enableMultiContainer={false}
      containerId="main-toast-container"
      style={{ zIndex: 9999 }}
    />
  );
}
