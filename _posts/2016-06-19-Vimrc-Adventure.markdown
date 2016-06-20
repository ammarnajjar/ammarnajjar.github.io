---
layout: post
title:  "Adventure through my vimrc"
date:   2016-06-19 08:38:02 +0200
categories: editors
tags: editors vim vimrc
---
<a name="Top" />

In this post I'm going to take you in an adventure in my [vimrc](https://github.com/ammarnajjar/dotfiles/blob/master/init.vim) which I collected from using [vim](http://www.vim.org/) along the last few years. I will explain the feature or the function, then include the configurations or code that should be inserted in the vimrc file to activate that feature.  

## Contents:
- [General Configurations (neovim)](#General Configurations (neovim))
- [General Configurations (vim)](#General Configurations (vim))
- [Plugins Manager](#Plugins)
- [Mappings](#Mappings)
- [Status Line](#Status Line)
- [Useful Functions](#Useful Functions)

<a name="General Configurations (neovim)" />

## General Configurations (neovim)
The very first section is for the general settings which I think that they should be set up in vim by default, as some of them already are default in [neovim](https://neovim.io/), which include:

- Use incremental search: this feature enables vim from highlighting the search pattern while it is being typed. 
{% highlight vim %}
set incsearch
{% endhighlight %}

- Use fast terminal connection, this feature improves smoothness of redrawing when there are multiple windows.
{% highlight vim %}
set ttyfast
{% endhighlight %}

- When a file has been detected to have been changed outside of vim and it has not been changed inside of vim, automatically read it again.
{% highlight vim %}
set autoread
{% endhighlight %}

- Activate the wild menu for command line completion using the `TAB` key.
{% highlight vim %}
set wildmenu
set wildmode=longest:list,full
{% endhighlight %}

- Highlight all matches for the search pattern.
{% highlight vim %}
set hlsearch
{% endhighlight %}

- Vim uses history to remember command line commands that a user enters in either on of these command-lines:
  - `:` commands
  - search strings
  - expressions
  - input lines, typed for the `input()` function.
  - debug mode commands
I like to make vim remember a lot (1000) of my command history.
{% highlight vim %}
set history=1000
{% endhighlight %}

- Make vim behave in a more useful way (this literally exactly what is written in [vim docs](http://vimdoc.sourceforge.net/htmldoc/options.html#%27compatible%27)). It is optional to include this in one's vimrc, for when a vimrc or gvimrc file is found while Vim is starting up,	this option is enabled.
{% highlight vim %}
set nocompatible
{% endhighlight %}

- Make backspace erase character as other editors do.
{% highlight vim %}
set backspace=2
{% endhighlight %}

- When a tab character is inserted using pressing the <TAB> key, backspace is used to delete what was inserted, it depends on other configurations parameters `shiftwidth`.  `tabstop` and `softtabstop`.
{% highlight vim %}
set smarttab
{% endhighlight %}

- When starting a new line, use the same indentation from previous line. This is a very useful feature when one is coding, especially in an indent sensitive language such as python or yaml.
{% highlight vim %}
set autoindent
{% endhighlight %}

[Go to Top](#Top) 

<a name="General Configurations (vim)" />

## General Configurations (vim)
Another set of general configurations which are not included in [neovim](https://neovim.io/) by default. I still find them very useful.

- I don't like to use the mouse while I'm editing, so I like to disable it.
{% highlight vim %}
set mouse=
{% endhighlight %}

- Show (partial) command in the last line of the screen. The [docs](http://vimdoc.sourceforge.net/htmldoc/options.html#%27showcmd%27) explain this very well so I copied that from there:  
In Visual mode the size of the selected area is shown:
  - When selecting characters within a line, the number of characters. If the number of bytes is different it is also displayed: "2-6" means two characters and six bytes.
  - When selecting more than one line, the number of lines.
  - When selecting a block, the size in screen characters: {lines}x{columns}.
{% highlight vim %}
set showcmd
{% endhighlight %}


- Show the matching of a bracket when inserted, this looks like as if the cursor moved to the matching one for a small period of time to highlight it. `matchtime` is to control that time period.
{% highlight vim %}
set showmatch
set matchtime=2
{% endhighlight %}

- Use case insensitive when searching for a match.
{% highlight vim %}
set ignorecase
{% endhighlight %}

- If the search pattern contains upper case characters, override the `ignorecase` option and use case sensitive search.
{% highlight vim %}
set smartcase
{% endhighlight %}


- Automatically save before executing commands like `:next` and `:make`. I do use [make](https://www.gnu.org/software/make/manual/make.html) a lot, so this is very efficient.
{% highlight vim %}
set autowrite
{% endhighlight %}

- Hide buffers when they are abandoned, if they do not show in other windows of course. This is useful when I deal with many buffers at a time, and I don't have to worry about saving before switching.
{% highlight vim %}
set hidden
{% endhighlight %}

- I find modeline very useful, when I get other's code, or when I want to give others my code, I set specific settings inside the modeline to be set automatically for any other user who usees vim, the most important ones are `tabstop` and `expandtab`.
{% highlight vim %}
setglobal modeline
set modelines=3
{% endhighlight %}

- I like to have a minimal number of screen lines to keep above and below the cursor.
{% highlight vim %}
set scrolloff=3
{% endhighlight %}


- Show the mode that I am using as a message on the last line, weather it is `insert`, `visual` or `replace` mode.
{% highlight vim %}
set showmode
{% endhighlight %}

- Wrap text and show long lines on multiple lines without inserting line breaks.
{% highlight vim %}
set wrap
set linebreak
{% endhighlight %}

- Set the title of the window to the value of 'titlestring', and if empty to: filename [+==] path - vim-server-name.
{% highlight vim %}
set title
{% endhighlight %}

- Show line number on the left side of the document on the active line, and activate relative numbers on the rest of the lines.
{% highlight vim %}
set number
set relativenumber
{% endhighlight %}

- set the path to the shell to use 'bash'
{% highlight vim %}
set shell=/bin/bash
{% endhighlight %}

- Ignore temporary and complied files for c++, Java and Python as well as the configurations folders for the version control systems that I might use.
{% highlight vim %}
set wildignore=*.o,*~,*.pyc,*.class
set wildignore+=*/.git/*,*/.hg/*,*/.svn/*
{% endhighlight %}

- When joining lines, don't insert two spaces after punctuation.
{% highlight vim %}
set nojoinspaces
{% endhighlight %}

- Don't redraw while executing macros, this is a good performance configuration.
{% highlight vim %}
set lazyredraw
{% endhighlight %}

{% highlight vim %}
{% endhighlight %}

- Turn backup off. Since most stuff are within version control, I feel that these backup and swap files are just annoying so I disable them all.
{% highlight vim %}
set nobackup
set nowritebackup
set noswapfile
{% endhighlight %}

- Set default 1 tab == 4 spaces
{% highlight vim %}
set shiftwidth=4
set tabstop=4
set softtabstop=4
set smartindent
{% endhighlight %}

- Create undo file to keep history after closing the file.
{% highlight vim %}
set undofile
set undolevels=100
set undodir=~/.vim/undo//
{% endhighlight %}

- Remember info about open buffers on close.
{% highlight vim %}
set viminfo^=%
{% endhighlight %}

- Sometimes I lose track of the line that I am on, so enabling `cursorline` make it much much easier.
{% highlight vim %}
set cursorline
{% endhighlight %}

- Enable Omni completion.
{% highlight vim %}
set omnifunc=syntaxcomplete#Complete
{% endhighlight %}

- Disable the visual bell.
{% highlight vim %}
set t_vb=
{% endhighlight %}

- Set number of colours to be used to 256, as I like it so.
{% highlight vim %}
set t_Co=256
{% endhighlight %}

- Clearing uses the current background colour.
{% highlight vim %}
set t_ut=
{% endhighlight %}

[Go to Top](#Top) 

<a name="Plugins" />

## Plugins Manager
For plugins, I tried many plugins managers and found that [vundle](https://github.com/VundleVim/Vundle.vim) is my favourite, so I set it up in my vimrc:
{% highlight vim %}
filetype off
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

Plugin 'VundleVim/Vundle.vim'
" add other plugins here

call vundle#end()
filetype plugin indent on
syntax on
{% endhighlight %}
I am not going to discuss my favourite plugins and their configurations here, as it differs from time to time, and depends on the use of vim and the environment.

[Go to Top](#Top) 

<a name="Mappings" />

## Mappings
- Many times I want to stay in visual mode when I do a shifting for a block of code, so I remapped the original keys to do the trick.
{% highlight vim %}
vnoremap < <gv
vnoremap > >gv
{% endhighlight %}

- Move a line of text up and down using `leader + [jk]` in both normal and visual mode.
{% highlight vim %}
nmap <leader>j mz:m+<cr>'z
nmap <leader>k mz:m-2<cr>'z
vmap <leader>j :m'>+<cr>`<my`>mzgv`yo`z
vmap <leader>k :m'<-2<cr>`>my`<mzgv`yo`z
{% endhighlight %}

- Switch between characters next to each other using `leader + [hl]` for I use it a lot to fix some hastly typos in normal mode.
{% highlight vim %}
nmap <leader>l xp
nmap <leader>h xhhp
{% endhighlight %}

- Disable highlighted matches from previous search when `leader + ENTER` is pressed.
{% highlight vim %}
map <silent> <leader><CR> :noh<CR>
{% endhighlight %}

- I use windows quite often, so this is a smart way to move between windows, using the `ctrl` with combination of the original vim movement keys `[hjkl]`.
{% highlight vim %}
map <C-j> <C-W>j
map <C-k> <C-W>k
map <C-h> <C-W>h
map <C-l> <C-W>l
{% endhighlight %}

- Open a new tab with the current buffer's path. Super useful when editing files in the same directory
{% highlight vim %}
map <leader>te :tabedit <c-r>=expand("%:p:h")<CR>/
{% endhighlight %}

- Switch `cwd` to the directory of the open buffer. Coupled with the previous mapping, I get a very pleasant behaviour.
{% highlight vim %}
map <leader>cd :cd %:p:h<CR>:pwd<CR>
{% endhighlight %}

- Open vimrc file in a new tabe mapping.
{% highlight vim %}
nmap <leader>ev :tabe $MYVIMRC<CR>
{% endhighlight %}

- Toggle spell checking on and off, when I am writing a paper.
{% highlight vim %}
map <leader>ss :setlocal spell!<cr>
{% endhighlight %}

[Go to Top](#Top) 

<a name="Status Line" />

## Status Line 
I have a very nice status line, which I am proud of, and prefer it over status line fancy plugins, of course it contains some plugins status, so if you don't use those famous plugins, just comment the lines for those, basically [Fugitive](https://github.com/tpope/vim-fugitive) and [Syntastic](https://github.com/scrooloose/syntastic).
{% highlight vim %}
set statusline =
set statusline =[%n]\                                           " buffer number
set statusline +=%<%.99f                                        " File name, F for full path
set statusline +=%m%r%h%w                                       " status flags
set statusline+=%#question#                                     " Display a warning if
set statusline+=%{(&fenc!='utf-8'&&&fenc!='')?'['.&fenc.']':''} " file encoding isnt
set statusline+=%*                                              " utf-8
set statusline+=%#warningmsg#                                   " display a warning if
set statusline+=%{StatuslineTabWarning()}                       " files contains
set statusline+=%*                                              " tab chars
set statusline +=%{fugitive#statusline()}                       " Fugitive
set statusline +=%=                                             " right align remainder
set statusline +=%{SyntasticStatuslineFlag()}                   " Syntastic
set statusline +=%y                                             " buffer file type
set statusline+=%#directory#                                    " display a warning if
set statusline+=%{&ff!='unix'?'['.&ff.']':''}                   " fileformat is not
set statusline+=%*                                              " unix
set statusline +=%c%V,%l/                                       " column and row Number
set statusline +=%L\ %P                                         " total lines, position in file
set laststatus=2
{% endhighlight %}

[Go to Top](#Top) 

<a name="Useful Functions" />

## Useful Functions
- Delete trailing white space on save, for all filetypes except markdown, for sometimes, I need to leave two spaces at the end of the line to make a soft line break.
{% highlight vim %}
func! DeleteTrailingWS()
    " Don't strip on these filetypes
    if &ft =~ 'markdown'
        return
    endif
    exe "normal mz"
    %s/\s\+$//ge
    exe "normal `z"
endfunc
autocmd BufWrite *.* :call DeleteTrailingWS()
{% endhighlight %}

- Convenient command to see the difference between the current buffer and the file it was loaded from, thus the changes you made. 
{% highlight vim %}
if !exists(":Diff")
    command DiffOrig vert new | set bt=nofile | r ++edit # | 0d_ | diffthis
                \ | wincmd p | diffthis
endif
{% endhighlight %}

- Return to last edit position when opening files (You want this!)
{% highlight vim %}
autocmd BufReadPost *
            \ if line("'\"") > 0 && line("'\"") <= line("$") |
            \   exe "normal! g`\"" |
            \ endif
{% endhighlight %}

- Visual mode pressing `*` or `#` searches for the current selection.
{% highlight vim %}
vnoremap <silent> * :call VisualSelection('f')<CR>
vnoremap <silent> # :call VisualSelection('b')<CR>

function! CmdLine(str)
    exe "menu Foo.Bar :" . a:str
    emenu Foo.Bar
    unmenu Foo
endfunction

function! VisualSelection(direction) range
    let l:saved_reg = @"
    execute "normal! vgvy"

    let l:pattern = escape(@", '\\/.*$^~[]')
    let l:pattern = substitute(l:pattern, "\n$", "", "")

    if a:direction == 'b'
        execute "normal ?" . l:pattern . "^M"
    elseif a:direction == 'gv'
        call CmdLine("vimgrep " . '/'. l:pattern . '/' . ' **/*.')
    elseif a:direction == 'replace'
        call CmdLine("%s" . '/'. l:pattern . '/')
    elseif a:direction == 'f'
        execute "normal /" . l:pattern . "^M"
    endif

    let @/ = l:pattern
    let @" = l:saved_reg
endfunction
{% endhighlight %}

- Java compile using javac and run using java applied on the current buffer. Useful for small java programs to run on the fly.
{% highlight vim %}
function! CompileAndRunJava()
    :w!
    setlocal makeprg=javac\ %
    setlocal errorformat=%A%f:%l:\ %m,%-Z%p^,%-C%.%#
    :make
    " split source filename by . and pass the first part to java
    :!i=%; echo ${i//.*/}|xargs java
endfunction
{% endhighlight %}

- Returns true if paste mode is enabled.
{% highlight vim %}
function! HasPaste()
    if &paste
        return 'PASTE MODE  '
    en
    return ''
endfunction
{% endhighlight %}

- Don't close window, when deleting a buffer.
{% highlight vim %}
command! Bclose call <SID>BufcloseCloseIt()
function! <SID>BufcloseCloseIt()
    let l:currentBufNum = bufnr("%")
    let l:alternateBufNum = bufnr("#")

    if buflisted(l:alternateBufNum)
        buffer #
    else
        bnext
    endif

    if bufnr("%") == l:currentBufNum
        new
    endif

    if buflisted(l:currentBufNum)
        execute("bdelete! ".l:currentBufNum)
    endif
endfunction
{% endhighlight %}

- As everyone has his own standards for using either tabs or spaces, this function allow toggling between tabs and spaces, so ease the hussle.
{% highlight vim %}
function! Retab()
    :retab
    :%s/\s\+$//
endfunction

function! TabToggle()
    if &expandtab
        set noexpandtab
        retab!
    else
        set expandtab
        retab
    endif
endfunction
{% endhighlight %}

- Show red highlighting on ColumnColor 80.
{% highlight vim %}
function! g:ToggleColorColumn()
  if &colorcolumn != ''
    setlocal colorcolumn&
  else
    setlocal colorcolumn=80
  endif
endfunction
nnoremap <silent> <leader>cc :call g:ToggleColorColumn()<CR>
{% endhighlight %}

- Many times when I search for a regex, I wanted to copy all the existing matches and paste them somewhere else, that's why I use this function.  
  - `:CopyMatches` to copy all matches to the clipboard.  
  - `:CopyMatches x` where `x` is any register to hold the result.  
  - paste from register x with `"xp` or `"xP`.
{% highlight vim %}
function! CopyMatches(reg)
    let hits = []
    %s//\=len(add(hits, submatch(0))) ? submatch(0) : ''/ge
    let reg = empty(a:reg) ? '+' : a:reg
    execute 'let @'.reg.' = join(hits, "\n") . "\n"'
endfunction
command! -register CopyMatches call CopyMatches(<q-reg>)
{% endhighlight %}

- Append modeline after last line in buffer.
{% highlight vim %}
function! AppendModeline()
  let l:modeline = printf(" vim: set ft=%s ts=%d sw=%d %set %sai : ",
        \ &filetype, &tabstop, &shiftwidth, &expandtab ? '' : 'no', &autoindent ? '' : 'no')
  let l:modeline = substitute(&commentstring, "%s", l:modeline, "")
  call append(line("$"), l:modeline)
endfunction
nnoremap <silent> <Leader>ml :call AppendModeline()<CR>
{% endhighlight %}

- Realign buffers when iterm goes fullscreen
{% highlight vim %}
augroup FixProportionsOnResize
  au!
  au VimResized * exe "normal! \<c-w>="
augroup END
{% endhighlight %}

- Highlight all instances of word under cursor, when idle. Useful when studying strange source code. Type `z/` to toggle highlighting on/off.
{% highlight vim %}
nnoremap z/ :if AutoHighlightToggle()<Bar>set hls<Bar>endif<CR>
function! AutoHighlightToggle()
  let @/ = ''
  if exists('#auto_highlight')
    au! auto_highlight
    augroup! auto_highlight
    setl updatetime=100
    echo 'Highlight current word: off'
    return 0
  else
    augroup auto_highlight
      au!
      au CursorHold * let @/ = '\V\<'.escape(expand('<cword>'), '\').'\>'
    augroup end
    setl updatetime=100
    echo 'Highlight current word: ON'
    return 1
  endif
endfunction
{% endhighlight %}

- In my status line, I use this function to get the state of the current buffer, weather it uses tabs or spaces.
{% highlight vim %}
function! StatuslineTabWarning()
    if !exists("b:statusline_tab_warning")
        let tabs = search('^\t', 'nw') != 0
        if tabs
            let b:statusline_tab_warning = '[tabs]'
        else
            let b:statusline_tab_warning = ''
        endif
    endif
    return b:statusline_tab_warning
endfunction
autocmd cursorhold,bufwritepost * unlet! b:statusline_tab_warning
{% endhighlight %}

All information for vim commands can be found using the help system in vim by typing `:help command` or look at the online [docs](http://vimdoc.sourceforge.net/htmldoc/options.html) for they are very plain and clear.  
The complete set of my vimrc is on my [github](https://github.com/ammarnajjar/dotfiles/blob/master/init.vim). There I use one [repo](https://github.com/ammarnajjar/dotfiles) for all my dotfiles, bash and tmux configutaions. Feel free to suggest improvements.

[Go to Top](#Top) 
