import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import google from '../assets/google.svg';

const Login = () => {
  return (
    <div className='flex flex-col justify-center h-[100%] w-[100%] align-middle'>
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md p-6">
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
                />
            </div>
            
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                <label className="text-gray-700">One Time Password</label>
                <Button 
                    variant="link" 
                    className="text-purple-500 p-0 h-auto font-normal"
                >
                    Resend OTP
                </Button>
                </div>
                <Input 
                type="text"
                placeholder="enter your OTP"
                className="w-full"
                />
            </div>
            
            <Button className="w-full bg-purple-500 hover:bg-purple-600">
                Sign in
            </Button>
            
            <div className="flex items-center gap-4 w-[42%]">
                <Separator className="flex-grow"/>
                <span className="text-gray-500 text-sm">OR</span>
                <Separator className="flex-grow"/>
            </div>
            
            <Button 
                variant="outline" 
                className="w-full"
            >
                <img 
                src={google} 
                alt="Google" 
                className="w-5 h-5 mr-2"
                />
                Continue with Google
            </Button>
            
            <p className="text-center text-gray-500">
                Didn't have an Account?{' '}
                <Button 
                variant="link" 
                className="text-purple-500 p-0 h-auto font-normal"
                >
                Sign-up
                </Button>
            </p>
            </CardContent>
        </Card>
        </div>
    </div>
    
  );
};

export default Login;