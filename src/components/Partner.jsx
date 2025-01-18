import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";
import { usePage } from '@/pages/PartnerPage';
import progressIndicator from '@/assets/progressIndicator1.svg';

const Partner = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { setPage } = usePage();
  const { data } = usePage();
  const [ownerName, setOwnerName] = useState('');
  const [ownerNumber, setOwnerNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOwnerNameChange = (e) => { setOwnerName(e.target.value); };
  const handleOwnerNumberChange = (e) => { setOwnerNumber(e.target.value); };
  const handleEmailChange = (e) => { setEmail(e.target.value); };
  const handlePasswordChange = (e) => { setPassword(e.target.value); };
  const handleConfirmPasswordChange = (e) => { setConfirmPassword(e.target.value); };

  const handleContinue = () => {
    if (!ownerName || !ownerNumber || !email || !password || !confirmPassword) {
      alert("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match.");
      setPassword('');
      setConfirmPassword('');
      return;
    }
    data.ownername = ownerName;
    data.phone = ownerNumber;
    data.email = email;
    data.password = password;
    console.log(data);
    setPage(2);
  };

  return (
    
      <div className="w-full font-poppins">
        <CardHeader className="space-y-3 text-center">
          <CardTitle className="text-3xl font-bold">Let's Partner Up</CardTitle>
          <p className="text-gray-500">Please create your account</p>
          
          {/* Progress Indicator */}
          <div className="flex justify-center items-center gap-2 mt-4">
            <img src={progressIndicator} alt="progress" />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 w-[100%]">
              <label className="text-black-700">Owner Name</label>
              <Input 
                type="text"
                placeholder="enter owner's name"
                className="w-full"
                value={ownerName}
                onChange={handleOwnerNameChange}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-gray-700">Owner Number</label>
              <Input 
                type="tel"
                placeholder="enter owner's number"
                className="w-full"
                value={ownerNumber}
                onChange={handleOwnerNumberChange}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-gray-700">Email</label>
            <Input 
              type="email"
              placeholder="admin@gmail.com"
              className="w-full"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-gray-700">Password</label>
            <div className="relative">
              <Input 
                type={showPassword ? "text" : "password"}
                placeholder="enter your password"
                className="w-full pr-10"
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-gray-700">Confirm Password</label>
            <div className="relative">
              <Input 
                type={showConfirmPassword ? "text" : "password"}
                placeholder="confirm your password"
                className="w-full pr-10"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          <Button className="w-full bg-[#6E6CDF] hover:bg-[#6261C5]" onClick={handleContinue}>
            Continue
          </Button>
        </CardContent>
      </div>
  );
};

export default Partner;