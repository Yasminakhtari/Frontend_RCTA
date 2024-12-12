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
import AllTestiPage from "./AllTestiPage";
import AddService from "../Components/admin/AdminService/AddService";
import ServiceTable from "../Components/admin/AdminService/ServiceTable";
import Classes from "../Components/classes/Classes";
import CoursePage from "../Components/classes/CoursePage";



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
      <Route path="/testimonial" element={<AllTestiPage/>}/>
      <Route path="/add-service" element={<AddService/>}/>
      <Route path="/servicetable" element={<ServiceTable/>}/>
      <Route path="/classes" element={<Classes />} />
      <Route path="/coursepage/:id" element={<CoursePage />} />
    </Routes>
    <ScrollUp/>
    {/* <ServiceTable/> */}
  
  <Footer/>
</BrowserRouter>
}

export default AppRoutes
