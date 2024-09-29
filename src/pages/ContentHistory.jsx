import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faCloudArrowUp,
  faCalendarDays,
  faReceipt,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const ContentHistory = () => {
  return (
    <>
      <div className="w-screen bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-2 py-10">
          <div className="mt-4 w-full">
            <div className="flex w-full flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
              <form className="relative flex w-full max-w-2xl items-center">
                <FontAwesomeIcon
                  className=" absolute left-2 block h-5 w-5 text-gray-400"
                  icon={faMagnifyingGlass}
                />

                <input
                  type="text"
                  name="search"
                  className="h-12 w-full border-b-gray-400 bg-transparent py-4 pl-12 text-sm outline-none focus:border-b-2"
                  placeholder=" Search by content name"
                />
              </form>

              {/* filter */}
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl bg-white px-6 shadow lg:px-4">
            <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
              <thead className="hidden border-b lg:table-header-group">
                <tr className="">
                  <td className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">
                    Id
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">
                    Template
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">
                    Content Name
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">
                    Date
                    <FontAwesomeIcon
                      className="h-3 w-3 ml-3 mb-1 align-middle"
                      icon={faCalendarDays}
                    />
                  </td>

                  <td className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">
                    Post
                    <FontAwesomeIcon
                      className="h-4 w-4 ml-4 mb-1 align-middle"
                      icon={faCloudArrowUp}
                    />
                  </td>

                  <td className="whitespace-normal py-4 text-sm font-semibold text-gray-800  sm:px-3">
                    Copy
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">
                    Action
                  </td>
                </tr>
              </thead>

              <tbody className="bg-white lg::border-gray-300">
                <tr className="">
                  <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-600 sm:px-3 lg::text-left">
                    <span className="hidden lg:block"> 1</span>
                    <div className="mt-1 flex flex-col text-xs font-medium lg:hidden">
                      <div className="flex items-center  gap-2 text-lg font-bold">
                        <FontAwesomeIcon icon={faReceipt} />
                        Platform
                      </div>
                      <div className="flex items-center">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Minima similique aliquid optio neque, quisquam eum?
                      </div>
                      <div className="flex gap-1 justify-start items-center">
                        <FontAwesomeIcon
                          className="h-4 w-4   align-middle"
                          icon={faCloudArrowUp}
                        />
                        instagram facebook
                      </div>
                      <div className="flex items-center gap-1">
                        <FontAwesomeIcon
                          className="h-3 w-3 align-middle"
                          icon={faCalendarDays}
                        />
                        12/5/2024
                      </div>
                    </div>
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                    Youtube
                  </td>

                  <td className="whitespace-no-wrap py-4 text-right text-sm text-gray-600 sm:px-3 lg:text-left hidden lg:block">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Magni ullam earum excepturi qui! Necessitatibus, porro.
                  </td>
                  <td className="whitespace-no-wrap py-4 text-right text-sm text-gray-600 sm:px-3 lg:text-left block lg:hidden">
                    <div className="flex items-center gap-2 justify-end">
                      <FontAwesomeIcon icon={faCopy} />
                      Copy
                    </div>
                    <span className="mt-2 ml-auto block w-fit whitespace-nowrap rounded-full bg-purple-100 px-2 py-0.5 text-center text-xs text-purple-800 lg:hidden">
                      Edit
                    </span>
                  </td>
                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                    15/4/2024
                  </td>
                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                    facebook , linkedin
                  </td>
                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                    Copy
                  </td>
                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-3 lg:table-cell">
                    <span className="ml-2 mr-3 whitespace-nowrap rounded-full bg-purple-100 px-2 py-0.5 text-purple-800">
                      Edit
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentHistory;
