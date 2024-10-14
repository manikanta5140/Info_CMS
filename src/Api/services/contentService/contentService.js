import {
  GET_CATEGORY_BY_SLUG,
  GET_CATEGORY_LIST,
  GET_CONTENT_BY_ID,
  GET_CONTENT_HISTORY,
  STORE_CONTENT_HISTORY,
  UPDATE_CONTENT_HISTORY,
} from "../../../constants/apiURL";
import axiosInstance from "../../axiosInstance";

export const getAllContent = async () => {
  try {
    const response = await axiosInstance.get(GET_CATEGORY_LIST);
    return response.data;
  } catch (error) {
    console.error(error.message, "error");
  }
};
export const getContentBySlug = async (slug) => {
  try {
    const response = await axiosInstance.get(GET_CATEGORY_BY_SLUG(slug));
    return response.data;
  } catch (error) {
    console.error(error.message, "error");
  }
};
export const storeContentHistory = async (contentData) => {
  try {
    const response = await axiosInstance.post(
      STORE_CONTENT_HISTORY,
      contentData
    );
    return response.data;
  } catch (error) {
    console.error(error.message, "error");
  }
};
export const getContentHistory = async () => {
  try {
    const response = await axiosInstance.get(GET_CONTENT_HISTORY);
    return response.data;
  } catch (error) {
    console.error(error.message, "error");
  }
};

export const getContentById = async (id) => {
  try {
    const response = await axiosInstance.get(GET_CONTENT_BY_ID(id));
    return response.data;
  } catch (error) {
    showNotification(error.message, "error");
  }
};

export const updateContentHistory = async (id, updatedcontentData) => {
  try {
    const response = await axiosInstance.patch(
      UPDATE_CONTENT_HISTORY(id),
      updatedcontentData
    );

    return response.data;
  } catch (error) {
    showNotification(error.message, "error");
  }
};
