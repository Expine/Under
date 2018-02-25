@echo off
cd /d %~dp0
java Builder Append ../res/js/use/UnderEngine.js ../res/js/under/Main.js ../res/js/under/Scene.js ../res/js/under/Input.js
java Builder Append ../res/js/use/Game.js ../res/js/scene/TitleScene.js ../res/js/Main.js
