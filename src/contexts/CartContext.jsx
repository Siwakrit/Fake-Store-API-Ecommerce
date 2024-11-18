import React, { createContext, useState, useEffect } from 'react'
// สร้าง Context สำหรับ Cart เพื่อให้สามารถแชร์ข้อมูลระหว่าง Components ต่างๆ ได้
export const CartContext = createContext();
// สร้าง CartProvider เป็น Component ที่จะเป็น Provider ของข้อมูลที่เกี่ยวข้องกับ Cart
const CartProvider = ({ children }) => {
  // สร้าง state สำหรับ cart ซึ่งจะเก็บรายการสินค้าในตะกร้า
  const [cart, setCart] = useState([]);
 // สร้าง state สำหรับจำนวนสินค้าทั้งหมดในตะกร้า
  const [itemAmount, setItemAmount] = useState(0);
  // สร้าง state สำหรับยอดรวมราคาสินค้าในตะกร้า
  const [total, setTotal] = useState(0);

  // ใช้ useEffect สำหรับคำนวณยอดรวมราคาทุกครั้งที่ cart มีการเปลี่ยนแปลง
  useEffect(() => {
    // ใช้ reduce เพื่อนับรวมยอดเงินทั้งหมดจากสินค้าทุกชิ้นในตะกร้า
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.amount;
    }, 0);
    // อัปเดต state total ด้วยยอดเงินที่คำนวณได้
    setTotal(total);
  }, [cart]); // ใส่ dependencies [cart] เพื่อให้ useEffect ทำงานเมื่อ cart เปลี่ยนแปลง

  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      setItemAmount(amount);
  }
  }, [cart]);

 // ฟังก์ชันสำหรับเพิ่มสินค้าลงในตะกร้า
  const addToCart = (product, id) => {
     // สร้าง item ใหม่พร้อมกำหนดค่าเริ่มต้น amount เป็น 1
    const newItem = {...product, amount: 1};
    // check if the item is already in the cart
    // ตรวจสอบว่าสินค้าที่จะเพิ่มมีอยู่ใน cart แล้วหรือไม่
    const cartItem = cart.find((item) => {
      return item.id === id;
    });
    // ถ้าสินค้าอยู่ใน cart แล้ว ให้เพิ่มจำนวนสินค้า
    if (cartItem) {
      // ใช้ map เพื่อสร้าง cart ใหม่ที่เพิ่มจำนวนสินค้าชิ้นนั้น
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          // เพิ่มจำนวน amount ของสินค้าที่มีอยู่แล้วใน cart
          return {...item, amount: cartItem.amount + 1};
        } else {
          return item;// ถ้าไม่ใช่สินค้าที่ต้องการอัปเดต ให้คืนค่ากลับเหมือนเดิม
        }
      });
      // อัปเดต state cart ด้วย cart ใหม่
      setCart(newCart);
    } else {
      // ถ้าไม่มีสินค้าใน cart ให้เพิ่มสินค้าใหม่ลงใน cart
      setCart([...cart, newItem]);
    }
  };
  console.log(cart); 

  // ฟังก์ชันสำหรับลบสินค้าจากตะกร้า
  const removeFromCart = (id) => {
    // ใช้ filter เพื่อสร้าง cart ใหม่ที่ไม่มีสินค้าที่มี id ตรงกับสินค้าที่จะลบ
    const newCart = cart.filter((item) => {
      return item.id !== id;
    });
    // อัปเดต state cart ด้วย cart ใหม่
    setCart(newCart);
    };

      // ฟังก์ชันสำหรับล้างสินค้าทั้งหมดในตะกร้า
    const clearCart = () => { 
      // ตั้งค่า cart ให้เป็น array ว่างเปล่า
      setCart([]);
    };

  // ฟังก์ชันสำหรับเพิ่มจำนวนสินค้าชิ้นนั้น ๆ ในตะกร้า
    const increaseAmount = (id) => {
      // หาสินค้าใน cart ที่มี id ตรงกัน
      const cartItem = cart.find((item) => item.id === id);
      // เรียกใช้ addToCart เพื่อเพิ่มจำนวนสินค้า
      addToCart(cartItem, id);
    };

     // ฟังก์ชันสำหรับลดจำนวนสินค้าชิ้นนั้น ๆ ในตะกร้า
    const decreaseAmount = (id) => {
      // หาสินค้าใน cart ที่มี id ตรงกัน
        const cartItem = cart.find((item) => {
          return item.id === id;
        });
         // ถ้ามีสินค้าใน cart และจำนวนมากกว่า 1 ให้ลดจำนวน
        if (cartItem) {
          const newCart = cart.map((item) => {
            if (item.id === id) {
              // ลดจำนวน amount ของสินค้านั้น
              return {...item, amount: cartItem.amount - 1};
            } else {
              return item;// ถ้าไม่ใช่สินค้าที่ต้องการอัปเดต ให้คืนค่ากลับเหมือนเดิม
            }
          });
          // อัปเดต state cart ด้วย cart ใหม่
          setCart(newCart);
        } 
         // ถ้าจำนวนสินค้าต่ำกว่า 2 ให้ลบสินค้านั้นออกจากตะกร้า
          if (cartItem.amount < 2) {
            removeFromCart(id);
          }
        
      };
      
  // ส่งค่าทั้งหมดให้กับ children ที่อยู่ภายใต้ CartContext.Provider

  return (
    <CartContext.Provider 
    value={{cart, addToCart, removeFromCart, clearCart, increaseAmount, decreaseAmount, itemAmount, total,}}>{children}
    </CartContext.Provider>
  )
}

export default CartProvider