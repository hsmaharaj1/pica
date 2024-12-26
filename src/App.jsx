import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import Login from './pages/Login'
import PartnerPage from './pages/PartnerPage'
import MenuManagement from './pages/MenuManagement'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  // You might want to add authentication state management here
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes */}
        <Route 
          path="/signup" 
          element={
            isAuthenticated ? 
              <PartnerPage /> : 
              <Navigate to="/login" replace />
          } 
        />
        
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? 
              <MenuManagement /> : 
              <Navigate to="/login" replace />
          } 
        />
        
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App