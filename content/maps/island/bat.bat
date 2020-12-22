@echo off
for /r %%s in (*.vmap) do (
"E:\steam\steamapps\common\dota 2 beta\game\bin\win64\resourcecompiler" -i "%%s" -outroot "E:\steam\steamapps\common\dota 2 beta\game\dota_addons\nav\maps"
)
pause