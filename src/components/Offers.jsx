import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

const Offers = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);
  
  // Mock product data
  const products = [
    { id: 1, name: 'Product Name', price: '1500/-' },
    { id: 2, name: 'Product Name', price: '1500/-' },
    { id: 3, name: 'Product Name', price: '1500/-' },
    { id: 4, name: 'Product Name', price: '1500/-' }
  ];

  const renderStep1 = () => (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Upload Offer pictures</h2>
        <X className="cursor-pointer" size={20} />
      </div>
      <p className="text-sm text-gray-500 mb-4">Add the pictures of the product in format jpg and 1:4</p>
      
      <div className="flex gap-4 mb-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex-1 flex items-center justify-center">
          <div className="text-center">
            <Upload className="mx-auto mb-2" size={24} />
            <span className="text-blue-600">Upload 1:4</span>
          </div>
        </div>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex-1 flex items-center justify-center">
          <div className="text-center">
            <Upload className="mx-auto mb-2" size={24} />
            <span className="text-blue-600">Upload 1:4</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm mb-2">Enter offer title</label>
        <input
          type="text"
          placeholder="Enter text here"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="flex justify-between">
        <button className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg">Previous</button>
        <button 
          onClick={() => setCurrentStep(2)}
          className="px-4 py-2 text-white bg-blue-600 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Select products to apply offer</h2>
        <X className="cursor-pointer" size={20} />
      </div>

      <div className="space-y-3 mb-6">
        {products.map(product => (
          <div key={product.id} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-300 rounded"></div>
              <span>{product.name}</span>
            </div>
            <span>{product.price}</span>
          </div>
        ))}
      </div>

      <button className="w-full py-2 mb-6 text-white bg-blue-600 rounded-lg">
        Add Products +
      </button>

      <div className="flex justify-between">
        <button 
          onClick={() => setCurrentStep(1)}
          className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg"
        >
          Previous
        </button>
        <button 
          onClick={() => setCurrentStep(3)}
          className="px-4 py-2 text-white bg-blue-600 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Edit offer price</h2>
        <X className="cursor-pointer" size={20} />
      </div>

      <div className="space-y-4 mb-6">
        {products.slice(0, 2).map(product => (
          <div key={product.id} className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gray-300 rounded"></div>
            <div className="flex-1">
              <div className="text-sm">{product.name}</div>
              <div className="flex gap-4 mt-2">
                <div className="flex-1">
                  <label className="block text-xs mb-1">Original Price</label>
                  <input
                    type="text"
                    value={product.price}
                    readOnly
                    className="w-full p-2 bg-gray-100 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs mb-1">Offer Price</label>
                  <input
                    type="text"
                    placeholder="Enter price"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button 
          onClick={() => setCurrentStep(2)}
          className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg"
        >
          Previous
        </button>
        <button className="px-4 py-2 text-white bg-blue-600 rounded-lg">
          Add
        </button>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return renderStep1();
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {renderCurrentStep()}
    </div>
  );
};

export default Offers;