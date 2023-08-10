import React, { useState } from 'react';
import '../App.css';
import { Container } from 'react-bootstrap';

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
            <h1 className="font-bold text-3xl m-0 font-['Poppins'] text-[#B1B2FF]">Create Account</h1>
            <div className="my-5">
              <a href="https://www.facebook.com" className=" inline-flex justify-center items-center mx-2 h-10 w-10">
                <img src="img/fb.png" alt="facebookicon" width={'35px'}/>
              </a>
              <a href="https://www.google.com.mx" className="  inline-flex justify-center items-center mx-2 h-10 w-10">
                <img src="img/google.svg" alt="googleicon" width={'35px'} class="text-gray-300"/>
              </a>
              
            </div>
            <span className="text-xs font-['Poppins'] text-[#BEBEBE] mb-5">or use your email for registration</span>
            <input type="text" placeholder="Name" className="bg-white border-2 border-[#B1B2FF] rounded-lg py-1 px-4 my-3 w-full"/>
            <input type="email" placeholder="Email" className="bg-white border-2 border-[#B1B2FF] rounded-lg py-1 px-4 my-3 w-full"/>
            <input type="password" placeholder="Password" className="bg-white border-2 border-[#B1B2FF] rounded-lg py-1 px-4 my-3 mb-5 w-full"/>
            <button className="rounded-full border border-[#B1B2FF] bg-[#B1B2FF] text-white text-sm font-semibold font-['Poppins'] py-3 px-12 tracking-wide uppercase transition-transform ease-in duration-200 mt-4 mb-2'">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#" className="bg-white flex items-center justify-center flex-col px-16 h-full text-center">
            <h1 className="font-bold text-3xl m-0 font-['Poppins'] text-[#B1B2FF]">Sign into Motion</h1>
            <div className="my-5">
              <a href="https://www.facebook.com" className=" inline-flex justify-center items-center mx-2 h-10 w-10">
                <img src="img/fb.png" alt="facebookicon" width={'35px'}/>
              </a>
              <a href="https://www.google.com.mx" className="  inline-flex justify-center items-center mx-2 h-10 w-10">
                <img src="img/google.svg" alt="googleicon" width={'35px'} class="text-gray-300"/>
              </a>
              
            </div>
            <span className="text-xs font-['Poppins'] text-[#BEBEBE]  mb-5">or use your account</span>
            <input type="email" placeholder="Email" className="bg-white border-2 border-[#B1B2FF] rounded-lg py-1 px-4 my-3 w-full"/>
            <input type="password" placeholder="Password" className="bg-white border-2 border-[#B1B2FF] rounded-lg py-1 px-4 my-3 w-full"/>
            <a href="#" className="text-gray-700 text-sm no-underline mt-5 font-['Poppins']">Forgot your password?</a>
            <hr class="w-44 h-px  bg-gray-400 border-0 dark:bg-gray-700"/>


            <button className="rounded-full border border-[#B1B2FF] bg-[#B1B2FF] text-white text-sm font-semibold font-['Poppins'] py-3 px-12 tracking-wide uppercase transition-transform ease-in duration-200 mt-4 mb-2">Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left font-['Poppins']">
                <img src="img/logoM.png" width={'110px'} alt="motion-logo" class="pb-10 pt-4"/>
                <h1 className='font-medium m-0 text-3xl'>Welcome Back!</h1>
                <p className='text-base font-light leading-normal  my-5 py-3'>To keep connected with us please login with your personal information</p>
                <button className="rounded-full border border-white bg-white text-[#B1B2FF] text-sm font-semibold py-3 px-12 tracking-wide uppercase transition-transform ease-in duration-200" onClick={handleSignInClick}>Sign In</button>
              </div>
              <div className="overlay-panel overlay-right font-['Poppins']">
                <img src="img/logoM.png" width={'110px'} alt="motion-logo" class="pb-10 pt-4"/>
                <h1 className='font-medium m-0 text-3xl '>Hello, Friend!</h1>
                <p className='text-base font-light leading-normal  my-5 py-3'>Enter your personal details and start a journey with us</p>
                <button className="rounded-full border border-white bg-white text-[#B1B2FF] text-sm font-semibold py-3 px-12 tracking-wide uppercase transition-transform ease-in duration-200" onClick={handleSignUpClick}>Sign Up</button>
              </div>
            </div>
          </div>
      </div>
  );
};



export default SignUpForm;