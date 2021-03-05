import React from "react";
import "../Exceptions/Exceptions.css";

export const ErrorAlert = ({ error }) => {
  return (
    <div className="container">
      <h2>Error Message!</h2>
      <div className="alert">
        <strong>{error.message}</strong>
      </div>
    </div>
  );
};

export const LoaderSpinner = () => (
  <div className="container">
    <div className="lds-dual-ring"></div>
  </div>
);