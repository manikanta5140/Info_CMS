import React, { useState } from "react";
import TemplateCard from "../Components/Layout/TemplateCard";
import Input from "../Components/common/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [searchTemplate, setSearchTemplate] = useState("");



  return (
    <>
      <div className="flex flex-col py-8 w-full">
        <div className="bg-gradient-to-t from-indigo-600 to-blue-600 px-4 py-8 sm:rounded-xl sm:py-6 min-h-[150px] lg:min-h-[250px] flex flex-col items-center justify-center text-center">
          <p className="text-center text-lg sm:text-xl lg:text-2xl font-light text-indigo-100 leading-relaxed tracking-wide">
            <span className="block text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-2">
              Great Ideas Start Here
            </span>
            <span className="text-indigo-200">
              Browse our{" "}
              <span className="font-bold text-white underline decoration-indigo-200 underline-offset-4">
                templates
              </span>{" "}
              and{" "}
              <span className="font-bold text-white underline decoration-indigo-200 underline-offset-4">
                create
              </span>{" "}
              something amazing today!
            </span>
          </p>

          {/* Input Field */}
          <form className="relative flex w-full max-w-2xl items-center mt-4">
            <FontAwesomeIcon
              className=" absolute left-2 block h-5 w-5 text-white"
              icon={faMagnifyingGlass}
            />
            <Input
              placeholder="Search..."
              className="h-12 w-full text-white placeholder-white  border-b-white bg-transparent py-4 pl-12 text-sm outline-none focus:border-b-2"
              name="searchTemplate"
              value={searchTemplate}
              onChange={(e) => setSearchTemplate(e.target.value)}
            />
          </form>
        </div>

        {/* Cards Section */}
        <div className="w-full mt-8">
          <TemplateCard searchTemplate={searchTemplate} />
        </div>
      </div>
    </>
  );
};

export default Home;
