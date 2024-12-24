import React, { useState } from 'react'
import Offers from '@/components/Offers';
import FAQ from '@/components/FAQ';
import ProductMenu from '@/components/ProductMenu';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Package, MessageSquareText as MessageIcon, LogOut, BadgePercent, CircleUserRound } from 'lucide-react';
import partnerLogo from "../assets/partnerlogo.svg"

export default function MenuManagement() {
  const [activeSection, setActiveSection] = useState('product');
  const [username, setUsername] = useState('Mr. Saad')
  const [ppurl, setPpurl] = useState('/profilepic')

  const handleLogout = () => {
    console.log('Logging out...');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-64 bg-white min-h-screen flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <img src={partnerLogo} alt="Logo" className="" />
          </div>
        </div>

        <div className="flex-1 py-6 px-6">
          <p className="px-6 text-sm font-medium text-gray-500 mb-4">General</p>
          <nav className="space-y-1">
            <Button
              variant={activeSection === 'dashboard' ? 'secondary' : 'ghost'}
              className="w-full justify-start gap-2 px-6 rounded-full"
              onClick={() => setActiveSection('dashboard')}
              disabled
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </Button>
            <Button
              variant={activeSection === 'product' ? 'secondary' : 'ghost'}
              className="w-full justify-start gap-2 px-6 rounded-full"
              onClick={() => setActiveSection('product')}
              
            >
              <Package className="w-5 h-5" />
              Product
            </Button>
            <Button
              variant={activeSection === 'Offer' ? 'secondary' : 'ghost'}
              className="w-full justify-start gap-2 px-6 rounded-full"
              onClick={() => setActiveSection('Offer')}
              
            >
              <BadgePercent className="w-5 h-5" />
              Offer
            </Button>
            <Button
              variant={activeSection === 'FAQ' ? 'secondary' : 'ghost'}
              className="w-full justify-start gap-1 px-6 mb-3 rounded-full"
              onClick={() => setActiveSection('FAQ')}
            >
              <MessageIcon className="w-5 h-5" />
              FAQ's
            </Button>
          </nav>
        </div>

        <div className="p-6">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <header className="bg-white">
          <div className="flex items-center justify-end gap-6 px-6 py-4">
            <div className="flex flex-col items-start font-poppins">
              <div className='text-[#9E9E9E]'>Welcome</div>
              <div className='text-[#8A8D93] font-semibold text-xl'>{username}</div>
            </div>
            <CircleUserRound className='w-8 h-8 rounded-full'/>
          </div>
        </header>
        <div className="p-6 flex-1">
          {(activeSection === 'product' ? (<ProductMenu />) : (activeSection === 'FAQ' ? (<FAQ />) : (<Offers />)))}
        </div>
      </div>
    </div>
  )
}