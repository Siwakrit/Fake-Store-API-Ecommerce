import React from 'react'
import IU from '../assets/IU.jpg'
import { Link } from 'react-router-dom'
const Hero = () => {
  return (
    <section className='h-[1000px] bg-hero bg-no-repeat bg-center py-24'>
      <div className='container mx-auto flex justify-around h-full'>
        <div className='flex flex-col justify-center'>
          <div className='font-semibold flex items-center uppercase'>
            <div className='w-10 h-[2px] bg-red-500 mr-3'></div>New trend
          </div>
          <h1 className='text-[70px] leading-[1.1] font-light mb-4'>AUTUME SALE STYLISH <br />
            <span className='font-semibold'>WOMENS</span>
            </h1>
            <Link to={'/'} className='self-start uppercase border-b-2 border-black'>Discover More</Link>
        </div>
        <div className='hidden lg:block'>
          <img className='rounded-lg hover:shadow-blue-500 hover:shadow-2xl  hover:scale-110 transition duration-300' src={IU} alt="" />
        </div>
      </div>
      </section>
  )
}

export default Hero