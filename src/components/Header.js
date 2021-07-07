import { motion } from "framer-motion";
import React from "react";
import { IoMdArrowDropdown, IoMdPerson } from "react-icons/io";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useSelector } from "react-redux";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import { selectUser } from "../features/userSlice";
import { Dropdown } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

function Header({ show }) {
  const history = useHistory();
  const user = useSelector(selectUser);
  return (
    <div
      className={`transition-all duration-300 flex items-center py-2 sticky right-0 ${
        show ? "bg-black" : "bg-transparent"
      } top-0 z-10 w-full`}
    >
      {/* icons */}
      <div className={`flex ${!show && "flex-1"}`}>
        <MdNavigateBefore
          onClick={() => history.goBack()}
          className="m-2 text-white rounded-full bg-transparent-rgba text-4xl"
        />
        <MdNavigateNext
          onClick={() => history.goForward()}
          className="m-2 text-white rounded-full bg-transparent-rgba text-4xl"
        />
      </div>

      <motion.div
        className={`animate-fade-in-down duration-300 ${
          show ? "block" : "hidden"
        }  flex-1 ml-2`}
      >
        <img
          className="h-6 sm:h-10"
          src="https://cdn.worldvectorlogo.com/logos/spotify-2.svg"
          alt=""
        />
      </motion.div>

      <div className="flex text-white">
        <div className="flex space-x-1 items-center">
          <div>
            <IoPersonCircleOutline className="text-3xl" />
          </div>
          <p className="mt-3 font-semibold">{user?.display_name}</p>
          <div>
            <IoMdArrowDropdown className="text-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
