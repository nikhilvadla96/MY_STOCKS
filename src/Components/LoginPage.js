import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MyContext } from '../MyContextProvider';
import apiCall from '../CustomHooks/apiCall';
import { Method, Url } from '../Constants/ApiConstants';

const LoginPage = () => {
  const [state, setState] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setIsAuthenticated, setToken } = useContext(MyContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await apiCall({
        url: Url.login,
        method: Method.POST,
        state: state,
      });

      if (response && response.data.token) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('email', state.email);
        setToken(token);
        setIsAuthenticated(true);
        navigate('/');
      } else {
        throw new Error('Failed to login');
      }
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <LoginPageContainer>
      <LoginForm onSubmit={handleLogin}>
        <LoginTitle>Login to Your Account</LoginTitle>
        {error && <ErrorText>{error}</ErrorText>}
        <TextInput
          type="text"
          placeholder="Username"
          value={state.email}
          onChange={(e) => setState({ ...state, email: e.target.value })}
          required
        />
        <TextInput
          type="password"
          placeholder="Password"
          value={state.password}
          onChange={(e) => setState({ ...state, password: e.target.value })}
          required
        />
        <LoginButton type="submit">Login</LoginButton>
      </LoginForm>
    </LoginPageContainer>
  );
};

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const LoginForm = styled.form`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
`;

const LoginTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const TextInput = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const LoginButton = styled.button`
  width: 100%;
  background-color: #4caf50;const LoginPage = () => {
  const [state, setState] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setIsAuthenticated, setToken } = useContext(MyContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await apiCall({
        url: Url.login,
        method: Method.POST,
        state: state,
      });

      if (response && response.data.token) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        setToken(token);
        setIsAuthenticated(true);
        navigate('/');
      } else {
        throw new Error('Failed to login');
      }
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <LoginPageContainer>
      <LoginForm onSubmit={handleLogin}>
        <LoginTitle>Login to Your Account</LoginTitle>
        {error && <ErrorText>{error}</ErrorText>}
        <TextInput
          type="text"
          placeholder="Username"
          value={state.email}
          onChange={(e) => setState({ ...state, email: e.target.value })}
          required
        />
        <TextInput
          type="password"
          placeholder="Password"
          value={state.password}
          onChange={(e) => setState({ ...state, password: e.target.value })}
          required
        />
        <LoginButton type="submit">Login</LoginButton>
      </LoginForm>
    </LoginPageContainer>
  );
};

  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #45a049;
  }
`;

const ErrorText = styled.p`
  color: red;
  margin-bottom: 15px;
`;

export default LoginPage;
