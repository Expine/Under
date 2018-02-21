@echo off
cd /d %~dp0
java Builder ../res/use/UnderEngine.js ../res/js/under/Main.js ../res/js/under/Scene.js
java Builder ../res/use/Game.js ../res/js/scene/TitleScene.js ../res/js/Main.js
