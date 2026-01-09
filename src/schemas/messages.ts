import { z } from "zod";

export const ListMessagesSchema = z.object({
  room_id: z.number().describe("The unique identifier of the Chatwork room."),
  force: z.boolean().optional().default(false).describe("If true, retrieves the latest 100 messages regardless of read status."),
});

export const SendMessageSchema = z.object({
  room_id: z.number().describe("The unique identifier of the Chatwork room."),
  body: z.string().describe("The message content to send."),
});

export const DeleteMessageSchema = z.object({
  room_id: z.number().describe("The unique identifier of the Chatwork room."),
  message_id: z.string().describe("The unique identifier of the message to delete."),
});
