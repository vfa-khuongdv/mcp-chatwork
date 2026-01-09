
import { ChatworkClient } from "../../src/api/client";
import axios from "axios";
import { config, validateConfig } from "../../src/config";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock config
jest.mock("../../src/config", () => ({
  config: {
    chatworkApiToken: "test-token",
  },
  validateConfig: jest.fn(),
}));

describe("ChatworkClient", () => {
  let client: ChatworkClient;
  let mockInstance: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockInstance = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      defaults: { headers: { common: {} } },
      interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } }
    };
    mockedAxios.create.mockReturnValue(mockInstance);
    
    client = new ChatworkClient();
  });

  it("should validate config on instantiation", () => {
    expect(validateConfig).toHaveBeenCalled();
    expect(mockedAxios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: { "X-ChatWorkToken": "test-token" },
      })
    );
  });

  describe("listRooms", () => {
    it("should return a list of rooms", async () => {
      const mockRooms = [{ room_id: 123, name: "Test Room" }];
      mockInstance.get.mockResolvedValue({ data: mockRooms });

      const rooms = await client.listRooms();
      expect(mockInstance.get).toHaveBeenCalledWith("/rooms");
      expect(rooms).toEqual(mockRooms);
    });

    it("should handle errors", async () => {
      const error = new Error("Network Error");
      mockInstance.get.mockRejectedValue(error);

      await expect(client.listRooms()).rejects.toThrow("Network Error");
    });

    it("should handle Axios errors", async () => {
        const error = new Error("API Error");
        (error as any).isAxiosError = true;
        (error as any).response = { data: { errors: ["Bad Request"] } };
        (axios.isAxiosError as unknown as jest.Mock).mockReturnValue(true);
        mockInstance.get.mockRejectedValue(error);
  
        await expect(client.listRooms()).rejects.toThrow("Chatwork API Error");
    });
  });

  describe("listMessages", () => {
      it("should list messages", async () => {
          const mockMessages = [{ message_id: "123", body: "Hello" }];
          mockInstance.get.mockResolvedValue({ data: mockMessages });
  
          const messages = await client.listMessages(123, true);
          expect(mockInstance.get).toHaveBeenCalledWith(
              "/rooms/123/messages",
              { params: { force: 1 } }
          );
          expect(messages).toEqual(mockMessages);
      });
  });

  describe("sendMessage", () => {
    it("should send a message", async () => {
      const responseData = { message_id: "12345" };
      mockInstance.post.mockResolvedValue({ data: responseData });

      const result = await client.sendMessage(123, "Hello");

      expect(mockInstance.post).toHaveBeenCalledWith(
        "/rooms/123/messages",
        expect.any(URLSearchParams)
      );
      expect(result).toEqual(responseData);
    });
    it("should handle Axios errors", async () => {
        const error = new Error("API Error");
        (error as any).isAxiosError = true;
        (error as any).response = { data: { errors: ["Bad Request"] } };
        (axios.isAxiosError as unknown as jest.Mock).mockReturnValue(true);
        mockInstance.post.mockRejectedValue(error);
  
        await expect(client.sendMessage(123, "Hello")).rejects.toThrow("Chatwork API Error");
    });
  });

  describe("getRoomMembers", () => {
      it("should return room members", async () => {
          const mockMembers = [{ account_id: 1, name: "User" }];
          mockInstance.get.mockResolvedValue({ data: mockMembers });
  
          const members = await client.getRoomMembers(123);
          expect(mockInstance.get).toHaveBeenCalledWith("/rooms/123/members");
          expect(members).toEqual(mockMembers);
      });
  });
  
  describe("createTask", () => {
      it("should create a task", async () => {
          const responseData = { task_ids: [101] };
          mockInstance.post.mockResolvedValue({ data: responseData });
  
          const result = await client.createTask(123, "Do this", [456], 1234567890);
          expect(mockInstance.post).toHaveBeenCalledWith(
              "/rooms/123/tasks",
              expect.any(URLSearchParams)
          );
          expect(result).toEqual(responseData);
      });
  });
  
  describe("getMyTasks", () => {
      it("should get my tasks", async () => {
          const mockTasks = [{ task_id: 101, body: "Task" }];
          mockInstance.get.mockResolvedValue({ data: mockTasks });
  
          const tasks = await client.getMyTasks(456, "done");
          expect(mockInstance.get).toHaveBeenCalledWith(
              "/my/tasks",
              { params: { status: "done", assigned_by_account_id: 456 } }
          );
          expect(tasks).toEqual(mockTasks);
      });
  });
  
  describe("deleteMessage", () => {
      it("should delete a message", async () => {
          const responseData = { message_id: "123" };
          mockInstance.delete.mockResolvedValue({ data: responseData });
  
          const result = await client.deleteMessage(123, "msg123");
          expect(mockInstance.delete).toHaveBeenCalledWith("/rooms/123/messages/msg123");
          expect(result).toEqual(responseData);
      });
  });
  
  describe("updateTaskStatus", () => {
      it("should update task status", async () => {
          const responseData = { task_id: 101 };
          mockInstance.put.mockResolvedValue({ data: responseData });
  
          const result = await client.updateTaskStatus(123, 101, "done");
          expect(mockInstance.put).toHaveBeenCalledWith(
              "/rooms/123/tasks/101/status",
              expect.any(URLSearchParams)
          );
          expect(result).toEqual(responseData);
      });
  });

  describe("leaveRoom", () => {
      it("should leave a room", async() => {
          const responseData = { action_id: 123, score: 1 };
          mockInstance.delete.mockResolvedValue({ data: responseData });

          const result = await client.leaveRoom(123);
          
          expect(mockInstance.delete).toHaveBeenCalledWith(
              "/rooms/123",
              expect.objectContaining({
                  data: expect.any(URLSearchParams)
              })
          );
          expect(result).toEqual(responseData);
      })
  })
});
