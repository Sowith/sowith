import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

export const useAlertControl = (top: number = 0) => {
  const [alertState, setAlertState] = useState(false);

  const openAlert = () => {
    setAlertState(true);
  };

  const closeAlert = () => {
    setAlertState(false);
  };

  interface AlertComponentProps {
    children: React.ReactNode;
  }
  
  const AlertComponent: React.FC<AlertComponentProps> = ({ children }) => {
    return (
      <>
        {alertState && (
          <AlertContainer onClick={closeAlert} top={top}>
            <div>{children}</div>
          </AlertContainer>
        )}
      </>
    );
  };

  return { openAlert, AlertComponent };
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const AlertContainer = styled.div<{top: number}>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: ${(props) => `calc(50% - ${props.top !== 0 ? props.top : 0}px)`};
  /* top: 50%; */
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center; 
  justify-content: center;
  animation: ${fadeIn} 0.3s ease-in;
  z-index: 99999;
`;