import styled from "styled-components"

import { ReactComponent as IconTrash } from "../../assets/icon/icon-trash-delete.svg"
import { ReactComponent as IconShare } from "../../assets/icon/icon-share.svg"
import { ReactComponent as IconLocation } from "../../assets/icon/icon-location-pin.svg"

export const MainPostMoreMenu = ({ closeModal }) => {
  return (
    <WrapStyle>
      <button className="actions-btn" onClick={closeModal}>
        <IconTrash height={30} />
        <span>삭제</span>
      </button>
      <button className="actions-btn" onClick={closeModal}>
        <IconShare height={30} />
        <span>공유</span>
      </button>
      <button className="actions-btn" onClick={closeModal}>
        <IconLocation height={30} />
        <span>위치보기</span>
      </button>
    </WrapStyle>
  )
}

const WrapStyle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  padding: 20px 22px;

  .actions-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: calc((100% / 3) - 25px);
    padding: 15px 0;
    box-shadow: 0 5px 10px rgba(0, 0, 0, .3);
    border-radius: 15px;

  &:nth-child(1) {
    color: #FA7564;
  }
  &:nth-child(2) {
    color: #068FFF;
  }
  &:nth-child(3) {
    color: #FC9763;
  }
  }
`;