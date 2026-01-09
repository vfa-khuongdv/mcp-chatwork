import { ChatworkClient } from "../api/client.js";
import { LeaveRoomSchema } from "../schemas/rooms.js";
import { z } from "zod";

export const leaveRoomTool = {
  name: "leave_room",
  description: "Leave a room.",
  schema: LeaveRoomSchema,
  executor: async (client: ChatworkClient, args: z.infer<typeof LeaveRoomSchema>) => {
    const { room_id } = args;
    try {
      await client.leaveRoom(room_id);
      return {
        content: [
          {
            type: "text" as const,
            text: `Left room ${room_id} successfully.`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Failed to leave room: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      };
    }
  },
};
