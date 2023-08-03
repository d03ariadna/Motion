import React, { useState } from 'react';
import '../App.css';

const SignUpForm = () => {
  const [isSignUpActive, setIsSignUpActive] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpActive(true);
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
  };

  return (
    <div className={`container ${isSignUpActive ? 'right-panel-active' : ''}`}>
      <div className="form-container sign-up-container">
        <form action="#" className="bg-white flex items-center justify-center flex-col px-16 h-full text-center">
          <h1 className="font-bold text-2xl m-0 font-['Poppins'] text-[#B1B2FF]">Create Account</h1>
          <div className="my-5">
            <a href="#" className="border border-gray-300 rounded-full inline-flex justify-center items-center mx-1 h-10 w-10"><svg class="h-6 w-6 text-gray-700"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg></a>
            <a href="#" className="border border-gray-300 rounded-full inline-flex justify-center items-center mx-1 h-10 w-10"><svg class="h-6 w-6 text-gray-700"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M17.788 5.108A9 9 0 1021 12h-8" /></svg></a>
          </div>
          <span className="text-xs font-['Poppins'] text-[#BEBEBE] mt-3 mb-5">or use your email for registration</span>
          <input type="text" placeholder="Name" className="bg-white border-2 border-[#B1B2FF] rounded-lg py-1 px-4 my-3 w-full"/>
          <input type="email" placeholder="Email" className="bg-white border-2 border-[#B1B2FF] rounded-lg py-1 px-4 my-3 w-full"/>
          <input type="password" placeholder="Password" className="bg-white border-2 border-[#B1B2FF] rounded-lg py-1 px-4 my-3 w-full"/>
          <button className="rounded-full border border-[#B1B2FF] bg-[#B1B2FF] text-white text-sm font-bold font-['Poppins'] py-3 px-12 tracking-wide uppercase transition-transform ease-in duration-200 mt-4 mb-2'">Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form action="#" className="bg-white flex items-center justify-center flex-col px-16 h-full text-center">
          <h1 className="font-bold text-2xl m-0 font-['Poppins'] text-[#B1B2FF]">Sign in</h1>
          <div className="my-5">
            <a href="#" className="border border-gray-300 rounded-full inline-flex justify-center items-center mx-1 h-10 w-10"><svg class="h-6 w-6 text-gray-700"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg></a>
            <a href="#" className="border border-gray-300 rounded-full inline-flex justify-center items-center mx-1 h-10 w-10"><svg class="h-6 w-6 text-gray-700"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M17.788 5.108A9 9 0 1021 12h-8" /></svg></a>
          </div>
          <span className="text-xs font-['Poppins'] text-[#BEBEBE] mt-3 mb-5">or use your account</span>
          <input type="email" placeholder="Email" className="bg-white border-2 border-[#B1B2FF] rounded-lg py-1 px-4 my-3 w-full"/>
          <input type="password" placeholder="Password" className="bg-white border-2 border-[#B1B2FF] rounded-lg py-1 px-4 my-3 w-full"/>
          <a href="#" className="text-gray-700 text-sm no-underline my-4 font-['Poppins']">Forgot your password?</a>
          <button className="rounded-full border border-[#B1B2FF] bg-[#B1B2FF] text-white text-sm font-bold font-['Poppins'] py-3 px-12 tracking-wide uppercase transition-transform ease-in duration-200 mt-4 mb-2">Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left font-['Poppins']">
              <img src="motion.svg" alt="motion-logo" class="pb-10 pt-4"/>
              <h1 className='font-medium m-0 text-3xl'>Welcome Back!</h1>
              <p className='text-base font-light leading-normal  my-5 py-5'>To keep connected with us please login with your personal information</p>
              <button className="rounded-full border border-white bg-white text-[#B1B2FF] text-sm font-bold py-3 px-12 tracking-wide uppercase transition-transform ease-in duration-200" onClick={handleSignInClick}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right font-['Poppins']">
              <img src="motion.svg" alt="motion-logo" class="pb-10 pt-4"/>
              <h1 className='font-medium m-0 text-3xl '>Hello, Friend!</h1>
              <p className='text-base font-light leading-normal  my-5 py-5'>Enter your personal details and start a journey with us</p>
              <button className="rounded-full border border-white bg-white text-[#B1B2FF] text-sm font-bold py-3 px-12 tracking-wide uppercase transition-transform ease-in duration-200" onClick={handleSignUpClick}>Sign Up</button>
            </div>
          </div>
        </div>
    </div>
  );
};



export default SignUpForm;