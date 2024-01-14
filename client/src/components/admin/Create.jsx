import Sidebar from "./Sidebar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch,useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { createCourseFail, createCourseRequest, createCourseSuccess } from "../../redux/adminSlice";


const Create = () => {

    const [desc, setDesc] = useState('');
    const [title, setTitle] = useState('');
    const [createdBy, setCreatedBy] = useState('');
    const [option, setOption] = useState('');
    const [imagePrev, setImagePrev] = useState('');
    const [image, setImage] = useState('');

    const dispatch = useDispatch()

    const options = ['Web Developement','data science','devops'] 
  
    const changeImageHandler = e => {
      const file = e.target.files[0];
      const reader = new FileReader();
  
      reader.readAsDataURL(file);
  
      reader.onloadend = () => {
        setImagePrev(reader.result);
        setImage(file);
      };
    };
  
    const submitHandler = async(e) => {
      e.preventDefault();
      const formData  = new FormData();
      
      formData.append('title', title);
      formData.append('description', desc);
      formData.append('category', option);
      formData.append('createdBy', createdBy);
      formData.append('file', image);
      console.log(formData)
  
      try {
        const config = {
          headers: {
            'Content-type': 'multipart/form-data',
          },
          withCredentials: true,
        };
        dispatch(createCourseRequest())
    
        const { data } = await axios.post(
          '/api/v1/createcourse',
          formData,
          config
        );
        toast.success('Course Successfully Created')
        dispatch(createCourseSuccess(data.message))
      } catch (error) {
        toast.warning("Course Can't Created")
        dispatch(createCourseFail(error.response.data.message));
      }
    };

  return (
    <div>
      <ToastContainer/>
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-10">   
        <section className="">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form onSubmit={submitHandler}>
                <h1 className="text-2xl font-semibold pb-5 text-center mb-2 text-yellow-700">
                  Create Course
                </h1>

                <div className="mb-6">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => {
                    setTitle(e.target.value);
                    }}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Course title"
                  />
                </div>

                <div className="mb-6">
                  <input
                    type="text"
                    value={desc}
                    onChange={(e) => {
                      setDesc(e.target.value);
                    }}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Course Description"
                  />
                </div>

                <div className="mb-6">
                  <input
                    type="text"
                    value={createdBy}
                    onChange={(e) => {
                      setCreatedBy(e.target.value);
                    }}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="CreatedBy"
                  />
                </div>

                <div className="mb-6">
                  <select
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    value={option}
                    onChange={e=>setOption(e.target.value)}>
                    <option value={""}>Select Category</option>
                    {
                      options.map((item)=>{
                        return(<>
                             <option key={item.id} value={item}>{item}</option>
                        </>)
                      })
                    }
                  </select>
                </div>
                <div className="mb-6">
                  <input
                    type="file"
                    // value={password}
                    onChange={changeImageHandler}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="File"
                  />
                </div>
                <div className="flex justify-center">
                  {
                    imagePrev ? 
                    <> 
                    <img
                    className="w-52 mb-4 rounded-lg"
                    src={imagePrev}
                     />                  
                    </> :
                    ''
                  }
                  
                </div>

                <div className="text-center lg:text-left">
                  <button
                    type="submit"
                    className="inline-block px-7 w-full py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Create
                  </button>
                  <div className="flex space-x-2 items-center">
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    if you have already account?
                  </p>
                  <Link to="/login">
                  <p className="text-red-600 mt-3 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">
                      login
                    </p>
                    </Link>
                  </div>
                  
                </div>
              </form>
            </div>
          </div>  
        </div>
      </section>


        </div>


        
        <div className="col-span-2">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Create;
