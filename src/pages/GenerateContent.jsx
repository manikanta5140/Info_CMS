import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Template from "../Template";
import Button from "../Components/common/Button";
import Input from "../Components/common/Input";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { chatSession } from "../utils/AiModel";

const GenerateContent = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState("");
  const editorRef = useRef();
  const params = useParams();
  const { slug } = params;
  const selectedTemplte = Template?.find((item) => item.slug == slug);

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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-gray-800">
            {/* <!-- Form section --> */}
            <div className="lg:col-span-1 flex justify-center">
              <div className="max-w-sm bg-white xl:max-w-md p-4 md:p-6 shadow-md sm:px-8 sm:py-10 rounded-lg">
                <img
                  src={selectedTemplte?.icon}
                  alt="icon"
                  className="w-12 h-12 mb-3 text-blue-600"
                />
                <h2 className="font-semibold text-xl md:text-2xl mb-2 text-purple-700">
                  {selectedTemplte?.name}
                </h2>
                <blockquote className="mt-4">
                  <p className="leading-relaxed text-sm md:text-base">
                    {selectedTemplte?.desc}
                  </p>
                </blockquote>
                <form className="mt-4" onSubmit={onSubmit}>
                  {selectedTemplte?.form.map((item, idx) => (
                    <div
                      key={idx}
                      className="my-2 flex flex-col gap-2 mb-5 md:mb-6"
                    >
                      <label
                        htmlFor={`field-${idx}`}
                        className="block mb-1 font-medium md:font-bold"
                      >
                        {item.label}
                      </label>
                      {item.field === "input" ? (
                        <Input
                          name={item?.name}
                          required={item?.required}
                          onChange={handleChange}
                          placeholder={
                            item?.placeholder || `Enter ${item?.label}`
                          }
                          className="w-full px-3 py-2 border rounded-md text-sm md:text-base focus:outline-none focus:ring focus:border-blue-300"
                        />
                      ) : item.field === "textarea" ? (
                        <textarea
                          name={item?.name}
                          required={item?.required}
                          onChange={handleChange}
                          placeholder={
                            item?.placeholder || `Enter ${item?.label}`
                          }
                          className="w-full px-3 py-2 border rounded-md text-sm md:text-base focus:outline-none focus:ring focus:border-blue-300"
                        />
                      ) : null}
                    </div>
                  ))}
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
                  <Button className="flex items-center gap-2 text-sm md:text-base">
                    <FontAwesomeIcon icon={faCopy} /> Copy
                  </Button>
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
