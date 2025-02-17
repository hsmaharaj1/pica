import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import google from '../assets/google.svg';
import loginImg from '../assets/login.svg';
import logo from "../assets/logo.svg"
import { useState, useEffect } from 'react';
import apiCall from '@/apiCalls';


const Login = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOtpButton, setShowOtpButton] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [otp, setOtp] = useState('');

  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
      setTimer(30);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setShowOtpButton(value.length > 0);
  };

  const handleSendOtp = async () => {
    const endpoint = `https://api.picapool.com/v2/otp?mobile=${phoneNumber}`;
    try {
      const result = await apiCall("post", endpoint);
      console.log("OTP Sent Successfully:", result);
    } catch (error) {
      console.error("Failed to Send OTP. Details:");
      console.error("Error Response Data:", error.response?.data);
      console.error("Error Message:", error.message);
    }
    setIsTimerActive(true);
  };

  const getOtpButtonText = () => {
    if (!showOtpButton) return '';
    if (!isTimerActive) return 'Send OTP';
    if (timer > 0) return `Resend in ${timer}s`;
    return 'Resend OTP';
  };

  const handleLogin = async () => {
    const endpoint = "https://api.picapool.com/v2/auth/login/Partner";
    const phoneNumber1 = phoneNumber
    const otp1 = otp
    try{
      const endpoint2 = `https://api.picapool.com/v2/otp/verify?mobile=${phoneNumber1}&otp=${otp1}`;
      const result2 = await apiCall("get", endpoint2);
      if(!result2.success) return console.log("OTP Verification Failed:", result2);
    } catch (error) {
      console.error("OTP Verification Failed. Details:");
      console.error("Error Response Data:", error.response?.data);
      console.error("Error Message:", error.message);
      return;
    }
    try {
      const result = await apiCall("post", endpoint, {
        msgOTP: {
          mobile: phoneNumber1,
          otp: otp1,
        },
      });
      console.log("Login Successful:", result);
    } catch (error) {
      console.error("Login Failed. Details:");
      console.error("Error Response Data:", error.response?.data);
      console.error("Error Message:", error.message);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="h-[10%] p-[1%]">
        <img src={logo} alt="PicaPool" />
      </div>
      <div className="flex overflow-hidden font-poppins">
        <div className="flex flex-col justify-center align-middle w-[50%]">
          <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md">
              <CardHeader className="space-y-2 text-center">
                <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
                <p className="text-gray-500">Please login your account</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-gray-700">Phone Number</label>
                  <Input
                    type="tel"
                    placeholder="+91 XXXXX - XXXXX"
                    className="w-full"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700">One Time Password</label>
                    {showOtpButton && (
                      <Button
                        variant="link"
                        className="text-[#6E6CDF] p-0 h-auto font-normal"
                        onClick={handleSendOtp}
                        disabled={isTimerActive && timer > 0}
                      >
                        {getOtpButtonText()}
                      </Button>
                    )}
                  </div>
                  <Input
                    type="text"
                    placeholder="enter your OTP"
                    className="w-full"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <Button 
                className="w-full bg-[#6E6CDF] hover:bg-[#6261C5]" 
                onClick={() => handleLogin()}>

                  Sign in
                </Button>
                <div className="w-full flex flex-col items-center justify-center">
                  <div className="flex items-center gap-4">
                    <Separator className="flex-grow w-10" />
                    <span className="text-gray-500 text-sm">OR</span>
                    <Separator className="flex-grow w-10" />
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <img src={google} alt="Google" className="w-5 h-5 mr-2" />
                  Continue with Google
                </Button>
                <p className="text-center text-gray-500">
                  Didn't have an Account?{' '}
                  <Button
                    variant="link"
                    className="text-[#6E6CDF] p-0 h-auto font-semibold"
                    onClick={() => navigate('/signup')}
                  >
                    Sign-up
                  </Button>
                </p>
              </CardContent>
            </div>
          </div>
        </div>
        <div className="w-[50%] flex justify-end">
          <img src={loginImg} alt="Login" className="w-[70%] mr-[10%]" />
        </div>
      </div>
    </div>
  );
};

export default Login;
