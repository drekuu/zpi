"use client"

import { useState, useEffect } from 'react';
import useRegister from '@/services/register';
import InputField from '@/components/Form/InputField';
import Button from '@/components/Form/Button';

export default function Register() {

  const { username, email, password, aboutMe, setUsername, setEmail, setPassword, setAboutMe, registerPhotograph: register } = useRegister()

  return (
    <div className="flex items-center justify-center bg-gray-100 mt-40">
    <form onSubmit={register} className="flex flex-col text-base max-w-[450px] w-full text-black text-opacity-40 bg-white p-8 rounded-lg shadow-md" >
      <h1 className="w-full text-4xl font-bold text-center text-black mb-6">Register</h1>
      <InputField
        label="Username"
        type="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <InputField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <InputField
        label="About me"
        type="About me"
        value={aboutMe}
        onChange={(e) => setAboutMe(e.target.value)}
        required
      />

      <Button type="submit">Register</Button>
    
    </form>
  </div>
  );
}