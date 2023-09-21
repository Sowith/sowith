import React from "react";
import styled from "styled-components";

import { Input } from "../../components/post/PostInput";
import { SelectedPicture } from "../../components/post/PostSelectedPicture";

import IconPhraseWrite from "../../assets/icon/icon-phrase-write.svg";
import IconLocation from "../../assets/icon/icon-location.svg";
import IconFolder from "../../assets/icon/icon-folder.svg";
import IconHashTag from "../../assets/icon/icon-hash-tag.svg";
import IconUserTag from "../../assets/icon/icon-user-tag.svg";

interface PostInputInfoPageProps {
  setStep: (step: number) => void;
}

export const PostInputInfoPage: React.FC<PostInputInfoPageProps> = ({ setStep }) => {
  return (
    <WrapStyle>
      <SelectedPicture />
      <Input
        type="text"
        id="addPhraseWrite"
        label={'문구 입력'}
        placeholder="문구 입력..."
        icon={IconPhraseWrite}
        height={"100px"}
        isTextarea={true}
      />
      <Input
        type="text"
        id="addLocation"
        label={'위치 추가'}
        height={"50px"}
        placeholder="위치 추가 (필수)"
        icon={IconLocation}
        onClick={() => setStep(1)}
      />
      <Input
        type="text"
        id="addFolder"
        label={'폴더 지정'}
        placeholder="폴더 지정"
        icon={IconFolder}
        onClick={() => setStep(2)}
      />
      <Input
        type="text"
        id="addHashTag"
        label={'해쉬 태그'}
        placeholder="해쉬 태그"
        icon={IconHashTag}
        onClick={() => setStep(3)}
      />
      <Input
        type="text"
        id="addHumanTag"
        label={'사람 태그'}
        placeholder="사람 태그"
        icon={IconUserTag}
        onClick={() => setStep(4)}
      />
    </WrapStyle>
  );
};

const WrapStyle = styled.div`
  position: relative;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;