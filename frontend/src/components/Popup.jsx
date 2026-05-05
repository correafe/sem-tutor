import React from "react";
import { createPortal } from "react-dom";
import styles from './Popup.module.css';

function Popup(props) {
    // Se trigger for true, renderiza o portal direto no body da página
    return (props.trigger) ? createPortal(
        <div className={styles.popup}>
            <div className={styles.popupinner}>
                <button 
                    className={styles.closebtn} 
                    onClick={() => {
                        props.setTrigger(false); 
                        // Verificações de segurança adicionadas caso você use esse 
                        // mesmo Popup em lugares que não passam essas props
                        if(props.setTextEdit) props.setTextEdit(false); 
                        if(props.setScenario) props.setScenario(false);
                    }}
                >
                    &#10006;
                </button>
                { props.children }
            </div>
        </div>,
        document.body // <-- Elemento de destino do Portal
    ) : "";
}

export default Popup;