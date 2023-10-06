import { styled } from 'styled-components';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { GroupUI } from 'components/common/GroupUI';
import { SearchBar } from '../../components/search/SearchBar';

export const ProfileGroupDetailPage = () => {
  const { currentStep } = useParams();
  const [detailPage, setDetailPage] = useState<number>(
    parseInt(currentStep || '1')
  );

  const openTabMenu = (e) => {
    setDetailPage(e);
  };

  const callSearchAPI = () => {
    console.log('검색 API 호출');
  };

  return (
    <ProfileGroupDetailPageWrap>
      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        <SearchBar onSearchButtonClick={callSearchAPI} />
      </div>
      {detailPage === 1 ? (
        <>
          <div className="participated group-tab">
            <span>참여한 그룹</span>
          </div>
          <GroupUI></GroupUI>
          <GroupUI></GroupUI>
          <GroupUI></GroupUI>
        </>
      ) : (
        <>
          <div className="follow group-tab">
            <span>팔로우한 그룹</span>
          </div>
          <GroupUI></GroupUI>
          <GroupUI></GroupUI>
          <GroupUI></GroupUI>
        </>
      )}
    </ProfileGroupDetailPageWrap>
  );
};

const ProfileGroupDetailPageWrap = styled.div`
  & .group-tab {
    cursor: pointer;
    width: 88%;
    margin: 10px auto 0;
    display: flex;
    justify-content: space-between;
    & span {
      font-family: var(--font--SemiBold);
      line-height: 27px;
    }
    & img {
      width: 27px;
    }
  }
`;
