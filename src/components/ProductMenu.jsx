import React, { useState } from 'react'
import { Button } from './ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from "@/components/ui/textarea";
import { PenIcon, Trash2Icon, X as CloseIcon, Upload } from 'lucide-react';

export default function ProductMenu() {

  const [products, setProducts] = useState([{
    id: 1,
    image: "/api/placeholder/40/40",
    name: "Product Name",
    category: "Lorem",
    offerType: "ipsum",
    stock: "899",
    status: "Active",
    price: "1500"
  }]);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    offerType: '',
    stock: '',
    price: '',
    description: '',
    status: 'Active',
    image: null,
    imagePreview: null
  });
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 10;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({
          ...newProduct,
          image: file,
          imagePreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({
          ...newProduct,
          image: file,
          imagePreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const productId = products.length + 1;
    setProducts([...products, {
      id: productId,
      image: newProduct.imagePreview || "/api/placeholder/40/40",
      ...newProduct
    }]);
    setIsAddProductOpen(false);
    setNewProduct({
      name: '',
      category: '',
      offerType: '',
      stock: '',
      price: '',
      description: '',
      status: 'Active',
      image: null,
      imagePreview: null
    });
  };

  const handleDelete = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const AddProductPanel = () => (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg border-l transform transition-transform duration-300 ease-in-out overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Add New Product</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setNewProduct({
                name: '',
                category: '',
                offerType: '',
                stock: '',
                price: '',
                description: '',
                status: 'Active',
                image: null,
                imagePreview: null
              });
              setIsAddProductOpen(false)
            }}
          >
            <CloseIcon className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleAddProduct} className="space-y-6">
          <div className="space-y-2">
            <Label>Product Image</Label>
            <div
              className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById('imageInput').click()}
            >
              {newProduct.imagePreview ? (
                <div className="relative group">
                  <img
                    src={newProduct.imagePreview}
                    alt="Product preview"
                    className="w-full h-48 object-cover rounded"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:flex items-center justify-center hidden rounded">
                    <p className="text-white text-sm">Click or drag to change image</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-500">Click to upload or drag and drop</span>
                  <span className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</span>
                </div>
              )}
              <input
                id="imageInput"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({
                ...newProduct,
                name: e.target.value
              })}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={newProduct.category}
              onValueChange={(value) => setNewProduct({
                ...newProduct,
                category: value
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="category1">Category 1</SelectItem>
                <SelectItem value="category2">Category 2</SelectItem>
                <SelectItem value="category3">Category 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="offerType">Offer Type</Label>
            <Select
              value={newProduct.offerType}
              onValueChange={(value) => setNewProduct({
                ...newProduct,
                offerType: value
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select offer type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="type1">Type 1</SelectItem>
                <SelectItem value="type2">Type 2</SelectItem>
                <SelectItem value="type3">Type 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({
                ...newProduct,
                stock: e.target.value
              })}
              placeholder="Enter stock quantity"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({
                ...newProduct,
                price: e.target.value
              })}
              placeholder="Enter price"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({
                ...newProduct,
                description: e.target.value
              })}
              placeholder="Enter product description"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={newProduct.status}
              onValueChange={(value) => setNewProduct({
                ...newProduct,
                status: value
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Deactivated">Deactivated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500">
            Add Product
          </Button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex items-center justify-between p-6">
        <h2 className="text-xl font-semibold">All Products</h2>
        <Button
          className="bg-indigo-600 hover:bg-indigo-500"
          onClick={() => setIsAddProductOpen(true)}
        >
          Add Product +
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Offer Type</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="flex items-center gap-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-10 h-10 rounded"
                />
                <span>{product.name}</span>
              </TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.offerType}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Select
                  value={product.status}
                  onValueChange={(value) => handleStatusChange(product.id, value)}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue>
                      <span className={`px-2 py-1 rounded text-sm ${product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {product.status}
                      </span>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Deactivated">Deactivated</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <PenIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2Icon className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between px-6 py-4 border-t">
        <Button
          variant="outline"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous Page
        </Button>
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => setCurrentPage(page)}
              className="w-8 h-8 p-0"
            >
              {page}
            </Button>
          ))}
        </div>
        <Button
          variant="outline"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next Page →
        </Button>
      </div>
      {isAddProductOpen ? AddProductPanel() : null}
    </div>
  )
}