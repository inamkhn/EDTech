import { useRef, useState } from "react";
// import Avatar from "../assets/images/avatar.png";
import { AiFillDelete } from "react-icons/ai";
// import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios'
import { removeFromPlaylistFail, removeFromPlaylistRequest, removeFromPlaylistSuccess } from "../redux/profileSlice";
import { useDispatch } from "react-redux";

const Profile = () => {
  const [file,setFile] = useState('')
  const fileRef = useRef(file)
  const dispatch = useDispatch()
  const {name,email,createdAt,subscription,role,playlist,avatar} = useSelector(state=>state.user.currentUser)

  // const changeImageHandler = e => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();

  //   reader.readAsDataURL(file);

  //   reader.onloadend = () => {
  //     setImagePrev(reader.result);
  //     setImage(file);
  //   };
  // };
  
  // const user = {
  //   name: "william",
  //   email: "william@gmail.com",
  //   createdAt: String(new Date().toISOString()),
  //   role: "user",
  //   subscription: {
  //     status: undefined,
  //   },
  //   playlist: [
  //     {
  //       course: "web development",
  //       poster: "https://miro.medium.com/max/750/1*jGtzzbyshVAnYHrslLtbAg.jpeg",
  //     },
  //   ],
  // };
  
  const removeFromPlaylistHandler = async(id) => {
    try {
      dispatch(removeFromPlaylistRequest());
      
      const config = {
        withCredentials: true,
      };
  
      const { data } = await axios.delete(
        `/api/v1/removeFromPlaylist?id=${id}`,
        config
      );
  
      dispatch(removeFromPlaylistSuccess(data.message));
    } catch (error) {
      dispatch(removeFromPlaylistFail(error.response.data.message));
    }
  };

  return (
    <>
      <div className="flex justify-around items-center p-10 m-3">
        <div>
          <a href="#">
            <img className="rounded-md" src={avatar.url} onClick={()=>fileRef.current.click()}   alt="" width={150} />
          </a>
          <input type="file" alt="" hidden value={file} ref={fileRef} onChange={e=>setFile(e.target.files[0])} />
          <h1 className="text-gray-400 text-center">Change Picture</h1>
        </div>
        <div>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Name : {name}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Email : {email}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            CreatedDate : {createdAt.split("T")[0]}
          </p>

          {role !== "admin" && (
            <div>
              {subscription.status !== "active" ? (
                <div>
                  <span className="font-medium">Subscribe : </span>{" "}
                  <button className="bg-red-700 px-2 py-1 rounded-xl">
                    Cancel subscription
                  </button>
                </div>
              ) : (
                <div>
                  <span className="font-medium">Subscribe : </span>{" "}
                  <Link to="/subscribe">
                    <button className="bg-yellow-600 rounded-xl px-2 py-1">
                      subscribe
                    </button>
                  </Link>
                </div>
              )}
            </div>
          )}
          <div className="flex space-x-2 mt-2">
            <Link to="/updateprofile">
              {" "}
              <button
                className="bg-yellow-300 rounded-xl px-2 py-1"
                data-modal-toggle="popup-modal"
              >
                Update Profile
              </button>
            </Link>
            <Link to="/changepassword">
              {" "}
              <button className="bg-yellow-300 rounded-xl px-2 py-1">
                Change Password
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        {playlist.length > 0 && (
          <div className="p-6">
            <h1 className="text-lg font-medium p-3">PlayList</h1>

            {playlist.map((elem) => {
              return (
                <>
                  <div className="max-w-sm p-2 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                      <img className="rounded-t-lg" src={elem.poster} alt="" />
                    </a>
                    <div className="flex justify-around items-center">
                      <Link to={`/course/${elem.course}`}>
                        <a href="#">
                          <h5
                            className="mb-2 text-xl font-normal bg-yellow-600 px-2 py-1 rounded-md mt-3 tracking-tight text-gray-900 dark:text-white">
                            {/* {elem.course} */}
                            WatchNow
                          </h5>
                        </a>
                      </Link>
                      <button onClick={() => removeFromPlaylistHandler(elem.course)}>
                      <AiFillDelete className="text-xl"  />
                      </button>
                      
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        )}
      </div>
      <changePhoto />
    </>
  );
};

export default Profile;
