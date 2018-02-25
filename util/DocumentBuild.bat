@echo off
cd /d %~dp0
java Builder Document ../res/js/use/UnderEngine.js ..res/js/under
java Builder Document ../res/js/use/Game.js ../res/js -ex use
java Builder Document ../editor/res/js/use/Editor.js ../editor/res/js ../res/js/under -ex use