# Under
Under game project

## UML
- In the following, arrows to indicate abstract dependent are omitted
- Not all necessary information is necessarily provided at the constructor stage
- Other files are summarized in external package

### Game base
#### Base
![GameBaseBase](https://raw.githubusercontent.com/Expine/Under/develop/out/uml/gamebase/Base/GameBaseBase.png)
- Input, Screen, Music, SceneManager are Singleton
- Only Input has practical processing
    - Wrap JavaScript functions
- EngineBuilder is abstract factory pattern

#### Extend
![GameBaseExtend](https://raw.githubusercontent.com/Expine/Under/develop/out/uml/gamebase/Extend/GameBaseExtend.png)
- UnderEngineBuilder makes all necessary objects
- Animation is somewhat special case
    - There is a possibility to change the configuration
- GameoverLayer is provisional implementation

#### Game
![GameBaseGame](https://raw.githubusercontent.com/Expine/Under/develop/out/uml/gamebase/Game/GameBaseGame.png)
- Main is the entry point
- MainBuilder only added changes to generate ExtendedInput

### Scene
#### Tiele
![SceneTitle](https://raw.githubusercontent.com/Expine/Under/develop/out/uml/scene/Title/SceneTitle.png)

#### Game
![SceneGame](https://raw.githubusercontent.com/Expine/Under/develop/out/uml/scene/Game/SceneGame.png)
- GameScene is provisional implementation
- DebugLayer sometimes ignores the access level

### StageParser
- Since StageParser has a lot of dependence on generation, I write it separately
#### CSV
![ParserCSV](https://raw.githubusercontent.com/Expine/Under/develop/out/uml/parser/CSV/ParserCSV.png)

#### JSON
![ParserJSON](https://raw.githubusercontent.com/Expine/Under/develop/out/uml/parser/JSON/ParserJSON.png)

#### Builder
![ParserBuilder](https://raw.githubusercontent.com/Expine/Under/develop/out/uml/parser/Builder/ParserBuilder.png)

### Stage
#### Base
![StageBase](https://raw.githubusercontent.com/Expine/Under/develop/out/uml/stage/Base/StageBase.png)
- StageParser is supposed to generate everything necessary for the stage
    - But this not force it
    - Entity and tile generation were separated
- Entity relations are described later

#### Extend
![StageExtend](https://raw.githubusercontent.com/Expine/Under/develop/out/uml/stage/Extend/StageExtend.png)
- Collsion data is pooled to reduce instance creation

#### Game
![StageGame](https://raw.githubusercontent.com/Expine/Under/develop/out/uml/stage/Game/StageGame.png)
- UnderStageParser just replaces default builder instance

### Entity
#### Base
![EntityBase](https://raw.githubusercontent.com/Expine/Under/develop/out/uml/entity/Base/EntityBase.png)
- Entities are classified mainly into three categories
    - ImmutableObject is an immovable object
    - MutableObject is an object which does not move on its own
    - AutonomyObject is a self-moving object

#### Extend
![EntityExtend](https://raw.githubusercontent.com/Expine/Under/develop/out/uml/entity/Extend/EntityExtend.png)
- Derivation of NamedStateAI is supposed to automatically generate what it need
    - For the convenience of StageParser
#### Game
![EntityGame](https://raw.githubusercontent.com/Expine/Under/develop/out/uml/entity/Game/EntityGame.png)
- NormalGrabState considers AutonomyObject as UnderPlayer
    - Run as allowed because it is JavaScript

#### AI
##### Extend
![AIExtend](https://raw.githubusercontent.com/Expine/Under/develop/out/uml/entity/ai/Extend/AIExtend.png)
- Various AI
- It is temporary implementation for now

##### Normal
![AINormal](https://raw.githubusercontent.com/Expine/Under/develop/out/uml/entity/ai/Normal/AINormal.png)
- Replacement of information such as animarion is possible
- TODO: NormalJumpState may be movable state

##### Wild
![AIWIld](https://raw.githubusercontent.com/Expine/Under/develop/out/uml/entity/ai/Wild/AIWild.png)

#### Physical
##### Extend
![PhysicalExtend](https://raw.githubusercontent.com/Expine/Under/develop/out/uml/entity/physical/Extend/PhysicalExtend.png)
- Player body is incomplete
- TODO: Player body may need physical world to obtain collision inormation

### Editor
#### Game base
![EditorGameBase](https://raw.githubusercontent.com/Expine/Under/develop/out/uml/editor/GameBase/EditorGameBase.png)
- Unfortunately the implementation depends on the implementation badly
    - Selection is abstracted
    - TODO: Should I abstract just in case?

#### Scene
![EditorScene](https://raw.githubusercontent.com/Expine/Under/develop/out/uml/editor/Scene/EditorScene.png)

#### Stage
![EditorStage](https://raw.githubusercontent.com/Expine/Under/develop/out/uml/editor/Stage/EditorStage.png)
- Editor has a special element such as a variable screen
