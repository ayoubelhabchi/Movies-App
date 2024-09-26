import React from "react";
import "./Loader.css";

import 'ldrs/hourglass'



function Loader() {
  return (
    <div className="loader-container">
      <l-hourglass size="150" speed="1" color="#c01733"></l-hourglass>
    </div>
  );
}

export default Loader;
