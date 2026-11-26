+++
title = "Providers"
template = "docs.html"
aliases = ["models", "web-search"]
+++

# Providers

Boxxy connects to LLM providers via [rig](https://github.com/0xplaygrounds/rig). Boxxy supports **all models** from each provider — automatically configuring thinking levels, context windows, and token pricing.

Configure your API keys, subscriptions, or custom endpoints in =Preferences= → =APIs=, then choose a default character model (plus optional per-character overrides and a `Dreams` model) in =Models Selection= or via the quick links in the =Claw Sidebar=.

---

## AI Model Providers

| Provider | Supported Models | Notes |
| :--- | :--- | :--- |
| **ChatGPT Subscription** | Codex / ChatGPT models | Sign in directly with your ChatGPT Plus / Pro account via OAuth |
| **Google Gemini** | All Gemini models | Thinking controls · Built-in Google Search · Image generation |
| **Anthropic Claude** | All Claude models | Thinking controls · Built-in Web Search |
| **OpenAI** | All OpenAI models | Reasoning effort controls · Built-in Web Search · Image generation |
| **xAI · MiniMax · OpenRouter** | Grok, MiniMax & any OpenRouter slug | Reasoning support · Built-in image generation |
| **DeepSeek · Mistral · Groq · Moonshot · Z.ai** | All catalog models | Fast chat & reasoning models |
| **OpenCode Zen & OpenCode Go** | Curated coding models | One-click presets in =APIs= |
| **Ollama** | Any local model | Auto-discovers installed models on your machine |
| **Custom Endpoints** | Any OpenAI-compatible model | Works with **LiteLLM**, **vLLM**, and **llama.cpp** with `/models` discovery |

---

## Web Search Providers

Characters can browse the web in real time to look up documentation, recent releases, or error codes. Enable web search in =Preferences= → =Toolbox & Permissions= (and add a Tavily key in =APIs= if needed), then toggle it anytime per pane via `/web` or the **`+` menu** in the message bar (`Ctrl + /`).

| Search Provider | Supported Models | Notes |
| :--- | :--- | :--- |
| **Native Provider Search** | Gemini · OpenAI · Anthropic | Uses the provider's built-in server-side search — no extra API key required |
| **Tavily** | All providers | LLM-optimized web search · Automatic fallback for local and custom models |

*More web search providers are coming soon!*

---

## Missing a provider?

New model and search providers are added regularly. If there is a provider you would like to see supported, [open an issue](https://github.com/boxxy-dev/boxxy/issues) on GitHub!
