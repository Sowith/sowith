import { styled } from "styled-components"

import { Button } from "../Button";

import { ReactComponent as IconArrow } from "../../../assets/icon/icon-back-arrow.svg";
import { ReactComponent as IconCamera } from "../../../assets/icon/icon-camera.svg";

export const Header = (props) => {
  return (
    <WrapStyle>
      <IconArrow width={30} />
      <CameraStyle>
        <IconCamera />
      </CameraStyle>
      <Button
        onClick={props.handleFunc}
        type="button"
        text={props.content}
        width={'50px'}
        height={'30px'}
        fontSize={'12px'}
        fontFamily={'var(--font--Bold)'}
      />
    </WrapStyle>
  )
}

const WrapStyle = styled.div`
  width: 90%;
  min-width: 320px;
  max-width: 768px;
  position: relative;
  margin: auto;
  padding-bottom: 24px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CameraStyle = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  padding: 6px;
  box-sizing: border-box;
  background-color: var(--main-color);
  right: 65px;
`;