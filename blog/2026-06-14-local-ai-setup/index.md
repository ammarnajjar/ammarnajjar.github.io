---
slug: local-ai-coding-setup
title: "Local AI Coding Setup: A Practical Guide for 2026"
authors: ammarnajjar
date: 2026-06-14 10:00:00 +0200
tags: [ai, ollama, opencode, aider, local-dev, mac]
---

Cloud-based AI coding assistants like Claude Code are powerful, but they come with trade-offs: API costs, data leaving your machine, and dependency on internet connectivity. Could we achieve a comparable experience entirely offline?

I spent weeks experimenting with OpenCode, Aider, Continue.dev, Cline, Roo Code, and Claude Code itself, paired with Ollama, LM Studio, and a dozen local models, all on a 16 GB MacBook Pro. Here is what worked, what didn't, and the setup I landed on.

{/* truncate */}

## The Problem With a Single Tool

Early on, I tried to find one tool to rule them all. The problem is that local agents have different strengths, and on limited hardware you cannot afford the bloat that comes from a tool trying to be everything.

The breakthrough came when I stopped looking for a single winner and instead split the work across three specialized tools, each chosen for a specific role.

## The Stack

```
┌────────────────────────────────────────┐
│           OpenCode                      │
│  Primary Interface: Architecture,       │
│  Research, Documentation, MCP, Planning │
└──────────────────┬─────────────────────┘
                   │
                   ▼
┌────────────────────────────────────────┐
│           Aider                         │
│  Coding Specialist: Refactoring,        │
│  Feature Impl, Bug Fixes, Test Gen     │
└──────────────────┬─────────────────────┘
                   │
                   ▼
┌────────────────────────────────────────┐
│          Ollama                         │
│     Local Model Runtime                 │
└──────────────────┬─────────────────────┘
                   │
                   ▼
┌────────────────────────────────────────┐
│       Local Models                     │
│  qwen2.5-coder:7b (main)               │
│  qwen2.5-coder:3b (fast)               │
└────────────────────────────────────────┘
```

Alongside these, **Continue.dev** runs inside VSCode for quick IDE chat, code explanations, and autocomplete.

| Component | Role |
|---|---|
| OpenCode | Architecture, research, documentation, ADRs, planning, MCP workflows |
| Aider | Refactoring, feature implementation, bug fixing, test generation |
| Continue.dev | IDE chat, explanations, autocomplete, small edits |

## Why This Split Works

As a Software Architect, most of my day involves architecture discussions, documentation, repository exploration, and planning, not just writing code. OpenCode excels at these tasks. It is built for exploration and MCP-heavy workflows, which makes it ideal for the research-and-plan phase.

Aider remains the best tool when it is time to write code. It is focused, git-aware, and uses minimal context: it only loads the files you explicitly add. It does less, but does it reliably.

The workflow becomes:

1. **OpenCode** → Explore the repository, understand the architecture, create a plan
2. **Aider** → Implement the approved plan, review diffs, commit
3. **OpenCode** → Document decisions, write ADRs, update notes

Continue.dev stays open in VSCode throughout for quick questions and autocomplete.

## Model Selection

### Primary: qwen2.5-coder:7b

This is the sweet spot for both OpenCode and Aider. It fits comfortably in memory alongside your editor and browser, produces high-quality code, and responds fast enough for interactive use. On a 16 GB machine, it consistently outperforms larger general-purpose models like llama3.1:8b for coding tasks.

### Fast Backup: qwen2.5-coder:3b

Useful for quick edits where the primary model feels like overkill. It runs nearly instantaneously and consumes minimal RAM. The quality gap is noticeable but acceptable for small, well-scoped changes.

### Models I Rejected

| Model | Why It Didn't Work |
|---|---|
| qwen3.5:9b | Slower than qwen2.5-coder:7b with no meaningful quality improvement |
| qwen3.5:2b | Responses were frequently truncated, reasoning was weak |
| llama3.1:8b | General-purpose model that underperforms coding-specific models at the same size |

## Context Is the Real Bottleneck

The single biggest lesson: **model size matters less than context management.**

On a 16 GB machine, you cannot simply load the entire repository into a 128k context window. Even if the model supports it, the memory pressure becomes untenable. The practical limit is around 8k–16k tokens.

I hit this hard early on: one session tried to pass 192,727 tokens into a model capped at 32,768. The result was not a slow response but complete failure. What looked like a model quality problem was actually a context overflow.

This means you must be deliberate about what you feed the model:
- Add only the files relevant to your current task
- Clear chat history between sessions
- Keep MCP server usage minimal

Trying to force-fit a large context (say, 32k+ tokens) into these models on limited hardware leads to failures that look like model quality issues but are actually context-overflow problems.

## MCP: Tools Are Not Intelligence

