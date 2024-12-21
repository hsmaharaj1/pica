import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from './ui/button';

const Offers = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState([null, null]); // State to hold images
  const [dragging, setDragging] = useState([false, false]); // State to track drag-over status
  
  // Mock product data
  const products = [
    { id: 1, name: 'Product Name', price: '1500/-' },
    { id: 2, name: 'Product Name', price: '1500/-' },
    { id: 3, name: 'Product Name', price: '1500/-' },
    { id: 4, name: 'Product Name', price: '1500/-' }
  ];

  const handleImageUpload = (index, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newImages = [...images];
        newImages[index] = reader.result; // Save image data URL for preview
        setImages(newImages);
      };
      reader.readAsDataURL(file); // Read file as data URL
    }
  };

  const handleDragOver = (index, event) => {
    event.preventDefault();
    const newDragging = [...dragging];
    newDragging[index] = true;
    setDragging(newDragging);
  };

  const handleDragLeave = (index) => {
    const newDragging = [...dragging];
    newDragging[index] = false;
    setDragging(newDragging);
  };

  const handleDrop = (index, event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0]; // Get the dropped file
    if (file) {
      handleImageUpload(index, file);
    }
    handleDragLeave(index); // Reset drag state
  };

  const renderStep1 = () => (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Upload Offer Pictures</h2>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Add the pictures of the product in format jpg and 1:4
      </p>

      <div className="flex gap-4 mb-6">
        {images.map((image, index) => (
          <div
            key={index}
            className={`border-2 ${
              dragging[index] ? "border-blue-600 bg-blue-50" : "border-gray-300"
            } border-dashed rounded-lg p-8 flex-1 flex items-center justify-center relative`}
            onDragOver={(event) => handleDragOver(index, event)}
            onDragLeave={() => handleDragLeave(index)}
            onDrop={(event) => handleDrop(index, event)}
          >
            {image ? (
              <img
                src={image}
                alt={`Uploaded ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="text-center">
                <Upload className="mx-auto mb-2" size={24} />
                <span className="text-blue-600">Drag & Drop or Upload 1:4</span>
                <input
                  type="file"
                  accept="image/jpeg, image/png"
                  onChange={(event) => handleImageUpload(index, event.target.files[0])}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            )}
          </div>
        ))}
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
        <button className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg">
          Previous
        </button>
        <button
          onClick={() => setCurrentStep(2)}
          className="px-4 py-2 text-white bg-blue-600 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );

  //   <div className="p-6 bg-white rounded-lg shadow-sm">
  //     <div className="flex justify-between items-center mb-4">
  //       <h2 className="text-lg font-semibold">Select products to apply offer</h2>
  //       <X className="cursor-pointer" size={20} />
  //     </div>

  //     <div className="space-y-3 mb-6">
  //       {products.map(product => (
  //         <div key={product.id} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
  //           <div className="flex items-center gap-3">
  //             <div className="w-8 h-8 bg-gray-300 rounded"></div>
  //             <span>{product.name}</span>
  //           </div>
  //           <span>{product.price}</span>
  //         </div>
  //       ))}
  //     </div>

  //     <button className="w-full py-2 mb-6 text-white bg-blue-600 rounded-lg">
  //       Add Products +
  //     </button>

  //     <div className="flex justify-between">
  //       <button 
  //         onClick={() => setCurrentStep(1)}
  //         className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg"
  //       >
  //         Previous
  //       </button>
  //       <button 
  //         onClick={() => setCurrentStep(3)}
  //         className="px-4 py-2 text-white bg-blue-600 rounded-lg"
  //       >
  //         Next
  //       </button>
  //     </div>
  //   </div>
  // );
  const renderStep2 = () => {
    const toggleProductSelection = (product) => {
      setSelectedProducts((prev) =>
        prev.some((p) => p.id === product.id)
          ? prev.filter((p) => p.id !== product.id)
          : [...prev, product]
      );
    };
  
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm w-[400px] h-[600px] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Select products to apply offer</h2>
          <X className="cursor-pointer" size={20}/>
        </div>
  
        {/* Search Bar */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search product"
          className="w-full px-3 py-2 mb-4 border rounded-lg"
        />
  
        {/* Product List */}
        <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto">
          {filteredProducts.map((product) => (
            <Button
              key={product.id}
              variant="outline"
              onClick={() => toggleProductSelection(product)}
              className={`flex items-center justify-between w-full p-4 rounded-lg ${
                selectedProducts.some((p) => p.id === product.id)
                  ? "bg-indigo-100 border-indigo-500"
                  : "bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <span>{product.name}</span>
              </div>
              <span>{product.price}</span>
            </Button>
          ))}
        </div>
  
        {/* Add Products Button */}
        <button className="w-full py-2 mb-6 text-white bg-blue-600 rounded-lg">
          Add Products +
        </button>
  
        {/* Selected Products */}
        {selectedProducts.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mb-3">Selected products</h3>
            <div className="space-y-3 mb-6">
              {selectedProducts.map((product) => (
                <Button
                  key={product.id}
                  variant="outline"
                  onClick={() => toggleProductSelection(product)}
                  className="flex items-center justify-between w-full p-4 bg-indigo-100 border-indigo-500 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span>{product.name}</span>
                  </div>
                  <span>{product.price}</span>
                </Button>
              ))}
            </div>
          </>
        )}
  
        {/* Navigation Buttons */}
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
  };
  

  const renderStep3 = () => (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Edit offer price</h2>
        <X className="cursor-pointer" size={20} />
      </div>

      <div className="space-y-4 mb-6">
        {selectedProducts.map(product => (
          <div key={product.id} className="flex items-center gap-4">
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