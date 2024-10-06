import React, { useState } from "react";
import TemplateCard from "../Components/Layout/TemplateCard";
import Input from "../Components/common/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [searchTemplate, setSearchTemplate] = useState("");

  return (
    <>
      <div className="flex flex-col pt-12 w-full">
        <div className="bg-gradient-to-t from-[var(--color-primary)] to-[var(--color-important)] px-4 py-8 rounded-lg sm:py-6 min-h-[150px] lg:min-h-[200px] flex flex-col items-center justify-center text-center">
          <p className="text-center text-lg sm:text-xl lg:text-xl font-light text-secondary leading-relaxed tracking-wide">
            <span className="block text-2xl sm:text-5xl lg:text-4xl font-extrabold text-primary mb-2">
              Great Ideas Start Here
            </span>
            <span className="text-secondary font-medium">
              Browse our{" "}
              <span className="font-bold text-primary underline decoration-[var(--color-text-primary)] underline-offset-4">
                templates
              </span>{" "}
              and{" "}
              <span className="font-bold text-primary underline decoration-[var(--color-text-primary)] underline-offset-4">
                create
              </span>{" "}
              something amazing today!
            </span>
          </p>

          {/* Input Field */}
          <form className="relative flex w-full max-w-2xl items-center mt-4">
            <FontAwesomeIcon
              className=" absolute left-2 block h-5 w-5 text-primary"
              icon={faMagnifyingGlass}
            />
            <Input
              placeholder="Search here by template..."
              className="h-12 w-full text-primary placeholder-[var(--color-text-secondary)]   border-[var(--color-secondary)] bg-transparent py-4 pl-12 text-sm outline-none focus:border-b-2"
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
