import { ChatworkClient } from "../api/client.js";
import { CompleteTaskSchema } from "../schemas/tasks.js";
import { z } from "zod";

export const completeTaskTool = {
  name: "complete_task",
  description: "Mark a task as done.",
  schema: CompleteTaskSchema,
  executor: async (client: ChatworkClient, args: z.infer<typeof CompleteTaskSchema>) => {
    const { room_id, task_id } = args;
    try {
      const result = await client.updateTaskStatus(room_id, task_id, "done");
      return {
        content: [
          {
            type: "text" as const,
            text: `Task ${result.task_id} marked as done in room ${room_id}.`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Failed to complete task: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      };
    }
  },
};
