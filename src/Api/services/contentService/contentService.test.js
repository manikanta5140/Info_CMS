import {
    getAllContent,
    getContentBySlug,
    storeContentHistory,
    getContentHistory,
    getContentById,
    updateContentHistory,
  } from "./contentService";
  import axiosInstance from "../../axiosInstance";
  import { showNotification } from "../../../Components/notification/Notification.jsx";
  import { describe, it, expect, vi, afterEach } from "vitest";
  import {
    GET_CATEGORY_LIST,
    GET_CATEGORY_BY_SLUG,
    STORE_CONTENT_HISTORY,
    GET_CONTENT_HISTORY,
    GET_CONTENT_BY_ID,
    UPDATE_CONTENT_HISTORY,
  } from "../../../constants/apiURL";
  
  vi.mock("../../axiosInstance");
  vi.mock("../../../Components/notification/Notification.jsx", () => ({
    showNotification: vi.fn(),
  }));
  
  describe("Content Service", () => {
    afterEach(() => {
      vi.clearAllMocks();
    });
  
    // Test for getAllContent
    it("should fetch all content successfully", async () => {
      const mockResponse = { data: [{ id: 1, name: "Category 1" }] };
      axiosInstance.get.mockResolvedValue(mockResponse);
  
      const result = await getAllContent();
      expect(result).toEqual(mockResponse.data);
      expect(axiosInstance.get).toHaveBeenCalledWith(GET_CATEGORY_LIST);
    });
  
    it("should show notification on fetch all content failure", async () => {
      const mockError = new Error("Failed to fetch categories");
      axiosInstance.get.mockRejectedValue(mockError);
  
      await getAllContent();
  
      expect(showNotification).toHaveBeenCalledWith(mockError.message, "error");
    });
  
    // Test for getContentBySlug
    it("should fetch content by slug successfully", async () => {
      const slug = "category-slug";
      const mockResponse = { data: { id: 1, name: "Category 1" } };
      axiosInstance.get.mockResolvedValue(mockResponse);
  
      const result = await getContentBySlug(slug);
      expect(result).toEqual(mockResponse.data);
      expect(axiosInstance.get).toHaveBeenCalledWith(GET_CATEGORY_BY_SLUG(slug));
    });
  
    it("should show notification on fetch content by slug failure", async () => {
      const slug = "category-slug";
      const mockError = new Error("Failed to fetch content by slug");
      axiosInstance.get.mockRejectedValue(mockError);
  
      await getContentBySlug(slug);
  
      expect(showNotification).toHaveBeenCalledWith(mockError.message, "error");
    });
  
    // Test for storeContentHistory
    it("should store content history successfully", async () => {
      const contentData = { title: "New Post", content: "Post content" };
      const mockResponse = { data: { id: 1, ...contentData } };
      axiosInstance.post.mockResolvedValue(mockResponse);
  
      const result = await storeContentHistory(contentData);
      expect(result).toEqual(mockResponse.data);
      expect(axiosInstance.post).toHaveBeenCalledWith(STORE_CONTENT_HISTORY, contentData);
    });
  
    it("should show notification on store content history failure", async () => {
      const contentData = { title: "New Post", content: "Post content" };
      const mockError = new Error("Failed to store content history");
      axiosInstance.post.mockRejectedValue(mockError);
  
      await storeContentHistory(contentData);
  
      expect(showNotification).toHaveBeenCalledWith(mockError.message, "error");
    });
  
    // Test for getContentHistory
    it("should fetch content history successfully", async () => {
      const mockResponse = { data: [{ id: 1, title: "Post 1" }] };
      axiosInstance.get.mockResolvedValue(mockResponse);
  
      const result = await getContentHistory();
      expect(result).toEqual(mockResponse.data);
      expect(axiosInstance.get).toHaveBeenCalledWith(GET_CONTENT_HISTORY);
    });
  
    it("should show notification on fetch content history failure", async () => {
      const mockError = new Error("Failed to fetch content history");
      axiosInstance.get.mockRejectedValue(mockError);
  
      await getContentHistory();
  
      expect(showNotification).toHaveBeenCalledWith(mockError.message, "error");
    });
  
    // Test for getContentById
    it("should fetch content by ID successfully", async () => {
      const id = 1;
      const mockResponse = { data: { id, title: "Post 1" } };
      axiosInstance.get.mockResolvedValue(mockResponse);
  
      const result = await getContentById(id);
      expect(result).toEqual(mockResponse.data);
      expect(axiosInstance.get).toHaveBeenCalledWith(GET_CONTENT_BY_ID(id));
    });
  
    it("should show notification on fetch content by ID failure", async () => {
      const id = 1;
      const mockError = new Error("Failed to fetch content by ID");
      axiosInstance.get.mockRejectedValue(mockError);
  
      await getContentById(id);
  
      expect(showNotification).toHaveBeenCalledWith(mockError.message, "error");
    });
  
    // Test for updateContentHistory
    it("should update content history successfully", async () => {
      const id = 1;
      const updatedContentData = { title: "Updated Post", content: "Updated content" };
      const mockResponse = { data: { id, ...updatedContentData } };
      axiosInstance.patch.mockResolvedValue(mockResponse);
  
      const result = await updateContentHistory(id, updatedContentData);
      expect(result).toEqual(mockResponse.data);
      expect(axiosInstance.patch).toHaveBeenCalledWith(UPDATE_CONTENT_HISTORY(id), updatedContentData);
    });
  
    it("should show notification on update content history failure", async () => {
      const id = 1;
      const updatedContentData = { title: "Updated Post", content: "Updated content" };
      const mockError = new Error("Failed to update content history");
      axiosInstance.patch.mockRejectedValue(mockError);
  
      await updateContentHistory(id, updatedContentData);
  
      expect(showNotification).toHaveBeenCalledWith(mockError.message, "error");
    });
  });
  