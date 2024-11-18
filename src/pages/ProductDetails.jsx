import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../contexts/CartContext'
import { ProductContext } from '../contexts/ProductContext'

// สร้าง Component ชื่อว่า ProductDetails
const ProductDetails = () => {
   // ใช้ useParams() เพื่อดึงค่าตัวแปร 'id' ที่ถูกส่งมาใน URL
  const { id } = useParams();
  // ใช้ useContext() เพื่อเข้าถึงข้อมูลของ products จาก ProductContext
  const { products } = useContext(ProductContext);
  // ใช้ useContext() เพื่อเข้าถึงฟังก์ชัน addToCart จาก CartContext
  const { addToCart } = useContext(CartContext);

  // หา product ที่มี 'id' ตรงกับ 'id' ที่ได้รับจาก URL โดยใช้ฟังก์ชัน find()
  // เปลี่ยน 'id' ที่เป็น string ให้เป็น number ด้วย parseInt() เพื่อเปรียบเทียบ
  const product = products.find(item => {
    return item.id === parseInt(id);
  });

  // ตรวจสอบว่ามี product หรือไม่ ถ้าไม่มีให้แสดงข้อความ "Loading..."
  if (!product) { 
    return (
    // สร้าง Section ที่มีความสูงเต็มหน้าจอ และทำให้เนื้อหาอยู่กึ่งกลางทั้งแนวตั้งและแนวนอน
    <section className='h-screen flex justify-center items-center'>
      Loading...
    </section>
    );
  
  }
// ดึงข้อมูลที่ต้องการจาก product เช่น ชื่อ, ราคา, คำอธิบาย และรูปภาพ
  const { title, price, description, image } = product;
  // ถ้ามีข้อมูลของ product จะแสดงเนื้อหาของ product
  return (
    // สร้าง Section ที่มี padding บนและล่าง และความสูงเต็มหน้าจอ พร้อมจัดให้เนื้อหาอยู่กึ่งกลางแนวตั้ง
    <section className='pt-32 pb-12 lg:py-32 h-screen flex items-center'>
      {/* ใช้ container เพื่อกำหนด layout ให้อยู่ตรงกลางของหน้า */}
      <div className="container mx-auto">
        {/* ใช้ flex จัดให้ข้อมูลแบ่งออกเป็นสองส่วนแบบ column และเปลี่ยนเป็น row ในจอใหญ่ */}
        <div className='flex flex-col lg:flex-row items-center '>
           {/* ส่วนของรูปภาพ ใช้ flex เพื่อให้รูปอยู่กึ่งกลาง */}
          <div className='flex flex-1 justify-center items-center mb-8 lg:mb-0'>
            {/* แสดงรูปภาพ product โดยกำหนดขนาดสูงสุด */}
          <img className='max-w-[200px] lg:max-w-sm' src={image} alt={title} />
          </div>

          {/* ส่วนของรายละเอียดสินค้า */}
          <div className='flex-1 text-center lg:text-left'>
            {/* แสดงชื่อสินค้า กำหนดขนาดตัวอักษรและความกว้างสูงสุด */}
            <h1 className='text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0'>{title}</h1>
            {/* แสดงราคาของสินค้า โดยใช้สีแดงสำหรับเน้น */}
            <div className='text-xl text-red-500 font-medium mb-6'>
              $ {price}
              </div>
              {/* แสดงคำอธิบายสินค้า */}
              <p className='mb-8'>{description}</p>
              {/* ปุ่มสำหรับเพิ่มสินค้าในตะกร้า เมื่อกดจะเรียกฟังก์ชัน addToCart */}
              <button 
              onClick={() => addToCart(product, product.id)} 
              className='bg-black py-4 px-8 text-white'>Add to cart</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails