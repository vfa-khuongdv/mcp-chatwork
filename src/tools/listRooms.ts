import { ChatworkClient } from "../api/client.js";
import { ListRoomsSchema } from "../schemas/rooms.js";

export const listRoomsTool = {
  name: "list_rooms",
  description: "Retrieves a list of Chatwork rooms the user belongs to.",
  schema: ListRoomsSchema,
  executor: async (client: ChatworkClient) => {
    const rooms = await client.listRooms();
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(rooms, null, 2),
        },
      ],
    };
  },
};
