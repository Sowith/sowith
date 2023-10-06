import { useState } from 'react'
import styled from 'styled-components';

import { MainPostItem } from '../../components/main/MainPostItem';


import profile_1 from "../../assets/testImg/profile_1.jpg";
import profile_2 from "../../assets/testImg/profile_2.jpg";
import profile_3 from "../../assets/testImg/profile_3.jpg";

interface PostItem {
  profile: string,
  userId: string,
  location: string,
  heartCount: string,
  commentCount: string,
  dateInfo: string,
  content: string
  images: Array<{ src: string, filter: string }>;
}

const PostItemData: PostItem[] = [
  {
    profile: profile_1,
    userId: "nk_ella_",
    location: "종로구 인사동",
    heartCount: "32",
    commentCount: "2",
    dateInfo: "3일 전",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ab maxime unde obcaecati ratione! Cumque, sint eius, repellat perferendis magni alias a dignissimos odit dolorum eos, ducimus modi error neque!",
    images: [
      { src: "https://picsum.photos/200/191", filter: "" },
      { src: "https://picsum.photos/200/192", filter: "" },
      { src: "https://picsum.photos/200/193", filter: "" },
      { src: "https://picsum.photos/200/194", filter: "" },
      { src: "https://picsum.photos/200/195", filter: "" },
      { src: "https://picsum.photos/200/196", filter: "" },
    ]
  },
  {
    profile: profile_2,
    userId: "ds_ahn",
    location: "성수동",
    heartCount: "22",
    commentCount: "1",
    dateInfo: "5일 전",
    content: "Nostrum ab maxime unde obcaecati ratione! Cumque, sint eius, repellat perferendis magni alias a dignissimos odit dolorum eos, ducimus modi error neque!",
    images: [
      { src: "https://picsum.photos/200/197", filter: "" },
      { src: "https://picsum.photos/200/198", filter: "" },
      { src: "https://picsum.photos/200/199", filter: "" },
      { src: "https://picsum.photos/200/200", filter: "" },
      { src: "https://picsum.photos/200/201", filter: "" },
      { src: "https://picsum.photos/200/202", filter: "" },
    ]
  },
  {
    profile: profile_3,
    userId: "starseeker_h00n",
    location: "익선동",
    heartCount: "38",
    commentCount: "12",
    dateInfo: "5일 전",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ab maxime unde obcaecati ratione! Cumque, sint eius, repellat perferendis magni alias a dignissimos odit dolorum eos, ducimus modi error neque!",
    images: [
      { src: "https://picsum.photos/200/203", filter: "" },
      { src: "https://picsum.photos/200/204", filter: "" },
      { src: "https://picsum.photos/200/205", filter: "" },
      { src: "https://picsum.photos/200/206", filter: "" },
      { src: "https://picsum.photos/200/207", filter: "" },
      { src: "https://picsum.photos/200/208", filter: "" },
    ]
  },
]

export const MainPostViewPage: React.FC = () => {

  return (
    <>
      {
        PostItemData.map((item, index) => (
          <MainPostItem item={item} index={index}/>
        ))
      }
    </>
  )
}
