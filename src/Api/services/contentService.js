import {
  GET_CATEGORY_BY_SLUG,
  GET_CATEGORY_LIST,
} from "../../constants/apiURL";
import axiosInstance from "../axiosInstance";

export const getAllContent = async () => {
  try {
    const response = await axiosInstance.get(GET_CATEGORY_LIST);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getContentBySlug = async (slug) => {
  try {
    const response = await axiosInstance.get(GET_CATEGORY_BY_SLUG);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
