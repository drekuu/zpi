"use client"

import { useState } from 'react';
import React from 'react';
import Button from '@/components/Form/Button';
import InputField from '@/components/Form/InputField';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!email || !password){
        alert("Email and password are required")
        return
    }
    const result = await fetch('/api/login', { method: "POST", body: JSON.stringify({
        email: email,
        password: password,
      }) })
      .then (async response =>  {
        if(response.status == 200){
          const resp = (await response.json()).token
          console.log(resp)
          document.cookie = `token=${resp}; Path=/; max-age=10h`; 
          // document.cookie = `token=${resp}; HttpOnly; Path=/; max-age=10h`; 
          console.log(document.cookie)
          router.push('/')
        }
        else if(response.status == 403)
          alert((await response.json()).status)
      })
      .catch(error => console.error('Error logging user:', error));
      
     
  }

  return (
    <div className="flex items-center justify-center bg-gray-100 mt-40">
    <form onSubmit={login} className="flex flex-col text-base max-w-[450px] w-full text-black text-opacity-40 bg-white p-8 rounded-lg shadow-md" >
      <h1 className="w-full text-4xl font-bold text-center text-black mb-6">Login</h1>
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
      <div className="mt-3.5 w-full text-right">
        <a href="#" className="text-black text-opacity-40 hover:text-opacity-60 transition-colors">Forgot password?</a>
      </div>
      <Button type="submit">Login</Button>
      <div className="flex overflow-hidden gap-6 items-start px-8 py-3 mt-3.5 w-full leading-none border border-solid border-black border-opacity-10 min-h-[46px] rounded-[62px] text-black text-opacity-60">
        <p className="w-full">
          {"Don't have an account? "} 
          <Link href="/register"
          className="underline hover:text-opacity-80 transition-colors">
            Join
          </Link>
        </p>
      </div>
    </form>
  </div>
  );
}