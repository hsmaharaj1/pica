import React, { useCallback, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Upload } from "lucide-react";
import { usePage } from '@/pages/PartnerPage';
import progressIndicator from '@/assets/progressIndicator2.svg';
import { set } from 'react-hook-form';

const StoreDetailsPage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const { setPage } = usePage();
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState('');
  const [storeName, setStoreName] = useState('');
  const [aboutStore, setAboutStore] = useState('');

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.size <= 1024 * 1024) { // 1MB limit
      setUploadedImage(file);
    }
  }, []);

  const handleFileInput = (e) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 1024 * 1024) { // 1MB limit
      setUploadedImage(file);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setAddress('using your current location');
          setError(null); // Clear previous errors, if any
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  const handleStoreNameChange = (e) => { setStoreName(e.target.value); };
  const handleAboutStoreChange = (e) => { setAboutStore(e.target.value); };
  const handleAddressChange = (e) => { setAddress(e.target.value); };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold">Let's Partner Up</CardTitle>
          <p className="text-gray-500">Please enter your store details</p>
          
          {/* Progress Indicator */}
          <div className="flex justify-center items-center gap-2 mt-4">
            <img src={progressIndicator} alt="progress" />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-gray-700">Store Name</label>
              <Input 
                type="text"
                placeholder="enter store name"
                className="w-full"
                value={storeName}
                onChange={handleStoreNameChange}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-gray-700">About Store</label>
              <Input
                type="text" 
                placeholder="enter store details"
                className="w-full"
                value={aboutStore}
                onChange={handleAboutStoreChange}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-gray-700">Store Address</label>
            <div className="flex gap-2">
              <Input 
                type="text"
                placeholder="enter your address"
                className="w-full"
                value={address}
                onChange={handleAddressChange}
              />
              <Button 
                variant="secondary"
                className="bg-[#6E6CDF] hover:bg-[#6261C5]"
                onClick={() => getLocation()}
              >
                <MapPin className="text-white" size={20} />
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-gray-700">Upload Image</label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
                ${dragActive ? 'border-[#6E6CDF] bg-purple-50' : 'border-gray-300'}
                ${uploadedImage ? 'bg-green-50' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                onChange={handleFileInput}
                accept=".jpg,.jpeg,.png"
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="mx-auto h-8 w-8 text-gray-400 " />
                <span className="text-[#6E6CDF] hover:text-[#6261C5] text-xs">Click to upload</span>
                <span className="text-gray-500 text-xs"> or drag and drop</span>
                <p className=" text-gray-500 mt-1 text-xs">JPG, JPEG, PNG less than 1MB</p>
                {uploadedImage && (
                  <p className="text-green-600 mt-2 text-sm">File uploaded: {uploadedImage.name}</p>
                )}
              </label>
            </div>
          </div>
          
          <Button onClick={()=>console.log(uploadedImage)} className="w-full bg-[#6E6CDF] hover:bg-[#6261C5]">
            Continue
          </Button>
        </CardContent>
      </div>
    </div>
  );
};

export default StoreDetailsPage;