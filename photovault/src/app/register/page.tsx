"use client"
import useRegister from '@/services/register';

export default function Register() {
 
  const { setUsername, setEmail, setPassword, registerUser: register } = useRegister()

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
      <button onClick={register}>Click!</button>
      <a href="/register/photograph">Register as photograph</a>
    </div>
  );
}