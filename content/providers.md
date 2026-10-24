+++
title = "Providers"
template = "docs.html"
aliases = ["models", "web-search"]
+++

# Providers

Boxxy connects to LLM providers via [rig](https://github.com/0xplaygrounds/rig). Boxxy supports **all models** from each provider — automatically configuring thinking levels, context windows, and token pricing.

Configure your API keys or custom endpoints in =Preferences= → =APIs=, then assign models to each role (`AI Chat`, `Claw`, and `Memories & Dreams`) in =Preferences= → =Models Selection= or via the quick links in the =Claw Sidebar=.

---

## AI Model Providers

| Provider | Supported Models | Notes |
| :--- | :--- | :--- |
| **Google Gemini** | All Gemini models | Thinking level controls · Built-in Google Search |
| **Anthropic Claude** | All Claude models | Thinking controls · Built-in Web Search |
| **OpenAI** | All OpenAI models | Reasoning effort controls · Built-in Web Search |
| **DeepSeek** | All DeepSeek models | Chat & reasoning models · 1M context |
| **Ollama** | Any local model | Auto-discovers installed models on your machine |
| **OpenRouter** | Any OpenRouter model | Enter any model slug (e.g. `google/gemma-4-31b-it`) |
| **Custom Endpoints** | Any OpenAI-compatible model | Presets for **OpenCode Go**, **OpenCode Zen**, **LiteLLM**, and **vLLM / llama.cpp** with `/models` discovery |

---

## Web Search Providers

Characters can browse the web in real time to look up documentation, recent releases, or error codes. Enable web search in =Preferences= → =APIs= under **Search Engines**, and toggle it anytime per pane using the **Globe Icon** in the message bar (`Ctrl + /`).

| Search Provider | Supported Models | Notes |
| :--- | :--- | :--- |
| **Native Provider Search** | Gemini · OpenAI · Anthropic | Uses the provider's built-in server-side search — no extra API key required |
| **Tavily** | All providers | LLM-optimized web search · Automatic fallback for local and custom models |

*More web search providers are coming soon!*

---

## Missing a provider?

New model and search providers are added regularly. If there is a provider you would like to see supported, [open an issue](https://github.com/boxxy-dev/boxxy/issues) on GitHub!
