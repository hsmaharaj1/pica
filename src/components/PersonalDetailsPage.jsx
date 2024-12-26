import React, { useCallback, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";
import { usePage } from '@/pages/PartnerPage';
import progressIndicator from '@/assets/progressIndicator3.svg';

const PersonalDetailsPage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const { setPage } = usePage();

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

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold">Let's Partner Up</CardTitle>
          <p className="text-gray-500">Please enter your personal details</p>
          
          {/* Progress Indicator */}
          <div className="flex justify-center items-center gap-2 mt-4">
            <img src={progressIndicator} alt="progress" />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-gray-700">GSTIN</label>
              <Input 
                type="text"
                placeholder="enter your GSTIN"
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-gray-700">PAN Card</label>
              <Input 
                type="text"
                placeholder="enter your pan number"
                className="w-full"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-gray-700">Bank Account Details</label>
              <Input 
                type="text"
                placeholder="enter your Acc No"
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-gray-700">Delivery Services</label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Do you offer delivery?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-gray-700">Pan Card Image</label>
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
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <span className="text-[#6E6CDF] hover:text-[#6261C5] text-xs">Click to upload</span>
                <span className="text-gray-500 text-xs"> or drag and drop</span>
                <p className="text-xs text-gray-500 mt-1">JPG, JPEG, PNG less than 1MB</p>
                {uploadedImage && (
                  <p className="text-green-600 mt-2">File uploaded: {uploadedImage.name}</p>
                )}
              </label>
            </div>
          </div>
          
          <Button 
            className="w-full bg-[#6E6CDF] hover:bg-[#6261C5]"
            onClick={() => setPage(4)}
          >
            Sign up
          </Button>
        </CardContent>
      </div>
    </div>
  );
};

export default PersonalDetailsPage;