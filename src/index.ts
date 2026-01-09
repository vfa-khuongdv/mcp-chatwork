import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ChatworkClient } from "./api/client.js";
import {
  listRoomsTool,
  listMessagesTool,
  sendMessageTool,
  getRoomMembersTool,
  createTaskTool,
  getMyTasksTool,
  deleteMessageTool,
  completeTaskTool,
  leaveRoomTool,
} from "./tools/index.js";

async function main() {
  const client = new ChatworkClient();
  const server = new McpServer({
    name: "mcp-chatwork",
    version: "1.0.0",
  });

  server.tool(
    listRoomsTool.name,
    listRoomsTool.description,
    listRoomsTool.schema.shape,
    async (_args) => {
      // @ts-ignore
      return listRoomsTool.executor(client);
    }
  );

  server.tool(
    listMessagesTool.name,
    listMessagesTool.description,
    listMessagesTool.schema.shape,
    async (args) => {
      // @ts-ignore
      return listMessagesTool.executor(client, args);
    }
  );

  server.tool(
    sendMessageTool.name,
    sendMessageTool.description,
    sendMessageTool.schema.shape,
    async (args) => {
      // @ts-ignore
      return sendMessageTool.executor(client, args);
    }
  );

  server.tool(
    getRoomMembersTool.name,
    getRoomMembersTool.description,
    getRoomMembersTool.schema.shape,
    async (args) => {
      // @ts-ignore
      return getRoomMembersTool.executor(client, args);
    }
  );

  server.tool(
    createTaskTool.name,
    createTaskTool.description,
    createTaskTool.schema.shape,
    async (args) => {
      // @ts-ignore
      return createTaskTool.executor(client, args);
    }
  );

  server.tool(
    getMyTasksTool.name,
    getMyTasksTool.description,
    getMyTasksTool.schema.shape,
    async (args) => {
      // @ts-ignore
      return getMyTasksTool.executor(client, args);
    }
  );

  server.tool(
    deleteMessageTool.name,
    deleteMessageTool.description,
    deleteMessageTool.schema.shape,
    async (args) => {
      // @ts-ignore
      return deleteMessageTool.executor(client, args);
    }
  );

  server.tool(
    completeTaskTool.name,
    completeTaskTool.description,
    completeTaskTool.schema.shape,
    async (args) => {
      // @ts-ignore
      return completeTaskTool.executor(client, args);
    }
  );

  server.tool(
    leaveRoomTool.name,
    leaveRoomTool.description,
    leaveRoomTool.schema.shape,
    async (args) => {
      // @ts-ignore
      return leaveRoomTool.executor(client, args);
    }
  );

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Chatwork MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
