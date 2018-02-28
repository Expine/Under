// Make under game engine
let engine = new UnderEngine("res/js");
// Set input system
engine.setInput(new AllInput());
// Set initial scene and execute
// Play editor scene
engine.execute(new EditorScene());