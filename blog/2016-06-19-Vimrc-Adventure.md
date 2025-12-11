---
slug: vimrc-adventure
title:  Adventure through my vimrc (nvimrc)
authors: ammarnajjar
date: 2016-06-19 08:38:02 +0200
tags: [neovim , vim]
---

In this post I'm going to take you in an adventure in my previously `vimrc` and currently [init.vim](https://github.com/ammarnajjar/dotfiles/blob/master/init.vim) which I collected from using [vim](http://www.vim.org/) then [neovim](https://neovim.io) along the last few years. I will explain the feature or the function, then include the configurations or code that should be inserted in the `vimrc` (`init.vim`) file to activate that feature.

<!-- truncate -->

This might not always be up to date, for I keep changing these configurations when I feel like it.

## General Configurations (neovim)
The very first section is for the general settings which I think that they should be set up in vim by default, as some of them already are default in [neovim](https://neovim.io/), which include:

- Use incremental search: this feature enables vim from highlighting the search pattern while it is being typed.

```vim
set incsearch
```

- Use fast terminal connection, this feature improves smoothness of redrawing when there are multiple windows.

```vim
set ttyfast
```

- When a file has been detected to have been changed outside of vim and it has not been changed inside of vim, automatically read it again.

```vim
set autoread
```

- Activate the wild menu for command line completion using the `TAB` key.

```vim
set wildmenu
set wildmode=longest:list,full
```

- Highlight all matches for the search pattern.

```vim
set hlsearch
```

- Vim uses history to remember command line commands that a user enters in either on of these command-lines:
  - `:` commands
  - search strings
  - expressions
  - input lines, typed for the `input()` function.
  - debug mode commands
I like to make vim remember a lot (1000) of my command history.

```vim
set history=1000
```

- Make vim behave in a more useful way (this literally exactly what is written in [vim docs](http://vimdoc.sourceforge.net/htmldoc/options.html#%27compatible%27)). It is optional to include this in one's vimrc, for when a vimrc or gvimrc file is found while Vim is starting up,	this option is enabled.

```vim
set nocompatible
```

- Make backspace erase character as other editors do.

```vim
set backspace=2
```

- When a tab character is inserted using pressing the `<TAB>` key, backspace is used to delete what was inserted, it depends on other configurations parameters `shiftwidth`.  `tabstop` and `softtabstop`.

```vim
set smarttab
```

- When starting a new line, use the same indentation from previous line. This is a very useful feature when one is coding, especially in an indent sensitive language such as python or yaml.

```vim
set autoindent
```

- Live substitution (neovim only), when replacing a pattern.

```vim
set inccommand=nosplit
```

[Go to Top](#)

## General Configurations (vim)
Another set of general configurations which are not included in [neovim](https://neovim.io/) by default. I still find them very useful.

- I don't like to use the mouse while I'm editing, still I like to enable it.

```vim
set mouse=a
```

- Show (partial) command in the last line of the screen. The [docs](http://vimdoc.sourceforge.net/htmldoc/options.html#%27showcmd%27) explain this very well so I copied that from there:
In Visual mode the size of the selected area is shown:
    - When selecting characters within a line, the number of characters. If the number of bytes is different it is also displayed: "2-6" means two characters and six bytes.
    - When selecting more than one line, the number of lines.
    - When selecting a block, the size in screen characters: `{lines}x{columns}`.

```vim
set showcmd
```

- Show the matching of a bracket when inserted, this looks like as if the cursor moved to the matching one for a small period of time to highlight it. `matchtime` is to control that time period.

```vim
set showmatch
set matchtime=2
```

- Use case insensitive when searching for a match.

```vim
set ignorecase
```

- If the search pattern contains upper case characters, override the `ignorecase` option and use case sensitive search.

```vim
set smartcase
```

- Automatically save before executing commands like `:next` and `:make`. I do use [make](https://www.gnu.org/software/make/manual/make.html) a lot, so this is very efficient.

```vim
set autowrite
```

- Hide buffers when they are abandoned, if they do not show in other windows of course. This is useful when I deal with many buffers at a time, and I don't have to worry about saving before switching.

```vim
set hidden
```

- I find modeline very useful, when I get other's code, or when I want to give others my code, I set specific settings inside the modeline to be set automatically for any other user who usees vim, the most important ones are `tabstop` and `expandtab`.

```vim
setglobal modeline
set modelines=3
```

- I like to have a minimal number of screen lines to keep above and below the cursor.

```vim
set scrolloff=3
```

- Show the mode that I am using as a message on the last line, weather it is `insert`, `visual` or `replace` mode.

```vim
set showmode
```

- Wrap text and show long lines on multiple lines without inserting line breaks.

```vim
set wrap
set linebreak
```

- Set the title of the window to the value of 'titlestring', and if empty to: filename [+==] path - vim-server-name.

```vim
set title
```

- Show line number on the left side of the document on the active line, and activate relative numbers on the rest of the lines.

```vim
set number
set relativenumber
```

- set the path to the shell to use 'bash'

```vim
set shell=/bin/bash
```

- Ignore temporary and complied files for c++, Java and Python as well as the configurations folders for the version control systems that I might use.

```vim
set wildignore=*.o,*~,*.pyc,*.class
set wildignore+=*/.git/*,*/.hg/*,*/.svn/*
```

- When joining lines, don't insert two spaces after punctuation.

```vim
set nojoinspaces
```

- Don't redraw while executing macros, this is a good performance configuration.

```vim
set lazyredraw
```

- Turn backup off. Since most stuff are within version control, I feel that these backup and swap files are just annoying so I disable them all.

```vim
set nobackup
set nowritebackup
set noswapfile
```

- Set default 1 tab == 4 spaces

```vim
set shiftwidth=4
set tabstop=4
set softtabstop=4
set smartindent
```

- Create undo file to keep history after closing the file.

```vim
set undofile
set undolevels=100
set undodir=~/.vim/undo//
```

- Remember info about open buffers on close.

```vim
set viminfo^=%
```

- Sometimes I lose track of the line that I am on, so enabling `cursorline` make it much much easier.

```vim
set cursorline
```

- Enable Omni completion.

```vim
set omnifunc=syntaxcomplete#Complete
```

- Disable the visual bell.

```vim
set t_vb=
```

- Set number of colours to be used to 256, as I like it so.

```vim
set t_Co=256
```

- Clearing uses the current background colour.

```vim
set t_ut=
```

- Set vertical Cursor in insert mode.

```vim
set guicursor=n-v-c:block,i-ci-ve:ver25,r-cr:hor20,o:hor50
  \,a:blinkwait700-blinkoff400-blinkon250-Cursor/lCursor
  \,sm:block-blinkwait175-blinkoff150-blinkon175
```

[Go to Top](#)

## Plugins Manager
For plugins, I tried many plugins managers, I used to use [vundle](https://github.com/VundleVim/Vundle.vim), and the set it up in my vimrc should have been looking like:

```vim
filetype off
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

Plugin 'VundleVim/Vundle.vim'
" add other plugins here

call vundle#end()
filetype plugin indent on
syntax on
```
Then I switched to another plugin manager called [vim-plug](https://github.com/vim-scripts/vim-plug) which is faster and do asynchronous updating for the plugins. The setup is also simpler, and works fine with both vim/neovim:

```vim
call plug#begin(s:editor_root."/plugged/")

" add plugins here
" Plug 'dev-name/repo-name'

call plug#end()
```
I am not going to discuss my favorite plugins and their configurations here, as it differs from time to time, and depends on the use of vim and the working environment. I also moved all the plugins related stuff into another file `plugs.vim`, so I don't get so distracted with them and their settings.

[Go to Top](#)

## Mappings

- Neovim terminal mode mappings, to act on terminal buffer similar to a normal vim buffer.

```vim
tnoremap <Esc> <C-\><C-n>
tnoremap <C-h> <C-\><C-n><C-w>h
tnoremap <C-j> <C-\><C-n><C-w>j
tnoremap <C-k> <C-\><C-n><C-w>k
tnoremap <C-l> <C-\><C-n><C-w>l
noremap <leader>s :split term://bash<CR><C-w><S-j><S-a>
noremap <leader>t :tabedit term://bash<CR><S-a>
```

- Many times I want to stay in visual mode when I do a shifting for a block of code, so I remapped the original keys to do the trick.

```vim
vnoremap < <gv
vnoremap > >gv
```

- Move a line of text up and down using `leader + [jk]` in both normal and visual mode.

```vim
nmap <leader>j mz:m+<cr>'z
nmap <leader>k mz:m-2<cr>'z
vmap <leader>j :m'>+<cr>`<my`>mzgv`yo`z
vmap <leader>k :m'<-2<cr>`>my`<mzgv`yo`z
```

- Switch between characters next to each other using `leader + [hl]` for I use it a lot to fix some hastly typos in normal mode.

```vim
nmap <leader>l xp
nmap <leader>h xhhp
```

- Disable highlighted matches from previous search when `leader + ENTER` is pressed.

```vim
map <silent> <leader><CR> :noh<CR>
```

- I use windows quite often, so this is a smart way to move between windows, using the `ctrl` with combination of the original vim movement keys `[hjkl]`.

```vim
map <C-j> <C-W>j
map <C-k> <C-W>k
map <C-h> <C-W>h
map <C-l> <C-W>l
```

- Open a new tab with the current buffer's path. Super useful when editing files in the same directory

```vim
map <leader>te :tabedit <c-r>=expand("%:p:h")<CR>/
```

- Switch `cwd` to the directory of the open buffer. Coupled with the previous mapping, I get a very pleasant behaviour.

```vim
map <leader>cd :cd %:p:h<CR>:pwd<CR>
```

- Open vimrc file in a new tabe mapping.

```vim
nmap <leader>ev :tabe $MYVIMRC<CR>
```

- Toggle spell checking on and off, when I am writing a paper.

```vim
map <leader>ss :setlocal spell!<cr>
```

[Go to Top](#)

## Status Line
I have a very nice status line, which I am proud of, and prefer it over status line fancy plugins. It contains some helper functions and plugins status, so if you don't use those plugins, just comment the lines for those, [Fugitive](https://github.com/tpope/vim-fugitive) and [Syntastic](https://github.com/scrooloose/syntastic).

```vim
set statusline=
set statusline=[%n]\                                            " buffer number
set statusline+=%<%.99f                                         " File name, F for full path
set statusline+=%#warningmsg#                                   " display a warning if
set statusline+=%{HasPaste()}                                   " File name, F for full path
set statusline+=%*                                              " tab chars
set statusline+=%m%r%h%w                                        " status flags
set statusline+=%#question#                                     " Display a warning if
set statusline+=%{(&fenc!='utf-8'&&&fenc!='')?'['.&fenc.']':''} " file encoding isnt
set statusline+=%*                                              " utf-8
set statusline+=%#warningmsg#                                   " display a warning if
set statusline+=%{StatuslineTabWarning()}                       " files contains
set statusline+=%*                                              " tab chars
set statusline+=%#question#                                     " Display a warning if
set statusline+=%{fugitive#statusline()}                        " Fugitive
set statusline+=%*                                              " tab chars
set statusline+=%=                                              " right align remainder
set statusline+=%{SyntasticStatuslineFlag()}                    " Syntastic
set statusline+=%y                                              " buffer file type
set statusline+=%#directory#                                    " display a warning if
set statusline+=%{&ff!='unix'?'['.&ff.']':''}                   " fileformat isnt
set statusline+=%*                                              " unix
set statusline+=%c%V,%l/                                        " column and row Number
set statusline+=%L\ %P                                          " total lines, position in file
set laststatus=2
```

I like to change the color of the statusline to blue when I go insert mode, and this is done by the following lines:

```vim
autocmd InsertEnter * highlight StatusLine term=reverse ctermbg=Blue gui=bold guifg=White guibg=Blue
autocmd InsertLeave * highlight StatusLine term=reverse ctermfg=254 ctermbg=238 gui=bold guifg=White guibg=Black
```

[Go to Top](#)

## Useful Functions
- Delete trailing white space on save, for all filetypes except markdown, for sometimes, I need to leave two spaces at the end of the line to make a soft line break.

```vim
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
```

- Convenient command to see the difference between the current buffer and the file it was loaded from, thus the changes you made.

```vim
if !exists(":Diff")
    command DiffOrig vert new | set bt=nofile | r ++edit # | 0d_ | diffthis
                \ | wincmd p | diffthis
endif
```

- Return to last edit position when opening files (You want this!)

```vim
autocmd BufReadPost *
            \ if line("'\"") > 0 && line("'\"") <= line("$") |
            \   exe "normal! g`\"" |
            \ endif
```

- Visual mode pressing `*` or `#` searches for the current selection.

```vim
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
```

- Java compile using javac and run using java applied on the current buffer. Useful for small java programs to run on the fly.

```vim
function! CompileAndRunJava()
    :w!
    setlocal makeprg=javac\ %
    setlocal errorformat=%A%f:%l:\ %m,%-Z%p^,%-C%.%#
    :make
    " split source filename by . and pass the first part to java
    :!i=%; echo ${i//.*/}|xargs java
endfunction
```

- In my status line, I use some functions. One is to get the state of the current buffer, weather it uses tabs or spaces.

```vim
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
```

- This is to checks if paste mode is enabled, I like to see that in my statusline as well.

```vim
function! HasPaste()
    if &paste
        return '[PASTE]'
    else
        return ''
    endif
endfunction
```

- Don't close window, when deleting a buffer.

```vim
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
```

- As everyone has his own standards for using either tabs or spaces, this function allow toggling between tabs and spaces, so ease the hussle.

```vim
function! TabToggle()
    if &expandtab
        set noexpandtab
        retab!
    else
        set expandtab
        retab
    endif
endfunction
```

- Show red highlighting on ColumnColor 80.


```vim
function! g:ToggleColorColumn()
  if &colorcolumn != ''
    setlocal colorcolumn&
  else
    setlocal colorcolumn=80
  endif
endfunction
nnoremap <silent> <leader>cc :call g:ToggleColorColumn()<CR>
```

- Many times when I search for a regex, I wanted to copy all the existing matches and paste them somewhere else, that's why I use this function.
  - `:CopyMatches` to copy all matches to the clipboard.
  - `:CopyMatches x` where `x` is any register to hold the result.
  - paste from register x with `"xp` or `"xP`.

```vim
function! CopyMatches(reg)
    let hits = []
    %s//\=len(add(hits, submatch(0))) ? submatch(0) : ''/ge
    let reg = empty(a:reg) ? '+' : a:reg
    execute 'let @'.reg.' = join(hits, "\n") . "\n"'
endfunction
command! -register CopyMatches call CopyMatches(<q-reg>)
```

- Append modeline after last line in buffer.

```vim
function! AppendModeline()
  let l:modeline = printf(" vim: set ft=%s ts=%d sw=%d %set %sai : ",
        \ &filetype, &tabstop, &shiftwidth, &expandtab ? '' : 'no', &autoindent ? '' : 'no')
  let l:modeline = substitute(&commentstring, "%s", l:modeline, "")
  call append(line("$"), l:modeline)
endfunction
nnoremap <silent> <Leader>ml :call AppendModeline()<CR>
```

- Realign buffers when iterm goes fullscreen

```vim
augroup FixProportionsOnResize
  au!
  au VimResized * exe "normal! \<c-w>="
augroup END
```

- Highlight all instances of word under cursor, when idle. Useful when studying strange source code. Type `z/` to toggle highlighting on/off.

```vim
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
```

All information for vim commands can be found using the help system in vim by typing `:help command` or look at the online [docs](http://vimdoc.sourceforge.net/htmldoc/options.html) for they are very plain and clear.
The complete set of my vimrc is on my [github](https://github.com/ammarnajjar/dotfiles/blob/master/init.vim). There I use one [repo](https://github.com/ammarnajjar/dotfiles) for all my dotfiles, bash and tmux configutaions.

Feel free to suggest improvements.

[Go to Top](#)
