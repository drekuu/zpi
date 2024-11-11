import { useState } from "react";
import useRegex from "./regex";
import { useRouter } from 'next/navigation'

const useRegister = () => {
    const { validatePassword, validateEmail } = useRegex()
    const router = useRouter()
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [aboutMe, setAboutMe] = useState("");

    const sendRegisterRequest = (url: string, data: Record<string, unknown>) => {
        fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            credentials:'include'
        }).then(async response => {
            if (response.status == 201) {

                router.push('/login')
            }
            else if (response.status == 403) {
                alert((await response.json()).status)
            }
            else{
                alert("Unknown error")
            }
        })
            .catch(error => console.error('Error registering:', error));
    }

    const userRegisterValidate = () => {
        if (!email) {
            alert("Email is required")
            return false
        }
        if (!username) {
            alert("Username is required")
            return false
        }
        if (!password) {
            alert("Password is required")
            return false
        }
        if (!validateEmail(email!!)) {
            alert("Incorrect email")
            return false
        }
        if (!validatePassword(password!!)) {
            alert("Password too weak")
            return false
        }
        return true
    }

    const registerUser = (e: React.FormEvent) => {
        e.preventDefault();
        if (userRegisterValidate()) {
            sendRegisterRequest('/api/register', {
                username: username,
                email: email,
                password: password
            })
        }
    }

    const registerPhotograph = (e: React.FormEvent) => {
        e.preventDefault();
        if (userRegisterValidate()) {
            sendRegisterRequest('/api/register', {
                username: username,
                email: email,
                password: password,
                description: aboutMe
            })
        }
    }

    return { username, email, password, aboutMe, setUsername, setEmail, setPassword, setAboutMe, registerUser, registerPhotograph }
}

export default useRegister