
import { ChatworkClient } from "../../src/api/client";
import { completeTaskTool } from "../../src/tools/completeTask";
import { createTaskTool } from "../../src/tools/createTask";
import { deleteMessageTool } from "../../src/tools/deleteMessage";
import { getMyTasksTool } from "../../src/tools/getMyTasks";
import { getRoomMembersTool } from "../../src/tools/getRoomMembers";
import { listMessagesTool } from "../../src/tools/listMessages";
import { listRoomsTool } from "../../src/tools/listRooms";
import { sendMessageTool } from "../../src/tools/sendMessage";

// Mock ChatworkClient
jest.mock("../../src/api/client");
const MockChatworkClient = ChatworkClient as jest.MockedClass<typeof ChatworkClient>;

describe("Chatwork Tools", () => {
    let mockClient: jest.Mocked<ChatworkClient>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockClient = new MockChatworkClient() as jest.Mocked<ChatworkClient>;
    });

    describe("completeTask", () => {
        it("should complete a task", async () => {
            mockClient.updateTaskStatus.mockResolvedValue({ task_id: 101 });
            const result = await completeTaskTool.executor(mockClient, { room_id: 123, task_id: 101 });
            expect(mockClient.updateTaskStatus).toHaveBeenCalledWith(123, 101, "done");
            expect(result.content[0].text).toContain("101");
        });

        // completeTask DOES handle errors
        it("should handle error", async () => {
            mockClient.updateTaskStatus.mockRejectedValue(new Error("Fail"));
            const result = await completeTaskTool.executor(mockClient, { room_id: 123, task_id: 101 });
            expect((result as any).isError).toBe(true);
        });
    });

    describe("createTask", () => {
        it("should create a task", async () => {
            mockClient.createTask.mockResolvedValue({ task_ids: [101] });
            const result = await createTaskTool.executor(mockClient, { room_id: 123, body: "Task", to_ids: [456] });
            expect(mockClient.createTask).toHaveBeenCalledWith(123, "Task", [456], undefined);
            expect(result.content[0].text).toContain("101");
        });
       
        // createTask does NOT handle errors
         it("should handle error", async () => {
            mockClient.createTask.mockRejectedValue(new Error("Fail"));
            await expect(createTaskTool.executor(mockClient, { room_id: 123, body: "Task", to_ids: [456] })).rejects.toThrow("Fail");
        });
    });

    describe("deleteMessage", () => {
        it("should delete a message", async () => {
            mockClient.deleteMessage.mockResolvedValue({ message_id: "msg123" });
            const result = await deleteMessageTool.executor(mockClient, { room_id: 123, message_id: "msg123" });
            expect(mockClient.deleteMessage).toHaveBeenCalledWith(123, "msg123");
            expect(result.content[0].text).toContain("msg123");
        });

        // deleteMessage DOES handle errors
         it("should handle error", async () => {
            mockClient.deleteMessage.mockRejectedValue(new Error("Fail"));
            const result = await deleteMessageTool.executor(mockClient, { room_id: 123, message_id: "msg123" });
            expect((result as any).isError).toBe(true);
        });
    });

    describe("getMyTasks", () => {
        it("should get my tasks", async () => {
            mockClient.getMyTasks.mockResolvedValue([{ task_id: 101, body: "Task" } as any]);
            const result = await getMyTasksTool.executor(mockClient, { status: "open" });
            expect(mockClient.getMyTasks).toHaveBeenCalledWith(undefined, "open");
            expect(result.content[0].text).toContain("Task");
        });

        // getMyTasks does NOT handle errors
         it("should handle error", async () => {
            mockClient.getMyTasks.mockRejectedValue(new Error("Fail"));
            await expect(getMyTasksTool.executor(mockClient, { status: "open" })).rejects.toThrow("Fail");
        });
    });

    describe("getRoomMembers", () => {
        it("should get room members", async () => {
            mockClient.getRoomMembers.mockResolvedValue([{ account_id: 1, name: "User" } as any]);
            const result = await getRoomMembersTool.executor(mockClient, { room_id: 123 });
            expect(mockClient.getRoomMembers).toHaveBeenCalledWith(123);
            expect(result.content[0].text).toContain("User");
        });

        // getRoomMembers does NOT handle errors
         it("should handle error", async () => {
            mockClient.getRoomMembers.mockRejectedValue(new Error("Fail"));
            await expect(getRoomMembersTool.executor(mockClient, { room_id: 123 })).rejects.toThrow("Fail");
        });
    });

    describe("listMessages", () => {
        it("should list messages", async () => {
            mockClient.listMessages.mockResolvedValue([{ message_id: "1", body: "Msg" } as any]);
            const result = await listMessagesTool.executor(mockClient, { room_id: 123, force: false });
            expect(mockClient.listMessages).toHaveBeenCalledWith(123, false);
            expect(result.content[0].text).toContain("Msg");
        });

        // listMessages does NOT handle errors
         it("should handle error", async () => {
            mockClient.listMessages.mockRejectedValue(new Error("Fail"));
            await expect(listMessagesTool.executor(mockClient, { room_id: 123, force: false })).rejects.toThrow("Fail");
        });
    });

    describe("listRooms", () => {
        it("should list rooms", async () => {
            mockClient.listRooms.mockResolvedValue([{ room_id: 1, name: "Room" } as any]);
            const result = await listRoomsTool.executor(mockClient);
            expect(mockClient.listRooms).toHaveBeenCalled();
            expect(result.content[0].text).toContain("Room");
        });

        // listRooms does NOT handle errors
         it("should handle error", async () => {
            mockClient.listRooms.mockRejectedValue(new Error("Fail"));
            await expect(listRoomsTool.executor(mockClient)).rejects.toThrow("Fail");
        });
    });

    describe("sendMessage", () => {
        it("should send a message", async () => {
            mockClient.sendMessage.mockResolvedValue({ message_id: "msg1" });
            const result = await sendMessageTool.executor(mockClient, { room_id: 123, body: "Hello" });
            expect(mockClient.sendMessage).toHaveBeenCalledWith(123, "Hello");
            expect(result.content[0].text).toContain("msg1");
        });

        // sendMessage does NOT handle errors
         it("should handle error", async () => {
            mockClient.sendMessage.mockRejectedValue(new Error("Fail"));
            await expect(sendMessageTool.executor(mockClient, { room_id: 123, body: "Hello" })).rejects.toThrow("Fail");
        });
    });
});
