/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { signinFailure, signinStart, signinSuccess } from "../../redux/userSlice";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [input, setInput] = useState({
    email:"",
    password:""
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signinStart());
      const res = await fetch('/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signinFailure(data.message));
        return;
      }
      toast.success('Successfully login')
      dispatch(signinSuccess(data));
      navigate('/');
    } catch (error) {
      toast.warning("some thing error found")
      dispatch(signinFailure(error.message)); 
    }
  };

  return (
    <>
    <ToastContainer />
      <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form onSubmit={handleSubmit}>
                <h1 className="text-2xl font-semibold pb-5 text-yellow-700">
                  Login Page
                </h1>

                <div className="mb-6">
                  <input
                    type="text"
                    value={input.email}
                    onChange={(e) => setInput({...input,email:e.target.value})}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Email address"
                  />
                </div>

                <div className="mb-6">
                  <input
                    type="text"
                    value={input.password}
                    onChange={(e) => setInput({...input,password:e.target.value})}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="********"
                  />
                </div>

                <div className="flex justify-end items-center mb-6">
                  <a href="#!" className="text-gray-800 ">
                   <Link to="/forget">Forgot password?</Link>  
                  </a>
                </div>

                <div className="text-center lg:text-left">
                  <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Login
                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    don't have an account?
                    <Link to="/register">
                      <a
                        href="#!"
                        className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                      >
                        Register
                      </a>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Login;
