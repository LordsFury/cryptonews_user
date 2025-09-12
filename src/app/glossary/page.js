"use client"
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Home from '@/components/Home'
import React from 'react'

const Page = () => {
  return (
    <div className='bg-whiite dark:bg-zinc-900 min-h-screen'>
        <Header />
        <Home />
        <Footer />
    </div>
  )
}

export default Page