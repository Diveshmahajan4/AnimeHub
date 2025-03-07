import { useRouter } from "next/router";
import { useCallback, useState } from "react"
import { signIn } from 'next-auth/react'

import Input from "@/components/Input"
import axios from "axios";

import {FcGoogle }  from 'react-icons/fc'
import {BsGithub }  from 'react-icons/bs'



const auth = () => {
    const router = useRouter();
    const [email , setEmail] = useState("");
    const [name, setName] = useState("");
    const [password ,setPassword] = useState("");
     
    const [variant, setVariant] = useState("login")

    const toggleVariant = useCallback(() => {
        setVariant((curr) => curr === 'login' ? 'register' : 'login')
    }, [])

    const handleSignInWithProvider = async (provider: "google" | "github") => {
        try {
            const result = await signIn(provider, { redirect: false }); 

            if (result?.ok) {
                router.push('/profiles'); 
            } else {
                console.error("Login failed:", result?.error);
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const login = useCallback(async () => {
        try{
            const result = await signIn('credentials', {
                email, 
                password,
                redirect: false 
            });
    
            if (result?.ok) {
                router.push('/profiles');  
            } else {
                console.error("Login failed:", result?.error);
            }
        }catch(error){
            console.log(error)
        }
    }, [email, password, router])

    const register = useCallback(async () => {
        try{
            await axios.post('/api/register', {
                email, 
                name, 
                password
            }) 

            login();
        }catch(error){
            console.log(error);
        }
    }, [email, name, password, login]);


  return (
    <div className="relative w-full h-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
        <div className="bg-black w-full h-full bg-opacity-60">
            <nav className="px-12 py-5">
                <img src="/images/logo.png" alt="logo" className="h-16 rounded-md"/>
            </nav>
            <div className="flex justify-center">
                <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                    <h2 className="text-white text-4xl mb-8 font-semibold">
                        {variant === 'login' ? 'Sign in' : "Register"}
                    </h2>
                    <div className="flex flex-col gap-4">
                        {variant === 'register' && (
                            <Input
                                label="Username"
                                onChange = {(e: any) => {setName(e.target.value)}}
                                id="name"
                                type="text"
                                value={name}
                            />
                        )}
                        
                        <Input
                        label="Email"
                        onChange = {(e: any) => {setEmail(e.target.value)}}
                        id="email"
                        type="email"
                        value={email}
                        />
                        <Input
                        label="Password"
                        onChange = {(e: any) => {setPassword(e.target.value)}}
                        id="password"
                        type="password"
                        value={password}
                        />
                    </div>
                    <button onClick={variant === 'login' ? login : register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                    {variant === 'login' ? "Login" : "Sign Up"}
                    </button> 
                    <div className="flex items-center gap-4 mt-8 justify-center">
                        <div onClick={() => handleSignInWithProvider('google')}
                         className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                            <FcGoogle size={30}/>
                        </div>
                        <div onClick={() => handleSignInWithProvider('github')}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                            <BsGithub size={30}/>
                        </div>
                    </div>
                    <p className="text-neutral-500 mt-12">
                        {variant === 'login' ? 'First time using AnimeHub?' : 'Already have an account? '}
                        <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                            {variant === 'login' ? 'Create an account' : 'Login'}
                        </span>
                    </p>  
                </div>
                
            </div>
            
        </div>
    </div>
  )
}

export default auth