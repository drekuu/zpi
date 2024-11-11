"use client"
import Button from '@/components/Form/Button';
import InputField from '@/components/Form/InputField';
import useRegister from '@/services/register';
import Link from 'next/link';

 

export default function Register() {
 
  const { username, email, password, setUsername, setEmail, setPassword, registerUser: register } = useRegister()

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
   
      <Button type="submit">Register</Button>
      <div className="flex overflow-hidden gap-6 items-start px-8 py-3 mt-3.5 w-full leading-none border border-solid border-black border-opacity-10 min-h-[46px] rounded-[62px] text-black text-opacity-60">
        <p className="w-full">
          
          <Link href="/register/photograph"
          className="flex justify-center hover:text-opacity-80 transition-colors">
            Want to register as a photograph
          </Link>
        </p>
      </div>
    </form>
  </div>


  );
}