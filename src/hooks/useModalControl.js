import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

export const useModalControl = () => {
  const [modalState, setModalState] = useState(false);
  const [initialMount, setInitialMount] = useState(true);
  const [animationState, setAnimationState] = useState(true);
  const [accessAllow, setAccessAllow] = useState(true);

  const openModal = () => {
    setModalState(true);
    setInitialMount(false);
  };

  const closeModal = () => {
    setModalState(false);
  };

  useEffect(() => {
    if (modalState) {
      setAccessAllow(false)
      const timer = setTimeout(() => {
        setAnimationState(false)
        setAccessAllow(true)
      }, 1000)
      return () => clearTimeout(timer);
    }

    else if (!modalState) {
      setAccessAllow(false)
      const timer = setTimeout(() => {
        setAnimationState(true);
        setInitialMount(true)
        setAccessAllow(true)
      }, 1000)
      return () => clearTimeout(timer);
    }
  }, [modalState])

  const ModalComponent = ({ children }) => {
    return (
      <WrapStyle accessAllow={accessAllow}>
        {!initialMount &&
          <>
            <ModalBlur onClick={closeModal} modalState={modalState} animationState={animationState}></ModalBlur>
            <ModalContainer modalState={modalState} animationState={animationState}>
              <ModalContent>
                <div className='bar'></div>
                {children}
              </ModalContent>
            </ModalContainer>
          </>
        }
      </WrapStyle>
    );
  };

  return { openModal, closeModal, ModalComponent };
}

const fadePause = keyframes`
  from {
    background-color: rgba(0, 0, 0, 0.3);
  }
  to {
    background-color: rgba(0, 0, 0, 0.3); 
  }
`;

const fadeIn = keyframes`
  from {
    background-color: rgba(0, 0, 0, 0);
  }
  to {
    background-color: rgba(0, 0, 0, 0.3); 
  }
`;

const fadeOut = keyframes`
  from {
    background-color: rgba(0, 0, 0, 0.3); 
  }
  to {
    background-color: rgba(0, 0, 0, 0); 
  }
`;

const movePause = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(0);
  }
`;

const moveTop = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const moveDown = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

const WrapStyle = styled.div`
  pointer-events: ${({ accessAllow }) => accessAllow ? 'auto' : 'none'};
`;

const ModalContainer = styled.div`
  position: absolute;
  left: 0;
  top: 54px;
  height: calc(100% - 54px);
  width: 100%;
  animation: ${({ modalState, animationState }) =>
    modalState ?
    animationState ?
    moveTop :
    movePause :
    moveDown
  } 0.6s 
    ${({ modalState }) => modalState ? 'ease' : 'ease-in'} 
    forwards;
  `;

const ModalContent = styled.div`
    width: 100%;
    height: 100%;
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
  position: absolute;
  cursor: pointer;
  width: 100%;
  height: 100%;
  top: -54px;
  left: 0;
  animation: ${({ modalState, animationState }) => 
    modalState ? 
    animationState ? 
    fadeIn : 
    fadePause : 
    fadeOut} 
    0.6s 
    ease 
    forwards;
`;