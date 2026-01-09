import { z } from "zod";
import { ChatworkClient } from "../api/client.js";
import { GetMyTasksSchema } from "../schemas/tasks.js";

export const getMyTasksTool = {
  name: "get_my_tasks",
  description: "List tasks assigned to the current bot account.",
  schema: GetMyTasksSchema,
  executor: async (client: ChatworkClient, args: z.infer<typeof GetMyTasksSchema>) => {
    const tasks = await client.getMyTasks(args.assigned_by_account_id, args.status);
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(tasks, null, 2),
        },
      ],
    };
  },
};
