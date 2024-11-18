import React, { useState, createContext } from 'react'
// สร้าง Context ใหม่ชื่อว่า SidebarContext เพื่อใช้แชร์สถานะเกี่ยวกับ Sidebar ใน Components อื่น ๆ
export const SidebarContext = createContext()
// สร้าง Component ที่จะเป็น Provider ชื่อว่า SidebarProvider
const SidebarProvider = ({ children }) => {
  // สร้าง state ชื่อว่า isOpen โดยใช้ useState
  // ค่าเริ่มต้นของ isOpen คือ false หมายถึง Sidebar ปิดอยู่
  const [isOpen, setIsOpen] = useState(false)
  // ฟังก์ชัน handleClose สำหรับปิด Sidebar
  const handleClose = () => {
     // เปลี่ยนค่า isOpen ให้เป็น false เพื่อปิด Sidebar
    setIsOpen(false)
  }

    // คืนค่า SidebarContext.Provider ที่ส่งค่าของ isOpen, setIsOpen และ handleClose
  // ไปยัง Components อื่น ๆ ที่อยู่ภายใต้ SidebarProvider
  return (
    <SidebarContext.Provider value={{ isOpen,setIsOpen, handleClose }}>{children}</SidebarContext.Provider>
  )
}

export default SidebarProvider;