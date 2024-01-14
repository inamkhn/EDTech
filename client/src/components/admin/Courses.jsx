import { useEffect, useState } from "react";
import {
  allCoursesFail,
  allCoursesRequest,
  allCoursesSuccess,
} from "../../redux/courseSlice";
import Sidebar from "./Sidebar";
import { useDispatch } from "react-redux";
import axios from "axios";
import { CiCircleRemove } from "react-icons/ci";
import { Link } from "react-router-dom";
import { deleteCourseFail, deleteCourseRequest, deleteCourseSuccess } from "../../redux/adminSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      dispatch(allCoursesRequest());
      const { data } = await axios.get("/api/v1/allcourses");
      setCourses(data.courses);
      console.log(data.courses);
      dispatch(allCoursesSuccess(data.courses));
    } catch (error) {
      dispatch(allCoursesFail(error.response.data.message));
    }
  };
  useEffect(() => {
    fetchData();
  }, []);


  const removeHandler=async(id)=>{
    try {
      const config = {
        withCredentials: true,
      };
      dispatch(deleteCourseRequest());
  
      const { data } = await axios.delete(`/api/v1/course/${id}`, config);
  
      toast.success("Course Delete Success")
      dispatch(deleteCourseSuccess(data.message));
    } catch (error) {
      toast.warning("Course Can't Delete")
      dispatch(deleteCourseFail(error.response.data.message))
    }
  }

  return (
    <div>
      <ToastContainer/>
      <div className="grid grid-cols-12 gap-2 my-5">
        <div className="col-span-10 p-4">
          <div className="overflow-x-auto">
            <table className="table table-xs table-sm table-md table-lg">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Poster</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Creator</th>
                  <th>Views</th>
                  <th>Lectures</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {courses.map((item, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <th>{item._id}</th>
                        <td><img src={item.poster.url} /></td>
                        <td>{item.title}</td>
                        <td>{item.category}</td>
                        <td>{item.createdBy}</td>
                        <td>{item.views}</td>
                        <td>{item.__v}</td>
                        <td className="flex items-center space-x-2"><button className="text-purple-400"><Link to={`/admin/courselecture/${item._id}`}>Views Lectures</Link></button>
                        <CiCircleRemove onClick={()=>removeHandler(item._id)} className="text-4xl text-red-500"/></td>
                      </tr>
                    </>
                  );
                })}

                {/* row 2 */}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-span-2">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Courses;
