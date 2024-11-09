"use client"

import { useState } from 'react';
import { User } from '@prisma/client';

export default function Login() {
  const [email, setEmail] = useState<String>();
  const [password, setPassword] = useState<String>();

  const login = () => {
    if(!email || !password){
        alert("Email and password are required")
        return
    }
    fetch('/api/login', { method: "POST", body: JSON.stringify({
        email: email,
        password: password,
      }) })
      .catch(error => console.error('Error logging user:', error));
  }

  return (
    <div>
      <h1>Login:</h1>
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
    <input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Click!</button>
    </div>
  );
}