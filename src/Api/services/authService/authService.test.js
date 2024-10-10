import {
  login,
  register,
  checkUsernameAvailability,
  checkValidToken,
  resendMail,
} from "./authService.js";
import axiosInstance from "../../axiosInstance.js";
import { showNotification } from "../../../Components/notification/Notification.jsx";
import { describe, it, expect, vi, afterEach } from "vitest";
import { CHECK_USERNAME_URL, CHECK_VALID_TOKEN, LOGIN_URL, REGISTER_URL, RESEND_EMAIL } from "../../../constants/apiURL.js";

vi.mock("../../axiosInstance.js");
vi.mock("../../../Components/notification/Notification.jsx");

describe("Auth Service", () => {

afterEach(() => {
  vi.clearAllMocks();
});

// Unit test for login
it("should login successfully and return user data", async () => {
  const userData = { email: "test@example.com", password: "password123" };
  const mockResponse = { data: { user: "testUser", token: "testToken" } };

  axiosInstance.post.mockResolvedValue(mockResponse);

  const result = await login(userData);
  expect(result).toEqual(mockResponse.data);
  expect(axiosInstance.post).toHaveBeenCalledWith(LOGIN_URL, userData);
});

it("should show notification on login failure", async () => {
  const userData = { email: "test@example.com", password: "password123" };

  const mockError = {
    response: { data: { message: "Invalid credentials" } },
  };

  axiosInstance.post.mockRejectedValue(mockError);

  await login(userData);

  expect(showNotification).toHaveBeenCalledWith(
    "Login failed: Invalid credentials",
    "error"
  );
});

// Unit test for register
it("should register successfully and return new user data", async () => {
  const userData = { name: "John Doe", email: "john@example.com", password: "password" };
  const mockResponse = { data: { id: 1, name: "John Doe" } };

  axiosInstance.post.mockResolvedValue(mockResponse);

  const result = await register(userData);
  expect(result).toEqual(mockResponse.data);
  expect(axiosInstance.post).toHaveBeenCalledWith(REGISTER_URL, userData);
});

it("should show notification on registration failure", async () => {
  const mockError = new Error("Registration failed");
  axiosInstance.post.mockRejectedValue(mockError);

  await register({});

  expect(showNotification).toHaveBeenCalledWith(mockError.message, "error");
});

// Unit test for checkUsernameAvailability
it("should return true if username is available", async () => {
  const mockResponse = { data: { isUnique: true } };

  axiosInstance.post.mockResolvedValue(mockResponse);

  const result = await checkUsernameAvailability("newUser");
  expect(result).toBe(true);
  expect(axiosInstance.post).toHaveBeenCalledWith(CHECK_USERNAME_URL, {
    userName: "newUser",
  });
});

it("should return false if username is taken", async () => {
  const mockResponse = { data: { isUnique: false } };

  axiosInstance.post.mockResolvedValue(mockResponse);

  const result = await checkUsernameAvailability("takenUser");
  expect(result).toBe(false);
});

// Unit test for checkValidToken
it("should validate token and return data", async () => {
  const mockResponse = { data: { valid: true } };
  const token = 'testToken';
  axiosInstance.get.mockResolvedValue(mockResponse);

  const result = await checkValidToken(token);
  expect(result).toEqual(mockResponse.data);
  expect(axiosInstance.get).toHaveBeenCalledWith(CHECK_VALID_TOKEN(token));
});

it("should show notification on invalid token", async () => {
  const mockError = new Error("Token is invalid");

  axiosInstance.get.mockRejectedValue(mockError);

  await checkValidToken("invalidToken");

  expect(showNotification).toHaveBeenCalledWith(mockError.message, "error");
});

// Unit test for resendMail
it("should resend verification email", async () => {
  const mockResponse = { data: { success: true } };

  axiosInstance.post.mockResolvedValue(mockResponse);

  const result = await resendMail();
  expect(result).toEqual(mockResponse.data);
  expect(axiosInstance.post).toHaveBeenCalledWith(RESEND_EMAIL);
});

it("should show notification on resend email failure", async () => {
  const mockError = new Error("Failed to resend email");

  axiosInstance.post.mockRejectedValue(mockError);

  await resendMail();

  expect(showNotification).toHaveBeenCalledWith(mockError.message, "error");
});
});
