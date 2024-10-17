import React from 'react'
import { AuthContext } from '../context/auth.context';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const { isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(isAdmin){
      navigate("/admin/products")
    }
  }, [])

  return (
    <div>
       Hola usuario 
    </div>
  )
}
