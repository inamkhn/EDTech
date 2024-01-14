import { useState } from "react";
import axios from "axios";
import { forgetPasswordRequest, forgetPasswordSuccess } from "../../redux/profileSlice";
import { useDispatch } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch()

  const submitHandler=async()=>{
    try {
      dispatch(forgetPasswordRequest());
  
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
  
        withCredentials: true,
      };
  
      const { data } = await axios.post("/api/v1/forgetpassword",
        {
          email,
        },
        config
      );
      toast.success("forget token is sended")
      dispatch(forgetPasswordSuccess(data.message))
    } catch (error) {
      toast.warning("incorrect email")
      dispatch(error.response.data.message()
      );
    }
  }


  return (
    <>
    <ToastContainer/>
      <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form onSubmit={submitHandler}>
                <h1 className="text-2xl font-semibold pb-5 text-yellow-700">
                  Forget Password
                </h1>

                <div className="mb-6">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Email"
                  />
                </div>

                <div className="text-center lg:text-left">
                  <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Forget Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgetPassword;
