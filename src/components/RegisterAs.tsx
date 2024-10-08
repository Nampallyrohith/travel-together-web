import startImg from "@/assets/start-img.png";
import "../App.css";
import { Mail } from "lucide-react";

import logo from "../assets/logo.png";
import { Button } from "./ui/button";
import { useState } from "react";
import SignUp from "@/shared/SignUp";
import Login from "@/shared/Login";

const RegisterAs = () => {
  const [isSignUp, setIsSignUp] = useState<boolean | null>(null);

  const handleSignUp = (val: boolean) => {
    setIsSignUp(val);
  };

  return (
    <div className="bg-background-start w-full h-screen flex justify-start items-center gap-32 relative">
      <div className="absolute top-10 left-20 flex items-center">
        <img src={logo} alt="travel-logo" className="size-14" />
        <div className="ml-2">
          <p className="text-base logo-heading-1 text-white font-semibold">
            Travel
          </p>
          <p className="logo-heading-2 text-white text-lg">Together</p>
        </div>
      </div>
      <div className="hidden md:block w-1/2">
        <img
          src={startImg}
          alt="Start or registration page image"
          className="ml-auto"
        />
      </div>
      <div className="w-full md:w-1/2 ">
        <div className="glass border border-2 border-white rounded-lg bg-opacity-10 px-5 py-3 w-3/5  text-white">
          {isSignUp === null && (
            <>
              <div className="mb-5">
                <h1 className="text-white font-bold tracking-wider text-xl text-left">
                  Let's Get Started 🚀
                </h1>
                <p className="my-2 text-left">Sign up for your account</p>
                <Button
                  aria-label="Sign up with email"
                  className="px-12 text-base font-semibold w-full my-6 bg-background-start border border-2 border-white rounded-lg hover:bg-white hover:text-[#4dd1d6] tracking-wider"
                  onClick={() => handleSignUp(true)}
                >
                  <Mail className="mr-2 h-4 w-4" /> Sign up
                </Button>
              </div>

              <hr />
              <p className="text-sm text-left">
                Already have an account?{" "}
                <button
                  className="text-base font-semibold"
                  onClick={() => {
                    handleSignUp(false);
                  }}
                >
                  Log in
                </button>
              </p>
            </>
          )}
          {isSignUp === true && <SignUp handleSignUp={handleSignUp} />}
          {isSignUp === false && <Login handleSignUp={handleSignUp} />}
        </div>
      </div>
    </div>
  );
};

export default RegisterAs;
