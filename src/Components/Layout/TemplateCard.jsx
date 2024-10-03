import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { getAllContent } from "../../Api/services/contentService";

const TemplateCard = ({ searchTemplate }) => {
  const [templateList, setTemplateList] = useState(searchTemplate);
  const [content, setContent] = useState();

  useEffect(() => {
    getAllContent()
      .then((res) => {
        setContent(res);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    if (content) {
      if (searchTemplate) {
        const filterTemplate = content.filter((item) =>
          item.name.toLowerCase().includes(searchTemplate.toLowerCase())
        );
        setTemplateList(filterTemplate);
      } else {
        setTemplateList(content);
      }
    }
  }, [searchTemplate, content]);
  return (
    <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-2 lg:gap-4 px-2 sm:px-4 md:px-6 lg:px-10 py-8 lg:py-12">
      {templateList &&
        templateList.map((item, index) => (
          <Link
            key={index}
            to={`/content/${item?.slug}`}
            className="flex w-full"
          >
            <div className="relative flex flex-col break-words rounded-lg border border-gray-200 bg-white shadow-lg transition-transform transform hover:scale-105">
              <div className="absolute -mt-10 left-1/2 transform -translate-x-1/2 h-16 w-16 rounded-xl flex items-center justify-center">
                <img src={item?.iconUrl} alt="icon" className="w-12 h-12" />
              </div>
              <div className="p-4 pt-12 text-center">
                <p className="text-sm font-light capitalize text-gray-600">
                  Title
                </p>
                <h4 className="text-lg font-semibold tracking-tight text-gray-800">
                  {item?.categoryName}
                </h4>
              </div>

              <hr className="my-4 border-gray-300" />

              <div className="p-4">
                <p className="font-light text-gray-600">{item?.description}</p>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default TemplateCard;
