// create engine
let engine = new UnderEngine("res/js");
// set input
// engine.setInput(new ExtendInput());
engine.setInput(new DefaultInput());
// execute
//engine.execute(new TitleScene());
engine.execute(new DefaultScene());