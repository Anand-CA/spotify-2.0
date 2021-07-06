import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { IoMdPerson } from "react-icons/io";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectUser } from "../features/userSlice";

function Header({ show }) {
  const history = useHistory();
  const user = useSelector(selectUser);
  console.log('👨 ',user);
  return (
    <div
      className={`transition-all duration-300 flex items-center py-2 sticky right-0 ${
        show ? "bg-black" : "bg-transparent"
      } top-0 z-10 w-full`}
    >
      {/* icons */}
      <div className="flex flex-1">
        <MdNavigateBefore
          onClick={() => history.goBack()}
          className="m-2 text-white rounded-full bg-transparent-rgba text-4xl"
        />
        <MdNavigateNext
          onClick={() => history.goForward()}
          className="m-2 text-white rounded-full bg-transparent-rgba text-4xl"
        />
      </div>

      <div className="flex">
        <motion.button
          whileHover={{ scale: 1.1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mr-3 bg-transparent-rgba py-2 px-7 border border-gray-200 rounded-full "
        >
          <p className="text-gray-200 ">UPGRADE</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-transparent-rgba items-center space-x-2 flex py-2 px-7 border border-gray-200 rounded-full "
        >
          <IoMdPerson className="text-3xl text-white bg-gray-800  rounded-full" />
          <p className="text-gray-200 ">{user?.display_name}</p>
        </motion.button>
      </div>
    </div>
  );
}

export default Header;
