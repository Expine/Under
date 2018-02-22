@echo off
cd /d %~dp0
java Builder Document ../res/use/UnderEngine.js
java Builder Document ../res/use/Game.js res/js/under/Main.js res/js/under/Scene.js res/js/under/Input.js res/js/under/default/DefaultInput.js res/js/under/default/DefaultScene.js res/js/under/stage/Stage.js res/js/under/stage/Entity.js res/js/under/stage/ImmutableMapObject.js res/js/under/stage/RigidBody.js res/js/scene/TitleScene.js res/js/scene/GameScene.js res/js/ExtendInput.js res/js/Main.js