MCP servers are useful. **Context7**, in particular, provides current framework documentation that local models lack (since they are trained on older data). It supports Angular, NestJS, .NET, Docker, Kubernetes, React, and Playwright: most of a modern stack. GitHub MCP (read-only) and Playwright MCP add significant capability when needed.

But adding MCP servers to a weak model does not make it smarter. A poor model with ten tools remains a poor model. The base model quality determines the ceiling; MCP just determines what you can reach from there.

My rule of thumb: start with Context7 enabled always, add GitHub MCP in read-only mode, and only enable Playwright (or database, Docker, or Kubernetes MCPs) when you have a specific need. Disable everything else by default.

## Recommended Configuration

### Ollama

Start the server with a constrained context length and keep models loaded between requests:

```bash
export OLLAMA_KEEP_ALIVE=-1
OLLAMA_CONTEXT_LENGTH=8192 ollama serve
```

Pull the models you need:

```bash
ollama pull qwen2.5-coder:7b
ollama pull qwen2.5-coder:3b
```

### Aider

```bash
pipx install aider-chat
aider --model ollama_chat/qwen2.5-coder:7b --map-tokens 1024 --dark-mode
```

### OpenCode

Configure OpenCode to use your local Ollama instance by setting the model provider in `opencode.json`:

```json
{
  "provider": "ollama",
  "model": "qwen2.5-coder:7b"
}
```

OpenCode uses Ollama's OpenAI-compatible endpoint at `http://localhost:11434`, so no additional proxy or adapter is needed.

### Best Practices

Every session should follow the same discipline:

1. **Work on one feature at a time.** Both OpenCode and Aider work best when the scope is narrow and well-defined.
2. **Add only relevant files.** Resisting the urge to context-dump everything saves RAM and improves output quality.
3. **Review every diff before accepting.** Aider stages changes, but you should manually inspect them with `git diff` before committing.
4. **Keep chats short.** Start fresh sessions for unrelated tasks to prevent context bloat.
5. **Use the right tool for the phase.** Plan in OpenCode, implement in Aider, document back in OpenCode.

## Daily Workflow

A typical session looks like this:

1. Start Ollama: `export OLLAMA_KEEP_ALIVE=-1 && OLLAMA_CONTEXT_LENGTH=8192 ollama serve`
2. Start your dev environment: `docker compose up -d`
3. Open VSCode (Continue.dev is active for quick questions)
4. Launch OpenCode for architecture exploration and planning
5. Hand the approved plan to Aider for implementation
6. Return to OpenCode for documentation and ADRs

This three-tool split gives each tool room to breathe: no single agent is overloaded with tasks it is not well-suited for.

## Troubleshooting

**Slow responses?** Check running models with `ollama ps` and reduce your context size. If Ollama is swapping, the context window is too large.

**Context limit errors?** Clear the chat history, remove unnecessary files from the session, lower `--map-tokens`, and disable MCP servers you don't need.

**Model not loaded?** Run `ollama list` to verify, then `ollama pull qwen2.5-coder:7b` if missing.

**For faster inference with smaller contexts,** create a custom model with a hard 8K context ceiling:

```bash
cat > Modelfile.qwen-8k <<EOF
FROM qwen2.5-coder:7b
PARAMETER num_ctx 8192
PARAMETER temperature 0
EOF
ollama create qwen-coder-8k -f Modelfile.qwen-8k
```

---

## OpenCode Zen Free Models

OpenCode's Zen mode provides access to free API-based models as an alternative to running everything locally.

### Why Use Them

- **Zero memory overhead:** no Ollama process consuming RAM, freeing up the full 16 GB for your editor, browser, and containers
- **No setup required:** skip the Ollama installation, model downloads, and configuration
- **Larger context windows:** API models typically support 32k–128k tokens, sidestepping the context bottleneck entirely
- **Fast evaluation:** try OpenCode immediately to decide if the workflow suits you before investing in a local setup

### Why Not

- **Internet required:** you are back to depending on network connectivity, which was one of the original goals to eliminate
- **Data leaves your machine:** source code and prompts are sent to an external API
- **Rate limits and availability:** free tiers come with usage caps and may be unreliable during peak times
- **No offline fallback:** if the service is down or you lose connectivity, you cannot work
- **Model selection is limited:** you get whatever free models the provider offers, not your curated local stack

## Upgrade Path

This configuration is optimized for 16 GB of RAM. If you upgrade:

- **32 GB:** Evaluate qwen2.5-coder:14b or future Qwen3-Coder models
- **64 GB+:** Revisit OpenCode with 32k–64k context windows and larger coding models

Until then, this three-tool stack provides the best balance of architecture capability, coding productivity, and hardware efficiency on a MacBook Pro, without sending a single request to the cloud.

Whether you go fully local or mix in Zen mode for quick sessions, the key is matching the tool to the task. Plan in OpenCode, build in Aider, explore in Continue.dev, and keep your context small.

---

*This post was written using [OpenCode](https://opencode.ai) with the DeepSeek V4 Flash Free model.*
