+++
title = "Telemetry"
template = "docs.html"
+++

# Telemetry

Boxxy Terminal includes a =privacy-first=, open-source telemetry system designed to help us improve the application's performance, stability, and especially the AI features, such as tracking tool acceptance and rejection rates. Basically, telemetry is your way of contributing to the project!

We believe in =complete transparency= regarding the data we collect, so we publicly share this data in [REAL TIME](/live) with the hope that it will prove valuable for the open-source community!

---

## Privacy Principles

*   **Opt-In/Opt-Out:** Telemetry is strictly configurable. While it may be enabled by default during preview phases to gather initial feedback, you can easily disable it at any time via =Preferences=. Disabling telemetry takes effect immediately across both the UI and background daemon and purges any unsent local telemetry events.
*   **Zero PII (Personally Identifiable Information):** We **never** collect file paths, file contents, usernames, IP addresses, prompt contents, terminal outputs, or custom MCP server names.
*   **Anonymous Identifiers:**
    *   `install_id`: A random, anonymous identifier generated once when you first run the app. This helps us count unique installations without knowing who you are.
    *   `session_id`: A random identifier generated each time you launch the app, kept only in memory for that session. This helps us understand session lengths and distinguish between many users vs. a single user launching the app multiple times.
*   **Open Standard:** We use the industry-standard =OpenTelemetry (OTel)= protocol, ensuring our data collection methods are open and auditable.

---

## What Data We Collect

We focus on collecting high-impact, low-cardinality metrics to provide value while keeping the data footprint extremely small. 

Here is the exhaustive list of the metrics we track when telemetry is enabled:

| Category | Metric Name | Description | Data Attributes Collected |
| :--- | :--- | :--- | :--- |
| **Growth & Usage** | `app.launch` | Triggered once per application startup. | `os`, `arch`, `pkg_type` (e.g., flatpak, native), `version`, `shell` (e.g., bash, zsh, fish), `desktop` (e.g., GNOME, KDE) |
| **AI Usage** | `ai.tokens` | The number of tokens consumed during an AI interaction. | `model_provider`, `model_name`, `role` (input/output), `feature` |
| **AI Performance** | `ai.invocations` | A count of AI requests initiated by the user. | `model_provider`, `model_name`, `feature` |
| **AI Quality** | `ai.latency` | The time it takes (in milliseconds) to receive a response from the AI model. | `model_provider`, `model_name`, `feature` |
| **Product Features** | `tool.use` | A count of which built-in AI tools are being utilized by the agent (custom MCP tools are grouped anonymously as `external_mcp_tool`). | `tool_name` (e.g., `sys_shell_exec`, `file_read`, `external_mcp_tool`) |
| **Retention** | `claw.session_resume`| Triggered when a previous BoxxyClaw session is restored. | `session_type` (e.g., normal, pinned) |

---

## How the Data is Used

The data collected is securely transmitted to our backend infrastructure. We use this aggregated, anonymous data to:
*   Understand which features and AI models are most popular.
*   Diagnose performance bottlenecks (e.g., high latency with specific providers).
*   Prioritize development efforts for different operating systems and deployment methods.
*   Publish =public, aggregated community statistics=.

**Note:** Gathering information and policies might change, so please check back, or just check the code! 😊
