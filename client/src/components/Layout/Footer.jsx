import { BsInstagram } from "react-icons/bs";
import { AiOutlineFacebook } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";

const Footer = () => {
  return (
    <>
      <div className="p-10 bg-slate-700 text-white flex justify-between items-center">
        <div>
          <h1 className="text-xl">All Right Reserved</h1>
          <p className="text-yellow-700">Great Programmer</p>
        </div>
        <div className="flex space-x-4">
          <BsInstagram className="text-2xl" />
          <AiOutlineFacebook className="text-2xl" />
          <AiFillTwitterCircle className="text-2xl" />
        </div>
      </div>
    </>
  );
};

export default Footer;
