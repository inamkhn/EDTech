/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import { Input } from "postcss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  addToPlaylistFail,
  addToPlaylistRequest,
  addToPlaylistSuccess,
  allCoursesFail,
  allCoursesRequest,
  allCoursesSuccess,
} from "../redux/courseSlice";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Course = (props) => {
  const { id,title, description, views, lectureCount, creator,image,addToPlaylistHandler } = props;
  return (
    <div className=" w-64 mt-10 mb-16 rounded-md shadow-sm">
      <img src={image.url} alt="" className="w-full h-48" />
      <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <span>Creator: {creator}</span>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
         <span>Views:</span> {views}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
         <span>Lectures:</span> {lectureCount}
        </p>
        <div className="space-x-2">
        <Link to={`/course/${id}`}><button className="text-white text-sm bg-yellow-600 px-2 py-1 rounded-lg">
            Watch Now
          </button></Link>
          <button className="text-white bg-orange-400 text-sm px-2 py-1 rounded-lg" onClick={()=>addToPlaylistHandler(id)}>
            add to playlist</button>
        </div>
      </div>
    </div>
  );
};





const Courses = () => {
  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  const [course, setCourse] = useState([]);

  const dispatch = useDispatch();
  const {currentUser} = useSelector(state=>state.user)
  const categories = [
    "Web Development",
    "Devops",
    "Data Science",
    "Andriod Development",
  ];

  const fetchData = async () => {
    try {
      dispatch(allCoursesRequest());
      const { data } = await axios.get(
        `/api/v1/allcourses?keyword=${keyword}&category=${category}`
      );
      setCourse(data.courses);
      dispatch(allCoursesSuccess(data.courses));
    } catch (error) {
      dispatch(allCoursesFail(error.response.data.message));
    }
  };
  useEffect(() => {
    fetchData();
  }, [keyword, category]);


  const addToPlaylistHandler = async(id)=>{
    try {
      dispatch(addToPlaylistRequest());
  
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
        // Authentication: `Brearer ${user.access_token}`,
        credentials: 'include',
        withCredentials: true,
        
      };
  
      const { data } = await axios.post(
          `/api/v1/addToPlaylist/${currentUser._id}`,
        {
          id
        },
        config
      );
      toast.success("Course Addedd Successfully")
      dispatch(addToPlaylistSuccess(data.message));
    } catch (error) {
      toast.warning("course can't added")
      dispatch(addToPlaylistFail(error.response.data.message));
    }
  }


  return (
    <>
    <ToastContainer/>
      <div className=" flex-col text-center mt-7 space-y-2">
        <h2 className="text-2xl font-medium">All Courses</h2>
        <div className="justify-center py-2">
          <input
            type="text"
            placeholder="Search"
            className="w-72 px-3 py-1  bg-slate-200 rounded-xl outline-none"
            name="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <div className="flex space-x-5 justify-center grid-flow-row">
          {categories.map((item, index) => {
            return (
              <>
                <button
                  key={index}
                  onClick={() => setCategory(item)}
                  className="text-gray-500 ring-1 px-2 py-1 rounded-sm"
                >
                  {item}
                </button>
              </>
            );
          })}
        </div>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 gap-2">
        {course.map((val,index) => {
          return (
            <>
              <div key={index} >
                <Course
                  id={val._id}
                  title={val.title}
                  description={val.description}
                  views={val.views}
                  image={val.poster}
                  lectureCount={val.numOfVideos}
                  creator={val.createdBy}
                  addToPlaylistHandler={addToPlaylistHandler}
                />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Courses;





