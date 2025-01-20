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
import NotFound from "../Components/notfound/NotFound";
import Table from "../Components/admin/AdminHome/Table";
import CreateClassForm from "../Components/classes/CreateClassForm";
import ClassManagement from "../Components/classes/ClassManagement";
// import ProfilePage from "./ProfilePage";
import UserProfilePage from "./UserProfilePage";
import UserManagement from "../Components/management/UserManagement";
import SessionManagePage from "../Components/sessionpage/SessionManagePage";
import SessionCreatePage from "../Components/sessionpage/SessionCreatePage";
import LocationCreate from "../Components/sessionpage/LocationCreate";
import LocationTable from "../Components/sessionpage/LocationTable";
//import { Notifications } from "@mui/icons-material";
import Notifications from "../Components/notification/Notifications";
import { useUserContext } from '../Components/notification/UserContext';
import StudentDetails from "../Components/sessionpage/StudentDetails";



const AppRoutes = () => {
  const { userId } = useUserContext();
  const user = useSelector((state: any) => state.user);
  const handleLocationSubmit = (data: { address: string; city: string; state: string; zipcode: string }) => {
    console.log('Location Data Submitted:', data);
    
  };
  
  return <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/admin" element={<AdminHomePage/>}/>
      {/* <Route path="/admin/allplayers" element={<T} */}
      <Route path="/about-us" element={<About />} />
      {/* <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/login" element={<SignUpPage/>}/> */}
      <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUpPage />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <SignUpPage />} />
      <Route path="/gallery" element={<MediaGalleryPage />} />
      {/* <Route path='/home' element={<HomePage />} /> */}
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
      
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/details/:id" element={<ProductDetails />} />
      <Route path="/404" element={<NotFound/>}/>
      <Route path="/alluser" element={<Table/>}/>
      <Route path="/" element={<HomePage/>} />
      <Route path="createclass" element={<CreateClassForm />} />
      <Route path="classmanagement" element={<ClassManagement />} />
      {/* <Route path="profile" element= {<ProfilePage />} /> */}
      <Route path="/profile" element={<UserProfilePage/>}/>
      
      {/* <Route path="/create" element={<CreateClassForm />} />
      <Route path="/manage" element={<ClassManagement />} /> */}
      <Route path="/players" element={<UserManagement />} />
      <Route path="/manage" element={<SessionManagePage />} />
      <Route path="/create" element={<SessionCreatePage />} />
      <Route path="/location" element={<LocationCreate onSubmit={handleLocationSubmit} />} />
      <Route path="/locationtable" element={<LocationTable />} />
      <Route path="/create/:id" element={<SessionCreatePage />} />
      <Route path="/notification" element={<Notifications userId={userId} />} />
      <Route path="/studentdetails/:id" element={<StudentDetails />} />
    </Routes>
    <ScrollUp />
    {/* <ServiceTable/> */}

    <Footer />
  </BrowserRouter>
}

export default AppRoutes
