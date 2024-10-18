import { useEffect } from "react";

const Willhaben = () => {
  useEffect(() => {
    // Redirect to willhaben.at
    window.location.href = "https://c.tenor.com/q6OVl6tsR9wAAAAC/tenor.gif";
  }, []); // The empty array ensures this effect runs only once after the initial render

  return null;
};

export default Willhaben;
