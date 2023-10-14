import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import HomeButton from '../../assets/icon/icon-bottomnav-home.svg';
import PostUploadButton from '../../assets/icon/icon-bottomnav-add_post.svg';
import SendMessageButton from '../../assets/icon/icon-bottomnav-send_messages.svg';
import ProfileButton from '../../assets/icon/icon-bottomnav-profile.svg';

interface ButtonInfo {
  path: string;
  label: string;
  icon: string;
}

const buttons: ButtonInfo[] = [
  { path: '/home', label: 'home', icon: HomeButton },
  { path: '/postupload', label: 'add post', icon: PostUploadButton },
  { path: '/chatting', label: 'send messages', icon: SendMessageButton },
  { path: '/profilePage', label: 'profile', icon: ProfileButton },
];

export const BottomNavBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={() => {
            navigate(button.path);
          }}
        >
          <img src={button.icon} alt={button.label} />
        </button>
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 49px;
  background-color: #fff;
  border-radius: 8px 8px 0 0;
  box-shadow: 0px -4px 8px 0px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: space-around;

  z-index: 1;
  position: fixed;
  bottom: 0;
  left: 0;
`;
