import styled from "styled-components";

const InputForm = styled.div`
  margin: 0 auto;
  margin: 5px;
`;
const InputBox = styled.div`
	width: 300px;
	height: 300px
	border-bottom: solid 2px gainsboro;
`;
const Input = styled.input`
  width: 200px;
  border-style: none;
  height: 39px;
  padding-left: 5px;
  font-size: 20px;
  border-bottom: solid 2px gainsboro;
  margin-top: 10px;
  :focus {
    outline: none;
  }
`;
const PasswordText = styled.div`
  font-size: 20px;
  margin-left: 40px;
  margin-top: 10px;
`;

function PasswordInputField({
  handleValidation,
  handlePasswordChange,
  passwordValue,
  passwordError,
}) {
  return (
    <InputForm>
      <InputBox>
        <Input
          type="password"
          value={passwordValue}
          onChange={handlePasswordChange}
          onKeyUp={handleValidation}
          name="password"
          placeholder="비밀번호"
        />
        <PasswordText>{passwordError}</PasswordText>
      </InputBox>
    </InputForm>
  );
}
export default PasswordInputField;
