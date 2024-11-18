import React, { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import Product from '../components/Product';
import Hero from '../components/Hero';
const Home = () => {
  // ใช้ useContext() เพื่อเข้าถึงข้อมูลของ products จาก ProductContext
  const { products } = useContext(ProductContext);
    // กรองสินค้าที่เป็นประเภท "men's clothing" หรือ "women's clothing" เท่านั้น
  const filteredProducts = products.filter(item => {
    return (item.category === "men's clothing" || item.category === "women's clothing" 
    );
  });


  console.log(filteredProducts);
  
  return (
    <div>
      <Hero />
      <section className='py-16'>
        {/* ใช้ container เพื่อกำหนด layout ให้อยู่ตรงกลางของหน้า */}
        <div className='container mx-auto'>
            {/* ใช้ grid ในการจัดการสินค้า โดยเริ่มจาก 1 คอลัมน์และเปลี่ยนเป็น 4-5 คอลัมน์ในขนาดจอที่ใหญ่ขึ้น */}
          <div className='grid grid-cols-1 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
            {/* วนลูปแสดงสินค้าที่ผ่านการกรอง โดยใช้ Component Product และส่งข้อมูลสินค้าไปเป็น props */}
            {filteredProducts.map((product) => {
              // ใช้ key ที่เป็น product.id เพื่อให้ React จัดการ element ที่ไม่ซ้ำกัน
              return <Product product={product} key={product.id} />;
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home