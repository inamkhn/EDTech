import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  deleteUserFail,
  deleteUserRequest,
  deleteUserSuccess,
  getAllUsersFail,
  getAllUsersRequest,
  getAllUsersSuccess,
} from "../../redux/adminSlice";
import { CiCircleRemove } from "react-icons/ci";

const Users = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const config = {
        withCredentials: true,
      };
      dispatch(getAllUsersRequest());
      const { data } = await axios.get(`/api/v1/admin/users`, config);
      console.log(data.users);
      setUsers(data.users);
      dispatch(getAllUsersSuccess(data.users));
    } catch (error) {
      dispatch(getAllUsersFail(error.response.data.message));
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const removeHandler = async(id)=>{
    try {
      const config = {
        withCredentials: true,
      };
      dispatch(deleteUserRequest());
  
      const { data } = await axios.delete(`/api/v1/admin/user/${id}`, config);
  
      dispatch(deleteUserSuccess(data.message));
    } catch (error) {
      dispatch(deleteUserFail(error.response.data.message));
    }
  }

  return (
    <div>
      <ToastContainer />
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-10">
          {/* user Table   */}

          <div className="overflow-x-auto p-8">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Subcribtions</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {users.map((val, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <th>{index+1}</th>
                        <td>{val.name}</td>
                        <td>{val.email}</td>
                        <td>{val.role}</td>
                        <td>No</td>
                        <td className="flex items-center space-x-2"><button className="text-purple-400">ChangeRole</button>
                        <CiCircleRemove onClick={()=>removeHandler(val._id)} className="text-4xl text-red-500"/></td>
                      </tr>
                    </>
                  );
                })}
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

export default Users;
