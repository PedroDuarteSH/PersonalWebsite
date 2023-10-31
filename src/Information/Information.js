import React, { useEffect, useState } from "react";
import "./Information.css";
const Information = () => {
  useEffect(() => {
    let resizeTimer;
    const updateWidth = () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {}, 200);
    };
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  });
  const [text, setText] = useState(true);

  function changeText() {
    setText(!text);
  }

  return (
  
      <div className="Info">
        <h1 className="Name">Pedro Henriques</h1>
        <p className="Text">
          {text
            ? "Draw the path from start to know my networks, or click on the button below to know more about me. But be careful, if you take too long, your drawing will be saved!"
            : "I am a Computer Science student, doing a master's degree in Intelligent Systems. The evolution in appliances of that type of system in recent years impresses me, so I have a large willingness to help in this evolution with new ideas. Through my University path and Internship, have obtained relevant skills in order to start this journey."}
        </p>
        <button className="button" onClick={changeText}>
          {text ? "About Me" : "Instructions"}
        </button>
      </div>
  );
};

export default Information;
