import React from "react";
import { useState } from "react";
import styled, { css } from "styled-components";

export const StepBar = ({ currentStep, howManyTab }) => {
  const marginLeft = `calc((100% / ${howManyTab}) * ${currentStep - 1})`;

  return (
    <Bar>
      <CurrentStepBar style={{ marginLeft, transition: "margin-left 0.5s" }} howManyTab={howManyTab}/>
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

const barStyles = css<{ howManyTab: number }>`
  width: ${(props) => `calc(100% / ${props.howManyTab})`};
  height: 5px;
  background-color: var(--main-color);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
`;

const CurrentStepBar = styled.div<{ howManyTab: number }>`
  ${(props) => props.howManyTab && barStyles}
`;
