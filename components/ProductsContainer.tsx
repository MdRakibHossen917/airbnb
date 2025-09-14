import React from 'react'
import ProductsPage from '@/app/products/page'
import BangkokPage from '@/app/bangkok/page'
import LondonPage from '@/app/london/page'
import TorontoPage from '@/app/toronto/page'
import SeoulPage from '@/app/seoul/page'
import OsakaPage from '@/app/osaka/page'
import TokyoPage from '@/app/tokyo/page'
import MelbournePage from '@/app/melbourne/page'
import BusanPage from '@/app/busan/page'

 

export default function ProductsContainer() {
  return (
    <div>
   <ProductsPage/>
   <BangkokPage/>
   <LondonPage/>
   <TorontoPage/>
   <SeoulPage/>
   <OsakaPage/>
   <TokyoPage/>
   <MelbournePage/>
   <BusanPage/>
    </div>
  )
}
