import React, { useEffect } from "react";
import "./Demo.css";
import Landing from "./Landing";

function Demo() {
  useEffect(() => {
    const light = document.querySelector(".light");
    const grid = document.querySelector("#hex-grid");

    const handleMouseMove = (e) => {
      light.style.left = `${e.clientX}px`;
      light.style.top = `${e.clientY}px`;
    };

    grid.addEventListener("mousemove", handleMouseMove);
    return () => {
      grid.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="container">
      <header id="hex-grid">
        <div className="light"></div>
        <div className="grid"></div>
      </header>
      {/* <Landing /> */}
    </div>
  );
}

export default Demo;
