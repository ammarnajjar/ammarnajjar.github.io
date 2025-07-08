---
slug: mastering-git
title: "Mastering Git Commands: A Practical Guide"
authors: ammarnajjar
date: 2025-07-08 20:05:50 +0200
tags: [git]
---

Git is an indispensable tool for version control, enabling developers to track changes, collaborate effectively, and manage project history. While its capabilities are vast, a solid understanding of key commands can significantly streamline your workflow. This article delves into a selection of practical Git commands, explaining what they do, how to use them, and when they are most effective.

<!-- truncate -->

## 1. Configuration Commands

Setting up your Git environment correctly is the first step. These commands help you define your identity and preferences.

*   **`git config --global user.name "Your Name"`**
    *   **What it does:** Sets the global username for your Git commits. This name will appear in the commit history for all repositories on your system.
    *   **When to use:** Typically, this is one of the first commands you run after installing Git. It ensures your commits are attributed to you.
    *   **How to use:**
        ```bash
        git config --global user.name "Ammar Najjar"
        ```

*   **`git config --local user.email <email>`**
    *   **What it does:** Sets the email address for commits specific to the current repository. This overrides the global email setting.
    *   **When to use:** When you need to use a different email address for a particular project (e.g., a work email for a company project, and a personal email for open-source contributions).
    *   **How to use:**
        ```bash
        git config --local user.email your.email@example.com
        ```

*   **`git config --local user.signingkey <key>`**
    *   **What it does:** Configures the GPG key to be used for signing commits locally within a specific repository.
    *   **When to use:** If your project or organization requires signed commits for verification and integrity, and you need to use a specific key for that repository.
    *   **How to use:**
        ```bash
        git config --local user.signingkey YOUR_GPG_KEY_ID
        ```

### Understanding and Using `user.signingkey`

Commit signing with GPG (GNU Privacy Guard) adds a layer of security and trust to your Git history. When you sign a commit, you cryptographically prove that you are the author of that commit and that the commit's content has not been tampered with since it was signed.

