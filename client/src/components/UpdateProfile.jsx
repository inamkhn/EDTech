import { useState } from "react";
import { updateFailure, updateStart, updateSuccess } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProfile = () => {
  const [input,setInput] = useState({
    name:"",
    email:""
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());
      const res = await fetch('/api/v1/updateprofile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input)
      });
      console.log(res);
      if (res.success === false) {
        dispatch(updateFailure(res.message));
        return;
      }
      dispatch(updateSuccess(res));
      toast('Successfully Updated')
      // setTimeout(navigate('/profile'),3000)
    } catch (error) {
      toast.warning("some thing error found")
      dispatch(updateFailure(error.message));
    }
  };

  return (
    <>
    <ToastContainer/>
      <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form onSubmit={handleSubmit}>
                <h1 className="text-2xl font-semibold pb-5 text-center mb-2 text-yellow-700">
                  Update Profile
                </h1>

                <div className="mb-6">
                  <input
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Name"
                    name="name"
                    value={input.name}
                    onChange={(e)=>setInput({...input,name:e.target.value})}
                  />
                </div>

                <div className="mb-6">
                  <input
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Email address"
                    name="email"
                    value={input.email}
                    onChange={(e)=>setInput({...input,email:e.target.value})}
                  />
                </div>

                <div className="text-center lg:text-left">
                  <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Update
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

export default UpdateProfile;
