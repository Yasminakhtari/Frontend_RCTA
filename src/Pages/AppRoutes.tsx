import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../Components/Header/Header";
import MediaGalleryPage from "./MediaGalleryPage";
import ProductsPage from "./ProductsPage";
import Footer from "../Components/Footer/Footer";
import ScrollUp from "../Components/Common/ScrollUp";
import HomePage from "./HomePage";
import SignUpPage from "./SignUpPage";
import About from "./About";
import ContactUs from "../Components/contactus/ContactUs";
import { useSelector } from "react-redux";

const AppRoutes = () => {
    const user = useSelector((state:any)=>state.user);
  return <BrowserRouter>
  <Header/>
    <Routes>
      <Route path="/about-us" element={<About/>}/>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/login" element={<SignUpPage/>}/>
      <Route path="/gallery" element={<MediaGalleryPage/>}/>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='*' element={<HomePage/>}/>
      <Route path="/contact-us" element={<ContactUs />}/>
      <Route path="/products" element={<ProductsPage/>}/>
    </Routes>
    <ScrollUp/>
  <Footer/>
</BrowserRouter>
}

export default AppRoutes
