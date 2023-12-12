import { useRef } from 'react';
import styled from 'styled-components';

export const useModalControl = (modalHeightDiff: number, autoHeight: boolean = false) => {

  const blurRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const openModal = () => {
    const modal = modalRef.current;
    const blur = blurRef.current;
    if (modal && blur) {
      modal.style.transform = 'translateY(0%)';
      modal.style.transition = 'transform .4s ease';
      blur.style.background = `rgba(0, 0, 0, .3)`;
      blur.style.pointerEvents = `auto`;
    }
  };

  const closeModal = () => {
    const modal = modalRef.current;
    const blur = blurRef.current;
    if (modal && blur) {
      modal.style.transform = 'translateY(100%)';
      modal.style.transition = 'transform .4s ease-in';
      blur.style.background = `rgba(0, 0, 0, 0)`
      blur.style.pointerEvents = `none`;
    }
  };

  interface ModalComponentProps {
    children: React.ReactNode;
  };

  const ModalComponent: React.FC<ModalComponentProps> = ({ children }) => {
    return (
      <>
      <ModalBlur ref={blurRef} onClick={closeModal}></ModalBlur>
      <ModalContainer ref={modalRef} modalHeightDiff={modalHeightDiff} autoHeight={autoHeight}>
        <ModalContent>
          <div className='bar'></div>
          {children}
        </ModalContent>
      </ModalContainer>
      </>
    );
  };

  return { openModal, closeModal, ModalComponent };
};

const ModalContainer = styled.div<{ modalHeightDiff: number, autoHeight: boolean }>`
  position: fixed;
  left: 0;
  top: ${(props) => !!props.autoHeight ? "" : props.modalHeightDiff}px;
  bottom: ${(props) => !!props.autoHeight && 0};
  height: ${(props) => !!props.autoHeight ? "" : `calc(100% - ${props.modalHeightDiff}px)`};
  transform: translateY(100%);
  width: 100%;
  z-index: 9999;
  `;

const ModalContent = styled.div`
    width: 100vw;
    height: 100%;
    /* margin-left: -20px; */
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    background-color: #FFF;
    display: flex;
    flex-direction: column;
    align-items: center;

  .bar {
    width: 80px;
    min-height: 5px; 
    margin: 10px auto;   
    background: #767676;
    border-radius: 5px;
  }
`;

const ModalBlur = styled.div`
  pointer-events: none;
  position: fixed;
  cursor: pointer;
  width: 100vw;
  height: 100%;
  /* margin-left: -20px; */
  top: -54px;
  left: 0;
  transition: .6s;
`;