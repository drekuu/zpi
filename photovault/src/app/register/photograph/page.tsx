"use client"

import { useState, useEffect } from 'react';
import { User } from '@prisma/client';
import useRegister from '@/services/register';

export default function Register() {

  const { setUsername, setEmail, setPassword, setAboutMe, registerPhotograph: register } = useRegister()

  return (
    <div>
      <h1>Register:</h1>
        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          placeholder="About me"
          onChange={(e) => setAboutMe(e.target.value)}
        />
      <button onClick={register}>Click!</button>
      <a href="/register">Register as User</a>
    </div>
  );
}