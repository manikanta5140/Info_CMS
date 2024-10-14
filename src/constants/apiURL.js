import API_CONFIG from "../Api/ApiConfig";

export const LOGIN_URL = "/auth/login";
export const REGISTER_URL = "/auth/register";
export const CHECK_USERNAME_URL = "/user/unique-user";
export const GET_USER_URL = "/user";
export const GET_CATEGORY_LIST = "/category/list";
export const GET_CATEGORY_BY_SLUG = (slug) => `/category/${slug}`;
export const STORE_CONTENT_HISTORY = "/content-history";
export const UPDATE_CONTENT_HISTORY = (id) => `/content-history/${id}`;
export const GET_CONTENT_HISTORY = "/content-history";
export const GET_CONTENT_BY_ID = (id) => `/content-history/${id}`;
export const CHECK_VALID_TOKEN = (token) => `/auth/isvalid-user/${token}`;
export const UPDATE_USER_URL = () => `/user`;
export const GET_ALL_PLATFORMS = "/posts/all-platforms";
export const GET_ALL_POST = "/posts";
export const RESEND_EMAIL = "/auth/resend-email";

export const AUTHORIZE_TWITTER = "/sm/twitter/authorize";
export const USER_VERIFIED_PLATFORM = "/verifiedPlatforms";
export const TWITTER_POST_URL = "/sm/twitter/tweet";
export const FACEBOOK_POST_URL = "/sm/facebook/post";
export const STORE_GOOGLE_USER = "/auth/store-google-user";

export const SEND_WHATSAPP_VERIFICATION_CODE =
  "/user/send-whatsapp-verification-token";

export const VERIFY_WHATSAPP_VERIFICATION_TOKEN =
  "/user/verify-whatsapp-verification-token";

export const AUTHORIZE_FACEBOOK = "/sm/facebook/credentials";

export const SCHEDULE_POST = "/schedule-posts";
