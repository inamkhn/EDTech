import { useState } from "react";
import Video from "../assets/videos/intro.mp4";

const CoursePage = () => {
  const [lectureNumber, setlectureNumber] = useState(0);

  console.log(lectureNumber);

  const lectures = [
    {
      _id: "asdas",
      title: "first lecture",
      description: "description",
      video: {
        url: "asdada",
      },
    },
    {
      _id: "asd",
      title: "second lecture",
      description: "description",
      video: {
        url: "asdada",
      },
    },
    {
      _id: "gfsd",
      title: "third lecture",
      description: "description",
      video: {
        url: "asdada",
      },
    },
  ];

  return (
    <>
      <div>
        <div className="grid grid-cols-2 gap-4 m-5">
          <div className="">
            <video className="" controls>
              <source src={Video} type="video/mp4" />
            </video>

            <div>
              <h1 className="text-lg font-medium">
                #{lectureNumber} {lectures[lectureNumber].title}
              </h1>
              <p>{lectures[lectureNumber].description}</p>
            </div>
          </div>

          <div className="ml-3 space-y-3">
            {lectures.map((item, index) => {
              return (
                <div className="flex flex-column " key={index}>
                  <button onClick={() => setlectureNumber(index)}>
                    <span>
                      #{index} {item.title}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursePage;
