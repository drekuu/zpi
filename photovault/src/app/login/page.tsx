'use client';

import { useState } from 'react';
import React from 'react';
import Button from '@/components/Form/Button';
import InputField from '@/components/Form/InputField';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { signin } from '@/app/api/login';
import { useMutation } from '@tanstack/react-query';

type LoginData = {
  email: string;
  password: string;
};

export default function Login() {
  const { mutate } = useMutation({
    mutationFn: (loginData: LoginData) =>
      signin(loginData.email, loginData.password),
    onSuccess: (response) => {
      if (response?.status === 403) {
        alert(response.message);
      }
    },
    onError: (error) => console.error('Error logging user:', error),
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const t = useTranslations('Form');

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Email and password are required');
      return;
    }
    mutate({ email, password });
  };

  return (
    <div className='flex items-center justify-center bg-gray-100 mt-40'>
      <form
        onSubmit={login}
        className='flex flex-col text-base max-w-[450px] w-full text-black text-opacity-40 bg-white p-8 rounded-lg shadow-md'
      >
        <h1 className='w-full text-4xl font-bold text-center text-black mb-6'>
          {t('login')}
        </h1>
        <InputField
          label='Email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          label={t('password')}
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className='mt-3.5 w-full text-right'>
          <a
            href='#'
            className='text-black text-opacity-40 hover:text-opacity-60 transition-colors'
          >
            {t('forgot-password')}
          </a>
        </div>
        <Button type='submit'>{t('login')}</Button>
        <div className='flex overflow-hidden gap-6 items-start px-8 py-3 mt-3.5 w-full leading-none border border-solid border-black border-opacity-10 min-h-[46px] rounded-[62px] text-black text-opacity-60'>
          <p className='w-full'>
            {t('no-account')}
            <Link
              href='/register'
              className='underline hover:text-opacity-80 transition-colors'
            >
              {t('join')}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
