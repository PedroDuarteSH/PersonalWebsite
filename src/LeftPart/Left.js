import React, { useEffect, useState } from "react";
import "./Left.css";
const Left = () => {
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
    <div className="right">
  
      <div className="Info">
        <h1 className="Name">Pedro Henriques</h1>
        <p className="Text">
          {text
            ? "Desenha o caminho a partir do start para conhecer as minhas redes"
            : "I am a Computer Science student, doing a master's degree in Intelligent Systems. The evolution in appliances of that type of system in recent years impresses me, so I have a large willingness to help in this evolution with new ideas. Through my University path and Internship, have obtained relevant skills in order to start this journey."}
        </p>
        <button className="button" onClick={changeText}>
          {text ? "About Me" : "Instructions"}
        </button>
      </div>
    </div>
  );
};

export default Left;
