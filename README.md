# CLI Chat Application

This is a simple CLI-based chat application that allows users to create chat rooms and join existing ones. The application is built using Node.js, Express, and Socket.io.

## Features

- Create a new chat room with a unique ID.
- Join an existing chat room using the room ID.
- Send and receive real-time messages.
- Notify users when someone joins or leaves the chat.

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or higher)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/cli-chat-app.git
   cd cli-chat-app
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```


## Running the Application

### Running Locally

1. Start the server:

   ```sh
   node server.js
   ```

2. In a separate terminal, start the client:

   ```sh
   node client.js
   ```

## Usage

1. Run the client script:

   ```sh
   node client.js
   ```

2. Select an option:
   - Enter `1` to join an existing chat room.
   - Enter `2` to create a new chat room.

3. Follow the prompts to enter the room ID (if joining a chat) and your username.

4. Start chatting! Type your messages and press Enter to send them.

## Project Structure

```
cli-chat-app/
├── client.js
├── server.js
├── package.json
├── package-lock.json
└── .gitignore
```

- `client.js`: The CLI client script for joining and creating chat rooms.
- `server.js`: The server script handling Socket.io connections and message broadcasting.
- `package.json`: The project’s package file.
- `package-lock.json`: The lockfile generated by npm.
