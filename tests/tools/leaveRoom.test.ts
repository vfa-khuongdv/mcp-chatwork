import { jest } from '@jest/globals';

// Set environment variables BEFORE importing
process.env.CHATWORK_API_TOKEN = "test-token-leave";

// Mock ChatworkClient BEFORE importing
jest.mock("../../src/api/client");

import { leaveRoomTool } from "../../src/tools/leaveRoom";
import { ChatworkClient } from "../../src/api/client";

const MockChatworkClient = ChatworkClient as jest.MockedClass<typeof ChatworkClient>;

describe("leaveRoomTool", () => {
    let mockClient: jest.Mocked<ChatworkClient>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockClient = new MockChatworkClient() as jest.Mocked<ChatworkClient>;
    });

    it("should leave room successfully", async () => {
        mockClient.leaveRoom.mockResolvedValue({ action_id: 1, score: 0 });

        const result = await leaveRoomTool.executor(mockClient, { room_id: 123 });

        expect(mockClient.leaveRoom).toHaveBeenCalledWith(123);
        expect(result).toEqual({
            content: [
                {
                    type: "text",
                    text: "Left room 123 successfully.",
                },
            ],
        });
    });

    it("should handle errors", async () => {
        const error = new Error("Something went wrong");
        mockClient.leaveRoom.mockRejectedValue(error);

        const result = await leaveRoomTool.executor(mockClient, { room_id: 123 });

        expect(mockClient.leaveRoom).toHaveBeenCalledWith(123);
        expect(result).toEqual({
            content: [
                {
                    type: "text",
                    text: "Failed to leave room: Something went wrong",
                },
            ],
            isError: true,
        });
    });
});
