'use client';

import useRegister from '@/services/mutation/register';
import InputField from '@/components/Form/InputField';
import Button from '@/components/Form/Button';
import { useTranslations } from 'next-intl';

export default function Register() {
  const t = useTranslations('Form');
  const {
    username,
    email,
    password,
    setUsername,
    setEmail,
    setPassword,
    registerPhotograph: register,
  } = useRegister();

  return (
    <div className='flex items-center justify-center bg-gray-100 mt-40'>
      <form
        onSubmit={register}
        className='flex flex-col text-base max-w-[450px] w-full text-black text-opacity-40 bg-white p-8 rounded-lg shadow-md'
      >
        <h1 className='w-full text-4xl font-bold text-center text-black mb-6'>
          {t('register-photograph')}
        </h1>
        <InputField
          label={t('username')}
          type='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <Button type='submit'>{t('register-photograph')}</Button>
      </form>
    </div>
  );
}
