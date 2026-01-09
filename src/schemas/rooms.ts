import { z } from "zod";

export const ListRoomsSchema = z.object({});

export const LeaveRoomSchema = z.object({
  room_id: z.number().describe("The unique identifier of the Chatwork room to leave."),
});
