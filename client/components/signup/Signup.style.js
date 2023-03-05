import styled from 'styled-components';

export const SignUpForm = styled.form`
  margin: 0 auto;
  padding-top: 50px;
  width: 550px;
  height: 500px;
  font-weight: 700;
  text-align: left;
  border-radius: 5px;
  background-color: white;
`;

export const Div = styled.div`
  margin: 0 auto;
  padding-top: 20px;
  width: 440px;
  height: 70%;
  & > img {
    width: 300px;
    margin-left: 75px;
  }
`;

export const InputForm = styled.div`
  margin: 0 auto;
  margin: 5px;
`;

export const ValidateMsg = styled.div`
  display: ${props => (props.hide ? 'none' : '')};
  color: ${props => (props.hide ? '' : 'red')};
  padding-left: 5px;
`;

export const Input = styled.input`
  width: 390px;
  border-style: none;
  height: 35px;
  margin-left: 5px;
  font-size: 13px;
  :focus {
    outline: none;
  }
`;

export const InputBox = styled.div`
  width: 430px;
  height: 40px;
  border: solid 1px gainsboro;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const SignUpButton = styled.div`
  width: 430px;
  height: 45px;
  margin-top: 30px;
  margin-bottom: 20px;
  border-radius: 5px;
  text-align: center;
  background-color: #ffba34;
  color: white;
  cursor: pointer;
  line-height: 40px;
`;

export const SignupText = styled.div`
  font-size: 20px;
`;
