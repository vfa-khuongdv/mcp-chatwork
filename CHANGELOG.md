# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-01-09

### Added

- Initial release of MCP Chatwork Server.
- Implemented `ChatworkClient` for API interactions.
- Added MCP tools:
  - `list_rooms`: List available Chatwork rooms.
  - `list_messages`: Read messages from a room.
  - `send_message`: Send a message to a room.
  - `create_task`: Create a task in a room.
  - `complete_task`: Mark a task as completed.
  - `get_my_tasks`: Retrieve assigned tasks.
  - `get_room_members`: List members of a room.
- Added unit tests with Jest.
- Configured TypeScript and basic project structure.
