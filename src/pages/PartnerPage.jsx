import React, { createContext, useContext, useState } from 'react'
import Partner from '@/components/Partner'
import StoreDetailsPage from '@/components/StoreDetailsPage'
import PersonalDetailsPage from '@/components/PersonalDetailsPage'

const PageContext = createContext()

export function usePage() {
    return useContext(PageContext)
}

export default function PartnerPage() {
    const [page, setPage] = useState(1)

    return (
        <PageContext.Provider value={{ page, setPage }}>
            <div>
                {page === 1 && <Partner />}
                {page === 2 && <StoreDetailsPage />}
                {page === 3 && <PersonalDetailsPage />}
            </div>
        </PageContext.Provider>
    )
}