import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePage } from '@/pages/PartnerPage';
import progressIndicator from '@/assets/progressIndicator1.svg';

const Partner = () => {
  const { setPage } = usePage();
  const { data, setData } = usePage();
  const [ownerName, setOwnerName] = useState('');
  const [ownerNumber, setOwnerNumber] = useState('');
  const [email, setEmail] = useState('');
  const data2 = data;

  const handleOwnerNameChange = (e) => { setOwnerName(e.target.value); };
  const handleOwnerNumberChange = (e) => { setOwnerNumber(e.target.value); };
  const handleEmailChange = (e) => { setEmail(e.target.value); };

  const handleContinue = () => {
    if (!ownerName || !ownerNumber || !email) {
      alert("All fields are required.");
      return;
    }
    data2.ownername = ownerName;
    data2.phone = ownerNumber;
    data2.email = email;
    setData(data2);
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
          
          <Button className="w-full bg-[#6E6CDF] hover:bg-[#6261C5]" onClick={handleContinue}>
            Continue
          </Button>
        </CardContent>
      </div>
  );
};

export default Partner;