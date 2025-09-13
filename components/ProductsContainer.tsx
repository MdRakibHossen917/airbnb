import React from 'react'
import ProductsPage from '@/app/products/page'
import BangkokPage from '@/app/bangkok/page'
import LondonPage from '@/app/london/page'

 

export default function ProductsContainer() {
  return (
    <div>
   <ProductsPage/>
   <BangkokPage/>
   <LondonPage/>
    </div>
  )
}
