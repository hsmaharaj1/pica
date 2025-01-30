import React, { createContext, useContext, useState } from 'react'
import Partner from '@/components/Partner'
import StoreDetailsPage from '@/components/StoreDetailsPage'
import PersonalDetailsPage from '@/components/PersonalDetailsPage'
import loginImg from '@/assets/login.svg'
import logo from "../assets/logo.svg"

const PageContext = createContext()

export function usePage() {
    return useContext(PageContext)
}

export default function PartnerPage() {
    const [page, setPage] = useState(1);
    const [data, setData] = useState({
        username: "John's Store",
        ownername: "John Doe",
        pic: "https://example.com/vendor-pic.jpg",
        link: "https://vendor-website.com",
        delivery: true,
        email: "partner@example.com",
        phone: "+1234567890",
        location: {
          lat: 12.971598,
          lng: 77.594566
        },
        authId: 1
      });
    console.log(data);
    return (
        <div className='flex flex-col h-screen w-full font-poppins'>
            <div className='h-[10%] p-[1%]'>
                <img src={logo} alt="PicaPool" />
            </div>
            <div className='flex overflow-hidden h-full space-x-4'>
                <img src={loginImg} alt="Login" className='w-[50%] justify-center align-middle pl-[7%] pr-[5%]' />
                <div className='flex flex-col justify-center align-middle w-full pr-[6%]'>
                    <PageContext.Provider value={{ page, setPage, data, setData }}>
                            {page === 1 && <Partner />}
                            {page === 2 && <StoreDetailsPage />}
                            {page === 3 && <PersonalDetailsPage />}
                    </PageContext.Provider>
                </div>
            </div>
        </div>
    )
}