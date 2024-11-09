import { useState } from "react";
import useRegex from "./regex";

const useRegister = () => {
    const { validatePassword, validateEmail } = useRegex()

    const [username, setUsername] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [aboutMe, setAboutMe] = useState<string>();

    const sendRegisterRequest = (url: string, data: Record<string, unknown>) => {
        fetch(url, {
            method: "POST",
            body: JSON.stringify(data)
        })
        .catch(error => console.error('Error registering:', error));
    }
    
    const userRegisterValidate = () => {
        if(!email) {
            alert("Email is required")
            return false
        }
        if(!username) {
            alert("Username is required")
            return false
        }
        if(!password) {
            alert("Password is required")
            return false
        }
        if(!validateEmail(email!!)){
            alert("Incorrect email")
            return false
        }
        if(!validatePassword(password!!)){
            alert("Password too weak")
            return false
        }
        return true
    }

    const registerUser = () => {
        if(userRegisterValidate()) {
            sendRegisterRequest('/api/register', {
                username: username,
                email: email,
                password: password
            })
        }
    }

    const registerPhotograph = () => {
        if(userRegisterValidate()){
            sendRegisterRequest('/api/register', {
                username: username,
                email: email,
                password: password,
                description: aboutMe
            })
        }
    }

    return { setUsername, setEmail, setPassword, setAboutMe, registerUser, registerPhotograph }
}

export default useRegister