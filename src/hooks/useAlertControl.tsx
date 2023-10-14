import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

export const useAlertControl = () => {
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
          <AlertContainer onClick={closeAlert}>
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

const AlertContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center; 
  justify-content: center;
  animation: ${fadeIn} 0.3s ease-in;
  z-index: 999;
`;