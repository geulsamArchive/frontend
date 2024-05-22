import React, { useState } from 'react';

const Modal = ({ isOpen, poster, onClose }) => {
    if (!isOpen) return null

    return (
        <div>
            <div>
                <img src={poster.image} />
                {poster.year}
                {poster.designer}
                <button onClick={onClose}>X</button>
            </div>
        </div>
    );
};

export default Modal;