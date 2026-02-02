"use client";

import { Slide, ToastContainer } from "react-toastify";

export function ToastContainerClient() {
  return (
    <ToastContainer
      position="top-center"
      draggable
      transition={Slide}
      closeButton={false}
      className="z-110"
    />
  );
}
