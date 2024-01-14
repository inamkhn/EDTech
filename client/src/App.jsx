import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./components/Home";
import Header from "./components/Layout/Header";
import Courses from "./components/Courses";
import Footer from "./components/Layout/Footer";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ForgetPassword from "./components/Auth/ForgetPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import ContactUs from "./components/ContactUs";
import Request from "./components/Request";
import About from "./components/About";
import Subscribe from "./components/Payments/Subscribe";
import PaymentSuccess from "./components/Payments/PaymentSuccess";
import PaymentFail from "./components/Payments/PaymentFail";
import Notfound from "./components/Payments/Notfound";
import CoursePage from "./components/CoursePage";
import Profile from "./components/Profile";
import UpdateProfile from "./components/UpdateProfile";
import ChangePassword from "./components/ChangePassword";
import Dashboard from "./components/admin/dashboard";
import Users from "./components/admin/Users";
import Create from "./components/admin/Create";
import AllCourses from "./components/admin/Courses";
import CourseLectures from "./components/admin/CourseLectures";


function App() {
  return (
    <>
      <div className="mx-10">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/request" element={<Request />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forget" element={<ForgetPassword />} />
            <Route path="/reset/:token" element={<ResetPassword />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route path="/paymentsuccess" element={<PaymentSuccess />} />
            <Route path="/paymentfail" element={<PaymentFail />} />
            <Route path="/course/:id" element={<CoursePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/updateprofile" element={<UpdateProfile />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/*" element={<Notfound />} />

            {/* DashBoard Routes */}
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/create" element={<Create />} />
            <Route path="/admin/courses" element={<AllCourses />} />
            <Route path="/admin/courselecture/:id" element={<CourseLectures />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </>
  );
}

export default App;
