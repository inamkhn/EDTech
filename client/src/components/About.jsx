import Avatar from "../assets/images/avatar.png";

const About = () => {
  return (
    <div className="flex justify-center">
      <div className="card w-96 text-gray-600 p-7  text-neutral-content">
        <div className="card-body items-center text-center">
          <h2 className="card-title">
            <img src={Avatar} alt="" width={100} className="rounded-full" />
          </h2>
          <p className="text-amber-400 text-xl font-bold">InamKhan</p>
          <div className="card-actions justify-end">
            <span className="w-96 font-light">
              Hi I am full stack developer working working on
              frontend(React,Next) and backend(Node,Express,MongoDB) and
              devops(Aws,Docker,Kubernetes)
            </span>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default About;
