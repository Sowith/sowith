import { useEffect, useState } from "react";
import styled from "styled-components";

export const CheckBox = ({ index, checkedBox, setCheckedBox }) => {

  const [isChecked, setIsChecked] = useState(false);

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
      <label htmlFor={index} className="container">
        <input id={index}
          type="checkbox"
          onChange={handleCheckBox}
          checked={isChecked}
        />
        <div className="checkmark" checkboxnumber={checkedBox.indexOf(index) + 1}></div>
      </label>
    </WrapStyle>
  )
}

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
    color: #FFF;
    user-select: none;
    box-shadow: 0 0 0 2px #fff;
    border-radius: 50%;
  }
  .checkmark {
    position: relative;
    height: 17px;
    width: 17px;
    background: #DDDDDD;
    opacity: .5;
    border-radius: 50%;
    transition: .1s;
  }
  .container input:checked ~ .checkmark {
    background-color: #068FFF;
    opacity: 1;
  }
  .checkmark:after {
    content: attr(checkboxnumber);
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


