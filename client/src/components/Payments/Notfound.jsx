import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <>
      <div className="flex justify-center h-screen items-center">
        <div>
          <h1 className="text-3xl font-bold">Page Not Found</h1>
          <button className="bg-yellow-500 rounded-md px-2 py-1 mt-2 ml-10">
            <Link to="/">Go back Home</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Notfound;
