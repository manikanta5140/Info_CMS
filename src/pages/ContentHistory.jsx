import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudArrowUp,
  faCalendarDays,
  faReceipt,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { getContentHistory } from "../Api/services/contentService";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ModalButton from "../Components/common/ModalButton";

const ContentHistory = () => {
  const [historyContent, setHistoryContent] = useState([]);
  const [searchContent, setSearchContent] = useState("");
  const [contentValue, setContentValue] = useState(searchContent);
  const navigate = useNavigate();

  useEffect(() => {
    getContentHistory()
      .then((res) => {
        console.log(res, "sdfghj");
        setHistoryContent(res);
      })
      .catch((err) => console.log(err));
  }, []);
  const getContent = (content) => {
    return content.length > 100 ? content.slice(0, 100) + "..." : content;
  };

  useEffect(() => {
    if (historyContent) {
      if (searchContent) {
        const filterContent = historyContent.filter((item) =>
          item.content.toLowerCase().includes(searchContent.toLowerCase())
        );
        setContentValue(filterContent);
        console.log(contentValue);
      } else {
        setContentValue(historyContent);
      }
    }
  }, [searchContent, historyContent]);

  return (
    <div className="w-screen bg-fill">
      <div className="mx-auto max-w-screen-xl px-2 py-10">
        <div className="mt-4 w-full">
          <div className="flex w-full flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
            <form className="relative flex w-full max-w-2xl items-center">
              <FontAwesomeIcon
                className="absolute left-2 block h-5 w-5 text-secondary"
                icon={faMagnifyingGlass}
              />
              <input
                type="text"
                name="search"
                className="h-12 w-full text-primary border-b-gray-400 bg-transparent py-4 pl-12 text-sm outline-none focus:border-b-2"
                placeholder="Search by content name"
                onChange={(e) => setSearchContent(e.target.value)}
              />
            </form>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl bg-primary px-6 shadow lg:px-4">
          <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
            <thead className="hidden border-b lg:table-header-group">
              <tr>
                <td className="whitespace-normal py-4 text-sm font-semibold text-primary sm:px-3">
                  Id
                </td>
                <td className="whitespace-normal py-4 text-sm font-semibold text-primary sm:px-3">
                  Template
                </td>
                <td className="whitespace-normal py-4 text-sm font-semibold text-primary sm:px-3">
                  Content Name
                </td>
                <td className="whitespace-normal py-4 text-sm font-semibold text-primary sm:px-3">
                  Date
                  <FontAwesomeIcon
                    className="h-3 w-3 ml-3 mb-1 align-middle"
                    icon={faCalendarDays}
                  />
                </td>
                <td className="whitespace-normal py-4 text-sm font-semibold text-primary sm:px-3">
                  Post
                  <FontAwesomeIcon
                    className="h-4 w-4 ml-4 mb-1 align-middle"
                    icon={faCloudArrowUp}
                  />
                </td>
                <td className="whitespace-normal py-4 text-sm font-semibold text-primary sm:px-3">
                  Action
                </td>
              </tr>
            </thead>

            <tbody className=" lg:border-gray-300">
              {contentValue.length > 0 ? (
                contentValue.map((item, index) => (
                  <tr key={item.id} className="border-b border-gray-300">
                    <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
                      <span className="hidden lg:block">{index + 1}</span>
                      <div className="mt-1 flex flex-col text-xs font-medium lg:hidden">
                        <div className="flex items-center gap-2 text-lg font-bold">
                          <FontAwesomeIcon icon={faReceipt} />
                          Platform
                        </div>
                        <div className="flex items-center">
                          {getContent(item?.content)}
                        </div>
                        <div className="flex items-center gap-1">
                          <FontAwesomeIcon
                            className="h-3 w-3 align-middle"
                            icon={faCalendarDays}
                          />
                          {new Date(item.createdOn).toLocaleDateString("en-US")}
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-secondary sm:px-3 lg:table-cell">
                      {item.slug}
                    </td>
                    <td className="whitespace-no-wrap py-4 text-right text-sm text-secondary sm:px-3 lg:text-left hidden lg:block">
                      {getContent(item?.content)}
                    </td>
                    <td className="whitespace-no-wrap py-4 text-right text-sm text-secondary sm:px-3 lg:text-left block lg:hidden">
                      <div className="flex gap-1 justify-center items-center">
                        <span className=" cursor-pointer mt-2 ml-auto block w-fit whitespace-nowrap rounded-full bg-primary py-0.5 text-center text-xs text-primary  lg:hidden">
                          <ModalButton message={getContent(item.content)} contentHistoryId={item.id}/>
                        </span>

                        <span
                          onClick={() => navigate(`/content/${item.id}/edit`)}
                          className=" cursor-pointer mt-2 ml-auto block w-fit whitespace-nowrap rounded-full bg-button-secondary px-2  text-center text-xs text-primary  lg:hidden"
                        >
                          Edit
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-secondary sm:px-3 lg:table-cell">
                      {new Date(item.modifiedOn).toLocaleDateString("en-US")}
                    </td>
                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                      <span className="  cursor-pointer mr-3 whitespace-nowrap rounded-full bg-button  py-0.5 text-primary font-semibold">
                      <ModalButton message={getContent(item.content)} contentHistoryId={item.id}/>
                      </span>
                    </td>
                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-3 lg:table-cell">
                      <span
                        className="  cursor-pointer mr-3 whitespace-nowrap rounded-full bg-button-secondary px-4 py-0.5 text-primary font-semibold"
                        onClick={() => navigate(`/content/${item.id}/edit`)}
                      >
                        Edit
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="py-4 text-center text-sm text-gray-600"
                  >
                    No content history available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContentHistory;
