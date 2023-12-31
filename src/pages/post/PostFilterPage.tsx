import styled from 'styled-components'

import { SelectedFilter } from 'components/post/PostSelectedFilter'
import { FilterPreview } from 'components/post/PostFilterPreview'

import { useRecoilValue } from 'recoil'
import postFormState from 'recoil/postFormState'

import iconImageUpload from '../../assets/icon/icon-image-upload.svg'

interface FilterProps {
  filterStorage: any;
  setFilterStorage: React.Dispatch<React.SetStateAction<any>>;
  selectedPicture: string;
  setSelectedPicture: React.Dispatch<React.SetStateAction<string>>;
}

export const PostFilterPage: React.FC<FilterProps> = ({ filterStorage, setFilterStorage, selectedPicture, setSelectedPicture }) => {

  const postForm = useRecoilValue(postFormState)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const imageArray = Array.from(files).map((file) => ({
        src: URL.createObjectURL(file),
        filter: ""
      }));
      setFilterStorage(imageArray);
    }
  };

  const handleUploadClick = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput && fileInput.click();
  };


  return (
    <WrapperStyle>
      {postForm.picture.length === 0 ? (
        <ImageUploadArea>
          <UploadBtn onClick={handleUploadClick}>
            <label htmlFor="fileInput" className="upload-area"></label>
            <input onChange={handleImageChange} id="fileInput" className="a11y-hidden" type="file" accept="image/*" multiple />
            <span className="description">이미지 업로드 <br /> JPG, PNG 형식만 가능합니다</span>
          </UploadBtn>
        </ImageUploadArea>
      ) : (
        <>
          <SelectedFilter filterStorage={filterStorage} setFilterStorage={setFilterStorage} setSelectedPicture={setSelectedPicture} />
          <FilterPreview selectedPicture={selectedPicture} filterStorage={filterStorage} setFilterStorage={setFilterStorage} />
        </>
      )
      }
    </WrapperStyle>
  )
}

const WrapperStyle = styled.div`
  height: inherit;  
  display: flex;
  flex-direction: column;
`;

const ImageUploadArea = styled.div`
  position: relative;
  text-align: center;
  display: inline-block;
  min-height: 60%;
  width: 100%;
  border-radius: 5px;
  box-sizing: border-box;
  border: 2px solid var(--main-color);
  `;

const UploadBtn = styled.div`
  cursor: pointer;
  width: 200px;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;

  .upload-area {
    display: block;
    margin: auto;
    margin-bottom: 10px;
    width: 50px;
    height: 50px;
    background: url(${iconImageUpload}) no-repeat center;
    background-size: 100%; 
    pointer-events: none;
  }
  .description {
    transform: translate(-50%, -50%);
    font-size: 1rem;
    width: 200px;
  }
`;