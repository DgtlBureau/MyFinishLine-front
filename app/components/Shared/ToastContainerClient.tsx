"use client";

import { Slide, ToastContainer } from "react-toastify";

export function ToastContainerClient() {
  return (
    <ToastContainer
      position="top-center"
      draggable
      transition={Slide}
      closeButton={false}
      autoClose={5000}
      pauseOnHover={true}
      pauseOnFocusLoss={false}
      newestOnTop
      style={{ zIndex: 9999 }}
    />
  );
}
