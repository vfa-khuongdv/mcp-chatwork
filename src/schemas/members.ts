import { z } from "zod";

export const GetRoomMembersSchema = z.object({
  room_id: z.number().describe("The unique identifier of the Chatwork room."),
});
