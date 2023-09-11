import { styled } from "styled-components"

import { useModalControl } from "../../hooks/useModalControl";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/post/Input";
import { CheckBox } from "../../components/common/CheckBox";

import { ReactComponent as IconCreateFolder } from "../../assets/icon/icon-create-folder.svg";
import IconHashTag from "../../assets/icon/icon-hash-tag.svg";

export const PostCreateFolderPage = () => {

  const { openModal, closeModal, ModalComponent } = useModalControl();

  return (
    <>
      <button onClick={openModal}>모달열기</button>
      <ModalComponent>
        <IconCreateFolderPosition>
          <IconCreateFolder width={100} height={100} />
        </IconCreateFolderPosition>

        <Container>
          <InputWrap>
            <FolderNameInput placeholder="폴더명">
            </FolderNameInput>
          </InputWrap>

          <Input
            type="text"
            id="addHashTag"
            label={'해쉬 태그'}
            height={"50px"}
            placeholder="해쉬 태그"
            icon={IconHashTag}
          >
          </Input>

          <CheckPointWrap>
            <CheckPoint>
              <p>공개</p>
              <CheckBox id={"public"} />
            </CheckPoint>
            <CheckPoint>
              <p>비공개</p>
              <CheckBox id={"private"} />
            </CheckPoint>
          </CheckPointWrap>

        </Container>

        <Button
          type="button"
          text={"생성"}
          width={'90%'}
          height={'41px'}
          fontSize={'12px'}
          margin={'auto 0 12px'}
          fontFamily={'var(--font--Bold)'}
          onClick={closeModal}
        />
      </ModalComponent>
    </>
  )
}

const Container = styled.div`
  width: 60%;
  height: calc(100% - 170px);
`;

const IconCreateFolderPosition = styled.div`
  padding-top: 65px;
  margin-left: 20px;
`;

const InputWrap = styled.div`
  margin: auto;
  text-align: center;
  margin-bottom: 32px;
  max-height: 76px;
  padding: 8px 0;
  box-shadow: 0px 2px 0 0px var(--main-color);
  min-height: 50px;
  box-sizing: border-box;  
`;

const FolderNameInput = styled.input`
  margin: auto;
  width: 100%;
  font-size: 20px;
  text-align: center;
  border: none;
  outline: none;
  background-color: unset;
`;

const CheckPointWrap = styled.div`
  margin-top: 25px;
`;

const CheckPoint = styled.div`
  padding: 5px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
