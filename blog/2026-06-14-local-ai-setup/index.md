---
slug: local-ai-setup
title: "Local AI on a MacBook Pro with 16 GB RAM: What Actually Works"
authors: ammarnajjar
date: 2026-06-14 12:00:00 +0200
tags: [productivity, tools, macos, ai]
---

Running AI coding assistants locally sounds appealing — no API costs, your code stays on your machine, and you get a Claude Code-like experience for free. But getting it to actually work well on a 16 GB MacBook Pro M1 takes more trial and error than most guides admit.

This post summarizes months of real-world testing across multiple tools, runtimes, and models. The conclusion surprised me.

{/* truncate */}

## The Goal

Build a local, subscription-free AI development environment that can support:

- Architecture discussions and documentation
- Repository exploration and planning
- Code modifications, refactoring, and bug fixes
- ADRs and Obsidian notes
- Angular, NestJS, .NET, Docker, and Kubernetes projects

The setup should run entirely locally on a MacBook Pro with 16 GB RAM.

---

## The Biggest Discovery

Before getting into tool comparisons and benchmarks, the most important finding was this:

> **Agent capability > Coding benchmark score**

A model that can find files, edit code, use tools, and execute multi-step workflows is often more useful than a model with a higher coding benchmark score that cannot reliably do those things.

This single insight changed which models and tools came out on top.

---

## Tools Evaluated

Three coding agent frameworks were tested in depth:

| Tool | What It Is |
|------|------------|
| **OpenCode** | Agent-oriented terminal interface |
| **Aider** | Git-focused code editing assistant |
| **Continue.dev** | VSCode extension with chat and autocomplete |

Two local model runtimes were compared:

| Runtime | What It Is |
|---------|------------|
| **Ollama** | Simple, popular CLI-based local model server |
| **LM Studio** | GUI-based model manager with an OpenAI-compatible API |

---

## Tool Comparison Results

| Tool | Architecture | Docs | Coding | Tool Use | Ease of Use | Verdict |
|------|:---:|:---:|:---:|:---:|:---:|:---:|
| **OpenCode** | 10/10 | 10/10 | 8/10 | 9/10 | 8/10 | **Primary Workspace** |
| Continue.dev | 6/10 | 4/10 | 7/10 | 5/10 | 10/10 | IDE Companion |
| Aider | 2/10 | 1/10 | 5/10 | 3/10 | 6/10 | Not recommended |

### OpenCode

OpenCode won as the primary workspace because it is built for agentic workflows. It plans, explores repositories, generates documents, and writes long-form content reliably.

**Strengths:** Planning, architecture analysis, documentation, repository exploration, long-form content  
**Weaknesses:** Requires a larger context window; performance depends heavily on model tool-use capability

### Aider: The Surprise Disappointment

Aider has a good reputation for code editing, and that reputation may be deserved in other setups. In this workflow it underperformed significantly.

During testing, a simple prompt like `Create a file containing one line: hello` caused Aider to generate unrelated JavaScript instead of creating the file. It also failed at file discovery and documentation generation.

In this workflow it was **not recommended**.

### Continue.dev

The simplest of the three. Install the VSCode extension, point it at a local model, and it works. Great for IDE chat, quick explanations, and autocomplete. Not the right tool for architecture work or anything requiring multi-step reasoning.

---

## Runtime Comparison

The runtime turned out to matter more than expected.

| Runtime | OpenCode Experience | Model Management | Troubleshooting | Verdict |
|---------|:---:|:---:|:---:|:---:|
| **LM Studio** | 10/10 | 10/10 | 10/10 | **Preferred for OpenCode** |
| Ollama | 6/10 | 7/10 | 6/10 | Secondary (Continue.dev) |

### What went wrong with Ollama and OpenCode

When connecting OpenCode to local models through Ollama, several problems appeared:

- Some models returned no answer at all
- Some responses were truncated mid-output
- Context handling was opaque — hard to know what was actually loaded
- OpenCode's agent prompt was too heavy for small contexts
- The experience was inconsistent across sessions

