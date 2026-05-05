import React, { useEffect } from 'react';
import './IntroPopup.css'; 

const IntroPopup = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 15000); // fechar sozin

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="intro-popup">
      <div className="intro-popup-content">
        <div className="intro-popup-text">
          <p style={{ margin: "0 0 5px 0", fontWeight: "bold" }}>Seja bem vindo(a) a JourneyEasyMap!</p>
          <p style={{ margin: 0 }}>Experimente criar ou acessar seus mapas de jornada de usuário.</p>
        </div>
        <img src="https://github.com/luca-ferro/imagestest/blob/main/mascote.png?raw=true" style={{ width: "50px", marginLeft: "15px" }} alt="mascote" />
      </div>
      <button className="intro-popup-close" onClick={onClose}>&#10006;</button>
    </div>
  );
};

export default IntroPopup;
