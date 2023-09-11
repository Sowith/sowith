// CheckBox.tsx

import { useEffect, useState } from "react";
import styled from "styled-components";

interface CheckBoxProps {
  index: number;
  checkedBox: number[];
  setCheckedBox: React.Dispatch<React.SetStateAction<number[]>>;
}

export const CheckBox: React.FC<CheckBoxProps> = ({ index, checkedBox, setCheckedBox }) => {
  
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
    <WrapStyle>
      <label htmlFor={String(index)} className="container">
        <input
          id={String(index)}
          type="checkbox"
          onChange={handleCheckBox}
          checked={isChecked}
        />
        <div
          className="checkmark"
          data-checkboxnumber={checkedBox.indexOf(index) + 1}
        ></div>
      </label>
    </WrapStyle>
  );
};

const WrapStyle = styled.div`

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
  .container input:checked ~ .checkmark:after {
    display: block;
  }
`;
