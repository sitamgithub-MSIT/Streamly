import { Link } from "react-router-dom";
import { Video } from "lucide-react";

const Rightbar = () => {
  return (
    <div className="hidden min-[1150px]:block fixed top-0 right-0 w-[300px] h-screen bg-bgsecondary p-4">
      <div>
      <Link to={""} className="flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-primary to-blue-600 rounded-full">
        <Video />
        Go live
      </Link>
      </div>
      <div className="py-4">
        <h3 className="text-gray-500">
            Game streaming
        </h3>
        <div></div>
    </div>
    </div>
  );
};

export default Rightbar;
