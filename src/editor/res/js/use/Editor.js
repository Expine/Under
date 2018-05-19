{let script = document.createElement('script'); script.src='src/editor/res/js/editor/event/EventUnparser.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/editor/res/js/editor/stage/back/BackgroundUnparser.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/editor/res/js/editor/stage/camera/CameraUnparser.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/editor/res/js/editor/stage/entity/EntityUnparser.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/Engine.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/EngineBuilder.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/event/common/GameEvent.js'; document.head.appendChild(script);}
{let id = setInterval(function() {
    if (typeof GameEvent !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/base/event/common/NamedEvent.js'; document.head.appendChild(script);
    }
}, 1);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/event/EventManager.js'; document.head.appendChild(script);}
{let id = setInterval(function() {
    if (typeof GameEvent !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/base/event/onstage/StageEvent.js'; document.head.appendChild(script);
    }
}, 1);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/event/parser/EventBuilder.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/input/Input.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/resources/image/Context.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/resources/image/GameImage.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/resources/music/Music.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/resources/ResourceManager.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/scene/layer/Layer.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/scene/Scene.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/scene/SceneManager.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/screen/GameScreen.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/stage/ai/AI.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/stage/ai/state/State.js'; document.head.appendChild(script);}
{let id = setInterval(function() {
    if (typeof AI !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/base/stage/ai/StateAI.js'; document.head.appendChild(script);
    }
}, 1);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/stage/back/Background.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/stage/camera/Camera.js'; document.head.appendChild(script);}
{let id = setInterval(function() {
    if (typeof Camera !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/base/stage/camera/DelegateCamera.js'; document.head.appendChild(script);
    }
}, 1);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/stage/entity/Entity.js'; document.head.appendChild(script);}
{let id = setInterval(function() {
    if (typeof Entity !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/base/stage/entity/ImagedEntity.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof ImagedEntity !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/base/stage/entity/InfluentialEntity.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof InfluentialEntity !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/base/stage/entity/MutableEntity.js'; document.head.appendChild(script);
    }
}, 1);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/stage/parser/EntityBuilder.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/stage/parser/EntityFactory.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/stage/parser/ImageBuilder.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/stage/parser/StageParser.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/stage/physics/body/RigidBody.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/stage/physics/body/RigidMaterial.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/stage/physics/collider/AABB.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/stage/physics/collider/Collider.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/stage/physics/collider/CollisionData.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/stage/physics/CollisionResponse.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/stage/physics/material/Material.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/stage/physics/PhysicalWorld.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/stage/Stage.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/stage/StageManager.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/timer/Timer.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/util/BaseUtil.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/util/Interface.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/res/js/under/base/util/Method.js'; document.head.appendChild(script);}
{let script = document.createElement('script'); script.src='src/res/js/under/debug/base/GameDebugger.js'; document.head.appendChild(script);}
{let id = setInterval(function() {
    if (typeof Layer !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/debug/scene/layer/DebugLayer.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Stage !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/debug/stage/DebugStage.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof PhysicalWorld !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/debug/stage/physics/DebugWorld.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof GameDebugger !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/debug/VolatileDebugger.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof GameEvent !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/event/common/AutoInputEvent.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof GameEvent !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/event/common/DelayEvent.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof GameEvent !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/event/common/DeleteEvent.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof NamedEvent !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/event/common/ImageEvent.js'; document.head.appendChild(script);
    }
}, 1);}
{let script = document.createElement('script'); script.src='src/res/js/under/extend/event/common/inputorder/InputOrder.js'; document.head.appendChild(script);}
{let id = setInterval(function() {
    if (typeof InputOrder !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/event/common/inputorder/LoopInputOrder.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof InputOrder !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/event/common/inputorder/WaitInputOrder.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof GameEvent !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/event/common/SequentialEvent.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof NamedEvent !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/event/onstage/CameraEvent.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof StageEvent !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/event/onstage/ControlEntityEvent.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof SequentialEvent !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/event/onstage/SequentialStageEvent.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof NamedEvent !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/event/onstage/StageStopEvent.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof StageEvent !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/event/onstage/TalkEvent.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof StageEvent !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/event/onstage/TransitionalEvent.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof StageEvent !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/event/onstage/WaitKeyEvent.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof EventBuilder !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/event/parser/SimpleEventBuilder.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof EventManager !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/event/QueueEventManager.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Input !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/input/AllInput.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Input !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/input/StateInputManager.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof ResourceManager !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/resources/CachedArrayManager.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof CachedArrayManager !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/resources/CachedImage.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof CachedArrayManager !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/resources/CachedMusic.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Context !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/resources/image/GLContext.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Context !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/resources/image/JSContext.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof GameImage !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/resources/image/SingleImage.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof SingleImage !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/resources/image/TileImage.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Music !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/resources/music/BufferSourceMusic.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Scene !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/scene/DefaultTitleScene.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Layer !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/scene/layer/FloatLayer.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Layer !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/scene/layer/GameoverLayer.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Layer !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/scene/layer/ScrollLayer.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Layer !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/scene/layer/TabbedLayer.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof SceneManager !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/scene/StackSceneManager.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof GameScreen !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/screen/CanvasScreen.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof GameScreen !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/screen/DelegateScreen.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof CanvasScreen !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/screen/DetectiveScreen.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof DelegateScreen !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/screen/FitableScreen.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof CanvasScreen !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/screen/GeneratableScreen.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof DelegateScreen !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/screen/ScalableScreen.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof AI !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/ai/attack/AttackObjectAI.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof AI !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/ai/EnemyAI.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof AI !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/ai/gimmick/ElevatorAI.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof State !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/ai/gimmick/vanish/ShowState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof State !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/ai/gimmick/vanish/VanishState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof AI !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/ai/JumpAI.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof StateAI !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/ai/NamedStateAI.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof NamedStateAI !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/ai/player/PlayerBaseStateAI.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof NamedStateAI !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/ai/player/PlayerGameoverStateAI.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof State !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/ai/state/BaseState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof State !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/ai/state/NoneState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof AI !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/ai/StraightAI.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Background !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/back/ImageBackground.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof ImageBackground !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/back/InvariantBackground.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof ImageBackground !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/back/MovementBackground.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Background !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/back/SequentialBackground.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Camera !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/camera/CenterCamera.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof DelegateCamera !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/camera/ClipCamera.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof DelegateCamera !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/camera/EventCamera.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Camera !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/camera/FixCamera.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof DelegateCamera !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/camera/ForceMoveCamera.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof DelegateCamera !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/camera/MovingCamera.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Entity !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/entity/fire/ImmutableEvent.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof ImagedEntity !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/entity/object/DoorObject.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof ImagedEntity !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/entity/object/SignObject.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof MutableEntity !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/entity/Obstacle.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof ImageBuilder !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/parser/BaseImageBuilder.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof StageParser !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/parser/CSVStageParser.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof EntityFactory !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/parser/JSONEntityFactory.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof StageParser !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/parser/JSONStageParser.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof EntityBuilder !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/parser/TileBuilder.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Interface !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/physics/body/IJoint.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof RigidMaterial !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/physics/body/ImmutableRigidMaterial.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof RigidBody !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/physics/body/MaxAdoptBody.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof MaxAdoptBody !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/physics/body/PreciseBody.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Collider !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/physics/collider/CircleCollider.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof CollisionData !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/physics/collider/LowerPriorityData.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Collider !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/physics/collider/RectangleCollider.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof RectangleCollider !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/physics/collider/RoundRectangleCollider.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof AABB !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/physics/collider/SimpleAABB.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof CollisionResponse !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/physics/ImpulseBasedResponse.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Material !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/physics/material/ImmutableMaterial.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof CollisionResponse !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/physics/RepulsionResponse.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof PhysicalWorld !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/physics/SequentialWorld.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof SequentialWorld !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/physics/SplitWorld.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof SplitWorld !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/physics/VariableGravityWorld.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Stage !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/SplitManagementStage.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof StageManager !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/StackStageManager.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Timer !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/timer/SimpleTimer.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Engine !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/UnderEngine.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof EngineBuilder !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/UnderEngineBuilder.js'; document.head.appendChild(script);
    }
}, 1);}
{let script = document.createElement('script'); script.src='src/res/js/under/extend/util/Util.js'; document.head.appendChild(script);}
{let id = setInterval(function() {
    if (typeof JSContext !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/editor/res/js/editor/context/EditorContext.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof UnderEngineBuilder !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/editor/res/js/editor/EditorBuilder.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Camera !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/editor/res/js/editor/stage/camera/EditorCamera.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof DebugStage !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/editor/res/js/editor/stage/EditorStage.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof StackStageManager !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/editor/res/js/editor/stage/EditorStageManager.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Interface !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/editor/res/js/editor/stage/IEditable.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Interface !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/editor/res/js/editor/stage/IEditorSave.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof DebugWorld !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/editor/res/js/editor/stage/physics/EditorWorld.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Interface !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/editor/res/js/editor/util/ISelection.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof GameEvent !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/event/common/LinkEvent.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof NamedEvent !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/event/common/TextWindowEvent.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof StageEvent !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/event/onstage/CameraChangeEvent.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof StageEvent !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/event/onstage/PhysicalChangeEvent.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof UnderEngineBuilder !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/MainBuilder.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Layer !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/scene/layer/UILayer.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Scene !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/scene/TitleScene.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Interface !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/IMovableState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Interface !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/IPrepareState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof State !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/special/hook/HookingState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof State !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/special/hook/HookReleasedState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof NamedStateAI !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/special/hook/HookStateAI.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof BaseState !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/state/TransferableState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof NamedStateAI !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/TransferabletateAI.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Interface !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/entity/happen/special/hook/IHook.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Interface !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/entity/interface/ITerrain.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof SignObject !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/entity/object/TextSignObject.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof SimpleEventBuilder !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/parser/UnderEventBuilder.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof JSONStageParser !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/parser/UnderStageParser.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof TileBuilder !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/parser/UnderTileBuilder.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Interface !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/physics/body/IString.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof RigidBody !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/physics/body/StringBody.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof RectangleCollider !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/physics/collider/ExcludedRectangleCollider.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof RoundRectangleCollider !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/physics/collider/ExcludedRoundRectangleCollider.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Interface !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/physics/collider/IExclude.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof CollisionResponse !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/physics/UnderRepulsionResponse.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Interface !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/base/event/IEventOperater.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Interface !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/base/event/IEventRegister.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Interface !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/base/event/onstage/IStageEvent.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Interface !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/base/input/IInput.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof IInput !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/base/input/IKey.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof IInput !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/base/input/IMouse.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof GameImage !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/base/resources/image/GameAnimation.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Interface !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/base/resources/image/IClipImage.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof GameAnimation !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/base/resources/image/MultiAnimation.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof MultiAnimation !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/base/resources/image/NamedAnimation.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Interface !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/base/resources/IResourceManager.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Layer !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/base/scene/layer/ClipLayer.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Scene !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/base/scene/LayeredScene.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof MutableEntity !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/base/stage/entity/AutonomyEntity.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof InfluentialEntity !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/base/stage/entity/ImmutableEntity.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Interface !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/base/stage/entity/interface/IBreakable.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Interface !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/base/stage/entity/interface/IColliderable.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof IBreakable !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/base/stage/entity/interface/IDamagable.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Interface !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/base/stage/entity/interface/IEventEntity.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Interface !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/base/stage/entity/interface/IPlayable.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof UnderEngine !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/debug/UnderDebugEngine.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof InputOrder !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/event/common/inputorder/DirectionInputOrder.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof StateInputManager !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/input/KeyInput.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof StateInputManager !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/input/MouseInput.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof KeyInput !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/input/PreventKeyInput.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof NamedAnimation !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/resources/image/MultiNamedAnimation.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof GameAnimation !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/resources/image/SingleAnimation.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof SingleAnimation !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/resources/image/SingleClipAnimation.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof SingleImage !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/resources/image/SingleClipImage.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof TileImage !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/resources/image/TileClipImage.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof LayeredScene !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/scene/BaseLayeredScene.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof ScrollLayer !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/scene/layer/DragScrollLayer.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof TabbedLayer !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/scene/layer/NamedTabbedLayer.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof NamedStateAI !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/ai/gimmick/vanish/VanishStateAI.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof BaseState !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/ai/player/PGameoverState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof BaseState !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/ai/player/PJumpingState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof BaseState !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/ai/player/PJumpState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof BaseState !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/ai/player/PPunchState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof BaseState !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/ai/player/PStationaryState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof BaseState !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/ai/player/PWalkState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof ImageBackground !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/back/AreaBackground.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof ImageBackground !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/back/FixedBackground.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof AutonomyEntity !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/entity/AIListedObject.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof AIListedObject !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/entity/character/Character.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Character !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/entity/character/Enemy.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Character !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/entity/character/StateCharacter.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof AIListedObject !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/entity/happen/attack/AttackObject.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof AIListedObject !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/entity/happen/PossessedObject.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof ImmutableEntity !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/entity/TileObject.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof TileBuilder !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/parser/CharacterBuilder.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof PreciseBody !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/physics/body/JointBody.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof PreciseBody !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/physics/body/PlayerBody.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof SimpleAABB !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/physics/collider/DirectionalAABB.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof SimpleTimer !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/timer/RecordedTimer.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof BaseLayeredScene !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/editor/res/js/editor/scene/EditorScene.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof NamedTabbedLayer !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/editor/res/js/editor/scene/layer/ChipLayer.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof ClipLayer !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/editor/res/js/editor/scene/layer/SelectionLayer.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof SelectionLayer !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/editor/res/js/editor/scene/layer/SingleChipLayer.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof SelectionLayer !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/editor/res/js/editor/scene/layer/SingleEntityLayer.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof UnderStageParser !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/editor/res/js/editor/stage/parser/EditorStageParser.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof BaseLayeredScene !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/scene/GameScene.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof TransferableStateAI !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/player/common/CommonBaseStateAI.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof TransferableState !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/player/UnderPlayerState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof TransferableStateAI !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/player/UnderStateAI.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof UnderPlayerState !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/player/wild/WildRollingState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof HookingState !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/special/hook/HeadHookingState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof HookStateAI !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/special/hook/HeadHookStateAI.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof PossessedObject !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/entity/happen/special/hook/HookObject.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof HookObject !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/entity/happen/special/hook/HookPlayer.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof IPlayable !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/entity/interface/IUnderPlayable.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof TileObject !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/entity/UnderTileObject.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof CharacterBuilder !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/parser/UnderCharacterBuilder.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof IResourceManager !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/base/resources/IImageManager.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof IResourceManager !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/base/resources/IMusicManager.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof StateCharacter !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/entity/character/Player.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof SelectionLayer !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/editor/res/js/editor/scene/layer/EntityLayer.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof UnderPlayerState !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/player/adventurer/AdventurerHookState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof UnderPlayerState !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/player/common/CommonGameoverState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof UnderPlayerState !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/player/common/CpmmonJudgeState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof UnderStateAI !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/player/normal/NormalBaseStateAI.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof UnderPlayerState !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/player/normal/NormalJumpState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof UnderPlayerState !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/player/normal/NormalPunchState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof UnderPlayerState !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/player/normal/NormalSpecialState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof NormalBaseStateAI !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/player/propeller/PropellerBaseStateAI.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof UnderPlayerState !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/player/UnderMovableState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof NormalBaseStateAI !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/player/wild/WildBaseStateAI.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof NormalPunchState !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/player/wild/WildClawState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof UnderMovableState !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/player/wild/WildRollState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Player !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/entity/character/UnderPlayer.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof HookObject !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/entity/happen/special/hook/HookChild.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof HookObject !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/entity/happen/special/hook/HookHead.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof NormalBaseStateAI !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/player/adventurer/AdventurerBaseStateAI.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof UnderMovableState !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/player/adventurer/AdventurerDownWallState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof UnderMovableState !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/player/normal/NormalFallState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof UnderMovableState !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/player/normal/NormalGrabState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof UnderMovableState !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/player/normal/NormalJumpingState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof UnderMovableState !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/player/normal/NormalStationaryState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof UnderMovableState !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/player/normal/NormalWalkState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof UnderMovableState !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/player/propeller/PropellerJumpingState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof NormalFallState !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/player/adventurer/AdventurerFallState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof NormalGrabState !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/player/adventurer/AdventurerGrabState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof NormalJumpingState !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/player/adventurer/AdventurerJumpingState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof NormalStationaryState !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/player/adventurer/AdventurerStationaryState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof NormalWalkState !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/game/stage/ai/player/adventurer/AdventurerWalkState.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof EventUnparser !== `undefined` &&
        typeof BackgroundUnparser !== `undefined` &&
        typeof CameraUnparser !== `undefined` &&
        typeof EntityUnparser !== `undefined` &&
        typeof Engine !== `undefined` &&
        typeof EngineBuilder !== `undefined` &&
        typeof GameEvent !== `undefined` &&
        typeof NamedEvent !== `undefined` &&
        typeof EventManager !== `undefined` &&
        typeof StageEvent !== `undefined` &&
        typeof EventBuilder !== `undefined` &&
        typeof Input !== `undefined` &&
        typeof Context !== `undefined` &&
        typeof GameImage !== `undefined` &&
        typeof Music !== `undefined` &&
        typeof ResourceManager !== `undefined` &&
        typeof Layer !== `undefined` &&
        typeof Scene !== `undefined` &&
        typeof SceneManager !== `undefined` &&
        typeof GameScreen !== `undefined` &&
        typeof AI !== `undefined` &&
        typeof State !== `undefined` &&
        typeof StateAI !== `undefined` &&
        typeof Background !== `undefined` &&
        typeof Camera !== `undefined` &&
        typeof DelegateCamera !== `undefined` &&
        typeof Entity !== `undefined` &&
        typeof ImagedEntity !== `undefined` &&
        typeof InfluentialEntity !== `undefined` &&
        typeof MutableEntity !== `undefined` &&
        typeof EntityBuilder !== `undefined` &&
        typeof EntityFactory !== `undefined` &&
        typeof ImageBuilder !== `undefined` &&
        typeof StageParser !== `undefined` &&
        typeof RigidBody !== `undefined` &&
        typeof RigidMaterial !== `undefined` &&
        typeof AABB !== `undefined` &&
        typeof Collider !== `undefined` &&
        typeof CollisionData !== `undefined` &&
        typeof CollisionResponse !== `undefined` &&
        typeof Material !== `undefined` &&
        typeof PhysicalWorld !== `undefined` &&
        typeof Stage !== `undefined` &&
        typeof StageManager !== `undefined` &&
        typeof Timer !== `undefined` &&
        typeof BaseUtil !== `undefined` &&
        typeof Interface !== `undefined` &&
        typeof Method !== `undefined` &&
        typeof GameDebugger !== `undefined` &&
        typeof DebugLayer !== `undefined` &&
        typeof DebugStage !== `undefined` &&
        typeof DebugWorld !== `undefined` &&
        typeof VolatileDebugger !== `undefined` &&
        typeof AutoInputEvent !== `undefined` &&
        typeof DelayEvent !== `undefined` &&
        typeof DeleteEvent !== `undefined` &&
        typeof ImageEvent !== `undefined` &&
        typeof InputOrder !== `undefined` &&
        typeof LoopInputOrder !== `undefined` &&
        typeof WaitInputOrder !== `undefined` &&
        typeof SequentialEvent !== `undefined` &&
        typeof CameraEvent !== `undefined` &&
        typeof ControlEntityEvent !== `undefined` &&
        typeof SequentialStageEvent !== `undefined` &&
        typeof StageStopEvent !== `undefined` &&
        typeof TalkEvent !== `undefined` &&
        typeof TransitionalEvent !== `undefined` &&
        typeof WaitKeyEvent !== `undefined` &&
        typeof SimpleEventBuilder !== `undefined` &&
        typeof QueueEventManager !== `undefined` &&
        typeof AllInput !== `undefined` &&
        typeof StateInputManager !== `undefined` &&
        typeof CachedArrayManager !== `undefined` &&
        typeof CachedImage !== `undefined` &&
        typeof CachedMusic !== `undefined` &&
        typeof GLContext !== `undefined` &&
        typeof JSContext !== `undefined` &&
        typeof SingleImage !== `undefined` &&
        typeof TileImage !== `undefined` &&
        typeof BufferSourceMusic !== `undefined` &&
        typeof DefaultTitleScene !== `undefined` &&
        typeof FloatLayer !== `undefined` &&
        typeof GameoverLayer !== `undefined` &&
        typeof ScrollLayer !== `undefined` &&
        typeof TabbedLayer !== `undefined` &&
        typeof StackSceneManager !== `undefined` &&
        typeof CanvasScreen !== `undefined` &&
        typeof DelegateScreen !== `undefined` &&
        typeof DetectiveScreen !== `undefined` &&
        typeof FitableScreen !== `undefined` &&
        typeof GeneratableScreen !== `undefined` &&
        typeof ScalableScreen !== `undefined` &&
        typeof AttackObjectAI !== `undefined` &&
        typeof EnemyAI !== `undefined` &&
        typeof ElevatorAI !== `undefined` &&
        typeof ShowState !== `undefined` &&
        typeof VanishState !== `undefined` &&
        typeof JumpAI !== `undefined` &&
        typeof NamedStateAI !== `undefined` &&
        typeof PlayerBaseStateAI !== `undefined` &&
        typeof PlayerGameoverStateAI !== `undefined` &&
        typeof BaseState !== `undefined` &&
        typeof NoneState !== `undefined` &&
        typeof StraightAI !== `undefined` &&
        typeof ImageBackground !== `undefined` &&
        typeof InvariantBackground !== `undefined` &&
        typeof MovementBackground !== `undefined` &&
        typeof SequentialBackground !== `undefined` &&
        typeof CenterCamera !== `undefined` &&
        typeof ClipCamera !== `undefined` &&
        typeof EventCamera !== `undefined` &&
        typeof FixCamera !== `undefined` &&
        typeof ForceMoveCamera !== `undefined` &&
        typeof MovingCamera !== `undefined` &&
        typeof ImmutableEvent !== `undefined` &&
        typeof DoorObject !== `undefined` &&
        typeof SignObject !== `undefined` &&
        typeof Obstacle !== `undefined` &&
        typeof BaseImageBuilder !== `undefined` &&
        typeof CSVStageParser !== `undefined` &&
        typeof JSONEntityFactory !== `undefined` &&
        typeof JSONStageParser !== `undefined` &&
        typeof TileBuilder !== `undefined` &&
        typeof IJoint !== `undefined` &&
        typeof ImmutableRigidMaterial !== `undefined` &&
        typeof MaxAdoptBody !== `undefined` &&
        typeof PreciseBody !== `undefined` &&
        typeof CircleCollider !== `undefined` &&
        typeof LowerPriorityData !== `undefined` &&
        typeof RectangleCollider !== `undefined` &&
        typeof RoundRectangleCollider !== `undefined` &&
        typeof SimpleAABB !== `undefined` &&
        typeof ImpulseBasedResponse !== `undefined` &&
        typeof ImmutableMaterial !== `undefined` &&
        typeof RepulsionResponse !== `undefined` &&
        typeof SequentialWorld !== `undefined` &&
        typeof SplitWorld !== `undefined` &&
        typeof VariableGravityWorld !== `undefined` &&
        typeof SplitManagementStage !== `undefined` &&
        typeof StackStageManager !== `undefined` &&
        typeof SimpleTimer !== `undefined` &&
        typeof UnderEngine !== `undefined` &&
        typeof UnderEngineBuilder !== `undefined` &&
        typeof Util !== `undefined` &&
        typeof EditorContext !== `undefined` &&
        typeof EditorBuilder !== `undefined` &&
        typeof EditorCamera !== `undefined` &&
        typeof EditorStage !== `undefined` &&
        typeof EditorStageManager !== `undefined` &&
        typeof IEditable !== `undefined` &&
        typeof IEditorSave !== `undefined` &&
        typeof EditorWorld !== `undefined` &&
        typeof ISelection !== `undefined` &&
        typeof LinkEvent !== `undefined` &&
        typeof TextWindowEvent !== `undefined` &&
        typeof CameraChangeEvent !== `undefined` &&
        typeof PhysicalChangeEvent !== `undefined` &&
        typeof MainBuilder !== `undefined` &&
        typeof UILayer !== `undefined` &&
        typeof TitleScene !== `undefined` &&
        typeof IMovableState !== `undefined` &&
        typeof IPrepareState !== `undefined` &&
        typeof HookingState !== `undefined` &&
        typeof HookReleasedState !== `undefined` &&
        typeof HookStateAI !== `undefined` &&
        typeof TransferableState !== `undefined` &&
        typeof TransferableStateAI !== `undefined` &&
        typeof IHook !== `undefined` &&
        typeof ITerrain !== `undefined` &&
        typeof TextSignObject !== `undefined` &&
        typeof UnderEventBuilder !== `undefined` &&
        typeof UnderStageParser !== `undefined` &&
        typeof UnderTileBuilder !== `undefined` &&
        typeof IString !== `undefined` &&
        typeof StringBody !== `undefined` &&
        typeof ExcludedRectangleCollider !== `undefined` &&
        typeof ExcludedRoundRectangleCollider !== `undefined` &&
        typeof IExclude !== `undefined` &&
        typeof UnderRepulsionResponse !== `undefined` &&
        typeof IEventOperator !== `undefined` &&
        typeof IEventRegister !== `undefined` &&
        typeof IStageEvent !== `undefined` &&
        typeof IInput !== `undefined` &&
        typeof IKey !== `undefined` &&
        typeof IMouse !== `undefined` &&
        typeof GameAnimation !== `undefined` &&
        typeof IClipImage !== `undefined` &&
        typeof MultiAnimation !== `undefined` &&
        typeof NamedAnimation !== `undefined` &&
        typeof IResourceManager !== `undefined` &&
        typeof ClipLayer !== `undefined` &&
        typeof LayeredScene !== `undefined` &&
        typeof AutonomyEntity !== `undefined` &&
        typeof ImmutableEntity !== `undefined` &&
        typeof IBreakable !== `undefined` &&
        typeof IColliderable !== `undefined` &&
        typeof IDamagable !== `undefined` &&
        typeof IEventEntity !== `undefined` &&
        typeof IPlayable !== `undefined` &&
        typeof UnderDebugEngine !== `undefined` &&
        typeof DirectionInputOrder !== `undefined` &&
        typeof KeyInput !== `undefined` &&
        typeof MouseInput !== `undefined` &&
        typeof PreventKeyInput !== `undefined` &&
        typeof MultiNamedAnimation !== `undefined` &&
        typeof SingleAnimation !== `undefined` &&
        typeof SingleClipAnimation !== `undefined` &&
        typeof SingleClipImage !== `undefined` &&
        typeof TileClipImage !== `undefined` &&
        typeof BaseLayeredScene !== `undefined` &&
        typeof DragScrollLayer !== `undefined` &&
        typeof NamedTabbedLayer !== `undefined` &&
        typeof VanishStateAI !== `undefined` &&
        typeof PGameoverState !== `undefined` &&
        typeof PJumpingState !== `undefined` &&
        typeof PJumpState !== `undefined` &&
        typeof PPunchState !== `undefined` &&
        typeof PStationaryState !== `undefined` &&
        typeof PWalkState !== `undefined` &&
        typeof AreaBackground !== `undefined` &&
        typeof FixedBackground !== `undefined` &&
        typeof AIListedObject !== `undefined` &&
        typeof Character !== `undefined` &&
        typeof Enemy !== `undefined` &&
        typeof StateCharacter !== `undefined` &&
        typeof AttackObject !== `undefined` &&
        typeof PossessedObject !== `undefined` &&
        typeof TileObject !== `undefined` &&
        typeof CharacterBuilder !== `undefined` &&
        typeof JointBody !== `undefined` &&
        typeof PlayerBody !== `undefined` &&
        typeof DirectionalAABB !== `undefined` &&
        typeof RecordedTimer !== `undefined` &&
        typeof EditorScene !== `undefined` &&
        typeof ChipLayer !== `undefined` &&
        typeof SelectionLayer !== `undefined` &&
        typeof SingleChipLayer !== `undefined` &&
        typeof SingleEntityLayer !== `undefined` &&
        typeof EditorStageParser !== `undefined` &&
        typeof GameScene !== `undefined` &&
        typeof CommonBaseStateAI !== `undefined` &&
        typeof UnderPlayerState !== `undefined` &&
        typeof UnderStateAI !== `undefined` &&
        typeof WildRollingState !== `undefined` &&
        typeof HeadHookingState !== `undefined` &&
        typeof HeadHookStateAI !== `undefined` &&
        typeof HookObject !== `undefined` &&
        typeof HookPlayer !== `undefined` &&
        typeof IUnderPlayable !== `undefined` &&
        typeof UnderTileObject !== `undefined` &&
        typeof UnderCharacterBuilder !== `undefined` &&
        typeof IImageManager !== `undefined` &&
        typeof IMusicManager !== `undefined` &&
        typeof Player !== `undefined` &&
        typeof EntityLayer !== `undefined` &&
        typeof AdventurerHookState !== `undefined` &&
        typeof CommonGameoverState !== `undefined` &&
        typeof CpmmonJudgeState !== `undefined` &&
        typeof NormalBaseStateAI !== `undefined` &&
        typeof NormalJumpState !== `undefined` &&
        typeof NormalPunchState !== `undefined` &&
        typeof NormalSpecialState !== `undefined` &&
        typeof PropellerBaseStateAI !== `undefined` &&
        typeof UnderMovableState !== `undefined` &&
        typeof WildBaseStateAI !== `undefined` &&
        typeof WildClawState !== `undefined` &&
        typeof WildRollState !== `undefined` &&
        typeof UnderPlayer !== `undefined` &&
        typeof HookChild !== `undefined` &&
        typeof HookHead !== `undefined` &&
        typeof AdventurerBaseStateAI !== `undefined` &&
        typeof AdventurerDownWallState !== `undefined` &&
        typeof NormalFallState !== `undefined` &&
        typeof NormalGrabState !== `undefined` &&
        typeof NormalJumpingState !== `undefined` &&
        typeof NormalStationaryState !== `undefined` &&
        typeof NormalWalkState !== `undefined` &&
        typeof PropellerJumpingState !== `undefined` &&
        typeof AdventurerFallState !== `undefined` &&
        typeof AdventurerGrabState !== `undefined` &&
        typeof AdventurerJumpingState !== `undefined` &&
        typeof AdventurerStationaryState !== `undefined` &&
        typeof AdventurerWalkState !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/editor/res/js/editor/EditorMain.js'; document.head.appendChild(script);
    }
}, 1);}
