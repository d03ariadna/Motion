import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../App.css";

import { API } from "../components/API";


const LogIn = () => {

  const navigate = useNavigate();


  const [isSignUpActive, setIsSignUpActive] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [nameR, setNameR] = useState("");
  const [emailR, setEmailR] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [avatarR, setAvatarR] = useState("");
  const [messageR, setMessageR] = useState("");

  const handleSignUpClick = () => {
    setIsSignUpActive(true);
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (res.status == 200) {
      assignUser(email);
      // navigate('/dashboard');
    } else if (res.status == 401) {
      setEmail("");
      setPassword("");
      setMessage("Invalid credentials");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (nameR !== "" && emailR !== "" && passwordR !== "") {
      const res = await fetch(`${API}/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameR,
          email: emailR,
          password: passwordR,
          avatar: avatarR,
        }),
      });

      if (res.status === 200) {
        assignUser(emailR)
      }
    } else {
      setMessageR("You have to complete all fields");
    }
  };

  const assignUser = async (email) => {

    const result = await fetch(`${API}/user/${email}`)
    const user = await (result.json());
    const userCookie = JSON.stringify(user);
    
    Cookies.set("Session", userCookie);
    
    //navigate('/dashboard');
    window.location.reload();
  
  }

  return (
    <div className={`container ${isSignUpActive ? "right-panel-active" : ""}`}>
      {/* CREATE Account */}
      <div className="form-container sign-up-container">
        <form
          action="#"
          className="bg-white flex items-center justify-center flex-col px-16 h-full text-center"
        >
          <h1 className="font-bold text-3xl m-0 font-['Poppins'] text-[#B1B2FF]">
            Create Account
          </h1>
          <div className="my-4">
            <a
              href="https://www.facebook.com"
              className=" inline-flex justify-center items-center mx-2 h-10 w-10"
            >
              <img src="img/fb.png" alt="facebookicon" width={"35px"} />
            </a>
            <a
              href="https://www.google.com.mx"
              className="  inline-flex justify-center items-center mx-2 h-10 w-10"
            >
              <img
                src="img/google.svg"
                alt="googleicon"
                width={"35px"}
                className="text-gray-300"
              />
            </a>
          </div>
          <span className="text-xs font-['Poppins'] text-[#BEBEBE] mb-3">
            or use your email for registration
          </span>
          <input
            type="text"
            id="nameR"
            placeholder="Username"
            className="shadow border-gray-300 text-gray-700 leading-tight tracking-wider focus:outline-none focus:shadow-outline focus:border-2 focus:border-purple-400 rounded-lg py-2.5 px-3 my-3 w-full placeholder:text-gray-400 font-['Poppins'] font-light text-sm"
            onChange={(e) => {
              setNameR(e.target.value);
            }}
            value={nameR}
          />
          <input
            type="email"
            id="emailR"
            placeholder="Email"
            className="shadow border-gray-300 text-gray-700 leading-tight tracking-wider focus:outline-none focus:shadow-outline focus:border-2 focus:border-purple-400 rounded-lg py-2.5 px-3 my-3 w-full placeholder:text-gray-400 font-['Poppins'] font-light text-sm"
            onChange={(e) => {
              setEmailR(e.target.value);
            }}
            value={emailR}
          />

          <input
            type="password"
            id="passwordR"
            placeholder="Password"
            className="shadow border-gray-300 text-gray-700 leading-tight tracking-wider focus:outline-none focus:shadow-outline focus:border-2 focus:border-purple-400 rounded-lg py-2.5 px-3 my-3 w-full placeholder:text-gray-400 font-['Poppins'] font-light text-sm"
            onChange={(e) => {
              setPasswordR(e.target.value);
            }}
            value={passwordR}
          />
          <input
            type="text"
            id="avatarR"
            placeholder="Avatar URL"
            className="shadow border-gray-300 text-gray-700 leading-tight tracking-wider focus:outline-none focus:shadow-outline focus:border-2 focus:border-purple-400 rounded-lg py-2.5 px-3 my-3 w-full placeholder:text-gray-400 font-['Poppins'] font-light text-sm"
            onChange={(e) => {
              setAvatarR(e.target.value);
            }}
            value={avatarR}
          />
          <p className="text-red-500 text-xs italic mt-2">{messageR}</p>
          <button
            onClick={handleRegister}
            className="rounded-full border border-[#B1B2FF] bg-[#B1B2FF] text-white text-sm font-semibold font-['Poppins'] py-3 px-12 tracking-wide uppercase transition-transform ease-in duration-200 mt-3'"
          >
            Sign Up
          </button>
        </form>
      </div>

      {/* Already Account */}
      <div className="form-container sign-in-container">
        <form
          action="#"
          className="bg-white flex items-center justify-center flex-col px-16 h-full text-center"
        >
          <h1 className="font-bold text-3xl m-0 font-['Poppins'] text-[#B1B2FF]">
            Sign into Motion
          </h1>
          <div className="my-5">
            <a
              href="https://www.facebook.com"
              className=" inline-flex justify-center items-center mx-2 h-10 w-10"
            >
              <img src="img/fb.png" alt="facebookicon" width={"35px"} />
            </a>
            <a
              href="https://www.google.com.mx"
              className="  inline-flex justify-center items-center mx-2 h-10 w-10"
            >
              <img
                src="img/google.svg"
                alt="googleicon"
                width={"35px"}
                className="text-gray-300"
              />
            </a>
          </div>
          <span className="text-xs font-['Poppins'] text-[#BEBEBE]  mb-5">
            or use your account
          </span>
          <input
            type="email"
            placeholder="Email"
            className="shadow border-gray-300 text-gray-700 leading-tight tracking-wider focus:outline-none focus:shadow-outline focus:border-2 focus:border-purple-400 rounded-lg py-2.5 px-3 my-3 w-full placeholder:text-gray-400 font-['Poppins'] font-light text-sm"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />

          <input
            type="password"
            placeholder="Password"
            className="shadow border-gray-300 text-gray-700 leading-tight tracking-wider focus:outline-none focus:shadow-outline focus:border-2 focus:border-purple-400 rounded-lg py-2.5 px-3 my-3 w-full placeholder:text-gray-400 font-['Poppins'] font-light text-sm"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <p className="text-red-500 text-xs italic mt-2">{message}</p>
          <hr className="w-44 h-px  bg-gray-400 border-0 dark:bg-gray-700" />

          <button
            onClick={handleSignIn}
            className="rounded-full border border-[#B1B2FF] bg-[#B1B2FF] text-white text-sm font-semibold font-['Poppins'] py-3 px-12 tracking-wide uppercase transition-transform ease-in duration-200 mt-4 mb-2"
          >
            Sign In
          </button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left font-['Poppins']">
            <img
              src="img/logoM.png"
              width={"110px"}
              alt="motion-logo"
              className="pb-10 pt-4"
            />
            <h1 className="font-medium m-0 text-3xl">Welcome Back!</h1>
            <p className="text-base font-light leading-normal  my-5 py-3">
              To keep connected with us please login with your personal
              information
            </p>
            <button
              className="rounded-full border border-white bg-white text-[#B1B2FF] text-sm font-semibold py-3 px-12 tracking-wide uppercase transition-transform ease-in duration-200"
              onClick={handleSignInClick}
            >
              Already have an account
            </button>
          </div>
          <div className="overlay-panel overlay-right font-['Poppins']">
            <img
              src="img/logoM.png"
              width={"110px"}
              alt="motion-logo"
              className="pb-10 pt-4"
            />
            <h1 className="font-medium m-0 text-3xl ">Hello, Friend!</h1>
            <p className="text-base font-light leading-normal  my-5 py-3">
              Enter your personal details and start a journey with us
            </p>
            <button
              className="rounded-full border border-white bg-white text-[#B1B2FF] text-sm font-semibold py-3 px-12 tracking-wide uppercase transition-transform ease-in duration-200"
              onClick={handleSignUpClick}
            >
              Create my account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
