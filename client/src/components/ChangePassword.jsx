import { useState } from "react";
import axios from 'axios'
import { useDispatch,useSelector } from "react-redux";
import {changePasswordRequest,changePasswordSuccess,changePasswordFail} from '../redux/profileSlice'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const ChangePassword = () => {
  const [newpassword,setNewpassword] = useState('')
  const [oldpassword,setOldpassword] = useState('')

  const dispatch = useDispatch()
  const {currentUser} = useSelector(state=>state.user)

  const handleChange = async(e)=>{
    e.preventDefault()
    try {
      dispatch(changePasswordRequest());
      const { data } = await axios.put('/api/v1/changepassword',
        {
          oldpassword,
          newpassword
        },
        {
          headers: {
            'Content-type': 'application/json',
          }, 
          Authentication: `'Brearer ' ${currentUser.access_token}`,
          withCredentials: true,
        }
      );
      toast.success('password successfully changed')
      dispatch(changePasswordSuccess(data.message));
    } catch (error) {
      toast.warning('something error occured')
      dispatch(changePasswordFail(error.response.data.message));
    }
  }

  return (
    <>
    <ToastContainer/>
      <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form onSubmit={handleChange}>
                <h1 className="text-2xl font-semibold pb-5 text-center mb-2 text-yellow-700">
                  Change Password
                </h1>
                <div className="mb-6">
                  <input
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="New Password"
                    value={newpassword}
                    onChange={(e)=>setNewpassword(e.target.value)}
                  />
                </div>

                <div className="mb-6">
                  <input
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Old Password"
                    value={oldpassword}
                    onChange={(e)=>setOldpassword(e.target.value)}
                  />
                </div>

                <div className="text-center lg:text-left">
                  <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    changepassword
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

export default ChangePassword;