### Why LM Studio worked better

After switching OpenCode to LM Studio, the problems mostly disappeared:

- The exact loaded model ID was visible via `/v1/models`
- Context length was visible and configurable in the UI
- The OpenAI-compatible API made troubleshooting straightforward
- Models that failed through Ollama worked correctly through LM Studio

**Key observation:** The models themselves were not the main problem. The Ollama + OpenCode combination was less reliable on this machine. LM Studio + OpenCode behaved better with the same models.

You can verify what LM Studio is serving at any time:

```bash
curl http://localhost:1234/v1/models
```

---

## Model Comparison

| Model | Speed | Tool Use | Architecture | Docs | Coding | Final Role |
|-------|:---:|:---:|:---:|:---:|:---:|:---:|
| **qwen3.5:9b** | 7/10 | 10/10 | 10/10 | 9/10 | 8/10 | **Main model** |
| **qwen3.5:2b** | 10/10 | 9/10 | 6/10 | 7/10 | 5/10 | **Fast agent** |
| Ministral 3B | 8/10 | 8/10 | 7/10 | 8/10 | 6/10 | Alternative |
| qwen2.5-coder:7b | 6/10 | 4/10 | 6/10 | 5/10 | 8/10 | Coding specialist (weak agent) |
| llama3.1:8b | 5/10 | 4/10 | 6/10 | 6/10 | 6/10 | Rejected |
| gemma4 | 5/10 | 2/10 | 6/10 | 5/10 | 7/10 | Rejected |

### Real-world tool use test results

One of the most revealing tests was simply asking each model to create and edit files using OpenCode's tools:

| Model | Creates Files | Edits Files | Uses Tools |
|-------|:---:|:---:|:---:|
| qwen3.5:9b | ✅ | ✅ | ✅ |
| qwen3.5:2b | ✅ | ✅ | ✅ |
| Ministral 3B | ✅ | Sometimes | ✅ |
| qwen2.5-coder:7b | Mixed | Mixed | Mixed |
| gemma4 | ❌ | ❌ | ❌ |

gemma4 refused editing tasks despite seeing the available tools. llama3.1:8b worked but delivered poor value for its resource cost.

`qwen2.5-coder:7b` scores well on coding benchmarks but has **mixed tool use** in practice — it underperformed as an OpenCode agent compared to expectations. This is the core finding: benchmark scores do not predict agent capability.

**qwen3.5:9b** is the main model: strong reasoning, reliable tool use, excellent for architecture and documentation work. **qwen3.5:2b** is the fast companion for quick tasks and notes.

---

## The Context Window Problem

This was one of the most important — and most surprising — findings.

### OpenCode needs more context than you expect

When OpenCode was connected to a model with 8k context, this error appeared immediately:

```text
n_keep: 26460 >= n_ctx: 8192
```

Then later, after attempts to reduce it:

```text
n_keep: 8232 >= n_ctx: 8192
```

OpenCode's initial system prompt alone exceeds 8k tokens. This means **the model never even received the user's first message** — the context was already full before the conversation started.

The fix: set LM Studio context to **32,768 tokens** and match that in the OpenCode model configuration.

### Recommended context sizes

| Tool | Runtime | Context |
|------|---------|--------:|
| OpenCode | LM Studio | 32,768 |
| Continue.dev | Either | 8,192 |

---

## The Final Stack

After all this testing, the recommended setup has three modes:

### Primary: Architecture & Documentation Work

```text
OpenCode + LM Studio + qwen3.5:9b
Context: 32,768
```

Use for: architecture reviews, documentation, ADRs, planning, repository exploration, Obsidian notes

### Fast Mode: Quick Tasks

```text
OpenCode + LM Studio + qwen3.5:2b
Context: 32,768
```

Use for: quick questions, notes, summaries, repository exploration

### IDE Companion

