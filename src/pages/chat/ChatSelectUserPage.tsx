import styled from "styled-components";

import { SearchBar } from "components/search/SearchBar";
import { ChatSelectUserUI } from "../../components/chat/ChatSelectUserUI";

export const ChatSelectUser = () => {
  const handleInputClick = () => {
    // setInputClicked(true);
  };

  return (
    <>
      <SearchBar></SearchBar>
      <section>
        <SelectUserTop>
          <span>팔로우 목록</span>
        </SelectUserTop>
        <ChatSelectUserUI></ChatSelectUserUI>
        <ChatSelectUserUI></ChatSelectUserUI>
        <ChatSelectUserUI></ChatSelectUserUI>
        <ChatSelectUserUI></ChatSelectUserUI>
      </section>
    </>
  );
};

const SelectUserTop = styled.div`
  width: 88%;
  margin: 0 auto;
  font-family: var(--font--SemiBold);
  margin-bottom: 20px;
`;