import React, { useState } from 'react';
import useRegex from '../regex';
import { signup } from '@/app/api/auth/register';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { RegisterData } from '@/models/register';

const useRegister = () => {
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: (registerData: RegisterData) => signup(registerData),
    onSuccess: (response) => {
      if (response?.status === 200) {
        router.push('/login');
      } else if (response?.status === 403) {
        alert(response.content);
      }
    },
    onError: (error) => console.error('Error registering:', error),
  });
  const { validatePassword, validateEmail } = useRegex();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      mutate({
        username: username,
        email: email,
        password: password,
        photograph: false,
      });
    }
  };

  const registerPhotograph = (e: React.FormEvent) => {
    e.preventDefault();
    if (userRegisterValidate()) {
      mutate({
        username: username,
        email: email,
        password: password,
        photograph: true,
      });
    }
  };

  return {
    username,
    email,
    password,
    setUsername,
    setEmail,
    setPassword,
    registerUser,
    registerPhotograph,
  };
};

export default useRegister;
