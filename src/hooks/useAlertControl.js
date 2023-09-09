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

  const AlertComponent = ({ children }) => {
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
}

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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center; 
  justify-content: center;
  animation: ${fadeIn} 0.3s ease-in;
  z-index: 999;
`;