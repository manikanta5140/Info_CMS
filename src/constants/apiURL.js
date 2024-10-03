import API_CONFIG from "../Api/ApiConfig";

export const LOGIN_URL = "/auth/login";
export const REGISTER_URL = "/auth/register";
export const CHECK_USERNAME_URL = "/api/check-username";
export const GET_USER_URL = "/user";
export const GET_CATEGORY_LIST = "/category/list";
export const GET_CATEGORY_BY_SLUG = (slug) => `/category/${slug}`;
// export const LOGOUT_URL = "/auth/logout";
