import { useState } from "react";
import styled from "styled-components";

export function PostInputInfo({ selectedPicture, setStep }) {

  const [postInfoFormData, setPostInfoFormData] = useState({
    postText: "",
    localLocation: "",
    personTag: "",
    selectFolder: "",
    hashtag: "",
  });

  const handleData = (e) => {
    const { id, value } = e.target;
    setPostInfoFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedPicture, postInfoFormData);
  };

  return (
    <>
      <h1>PostUpload</h1>
      <h2>정보입력</h2>
      <PostInputInfoWrap>
        <SelectedPictureWrap>
          {selectedPicture.map((image, index) => (
            <ul>
              <li key={index}>
                {<img src={`https://picsum.photos/200/19${image}`} alt={`Album ${index}`} />}
              </li>
            </ul>
          ))}
        </SelectedPictureWrap>
        <FormWrap onSubmit={(e)=>{
          handleSubmit(e);
          setStep(4);
          }}
        >
          <fieldset>
            <label htmlFor="postText">게시글텍스트</label>
            <input
              type="text"
              id="postText"
              value={postInfoFormData.postText}
              onChange={handleData}
              placeholder="게시할 내용을 적어보세요"
            ></input>
            <label htmlFor="localLocation">위치검색</label>
            <input
              type="text"
              id="localLocation"
              value="임의값"
              onClick={()=>setStep(2)}
              style={{cursor: "pointer"}}
              required
              placeholder="게시물과 관련된 위치를 설정해보세요"
            ></input>
            <label htmlFor="personTag">사람태그</label>
            <input
              type="text"
              id="personTag"
              value={postInfoFormData.personTag}
              onChange={handleData}
              placeholder="함께한 사람이 있다면 태그해보세요"
            ></input>
            <label htmlFor="selectFolder">폴더지정</label>
            <input
              type="text"
              id="selectFolder"
              value="임의값"
              style={{cursor: "pointer"}}
              onClick={()=>setStep(3)}
              placeholder="그룹화하고 싶은 폴더가있다면 선택해보세요"
            ></input>
            <label htmlFor="hashtag">해쉬태그</label>
            <input
              type="text"
              id="hashtag"
              value={postInfoFormData.hashtag}
              onChange={handleData}
              placeholder="해쉬태그를 입력해보세요"
            ></input>
          </fieldset>
          <div>
            <button type="submit">게시</button>
          </div>
        </FormWrap>
      </PostInputInfoWrap>
    </>
  )
}

const PostInputInfoWrap = styled.div`
  width: 600px;
  margin: auto;
  position: relative;
`;

const SelectedPictureWrap = styled.li`
  list-style-type: none;
  display: flex;
  overflow-x: scroll;

  & img {
    width: 200px;
    height: 200px;
    vertical-align: top;
    object-fit: cover;
  }
  & ul {
    list-style-type: none;
  }
`;

const FormWrap = styled.form`
  width: 80%;
  background-color: #756e6e;
  margin: 0 auto;

  & fieldset {
    display: flex;
    flex-direction: column;
    border: none;
    padding: 0;
    &:nth-child(2) {
      flex-direction: row;
    }
    & input {
      margin-top: 10px;
      padding: 5px;
    }
  }
  & > div {
    text-align: center;
    & button {
      display: inline-block;
      background-color: white;
      border: none;
      margin-bottom: 10px;
      cursor: pointer;
    }
  }
`;

