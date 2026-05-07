+++
title = "Supported Models"
template = "docs.html"
+++

# Supported Models

Boxxy connects to LLM providers via [rig](https://github.com/0xplaygrounds/rig), an open-source Rust framework for building LLM-powered applications. Any provider supported by rig can be added to Boxxy.

Configure your API keys in =Preferences= → =APIs=, then assign models to each function in =Preferences= → =Model Selection=.

---

## Google Gemini

| Model | Thinking |
| :--- | :--- |
| Gemini 3.1 Pro | Low · Medium · High |
| Gemini 3.1 Flash Lite | Minimal · Low · Medium · High |

---

## Anthropic Claude

| Model | Thinking |
| :--- | :--- |
| Claude Opus 4.6 | Extended |
| Claude Sonnet 4.6 | Extended · Adaptive |

---

## OpenAI

| Model | Reasoning effort |
| :--- | :--- |
| GPT-5.4 | None · Low · Medium · High · XHigh |
| GPT-5.4 Mini | None · Low · Medium · High · XHigh |
| GPT-5.4 Nano | None · Low · Medium · High · XHigh |

---

## DeepSeek

| Model | Notes |
| :--- | :--- |
| DeepSeek-V4-Pro | 1M context · 384K max output |
| DeepSeek-V4-Flash | 1M context · 384K max output |

---

## Ollama

Local models via Ollama — enter any model name you have pulled (e.g. `llama3`, `mistral`, `qwen2.5-coder`). No thinking controls are exposed since capabilities vary per model.

---

## OpenRouter

Any model available on OpenRouter — enter the full model string (e.g. `mistralai/mistral-7b-instruct`). No thinking controls are exposed.

---

## Missing a provider or model?

New providers and models are added regularly. If something you need is missing, [open an issue](https://github.com/boxxy-dev/boxxy/issues) and we'll look into adding it.
