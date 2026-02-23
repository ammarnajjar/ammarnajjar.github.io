---
slug: essential-dev-tools
title: "Essential Development Tools: My Brewfile Setup"
authors: ammarnajjar
date: 2026-02-23 10:00:00 +0100
tags: [productivity, tools, homebrew, macos]
---

As a software engineer, our toolset shapes how we work and what we can accomplish. Over time, I've curated a collection of essential tools that boost my productivity and make development more enjoyable. Here's a breakdown of my Homebrew setup, featuring the tools I use daily.

<!-- truncate -->

## Tools at a Glance

| Tool                              | What It's Good For                                          |
| --------------------------------- | ----------------------------------------------------------- |
| [Claude Code](#claude-code)       | AI-powered coding assistant CLI                             |
| [awscli](#awscli)                 | AWS services management from the command line               |
| [colima](#colima)                 | Lightweight Docker Desktop alternative for macOS            |
| [neovim](#neovim)                 | Modern, extensible vim-based text editor                    |
| [fd](#fd)                         | Fast and user-friendly alternative to `find`                |
| [fzf](#fzf)                       | Interactive fuzzy search for files, commands, and more      |
| [gh](#gh)                         | GitHub CLI for managing repos, PRs, and issues              |
| [git-delta](#git-delta)           | Syntax-highlighted git diffs with side-by-side view         |
| [jq](#jq)                         | Command-line JSON processor for parsing and manipulation    |
| [helm](#helm)                     | Kubernetes package manager for deploying applications       |
| [k9s](#k9s)                       | Terminal UI for managing Kubernetes clusters                |
| [kubernetes-cli](#kubernetes-cli) | kubectl - Kubernetes cluster management tool                |
| [MacTeX](#mactex)                 | Complete TeX distribution for macOS                         |
| [Obsidian](#obsidian)             | Knowledge base and note-taking with markdown                |
| [Maccy](#maccy)                   | Lightweight clipboard manager for macOS                     |
| [uv](#uv)                         | Fast Python package installer and resolver                  |
| [ripgrep](#ripgrep)               | Ultra-fast recursive search tool                            |
| [atuin](#atuin)                   | Smart shell history search with sync across machines        |
| [tmux](#tmux)                     | Terminal multiplexer for managing multiple sessions         |
| [Warp](#warp)                     | Modern terminal with AI features and collaborative tools    |
| [git](#git)                       | Distributed version control system                          |
| [mise](#mise)                     | Polyglot runtime version manager (replaces asdf, nvm, etc.) |
| [graphviz](#graphviz)             | Graph and diagram generation from text descriptions         |

## Detailed Tool Breakdown

### Command Line Essentials

---

#### atuin

[Atuin](https://atuin.sh) revolutionizes shell history management. Instead of the basic up-arrow history search, Atuin provides a searchable, syncable database of your shell commands across all your machines. It captures context like the directory you were in and exit codes, making it easy to find that command you ran three weeks ago.

**Key Features:**

- Full-text search through your entire shell history
- Sync history across multiple machines (end-to-end encrypted)
- Context-aware search (filter by directory, exit status, time)
- Import existing shell history from bash, zsh, fish

**Installation:**

```bash
brew install atuin
```

---

#### fd

[fd](https://github.com/sharkdp/fd) is a modern replacement for the classic `find` command. It's faster, more intuitive, and uses sensible defaults like ignoring `.gitignore` patterns automatically.

**Why I use it:**

- Simpler syntax than `find`: `fd pattern` vs `find . -name '*pattern*'`
- Colored output for better readability
- Respects `.gitignore` by default
- Blazingly fast parallel directory traversal

**Installation:**

```bash
brew install fd
```

---

#### fzf

[fzf](https://github.com/junegunn/fzf) is an interactive fuzzy finder that integrates beautifully with the shell, vim, and other tools. It transforms how you search for files, navigate directories, and search command history.

**Common use cases:**

- `Ctrl+R` for fuzzy command history search
- `Ctrl+T` for fuzzy file search
- Integration with vim/neovim for file navigation
- Custom scripts for searching anything (git branches, processes, etc.)

**Installation:**

```bash
brew install fzf
```

---

#### ripgrep

[ripgrep](https://github.com/BurntSushi/ripgrep) (`rg`) is hands-down the fastest way to search through code. It automatically respects `.gitignore`, searches recursively, and provides colorized output with context.

**Performance highlights:**

- Faster than `grep`, `ag`, `ack`, and others
- Respects `.gitignore` and hidden files by default
- Supports multiple search patterns and file type filtering
- Essential for large codebases

**Installation:**

```bash
brew install ripgrep
```

---

#### tmux

[tmux](https://github.com/tmux/tmux/wiki) is a terminal multiplexer that lets you manage multiple terminal sessions from a single window. It's invaluable for remote work, long-running processes, and organizing your workspace.

**Why it's essential:**

- Persistent sessions that survive disconnections
- Split panes and windows for multitasking
- Session management for different projects
- Scriptable and highly customizable

**Installation:**

```bash
brew install tmux
```

### Version Control & Git Tools

---

#### git

[Git](https://git-scm.com) is the backbone of modern software development. The distributed version control system that powers collaboration across teams and projects worldwide.

**Installation:**

```bash
brew install git
```

---

#### git-delta

[Delta](https://dandavison.github.io/delta) transforms git diffs into beautiful, syntax-highlighted output with side-by-side comparisons. It makes code review and understanding changes much easier.

**Visual improvements:**

- Syntax highlighting in diffs
- Side-by-side diff view
- Line numbering and git blame integration
- Configurable themes and styles

**Installation:**

```bash
brew install git-delta
```

---

#### gh

[GitHub CLI](https://cli.github.com) brings GitHub functionality to your terminal. Create PRs, review issues, manage repos, and automate workflows without leaving the command line.

**Favorite features:**

- `gh pr create` - Create pull requests from the terminal
- `gh pr checkout` - Check out PRs by number
- `gh repo clone` - Quickly clone repos
- `gh run view` - Monitor GitHub Actions workflows

**Installation:**

```bash
brew install gh
```

### Container & Kubernetes Tools

---

#### colima

[Colima](https://github.com/abiosoft/colima) is a lightweight container runtime for macOS that provides Docker and Kubernetes support with minimal resource usage. It's an excellent free alternative to Docker Desktop.

**Benefits:**

- Low memory footprint compared to Docker Desktop
- Simple CLI interface: `colima start`, `colima stop`
- Supports both Docker and Kubernetes
- Configurable CPU, memory, and disk allocation

**Installation:**

```bash
brew install colima
```

---

#### kubernetes-cli

[kubectl](https://kubernetes.io/docs/reference/kubectl) is the official Kubernetes command-line tool for deploying applications, inspecting resources, and managing cluster operations.

**Installation:**

```bash
brew install kubernetes-cli
```

---

#### helm

[Helm](https://helm.sh) is the package manager for Kubernetes, making it easy to define, install, and upgrade complex Kubernetes applications using charts.

**Installation:**

```bash
brew install helm
```

---

#### k9s

[k9s](https://k9scli.io) provides a terminal UI for Kubernetes that makes cluster management visual and interactive. It's like having a dashboard in your terminal.

**Productivity boost:**

- Real-time cluster monitoring
- Navigate pods, services, deployments with keyboard shortcuts
- View logs, describe resources, port-forward with ease
- Vim-like keybindings for efficiency

**Installation:**

```bash
brew install derailed/k9s/k9s
```

### Development Tools

---

#### mise

[mise](https://mise.jdx.dev) (formerly rtx) is a polyglot runtime manager that handles multiple language versions seamlessly. It replaces tools like nvm, rbenv, pyenv, and asdf with a single, fast tool written in Rust.

**Language support:**

- Node.js, Python, Ruby, Go, Java, and more
- Per-project version configuration with `.mise.toml`
- Faster than asdf (written in Rust)
- Compatible with asdf plugins

**Installation:**

```bash
brew install mise
```

---

#### uv

[uv](https://docs.astral.sh/uv) is a blazingly fast Python package installer and resolver written in Rust. It's 10-100x faster than pip and provides a better dependency resolution experience.

**Speed improvements:**

- Parallel downloads and installs
- Global cache for packages
- Better dependency conflict resolution
- Drop-in replacement for pip commands

**Installation:**

```bash
brew install uv
```

---

#### neovim

[Neovim](https://neovim.io) is a modern, extensible fork of Vim with better defaults, Lua scripting support, and built-in LSP (Language Server Protocol) support. It's my primary editor for all development work.

**Modern features:**

- Native LSP support for IDE-like features
- Lua configuration (more powerful than VimScript)
- Treesitter for better syntax highlighting
- Extensive plugin ecosystem

**Installation:**

```bash
brew install neovim
```

### Data & Visualization Tools

---

#### jq

[jq](https://jqlang.github.io/jq) is a lightweight command-line JSON processor. It's indispensable for working with APIs, parsing JSON logs, and transforming data.

**Common uses:**

- Parse API responses: `curl api.example.com | jq '.data'`
- Filter arrays: `jq '.[] | select(.status == "active")'`
- Transform JSON structure
- Pretty-print JSON

**Installation:**

```bash
brew install jq
```

---

#### graphviz

[Graphviz](https://graphviz.org) generates graphs and diagrams from text descriptions using the DOT language. It's perfect for visualizing system architecture, data structures, and relationships.

**Installation:**

```bash
brew install graphviz
```

### AWS Tools

---

#### awscli

[AWS CLI](https://aws.amazon.com/cli) is the official command-line interface for Amazon Web Services. It provides direct access to AWS services and is essential for automation and infrastructure management.

**Key operations:**

- Manage EC2 instances, S3 buckets, Lambda functions
- Automate deployments and infrastructure changes
- Query and filter resources with JMESPath
- Profile management for multiple AWS accounts

**Installation:**

```bash
brew install awscli
```

### Desktop Applications

---

#### Claude Code

[Claude Code](https://www.anthropic.com/claude/code) is an AI-powered coding assistant that runs in your terminal. It helps with code generation, refactoring, debugging, and understanding complex codebases.

**Capabilities:**

- Intelligent code generation and completion
- Context-aware suggestions
- Code explanation and documentation
- Debugging assistance

**Installation:**

```bash
brew install --cask claude-code
```

---

#### Warp

[Warp](https://www.warp.dev) is a modern, Rust-based terminal that reimagines the terminal experience with AI features, collaborative tools, and a more intuitive interface.

**Standout features:**

- AI command suggestions
- Block-based output for easy copying
- Command palette and searchable history
- Collaborative terminal sharing
- Built-in workflows and command templates

**Installation:**

```bash
brew install --cask warp
```

---

#### Maccy

[Maccy](https://maccy.app) is a lightweight, open-source clipboard manager for macOS. It keeps a history of everything you copy, making it easy to access previous clipboard contents.

**Simple but powerful:**

- Keyboard-driven interface
- Search clipboard history
- Pin frequently used items
- Privacy-focused (no cloud sync)

**Installation:**

```bash
brew install --cask maccy
```

---

#### Obsidian

[Obsidian](https://obsidian.md) is a powerful knowledge base and note-taking application that works with local Markdown files. It's excellent for personal knowledge management and linking ideas together.

**Why I love it:**

- Local-first (your data stays on your machine)
- Graph view for visualizing connections
- Extensive plugin ecosystem
- Markdown-based for portability
- Backlinking and bi-directional links

**Installation:**

```bash
brew install --cask obsidian
```

---

#### MacTeX

[MacTeX](https://www.tug.org/mactex) is a complete TeX distribution for macOS, essential for creating professional documents, academic papers, and technical documentation with LaTeX.

**Installation:**

```bash
brew install --cask mactex
```

## Managing This Setup

To replicate this setup on a new machine, I use Homebrew Bundle. You can download my [Brewfile](https://raw.githubusercontent.com/ammarnajjar/ammarnajjar.github.io/main/blog/2026-02-23-essential-dev-tools/Brewfile) and install all tools at once:

```bash
# Install Homebrew (if not already installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Download the Brewfile and install all tools
curl -O https://raw.githubusercontent.com/ammarnajjar/ammarnajjar.github.io/main/blog/2026-02-23-essential-dev-tools/Brewfile
brew bundle install --file=Brewfile

# Or to create a Brewfile from your current setup
brew bundle dump --file=Brewfile
```

## Conclusion

These tools form the foundation of my development environment. Each one solves a specific problem and integrates well with the others. The key is finding tools that match your workflow and actually using them consistently.

What tools are essential in your setup? I'm always interested in discovering new productivity boosters and improvements to existing workflows.

<a href="#" class="go-to-top">Go to Top</a>
