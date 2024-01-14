import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { SiCoursera } from "react-icons/si";
import { FaDiscourse } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";

const Sidebar = () => {
    const location= useLocation()
    
  return (
    <div className="shadow-md h-full  rounded-lg bg-gray-200">
      <div className="flex flex-col space-y-9 items-center h-auto  cursor-pointer font-bold text-gray-600 p-4 mb-48">
        <Link to="/admin/dashboard" className="mt-10 flex items-center space-x-2">
          <LuLayoutDashboard className="text-lg" /> <p className={`${location.pathname === '/admin/dashboard' ? "text-yellow-600":'' }`}>DashBoard</p>
        </Link>
        <Link to="/admin/create" className="mt-10 flex items-center space-x-2">
          <SiCoursera className="text-lg"/> <p className={`${location.pathname === '/admin/create' ? "text-yellow-600":'' } `}>Create Course</p>
        </Link>
        <Link to="/admin/courses" className="mt-10 flex items-center space-x-2">
          <FaDiscourse className="text-lg"/> <p className={`${location.pathname === '/admin/courses' ? "text-yellow-600":'' }`}>Courses</p>
        </Link>
        <Link to="/admin/users" className="mt-10 flex items-center space-x-2">
          <FaRegUser className="text-lg"/> <p className={`${location.pathname === '/admin/users' ? "text-yellow-600":'' }`}>Users</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
