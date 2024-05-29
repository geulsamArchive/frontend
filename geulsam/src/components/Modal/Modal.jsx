import React from 'react';
import Close from '../../assets/images/closeSmall.png'
import { ModalButton, ModalButtonImg, ModalContent, ModalDesigner, ModalImg, ModalInfo, ModalOverlay, ModalYear } from '../../style/StyledComponent';

const Modal = ({ isOpen, poster, onClose }) => {
    if (!isOpen) return null

    return (
        <ModalOverlay>
            <ModalContent>
                <ModalImg src={poster.image} />
                <ModalInfo>
                    <ModalDesigner>
                        디자인 {poster.designer}
                    </ModalDesigner>
                    <ModalYear>
                        {poster.year}
                    </ModalYear>
                </ModalInfo>
            </ModalContent>
            <ModalButtonImg onClick={onClose} src={Close} alt='close' />
        </ModalOverlay>
    );
};

export default Modal;