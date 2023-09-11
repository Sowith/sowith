import styled from 'styled-components';

export const AlertBox = ({ alertMsg, choice, handleFunc }) => {
  return (
    <div>
    <AlertStyle>
      <p>{alertMsg}</p>
      <ButtonStyle>
      <button className='cancel' onClick={handleFunc}>{choice[0]}</button>
      {choice[1] && <button className='delete' onClick={handleFunc}>{choice[1]}</button>}
      </ButtonStyle>
    </AlertStyle>
    </div>
  );
}

const ButtonStyle = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex; 
`;

const AlertStyle = styled.div`
  position: relative;
  width: 256px;
  height: 110px;
  border-radius: 10px;
  background-color: #4A4940;
  overflow: hidden;
  font-size: 16px;
  text-align: center;
  
  p {
    padding-top: 27px;
    color: #FFF;
  }
  button {
    transition: all .3s;
    &:hover{
      background-color: var(--gray300-color);
    }
  }
  .cancel {
    flex-grow: 1;
    flex-basis: 0;
    display: inline-block;
    height: 40px;
    border-top: 1px solid #FFF;
    color: #3969BA;
    &:hover{
    }
  }
  .delete {
    width: 126px;
    height: 40px;
    color: #F22222;
    border-top: 1px solid #FFF;
  }
`;