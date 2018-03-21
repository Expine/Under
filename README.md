# Under
Under game project

## UML
- In the following, arrows to indicate abstract dependent are omitted
- Not all necessary information is necessarily provided at the constructor stage
- Other files are summarized in external package

### Game base
#### Base
![GameBaseBase](out\uml\gamebase\Base\GameBaseBase.png)
- Input, Screen, Music, SceneManager are Singleton
- Only Input has practical processing
    - Wrap JavaScript functions
- EngineBuilder is abstract factory pattern

#### Extend
![GameBaseExtend](out\uml\gamebase\Extend\GameBaseExtend.png)
- UnderEngineBuilder makes all necessary objects
- Animation is somewhat special case
    - There is a possibility to change the configuration
- GameoverLayer is provisional implementation

#### Game
![GameBaseGame](out\uml\gamebase\Game\GameBaseGame.png)
- Main is the entry point
- MainBuilder only added changes to generate ExtendInput
- GameScene is provisional implementation
- DebugLayer sometimes ignores the access level

### Stage
#### Base
![StageBase](out\uml\stage\Base\StageBase.png)
- StageParser is supposed to generate everything necessary for the stage
    - But this not force it
- Entity relations are described later

#### Extend
![StageExtend](out\uml\stage\Extend\StageExtend.png)
- Although it is a mess, CSVStageParser and JSONStageParser are just generating what it need
- TODO: Should I separate CSVStageParser from JSONStageParser ?
- Stage currently does not need to handle Player as Player

#### Game
![StageGame](out\uml\stage\Game\StageGame.png)
- UnderStageParser just replaces some objects

### Entity
#### Base
![EntityBase](out\uml\entity\Base\EntityBase.png)
- Entities are classified mainly into three categories
    - ImmutableObject is an immovable object
    - MutableObject is an object which does not move on its own
    - AutonomyObject is a self-moving object
- I want to interface whether it is destructible or not
-

#### Extend
![EntityExtend](out\uml\entity\Extend\EntityExtend.png)
- Derivation of NamedStateAI is supposed to automatically generate what it need
    - For the convenience of StageParser

#### Game
![EntityGame](out\uml\entity\Game\EntityGame.png)
- PUnderState considers AutonomyObject as UnderPlayer
    - Run as allowed because it is JavaScript

