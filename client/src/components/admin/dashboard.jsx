import Sidebar from "./Sidebar";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { Line } from 'react-chartjs-2';

const dashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-10">
          <div className="flex justify-between px-10">
            <div className="card w-60 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Views</h2>
                <div className="flex items-center space-x-3">
                  <span>123</span>
                  <span>20%</span>
                  <span>
                    <FaArrowAltCircleUp />
                  </span>
                </div>
                <span>Since last month</span>
              </div>
            </div>

            <div className="card w-60 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Views</h2>
                <div className="flex items-center space-x-3">
                  <span>123</span>
                  <span>20%</span>
                  <span>
                    <FaArrowAltCircleUp />
                  </span>
                </div>
                <span>Since last month</span>
              </div>
            </div>

            <div className="card w-60 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Views</h2>
                <div className="flex items-center space-x-3">
                  <span>123</span>
                  <span>20%</span>
                  <span>
                    <FaArrowAltCircleUp />
                  </span>
                </div>
                <span>Since last month</span>
              </div>
            </div>
          </div>

          {/* graph */}

          <div className="h-40 w-[920px] rounded-md mx-7 mt-2 p-5 shadow-lg">
            graph
          </div>

          {/* progress */}

          <div className="flex flex-col space-y-7 h-40 w-[920px] rounded-md mx-7 mb-5 mt-2 p-5 shadow-lg">
            <div>
              <span>views </span>
              <progress
                className="progress w-56"
                value="10"
                max="100"
              ></progress>
            </div>
            <div>
              <span>users </span>
              <progress
                className="progress w-56"
                value="40"
                max="100"
              ></progress>
            </div>
            <div>
              <span>subscribers </span>
              <progress
                className="progress w-56"
                value="70"
                max="100"
              ></progress>
            </div>
          </div>
         

{/* line chart */}

{/* <Line
  datasetIdKey='id'
  data={{
    labels: ['Jun', 'Jul', 'Aug'],
    datasets: [
      {
        id: 1,
        label: '',
        data: [5, 6, 7],
      },
      {
        id: 2,
        label: '',
        data: [3, 2, 1],
      },
    ],
  }}
/> */}



        </div>
        <div className="col-span-2">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default dashboard;
