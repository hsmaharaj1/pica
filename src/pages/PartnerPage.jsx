import React, { createContext, useContext, useState } from 'react'
import Partner from '@/components/Partner'
import StoreDetailsPage from '@/components/StoreDetailsPage'
import PersonalDetailsPage from '@/components/PersonalDetailsPage'
import loginImg from '@/assets/login.svg'
import logo from '@/assets/logo.svg'

const PageContext = createContext()

export function usePage() {
    return useContext(PageContext)
}

export default function PartnerPage() {
    const [page, setPage] = useState(1)

    return (
        <div className='flex flex-col h-screen w-full'>
            <div className='h-[10%] p-[1%]'>
                <img src={logo} alt="PicaPool" />
            </div>
            <div className='flex overflow-hidden'>
                <div className='w-[50%] flex justify-end'>
                    <img src={loginImg} alt="Login" className='w-[70%] mr-[10%]' />
                </div>
                <div className='flex flex-col justify-center align-middle w-[50%]'>
                    <PageContext.Provider value={{ page, setPage }}>
                        <div>
                            {page === 1 && <Partner />}
                            {page === 2 && <StoreDetailsPage />}
                            {page === 3 && <PersonalDetailsPage />}
                        </div>
                    </PageContext.Provider>
                </div>
            </div>
        </div>
    )
}