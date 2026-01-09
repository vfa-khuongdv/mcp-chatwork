# MCP Chatwork Server

[![npm version](https://badge.fury.io/js/@duongkhuong%2Fmcp-chatwork.svg)](https://www.npmjs.com/package/@duongkhuong/mcp-chatwork)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is a Model Context Protocol (MCP) server for [Chatwork](https://www.chatwork.com/). It allows AI agents to read context from Chatwork rooms and messages.

## Features

- **List Rooms**: Retrieve a list of rooms the user is participating in.
- **List Messages**: Fetch messages from a specific room.
- **Send Message**: Send a message to a specific room.
- **Get Room Members**: Get the list of members in a room.
- **Create Task**: Create a task in a room.
- **Get My Tasks**: Get the list of tasks assigned to the current bot account.
- **Delete Message**: Delete a message from a room.
- **Complete Task**: Mark a task as done.
- **Leave Room**: Leave a room.

## Prerequisites

- Node.js (v18 or higher)
- A Chatwork API Token

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:vfa-khuongdv/mcp-chatwork.git
   cd mcp-chatwork
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the server:
   ```bash
   npm run build
   ```

## Configuration

The server requires the `CHATWORK_API_TOKEN` environment variable to be set.

## Usage

### With Claude Desktop (or other MCP Clients)

Add the following configuration to your MCP client settings (e.g., `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "chatwork": {
      "command": "node",
      "args": ["/path/to/mcp-chatwork/dist/index.js"],
      "env": {
        "CHATWORK_API_TOKEN": "your_chatwork_api_token"
      }
    }
  }
}
```

or

```json
{
  "mcpServers": {
    "chatwork": {
      "command": "npx",
      "args": ["-y", "@duongkhuong/mcp-chatwork"],
      "env": {
        "CHATWORK_API_TOKEN": "your_chatwork_api_token"
      }
    }
  }
}
```

### Manual Testing

You can run the server directly via stdio (though it is designed to communicate with an MCP client):

```bash
export CHATWORK_API_TOKEN="your_token"
npm start
```

## Tools

### `list_rooms`
Returns a list of rooms with details like room ID, name, unread count, etc.

### `list_messages`
Returns messages for a given room.
- Arguments:
  - `room_id` (number): The ID of the room.
  - `force` (boolean): If `true`, fetches the latest 100 messages regardless of read status.

### `send_message`
Allows the agent to send messages to a room.
- Arguments:
  - `room_id` (number): The ID of the room.
  - `body` (string): The message content.

### `get_room_members`
Get the list of members in a room.
- Arguments:
  - `room_id` (number): The ID of the room.

### `create_task`
Assign a task to a user in a Chatwork room.
- Arguments:
  - `room_id` (number): The ID of the room.
  - `body` (string): The task description.
  - `to_ids` (array of numbers): List of user IDs to assign the task to.
  - `limit` (string, optional): Due date in unix time or "YYYY-MM-DD" format.

### `get_my_tasks`
List tasks assigned to the current bot account.
- Arguments:
  - `assigned_by_account_id` (number, optional): Filter by user ID who assigned the task.
  - `status` (string, optional): Task status ("open", "done"). Defaults to "open".

### `delete_message`
Delete a message from a room.
- Arguments:
  - `room_id` (number): The ID of the room.
  - `message_id` (string): The ID of the message to delete.

### `complete_task`
Mark a task as done.
- Arguments:
  - `room_id` (number): The ID of the room.
  - `task_id` (string): The ID of the task.

### `leave_room`
Leave a room.
- Arguments:
  - `room_id` (number): The ID of the room.

## License

MIT
