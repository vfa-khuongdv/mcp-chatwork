import { ChatworkClient } from "../api/client.js";
import { DeleteMessageSchema } from "../schemas/messages.js";
import { z } from "zod";

export const deleteMessageTool = {
  name: "delete_message",
  description: "Delete a message from a room.",
  schema: DeleteMessageSchema,
  executor: async (client: ChatworkClient, args: z.infer<typeof DeleteMessageSchema>) => {
    const { room_id, message_id } = args;
    try {
      const result = await client.deleteMessage(room_id, message_id);
      return {
        content: [
          {
            type: "text" as const,
            text: `Message ${result.message_id} deleted successfully from room ${room_id}.`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Failed to delete message: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      };
    }
  },
};
