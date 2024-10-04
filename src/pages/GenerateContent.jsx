import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../Components/common/Button";
import Input from "../Components/common/Input";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faSpinner,
  faCloudArrowUp,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";
import { chatSession } from "../utils/AiModel";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { getContentBySlug } from "../Api/services/contentService";

const GenerateContent = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState("");
  const [isCopied, setIsCopied] = useState();
  const [content, setContent] = useState();
  const [selectedTemplte, setSelectedTemplate] = useState();
  const editorRef = useRef();

  
  const params = useParams();
  const navigate = useNavigate();
  const { slug } = params;
  useEffect(() => {
    getContentBySlug(slug)
      .then((res) => {
        setContent(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  useEffect(() => {
    if (content) {
      const res = content.find((item) => item.slug == slug);
      setSelectedTemplate(res);
      console.log(res);
    }
  }, [content]);

  const onCopyHandler = (text, result) => {
    if (result) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } else {
      alert("Failed to copy text. Please try again.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    generateAiContent(formData);
  };

  const generateAiContent = async (formData) => {
    setLoading(true);
    const selectedPrompt = selectedTemplte?.aiPrompt;
    const finalAiPrompt = JSON.stringify(formData) + " , " + selectedPrompt;
    const result = await chatSession.sendMessage(finalAiPrompt);
    setAiResult(result?.response.text());
    setLoading(false);

  };

  useEffect(() => {
    const editorInstance = editorRef.current.getInstance();
    editorInstance.setMarkdown(aiResult);
  }, [aiResult]);
  return (
    <>
      <div className="sm:p-6 md:py-8  md:px-2 my-auto">
        <section className="max-w-screen-lg md:rounded-md ">
          <Button
            type="button"
            className="flex gap-2 justify-center items-center mb-3 md:ml-8  lg:ml-0 mt-10 md:mt-0"
            onClick={() => navigate("/home")}
          >
            <FontAwesomeIcon icon={faBackward} /> Back
          </Button>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-gray-800">
            {/* <!-- Form section --> */}
            <div className="lg:col-span-1 flex justify-center">
              <div className="max-w-sm bg-white xl:max-w-md p-4 md:p-6 shadow-md sm:px-8 sm:py-10 rounded-lg">
                <img
                  src={selectedTemplte?.iconUrl}
                  alt="icon"
                  className="w-12 h-12 mb-3 text-blue-600"
                />
                <h2 className="font-semibold text-xl md:text-2xl mb-2 text-purple-700">
                  {selectedTemplte?.categoryName}
                </h2>
                <blockquote className="mt-4">
                  <p className="leading-relaxed text-sm md:text-base">
                    {selectedTemplte?.description}
                  </p>
                </blockquote>
                <form className="mt-4" onSubmit={onSubmit}>
                  {selectedTemplte && (
                    <div className="my-2 flex flex-col gap-2 mb-5 md:mb-6">
                      {selectedTemplte?.formField1 && (
                        <div>
                          <label
                            htmlFor={selectedTemplte?.id}
                            className="block mb-1 font-medium md:font-bold"
                          >
                            {selectedTemplte?.formLabel1}
                          </label>

                          <Input
                            name={selectedTemplte?.formName1}
                            required={selectedTemplte?.formRequired1}
                            onChange={handleChange}
                            placeholder={
                              selectedTemplte?.placeholder ||
                              `Enter ${selectedTemplte?.formLabel1}`
                            }
                            className="w-full px-3 py-2 border rounded-md text-sm md:text-base focus:outline-none focus:ring focus:border-blue-300"
                          />
                        </div>
                      )}

                      {selectedTemplte?.formField2 && (
                        <div>
                          <label
                            htmlFor={selectedTemplte?.id}
                            className="block mb-1 font-medium md:font-bold"
                          >
                            {selectedTemplte?.formLabel2}
                          </label>

                          <textarea
                            name={selectedTemplte?.formName2}
                            required={selectedTemplte?.formRequired2}
                            onChange={handleChange}
                            placeholder={
                              selectedTemplte?.placeholder ||
                              `Enter ${selectedTemplte?.formLabel1}`
                            }
                            className="w-full px-3 py-2 border rounded-md text-sm md:text-base focus:outline-none focus:ring focus:border-blue-300"
                          />
                        </div>
                      )}
                    </div>
                  )}
                  <Button
                    type="submit"
                    className="text-sm md:text-base flex gap-2 items-center justify-center"
                    disabled={loading}
                  >
                    {loading && (
                      <FontAwesomeIcon
                        className="animate-spin"
                        icon={faSpinner}
                      />
                    )}
                    Generate
                  </Button>
                </form>
              </div>
            </div>
            {/* <!-- Editor section --> */}
            <div className="lg:col-span-2 flex flex-col justify-between">
              <div className="bg-white shadow-lg border rounded-lg p-4 md:p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-base md:text-lg">
                    Your Result
                  </h2>
                  <div className="flex gap-2">
                    <Button className="flex items-center gap-2 text-sm md:text-base">
                      <FontAwesomeIcon icon={faCloudArrowUp} />
                      Post
                    </Button>
                    <CopyToClipboard text={aiResult} onCopy={onCopyHandler}>
                      <Button
                        className={`flex items-center gap-2 text-sm md:text-base ${
                          isCopied ? "bg-green-600 text-white" : ""
                        }`}
                      >
                        <FontAwesomeIcon icon={faCopy} /> Copy
                      </Button>
                    </CopyToClipboard>
                  </div>
                </div>
                <Editor
                  ref={editorRef}
                  initialValue="Your result will be here"
                  initialEditType="wysiwyg"
                  height="450px"
                  useCommandShortcut={true}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default GenerateContent;
