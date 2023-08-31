
import { MiniIMG } from "../projectsC/MemberImg";
import { useNavigate } from "react-router-dom";

export default function CalendarProject({ project }) {

    const navigate = useNavigate();

  return (
    <>
      <li className="border-[1px] border-gray-200 flex items-center px-4 py-3 mb-4 hover:shadow-lg space-x-4 group rounded-xl ">

        <div className="w-full flex flex-row justify-between items-center text-black">
            
            <div className="flex flex-row items-center">
                <div className="h-4 w-4 bg-[#ce0d2d] rounded-full mr-4"></div>
                <p className="mb-0 text-left text-base font-semibold ">{project.name}</p>
              
            </div>
            <div>
                <button
                    onClick={() => navigate(`/project/${project.id}`)}
                    className="px-4 py-1 bg-[#ce0d2d] text-white font-semibold text-base text-center rounded-full">Open</button>
            </div>
          
        </div>
      </li>

    </>
  );
}