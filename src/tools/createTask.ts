import { z } from "zod";
import { ChatworkClient } from "../api/client.js";
import { CreateTaskSchema } from "../schemas/tasks.js";

export const createTaskTool = {
  name: "create_task",
  description: "Assign a task to a user in a Chatwork room.",
  schema: CreateTaskSchema,
  executor: async (client: ChatworkClient, args: z.infer<typeof CreateTaskSchema>) => {
    const result = await client.createTask(args.room_id, args.body, args.to_ids, args.limit);
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  },
};
