import React, { useEffect, useState } from "react";
import "animate.css";
import { TypeAnimation } from "react-type-animation";
import "./Information.css";

var TEXTS = [
  ["Draw the path from start to know my networks, or click on the button below to know more about me." , <br /> ,<br />, "But be careful, if you take too long, your drawing will be saved!", ],
  "I am a Computer Science student, doing a master's degree in Intelligent Systems. The evolution in appliances of that type of system in recent years impresses me, so I have a large willingness to help in this evolution with new ideas.",
];

var DESCRIPTIONS = ["Developer", "Car Guy", "Tech Enthusiast"];

const Information = () => {
  const [text, setText] = useState(false);

  function changeText() {
    setText(!text);
  }

  return (
    <div className="Info">
      <h1 className="Name animate__animated animate__backInRight">
        Pedro Henriques
      </h1>

      <div className="description animate__animated animate__fadeInUp animate__delay-1s">
        <TypeAnimation
          sequence={[
            "I'm a Developer",
            1000,
            "I'm a Car Guy",
            1000,
            "I'm a Tech Enthusiast",
            1000,
          ]}
          speed={50}
          repeat={Infinity}
          className="Text"
          style={{ fontSize: "2em" }}
        />
        <p className="Text" style={{ fontSize: "1em", marginTop: "10px" }}>
         
          {TEXTS[text % TEXTS.length]}
          
        </p>
      </div>

      <button
        className="button animate__animated animate__fadeInUp animate__delay-1s"
        onClick={changeText}
      >
        {text ? "Instructions" : "About Me"}
      </button>
    </div>
  );
};

export default Information;
