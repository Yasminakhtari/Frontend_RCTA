import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import EditService from "../Components/admin/AdminService/EditService";
import CoursePage from "../Components/classes/CoursePage";
import ProductCartPage from "../Components/productpage/ProductCartPage";
import ShoppingCart from "../Components/productpage/ShoppingCart";
import AdminHomePage from "./AdminPage/AdminHomePage";
import CheckoutPage from "../Components/productpage/CheckoutPage";
import ProductDetails from "../Components/productpage/ProductDetails"



const AppRoutes = () => {
  const user = useSelector((state: any) => state.user);
  return <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/admin" element={<AdminHomePage/>}/>
      <Route path="/about-us" element={<About />} />
      {/* <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/login" element={<SignUpPage/>}/> */}
      <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUpPage />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <SignUpPage />} />
      <Route path="/gallery" element={<MediaGalleryPage />} />
      <Route path='/home' element={<HomePage />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/testimonial" element={<AllTestiPage />} />
      <Route path="/addservice" element={<AddService />} />
      <Route path="/servicetable" element={<ServiceTable />} />
      <Route path="/classes" element={<Classes />} />
      {/* <Route path="/editservice" element={<EditService/>}/> */}
      <Route path="/coursepage/:id" element={<CoursePage />} />
      <Route path="/add-service/:id" element={<AddService />} />
      <Route path="/product" element={<ProductCartPage />} />
      <Route path="/cart" element={<ShoppingCart />} />
      <Route path="/" element={<HomePage/>} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/details/:id" element={<ProductDetails />} />
      

    </Routes>
    <ScrollUp />
    {/* <ServiceTable/> */}

    <Footer />
  </BrowserRouter>
}

export default AppRoutes
