import Navbar from "@/component/Navbar/Navbar";
import Hero from "@/component/Hero/hero";
import Footer from "@/component/Footer/footer";
import Banner from "@/component/Banner/banner";
import Category from "@/component/Category/Category";
import Bestsellers from "@/component/Bestsellers/Bestsellers";
export default function Home() {
  return (
    <><main>

      <Navbar />
      
      <Hero />

      <Category />
      <Bestsellers />      
      <Banner />



    </main>
    
    <Footer /></>
  );
}