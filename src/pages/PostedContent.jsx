import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faCloudArrowUp,
  faCalendarDays,
  faReceipt,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { getAllPost } from "../Api/services/socialMediaService";
import GenerateContent from "./GenerateContent";
import { getContent } from "../utils/Validation";

const PostedContent = () => {
  const [post, setPost] = useState(null);
  const [postedContent, setPostedContent] = useState(null);
  const [searchContent, setSearchContent] = useState("");
  useEffect(() => {
    if (postedContent) {
      if (searchContent) {
        const filterContent = postedContent.filter((item) =>
          item?.posts?.contentHistory?.content.toLowerCase().includes(searchContent?.toLowerCase())
        );
        setPost(filterContent);
      } else {
        setPost(postedContent);
      }
    }
  }, [searchContent, postedContent]);

  useEffect(() => {
    getAllPost()
      .then((res) => setPostedContent(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="w-screen bg-fill">
        <div className="mx-auto max-w-screen-xl px-2 py-10">
          <div className="mt-4 w-full">
            <div className="flex w-full flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
              <form className="relative flex w-full max-w-2xl items-center">
                <FontAwesomeIcon
                  className=" absolute left-2 block h-5 w-5 text-primary"
                  icon={faMagnifyingGlass}
                />

                <input
                  type="text"
                  name="search"
                  className="h-12 w-full text-primary border-b-gray-400 bg-transparent py-4 pl-12 text-sm outline-none focus:border-b-2"
                  placeholder=" Search by content name"
                  onChange={(e) => setSearchContent(e.target.value)}
                />
              </form>

              {/* filter */}
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl bg-primary px-6 shadow lg:px-4">
            <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
              <thead className="hidden border-b lg:table-header-group">
                <tr className="">
                  <td className="whitespace-normal py-4 text-sm font-semibold text-primary sm:px-3">
                    Id
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-semibold text-primary sm:px-3">
                    Template
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-semibold text-primary sm:px-3">
                    Content
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-semibold text-primary sm:px-3 flex gap-2 items-center justify-center">
                    <FontAwesomeIcon
                      className="h-3 w-3  mb-1 align-middle"
                      icon={faCalendarDays}
                    />
                    PostedOn
                  </td>

                  <td className="whitespace-normal py-4 text-sm font-semibold text-primary sm:px-3">
                    <FontAwesomeIcon
                      className="h-4 w-4 mr-2 mb-1 align-middle"
                      icon={faCloudArrowUp}
                    />
                    Post
                  </td>
                </tr>
              </thead>

              <tbody className="lg::border-gray-300">
                {post?.length >0 ? (
                  [...post].reverse().map((item, idx) => (
                    <tr key={idx}>
                      <td className="whitespace-no-wrap py-4 text-left text-sm text-secondary sm:px-3 lg::text-left">
                        <span className="hidden lg:block"> {idx + 1}</span>
                        <div className="mt-1 flex flex-col text-xs font-medium lg:hidden">
                          <div className="flex items-center  gap-2 text-lg font-bold">
                            <FontAwesomeIcon icon={faReceipt} />
                            {item?.posts?.contentHistory?.slug}
                          </div>
                          <div className="flex items-center">
                            {getContent(item?.posts?.contentHistory?.content)}
                          </div>
                          <div className="flex gap-1 justify-start items-center">
                            <FontAwesomeIcon
                              className="h-4 w-4   align-middle"
                              icon={faCloudArrowUp}
                            />
                            <div className="">
                              {item?.platforms?.map((plat, idx) => (
                                <img key={idx}
                                  src={plat?.platformImage}
                                  className="h-5 w-5"
                                />
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <FontAwesomeIcon
                              className="h-3 w-3 align-middle"
                              icon={faCalendarDays}
                            />
                            {item?.platforms?.map((plat, idx) => (
                              <span key={idx}>
                                {" "}
                                {new Date(plat?.createdOn).toLocaleDateString(
                                  "en-US"
                                )}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>

                      <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-secondary sm:px-3 lg:table-cell">
                        {item?.posts?.contentHistory?.slug}
                      </td>

                      <td className="whitespace-no-wrap py-4 text-right text-sm text-secondary sm:px-3 lg:text-left hidden lg:block">
                        {getContent(item?.posts?.contentHistory?.content)}
                      </td>

                      <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-secondary sm:px-3 lg:table-cell">
                        {item?.platforms?.map((plat, idx) => (
                          <span key={idx}>
                            {new Date(plat?.createdOn).toLocaleDateString(
                              "en-US"
                            )}
                          </span>
                        ))}
                      </td>
                      <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-secondary sm:px-3 lg:table-cell">
                        {item?.platforms?.map((plat, idx) => (
                          <img key={idx} src={plat?.platformImage} className="h-5 w-5" />
                        ))}
                      </td>
                    </tr>
                  ))):(
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
    </>
  );
};

export default PostedContent;
