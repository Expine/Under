// Make under game engine
let engine = new UnderEngine("res/js");
// Set input system
// Include yes, no, sub key
engine.setInput(new DefaultInput());
// Set initial scene and execute
// Play title scene
engine.execute(new EditorScene());