import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import {
  SignUpForm,
  Div,
  InputForm,
  ValidateMsg,
  Input,
  InputBox,
  SignUpButton,
  SignupText,
} from './Signup.style';
import logo from '../../images/logo-white.png';

function Signup() {
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    userId: '',
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    userId: false,
    email: false,
    nickname: false,
    password: false,
    confirmPassword: false,
  });

  function isUserIdValid() {
    const validRegex = /^[A-Za-z][A-Za-z0-9]{2,}$/;
    return validRegex.test(formValues.userId);
  }

  function isEmailValid() {
    const validRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-z]+$/;
    return validRegex.test(formValues.email);
  }

  function isNicknameValid() {
    const validRegex = /^[a-zA-Z0-9가-힣]{1,6}$/;
    return validRegex.test(formValues.nickname);
  }

  function isPasswordValid() {
    const validRegex = /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[0-9]).{7,}$/;
    return validRegex.test(formValues.password);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    if (name === 'userId') {
      setErrors({
        ...errors,
        userId: value.length > 0 && !isUserIdValid(),
      });
    } else if (name === 'email') {
      setErrors({
        ...errors,
        email: value.length > 0 && !isEmailValid(),
      });
    } else if (name === 'nickname') {
      setErrors({
        ...errors,
        nickname: value.length > 0 && !isNicknameValid(),
      });
    } else if (name === 'password') {
      setErrors({
        ...errors,
        password: value.length > 0 && !isPasswordValid(),
        confirmPassword: value !== formValues.confirmPassword,
      });
    } else if (name === 'confirmPassword') {
      setErrors({
        ...errors,
        confirmPassword: value !== formValues.password,
      });
    }
  }

  function handleSubmit(e) {
    if (
      isUserIdValid() &&
      isNicknameValid() &&
      isEmailValid() &&
      isPasswordValid()
    ) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/users`,
          {
            userid: formValues.userId,
            nickname: formValues.nickname,
            email: formValues.email,
            password: formValues.password,
          },
          { withCredentials: true }
        )
        .then(res => {
          if (res.data.message === 'exist') {
            alert('중복된 아이디가 있습니다.');
          } else if (res.data.message === 'created') {
            alert('아이디가 생성됐습니다.');
            router.push('/');
          }
        })
        .catch(err => {
          throw err;
        });
    }
  }

  return (
    <SignUpForm onSubmit={handleSubmit}>
      <Div>
        <img
          style={{
            cursor: 'pointer',
            width: '300px',
            marginBottom: '15px',
            height: '250px',
          }}
          onClick={() => router.push('/')}
          src={logo}
          border='0'
        />
        <InputForm>
          <SignupText>아이디</SignupText>
          <InputBox>
            <Input
              type='text'
              name='userId'
              value={formValues.userId}
              onChange={handleInputChange}
            />
          </InputBox>
        </InputForm>
        {errors.userId && (
          <ValidateMsg>
            아이디는 4글자 이상 영어, 숫자만 가능합니다.
          </ValidateMsg>
        )}

        <InputForm>
          <SignupText>이메일</SignupText>
          <InputBox>
            <Input
              type='email'
              name='email'
              value={formValues.email}
              onChange={handleInputChange}
              required
            />
          </InputBox>
        </InputForm>
        {errors.email && (
          <ValidateMsg>올바른 이메일 형식을 입력해주세요.</ValidateMsg>
        )}

        <InputForm>
          <SignupText>닉네임</SignupText>
          <InputBox>
            <Input
              type='text'
              name='nickname'
              value={formValues.nickname}
              onChange={handleInputChange}
            />
          </InputBox>
        </InputForm>
        {errors.nickname && (
          <ValidateMsg>올바른 닉네임 형식을 입력해주세요.</ValidateMsg>
        )}

        <InputForm>
          <SignupText>비밀번호</SignupText>
          <InputBox>
            <Input
              type='password'
              name='password'
              value={formValues.password}
              onChange={handleInputChange}
            />
          </InputBox>
        </InputForm>
        {errors.password && (
          <ValidateMsg>
            비밀번호는 최소 8자 이상, 알파벳과 숫자 및 특수문자를 포함해야
            합니다.
          </ValidateMsg>
        )}

        <InputForm>
          <SignupText>비밀번호 확인</SignupText>
          <InputBox>
            <Input
              type='password'
              name='confirmPassword'
              value={formValues.confirmPassword}
              onChange={handleInputChange}
            />
          </InputBox>
        </InputForm>
        {errors.confirmPassword && (
          <ValidateMsg>비밀번호가 일치하지 않습니다.</ValidateMsg>
        )}

        <SignUpButton type='submit'>가입하기</SignUpButton>
      </Div>
    </SignUpForm>
  );
}

export default Signup;
