'use client'

import Link from "next/link";
import React, { useState } from "react";
import '../index.css'
import { isUsernameExists, signup } from "../api";
import { debounce } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { BeatLoader } from 'react-spinners';

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleError = ()=>{
    setError("Unable to Sign Up. Please try again.");
  }

  const handleSignUp = async(e: any) => {
    e.preventDefault();
    setIsLoading(true);
    await signup(name, email, mobileNo, username, password, handleError)
    setIsLoading(false);
  };

  const debouncedHanldeValidity = debounce(async(event: any)=>{
    const isExist = await isUsernameExists(event.target.value);
    if(isExist){
      event.target.setCustomValidity('This username already exists'); 
    }
  }, 300)


  const handleInputUsername = async (e: any) => {
    setUsername(e.target.value);
    e.target.setCustomValidity('');
    const isValid = e.target.validity.valid;
    if (isValid) {
      debouncedHanldeValidity(e);
    }

  };
  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          minLength={2}
          maxLength={50}
          onChange={(e)=> setName(e.target.value)}     
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          minLength={4}
          maxLength={20}
          onChange={handleInputUsername}
          required
        />
        <input
          type="tel"
          placeholder="Mobile Number"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
          pattern="[0-9]{10}"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          pattern= "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*+]).{8,}$"
          required
        />
        {error && (
          <p className="error-message">
            <FontAwesomeIcon icon={faExclamationCircle} style={{ marginRight: "8px" }} />
            {error}
          </p>
        )}
        <button type="submit">
           {isLoading ? (
             <BeatLoader color="#ffffff" size={8} />
           ) : (
             "Sign Up"
           )}
        </button>
      </form>
      <p>
        Already have an account? <Link href='/signin' className='link'> Sign In </Link>
      </p>
    </div>
  );
};

export default SignUpForm;