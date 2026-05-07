+++
title = "MCP Support"
template = "docs.html"
+++

# Model Context Protocol (MCP)

Boxxy Terminal natively supports the **Model Context Protocol (MCP)**, an open standard that allows you to connect your characters to external tools, databases, and APIs.

With MCP, you can give =BoxxyClaw= access to:
- Live, version-specific documentation (e.g., Context7)
- Your local file system or Git repositories
- External APIs (e.g., Slack, Jira, GitHub)
- Custom scripts or internal company tools

---

## Adding an MCP Server

To add a new MCP server:
1. Open Boxxy =Preferences= (`Ctrl+,`).
2. Navigate to the =MCP= tab on the left sidebar.
3. Click **Add MCP Server...**.

You will be presented with a configuration dialog where you can define your server's connection details. Boxxy supports two transport methods:

### 1. Stdio (Local Commands)
Use this for tools that run locally on your machine, such as Node.js packages or native binaries.

*   **Name:** A recognizable name for your server (e.g., `GitHub Local`).
*   **Transport:** Select `Stdio (Command)`.
*   **Command:** The executable to run (e.g., `npx`, `python`, or a path like `/usr/local/bin/my-tool`).
*   **Args:** Comma-separated arguments to pass to the command (e.g., `-y, @modelcontextprotocol/server-github`).
*   **Env (KEY=VAL,...):** Comma-separated environment variables required by the tool (e.g., `GITHUB_PERSONAL_ACCESS_TOKEN=your_token_here`).

---

### 2. HTTP Streamable (Remote Servers)
Use this for modern, cloud-hosted MCP servers that support high-concurrency streaming.

*   **Name:** A recognizable name for your server (e.g., `Context7 Docs`).
*   **Transport:** Select `HTTP (Streamable)`.
*   **URL:** The full endpoint URL (e.g., `https://mcp.context7.com/mcp`).
*   **Headers (KEY=VAL,...):** Comma-separated HTTP headers, typically used for authentication (e.g., `Authorization=Bearer YOUR_API_KEY_HERE`).

---

## Managing Your Servers

Once added, your servers will appear in the MCP list in Preferences. 

- **Toggle:** You can quickly enable or disable a server using the switch next to its name.
- **Edit:** Click the pencil icon to modify the command, arguments, or API keys without having to delete and recreate the server.
- **Delete:** Click the trash icon to permanently remove the server configuration.

---

## How it Works (Under the Hood)

Boxxy is designed to be blazingly fast. To ensure your terminal boots instantly, Boxxy uses a **"Lazy Boot"** strategy for MCP servers. 

When you add a server, Boxxy fetches its list of available tools and caches them. When you open a new terminal pane, the character immediately knows what tools are available, *but it doesn't actually start the background processes (like `npx`) until you ask it to use one of those tools.* 

This means you can configure dozens of heavy MCP servers without experiencing any startup lag! Furthermore, Boxxy implements strict lifecycle management, guaranteeing that when you close a pane or exit the app, all local MCP child processes are instantly terminated to prevent "zombie" processes from lingering on your system.
