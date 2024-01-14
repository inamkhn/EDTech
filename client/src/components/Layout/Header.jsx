import { Link, useNavigate } from "react-router-dom";
import { RiArchiveDrawerLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import {
  signOutFailure,
  signOutStart,
  signOutSuccess,
} from "../../redux/userSlice";

const Header = () => {
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOutHandle = async () => {
    console.log("res");
    try {
      dispatch(signOutStart());
      const res = await fetch("/api/v1/logout", {
        method: "POST",
        // Authentication: `Brearer ${user.access_token}`,
      });
      console.log(res);
      if (res.success === false) {
        dispatch(signOutFailure(res.message));
        return;
      }
      dispatch(signOutSuccess());
      navigate("/");
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };

  return (
    <>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          {/* Page content here */}
          <label htmlFor="my-drawer" className="p-1">
            <div className="bg-yellow-400 px-2 py-2 rounded-full w-10">
              <RiArchiveDrawerLine className="text-2xl" />
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full space-y-2 bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Courses">All Courses</Link>
            </li>
            <li>
              <Link to="/request">Request a Course</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>

            {isAuthenticated ? (
              <div className="space-x-3 mt-52">
                <button className="bg-yellow-400 px-3 py-1 rounded-md">
                  <Link to="/profile">Profile</Link>
                </button>
                <button
                  className="bg-yellow-400 px-3 py-1 rounded-md"
                  onClick={signOutHandle}
                >
                  Logout
                </button>
                {currentUser.user.role == "admin" ? (
                  <>
                    <Link to="/admin/dashboard">
                      <button className="bg-yellow-400 px-3 py-1 rounded-md">
                        Dashboard
                      </button>
                    </Link>
                  </>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <div className="space-x-3 mt-52">
                <Link to="/login">
                  <button className="bg-yellow-400 px-3 py-1 rounded-md">
                    SignIn
                  </button>
                </Link>
                <Link to="/register">
                  <button className="bg-yellow-400 px-3 py-1 rounded-md">
                    SignUp
                  </button>
                </Link>
              </div>
            )}
          </ul>
        </div>
      </div>

      {/* <div className="p-3 flex items-center justify-between bg-slate-600 text-white">
        <div>
          <h1 className="text-2xl font-serif font-bold">Course Bundler</h1>
        </div>
        <div className="flex space-x-4 font-medium">
          <Link to="/">
          Home
          </Link>
          <Link to="/Courge">
          All Courses
          </Link>
          <Link to="/request">
          Request a Course
          </Link>
          <Link to="/contact">
          Contact Us
          </Link>
          <Link to="/about">
          About
          </Link>
        </div>

        {isAuthenticated ? (
          <div className="space-x-3 flex items-center ">
            <button className="bg-yellow-400 px-3 py-1 rounded-md">
              Profile
            </button>
            <button className="bg-yellow-400 px-3 py-1 rounded-md">
              Logout
            </button>
            <Link to="/admin/dashboard">
              <button className="bg-yellow-400 px-3 py-1 rounded-md">
                Dashboard
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-x-3 flex items-center ">
            <Link to="/login">
              <button className="bg-yellow-400 px-3 py-1 rounded-md">
                SignIn
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-yellow-400 px-3 py-1 rounded-md">
                SignUp
              </button>
            </Link>
          </div>
        )}
      </div> */}
    </>
  );
};

export default Header;
