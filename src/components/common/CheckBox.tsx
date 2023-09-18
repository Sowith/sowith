import { useState, useEffect } from "react";
import styled, { css } from "styled-components";

import IconCheck from "../../assets/icon/icon-check.svg";

interface CheckBoxProps {
  index: number;
  checkedBox: number[];
  setCheckedBox: React.Dispatch<React.SetStateAction<number[]>>;
}

export const CountCheckBox: React.FC<CheckBoxProps> = ({ index, checkedBox, setCheckedBox }) => {

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheckBox = () => {
    setIsChecked(prevData => !prevData);
  };

  useEffect(() => {
    if (isChecked) {
      setCheckedBox(prevData => [...prevData, index]);
    } else {
      setCheckedBox(prevData => prevData.filter(item => item !== index));
    }
  }, [isChecked]);

  return (
    <CountCheckBoxStyle>
      <label htmlFor={String(index)} className="container">
        <input
          id={String(index)}
          type="checkbox"
          onChange={handleCheckBox}
          checked={isChecked}
        />
        {checkedBox && <div
          className="checkmark"
          data-checkboxnumber={checkedBox.indexOf(index) + 1}
        ></div>}
      </label>
    </CountCheckBoxStyle>
  );
};


export const SquareCheckBox: React.FC<CheckBoxProps> = ({ index, checkedBox, setCheckedBox }) => {

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheckBox = () => {
    setIsChecked((prevData) => !prevData);
  };

  useEffect(() => {
    isChecked && setCheckedBox(prevData => [...prevData, index]);
  }, [isChecked]);

  return (
    <SquareCheckBoxStyle>
      <label htmlFor={String(index)} className="container">
        <input
          id={String(index)}
          type="checkbox"
          onChange={handleCheckBox}
          checked={isChecked}
        />
        {checkedBox && <div className="checkmark"></div>}
      </label>
    </SquareCheckBoxStyle>
  );
};

export const CircleCheckBox: React.FC<CheckBoxProps> = ({ index, checkedBox, setCheckedBox }) => {

  const handleCheckBox = () => {
    setCheckedBox(prevData => {
      if (prevData.includes(index)) {
        return prevData.filter(item => item !== index);
      } else {
        return [...prevData, index];
      }
    });
  };

  return (
    <CircleCheckBoxStyle>
      <label htmlFor={String(index)} className="container">
        <input
          id={String(index)}
          type="checkbox"
          onChange={handleCheckBox}
          checked={checkedBox.includes(index)} 
        />
        <div className="checkmark"></div>
      </label>
    </CircleCheckBoxStyle>
  );
};


const CommonStyle = css`
  .container input {
    position: absolute;
    opacity: 1;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  .container {
    display: block;
    position: relative;
    cursor: pointer;
    font-size: 7px;
    font-weight: bold;
    color: #FFF;
    user-select: none;
    box-shadow: 0 0 0 2px #fff;
    border-radius: 50%;
  }
  .container input:checked ~ .checkmark:after {
    display: block;
  }
`;

const CountCheckBoxStyle = styled.div`
  ${CommonStyle}

  .container input {
    position: absolute;
    opacity: 1;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  .container {
    display: block;
    position: relative;
    cursor: pointer;
    font-size: 7px;
    font-weight: bold;
    color: #fff;
    user-select: none;
    box-shadow: 0 0 0 2px #fff;
    border-radius: 50%;
  }
  .checkmark {
    position: relative;
    height: 17px;
    width: 17px;
    background: #dddddd;
    opacity: 0.5;
    border-radius: 50%;
    transition: 0.1s;
  }
  .container input:checked ~ .checkmark {
    background-color: #068fff;
    opacity: 1;
  }
  .checkmark:after {
    content: attr(data-checkboxnumber);
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    display: none;
  }
`;

const SquareCheckBoxStyle = styled.div`
  ${CommonStyle}

  .checkmark {
    position: relative;
    height: 25px;
    width: 25px;
    background: #DBDBDB url(${IconCheck}) no-repeat center;
    opacity: .5;
    border-radius: 5px;
  }
  .container input:checked ~ .checkmark {
    background: #FC9763 url(${IconCheck}) no-repeat center;
    opacity: 1;
  }
`;

const CircleCheckBoxStyle = styled.div`
  ${CommonStyle}

  .checkmark {
    position: relative;
    height: 25px;
    width: 25px;
    border: solid 2px transparent;
    border-radius: 50%;
    background: #DBDBDB url(${IconCheck}) no-repeat center;
  }
  .checkmark:after {
    content: "";
    height: 25px;
    width: 25px;
    background: url(${IconCheck}) no-repeat center;
  }
  .container input:checked ~ .checkmark {
    background-image: linear-gradient(#FC9763, #FC9763),
    linear-gradient(to right, #ff547c, #ffc76c);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    outline: none;
  }
`;