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
import { Badge } from './ui/badge';
import Offers from './Offers';
import { Close } from '@radix-ui/react-dialog';

export default function OffersPage() {
  const [products, setProducts] = useState([{
    id: 1,
    image: "https://fastly.picsum.photos/id/48/5000/3333.jpg?hmac=y3_1VDNbhii0vM_FN6wxMlvK27vFefflbUSH06z98so",
    name: "Offer Name",
    category: "Lorem",
    offerType: "ipsum",
    stock: "899",
    orignalPrice: "2000",
    price: "1500",
    description: ""
  },
  {
    id: 2,
    image: "https://fastly.picsum.photos/id/48/5000/3333.jpg?hmac=y3_1VDNbhii0vM_FN6wxMlvK27vFefflbUSH06z98so",
    name: "Offer Name",
    category: "Lorem",
    offerType: "ipsum",
    stock: "899",
    orignalPrice: "2000",
    price: "1500",
    description: ""
  }]);

  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    offerType: '',
    description: '',
    image: null,
    imagePreview: null
  });
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 10;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleDelete = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };



  const AddProductPanel = () => (
    <div className="fixed inset-y-0 right-0 w-100 max-w-md h-screen bg-white shadow-lg border-l">
      <div className="h-full flex flex-col">
        {/* Header - Fixed height */}
        <div className="p-6 flex items-center justify-between shrink-0">
          <h2 className="text-xl font-semibold">Add New Offer</h2>
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
                orignalPrice: 'Active',
                image: null,
                imagePreview: null
              });
              setIsAddProductOpen(false);
            }}
          >
            <CloseIcon className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Content - Scrollable container */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <Offers setIsAddProductOpen={setIsAddProductOpen} products={products} setProducts={setProducts}/>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow">
      <div className='p-[1.5%]'>
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-poppins text-[#757575] font-semibold">All Offers</h2>
          <Button
            className="bg-[#6E6CDF] hover:bg-indigo-500"
            onClick={() => setIsAddProductOpen(true)}
          >
            Add Offer +
          </Button>
        </div>

        <Table>
          <TableHeader className="rounded-lg bg-[#F5F5F5] text-[#757575] font-poppins font-semibold">

            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Offers</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>

          </TableHeader>

          <TableBody>
            {currentProducts.map((product) => (
              <TableRow key={product.id} className="cursor-pointer hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">{product.id}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded"
                  />
                  <span>{product.name}</span>
                </TableCell>
                <TableCell>{product.offerType}</TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
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
        {/* {isEditProductOpen ? EditProductPanel() : null} */}

      </div>
    </div>
  )
}