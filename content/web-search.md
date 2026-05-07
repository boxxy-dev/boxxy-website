+++
title = "Web Search"
template = "docs.html"
+++

# Web Search

Boxxy Terminal features integrated real-time web search, allowing your characters to browse the internet to find documentation, troubleshoot errors, or gather up-to-date information directly from the terminal.

## Supported Search Engines

Currently, Boxxy supports **Tavily** as the primary search provider. Tavily is specifically optimized for LLMs, providing clean, search-engine-optimized content that helps characters generate more accurate responses.

---

## Setting Up Web Search

To enable web search capability:

1.  **Get an API Key:** Sign up at [Tavily](https://tavily.com/) to get your free or pro API key.
2.  **Configure in Boxxy:**
    *   Open Boxxy =Preferences= (`Ctrl+,`).
    *   Navigate to the =APIs= tab on the left sidebar.
    *   Find the **Search Engines** section.
    *   Enter your key in the **Tavily API Key** field.
3.  **Enable the Tool:**
    *   Switch to the =Characters= tab in Preferences.
    *   Under **Character Toolbox**, ensure **Enable Web Search** is toggled **ON**.

---

## Using Web Search

Web search is a powerful tool in your character's toolbox. You can use it in two ways:

### 1. Manual Activation (Per Character)
You can toggle web search on or off for a specific character conversation without changing your global settings.
*   Open the =Claw Message Bar= (`Ctrl+/`).
*   Click the **Globe Icon** in the message bar toolbar to toggle web search for that character's session.

### 2. Automatic Search
If enabled, your character will automatically decide to use the web whenever it needs information it doesn't have—for example, if you ask about a library released yesterday or a specific error code from a cloud provider.

> **Example Prompt:** "Search the web for the latest breaking changes in React 19 and summarize them."

---

## Security & Control

*   **Master Switch:** You can globally disable the web search capability in the =Characters= preferences tab.
*   **Approval Protocol:** By default, your character will describe their intent to search before performing the action, keeping you in control of what data is being sent to search providers.
*   **Privacy:** Boxxy only sends the search query to the provider; your local terminal history and file contents are never shared with search engines unless explicitly requested.
