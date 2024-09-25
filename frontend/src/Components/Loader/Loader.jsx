import { bouncy } from "ldrs";
bouncy.register();

import React from "react";
import "./Loader.css";

function Loader() {
  return (
    <div className="loader-container">
      <l-bouncy size="100" speed="1.75" color="#c01733"></l-bouncy>
    </div>
  );
}

export default Loader;
