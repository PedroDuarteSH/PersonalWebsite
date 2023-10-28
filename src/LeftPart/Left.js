import React, { useEffect } from "react";

const Left = () => {
  useEffect(() => {
    let resizeTimer;
    const updateWidth = () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
      }, 200);
    };
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  });

  return (
    <div>
      <h1 className="Name">Pedro Henriques</h1>
      <p>Desenha o caminho a partir do start para conhecer as minhas redes</p>
      <button>Sobre mim</button>
      </div>
  );
};

export default Left;
