import axios, { AxiosInstance } from "axios";
import { config, validateConfig } from "../config.js";
import { ChatworkRoom, ChatworkMessage, ChatworkMember, ChatworkTask } from "./types.js";

export class ChatworkClient {
  private client: AxiosInstance;

  constructor() {
    validateConfig();
    this.client = axios.create({
      baseURL: "https://api.chatwork.com/v2",
      headers: {
        "X-ChatWorkToken": config.chatworkApiToken,
      },
    });
  }

  async listRooms(): Promise<ChatworkRoom[]> {
    try {
      const response = await this.client.get<ChatworkRoom[]>("/rooms");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Chatwork API Error: ${error.message} - ${JSON.stringify(error.response?.data)}`);
      }
      throw error;
    }
  }

  async listMessages(roomId: number, force: boolean = false): Promise<ChatworkMessage[]> {
    try {
      const response = await this.client.get<ChatworkMessage[]>(
        `/rooms/${roomId}/messages`,
        {
          params: { force: force ? 1 : 0 },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Chatwork API Error (Room ${roomId}): ${error.message} - ${JSON.stringify(error.response?.data)}`);
      }
      throw error;
    }
  }

  async sendMessage(roomId: number, body: string): Promise<{ message_id: string }> {
    try {
      const response = await this.client.post<{ message_id: string }>(
        `/rooms/${roomId}/messages`,
        new URLSearchParams({ body })
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Chatwork API Error (Send Message Room ${roomId}): ${error.message} - ${JSON.stringify(error.response?.data)}`);
      }
      throw error;
    }
  }

  async getRoomMembers(roomId: number): Promise<ChatworkMember[]> {
    try {
      const response = await this.client.get<ChatworkMember[]>(`/rooms/${roomId}/members`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Chatwork API Error (Get Members Room ${roomId}): ${error.message} - ${JSON.stringify(error.response?.data)}`);
      }
      throw error;
    }
  }

  async createTask(roomId: number, body: string, toIds: number[], limit?: number): Promise<{ task_ids: number[] }> {
    try {
      const params = new URLSearchParams();
      params.append("body", body);
      params.append("to_ids", toIds.join(","));
      if (limit) {
        params.append("limit", limit.toString());
      }

      const response = await this.client.post<{ task_ids: number[] }>(
        `/rooms/${roomId}/tasks`,
        params
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Chatwork API Error (Create Task Room ${roomId}): ${error.message} - ${JSON.stringify(error.response?.data)}`);
      }
      throw error;
    }
  }

  async getMyTasks(assignedByAccountId?: number, status: "open" | "done" = "open"): Promise<ChatworkTask[]> {
    try {
      const params: any = { status };
      if (assignedByAccountId) {
        params.assigned_by_account_id = assignedByAccountId;
      }

      const response = await this.client.get<ChatworkTask[]>("/my/tasks", { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Chatwork API Error (Get My Tasks): ${error.message} - ${JSON.stringify(error.response?.data)}`);
      }
      throw error;
    }
  }

  async deleteMessage(roomId: number, messageId: string): Promise<{ message_id: string }> {
    try {
      const response = await this.client.delete<{ message_id: string }>(
        `/rooms/${roomId}/messages/${messageId}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Chatwork API Error (Delete Message Room ${roomId}): ${error.message} - ${JSON.stringify(error.response?.data)}`);
      }
      throw error;
    }
  }

  async updateTaskStatus(roomId: number, taskId: number, status: "open" | "done" | "limit"): Promise<{ task_id: number }> {
    try {
      const response = await this.client.put<{ task_id: number }>(
        `/rooms/${roomId}/tasks/${taskId}/status`,
        new URLSearchParams({ body: status })
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Chatwork API Error (Update Task Status Room ${roomId}): ${error.message} - ${JSON.stringify(error.response?.data)}`);
      }
      throw error;
    }
  }
  async leaveRoom(roomId: number): Promise<{ action_id: number, score: number }> {
    try {
      const response = await this.client.delete<{ action_id: number, score: number }>(
        `/rooms/${roomId}`,
        {
          data: new URLSearchParams({ action_type: "leave" }),
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Chatwork API Error (Leave Room ${roomId}): ${error.message} - ${JSON.stringify(error.response?.data)}`);
      }
      throw error;
    }
  }
}
