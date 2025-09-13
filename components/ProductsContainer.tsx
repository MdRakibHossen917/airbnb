import React from 'react'
import ProductsPage from '@/app/products/page'
import BangkokPage from '@/app/bangkok/page'
import LondonPage from '@/app/london/page'
import TorontoPage from '@/app/toronto/page'
import SeoulPage from '@/app/seoul/page'
import OsakaPage from '@/app/osaka/page'

 

export default function ProductsContainer() {
  return (
    <div>
   <ProductsPage/>
   <BangkokPage/>
   <LondonPage/>
   <TorontoPage/>
   <SeoulPage/>
   <OsakaPage/>
    </div>
  )
}
