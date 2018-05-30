@echo off
cd /d %~dp0
java Builder Append ../src/res/js/use/UnderEngine.js ../src/res/js/under
java Builder Append ../src/res/js/use/Game.js ../src/res/js -ex use editor
java Builder Append  ../src/res/js/use/Editor.js ../src/res/js -ex use Main.js
