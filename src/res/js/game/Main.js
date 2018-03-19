// Make under game engine
let engine = new UnderEngineBuilder().build();

// Set input system
// Include yes, no, sub key
engine.setInput(new ExtendedInput());

// Set initial scene and execute
// Play title scene
engine.execute(new TitleScene());
