import React, { useEffect, useState } from 'react';
import { AccordionHeader, AccordionContainer, AccordionContent } from '../../style/Accodion';
import { authAPI } from '../../apis/Api';
import { useForms } from '../../hooks/useForms';

export const Accordion = ({ name, content: ContentComponent }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleAccordion = () => {
        setIsOpen(!isOpen)
    }

    return (
        <AccordionContainer>
            <AccordionHeader onClick={toggleAccordion}>
                {name} &nbsp; {isOpen ?
                    <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.6029 1.23323L19.4299 12.4146C20.7 14.2291 19.4019 16.7224 17.187 16.7224L2.81474 16.7224C0.599817 16.7224 -0.698305 14.2291 0.571871 12.4146L8.39881 1.23323C9.17732 0.121069 10.8244 0.121068 11.6029 1.23323Z" fill="white" />
                    </svg>
                    :
                    <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.89708 15.767L1.07014 4.58567C-0.200035 2.77114 1.09809 0.277884 3.31302 0.277884L17.6853 0.277884C19.9002 0.277884 21.1983 2.77113 19.9281 4.58567L12.1012 15.767C11.3227 16.8792 9.67559 16.8792 8.89708 15.767Z" fill="white" />
                    </svg>
                }
            </AccordionHeader>
            {isOpen && (
                <AccordionContent>
                    <ContentComponent />
                </AccordionContent>
            )}
        </AccordionContainer>
    )
}

const Comment = () => {
    const [writing, onChangeWriting] = useForms();

    return (
        <div>
            <div>
                <div>
                    <input value={writing} onChange={onChangeWriting} />
                    <button>게시하기</button>
                </div>
            </div>
            <div>
                댓글들
            </div>
        </div>
    )
}

const Comments = () => {

    return (
        <div>
            <Accordion name="독자 후기" content={Comment} />
        </div>
    );
};

export default Comments;