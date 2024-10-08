import {
  AUTHORIZE_TWITTER,
  GET_ALL_PLATFORMS,
  GET_ALL_POST,
  TWITTER_POST_URL,
  USER_VERIFIED_PLATFORM,
} from "../../constants/apiURL";
import axiosInstance from "../axiosInstance";

export const authorizeTwitter = async () => {
  const response = await axiosInstance.get(AUTHORIZE_TWITTER);
  console.log(response);
  if (response?.data?.redirectUrl) {
    window.location.href = response.data.redirectUrl;
  } else {
    console.error("No redirect URL returned from the backend");
  }
};

export const verifyPlatform = async () => {
  const response = await axiosInstance.get(USER_VERIFIED_PLATFORM);
  return response.data;
};

export const twitterPost = async (message, contentHistoryId) => {
  const data = {
    message: message,
    contentHistoryId: contentHistoryId,
  };
  console.log(data);
  const response = await axiosInstance.post(TWITTER_POST_URL, data);
  return response.data;
};


export const getAllPlatforms=async()=>{
const response=await axiosInstance.get(GET_ALL_PLATFORMS);
return response.data.data;
}
export const getAllPost=async()=>{
  const response=await axiosInstance.get(GET_ALL_POST);
  console.log(response.data.data)
  return response.data.data;
  }