import logo from "../assets/images/edtech.png";
import Video from "../assets/videos/intro.mp4"
import { SiUdemy } from "react-icons/si";
import { SiCoursera } from "react-icons/si";
import { FaDiscourse } from "react-icons/fa";

const Home = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex h-screen justify-center items-center">
          <div className="p-3 space-y-4">
            <h1 className="text-3xl font-bold text-gray-500">
              Become The IT Professional
            </h1>
            <span className="justify-end text-gray-500">
              Find affordable Courses
            </span>
            <br />
            <button className="bg-yellow-400 text-gray-500 px-2 py-1 rounded-xl">
              Explore Course
            </button>
          </div>
        </div>
        <div>
          <img src={logo} className="w-36 rounded-xl" />
        </div>
      </div>

      <div className="p-4 bg-slate-700">
        <h1 className="text-center text-yellow-500 text-3xl font-medium ">
          Our Brands
        </h1>
        <div className="flex justify-around p-3 text-white">
          <SiUdemy className="text-4xl hover:text-yellow-600" />
          <SiCoursera className="text-4xl hover:text-yellow-600" />
          <FaDiscourse className="text-4xl hover:text-yellow-600" />
        </div>
      </div>
      <div className="flex h-screen justify-center">
        {/* <video className="w-1/2 h-72 mt-8" controls>
          <source src={Video} type="video/mp4" />
        </video> */}
      </div>
    </>
  );
};

export default Home;
