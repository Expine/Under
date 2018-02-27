// Make under game engine
let engine = new UnderEngine("res/js");
// Set input system
// Include yes, no, sub key
engine.setInput(new ExtendInput());
// Set screen
engine.setScreen(new DefaultScreen());
engine.setSceneManager(new StackSceneManager());
// Set initial scene and execute
// Play title scene
engine.execute(new TitleScene());