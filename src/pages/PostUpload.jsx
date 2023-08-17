import { useState } from "react";
import { SelectPicture } from "./PostUploadStep/SelectPicture";
import { PostInputInfo } from "./PostUploadStep/PostInputInfo";
import { SelectLocation } from "./PostUploadStep/SelectLocation";
import { SelectFolder } from "./PostUploadStep/SelectFolder";

export function PostUpload() {
  const [selectedPicture, setselectedPicture] = useState([]);
  const [step, setStep] = useState(0);
  console.log(selectedPicture);

  return (
    <>
    {
      [
      <SelectPicture
        selectedPicture={selectedPicture}
        setselectedPicture={setselectedPicture}
        setStep = {setStep}
      />
      ,
      <PostInputInfo 
        selectedPicture={selectedPicture}
        setStep = {setStep}
      />
      ,
      <SelectLocation setStep = {setStep}/>
      ,
      <SelectFolder setStep = {setStep}/>
      ,
      <div>게시물 작성 완료</div>
      ][step]
    }
    </>
  );
}
