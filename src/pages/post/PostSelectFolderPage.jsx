import styled from "styled-components";

export function SelectFolder({ setStep }) {
  return (
    <>
      <h1>PostUpload</h1>
      <h2>폴더설정</h2>
      <SelectFolderWrap>
        <div>
          <label htmlFor="searchFolder">폴더명 검색 (hidden처리)</label>
          <input id="searchFolder" type="text" placeholder="폴더명 검색" />
          <button>정렬버튼</button>
        </div>
        <FolderListStyle>
          <FolderStyle onClick={() => setStep(1)}>
            <img src="https://picsum.photos/200/191" alt="" />
            <p>폴더명</p>
          </FolderStyle>
          <FolderStyle onClick={() => setStep(1)}>
            <img src="https://picsum.photos/200/192" alt="" />
            <p>폴더명</p>
          </FolderStyle>
          <FolderStyle onClick={() => setStep(1)}>
            <img src="https://picsum.photos/200/193" alt="" />
            <p>폴더명</p>
          </FolderStyle>
          <FolderStyle onClick={() => setStep(1)}>
            <img src="https://picsum.photos/200/194" alt="" />
            <p>폴더명</p>
          </FolderStyle>
          <FolderStyle onClick={() => setStep(1)}>
            <img src="https://picsum.photos/200/195" alt="" />
            <p>폴더명</p>
          </FolderStyle>
          <FolderStyle onClick={() => setStep(1)}>
            <img src="https://picsum.photos/200/196" alt="" />
            <p>폴더명</p>
          </FolderStyle>
        </FolderListStyle>
        <button type="button">폴더생성하기</button>
      </SelectFolderWrap>
    </>

  )
}

const SelectFolderWrap = styled.div`
  position: relative;
  width: 600px;
  padding: 30px;
  box-sizing: border-box;

  margin: auto;
  display: flex;
  flex-direction: column;
  background-color: #756e6e;

  & input {
    width: 460px;
    margin-top: 10px;
    padding: 5px;
  }
  & button {
    position: absolute;
    bottom: 30px;
    right: 50%;
    transform: translateX(50%);
  }
`;

const FolderListStyle = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
  padding: 0;

  & img {
      width: 174px;
      height: 174px;
      object-fit: cover;
      vertical-align: top;
    }
  & p {
    background-color: #fff;
    text-align: center;
    margin: 0;
  }
`;

const FolderStyle = styled.div`
  position: relative;
  cursor: pointer;
`;