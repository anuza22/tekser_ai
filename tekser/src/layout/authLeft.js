import { Link } from "react-router-dom";
import { LocalImg } from "../components/basic/imgProvider";

const LeftSide = () => {
  return (
    <div className="overflow-hidden min-h-screen py-10 md:flex flex-col w-1/2 bg-gradient-to-br from-[#2B0656] via-[#3A0773] to-[#842EE5] i justify-center hidden">
      <Link to="/" className="mt-8 ml-8 lg:ml-16 mb-20 lg:mb-28 4xl:mb-48 w-fit">
      <span className="text-4xl font-bold text-white">TekserAi</span>
      </Link>
      <div className="scale-[1.25] mb-8">
        {/* <img src={LocalImg.sign} alt="sign" className="" /> */}
      </div>
    </div>
  );
};

export default LeftSide;
