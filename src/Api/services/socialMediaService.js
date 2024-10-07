import {
  AUTHORIZE_TWITTER,
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
  console.log(response.data, "fghjkl");
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
