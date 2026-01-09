import { z } from "zod";

export const CreateTaskSchema = z.object({
  room_id: z.number().describe("The unique identifier of the Chatwork room."),
  body: z.string().describe("Task description/body."),
  to_ids: z.array(z.number()).describe("Array of account IDs to assign the task to."),
  limit: z.number().optional().describe("Task due date (Unix timestamp)."),
});

export const GetMyTasksSchema = z.object({
  assigned_by_account_id: z.number().optional().describe("Filter by the account ID who assigned the task."),
  status: z.enum(["open", "done"]).optional().default("open").describe("Task status (open or done)."),
});

export const CompleteTaskSchema = z.object({
  room_id: z.number().describe("The unique identifier of the Chatwork room."),
  task_id: z.number().describe("The unique identifier of the task."),
});