**1. Generate a GPG Key (if you don't have one):**
If you don't already have a GPG key, you'll need to generate one. This is a one-time setup.
```bash
gpg --full-generate-key
```
Follow the prompts to choose the key type, key size, expiration date, and set a passphrase.

**2. Get Your GPG Key ID:**
Once you have a GPG key, you need its ID to tell Git which key to use.
```bash
gpg --list-secret-keys --keyid-format LONG
```
Look for a line similar to `sec rsa4096/YOUR_KEY_ID 2023-01-01 [SC]` where `YOUR_KEY_ID` is the 16-character hexadecimal string. This is the ID you'll use.

**3. Configure Git to Use Your GPG Key:**
You can configure Git globally or locally for a specific repository.

*   **Global Configuration (for all repositories):**
    ```bash
    git config --global user.signingkey YOUR_KEY_ID
    ```
*   **Local Configuration (for the current repository only):**
    ```bash
    git config --local user.signingkey YOUR_KEY_ID
    ```

**4. Enable Automatic Commit Signing (Optional but Recommended):**
To automatically sign all your commits, you can set a global configuration:
```bash
git config --global commit.gpgsign true
```
If you don't set this, you'll need to manually sign each commit using `git commit -S`.

**5. Sign a Commit:**
*   If `commit.gpgsign` is `true`, simply run:
    ```bash
    git commit -m "Your commit message"
    ```
    You will be prompted for your GPG passphrase.
*   If `commit.gpgsign` is `false`, manually sign with:
    ```bash
    git commit -S -m "Your commit message"
    ```

**6. Verify a Signed Commit:**
To see if a commit is signed and by whom, use:
```bash
git log --show-signature
```
You will see a "Good signature from..." message if the signature is valid and the key is trusted.

*   **`git config --global push.default current`**
    *   **What it does:** Sets the default behavior for `git push`. With `current`, `git push` will push the current branch to its upstream branch (a branch on the remote repository that it tracks).
    *   **When to use:** To simplify your push workflow. Instead of always typing `git push origin <branch-name>`, you can just type `git push` and Git will know which remote branch to push to.
    *   **How to use:**
        ```bash
        git config --global push.default current
        ```

## 2. Branching and Navigation

Branches are fundamental to Git, allowing parallel development. These commands help you manage and navigate them.

*   **`git rev-parse --abbrev-ref HEAD`**
    *   **What it does:** Displays the name of the current branch. `HEAD` refers to the current commit, and `--abbrev-ref` shows its symbolic name (the branch name) rather than the full SHA-1 hash.
    *   **When to use:** To quickly check which branch you are currently on, especially useful in scripts or when you need to confirm your context.
    *   **How to use:**
        ```bash
        git rev-parse --abbrev-ref HEAD
        ```

*   **`git rev-parse --abbrev-ref HEAD | sed 's/.*\(PATTERN-HERE\).*/\1/'`**
    *   **What it does:** Extracts a specific pattern from the current branch name using `sed`. This is useful for parsing structured branch names (e.g., feature/JIRA-123-description).
    *   **When to use:** In scripting or automation where you need to extract specific identifiers (like a ticket number) from your branch name.
    *   **How to use:** Replace `PATTERN-HERE` with your desired regular expression. For example, to extract "JIRA-123" from "feature/JIRA-123-add-feature":
        ```bash
        git rev-parse --abbrev-ref HEAD | sed 's/.*\(JIRA-[0-9]*\).*/\1/'
        ```

*   **`git config --global alias.gco = "!f() { git branch -a | grep -e $1 -m 1 | sed 's/remotes\\/origin\\///' | xargs git checkout; }; f"`**
    *   **What it does:** Creates a global Git alias named `gco` that allows you to checkout a branch by providing a partial pattern. It searches all local and remote branches, picks the first match, and checks it out.
    *   **When to use:** When you frequently switch between branches and only remember a part of the branch name, or when branch names are long and complex.
    *   **How to use:** After setting the alias, you can use it like this:
        ```bash
        git gco PATTERN-HERE
        # Example: git gco feature/my-new-feature (if your branch is feature/my-new-feature-branch)
        ```

*   **`git stash branch <branch-name>`**
    *   **What it does:** Creates a new branch from the commit that was current when the stash was created, and then applies the stashed changes to this new branch. The stash entry is then dropped.
    *   **When to use:** When you've stashed some work, and later decide that those changes should form the basis of a new feature branch, rather than being applied to the current branch.
    *   **How to use:**
        ```bash
        git stash branch new-feature-branch
        ```

## 3. Committing and History Inspection

Understanding your project's history and making changes are core Git operations.

*   **`git commit --no-verify`**
    *   **What it does:** Creates a commit, but bypasses any pre-commit hooks configured for the repository.
    *   **When to use:** Use with caution. This is typically used when a pre-commit hook is temporarily failing or when you know the changes you are committing are intentionally bypassing a specific check (e.g., committing work-in-progress that doesn't yet pass linting).
    *   **How to use:**
        ```bash
        git commit --no-verify -m "WIP: Bypassing hooks for now"
        ```

*   **`git diff --name-only`**
    *   **What it does:** Shows only the names of files that have been changed (staged or unstaged) since the last commit.
    *   **When to use:** To quickly get an overview of which files you've modified without seeing the actual content changes.
    *   **How to use:**
        ```bash
        git diff --name-only
        ```

*   **`git log --follow <file>`**
    *   **What it does:** Displays the commit history for a specific file, including commits where the file was renamed or moved. Without `--follow`, `git log` would stop tracking the file's history if it was renamed.
    *   **When to use:** To understand the complete evolution of a file, even if its path has changed over time.
    *   **How to use:**
        ```bash
        git log --follow src/main.js
        ```

*   **`git log -p --follow <file>`**
    *   **What it does:** Similar to `git log --follow`, but also shows the patch (diff) for each commit, detailing the exact changes made to the file.
    *   **When to use:** When you need to see not just *when* a file changed, but *what* changed in each commit throughout its history, including renames.
    *   **How to use:**
        ```bash
        git log -p --follow src/main.js
        ```

*   **`git show --remerge-diff`**
    *   **What it does:** (Available in Git 2.36.0 and later) When applied to a merge commit, this command shows the diff with merge conflicts and how they were resolved.
    *   **When to use:** After a merge, to review the specific changes made to resolve conflicts, providing clarity on the merge strategy.
    *   **How to use:**
        ```bash
        git show --remerge-diff <merge-commit-hash>
        ```

*   **`git log -p -Gword`**
    *   **What it does:** Finds commits where the specified "word" (or regular expression) appears in the *diff* (the actual changes made to the code).
    *   **When to use:** To pinpoint commits that introduced or modified a specific piece of code, a variable name, or a function call.
    *   **How to use:**
        ```bash
        git log -p -G"my_function_name"
        ```

*   **`git log --grep=word`**
    *   **What it does:** Finds all commits where the commit message contains the specified "word" (or regular expression).
    *   **When to use:** To search for commits related to a specific feature, bug fix, or topic based on keywords in their commit messages.
    *   **How to use:**
        ```bash
        git log --grep="bugfix"
        ```

## 4. Tagging and Utilities

Tags are used to mark specific points in history, typically for releases.

*   **`git tag -l | rg -e "2\d.\d.\d$" | sort | tail -n 10`**
    *   **What it does:** This is a pipeline of commands:
        *   `git tag -l`: Lists all tags in the repository.
        *   `rg -e "2\d.\d.\d$"`: Filters the tags using `ripgrep` (an external tool) to find those matching a pattern like "2.x.x" (e.g., 2.1.0, 2.36.0).
        *   `sort`: Sorts the filtered tags alphabetically.
        *   `tail -n 10`: Shows the last 10 entries, effectively giving you the 10 most recent "stable" looking tags based on the pattern.
    *   **When to use:** To quickly identify recent stable release tags in a repository that follows a semantic versioning scheme.
    *   **How to use:** Ensure you have `ripgrep` installed.
        ```bash
        git tag -l | rg -e "2\d.\d.\d$" | sort | tail -n 10
        ```

## 5. Essential Daily Workflow Commands

These commands are the bread and butter of a software developer's interaction with Git, covering everything from checking status to pushing changes.

*   **`git status`**
    *   **What it does:** Shows the status of your working directory and staging area. It tells you which changes have been staged, which haven't, and which files aren't being tracked by Git.
    *   **When to use:** Constantly! This is your primary way to understand the current state of your repository before committing or performing other operations.
    *   **How to use:**
        ```bash
        git status
        ```

*   **`git add <file>` / `git add .` / `git add -p`**
    *   **What it does:** Adds changes from the working directory to the staging area, preparing them for the next commit.
        *   `<file>`: Stages specific file(s).
        *   `.`: Stages all changes in the current directory and its subdirectories.
        *   `-p` (patch): Allows you to interactively select specific hunks (parts) of changes within files to stage.
    *   **When to use:** Before every commit, to select exactly what changes you want to include. `-p` is invaluable for crafting clean, focused commits.
    *   **How to use:**
        ```bash
        git add my_feature.js
        git add .
        git add -p
        ```

*   **`git commit -m "Your message"` / `git commit --amend`**
    *   **What it does:** Records the staged changes into the repository as a new commit.
        *   `-m`: Provides a commit message directly on the command line.
        *   `--amend`: Allows you to modify the most recent commit. You can change its message, add/remove files, or modify existing changes.
    *   **When to use:**
        *   `-m`: After staging changes, to finalize a logical unit of work.
        *   `--amend`: To fix a typo in the last commit message, or to add a forgotten file/change to the last commit *before* pushing it to a shared remote.
    *   **How to use:**
        ```bash
        git commit -m "Add user authentication feature"
        git commit --amend -m "Fix typo in auth feature commit message"
        ```

*   **`git branch <new-branch-name>`**
    *   **What it does:** Creates a new branch pointing to the current commit.
    *   **When to use:** To start working on a new feature, bug fix, or experiment without affecting the main codebase.
    *   **How to use:**
        ```bash
        git branch feature/new-dashboard
        ```

*   **`git switch <branch-name>` / `git checkout <branch-name>`**
    *   **What it does:** Switches your working directory to the specified branch. `git switch` is the newer, safer command for changing branches, while `git checkout` is more versatile (can also restore files).
    *   **When to use:** To move between different lines of development.
    *   **How to use:**
        ```bash
        git switch main
        git checkout feature/new-dashboard # Older but still common
        ```

*   **`git checkout -b <new-branch-name>`**
    *   **What it does:** A convenient shortcut that creates a new branch and immediately switches to it.
    *   **When to use:** When you want to start a new feature branch and jump right into it.
    *   **How to use:**
        ```bash
        git checkout -b bugfix/login-issue
        ```

*   **`git pull`**
    *   **What it does:** Fetches changes from the remote repository and automatically merges them into your current branch. It's a shortcut for `git fetch` followed by `git merge`.
    *   **When to use:** To synchronize your local branch with its upstream remote counterpart, pulling down the latest changes from collaborators.
    *   **How to use:**
        ```bash
        git pull origin main
        # Or simply: git pull (if upstream is set)
        ```

*   **`git fetch`**
    *   **What it does:** Downloads objects and refs from another repository (the remote) into your local repository. It *does not* merge or modify your local working files.
    *   **When to use:** To see what changes have occurred on the remote without integrating them into your current work. Useful for reviewing remote branches or preparing for a merge/rebase.
    *   **How to use:**
        ```bash
        git fetch origin
        ```

*   **`git push`**
    *   **What it does:** Uploads your local commits to the remote repository.
    *   **When to use:** To share your completed work with others or to back up your changes.
    *   **How to use:**
        ```bash
        git push origin feature/my-new-feature
        # Or simply: git push (if upstream is set)
        ```

*   **`git merge <branch>`**
    *   **What it does:** Integrates changes from the specified branch into your current branch.
    *   **When to use:** To combine completed feature branches into a main development branch, or to pull changes from a shared branch into your own.
    *   **How to use:**
        ```bash
        git switch main
        git merge feature/my-new-feature
        ```

*   **`git rebase <branch>`**
    *   **What it does:** Reapplies your current branch's commits on top of another base branch. This rewrites your branch's history, creating a linear history.
    *   **When to use:** To keep your feature branch up-to-date with the main branch without creating merge commits, resulting in a cleaner, linear history. Use with caution on branches that have already been pushed and shared.
    *   **How to use:**
        ```bash
        git switch feature/my-new-feature
        git rebase main
        ```

*   **`git reset --hard HEAD~1` / `git revert HEAD`**
    *   **What it does:** Both undo changes, but in different ways:
        *   `git reset --hard HEAD~1`: Moves the current branch pointer back one commit, discarding any changes in the working directory and staging area. **This rewrites history.**
        *   `git revert HEAD`: Creates a *new* commit that undoes the changes introduced by the specified commit. **This preserves history.**
    *   **When to use:**
        *   `git reset --hard`: To completely discard the last commit (and any uncommitted changes) *locally*, especially if you haven't pushed it yet. Use with extreme caution as it loses data.
        *   `git revert`: To undo a commit that has already been pushed to a shared remote, as it creates a new commit that explicitly reverses the changes, maintaining a clear history.
    *   **How to use:**
        ```bash
        git reset --hard HEAD~1 # Discard last commit
        git revert HEAD         # Create a new commit that undoes the last one
        ```

*   **`.gitignore` file**
    *   **What it does:** A plain text file in your repository's root directory that tells Git which files or directories to ignore. Git will not track these files, nor will it show them as untracked.
    *   **When to use:** To prevent unnecessary files (like build artifacts, temporary files, IDE configuration, or sensitive credentials) from being committed to the repository.
    *   **How to use:** Create a file named `.gitignore` in your project root and list patterns for files/folders to ignore.
        ```
        # Example .gitignore content
        /node_modules/
        .env
        *.log
        build/
        ```

---

These commands represent a powerful subset of Git's capabilities. By understanding their purpose and knowing when to apply them, you can navigate your project's history, manage branches, and collaborate more efficiently. Regular practice with these commands will solidify your Git proficiency and enhance your development workflow.