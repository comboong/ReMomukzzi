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
	:focus {
		outline: none;
	}
`;
const PasswordText = styled.div`
	font-size: 20px;
	color: red;
	margin-left: 40px;
	margin-top: 10px;
`;

function ConfirmPasswordInputField({
	handleValidation,
	handlePasswordChange,
	confirmPasswordValue,
	confirmPasswordError,
}) {
	return (
		<InputForm>
			<InputBox>
				<Input
					type="password"
					value={confirmPasswordValue}
					onChange={handlePasswordChange}
					onKeyUp={handleValidation}
					name="confirmPassword"
					placeholder="비밀번호 확인"
					className="Fix-toggle-input"
				/>
				<PasswordText>{confirmPasswordError}</PasswordText>
			</InputBox>
		</InputForm>
	);
}
export default ConfirmPasswordInputField;
