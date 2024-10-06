import API_CONFIG from "../Api/ApiConfig";

export const LOGIN_URL = "/auth/login";
export const REGISTER_URL = "/auth/register";
export const CHECK_USERNAME_URL = "/api/check-username";
export const GET_USER_URL = "/user";
export const GET_CATEGORY_LIST = "/category/list";
export const GET_CATEGORY_BY_SLUG = (slug) => `/category/${slug}`;
export const STORE_CONTENT_HISTORY = "/content-history";
export const UPDATE_CONTENT_HISTORY = (id) => `/content-history/${id}`;
export const GET_CONTENT_HISTORY = "/content-history";
export const GET_CONTENT_BY_ID = (id) => `/content-history/${id}`;
export const CHECK_VALID_TOKEN = (token) => `/auth/verify/${token}`;

// export const UPDATE_CONTENT_URL=(slug)=>navigate(`/content/${slug}?mode=edit`)
// export const LOGOUT_URL = "/auth/logout";
