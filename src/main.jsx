import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ProductProvider from "./contexts/ProductContext.jsx";
import SidebarProvider from "./contexts/SidebarContext.jsx";
import CartProvider from "./contexts/CartContext.jsx";

// สร้าง root element จาก element ที่มี id="root" ในไฟล์ HTML
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // เริ่มต้นห่อ Component App ด้วย Context Providers
  <SidebarProvider>
    <CartProvider>
      <ProductProvider>
        <React.StrictMode>
          {/* ห่อด้วย React.StrictMode เพื่อช่วยตรวจสอบข้อผิดพลาดในโหมดพัฒนา */}
          <App />
        </React.StrictMode>
      </ProductProvider>
    </CartProvider>
  </SidebarProvider>
);
