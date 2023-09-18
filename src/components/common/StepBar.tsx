import React from 'react';
import { useState } from 'react';
import styled, { css } from 'styled-components';


export const StepBar = ({ currentStep, howManyTabs }) => {
  const marginLeft = `calc((100% / ${howManyTabs}) * ${currentStep - 1})`;

  return (
    <Bar>
      <CurrentStepBar style={{ marginLeft, transition: "margin-left 0.5s" }} howManyTabs={howManyTabs}/>
    </Bar>
  );
};

const Bar = styled.div`
  width: 88%;
  height: 5px;
  background-color: var(--gray100-color);
  margin: 0 auto;
  border-radius: 5px;
`;

const barStyles = css<{ howManyTabs: number }>`
  width: ${(props) => `calc(100% / ${props.howManyTabs})`};
  height: 5px;
  background-color: var(--main-color);
  border-radius: 10px;
`;

const CurrentStepBar = styled.div<{ howManyTabs: number }>`
  ${barStyles}
`;
