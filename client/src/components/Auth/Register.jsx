import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import avatar from '../../assets/images/avatar.png'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [imagePrev, setImagePrev] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate()

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
    
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('file', image);
    // console.log(name,email,password,formData.file)

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post('/api/v1/register', formData, config).then((response) => {
      console.log(response.data);
      toast('Successfully register!')
      navigate('/login');
    });
  };

  return (
    <>
    <ToastContainer/>
      <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form onSubmit={submitHandler}>
                <h1 className="text-2xl font-semibold pb-5 text-center mb-2 text-yellow-700">
                  Register Page
                </h1>
                <div className="flex justify-center">
                  {
                    imagePrev ? 
                    <> 
                    <img
                    className="w-20 mb-4  rounded-2xl"
                    src={imagePrev}
                     />                  
                    </> :
                    <>
                    <img
                    className="w-20 mb-4  rounded-2xl"
                    src={avatar}
                     />
                    </>
                  }
                </div>

                <div className="mb-6">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Name"
                  />
                </div>

                <div className="mb-6">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Email address"
                  />
                </div>

                <div className="mb-6">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Password"
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={changeImageHandler}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="File"
                  />
                </div>

                <div className="text-center lg:text-left">
                  <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Register
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
    </>
  );
};

export default Register;
