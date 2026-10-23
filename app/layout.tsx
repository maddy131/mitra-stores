import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";



export const metadata: Metadata = {
  title: "Mitra Stores",
  description: "Jewellery, cosmetics, craft and more.",
};

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      
    >
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
