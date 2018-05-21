@echo off
cd /d %~dp0
java Builder Document ../src/res/js/use/UnderEngine.js ../src/res/js/under
java Builder Document ../src/res/js/use/Game.js ../src/res/js -ex use editor
java Builder Document ../src/res/js/use/Editor.js ../src/res/js -ex use Main.js
