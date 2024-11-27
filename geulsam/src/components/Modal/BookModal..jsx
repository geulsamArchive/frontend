import React from 'react';
import Close from '../../assets/images/closeSmall.png'
import { ModalButton, ModalButtonImg, ModalContent, ModalDesigner, ModalImg, ModalInfo, ModalOverlay, ModalYear } from '../../style/StyledComponent';
import PDFView from '../pdf/PDFView';
import MobilePDF from '../pdf/MobilePDFViewer';

const BookModal = ({ isOpen, onClose, PDF }) => {
    if (!isOpen) return null

    return (
        <ModalOverlay>
            <ModalContent>
                <MobilePDF PDF={PDF} />
            </ModalContent>
            <ModalButtonImg onClick={onClose} src={Close} alt='close' />
        </ModalOverlay>
    );
};

export default BookModal;