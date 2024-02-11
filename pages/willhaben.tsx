import React, { useEffect } from "react";

const Willhaben = () => {
  useEffect(() => {
    // Redirect to willhaben.at
    window.location.href = "https://www.willhaben.at/iad/kaufen-und-verkaufen/verkaeuferprofil/28718618";
  }, []); // The empty array ensures this effect runs only once after the initial render

  return null;
};

export default Willhaben;
