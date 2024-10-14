import {
  AUTHORIZE_FACEBOOK,
  AUTHORIZE_TWITTER,
  FACEBOOK_POST_URL,
  GET_ALL_PLATFORMS,
  GET_ALL_POST,
  SCHEDULE_POST,
  SEND_WHATSAPP_VERIFICATION_CODE,
  TWITTER_POST_URL,
  USER_VERIFIED_PLATFORM,
  VERIFY_WHATSAPP_VERIFICATION_TOKEN,
} from "../../constants/apiURL";
import axiosInstance from "../axiosInstance";

export const authorizeTwitter = async () => {
  const response = await axiosInstance.get(AUTHORIZE_TWITTER);
  if (response?.data?.redirectUrl) {
    window.location.href = response.data.redirectUrl;
  } else {
    console.log(response);
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
  const response = await axiosInstance.post(TWITTER_POST_URL, data);
  return response.data;
};

export const getAllPlatforms = async () => {
  const response = await axiosInstance.get(GET_ALL_PLATFORMS);
  return response.data.data;
};
export const getAllPost = async () => {
  const response = await axiosInstance.get(GET_ALL_POST);
  return response.data.data;
};

export const sendWhatsappVerificationToken = async (mobileNumber) => {
  try {
    const response = await axiosInstance.post(
      SEND_WHATSAPP_VERIFICATION_CODE,
      mobileNumber
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const verifyWhatsappVerificationToken = async (token) => {
  const response = await axiosInstance.post(
    VERIFY_WHATSAPP_VERIFICATION_TOKEN,
    token
  );
  return response.data;
};

export const authorizeFacebook = async (credentials) => {
  const response = await axiosInstance.post(AUTHORIZE_FACEBOOK, credentials);
  return response.data;
};
export const facebookPost = async (message, contentHistoryId) => {
  const data = {
    message: message,
    contentHistoryId: contentHistoryId,
  };
  const response = await axiosInstance.post(FACEBOOK_POST_URL, data);
  return response.data;
};

export const schedulePosts = async (data) => {
  const response = await axiosInstance.post(SCHEDULE_POST, data);
  return response.data;
};
