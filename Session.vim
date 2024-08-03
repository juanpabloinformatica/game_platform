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
badd +263 backend/pkg/game/reactionGame/reactionGame.go
badd +16 backend/pkg/game/gameMessages.go
badd +74 backend/pkg/server/controllers.go
badd +1 backend/pkg/server/endpoints.go
badd +60 backend/pkg/server/server.go
badd +47 backend/pkg/game/game.go
badd +49 frontend/src/pages/ReactionGameConfig.tsx
badd +10 backend/pkg/game/reactionGame/reactionGameUtils.go
badd +54 frontend/src/services/games/reactionGame/reactionGameServices.ts
badd +1 backend/pkg/game/reactionGame/reactionGameMessages.go
badd +65 frontend/src/hooks/pages/reactionGameConfig/ReactionGameConfigStates.ts
badd +18 frontend/src/games/reactionGame/ReactionGame.tsx
badd +152 frontend/src/games/reactionGame/logic/reaction_game_socket_react.tsx
badd +1 ~/Documents/NewProject
badd +23 ~/Documents/Learning/AboutPc/nand2tetris/projects/1/And16.hdl
badd +1 frontend/src/games/utils.ts
badd +7 backend/pkg/game/gameUtils.go
badd +1 auth/src/server/controllers.ts
argglobal
%argdel
$argadd ~/Documents/NewProject
edit frontend/src/games/reactionGame/ReactionGame.tsx
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
wincmd _ | wincmd |
split
1wincmd k
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
wincmd w
wincmd _ | wincmd |
vsplit
1wincmd h
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
exe '1resize ' . ((&lines * 21 + 24) / 49)
exe 'vert 1resize ' . ((&columns * 79 + 119) / 238)
exe '2resize ' . ((&lines * 25 + 24) / 49)
exe 'vert 2resize ' . ((&columns * 79 + 119) / 238)
exe '3resize ' . ((&lines * 22 + 24) / 49)
exe 'vert 3resize ' . ((&columns * 79 + 119) / 238)
exe '4resize ' . ((&lines * 22 + 24) / 49)
exe 'vert 4resize ' . ((&columns * 78 + 119) / 238)
exe '5resize ' . ((&lines * 24 + 24) / 49)
exe 'vert 5resize ' . ((&columns * 79 + 119) / 238)
exe '6resize ' . ((&lines * 24 + 24) / 49)
exe 'vert 6resize ' . ((&columns * 78 + 119) / 238)
argglobal
balt frontend/src/games/utils.ts
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
let s:l = 21 - ((13 * winheight(0) + 10) / 21)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 21
normal! 010|
lcd ~/Documents/NewProject
wincmd w
argglobal
if bufexists(fnamemodify("~/Documents/NewProject/frontend/src/services/games/reactionGame/reactionGameServices.ts", ":p")) | buffer ~/Documents/NewProject/frontend/src/services/games/reactionGame/reactionGameServices.ts | else | edit ~/Documents/NewProject/frontend/src/services/games/reactionGame/reactionGameServices.ts | endif
if &buftype ==# 'terminal'
  silent file ~/Documents/NewProject/frontend/src/services/games/reactionGame/reactionGameServices.ts
endif
balt ~/Documents/NewProject/frontend/src/games/reactionGame/logic/reaction_game_socket_react.tsx
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
let s:l = 53 - ((12 * winheight(0) + 12) / 25)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 53
normal! 015|
lcd ~/Documents/NewProject
wincmd w
argglobal
if bufexists(fnamemodify("~/Documents/NewProject/backend/pkg/server/controllers.go", ":p")) | buffer ~/Documents/NewProject/backend/pkg/server/controllers.go | else | edit ~/Documents/NewProject/backend/pkg/server/controllers.go | endif
if &buftype ==# 'terminal'
  silent file ~/Documents/NewProject/backend/pkg/server/controllers.go
endif
balt ~/Documents/NewProject/backend/pkg/server/server.go
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
let s:l = 74 - ((9 * winheight(0) + 11) / 22)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 74
normal! 05|
lcd ~/Documents/NewProject
wincmd w
argglobal
if bufexists(fnamemodify("~/Documents/NewProject/backend/pkg/game/reactionGame/reactionGame.go", ":p")) | buffer ~/Documents/NewProject/backend/pkg/game/reactionGame/reactionGame.go | else | edit ~/Documents/NewProject/backend/pkg/game/reactionGame/reactionGame.go | endif
if &buftype ==# 'terminal'
  silent file ~/Documents/NewProject/backend/pkg/game/reactionGame/reactionGame.go
endif
balt ~/Documents/NewProject/backend/pkg/game/game.go
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
let s:l = 267 - ((0 * winheight(0) + 11) / 22)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 267
normal! 033|
lcd ~/Documents/NewProject
wincmd w
argglobal
if bufexists(fnamemodify("~/Documents/NewProject/backend/pkg/game/game.go", ":p")) | buffer ~/Documents/NewProject/backend/pkg/game/game.go | else | edit ~/Documents/NewProject/backend/pkg/game/game.go | endif
if &buftype ==# 'terminal'
  silent file ~/Documents/NewProject/backend/pkg/game/game.go
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
let &fdl = &fdl
let s:l = 46 - ((0 * winheight(0) + 12) / 24)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 46
normal! 0
lcd ~/Documents/NewProject
wincmd w
argglobal
if bufexists(fnamemodify("~/Documents/NewProject/backend/pkg/game/gameMessages.go", ":p")) | buffer ~/Documents/NewProject/backend/pkg/game/gameMessages.go | else | edit ~/Documents/NewProject/backend/pkg/game/gameMessages.go | endif
if &buftype ==# 'terminal'
  silent file ~/Documents/NewProject/backend/pkg/game/gameMessages.go
endif
balt ~/Documents/NewProject/backend/pkg/server/server.go
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
let s:l = 18 - ((0 * winheight(0) + 12) / 24)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 18
normal! 0
lcd ~/Documents/NewProject
wincmd w
exe '1resize ' . ((&lines * 21 + 24) / 49)
exe 'vert 1resize ' . ((&columns * 79 + 119) / 238)
exe '2resize ' . ((&lines * 25 + 24) / 49)
exe 'vert 2resize ' . ((&columns * 79 + 119) / 238)
exe '3resize ' . ((&lines * 22 + 24) / 49)
exe 'vert 3resize ' . ((&columns * 79 + 119) / 238)
exe '4resize ' . ((&lines * 22 + 24) / 49)
exe 'vert 4resize ' . ((&columns * 78 + 119) / 238)
exe '5resize ' . ((&lines * 24 + 24) / 49)
exe 'vert 5resize ' . ((&columns * 79 + 119) / 238)
exe '6resize ' . ((&lines * 24 + 24) / 49)
exe 'vert 6resize ' . ((&columns * 78 + 119) / 238)
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
