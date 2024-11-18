import React, { useState, useContext, useEffect } from 'react'
import { SidebarContext } from '../contexts/SidebarContext'
import { CartContext } from '../contexts/CartContext'
import { BsBag } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.png'
const Header = () => {
  const [isActive, setIsActive] = useState(false); // ใช้ state สำหรับการเปลี่ยนแปลงสถานะของ header เมื่อ scroll
  const { isOpen, setIsOpen } = useContext(SidebarContext); // ใช้ context สำหรับการเปิด/ปิด sidebar
  const { itemAmount } = useContext(CartContext); // ใช้ context เพื่อดึงจำนวนสินค้าจากตะกร้า


// ใน useEffect นี้จะเพิ่ม event listener ที่ตรวจสอบการ scroll ของหน้าเว็บ
// เมื่อ scroll ลงมากกว่า 60px จะทำให้ isActive เป็น true และถ้า scroll กลับขึ้นจะเป็น false
// isActive จะใช้ในการควบคุมรูปแบบของ header (เพิ่มเงาและพื้นหลังเมื่อ scroll ลง)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false)
    });
  });

  return (
    // header: ใช้ className ที่ขึ้นอยู่กับค่า isActive ที่กำหนดเมื่อมีการ scroll โดยจะเพิ่มคลาส bg-white dp-y4 shadow-md (พื้นหลังขาวและเงา) เมื่อ scroll ลงมากกว่า 60px
    <header className={`${isActive ? 'bg-white dp-y4 shadow-md' : 'bg-none py-6'} fixed w-full z-10 transition-all`}>
      <div className='container mx-auto flex justify-between items-center h-full'>
      <Link to='/'>
      <div>
        <img className='w-[40px]' src={Logo} alt="" />
      </div>
      </Link>
      <div onClick={() => setIsOpen(!isOpen)}
        className='cursor-pointer flex relative'>
        <BsBag className='text-2xl' />
        <div className='bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center'>{itemAmount}</div>
        </div>
      </div>
    </header>
  )
}

export default Header