```text
Continue.dev + LM Studio or Ollama + qwen3.5:2b
Context: 8,192
```

Use for: IDE chat, code explanations, autocomplete, small edits

---

## Quick Decision Table

| Task | Tool | Runtime | Model |
|------|------|---------|-------|
| Architecture discussion | OpenCode | LM Studio | qwen3.5:9b |
| Writing documentation | OpenCode | LM Studio | qwen3.5:9b |
| Obsidian notes / ADRs | OpenCode | LM Studio | qwen3.5:9b |
| Repository exploration | OpenCode | LM Studio | qwen3.5:9b |
| Planning | OpenCode | LM Studio | qwen3.5:9b |
| Quick questions / notes | OpenCode | LM Studio | qwen3.5:2b |
| IDE chat / explanation | Continue.dev | LM Studio or Ollama | qwen3.5:2b |
| Autocomplete | Continue.dev | LM Studio or Ollama | qwen3.5:2b |

---

## Installation

### Ollama (for Continue.dev)

```bash
curl -fsSL https://ollama.com/install.sh | sh
ollama pull qwen3.5:2b
```

### LM Studio (for OpenCode)

Download from the official LM Studio website. Load `qwen3.5:9b` for primary work or `qwen3.5:2b` for fast mode, set context to **32,768**, and start the local server.

> **Tip:** LM Studio's **Zen models** are particularly effective on machines with limited RAM. They are well-optimized for Apple Silicon and worth trying if you want good performance without pushing memory limits.

Verify the server is running:

```bash
curl http://localhost:1234/v1/models
```

### OpenCode

```bash
curl -fsSL https://opencode.ai/install | bash
```

Configure `~/.config/opencode/opencode.json` to point at LM Studio. The model name in the config must match the exact `id` returned by `/v1/models`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "lmstudio": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "LM Studio Local",
      "options": {
        "baseURL": "http://localhost:1234/v1"
      },
      "models": {
        "qwen/qwen3.5-9b": {
          "name": "Qwen 3.5 9B (Main)",
          "limit": {
            "context": 32768,
            "output": 2048
          }
        },
        "qwen/qwen3.5-2b": {
          "name": "Qwen 3.5 2B (Fast)",
          "limit": {
            "context": 32768,
            "output": 2048
          }
        }
      }
    }
  }
}
```

### Continue.dev

Install the Continue extension in VSCode and point it at LM Studio or Ollama with `qwen3.5:2b`.

---

## Lessons Learned

| Assumption | Reality |
|------------|---------|
| Best coding benchmark = best agent | False — tool use capability matters more |
| Bigger model = better experience | False on 16 GB RAM |
| qwen2.5-coder:7b is the best local model | Strong coder, weak agent — mixed tool use |
| Aider is the best local coding tool | Not recommended for this workflow |
| Ollama is the best runtime | Not for OpenCode on this machine |
| Context size is a minor detail | False — OpenCode requires 32k minimum |
| LM Studio is just a GUI | False — it is the better OpenCode runtime |

---

## Future Upgrade Path

If upgrading to **32 GB RAM**: evaluate larger models and bigger contexts.

If upgrading to **64 GB RAM**: re-evaluate 32B-class models and 64k contexts.

On 16 GB RAM, avoid running memory-heavy apps (Docker Desktop, multiple browser windows, IDE indexing) at the same time as a loaded 9B model.

---

## Conclusion

The biggest discovery was not a model — it was a combination:

**OpenCode + LM Studio** delivered a substantially better experience than any other setup tested.

The setup that works on a 16 GB MacBook Pro M1:

- **OpenCode** for thinking, planning, and writing
- **Continue.dev** for IDE support and autocomplete
- **LM Studio** as the OpenCode runtime
- **32k context** for OpenCode, 8k for Continue.dev
- **qwen3.5:9b** as the main model, **qwen3.5:2b** for fast tasks

The principle that guided every decision: agent capability matters more than benchmark scores.

<a href="#" class="go-to-top">Go to Top</a>
