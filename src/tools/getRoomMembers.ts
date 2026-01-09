import { z } from "zod";
import { ChatworkClient } from "../api/client.js";
import { GetRoomMembersSchema } from "../schemas/members.js";

export const getRoomMembersTool = {
  name: "get_room_members",
  description: "Get the list of members in a room.",
  schema: GetRoomMembersSchema,
  executor: async (client: ChatworkClient, args: z.infer<typeof GetRoomMembersSchema>) => {
    const members = await client.getRoomMembers(args.room_id);
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(members, null, 2),
        },
      ],
    };
  },
};
