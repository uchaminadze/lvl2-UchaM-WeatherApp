import React from "react";
import "./share.scss";

const Loader = ({ isLoading, children }) => {
  if (isLoading) return <div className="lds-dual-ring"></div>;

  return children;
};

export default Loader;
