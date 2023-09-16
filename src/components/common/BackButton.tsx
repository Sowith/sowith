import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import arrowBack from '../../assets/icon/icon-arrow.svg';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleBackButtonClick = (): void => {
    navigate(-1);
  };

  return <StyledBackButton onClick={handleBackButtonClick} />;
};

const StyledBackButton = styled.button`
  background-image: url(${arrowBack});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-right: 10px;
`;
