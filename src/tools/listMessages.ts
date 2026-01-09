import { z } from "zod";
import { ChatworkClient } from "../api/client.js";
import { ListMessagesSchema } from "../schemas/messages.js";

export const listMessagesTool = {
  name: "list_messages",
  description: "Retrieves the list of messages for a specified room.",
  schema: ListMessagesSchema,
  executor: async (client: ChatworkClient, args: z.infer<typeof ListMessagesSchema>) => {    
    const messages = await client.listMessages(args.room_id, args.force);
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(messages, null, 2),
        },
      ],
    };
  },
};
