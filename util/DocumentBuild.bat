@echo off
cd /d %~dp0
java Builder Document ../res/use/UnderEngine.js
java Builder Document ../res/use/Game.js res/js/under/Main.js res/js/under/Scene.js res/js/under/Input.js res/js/under/DefaultInput.js res/js/scene/TitleScene.js res/js/Main.js