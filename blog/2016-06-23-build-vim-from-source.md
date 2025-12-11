---
slug: build-vim-from-source
title: Build Vim from Source
authors: ammarnajjar
date: 2016-06-23 18:22:02 +0200
tags: [vim]
---

Many times when I want to use vim which comes within the main repo of any Linux distro, I find that it is missing some kind of support, either python or client-server mode, or any other feature. And there for I have to build it manually from source and install it.

<!-- truncate -->

In this post, I show the steps to do that on fedora, as it is my current distro. I had to collect the steps from many resources including [vimdoc](http://vimdoc.sourceforge.net/htmldoc/), [vim-wiki](http://vim.wikia.com/wiki/Building_Vim) and many stackoverflow answers and blogs. So I wanted to blog these steps to come back to them anytime I need to build vim from source with:

- Python3 support.
- Ruby support.
- Lua support.
- Perl support.

<script src="https://gist.github.com/ammarnajjar/dd612a063194adea8699667f0c9161e1.js"></script>

In case python-2.7 is needed instead of python3, just replace them in the config lines:

```bash
	--enable-pythoninterp                               \
	--with-python-config-dir=/usr/lib/python2.7/config  \
```

<a href="#" class="go-to-top">Go to Top</a>