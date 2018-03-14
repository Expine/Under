// Make under game engine
let engine = new UnderEngine();

// Set input system
// Include yes, no, sub key
engine.setInput(new ExtendedInput());

// Set screen
engine.setScreen(new GeneratableScreen());

// Set context
engine.setContext(new JSContext());
// engine.setContext(new GLContext());

// Set music
engine.setMusic(new XHTMLMusic());

// set scene manager
engine.setSceneManager(new StackSceneManager());


// Set initial scene and execute
// Play title scene
engine.execute(new TitleScene());
