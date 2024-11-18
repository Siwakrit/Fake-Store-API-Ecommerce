import { createContext, useState, useEffect } from "react";
// สร้าง Context ชื่อว่า ProductContext เพื่อให้สามารถใช้ข้อมูลสินค้าทั่วทั้งแอปพลิเคชัน
export const ProductContext = createContext();

// สร้าง Component ProductProvider ซึ่งจะเป็นผู้จัดการข้อมูลสินค้าและจัดหา Context ให้กับ Component ลูกทั้งหมด
const ProductProvider = ({ children }) => {
    // สร้าง state ชื่อว่า products เพื่อเก็บข้อมูลสินค้า เริ่มต้นด้วย array ว่าง
  const [products, setProducts] = useState([]);
// ใช้ useEffect เพื่อทำการดึงข้อมูลจาก API เมื่อตัว Component นี้ถูก mount ครั้งแรก
  useEffect(() => {
    // ฟังก์ชันแบบ async เพื่อดึงข้อมูลสินค้า
    const fetchProducts = async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      // แปลงข้อมูลที่ได้รับมาเป็น JSON
      const data = await response.json();
      // เก็บข้อมูลสินค้าที่ได้มาใน state products
      setProducts(data);      
    };
     // เรียกใช้ฟังก์ชัน fetchProducts เพื่อดึงข้อมูลสินค้า
    fetchProducts();
  }, []);// useEffect นี้จะทำงานแค่ครั้งเดียวตอน Component ถูกสร้างเพราะ dependencies เป็น array ว่าง
  
 // ส่งค่าของข้อมูลสินค้าไปให้ Component ลูกทั้งหมดที่อยู่ภายใน ProductProvider ผ่าน ProductContext.Provider
  return (
    <ProductContext.Provider value={{ products }}>{children}</ProductContext.Provider>
  )
}

export default ProductProvider;