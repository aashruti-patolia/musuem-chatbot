"use client";
import React, { useEffect, useState } from 'react';
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

function Page() {
    const [login, setLogin] = useState(true);
    const [loginData, setLoginData] = useState({ username: "", password: "" });
    const [signUpData, setSignUpData] = useState({ username: "", email: "", password: "", confirm: "" });
    const [errors, setErrors] = useState([]);
    const { data: session } = useSession();
    console.log(session)
    // useEffect(() => {
    //     const fetchSession = async () => {
    //         const session = await getSession();
    //         console.log(session, "session data fetched on mount");
    //     };
    //     fetchSession();
    // }, [loginData   ]);

    const validatePassword = (password) => {
        const errors = [];
        if (password.length < 8) errors.push('Password must be at least 8 characters long.');
        if (!/[A-Z]/.test(password)) errors.push('Password must contain at least one uppercase letter.');
        if (!/[a-z]/.test(password)) errors.push('Password must contain at least one lowercase letter.');
        if (!/[0-9]/.test(password)) errors.push('Password must contain at least one number.');
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('Password must contain at least one special character.');
        return errors;
    };

    const handleForm = async (e) => {
        e.preventDefault();
        try {
            const res = await signIn("credentials", {
                username: loginData.username,
                password: loginData.password,
                redirect: false
            });
            if (res?.error) {
                console.error(res.error, "sfsd");
            } else {
                console.log("User logged in successfully");
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        const validationErrors = validatePassword(signUpData.password);
        if (validationErrors.length === 0) {
            try {
                const sendform = await fetch("http://localhost:5000/signup", {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(signUpData)
                });
                const data = await sendform.json();
                console.log(data);
                setSignUpData({ username: "", email: "", password: "", confirm: "" });
            } catch (error) {
                console.error("Sign-up error:", error);
            }
        } else {
            setErrors(validationErrors);
        }
    };

    const handleChange = (e, formType = "login") => {
        const { name, value } = e.target;
        if (formType === "login") {
            setLoginData(prev => ({ ...prev, [name]: value }));
        } else {
            setSignUpData(prev => ({ ...prev, [name]: value }));
        }
    };

    return (
        <div className='flex justify-center items-center min-h-[80svh]'>
            {login ? (
                <div className='border bg-slate-100 px-5 py-10 rounded-lg'>
                    <h1 className='text-center mb-3'>Log in</h1>
                    <form onSubmit={handleForm} className='space-y-3'>
                        <div>
                            <input
                                className='w-full border border-black rounded-lg px-3'
                                type="text"
                                placeholder='username'
                                name='username'
                                value={loginData.username}
                                onChange={(e) => handleChange(e, "login")}
                            />
                        </div>
                        <div>
                            <input
                                className='w-full border border-black rounded-lg px-3'
                                type="password"
                                placeholder='password'
                                name='password'
                                value={loginData.password}
                                onChange={(e) => handleChange(e, "login")}
                            />
                        </div>
                        <div className='button'>
                            <button
                                type='submit'
                                className='border border-gray-800 w-full my-3 rounded-full bg-purple-500 text-white'
                            >
                                Log in
                            </button>
                        </div>
                    </form>
                    <div>
                        Don't have an account? <button className='text-blue-500' onClick={() => setLogin(false)}>Sign Up</button>
                    </div>
                    <div>
                        <button onClick={signOut}>logout</button>
                    </div>
                </div>
            ) : (
                <div className='border bg-slate-100 px-5 py-10 rounded-lg'>
                    <h1 className='text-center mb-3'>Sign Up</h1>
                    <form onSubmit={handleSignUp} className='space-y-3'>
                        <div>
                            <input
                                className='w-full border border-black rounded-lg px-3'
                                type="text"
                                name='username'
                                placeholder='username'
                                value={signUpData.username}
                                onChange={(e) => handleChange(e, "signup")}
                            />
                        </div>
                        <div>
                            <input
                                className='w-full border border-black rounded-lg px-3'
                                type="email"
                                name='email'
                                placeholder='email'
                                value={signUpData.email}
                                onChange={(e) => handleChange(e, "signup")}
                            />
                        </div>
                        <div>
                            <input
                                className='w-full border border-black rounded-lg px-3'
                                type="password"
                                name='password'
                                placeholder='password'
                                value={signUpData.password}
                                onChange={(e) => handleChange(e, "signup")}
                            />
                        </div>
                        {errors.length > 0 && (
                            <div className="text-red-600 max-w-60">
                                <ul className="list-disc space-y-2">
                                    {errors.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div>
                            <input
                                className='w-full border border-black rounded-lg px-3'
                                type="password"
                                name='confirm'
                                placeholder='confirm password'
                                value={signUpData.confirm}
                                onChange={(e) => handleChange(e, "signup")}
                            />
                        </div>
                        <div className='button'>
                            <button
                                type='submit'
                                className='border border-gray-800 w-full my-3 rounded-full bg-purple-500 text-white'
                            >
                                Register
                            </button>
                        </div>
                    </form>
                    <div>
                        Already have an account? <button className='text-blue-500' onClick={() => setLogin(true)}>Log in</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Page;
