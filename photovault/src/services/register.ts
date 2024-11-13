import React, { useState } from 'react';
import useRegex from './regex';
import { signup } from '@/app/api/register';

type RegisterForm = {
  username: string;
  email: string;
  password: string;
  description?: string;
};

const useRegister = () => {
  const { validatePassword, validateEmail } = useRegex();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [aboutMe, setAboutMe] = useState('');

  const sendRegisterRequest = (data: RegisterForm) => {
    signup(data.username, data.password, data.email, data.description)
      .then(async (response) => {
        if (response) {
          if (response.status == 403) {
            alert(response.message);
          } else {
            alert('Unknown error');
          }
        }
      })
      .catch((error) => console.error('Error registering:', error));
  };

  const userRegisterValidate = () => {
    if (!email) {
      alert('Email is required');
      return false;
    }
    if (!username) {
      alert('Username is required');
      return false;
    }
    if (!password) {
      alert('Password is required');
      return false;
    }
    if (!validateEmail(email!)) {
      alert('Incorrect email');
      return false;
    }
    if (!validatePassword(password!)) {
      alert('Password too weak');
      return false;
    }
    return true;
  };

  const registerUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (userRegisterValidate()) {
      sendRegisterRequest({
        username: username,
        email: email,
        password: password,
      });
    }
  };

  const registerPhotograph = (e: React.FormEvent) => {
    e.preventDefault();
    if (userRegisterValidate()) {
      sendRegisterRequest({
        username: username,
        email: email,
        password: password,
        description: aboutMe,
      });
    }
  };

  return {
    username,
    email,
    password,
    aboutMe,
    setUsername,
    setEmail,
    setPassword,
    setAboutMe,
    registerUser,
    registerPhotograph,
  };
};

export default useRegister;
