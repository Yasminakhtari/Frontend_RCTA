import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUserContext } from "../Components/notification/UserContext";

import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import ScrollUp from "../Components/Common/ScrollUp";

import HomePage from "./HomePage";
import About from "./About";
import MediaGalleryPage from "./MediaGalleryPage";
import ProductsPage from "./ProductsPage";
import ProductCartPage from "../Components/productpage/ProductCartPage";
import ShoppingCart from "../Components/productpage/ShoppingCart";
import CheckoutPage from "../Components/productpage/CheckoutPage";
import ProductDetails from "../Components/productpage/ProductDetails";
import ContactUs from "../Components/contactus/ContactUs";
import SignUpPage from "./SignUpPage";
import UserProfilePage from "./UserProfilePage";

import AllTestiPage from "./AllTestiPage";
import Classes from "../Components/classes/Classes";
import CoursePage from "../Components/classes/CoursePage";
import CreateClassForm from "../Components/classes/CreateClassForm";
import ClassManagement from "../Components/classes/ClassManagement";

import AdminHomePage from "./AdminPage/AdminHomePage";
import AdminHomeContainer from "../Components/admin/AdminHome/AdminHomeContainer";
import Table from "../Components/admin/AdminHome/Table";
import ServiceTable from "../Components/admin/AdminService/ServiceTable";
import AddService from "../Components/admin/AdminService/AddService";

import SessionManagePage from "../Components/sessionpage/SessionManagePage";
import SessionCreatePage from "../Components/sessionpage/SessionCreatePage";
import LocationCreate from "../Components/sessionpage/LocationCreate";
import LocationTable from "../Components/sessionpage/LocationTable";
import StudentDetails from "../Components/sessionpage/StudentDetails";

import Notifications from "../Components/notification/Notifications";
import NotFound from "../Components/notfound/NotFound";
import PaymentModal from '../Components/productpage/PaymentModal';
<<<<<<< HEAD
import PaymentPage from "../Components/productpage/PaymentPage";
=======
import LocationCardPage from '../Components/sessionpage/LocationCardPage';
>>>>>>> 5cd770b9b1c27a934775e94b6a5b44f5fa79d8e2

const AppRoutes = () => {
  const { userId } = useUserContext();
  const user = useSelector((state: any) => state.user);

  const handleLocationSubmit = (data: {
    address: string;
    city: string;
    state: string;
    zipcode: string;
  }) => {
    console.log("Location Data Submitted:", data);
  };



const PaymentModalWrapper: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true); // You can toggle based on your logic

  return <PaymentModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
};

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Admin Section */}
        <Route path="/admin" element={<AdminHomePage />}>
          <Route index element={<AdminHomeContainer />} />
          <Route path="dashboard" element={<AdminHomeContainer />} />
          <Route path="servicetable" element={<ServiceTable />} />
          <Route path="manage" element={<SessionManagePage />} />
          <Route path="alluser" element={<Table />} />
          <Route path="locationtable" element={<LocationTable />} />
          <Route path="players" element={<Table />} />
        </Route>

        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/gallery" element={<MediaGalleryPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/testimonial" element={<AllTestiPage />} />
        <Route path="/locationcard" element ={<LocationCardPage />} />

        {/* User and Authentication */}
        <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUpPage />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <SignUpPage />} />
        <Route path="/profile" element={<UserProfilePage />} />

        {/* Products */}
        <Route path="/product" element={<ProductCartPage />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/details/:id" element={<ProductDetails />} />

        {/* Classes */}
        <Route path="/classes" element={<Classes />} />
        <Route path="/coursepage/:id" element={<CoursePage />} />
        <Route path="/createclass" element={<CreateClassForm />} />
        <Route path="/classmanagement" element={<ClassManagement />} />

        {/* Services */}
        <Route path="/addservice" element={<AddService />} />
        <Route path="/add-service/:id" element={<AddService />} />

        {/* Sessions */}
        <Route path="/create" element={<SessionCreatePage />} />
        <Route path="/create/:id" element={<SessionCreatePage />} />
        <Route path="/location" element={<LocationCreate onSubmit={handleLocationSubmit} />} />
        <Route path="/studentdetails/:id" element={<StudentDetails />} />
        

        {/* Notifications */}
        <Route path="/notification" element={<Notifications userId={userId} />} />
<<<<<<< HEAD

        {/* Payment */}
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/paymentmodal" element={<PaymentModalWrapper/>} />

        

=======
        {/* <Route path="/locationcard" element ={<LocationCardPage />} /> */}
>>>>>>> 5cd770b9b1c27a934775e94b6a5b44f5fa79d8e2
        {/* Not Found */}
        <Route path="*" element={<NotFound />} />

      </Routes>
      <ScrollUp />
      <Footer />
    </BrowserRouter>
  );
};

export default AppRoutes;
