'use client'
import Link from 'next/link';
import '../index.css'

import React, { useState } from "react";
import { signIn } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { BeatLoader } from 'react-spinners';


const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleError = ()=>{
    setError("Invalid credentials. Please try again.");
  }

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    await signIn(username, password, handleError);
    setIsLoading(false)

  };

  return (

    <div className="form-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
            "Sign In"
          )}
        </button>
      </form>
      <p>
        Don't have an account?  <Link href='/signup' className='link'> Sign Up </Link>
      </p>



    </div>


  );
};

export default SignInForm;
