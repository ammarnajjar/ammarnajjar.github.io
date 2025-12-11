---
slug: fetch-with-gitlab-api
title: Fetch using Gitlab API
authors: ammarnajjar
date: 2019-02-19 15:34:35 +0200
tags: [python, git, gitlab]
---
import Gist from 'react-gist';

# Fetch using Gitlab API

## Motivation

I use [gitlab](https://about.gitlab.com/), and I have many repos that I need to track on daily basis, or even more than once per day. I found it so tyring first of all to clone all those repos when I change my working machine, and then to keep all these repos up to date. For that reason I began to write an automation script to do the boring tasks of my shoulders.

<!-- truncate -->

## Process

I started with a simple bash script, which go through a for-loop and do the stuff, where the paths of the repos must be hard-coded.

<Gist id="37c649e0ed2289187e330ed351b42f68" file="main.sh" />

This was fast and worked for a while, but when I got to work with multiple projects, and my co-workers added/removed/renamed a repo, it was sill manual work to update the script, and as boring as I am, I did not like it, and looked for a lazy way to automate the process, and opened the Gitlab [API-Documentation](https://docs.gitlab.com/ee/api/), where the fun started.

## Solution Idea

A python script to talk to the gitlab API, and use the [`/projects`](https://docs.gitlab.com/ee/api/#project-resources) end point to access the repos.

### Requirements:

- Gtilab [Token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#personal-access-tokens): create a private token first to use it accessing the API as explained in the [docs](https://docs.gitlab.com/ee/api/#personal-access-tokens).
- Virtual access to the repos (e.g.: gitlab.com)

#### Optional:

- [Pipenv](https://github.com/pypa/pipenv) to install the dev-dependencies:

```bash
brew install pipenv
```

### First Try: [argparse](https://docs.python.org/3/library/argparse.html)

The first try was to pass the options as arguments to the script:

<Gist id="37c649e0ed2289187e330ed351b42f68" file="main-args.py" />

#### Usage:

```bash
usage: main.py [-h] [--token TOKEN] [--url URL]

optional arguments:
  -h, --help            show this help message and exit
  --token TOKEN, -t TOKEN
                        Gitlab private Token
  --url URL, -u URL     Gitlab URL<Paste>
```

### Second Try: [JSON](https://docs.python.org/3/library/json.html?highlight=json#module-json)

Then I thought that the configurations must be more flexible, so the use of a separate config file make sense.

Full project repository can be found [here](https://github.com/ammarnajjar/fetch-from-gitlab)

<Gist id="37c649e0ed2289187e330ed351b42f68" file="main.py" />

#### Usage

```bash
python main.py
```

<a href="#" class="go-to-top">Go to Top</a>