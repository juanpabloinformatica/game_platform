let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/Documents/NewProject
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +15 backend/pkg/game/reactionGame/reactionGame.go
badd +13 backend/pkg/game/game.go
badd +68 backend/pkg/server/server.go
badd +47 backend/pkg/server/controllers.go
badd +10 backend/pkg/server/endpoints.go
badd +9 frontend/src/pages/ReactionGameConfig.tsx
badd +42 frontend/src/services/games/reactionGame/reactionGameServices.ts
badd +67 frontend/src/hooks/pages/reactionGameConfig/ReactionGameConfigStates.ts
argglobal
%argdel
$argadd .
edit backend/pkg/game/reactionGame/reactionGame.go
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd _ | wincmd |
split
1wincmd k
wincmd w
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe '1resize ' . ((&lines * 30 + 32) / 64)
exe 'vert 1resize ' . ((&columns * 158 + 158) / 317)
exe '2resize ' . ((&lines * 31 + 32) / 64)
exe 'vert 2resize ' . ((&columns * 158 + 158) / 317)
exe 'vert 3resize ' . ((&columns * 158 + 158) / 317)
argglobal
balt backend/pkg/game/game.go
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 38 - ((16 * winheight(0) + 15) / 30)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 38
normal! 022|
lcd ~/Documents/NewProject
wincmd w
argglobal
if bufexists(fnamemodify("~/Documents/NewProject/frontend/src/pages/ReactionGameConfig.tsx", ":p")) | buffer ~/Documents/NewProject/frontend/src/pages/ReactionGameConfig.tsx | else | edit ~/Documents/NewProject/frontend/src/pages/ReactionGameConfig.tsx | endif
if &buftype ==# 'terminal'
  silent file ~/Documents/NewProject/frontend/src/pages/ReactionGameConfig.tsx
endif
balt ~/Documents/NewProject/frontend/src/hooks/pages/reactionGameConfig/ReactionGameConfigStates.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 28 - ((1 * winheight(0) + 15) / 31)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 28
normal! 013|
lcd ~/Documents/NewProject
wincmd w
argglobal
if bufexists(fnamemodify("~/Documents/NewProject/backend/pkg/server/controllers.go", ":p")) | buffer ~/Documents/NewProject/backend/pkg/server/controllers.go | else | edit ~/Documents/NewProject/backend/pkg/server/controllers.go | endif
if &buftype ==# 'terminal'
  silent file ~/Documents/NewProject/backend/pkg/server/controllers.go
endif
balt ~/Documents/NewProject/backend/pkg/game/reactionGame/reactionGame.go
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
16,18fold
21,22fold
20,27fold
64,73fold
let &fdl = &fdl
20
normal! zo
21
normal! zo
20
normal! zc
let s:l = 40 - ((39 * winheight(0) + 31) / 62)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 40
normal! 014|
lcd ~/Documents/NewProject
wincmd w
3wincmd w
exe '1resize ' . ((&lines * 30 + 32) / 64)
exe 'vert 1resize ' . ((&columns * 158 + 158) / 317)
exe '2resize ' . ((&lines * 31 + 32) / 64)
exe 'vert 2resize ' . ((&columns * 158 + 158) / 317)
exe 'vert 3resize ' . ((&columns * 158 + 158) / 317)
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
nohlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
