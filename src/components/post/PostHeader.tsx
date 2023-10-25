import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import postFormState from "recoil/postFormState";

import { useAlertControl } from "hooks/useAlertControl";
import { AlertBox } from "components/common/AlertBox";
import { Button } from "../common/Button";

import { ReactComponent as IconArrow } from "../../assets/icon/icon-back-arrow.svg";
import { ReactComponent as IconCamera } from "../../assets/icon/icon-camera.svg";

interface HeaderProps {
  content: string;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  selectedPicture: number;
  // locationSet: boolean;
}

export const Header: React.FC<HeaderProps> = (props) => {

  const { openAlert, AlertComponent } = useAlertControl();

  const postForm = useRecoilValue(postFormState);

  const navigate = useNavigate();

  const handleGoForward = () => {
    if (props.step === 2 && !postForm.location) {
      openAlert();
    }
    if (props.step === 0 && props.selectedPicture === 0) {
      openAlert();
    }
    else {
      props.setStep(Prev => Prev === 0 || Prev === 1 ? Prev + 1 : Prev)
    }
  }

  const handleGoBack = () => {
    if (props.step === 0) {
      navigate(-1)
    }
    props.setStep(Prev => Prev === 1 || Prev === 2 ? Prev - 1 : Prev)
  }

  return (
    <>
      <AlertComponent>
        {props.step === 2 && !postForm.location ?
          <AlertBox alertMsg={"위치 지정은 필수입니다."} choice={["확인"]} /> :
          <AlertBox alertMsg={"사진 선택은 필수입니다."} choice={["확인"]} />}
      </AlertComponent>
      <WrapStyle>
        <IconArrow width={30} onClick={handleGoBack} />
        <CameraStyle step={props.step}>
          <IconCamera />
        </CameraStyle>
        <Button
          onClick={handleGoForward}
          type="button"
          text={props.content}
          width={'50px'}
          height={'30px'}
          fontSize={'12px'}
          fontFamily={'var(--font--Bold)'}
          margin={'0px'}
        />
      </WrapStyle>
    </>
  );
};

const WrapStyle = styled.div`
  width: 100%;
  /* min-width: 320px;
  max-width: 768px; */
  position: relative;
  margin: auto;
  padding-bottom: 24px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CameraStyle = styled.div<{ step: number }>`
  display: ${(props) => props.step !== 0 ? "none" : "block"};
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  padding: 6px;
  box-sizing: border-box;
  background-color: var(--main-color);
  right: 65px;
`;
