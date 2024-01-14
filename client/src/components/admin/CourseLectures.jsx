import axios from "axios";
import { useEffect, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import { addLectureFail, addLectureRequest, addLectureSuccess, deleteLectureFail, deleteLectureRequest, deleteLectureSuccess } from "../../redux/adminSlice";

const CourseLectures = () => {
  const [lecture, setLectures] = useState([]);
  const dispatch = useDispatch()

  // Course ID
  const {id} = useParams();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/course/${id}`
      );
      setLectures(data.lectures);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const Nolecture = () => {
    if (lecture.length < 1) {
      return <p>No Lecture</p>;
    }
  };


//    Add lectures

const [desc, setDesc] = useState('');
const [title, setTitle] = useState('');
const [imagePrev, setImagePrev] = useState('');
const [image, setImage] = useState('');
console.log(image)

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
  formData.append('file', image);
  

  try {
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
      withCredentials: true,
    };
    dispatch(addLectureRequest());

    const { data } = await axios.post(
      `/api/v1/course/${id}`,
      formData,
      config
    );
    toast.success("lecture added successfuly")
    dispatch(addLectureSuccess(data.message));
  } catch (error) {
    toast.warning("lecture can't added")
    dispatch(addLectureFail(error.response.data.message));
  }
};


const removeLecture = async(lectureId)=>{
  try {
    const config = {
      withCredentials: true,
    };
    dispatch(deleteLectureRequest());

    const { data } = await axios.delete(
      `/api/v1/lecture?courseId=${id}&lectureId=${lectureId}`,
      config
    );

    toast.success("lecture Delete success")
    dispatch(deleteLectureSuccess(data.message));
  } catch (error) {
    toast.warning("lecture Delete error")
    dispatch(deleteLectureFail(error.response.data.message));
  }
}




  return (
    <div className="mx-10">
        <ToastContainer/>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1">
        <div >
          <Nolecture />
          <p className="text-xl font-bold p-3">Mern Stack Course</p>
          <ul className="menu menu-xs bg-base-200 w-96 rounded-box cursor-pointer">
            {lecture.map((lec, index) => {
              return (
                <>
                  <div key={index} className="flex justify-between my-3 items-center mx-6">
                    <div>
                      <p className="text-lg font-bold">#{index+1}  {lec.title}</p>
                      <span>{lec.description}</span>
                      </div>
                    <button className="" onClick={()=>removeLecture(lec._id)}>
                      <CiCircleRemove className="text-4xl text-red-500" />
                    </button>
                    
                  </div>
                </>
              );
            })}
          </ul>
        </div>




    <div className="mb-4">
            
        <section className="">
        <div className="px-6 h-full text-gray-800">
          <div className="flex items-center flex-wrap h-full g-6">
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form onSubmit={submitHandler}>
                <h1 className="text-2xl font-semibold pb-5 text-center mb-2 text-yellow-700">
                  Create Lecture
                </h1>

                <div className="mb-6">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => {
                    setTitle(e.target.value);
                    }}
                    className="form-control block w-full px-4 py-1 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
                    type="file"
                    onChange={changeImageHandler}
                    className="form-control block w-full px-4 py-1 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="File"
                  />
                  <span className="text-xs font-thin">The lecture should not be greater than 100mb</span>
                </div>
                <div className="flex justify-center">
                  {
                    imagePrev ? 
                    <> 
                    <video
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
                    Create Lecture
                  </button>
                  
                </div>
              </form>
            </div>
          </div>  
        </div>
      </section>

        </div>
      </div>
    </div>
  );
};

export default CourseLectures;
