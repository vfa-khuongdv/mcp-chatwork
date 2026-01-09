import { z } from "zod";
import { ChatworkClient } from "../api/client.js";
import { SendMessageSchema } from "../schemas/messages.js";

export const sendMessageTool = {
  name: "send_message",
  description: "Allows the agent to send messages to a room.",
  schema: SendMessageSchema,
  executor: async (client: ChatworkClient, args: z.infer<typeof SendMessageSchema>) => {
    const result = await client.sendMessage(args.room_id, args.body);
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
