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
{let script = document.createElement('script'); script.src='src/res/js/under/base/stage/parser/EventBuilder.js'; document.head.appendChild(script);}
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
{let id = setInterval(function() {
    if (typeof Layer !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/debug/scene/layer/DebugLayer.js'; document.head.appendChild(script);
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
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/ai/gimmick/ElevatorAI.js'; document.head.appendChild(script);
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
    if (typeof AI !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/ai/StraightAI.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Background !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/back/AreaBackground.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Background !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/back/FixedBackground.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Background !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/back/InvariantBackground.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Background !== `undefined`) {
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
    if (typeof Camera !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/camera/ClipCamera.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Camera !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/camera/EventCamera.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Camera !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/camera/FixCamera.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Camera !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/camera/ForceMoveCamera.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Camera !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/camera/MovingCamera.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof Stage !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/DebugStage.js'; document.head.appendChild(script);
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
    if (typeof StageParser !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/parser/CSVStageParser.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof StageParser !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/parser/JSONStageParser.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof EventBuilder !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/parser/SimpleEventBuilder.js'; document.head.appendChild(script);
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
    if (typeof PhysicalWorld !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/physics/DebugWorld.js'; document.head.appendChild(script);
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
    if (typeof StraightAI !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/ai/EnemyAI.js'; document.head.appendChild(script);
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
    if (typeof AutonomyEntitiy !== `undefined`) {
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
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/entity/gimmick/Elevator.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof AIListedObject !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/entity/happen/PossessedObject.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof PossessedObject !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/entity/happen/SpecialObject.js'; document.head.appendChild(script);
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
    if (typeof TileObject !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/entity/gimmick/VanishTileObject.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof SpecialObject !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/entity/happen/attack/AttackObject.js'; document.head.appendChild(script);
    }
}, 1);}
{let id = setInterval(function() {
    if (typeof AttackObject !== `undefined`) {
        clearInterval(id); let script = document.createElement('script'); script.src='src/res/js/under/extend/stage/entity/happen/attack/PunchObject.js'; document.head.appendChild(script);
    }
}, 1);}
