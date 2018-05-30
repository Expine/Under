/**
 * Editor base
 * - Operates editor
 * - ### Base of editing tools
 * @interface
 * @classdesc Editor base of editing tools
 */
class EditorBase /* , IEditorFunction */ { // eslint-disable-line  no-unused-vars
    /**
     * Editor base constructor
     * @constructor
     */
    constructor() {
        /**
         * Target for editing
         * @protected
         * @type {IEditorTarget}
         */
        this.target = null;

        /**
         * Selectors for selecting element
         * @protected
         * @type {Array<ISelection>}
         */
        this.selectors = [];
    }

    /**
     * Set edtor target
     * @param {IEditorTarget} target Target for editing
     */
    setTarget(target) {
        this.target = target;
    }

    /**
     * Add selector for selecting element
     * @param {ISelection} selector Selector for selecting element
     */
    addSelector(selector) {
        this.selectors.push(selector);
    }

    /**
     * Add editor tool
     * @param {string} name Tool name
     * @param {EditorTool} tool Editor tool
     */
    addTool(name, tool) {
        tool.setEditor(this);
        tool.init();
    }

    /**
     * Get editor target
     * @override
     * @protected
     * @return {IEditorTarget} Editor target
     */
    getTarget() {
        return this.target;
    }

    /**
     * Change editor tool by name
     * @abstract
     * @protected
     * @param {string} name Tool name
     */
    changeTool(name) {}

    /**
     * Set current ID
     * @abstract
     * @protected
     * @param {number} id Setting ID
     */
    setCurrentID(id) {}

    /**
     * Get current painting ID
     * @abstract
     * @protected
     * @return {number} Current painting ID
     */
    getCurrentID() {}

    /**
     * Get all tools
     * @abstract
     * @protected
     * @return {Array<EditorTool>} All tools
     */
    getTools() {}

    /**
     * Get current tool
     * @abstract
     * @protected
     * @return {EditorTool} Current tool
     */
    getCurrentTool() {}

    /**
     * Initialize editor
     * @abstract
     */
    init() {}

    /**
     * Update editor
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @param {number} dt Delta time
     */
    update(x, y, dt) {
        for (const it of this.getTools()) {
            it.update(x, y, dt);
        }
        const tool = this.getCurrentTool();
        if (tool !== null) {
            tool.use(x, y, this.getCurrentID());
        }
    }

    /**
     * Render editor
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        const tool = this.getCurrentTool();
        if (tool !== null) {
            tool.render(ctx, shiftX, shiftY);
        }
    }
}
/**
 * Editor tool
 * - ### Tool for editing
 * @interface
 * @classdesc Editor tool for editing
 */
class EditorTool { // eslint-disable-line  no-unused-vars
    /**
     * Editor tool constructor
     * @constructor
     */
    constructor() {
        /**
         * Target for editing
         * @protected
         * @type {IEditorFunction}
         */
        this.editor = null;
    }

    /**
     * Set edtor for operating
     * @param {IEditorFunction} editor Editor for operating
     */
    setEditor(editor) {
        this.editor = editor;
    }

    /**
     * Initialize tool
     * @abstract
     */
    init() {}

    /**
     * Update tool
     * @abstract
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @param {number} dt Delta time
     */
    update(x, y, dt) {}

    /**
     * Use tool by ID
     * @abstract
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @param {number} id Painting ID
     */
    use(x, y, id) {}

    /**
     * Render tool
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {}
}
/**
 * Edit builder
 * - ### Generates edit tools
 * @interface
 * @classdesc Edit builder to generate edit tools
 */
class EditBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Build entity from json data
     * @abstract
     * @return {EditorBase} Generated edit tool
     */
    build() {}
}
/**
 * Edit builder
 * - Generates edit tools
 * - ### Generate simple editor tools
 * @extends {EditBuilder}
 * @classdesc Edit builder to generate simple editor tools
 */
class SimpleEditBuilder extends EditBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Generates image
     * @protected
     * @param {sring} imgae Image name
     * @return {GameImage} Generated image
     */
    makeImage(image) {
        return new SingleImage(ResourceManager.image.load(`editor/${image}`), 16, 16);
    }

    /**
     * Generates tools
     * @protected
     * @param {EditorBase} base Editor base
     */
    makeTools(base) {
        base.addTool(`pencil`, new PencilTool(this.makeImage(`pencil.png`), Input.key.zero() + 1));
        base.addTool(`eraser`, new EraserTool(this.makeImage(`eraser.png`), Input.key.zero() + 2));
        base.addTool(`syringe`, new SyringeTool(null));
        base.addTool(`paint`, new PaintTool(this.makeImage(`paint.png`), Input.key.zero() + 3));
        base.addTool(`tile`, new AutoTileTool(this.makeImage(`tile.png`), Input.key.zero() + 4));
    }

    /**
     * Generate editor base
     * @protected
     * @return {EditorBase} Editor base
     */
    makeEditorBase() {
        return new SimpleEditor();
    }

    /**
     * Build entity from json data
     * @override
     * @return {EditorBase} Generated edit tool
     */
    build() {
        const ret = this.makeEditorBase();
        this.makeTools(ret);
        return ret;
    }
}
/**
 * Simple editor
 * - Operates editor
 * - Base of editing tools
 * - ### Uses simple tools
 * @extends {EditorBase}
 * @classdesc Simple editor to use simple tools
 */
class SimpleEditor extends EditorBase { // eslint-disable-line  no-unused-vars
    /**
     * Simple editor constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Cuurent tool to use
         * @protected
         * @type {EditorTool}
         */
        this.currentTool = null;

        /**
         * Current painting ID
         * @protected
         * @type {number}
         */
        this.currentID = -1;

        /**
         * Tools for editing
         * @protected
         * @type {Object<string, EditorTool>}
         */
        this.tools = {};
    }

    /**
     * Update selector for setting painting ID
     * @protected
     */
    updateSelector() {
        let cleared = true;
        for (const it of this.selectors) {
            const selected = it.getSelected();
            if (selected >= 0) {
                cleared = false;
                if (this.currentID !== selected) {
                    this.currentID = selected;
                    break;
                }
            }
        }
        if (cleared) {
            this.currentID = -1;
        }
        for (const it of this.selectors) {
            if (this.currentID !== it.getSelected()) {
                it.setSelected(-1);
            }
        }
    }

    /**
     * Add editor tool
     * @override
     * @param {string} name Tool name
     * @param {EditorTool} tool Editor tool
     */
    addTool(name, tool) {
        super.addTool(name, tool);
        this.tools[name] = tool;
    }

    /**
     * Change editor tool by name
     * @override
     * @protected
     * @param {string} name Tool name
     */
    changeTool(name) {
        this.currentTool = this.tools[name];
    }

    /**
     * Set current ID
     * @override
     * @protected
     * @param {number} id Setting ID
     */
    setCurrentID(id) {
        this.currentID = id;
        for (const it of this.selectors) {
            it.setSelected(id);
        }
    }

    /**
     * Get all tools
     * @override
     * @protected
     * @return {Array<EditorTool>} All tools
     */
    getTools() {
        const tools = [];
        for (const it in this.tools) {
            if (this.tools.hasOwnProperty(it)) {
                tools.push(this.tools[it]);
            }
        }
        return tools;
    }

    /**
     * Get current tool
     * @override
     * @protected
     * @return {EditorTool} Current tool
     */
    getCurrentTool() {
        return this.currentTool;
    }

    /**
     * Get current painting ID
     * @override
     * @protected
     * @return {number} Current painting ID
     */
    getCurrentID() {
        return this.currentID;
    }

    /**
     * Initialize editor
     * @override
     */
    init() {
        this.changeTool(`pencil`);
    }

    /**
     * Update editor
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @param {number} dt Delta time
     */
    update(x, y, dt) {
        this.updateSelector();
        super.update(x, y, dt);
    }
}
/**
 * Base tool
 * - Tool for editing
 * - ### Selects something
 * @interface
 * @extends {EditorTool}
 * @classdesc Base tool to select something
 */
class BaseTool extends EditorTool { // eslint-disable-line  no-unused-vars
    /**
     * Base tool constructor
     * @constructor
     * @param {GameImage} [image=null] Tool image
     * @param {number} [key=-1] Key code for shortcut
     */
    constructor(image = null, key = -1) {
        super();

        /**
         * Tool image
         * @protected
         * @type {GameImage}
         */
        this.image = image;
        /**
         * Key code for shortcut
         * @protected
         * @param {number}
         */
        this.key = key;

        /**
         * Selected x position
         * @protected
         * @type {number}
         */
        this.selectedX = -1;
        /**
         * Selected x position
         * @protected
         * @type {number}
         */
        this.selectedY = -1;
        /**
         * Selected width
         * @protected
         * @type {number}
         */
        this.selectedWidth = 32;
        /**
         * Selected height
         * @protected
         * @type {number}
         */
        this.selectedHeight = 32;

        /**
         * Resolution for editing
         * @protected
         * @type {nmber}
         */
        this.resolution = 32;
    }

    /**
     * Shortcut for switching
     * @abstract
     * @protected
     */
    shortcut() {}

    /**
     * Initialize tool
     * @override
     */
    init() {
        if (this.image !== null) {
            this.image.init();
        }
    }

    /**
     * Update tool
     * @override
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @param {number} dt Delta time
     */
    update(x, y, dt) {
        // swicth pencil (1)
        if (this.key >= 0 && Input.key.isPress(this.key)) {
            this.shortcut();
        }
        if (this.image !== null) {
            this.image.update(dt);
        }
    }

    /**
     * Use tool by ID
     * @override
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @param {number} id Painting ID
     */
    use(x, y, id) {
        this.selectedX = Math.floor(x / this.resolution) * this.resolution;
        this.selectedY = Math.floor(y / this.resolution) * this.resolution;
    }

    /**
     * Render tool
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        ctx.strokeRect(this.selectedX + shiftX, this.selectedY + shiftY, this.selectedWidth, this.selectedHeight, `white`);
        if (this.image !== null) {
            this.image.render(ctx, this.selectedX + shiftX + 16, this.selectedY + shiftY);
        }
    }
}
/**
 * Pencil tool
 * - Tool for editing
 * - Selects something
 * - ### Erases
 * @extends {BaseTool}
 * @classdesc Pencil tool to erase
 */
class EraserTool extends BaseTool { // eslint-disable-line  no-unused-vars
    /**
     * Shortcut for switching
     * @override
     * @protected
     */
    shortcut() {
        this.editor.setCurrentID(-1);
        this.editor.changeTool(`eraser`);
    }

    /**
     * Use tool by ID
     * @override
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @param {number} id Painting ID
     */
    use(x, y, id) {
        super.use(x, y, id);
        if (Input.mouse.isPressed(Input.mouse.mLeft())) {
            this.editor.getTarget().paint(this.selectedX, this.selectedY, -1);
        }
        if (id !== -1) {
            this.editor.changeTool(`pencil`);
        }
    }
}
/**
 * Pencil tool
 * - Tool for editing
 * - Selects something
 * - ### Paints area
 * @extends {BaseTool}
 * @classdesc Pencil tool to paint area
 */
class PaintTool extends BaseTool { // eslint-disable-line  no-unused-vars
    /**
     * Paints area
     * @protected
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @param {number} id Painting ID
     * @param {number} preID Previous ID
     */
    paint(x, y, id, preID) {
        this.editor.getTarget().paint(x, y, id);
        const right = this.editor.getTarget().getEditorEntity(x + 32, y);
        if (right !== null && right.getID() === preID) {
            this.paint(x + 32, y, id, preID);
        }
        const left = this.editor.getTarget().getEditorEntity(x - 32, y);
        if (left !== null && left.getID() === preID) {
            this.paint(x - 32, y, id, preID);
        }
        const under = this.editor.getTarget().getEditorEntity(x, y + 32);
        if (under !== null && under.getID() === preID) {
            this.paint(x, y + 32, id, preID);
        }
        const top = this.editor.getTarget().getEditorEntity(x, y - 32);
        if (top !== null && top.getID() === preID) {
            this.paint(x, y - 32, id, preID);
        }
    }

    /**
     * Update tool
     * @override
     * @protected
     */
    shortcut() {
        this.editor.changeTool(`paint`);
    }

    /**
     * Use tool by ID
     * @override
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @param {number} id Painting ID
     */
    use(x, y, id) {
        super.use(x, y, id);
        if (id >= 0 && Input.mouse.isPressed(Input.mouse.mLeft())) {
            const pre = this.editor.getTarget().getEditorEntity(this.selectedX, this.selectedY);
            this.paint(this.selectedX, this.selectedY, id, pre === null ? -1 : pre.getID());
        }
    }
}
/**
 * Pencil tool
 * - Tool for editing
 * - Selects something
 * - ### Paints one by one
 * @extends {BaseTool}
 * @classdesc Pencil tool to paint one by one
 */
class PencilTool extends BaseTool { // eslint-disable-line  no-unused-vars

    /**
     * Shortcut for switching
     * @override
     * @protected
     */
    shortcut() {
        // swicth pencil
        if (this.editor.getCurrentID() < 0) {
            this.editor.setCurrentID(0);
        }
        this.editor.changeTool(`pencil`);
    }

    /**
     * Use tool by ID
     * @override
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @param {number} id Painting ID
     */
    use(x, y, id) {
        super.use(x, y, id);
        if (id >= 0 && Input.mouse.isPressed(Input.mouse.mLeft())) {
            this.editor.getTarget().paint(this.selectedX, this.selectedY, id);
        }
        if (id === -1) {
            this.editor.changeTool(`eraser`);
        }
    }
}
/**
 * Syringe tool
 * - Tool for editing
 * - ### Extracts entity
 * @extends {EditorTool}
 * @classdesc Syringe tool to extract entity
 */
class SyringeTool extends EditorTool { // eslint-disable-line  no-unused-vars
    /**
     * Update tool
     * @override
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @param {number} dt Delta time
     */
    update(x, y, dt) {
        this.selectedX = Math.floor(x / 32) * 32;
        this.selectedY = Math.floor(y / 32) * 32;
        if (Input.mouse.isPressed(Input.mouse.mRight())) {
            const target = this.editor.getTarget().getEditorEntity(this.selectedX, this.selectedY);
            if (target !== null) {
                this.editor.setCurrentID(target.getID());
            }
        }
    }
}
/**
 * Engine
 * - ### Control the core of the game
 * - ### Manages each piece of game information
 * - ### Fires update and rendering processing respectively
 * @interface
 * @classdesc Engine for control the core of the game to manage each piece of game information
 */
class Engine { // eslint-disable-line  no-unused-vars
    /**
     * Engine constructor
     * @constructor
     */
    constructor() {
        /**
         * Input system instance
         * @protected
         * @type {Input}
         */
        this.input = null;
        /**
         * Screen system
         * @protected
         * @type {GameScreen}
         */
        this.screen = null;
        /**
         * Context tp render
         * @protected
         * @type {Context}
         */
        this.context = null;
        /**
         * Scene manager
         * @protected
         * @type {SceneManager}
         */
        this.manager = null;
        /**
         * Music system
         * @protected
         * @type {Music}
         */
        this.music = null;
        /**
         * Timer
         * @protected
         * @type {Timer}
         */
        this.timer = null;
    }

    /**
     * Set input system
     * @param {Input} input Input system
     */
    setInput(input) {
        this.input = input;
    }

    /**
     * Set screen system
     * @param {GameScreen} screen Screen system
     */
    setScreen(screen) {
        this.screen = screen;
    }

    /**
     * Set context to render
     * @param {Context} context Context to render
     */
    setContext(context) {
        this.context = context;
    }

    /**
     * Set scene manager
     * @param {SceneManager} manager Scene manager
     */
    setSceneManager(manager) {
        this.manager = manager;
    }

    /**
     * Set music systm
     * @param {Music} music Music system
     */
    setMusic(music) {
        this.music = music;
    }

    /**
     * Set timer
     * @param {Timer} timer Timer
     */
    setTimer(timer) {
        this.timer = timer;
    }

    /**
     * Execute engine
     * @param {Scene} scene First scene
     */
    execute(scene) {
        // set access
        this.input.setScreen(this.screen);
        this.context.setScreen(this.screen);
        // initialize
        this.screen.init();
        this.context.init();
        this.input.init();
        // transition
        this.manager.replaceScene(scene);
        // execute process
        this.main();
    }

    /**
     * Game main process
     * @abstract
     * @protected
     */
    main() {}
}
/**
 * Engine builder
 * - ### Performs initial construction of the game engine
 * @interface
 * @classdesc Engine builder to perform initial construction of the game engine
 */
class EngineBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Make game engine
     * @abstract
     * @protected
     * @return {Engine} Game engine
     */
    makeEngine() {}

    /**
     * Make input system
     * @abstract
     * @protected
     * @return {Input} Input system
     */
    makeInput() {}

    /**
     * Make screen system
     * @abstract
     * @protected
     * @return {GameScreen} Screen system
     */
    makeScreen() {}

    /**
     * Make context to render
     * @abstract
     * @protected
     * @return {Context} Context to render
     */
    makeContext() {}

    /**
     * Make image manager
     * @abstract
     * @protected
     * @return {IImageManager} Image manager
     */
    makeImageManager() {}

    /**
     * Make music system
     * @abstract
     * @protected
     * @return {Music} Music system
     */
    makeMusic() {}

    /**
     * Make music manager
     * @abstract
     * @protected
     * @return {IMusicManager} Music manager
     */
    makeMusicManager() {}

    /**
     * Make timer
     * @abstract
     * @protected
     * @return {Timer} Timer
     */
    makeTimer() {}

    /**
     * Make scene manager
     * @abstract
     * @protected
     * @return {SceneManager} Scene manager
     */
    makeSceneManager() {}

    /**
     * Perform initial construction of the game engine
     * @return {Engine} Game engine
     */
    build() {
        const engine = this.makeEngine();
        engine.setInput(this.makeInput());
        engine.setScreen(this.makeScreen());
        // set context
        const context = this.makeContext();
        context.setImageManager(this.makeImageManager());
        engine.setContext(context);
        // set music
        const music = this.makeMusic();
        music.setMusicManager(this.makeMusicManager());
        engine.setMusic(music);
        engine.setSceneManager(this.makeSceneManager());
        engine.setTimer(this.makeTimer());
        return engine;
    }
}
/**
 * Game event
 * - ### Updates and renders event
 * @interface
 * @classdesc Game event to update and render event
 */
class GameEvent { // eslint-disable-line  no-unused-vars
    /**
     * Game event constructor
     * @constructor
     */
    constructor() {
        /**
         * Event operator
         * @protected
         * @type {IEventOperator}
         */
        this.op = null;
    }

    /**
     * Set event operator
     * @param {IEventOperator} op Event operator
     */
    setEventOperator(op) {
        this.op = op;
    }

    /**
     * Initialize event
     * @abstract
     */
    init() {}

    /**
     * Destructor of event
     * @abstract
     */
    destruct() {}

    /**
     * Update event
     * @abstract
     * @param {number} dt Delta time
     * @return {boolean} Whether update is endped or not
     */
    update(dt) {
        return true;
    }

    /**
     * Render event
     * @abstract
     * @param {Context} ctx Canvas context
     */
    render(ctx) {}
}
/**
 * Named event
 * - Updates and renders event
 * - ### Identified by name
 * @interface
 * @extends {GameEvent}
 * @classdesc Named event that is identified by name
 */
class NamedEvent extends GameEvent { // eslint-disable-line  no-unused-vars
    /**
     * Named event constructor
     * @constructor
     * @param {string} name Identified name
     */
    constructor(name) {
        super();

        /**
         * Identified name
         * @protected
         * @type {string}
         */
        this.name = name;
    }

    /**
     * Get event's identified name
     * @return {string} Identified name
     */
    getName() {
        return this.name;
    }
}
/**
 * Event manager
 * - ### Manages update and rendering event
 * @interface
 * @classdesc Event manager to manage update and rendering event
 */
class EventManager { // eslint-disable-line  no-unused-vars
    /**
     * Event manager constructor
     * @constructor
     */
    constructor() {
        // set singleton
        if (BaseUtil.implementsOf(this, IEventRegister)) {
            EventManager.it = this;
        }
    }

    /**
     * Get currently running event
     * @abstract
     * @return {Array<GameEvent>} Currently running events
     */
    getRunningEvents() {}

    /**
     * Remove events from event manager
     * @abstract
     * @protected
     * @param {Array<GameEvent>} removes List of event for removing
     */
    removeEvents(removes) {}

    /**
     * Update scene
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        const removes = [];
        for (const it of this.getRunningEvents()) {
            if (it.update(dt)) {
                removes.push(it);
            }
        }
        this.removeEvents(removes);
    }

    /**
     * Render scene
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        for (const it of this.getRunningEvents()) {
            it.render(ctx);
        }
    }
}

/**
 * Instance for singleton
 * @type {IEventRegister}
 */
EventManager.it = null;
/**
 * Stage event
 * - Updates and renders event
 * - Controls the stage
 * - ### Stores stage instance
 * @extends {GameEvent}
 * @implements {IStageEvent}
 * @classdesc Stage event to store stage instance
 */
class StageEvent extends GameEvent /* , IStageEvent */ { // eslint-disable-line  no-unused-vars
    /**
     * Stage event constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Stage for constrol
         * @protected
         * @type {Stage}
         */
        this.stage = null;
    }

    /**
     * Set stage
     * @override
     * @param {Stage} stage Stage to set
     */
    setStage(stage) {
        this.stage = stage;
    }
}
/**
 * Event builder
 * - ### Generates event from json data
 * @interface
 * @classdesc Event builder to generate event
 */
class EventBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Entity builder constructor
     * @constructor
     */
    constructor() {
        this.imageBuilder = null;
    }

    /**
     * Set image builder
     * @param {ImageBuilder} image Image builder
     */
    setImageBuilder(image) {
        this.imageBuilder = image;
    }

    /**
     * Build event from json data
     * @abstract
     * @param {JSON} json Event json data
     * @return {GameEvent} Generated event
     */
    build(json) {}
}
/**
 * Input
 * - ### Manages input event
 * @interface
 * @classdesc Input to manage input event
 */
class Input { // eslint-disable-line  no-unused-vars
    /**
     * Input constructor
     * @constructor
     */
    constructor() {
        /**
         * Screen instance for getting screen ratio
         * @protected
         * @type {GameScreen}
         */
        this.screen = null;

        Input.key = BaseUtil.implementsOf(this, IKey) ? this : null;
        Input.mouse = BaseUtil.implementsOf(this, IMouse) ? this : null;
    }

    /**
     * Set screen instance for getting screen ratio and setting inut target
     * @param {GameScreen} screen
     */
    setScreen(screen) {
        this.screen = screen;
    }

    /**
     * Initialize input
     * @abstract
     */
    init() {}

    /**
     * Update input
     * @abstract
     */
    update() {}
}

/**
 * Key input instance
 * @static
 * @type {IKey}
 */
Input.key = null;
/**
 * Mouse input instance
 * @static
 * @type {IMouse}
 */
Input.mouse = null;
/**
 * Context
 * - ### Controls rendering to the screen
 * @interface
 * @classdesc Context for rendering to the screen
 */
class Context { // eslint-disable-line  no-unused-vars
    /**
     * Context constructor
     * @constructor
     */
    constructor() {
        /**
         * Screen for rendering
         * @protected
         * @type {GameScreen}
         */
        this.screen = null;

        /**
         * Context image manager
         * @protected
         * @type {IImageManager}
         */
        this.image = null;
    }

    /**
     * Set screen
     * @param {GameScreen} screen Screen system
     */
    setScreen(screen) {
        this.screen = screen;
    }

    /**
     * Set image manager
     * @param {IImageManager} imageManager Image manager
     */
    setImageManager(imageManager) {
        this.image = imageManager;
    }

    /**
     * Initialize context
     * @abstract
     */
    init() {}

    /**
     * Function to be executed before drawing
     * @abstract
     */
    preRendering() {}

    /**
     * Function to be executed after drawing
     * @abstract
     */
    postRendering() {}

    /**
     * Get rendering text width
     * @abstract
     * @param {string} text Rendering text
     * @param {number} size Font size
     * @param {string} font Font name
     * @return {number} Text width
     */
    measureText(text, size, font) {}

    /**
     * Render text
     * @abstract
     * @param {string} text Rendering text
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} anchorX Anchor x point in percent (0.0 <= anchorX <= 1.0)
     * @param {number} anchorY Anchor y point in percent (0.0 <= anchorX <= 1.0)
     * @param {number} size Font size
     * @param {string} color Font color
     * @param {string} font Font name
     */
    fillText(text, x, y, anchorX, anchorY, size, color, font) {}

    /**
     * Rendering line
     * @abstract
     * @param {number} sx Start x position
     * @param {number} sy Start y position
     * @param {number} ex Terminal x position
     * @param {number} ey Terminal y position
     * @param {string} color Color name of line
     * @param {number} lineWidth Line width
     */
    strokeLine(sx, sy, ex, ey, color, lineWidth) {}

    /**
     * Rendering circle outline
     * @abstract
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} radius Raius of circle
     * @param {number} startAngle Beginning of arc
     * @param {number} endAngle End of arc
     * @param {boolean} anticlockwise Whether it is clockwise or not
     * @param {string} color Color name of circle
     * @param {number} lineWidth Line of circle width
     */
    strokeCircle(x, y, radius, startAngle, endAngle, anticlockwise, color, lineWidth) {}

    /**
     * Rendering rectangle outline
     * @abstract
     * @param {number} x Upper left x position
     * @param {number} y Upper left y position
     * @param {number} width Width of the rectangle
     * @param {number} height Height of the rectangle
     * @param {string} color Color name of rectangle
     * @param {number} lineWidth Line of rectangle width
     */
    strokeRect(x, y, width, height, color, lineWidth) {}

    /**
     * Rendering rectangle
     * @abstract
     * @param {number} x Upper left x position
     * @param {number} y Upper left y position
     * @param {number} width Width of the rectangle
     * @param {number} height Height of the rectangle
     * @param {string} color Color name of rectangle
     * @param {number} lineWidth Line of rectangle width
     */
    fillRect(x, y, width, height, color, lineWidth) {}

    /**
     * Rendering image
     * @abstract
     * @param {Object} imageID Image ID
     * @param {number} x Image x position
     * @param {number} y Image y position
     * @param {number} width Image width
     * @param {number} height Image height
     * @param {number} srcX Upper left x position of source
     * @param {number} srcY Upper left y position of source
     * @param {number} srcW Source width
     * @param {number} srcH Source height
     */
    drawImage(imageID, x, y, width, height, srcX, srcY, srcW, srcH) {}
}
/**
 * Game image
 * - ### Renders image
 * @interface
 * @classdesc Game image to render image
 */
class GameImage { // eslint-disable-line  no-unused-vars
    /**
     * Set image size
     * @abstract
     * @param {number} width Image width
     * @param {number} height Image height
     */
    setSize(width, height) {}

    /**
     * Set image ID
     * @abstract
     * @param {number} imageID Image ID
     */
    setImageID(imageID) {}

    /**
     * Get image ID
     * @abstract
     * @return {number} Image ID
     */
    getImageID() {}

    /**
     * Get image width
     * @abstract
     * @return {number} Imag width
     */
    getWidth() {}

    /**
     * Get image height
     * @abstract
     * @return {number} Imag height
     */
    getHeight() {}

    /**
     * Get source offset x position
     * @abstract
     * @protected
     * @type {number}
     */
    getSourceOffsetX() {}

    /**
     * Get source offset y position
     * @abstract
     * @protected
     * @type {number}
     */
    getSourceOffsetY() {}

    /**
     * Get source width
     * @abstract
     * @protected
     * @type {number}
     */
    getSourceWidth() {}

    /**
     * Get source height
     * @abstract
     * @protected
     * @type {number}
     */
    getSourceHeight() {}

    /**
     * Initialize image
     * @abstract
     */
    init() {}

    /**
     * Update image
     * @abstract
     * @param {number} dt
     */
    update(dt) {}

    /**
     * Render image
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx, x, y) {}
}
/**
 * Music
 * - ### Control to play music as BGM or SE
 * @interface
 * @classdesc Music to control to play music as BGM or SE
 */
class Music { // eslint-disable-line  no-unused-vars
    /**
     * Music constructor
     * @constructor
     */
    constructor() {
        /**
         * Music manager
         * @protected
         * @type {IMusicManager}
         */
        this.music = null;

        // set singleton
        Music.it = this;
    }

    /**
     * Set music manager
     * @param {IMusicManager} musicManager Music manager
     */
    setMusicManager(musicManager) {
        this.music = musicManager;
    }

    /**
     * Sound the SE
     * @abstract
     * @param {Object} musicID SE Music id
     */
    playSE(musicID) {}

    /**
     * Sound the BGM
     * @abstract
     * @param {Object} musicID BGM Music id
     */
    playBGM(musicID) {}

    /**
     * Pause BGM
     * @abstract
     */
    pauseBGM() {}

    /**
     * Resume BGM
     * @abstract
     */
    resumeBGM() {}

    /**
     * Stop BGM
     * @abstract
     */
    stopBGM() {}
}

/**
 * Instance for singleton
 * @static
 * @type {Music}
 */
Music.it = null;
/**
 * Resource manager
 * - Resources abstraction of resource management
 * - ### Manages resource and root path
 * @interface
 * @implements {IResourceManager}
 * @classdesc Resource manager to manage resource and root path
 */
class ResourceManager /* , IResourceManager */ { // eslint-disable-line  no-unused-vars
    /**
     * Resource manager constructor
     * @param {string} root Resource root path
     */
    constructor(root) {
        /**
         * Resource root path
         * @protected
         * @type {string}
         */
        this.root = root;

        // set singleton
        if (BaseUtil.implementsOf(this, IImageManager)) {
            ResourceManager.image = this;
        }
        if (BaseUtil.implementsOf(this, IMusicManager)) {
            ResourceManager.music = this;
        }
    }

    /**
     * Load resource and return ID
     * @abstract
     * @param {string} filePath Resource file path
     * @return {Object} Resource ID
     */
    load(filePath) {}

    /**
     * Unload resource
     * @abstract
     * @param {Object} id Resource ID
     */
    unload(id) {}

    /**
     * Reload all resources
     * @abstract
     */
    reload() {}

    /**
     * Get resource path
     * @abstract
     * @param {Object} id Resrouce ID
     * @return {string} Resource path (return null if not exists)
     */
    getPath(id) {}
}

/**
 * Image resource manager instance for singleton
 * @static
 * @type {IImageManager}
 */
ResourceManager.image = null;
/**
 * Music resource manager instance for singleton
 * @static
 * @type {IMusicManager}
 */
ResourceManager.music = null;
/**
 * Layer
 * - ### Performs drawing processing collectively
 * @interface
 * @classdesc Layer to perform drawing processing collectively
 */
class Layer { // eslint-disable-line  no-unused-vars
    /**
     * Layer constructor
     * @constructor
     */
    constructor() {
        /**
         * Layer x position
         * @type {number}
         */
        this.x = 0;
        /**
         * Layer y position
         * @type {number}
         */
        this.y = 0;
        /**
         * Layer z position
         * @type {number}
         */
        this.z = 0;

        /**
         * Layer width
         * @protected
         * @type {number}
         */
        this.width = 0;
        /**
         * Layer height
         * @protected
         * @type {number}
         */
        this.height = 0;
    }

    /**
     * Set layer position
     * @param {number} x Layer x position
     * @param {number} y Layer y position
     * @param {number} z Layer z position
     */
    setPosition(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * Set layer size
     * @param {number} width Layer width
     * @param {number} height Layer height
     */
    setSize(width, height) {
        this.width = width;
        this.height = height;
    }

    /**
     * Initialize scene
     * @abstract
     */
    init() {}

    /**
     * Update layer
     * @abstract
     * @param {number} dt Delta time
     */
    update(dt) {}

    /**
     * Render layer
     * @abstract
     * @param {Context} ctx Canvas context
     */
    render(ctx) {}
}
/**
 * Scene
 * - ### Controls updating and rendering
 * @interface
 * @classdesc Scene to control updating and rendering
 */
class Scene { // eslint-disable-line  no-unused-vars
    /**
     * Initialize scene
     * @abstract
     */
    init() {}

    /**
     * Update scene
     * @abstract
     * @param {number} dt Delta time
     */
    update(dt) {}

    /**
     * Render scene
     * @abstract
     * @param {Context} ctx Canvas context
     */
    render(ctx) {}
}
/**
 * Scene manager
 * - ### Manages transitions of scenes, ie additions and deletions
 * @interface
 * @classdesc Scene manager to manage transitions of scenes
 */
class SceneManager { // eslint-disable-line  no-unused-vars
    /**
     * Scene manager constructor
     * @constructor
     */
    constructor() {
        // set singleton
        SceneManager.it = this;
    }

    /**
     * Get currently running scene
     * @abstract
     * @protected
     * @return {Scene} Currently running scene
     */
    getScene() {}

    /**
     * Push scene instance for running it
     * @param {Scene} scene Scene instance for running it
     */
    pushScene(scene) {
        scene.init();
    }

    /**
     * Pop currently scene for returning to the previous scene
     * @abstract
     */
    popScene() {}

    /**
     * Replace currently scene by new scene
     * @param {Scene} scene Scene instance for replacing currently scene
     */
    replaceScene(scene) {
        this.popScene();
        this.pushScene(scene);
    }

    /**
     * Update scene
     * @param {number} dt Delta time
     */
    update(dt) {
        this.getScene().update(dt);
    }

    /**
     * Render scene
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        this.getScene().render(ctx);
    }
}

/**
 * Instance for singleton
 * @type {SceneManager}
 */
SceneManager.it = null;
/**
 * Game Screen
 * - ### Indicates the rendering target and input target
 * @interface
 * @classdesc Game Screen indicating the rendering and input target
 */
class GameScreen { // eslint-disable-line  no-unused-vars
    /**
     * Game Screen constructor
     * @constructor
     * @param {number} width Screen width
     * @param {number} height Screen height
     */
    constructor(width, height) {
        /**
         * Game screen ratio
         * @type {number}
         */
        this.gameSize = 1;
        /**
         * Width of game screen size
         * @type {number}
         */
        this.width = width;
        /**
         * Height of game screen size
         * @type {number}
         */
        this.height = height;

        // set singleton
        GameScreen.it = this;
    }

    /**
     * Initialize screen
     * @abstract
     */
    init() {}

    /**
     * Get input target element
     * @abstract
     * @return {Element} Element of input target
     */
    getTarget() {}

    /**
     * Get canvas for rendering
     * @abstract
     * @return {Canvas} Canvas
     */
    getCanvas() {}
}

/**
 * Instance for singleton
 * @static
 * @type {GameScreen}
 */
GameScreen.it = null;
/**
 * AI
 * - ### Determines the behavior of an entity
 * @interface
 * @classdesc AI for determining the behavior of an entity
 */
class AI { // eslint-disable-line  no-unused-vars
    /**
     * AI constructor
     * @constructor
     */
    constructor() {
        /**
         * Entity to which AI is attached
         * @type {AutonomyEntity}
         */
        this.entity = null;
    }

    /**
     * Set autonomy entity
     * @param {AutonomyEntity} entity Autonomy entity
     */
    setEntity(entity) {
        this.entity = entity;
    }

    /**
     * Initialize AI
     * @abstract
     */
    init() {}

    /**
     * Update AI
     * @abstract
     * @param {number} dt Delta time
     */
    update(dt) {}

    /**
     * Apply AI and decide action
     * @abstract
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {}
}
/**
 * State
 * - ### Determines the operation by AI according to the state and renders based on state
 * @interface
 * @classdesc State to determine the operation and render by state
 */
class State { // eslint-disable-line  no-unused-vars
    /**
     * State constructor
     * @constructor
     */
    constructor() {
        /**
         * Entity for targeting
         * @type {AutonomyEntity}
         */
        this.entity = null;

        /**
         * AI for operating
         * @type {StateAI}
         */
        this.ai = null;

        /**
         * Whether it can render or not
         * @type {boolean}
         */
        this.canRendering = false;
    }

    /**
     * Set entity for targeting
     * @param {AutonomyEntity} entity Entity for tageting
     */
    setEntity(entity) {
        this.entity = entity;
    }

    /**
     * Set AI for operating
     * @param {StateAI} ai AI for operating
     */
    setAI(ai) {
        this.ai = ai;
    }

    /**
     * Initialize
     * @abstract
     */
    init() {}

    /**
     * Update state
     * @abstract
     * @param {number} dt Delta time
     */
    update(dt) {}

    /**
     * Apply AI and decide action
     * @abstract
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {}

    /**
     * Render entity by this state
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {}
}
/**
 * State AI
 * - Determines the behavior of an entity
 * - ### Determines by state
 * @interface
 * @extends {AI}
 * @classdesc State AI to determine by state
 */
class StateAI extends AI { // eslint-disable-line  no-unused-vars
    /**
     * Get state
     * @abstract
     * @return {State} State of AI
     */
    getState() {}

    /**
     * Get currently state ID
     * @abstract
     * @return {Object} Currently state ID
     */
    getStateID() {}

    /**
     * Set state by ID
     * @abstract
     * @param {State} state State
     * @param {Object} id State ID
     */
    setState(state, id) {}

    /**
     * Change state
     * @param {Object} id ID of state to change
     * @return {boolean} Whether change state or not
     */
    changeState(id) {
        this.getState().setEntity(this.entity);
        this.getState().setAI(this);
        this.getState().init();
    }

    /**
     * Update state
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        if (this.getState() !== null) {
            this.getState().update(dt);
        }
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        return this.getState() !== null && this.getState().apply(dt);
    }
}
/**
 * Background
 * - ### Renders and update backgrdoun image
 * @interface
 * @classdesc Background to render and update background image
 */
class Background { // eslint-disable-line  no-unused-vars
    /**
     * Initialize background
     * @abstract
     */
    init() {}

    /**
     * Update background
     * @abstract
     * @param {number} dt delta time
     */
    update(dt) {}

    /**
     * Render background
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     * @param {number} screenWidth Scren width
     * @param {number} screenWidth Scren height
     */
    render(ctx, shiftX, shiftY, screenWidth, screenHeight) {}
}
/**
 * Camera
 * - ### Calculates the area to rendering
 * @interface
 * @classdesc Camera to calculate the area of rendering
 */
class Camera { // eslint-disable-line  no-unused-vars
    /**
     * Camera Constructor
     * @constructor
     */
    constructor() {
        /**
         * Camera x position
         * @type {number}
         */
        this.cameraX = 0;
        /**
         * Camera y position
         * @type {number}
         */
        this.cameraY = 0;

        /**
         * Camera base x position
         * @type {number}
         */
        this.baseX = 0;
        /**
         * Camera base y position
         * @type {number}
         */
        this.baseY = 0;
        /**
         * Camera screen width
         * @type {number}
         */
        this.screenWidth = 0;
        /**
         * Camera screen height
         * @type {number}
         */
        this.screenHeight = 0;

        /**
         * Camera max width
         * @protected
         * @type {number}
         */
        this.maxWidth = 0;
        /**
         * Camera max height
         * @protected
         * @type {number}
         */
        this.maxHeight = 0;
    }

    /**
     * Set screen size
     * @param {number} screenWidth Camera screen width
     * @param {number} screenHeight Camera screen height
     */
    setScreenSize(screenWidth, screenHeight) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
    }

    /**
     * Set camera max size
     * @param {number} maxWidth Camera max width
     * @param {number} maxHeight Cmera max height
     */
    setMaxSize(maxWidth, maxHeight) {
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
    }

    /**
     * Initialize camera
     * @abstract
     * @param {number} x First camera x position
     * @param {number} y First camera y position
     */
    init(x, y) {}

    /**
     * Update camera
     * @abstract
     * @param {number} x Base x position
     * @param {number} y Base y position
     * @param {number} dt Delta time
     */
    update(x, y, dt) {}
}
/**
 * Delegate camera
 * - Calculates the area to rendering
 * - ### Delegates some processing to another camera
 * @interface
 * @extends {Camera}
 * @classdesc Delegate camera to delegate some processing to another camera
 */
class DelegateCamera extends Camera { // eslint-disable-line  no-unused-vars
    /**
     * Delegate camera constructor
     * @constructor
     * @param {Camera} baseCamera Base camera for delegation
     */
    constructor(baseCamera) {
        super();

        /**
         * Base camera for delegation
         * @protected
         * @type {Camera}
         */
        this.baseCamera = baseCamera;
    }

    /**
     * Get delegation base camera
     * @return {Camera} Delegation camera
     */
    getBaseCamera() {
        return this.baseCamera;
    }

    /**
     * Set screen size
     * @override
     * @param {number} screenWidth Camera screen width
     * @param {number} screenHeight Camera screen height
     */
    setScreenSize(screenWidth, screenHeight) {
        super.setScreenSize(screenWidth, screenHeight);
        this.baseCamera.setScreenSize(screenWidth, screenHeight);
    }

    /**
     * Set camera max size
     * @override
     * @param {number} maxWidth Camera max width
     * @param {number} maxHeight Cmera max height
     */
    setMaxSize(maxWidth, maxHeight) {
        super.setMaxSize(maxWidth, maxHeight);
        this.baseCamera.setMaxSize(maxWidth, maxHeight);
    }

    /**
     * Initialize camera
     * @override
     * @param {number} x First camera x position
     * @param {number} y First camera y position
     */
    init(x, y) {
        this.baseCamera.init(x, y);
        this.cameraX = this.baseCamera.cameraX;
        this.cameraY = this.baseCamera.cameraY;
    }

    /**
     * Update camera
     * @override
     * @param {number} x Base x position
     * @param {number} y Base y position
     * @param {number} dt Delta time
     */
    update(x, y, dt) {
        this.baseCamera.update(x, y, dt);
    }
}
/**
 * Entity
 * - ### Object present on the stage that has coordinate and size
 * @interface
 * @classdesc Entity that has coordinate and size
 */
class Entity { // eslint-disable-line  no-unused-vars
    /**
     * Entity constructor
     * @constructor
     */
    constructor() {
        /**
         * Entity x position
         * @type {number}
         */
        this.x = 0;
        /**
         * Entity Y position
         * @type {number}
         */
        this.y = 0;
        /**
         * Entity Z position
         * @type {number}
         */
        this.z = 0;
        /**
         * Entity width
         * @type {number}
         */
        this.width = 0;
        /**
         * Entity height
         * @type {number}
         */
        this.height = 0;

        /**
         * Stage instance
         * @type {Stage}
         */
        this.stage = null;
    }

    /**
     * Set stage
     * @param {Stage} stage  Stage instance
     */
    setStage(stage) {
        this.stage = stage;
    }

    /**
     * Set entity position
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} [z=z] Z position
     */
    setPosition(x, y, z = this.z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * Set entity size
     * @param {number} width Entity width
     * @param {number} height Entity height
     */
    setSize(width, height) {
        this.width = width;
        this.height = height;
    }

    /**
     * Initialize entity
     * @abstract
     */
    init() {}

    /**
     * Update entty
     * @abstract
     * @param {number} dt Delta time
     */
    update(dt) {}

    /**
     * Render entity
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {}
}
/**
 * Imaged entity
 * - Object present on the stage that has coordinate and size
 * - ### Manages image
 * @interface
 * @extends {Entity}
 * @classdesc Imaged entity to manage image
 */
class ImagedEntity extends Entity { // eslint-disable-line  no-unused-vars
    /**
     * Imaged entity constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Image ID
         * @protected
         * @type {GameImage}
         */
        this.image = null;
    }
    /**
     * Set image
     * @param {GameImage} image Image
     */
    setImage(image) {
        this.image = image;
    }

    /**
     * Get image
     * @return {GameImage} Image
     */
    getImage() {
        return this.image;
    }

    /**
     * Set entity size
     * @override
     * @param {number} width Entity width
     * @param {number} height Entity height
     */
    setSize(width, height) {
        super.setSize(width, height);
        if (this.image !== null) {
            this.image.setSize(width, height);
        }
    }

    /**
     * Initialize entity
     * @override
     */
    init() {
        if (this.image !== null) {
            this.image.init();
        }
    }

    /**
     * Update entty
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        if (this.image !== null) {
            this.image.update(dt);
        }
    }

    /**
     * Render entity
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        if (this.image !== null) {
            this.image.render(ctx, this.x + shiftX, this.y + shiftY);
        }
    }
}
/**
 * Influential entity
 * - Object present on the stage that has coordinate and size
 * - Manages image
 * - ### It can be collided because it has material and collider
 * @interface
 * @extends {ImagedEntity}
 * @classdesc Influential entity that can be collided because it has material and collider
 */
class InfluentialEntity extends ImagedEntity { // eslint-disable-line  no-unused-vars
    /**
     * Influential entity constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Material inofrmation
         * @type {Material}
         */
        this.material = null;
        /**
         * Entity collider
         * @type {Collider}
         */
        this.collider = null;
    }

    /**
     * Set material
     * @param {Material} material Material information
     */
    setMaterial(material) {
        this.material = material;
    }

    /**
     * Set collider
     * @param {Collider} collider Entity collider
     */
    setCollider(collider) {
        this.collider = collider;
        // initialize
        collider.setEntity(this);
        collider.init();
    }
}
/**
 * Mmutable entity
 * - Object present on the stage that has coordinate and size
 * - Manages image
 * - It can be collided because it has material and collider
 * - ### It is not fixed and can be moved
 * @extends {InfluentialEntity}
 * @classdesc Mmutable entity that is not fixed and can be moved
 */
class MutableEntity extends InfluentialEntity { // eslint-disable-line  no-unused-vars
    /**
     * Mutable entity constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Entity body
         * @type {RigidBody}
         */
        this.body = null;

        /**
         * X direction of entity
         * @type {number}
         */
        this.directionX = 0;
        /**
         * Y direction of entity
         * @type {number}
         */
        this.directionY = 0;
    }

    /**
     * Set rigid body
     * @param {RigidBody} body rigid body
     */
    setRigidBody(body) {
        this.body = body;
        // initialize
        if (this.body !== null) {
            body.setEntity(this);
            body.init();
        }
    }

    /**
     * Set direction of entity
     * @param {number} [directionX = this.directionX] Direction of x
     * @param {number} [directionY = this.directionY] Direction of y
     */
    setDirection(directionX = this.directionX, directionY = this.directionY) {
        this.directionX = directionX;
        this.directionY = directionY;

        if (BaseUtil.implementsOf(this.image, IDirectionalImage)) {
            this.image.setDirection(directionX, directionY);
        }
    }

    /**
     * Move entity relatively
     * @param {number} dx Relative movement amount in x direction
     * @param {number} dy Relative movement amount in y direction
     */
    deltaMove(dx, dy) {
        this.setPosition(this.x + dx, this.y + dy);
        if (this.collider !== null) {
            this.collider.update();
        }
    }
}
/**
 * Entity builder
 * - ### Generates entity from json data
 * @interface
 * @classdesc Entity builder to generate entity
 */
class EntityBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Entity builder constructor
     * @constructor
     */
    constructor() {
        this.imageBuilder = null;
    }

    /**
     * Set image builder
     * @param {ImageBuilder} image Image builder
     */
    setImageBuilder(image) {
        this.imageBuilder = image;
    }

    /**
     * Build entity from json data
     * @abstract
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} json Entity json data
     * @return {Entity} Generated entity
     */
    build(deploy, json) {}
}
/**
 * Entity factory
 * - ### Generates entity by ID
 * @interface
 * @classdesc Entity factory to generate entity by ID
 */
class EntityFactory { // eslint-disable-line  no-unused-vars
    /**
     * Create entity from factory data
     * @abstract
     * @param {Object} id ID for entity
     * @param {JSON} deploy Entity deploy json data
     * @return {Entity} Entity instance
     */
    createEntity(id, deploy) {}
}
/**
 * Image builder
 * - ### Generates image from json data
 * @interface
 * @classdesc Image builder to generate image from json
 */
class ImageBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Build image from json data
     * @abstract
     * @param {string} root File root path
     * @param {JSON} image Image json data
     * @return {GameImage} image
     */
    build(root, image) {}
}
/**
 * Stage parser
 * - ### Generates a stage from a file
 * @interface
 * @classdesc Stage parser to generate a stage from a file
 */
class StageParser { // eslint-disable-line  no-unused-vars
    /**
     * Parse file to stage
     * @abstract
     * @param {string} filePath Stage file path
     * @param {number} width Stage width for rendering area
     * @param {number} height Stage height for rendering area
     * @return {Stage} Generated stage
     */
    parse(filePath, width, height) {}
}
/**
 * Rigid body
 * - ### Update entity by physical quantity
 * @interface
 * @classdesc Rigid body to update entity by phsycal quantity
 */
class RigidBody { // eslint-disable-line  no-unused-vars
    /**
     * Rigid body constructor
     * @constructor
     */
    constructor() {
        /**
         * Difference of previous x position (actural x velocity)
         * @type {number}
         */
        this.diffX = 0;
        /**
         * Difference of previous y position (actural y velocity)
         * @type {number}
         */
        this.diffY = 0;

        /**
         * Whether it is fixed for x direction or not
         * @type {boolean}
         */
        this.isFixX = false;
        /**
         * Whether it is fixed for y direction or not
         * @type {boolean}
         */
        this.isFixY = false;

        /**
         * Whether it is enabled or not
         * @type {boolean}
         */
        this.enable = true;

        /**
         * Mutable entity attaching rigid body
         * @protected
         * @type {MutableEntity}
         */
        this.entity = null;
        /**
         * Rigid material
         * @type {RigidMaterial}
         */
        this.material = null;
    }

    /**
     * Set mutable entity
     * @param {MutableEntity} entity Mutable entity
     */
    setEntity(entity) {
        this.entity = entity;
    }

    /**
     * Get entity attached it
     * @return {MutableEntity} Entity attached it
     */
    getEntity() {
        return this.entity;
    }

    /**
     * Set rigid material
     * @param {RigidMaterial} material Rigid material
     */
    setMaterial(material) {
        this.material = material;
    }

    /**
     * Get horizontal velocity of entity
     * @return {number} Horizontal velocity of entity
     */
    get velocityX() {
        return this.material.velocityX;
    }

    /**
     * Get vertical velocity of entityD
     * @return {number} Vertical velocity of entityD
     */
    get velocityY() {
        return this.material.velocityY;
    }

    /**
     * Get horizontal acceleration of entity
     * @return {number} Horizontal acceleration of entity
     */
    get accelerationX() {
        return this.material.accelerationX;
    }

    /**
     * Get vertical acceleration of entity
     * @return {number} Vertical acceleration of entity
     */
    get accelerationY() {
        return this.material.accelerationY;
    }

    /**
     * Reset rigid body state
     */
    reset() {
        this.material.reset();
        this.diffX = 0;
        this.diffY = 0;
        this.isFixX = false;
        this.isFixY = false;
    }

    /**
     * Set the value added to the next speed vector
     * @abstract
     * @param {number} vx X component of the velocity vector to be added
     * @param {number} vy Y component of the velocity vector to be added
     */
    setNextAddVelocity(vx, vy) {}

    /**
     * Apply force to objects
     * @abstract
     * @param {number} forceX Force in x direction
     * @param {number} forceY Force in y direction
     */
    enforce(forceX, forceY) {}

    /**
     * Initialize body
     * @abstract
     */
    init() {}

    /**
     * Prepare for updagte
     * @abstract
     * @param {number} dt delta time
     */
    prepare(dt) {}

    /**
     * Update rigid body information
     * @abstract
     * @protected
     */
    updateInfo(dt) {}

    /**
     * Update velocity
     * @abstract
     * @protected
     */
    updateVelocity(dt) {}

    /**
     * Update entity by velocity
     * @abstract
     * @protected
     */
    updateEntity(dt) {}

    /**
     * Update by rigid body
     * @param {number} dt delta time
     */
    update(dt) {
        this.updateInfo(dt);
        if (this.enable) {
            this.updateVelocity(dt);
            this.updateEntity(dt);
        }
    }

    /**
     * Cleanup body information
     * @abstract
     * @param {nuumber} dt Delta time
     */
    cleanup(dt) {}
}
/**
 * Rigid material
 * - ### Manages physical quantity
 * @interface
 * @classdesc Rigid body to manage physical quantity
 */
class RigidMaterial { // eslint-disable-line  no-unused-vars
    /**
     * Rigid body constructor
     * @constructor
     */
    constructor() {
        /**
         * Horizontal velocity of entity
         * @type {number}
         */
        this.velocityX = 0;
        /**
         * Vertical velocity of entity
         * @type {number}
         */
        this.velocityY = 0;
        /**
         * Horizontal acceleration of entity
         * @type {number}
         */
        this.accelerationX = 0;
        /**
         * Vertical acceleration of entity
         * @type {number}
         */
        this.accelerationY = 0;
    }

    /**
     * Reset rigid material state
     */
    reset() {
        this.velocityX = 0;
        this.velocityY = 0;
        this.accelerationX = 0;
        this.accelerationY = 0;
    }

    /**
     * Get coefficient of air resistance
     * @abstract
     * @return {number} Coefficient of air resistance
     */
    get k() {}

    /**
     * Get coefficient of x friction coefficient
     * @abstract
     * @return {number} Coefficient of x friction coefficient
     */
    get frictionX() {}

    /**
     * Get coefficient of y friction coefficient
     * @abstract
     * @return {number} Coefficient of y friction coefficient
     */
    get frictionY() {}

    /**
     * Get gravity scale
     * @abstract
     * @return {number} Gravity scale
     */
    get gravityScale() {}

    /**
     * Set coefficient of air resistance
     * @abstract
     * @param {number} val Coefficient of air resistance
     */
    set k(val) {}

    /**
     * Set coefficient of x friction coefficient
     * @abstract
     * @param {number} val Coefficient of x friction coefficient
     */
    set frictionX(val) {}

    /**
     * Set coefficient of y friction coefficient
     * @abstract
     * @param {number} val Coefficient of y friction coefficient
     */
    set frictionY(val) {}

    /**
     * Set gravity scale
     * @abstract
     * @param {number} val Gravity scale
     */
    set gravityScale(val) {}
}
/**
 * Axis Aligned Bounding Box
 * - ### Uses for rough collision determination
 * @interface
 * @classdesc Axis Aligned Bounding Box to use for rough collision determination
 */
class AABB { // eslint-disable-line  no-unused-vars
    /**
     * Get start x position
     * @abstract
     * @return {number} Start x position
     */
    get startX() {}

    /**
     * Get start y position
     * @abstract
     * @return {number} Start y position
     */
    get startY() {}

    /**
     * Get end x position
     * @abstract
     * @return {number} End x position
     */
    get endX() {}

    /**
     * Get end y position
     * @abstract
     * @return {number} End y position
     */
    get endY() {}

    /**
     * Update AABB
     * @abstract
     * @param {number} startX Relative x coordinate of the upper left
     * @param {number} startY Relative y coordinate of the upper left
     * @param {number} endX Relative x coordinate of the lower right
     * @param {number} endY Relative y coordinate of the lower right
     * @param {InfluentialEntity} entity Entity attaced it
     */
    update(startX, startY, endX, endY, entity) {}
}
/**
 * Collder
 * - ### Store collider data for judgeing collision
 * @interface
 * @classdesc Collider to store collider data for judging collision
 */
class Collider { // eslint-disable-line  no-unused-vars
    /**
     * Collider constructor
     * @constructor
     */
    constructor() {
        /**
         * AABB for collision detection
         * @protected
         * @type {AABB}
         */
        this.aabb = null;

        /**
         * List of collided objects
         * @type {Array<CollisionData>}
         */
        this.collisions = [];

        /**
         * Whether to perform collision response or not
         * @type {boolean}
         */
        this.response = true;
        /**
         * Whether collision judgment is to be done or not
         * @type {boolean}
         */
        this.enable = true;

        /**
         * Entity attaching this
         * @protected
         * @type {Entity}
         */
        this.entity = null;

        /**
         * Whether or not the collision information has already been cleared
         * @protected
         * @type {boolean}
         */
        this.cleared = false;
    }

    /**
     * Initialize state
     */
    init() {
        if (!this.cleared) {
            this.clear();
        }
        this.update();
        this.cleared = false;
    }

    /**
     * Clear collision data
     */
    clear() {
        this.collisions.length = 0;
        this.cleared = true;
    }

    /**
     * Set entity attaching this
     * @param {Entity} entity Entity attaching this
     */
    setEntity(entity) {
        this.entity = entity;
    }

    /**
     * Set collider AABB
     * @param {AABB} aabb Axis Aligned Bounding Box
     */
    setAABB(aabb) {
        this.aabb = aabb;
    }

    /**
     * Get collider AABB
     * @return {AABB} Axis Aligned Bounding Box
     */
    getAABB() {
        return this.aabb;
    }

    /**
     * Add collision information
     * @param {CollisionData} collision Collision information to be added
     */
    addCollision(collision) {
        this.collisions.push(collision);
    }

    /**
     * Set whether to perform collision response or not
     * @param {Colllder} collider Target collider
     * @return {boolean} whether to perform collision response or not
     */
    isResponse(collider) {
        return this.response;
    }

    /**
     * Judge whether position is in collider
     * @abstract
     * @param {number} x X position
     * @param {number} y Y position
     * @return {boolean} Whether position is in collider
     */
    isInCollider(x, y) {}

    /**
     * Judge whether collision
     * @abstract
     * @param {Colllder} collider Target collider
     * @param {CollisionData} [data=null] Pointer to save conflict information
     * @return {boolean} Whether collision
     */
    isCollision(collider, data = null) {}

    /**
     * Judge whether collision roughly
     * @param {Colllder} collider Target collider
     * @return {boolean} Qhether collision roughly
     */
    isCollisionRoughly(collider) {
        // check enable
        if (!this.enable) {
            return false;
        }
        const me = this.getAABB();
        const you = collider.getAABB();
        return me.endX >= you.startX && you.endX >= me.startX && me.endY >= you.startY && you.endY >= me.startY;
    }

    /**
     * Fix collider bounds
     * @abstract
     * @param {number} startX Relative x coordinate of the upper left
     * @param {number} startY Relative y coordinate of the upper left
     * @param {number} endX Relative x coordinate of the lower right
     * @param {number} endY Relative y coordinate of the lower right
     */
    fixBound(startX, startY, endX, endY) {}

    /**
     * Update collide information
     * Called whenever coordinate information is updated
     * @abstract
     */
    update() {}

    /**
     * Render collider for debug
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {}
}
/**
 * Collision data
 * - ### Data obtained by collision detection
 * @interface
 * @classdesc Collision data obtained by collision detection
 */
class CollisionData { // eslint-disable-line  no-unused-vars
    /**
     * Collision data constructor
     * @constructor
     * @param {MutableEntity} colliding Colliding entity
     * @param {InfluentialEntity} collided Collided entity
     * @param {number} nx X component of normal vector
     * @param {number} ny Y component of normal vector
     * @param {number} px Collision x point
     * @param {number} py Collision y point
     * @param {number} depth Depth of collision
     */
    constructor(colliding, collided, nx, ny, px, py, depth) {
        /**
         * Colliding entity
         * @type {MutableEntity}
         */
        this.colliding = colliding;
        /**
         * Collided entity
         * @type {InfluentialEntity}
         */
        this.collided = collided;
        /**
         * X component of normalized collision vector from colliding to collided
         * @type {number}
         */
        this.nx = nx;
        /**
         * Y component of normalized collision vector from colliding to collided
         * @type {number}
         */
        this.ny = ny;
        /**
         * Depth of collision
         * @type {number}
         */
        this.depth = depth;
        /**
         * Collision x point
         * @type {number}
         */
        this.px = px;
        /**
         * Collision y point
         * @type {number}
         */
        this.py = py;

        /**
         * Descending priority
         * @protected
         * @type {number}
         */
        this.priorityVal = 0;
    }

    get priority() {
        if (this.priorityVal === null) {
            this.priorityVal = this.calcPriority();
        }
        return this.priorityVal;
    }

    /**
     * Register information
     * @param {MutableEntity} colliding Colliding entity
     * @param {InfluentialEntity} collided Collided entity
     * @param {number} nx X component of normal vector
     * @param {number} ny Y component of normal vector
     * @param {number} px Collision x point
     * @param {number} py Collision y point
     * @param {number} depth Depth of collision
     */
    register(colliding, collided, nx, ny, px, py, depth) {
        this.colliding = colliding;
        this.collided = collided;
        this.nx = nx;
        this.ny = ny;
        this.px = px;
        this.py = py;
        this.depth = depth;
    }

    /**
     * Initialize collision data
     */
    init() {
        this.priorityVal = null;
    }

    /**
     * Calculate descending priority
     * @abstract
     * @protected
     * @return {number} Priority
     */
    calcPriority() {}
}
/**
 * Collision response
 * Performs collision response
 * @interface
 * @classdesc Collision response to performs collision response
 */
class CollisionResponse { // eslint-disable-line  no-unused-vars
    /**
     * Perform collision response
     * @abstract
     * @param {CollisionData} data Collision data
     * @param {number} dt delta time
     */
    collisionResponse(data, dt) {}
}
/**
 * Material
 * - ### Object information
 * - ### If the object has a Collider, it must be held
 * @interface
 * @classdesc Material that indicates object information
 */
class Material { // eslint-disable-line  no-unused-vars
    /**
     * Get mass
     * @abstract
     * @return {number} Mass
     */
    get mass() {}

    /**
     * Get coefficient of restitution
     * @abstract
     * @return {number} Coefficient of restitution
     */
    get e() {}

    /**
     * Get coefficient of restitution
     * @abstract
     * @return {number} Coefficient of restitution
     */
    get mu() {}
}
/**
 * Physical world
 * - ### Performs a physical operation
 * - ### Registers entities and apply a physical operation
 * @interface
 * @classdesc Physical world to perform a physical operation by registering entities
 */
class PhysicalWorld { // eslint-disable-line  no-unused-vars
    /**
     * Physical world constructor
     * @constructor
     * @param {number} gravity Gravity of the world
     */
    constructor(gravity) {
        /**
         * Gravity power
         * @protected
         * @type {number}
         */
        this.gravity = gravity * 100;

        /**
         * Collision response instance
         * @protected
         * @type {CollisionResponse}
         */
        this.response = null;
    }

    /**
     * Set response instance for collision response
     * @param {CollisionResponse} response Collision response instance
     */
    setResponse(response) {
        this.response = response;
    }

    /**
     * Get response instance for collision response
     * @return {CollisionResponse} Collision response instance
     */
    getResponse() {
        return this.response;
    }

    /**
     * Add entity in physical world
     * @abstract
     * @param {InfluentialEntity} entity Entity in physical world
     */
    addEntity(entity) {}

    /**
     * Remove entity from physical world
     * @abstract
     * @param {InfluentialEntity} entity Entity to remove from physical world
     */
    removeEntity(entity) {}

    /**
     * Get collision information now
     * @abstract
     * @param {Collider} collider Target collider
     * @return {Array<CollisionData>} Collision information now
     */
    getCollisionData(collider) {}

    /**
     * Get the total number of collisions
     * @abstract
     * @return {number} Total number of collisions
     */
    getCollisionSize() {}

    /**
     * Update external force
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    updateExternalForce(dt) {}

    /**
     * Prepare body
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    prepareBody(dt) {}

    /**
     * Update body
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    updateBody(dt) {}

    /**
     * Update body to cleanup
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    updateBodyCleanup(dt) {}

    /**
     * Initialize collision state
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    initCollision(dt) {}

    /**
     * Update collisions
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    updateCollision(dt) {}

    /**
     * Update collisions response
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    updateResponse(dt) {}

    /**
     * Cleanup all information
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    cleanup(dt) {}

    /**
     * Update physical world
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    update(dt) {
        this.updateExternalForce(dt);
        this.prepareBody(dt);
        this.updateBody(dt);
        this.updateBodyCleanup(dt);
        this.initCollision(dt);
        this.updateCollision(dt);
        this.updateResponse(dt);
        this.cleanup(dt);
    }

    /**
     * Render world
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    render(ctx, shiftX, shiftY) {}
}
/**
 * Stage
 * - ### Store stage size
 * - ### Performs updating and rendering stage
 * - ### Manages stage element such as entity
 * @interface
 * @classdesc Stage to control stage element
 */
class Stage { // eslint-disable-line  no-unused-vars
    /**
     * Stage constructor
     * @constructor
     * @param {number} stageWidth Stage width (pixel)
     * @param {number} stageHeight Stage height (pixel)
     */
    constructor(stageWidth, stageHeight) {
        /**
         * Stage width (pixel)
         * @protected
         * @type {number}
         */
        this.stageWidth = stageWidth;
        /**
         * Stage height (pixel)
         * @protected
         * @type {number}
         */
        this.stageHeight = stageHeight;

        /**
         * Whether to update the stage or not
         * @protected
         * @type {boolean}
         */
        this.enable = true;

        /**
         * Stage background element
         * @protected
         * @type {Background}
         */
        this.back = null;
        /**
         * Stage camera element
         * @protected
         * @type {Camera}
         */
        this.camera = null;
        /**
         * Physical world
         * @protected
         * @type {PhysicalWorld}
         */
        this.physic = null;

        /**
         * Entity factory
         * @protected
         * @type {EntityFactory}
         */
        this.factory = null;
    }

    /**
     * Set background manager
     * @param {Background} back Background manager
     */
    setBackground(back) {
        this.back = back;
        this.back.init();
    }

    /**
     * Set camera
     * @param {Camera} camera Camera
     */
    setCamera(camera) {
        this.camera = camera;
    }

    /**
     * Set physical world
     * @param {PhysicalWorld} physic Physical world
     */
    setPhysicalWorld(physic) {
        this.physic = physic;
    }

    /**
     * Set entity factory
     * @param {EntityFactory} factory Entity factory
     */
    setFactory(factory) {
        this.factory = factory;
    }

    /**
     * Get physical world
     * @return {PhysicalWorld} Physical world
     */
    getPhysicalWorld() {
        return this.physic;
    }

    /**
     * Get camera
     * @return {Camera} Camera of stage
     */
    getCamera() {
        return this.camera;
    }

    /**
     * Get factory
     * @protected
     * @return {EntityFactory} Entity factory
     */
    getFactory() {
        return this.factory;
    }

    /**
     * Set whether to update the stage or not
     * @param {boolean} enable Whether to update the stage or not
     */
    setEnable(enable) {
        this.enable = enable;
    }

    /**
     * Get whether to update the stage or not
     * @return {boolean} Whether to update the stage or not
     */
    getEnable() {
        return this.enable;
    }

    /**
     * Get stage width
     * @return {number} Stage width
     */
    getStageWidth() {
        return this.stageWidth;
    }

    /**
     * Get stage height
     * @return {number} Stage height
     */
    getStageHeight() {
        return this.stageHeight;
    }

    /**
     * Add entity to stage by ID
     * @param {Object} id Added entity ID
     * @param {JSON} deploy Deploy json data
     * @return {Entity} Added entity
     */
    addEntityByID(id, deploy) {
        const ret = this.getFactory().createEntity(id, deploy);
        this.addEntity(ret);
        return ret;
    }

    /**
     * Add entity to stage
     * @param {Entity} entity Entity object
     */
    addEntity(entity) {
        if (entity.stage === null) {
            entity.setStage(this);
        }
        entity.init();
    }

    /**
     * Remove entity from stage
     * @abstract
     * @param {Entity} entity Entity object
     */
    removeEntity(entity) {}

    /**
     * Remove entity from stage immediately
     * @abstract
     * @protected
     * @param {Entity} entity Entity object
     */
    removeEntityImmediately(entity) {}

    /**
     * Get all entities
     * @abstract
     * @return {Array<Entity>} All entities
     */
    getEntities() {}

    /**
     * Update entity in stage
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    updateEntity(dt) {}

    /**
     * Update entity in stage by physical world
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    updatePhysics(dt) {}

    /**
     * Update background
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    updateBackground(dt) {}

    /**
     * Update camera
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    updateCamera(dt) {}

    /**
     * Initialize stage
     * @abstract
     */
    init() {}

    /**
     * Update stage
     * @param {number} dt Delta time
     */
    update(dt) {
        if (this.getEnable()) {
            this.updateEntity(dt);
            this.updatePhysics(dt);
        }
        this.updateBackground(dt);
        this.updateCamera(dt);
    }

    /**
     * Render background in stage
     * @abstract
     * @protected
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    renderBackground(ctx, shiftX, shiftY) {}

    /**
     * Render entities in stage
     * @abstract
     * @protected
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    renderEntity(ctx, shiftX, shiftY) {}

    /**
     * Render world in stage
     * @abstract
     * @protected
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    renderWorld(ctx, shiftX, shiftY) {}

    /**
     * Render stage
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        shiftX += this.camera.baseX;
        shiftY += this.camera.baseY;
        this.renderBackground(ctx, shiftX, shiftY);
        this.renderEntity(ctx, shiftX, shiftY);
        this.renderWorld(ctx, shiftX, shiftY);
    }
}
/**
 * Stage manager
 * - ### Manages stage
 * @interface
 * @classdesc Stage manager to manage stage
 */
class StageManager { // eslint-disable-line  no-unused-vars
    /**
     * Stage manager constructor
     * @constructor
     */
    constructor() {
        // set singleton
        StageManager.it = this;

        /**
         * Stage parser
         * @protected
         * @type {StageParser}
         */
        this.parser = null;

        /**
         * Stage width
         * @protected
         * @type {number}
         */
        this.width = 0;
        /**
         * Stage height
         * @protected
         * @type {number}
         */
        this.height = 0;
    }

    /**
     * Set stage parser
     * @param {StageParser} parser Stage parser
     */
    setStageParser(parser) {
        this.parser = parser;
    }

    /**
     * Set stage size
     * @param {number} width Stage width
     * @param {number} height Stage height
     */
    setStageSize(width, height) {
        this.width = width;
        this.height = height;
    }

    /**
     * Push stage to list
     * @abstract
     * @param {string} stageName Stage name
     */
    pushStage(stageName) {}

    /**
     * Replace currently stage
     * @param {string} stageName Stage name
     */
    replaceStage(stageName) {
        this.popStage();
        this.pushStage(stageName);
    }

    /**
     * Pop stage from list
     * @abstract
     * @return {Stage} Stage that is popped from list
     */
    popStage() {}

    /**
     * Get stage
     * @abstract
     * @return {Stage} Currently stage
     */
    getStage() {}

    /**
     * Update stage
     * @param {number} dt Delta time
     */
    update(dt) {
        const stage = this.getStage();
        if (stage !== null) {
            stage.update(dt);
        }
    }

    /**
     * Render stage
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        const stage = this.getStage();
        if (stage !== null) {
            stage.render(ctx, shiftX, shiftY);
        }
    }
}

/**
 * Stage manager singleton instance
 * @type {StageManager}
 */
StageManager.it = null;
/**
 * Timer
 * - ### Measure the time
 * @interface
 * @classdesc TImer to measure the time
 */
class Timer { // eslint-disable-line  no-unused-vars
    /**
     * Timer constructor
     * @constructor
     */
    constructor() {
        /**
         * Delta time
         * @protected
         * @type {number}
         */
        this.deltaTime = 0;

        // set singleton
        Timer.it = this;
    }

    /**
     * Start to measure timer by name
     * @abstract
     * @param {string} name Timer name
     */
    startTimer(name) {}

    /**
     * Stop measuring timer by name
     * @abstract
     * @param {string} name Timer name
     */
    stopTimer(name) {}

    /**
     * Get timer by name
     * @abstract
     * @param {string} name Timer name
     * @return {number} Timer by name
     */
    getTimer(name) {}

    /**
     * Initialize timer
     * @abstract
     */
    init() {}

    /**
     * Update timer
     * @param {number} dt Delta time
     */
    update(dt) {
        this.deltaTime = dt;
    }

    /**
     * Render timer
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} x Timer x position
     * @param {number} y Timer y position
     */
    render(ctx, x, y) {}
}

/**
 * Instance for singleton
 * @type {Timer}
 */
Timer.it = null;
/**
 * Convenient method group
 * @classdesc Convenient method group
 */
class BaseUtil { // eslint-disable-line  no-unused-vars
    /**
     * Whether it inherit interfaces
     * @param {Object} instance Instance to be validated
     * @param {Interface} i Interface
     * @return {boolean} Whether you are implementing interfaces
     */
    static implementsOf(instance, i) {
        let inter = BaseUtil.interfaces[i.name];
        if (inter === undefined) {
            inter = BaseUtil.interfaces[i.name] = (new(i.bind(i)));
        }
        return inter.validate(instance);
    }

    /**
     * Get class name by instance
     * @param {Object} instance Instance for getting class name
     * @return {string} Class name
     */
    static getClassName(instance) {
        return instance.constructor.toString().split(`\n`)[0].split(` `)[1];
    }
}

/**
 * Singleton interface list
 * @protected
 * @type {Object<string, Interface>}
 */
BaseUtil.interfaces = {};
/**
 * Interface
 * - ### Base class of interface
 * @classdesc Base class of interface
 */
class Interface { // eslint-disable-line  no-unused-vars
    /**
     * Interface constructor
     * @constructor
     */
    constructor() {
        /**
         * Methods of interface
         * @private
         * @type {Array<Method>}
         */
        this._methods = [];

        /**
         * Getters of interface
         * @private
         * @type {Array<string>}
         */
        this._getters = [];
        /**
         * Setters of interface
         * @private
         * @type {Array<string>}
         */
        this._setters = [];

        // add methods
        this.addMethodsAutomatically();
    }

    /**
     * Add method automatically
     * @protected
     */
    addMethodsAutomatically() {
        let proto = this.__proto__;
        while (proto !== null) {
            for (const it of Object.getOwnPropertyNames(proto)) {
                // If it traces up to Interface, it ends
                if (it === `constructor`) {
                    if (proto[it] === Interface) {
                        return;
                    }
                    continue;
                }
                // add methods
                if (proto[it] instanceof Function) {
                    this.addMethod(proto[it]);
                }
                // add getter and setter
                const disc = Object.getOwnPropertyDescriptor(proto, it);
                if (disc !== undefined) {
                    if (disc.get !== undefined) {
                        this._getters.push(it);
                    }
                    if (disc.set !== undefined) {
                        this._setters.push(it);
                    }
                }
            }
            proto = proto.__proto__;
        }
    }

    /**
     * Add method of interface
     * @protected
     * @param {Function} method Method
     */
    addMethod(method) {
        this._methods.push(new Method(method.name, method.length));
    }

    /**
     * Validate interface
     * @param {Object} instance Instance to be validated
     * @return {boolean} Whether you are implementing interfaces
     */
    validate(instance) {
        if (instance === null || instance === undefined) {
            return false;
        }
        // check method
        for (const it of this._methods) {
            if (instance[it.name] instanceof Function && instance[it.name].length === it.length) {
                continue;
            }
            return false;
        }
        // check getter
        for (const it of this._getters) {
            let proto = instance.__proto__;
            let exists = false;
            while (proto !== null) {
                const disc = Object.getOwnPropertyDescriptor(proto, it);
                if (disc !== undefined && disc.get !== undefined) {
                    exists = true;
                    break;
                }
                proto = proto.__proto__;
            }
            if (exists) {
                continue;
            }
            return false;
        }
        // check setter
        for (const it of this._setters) {
            let proto = instance.__proto__;
            let exists = false;
            while (proto !== null) {
                const disc = Object.getOwnPropertyDescriptor(proto, it);
                if (disc !== undefined && disc.set !== undefined) {
                    exists = true;
                    break;
                }
                proto = proto.__proto__;
            }
            if (exists) {
                continue;
            }
            return false;
        }
        return true;
    }
}
/**
 * Method data class
 * @classdesc Method data class
 */
class Method { // eslint-disable-line  no-unused-vars
    /**
     * Method constructor
     * @param {string} name Method name
     * @param {number} length Method arguments length
     */
    constructor(name, length) {
        /**
         * Method name
         * @type {string}
         */
        this.name = name;
        /**
         * Method arguments length
         * @type {number}
         */
        this.length = length;
    }
}
/**
 * Game debugger
 * - ### Registers debug information
 * @interface
 * @classdesc Game debugger for registering debug information
 */
class GameDebugger { // eslint-disable-line  no-unused-vars
    /**
     * Game debugger constructor
     * @constructor
     */
    constructor() {
        // set singleton
        GameDebugger.it = this;
    }

    /**
     * Register debug information
     * @abstract
     * @param {string} name Debug information name
     * @param {string} value Debug information value
     */
    register(name, value) {}

    /**
     * Initialize debugger
     * @abstract
     */
    init() {}

    /**
     * Update debugger
     * @abstract
     * @param {number} dt Delta time
     */
    update(dt) {}

    /**
     * Render debugger
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} x Debugger x position
     * @param {number} y Debugger y position
     */
    render(ctx, x, y) {}
}

/**
 * Instance for singleton
 * @type {GameDebugger}
 */
GameDebugger.it = null;

/**
 * Whether it is debug mode or not
 * @static
 * @type {boolean}
 */
GameDebugger.debug = false;
/**
 * Debug layer
 * - Performs drawing processing collectively
 * - ### Renders information necessary for debugging
 * @extends {Layer}
 * @classdesc Debug layer to render information necessary for debugging
 */
class DebugLayer extends Layer { // eslint-disable-line  no-unused-vars
    /**
     * Debug layer constructor
     * @constructor
     * @param {GaemDebugger} debug Debugger instance
     */
    constructor(debug) {
        super();

        /**
         * Stage instance
         * @protected
         * @type {GameDebugger}
         */
        this.debug = debug;
    }

    /**
     * Initialize layer
     * @override
     */
    init() {
        this.debug.init();
    }

    /**
     * Update layer
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        this.debug.update(dt);
    }

    /**
     * Render layer
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        Timer.it.render(ctx, this.x, this.y);
        this.debug.render(ctx, this.x + this.width, this.y);
    }
}
/**
 * Debug stage
 * - Store stage size
 * - Performs updating and rendering stage
 * - Manages stage element such as entity
 * - ### Executes debug process by delegation
 * @extends {Stage}
 * @classdesc Debug stage to execute debug processs by delegation
 */
class DebugStage extends Stage { // eslint-disable-line  no-unused-vars
    /**
     * Debug stage constructor
     * @param {Stage} stage Original stage for delegation
     * @constructor
     */
    constructor(stage) {
        super(stage.stageWidth, stage.stageHeight);

        /**
         * Original stage for delegation
         * @protected
         * @type {Stage}
         */
        this.stage = stage;

        /**
         * Sequential execution mode
         * @protected
         * @type {boolean}
         */
        this.debugMode = false;
    }

    /**
     * Register debug information
     * @prtected
     * @param {number} dt Delta time
     */
    registerInformation(dt) {
        const players = this.getEntities().filter((it) => BaseUtil.implementsOf(it, IPlayable));
        if (players.length > 0) {
            const player = players[0];
            GameDebugger.it.register(`time`, `${dt} mssc`);
            GameDebugger.it.register(`collision`, `${this.getPhysicalWorld().getCollisionSize()} collision`);
            if (player instanceof InfluentialEntity) {
                GameDebugger.it.register(`pcollision`, `${player.collider.collisions.length} player collision`);
            }
            GameDebugger.it.register(`physics`, `${BaseUtil.getClassName(this.getPhysicalWorld() instanceof DebugWorld ? this.getPhysicalWorld().world : this.getPhysicalWorld())}-${BaseUtil.getClassName(this.getPhysicalWorld().getResponse())}`);
            GameDebugger.it.register(`ppos`, `Pos(${Math.floor(player.x)}, ${Math.floor(player.y)})`);
            if (player instanceof MutableEntity) {
                GameDebugger.it.register(`pvec`, `Vec(${Math.floor(player.body.velocityX)}, ${Math.floor(player.body.velocityY)})`);
                GameDebugger.it.register(`pacc`, `Acc(${Math.floor(player.body.accelerationX)},${Math.floor(player.body.accelerationY)})`);
            }
            if (player instanceof StateCharacter && player.state !== null) {
                GameDebugger.it.register(`state`, `${BaseUtil.getClassName(player.state)}`);
            }
            GameDebugger.it.register(`mouse`, `M(${Math.floor(Input.mouse.getMouseX())},${Math.floor(Input.mouse.getMouseY())})`);
        }
    }

    /**
     * Render entity information for debug
     * @protected
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    renderEntityInformation(ctx, shiftX, shiftY) {
        const startX = -this.stage.camera.cameraX;
        const startY = -this.stage.camera.cameraY;
        const endX = startX + this.stage.camera.screenWidth;
        const endY = startY + this.stage.camera.screenHeight;
        const mx = Input.mouse.getMouseX() + startX;
        const my = Input.mouse.getMouseY() + startY;
        for (const it of this.getEntities()) {
            if (it.x + it.width >= startX && it.x < endX && it.y + it.height >= startY && it.y < endY) {
                if (it instanceof InfluentialEntity && it.collider !== null) {
                    // render collider
                    it.collider.render(ctx, this.stage.camera.baseX - startX, this.stage.camera.baseY - startY);
                    // render information
                    if (it.collider.isInCollider(mx, my)) {
                        ctx.fillText(`P(${Math.floor(it.x)}, ${Math.floor(it.y)})`, mx - startX, my - startY, 0.0, 0.0, 20, `white`);
                        if (it instanceof MutableEntity && it.body !== null) {
                            ctx.fillText(`V(${Math.floor(it.body.velocityX)}, ${Math.floor(it.body.velocityY)})`, mx - startX, my - startY + 30, 0.0, 0.0, 20, `white`);
                            ctx.fillText(`M(${Math.floor(it.body.vpx)}, ${Math.floor(it.body.vpy)}),(${Math.floor(it.body.vmx)}, ${Math.floor(it.body.vmy)})`, mx - startX, my - startY + 60, 0.0, 0.0, 20, `white`);
                            ctx.fillText(`A(${Math.floor(it.body.accelerationX)}, ${Math.floor(it.body.accelerationY)})`, mx - startX, my - startY + 90, 0.0, 0.0, 20, `white`);
                            ctx.fillText(`F((${it.body.isFixX}, ${it.body.isFixY}) - (${Math.floor(it.body.diffX)}, ${Math.floor(it.body.diffY)}))`, mx - startX, my - startY + 120, 0.0, 0.0, 20, `white`);
                        }
                    }
                } else if (BaseUtil.implementsOf(it, IColliderable)) {
                    it.getCollider().render(ctx, this.stage.camera.baseX - startX, this.stage.camera.baseY - startY);
                    if (it.getCollider().isInCollider(mx, my)) {
                        ctx.fillText(`P(${Math.floor(it.x)}, ${Math.floor(it.y)})`, mx - startX, my - startY, 0.0, 0.0, 20, `white`);
                    }
                }
            }
        }
    }

    /**
     * Set background manager
     * @override
     * @param {Background} back Background manager
     */
    setBackground(back) {
        this.stage.setBackground(back);
    }

    /**
     * Set camera
     * @override
     * @param {Camera} camera Camera
     */
    setCamera(camera) {
        this.stage.setCamera(camera);
    }

    /**
     * Set physical world
     * @override
     * @param {PhysicalWorld} physic Physical world
     */
    setPhysicalWorld(physic) {
        this.stage.setPhysicalWorld(physic);
    }

    /**
     * Set entity factory
     * @override
     * @param {EntityFactory} factory Entity factory
     */
    setFactory(factory) {
        this.stage.setFactory(factory);
    }

    /**
     * Get camera
     * @return {Camera} Camera of stage
     */
    getCamera() {
        return this.stage.getCamera();
    }

    /**
     * Get physical world
     * @override
     * @return {PhysicalWorld} Physical world
     */
    getPhysicalWorld() {
        return this.stage.getPhysicalWorld();
    }

    /**
     * Get factory
     * @override
     * @return {EntityFactory} Entity factory
     */
    getFactory() {
        return this.stage.getFactory();
    }


    /**
     * Set whether to update the stage or not
     * @override
     * @param {boolean} enable Whether to update the stage or not
     */
    setEnable(enable) {
        super.setEnable(enable);
        this.stage.setEnable(enable);
    }

    /**
     * Get whether to update the stage or not
     * @override
     * @return {boolean} Whether to update the stage or not
     */
    getEnable() {
        return this.stage.getEnable();
    }

    /**
     * Get stage width
     * @override
     * @return {number} Stage width
     */
    getStageWidth() {
        return this.stage.getStageWidth();
    }

    /**
     * Get stage height
     * @override
     * @return {number} Stage height
     */
    getStageHeight() {
        return this.stage.getStageHeight();
    }

    /**
     * Add entity to stage
     * @override
     * @param {Entity} entity Entity object
     */
    addEntity(entity) {
        entity.setStage(this);
        this.stage.addEntity(entity);
    }

    /**
     * Remove entity from stage
     * @override
     * @param {Entity} entity Entity object
     */
    removeEntity(entity) {
        this.stage.removeEntity(entity);
    }

    /**
     * Remove entity from stage immediately
     * @abstract
     * @protected
     * @param {Entity} entity Entity object
     */
    removeEntityImmediately(entity) {
        this.stage.removeEntityImmediately(entity);
    }

    /**
     * Get all entities
     * @override
     * @return {Array<Entity>} All entities
     */
    getEntities() {
        return this.stage.getEntities();
    }

    /**
     * Initialize stage
     * @override
     */
    init() {
        this.stage.init();
    }

    /**
     * Update entity in stage
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateEntity(dt) {
        Timer.it.startTimer(`entity`);
        this.stage.updateEntity(dt);
        Timer.it.stopTimer(`entity`);
    }

    /**
     * Update entity in stage by physical world
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updatePhysics(dt) {
        Timer.it.startTimer(`physics`);
        this.stage.updatePhysics(dt);
        Timer.it.stopTimer(`physics`);
    }

    /**
     * Update background
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateBackground(dt) {
        this.stage.updateBackground(dt);
    }

    /**
     * Update camera
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateCamera(dt) {
        this.stage.updateCamera(dt);
    }

    /**
     * Update stage
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        // switch mode (F)
        if (Input.key.isPress(Input.key.a() + 5)) {
            this.debugMode = !this.debugMode;
        }
        // sequential execution (A) (B)
        if (!this.debugMode || (Input.key.isPress(Input.key.a()) || Input.key.isPressed(Input.key.a() + 1))) {
            // acceleration (I)
            super.update(Input.key.isPressed(Input.key.a() + 8) ? dt * 10 : dt);
        }
        this.registerInformation(dt);
    }

    /**
     * Render background in stage
     * @override
     * @protected
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    renderBackground(ctx, shiftX, shiftY) {
        Timer.it.startTimer(`renderBackground`);
        this.stage.renderBackground(ctx, shiftX, shiftY);
        Timer.it.stopTimer(`renderBackground`);
    }

    /**
     * Render entities in stage
     * @override
     * @protected
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    renderEntity(ctx, shiftX, shiftY) {
        Timer.it.startTimer(`renderEntity`);
        this.stage.renderEntity(ctx, shiftX, shiftY);
        Timer.it.stopTimer(`renderEntity`);

        // For debug to render entity information
        if (GameDebugger.debug) {
            this.renderEntityInformation(ctx, shiftX, shiftY);
        }
    }

    /**
     * Render world in stage
     * @abstract
     * @protected
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    renderWorld(ctx, shiftX, shiftY) {
        this.stage.renderWorld(ctx, shiftX, shiftY);
    }

    /**
     * Render stage
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        shiftX += this.stage.camera.baseX;
        shiftY += this.stage.camera.baseY;
        this.renderBackground(ctx, shiftX, shiftY);
        this.renderEntity(ctx, shiftX, shiftY);
    }
}
/**
 * Debug world
 * - Performs a physical operation
 * - Registers entities and apply a physical operation
 * - ### Measure time for debugging by delegation
 * @extends {PhysicalWorld}
 * @classdesc Debug world to measure time for debugging by delegation
 */
class DebugWorld extends PhysicalWorld { // eslint-disable-line  no-unused-vars
    /**
     * Debug world constructor
     * @constructor
     * @param {PhysicalWorld} world Original world for delegation
     * @param {number} stageWidth Stage width (pixel)
     * @param {number} stageHeight Stage height (pixel)
     */
    constructor(world, stageWidth, stageHeight) {
        super(world.gravity);

        /**
         * Original world for delegation
         * @protected
         * @type {PhysicalWorld}
         */
        this.world = world;

        /**
         * Stage width (pixel)
         * @protected
         * @type {number}
         */
        this.stageWidth = stageWidth;
        /**
         * Stage height (pixel)
         * @protected
         * @type {number}
         */
        this.stageHeight = stageHeight;
    }
    /**
     * Set response instance for collision response
     * @override
     * @param {CollisionResponse} response Collision response instance
     */
    setResponse(response) {
        this.world.setResponse(response);
    }

    /**
     * Get response instance for collision response
     * @override
     * @return {CollisionResponse} Collision response instance
     */
    getResponse() {
        return this.world.getResponse();
    }

    /**
     * Add entity in physical world
     * @override
     * @param {InfluentialEntity} entity Entity in physical world
     */
    addEntity(entity) {
        this.world.addEntity(entity);
    }

    /**
     * Remove entity from physical world
     * @override
     * @param {InfluentialEntity} entity Entity to remove from physical world
     */
    removeEntity(entity) {
        this.world.removeEntity(entity);
    }

    /**
     * Get collision information now
     * @override
     * @param {Collider} collider Target collider
     * @return {Array<CollisionData>} Collision information now
     */
    getCollisionData(collider) {
        return this.world.getCollisionData(collider);
    }

    /**
     * Get the total number of collisions
     * @override
     * @return {number} Total number of collisions
     */
    getCollisionSize() {
        return this.world.getCollisionSize();
    }

    /**
     * Update external force
     * @protected
     * @override
     * @param {number} dt Delta time
     */
    updateExternalForce(dt) {
        Timer.it.startTimer(`external`);
        this.world.updateExternalForce(dt);
        Timer.it.stopTimer(`external`);
    }

    /**
     * Prepare body
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    prepareBody(dt) {
        Timer.it.startTimer(`body`);
        this.world.prepareBody(dt);
    }

    /**
     * Update body
     * @protected
     * @override
     * @param {number} dt Delta time
     */
    updateBody(dt) {
        this.world.updateBody(dt);
    }

    /**
     * Update body to cleanup
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateBodyCleanup(dt) {
        this.world.updateBodyCleanup(dt);
        Timer.it.stopTimer(`body`);
    }

    /**
     * Initialize collision state
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    initCollision(dt) {
        Timer.it.startTimer(`collide`);
        this.world.initCollision(dt);
    }

    /**
     * Update collisions
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateCollision(dt) {
        this.world.updateCollision(dt);
        Timer.it.stopTimer(`collide`);
    }

    /**
     * Update collisions response
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateResponse(dt) {
        Timer.it.startTimer(`response`);
        this.world.updateResponse(dt);
        Timer.it.stopTimer(`response`);
    }

    /**
     * Cleanup all information
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    cleanup(dt) {
        this.world.cleanup();
    }

    /**
     * Update physical world
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    update(dt) {
        super.update(dt);
        // Change response (Q)
        if (Input.key.isPress(Input.key.a() + 16)) {
            const response = this.world.getResponse();
            if (response instanceof UnderRepulsionResponse) {
                this.world.setResponse(new RepulsionResponse());
            } else {
                // TODO: Separate from debug
                this.world.setResponse(new UnderRepulsionResponse());
            }
        }
        // Change wprld (W)
        if (Input.key.isPress(Input.key.a() + 22)) {
            const world = this.world instanceof SplitWorld ? new SequentialWorld(this.gravity / 10000) : new SplitWorld(this.stageWidth, this.stageHeight, this.gravity / 10000);
            world.setResponse(this.world.getResponse());
            for (const it of this.world.entities) {
                world.addEntity(it);
            }
            this.world = world;
        }
    }
}
/**
 * Volatile debugger
 * - Registers debug information
 * - ### Resets infromation for each update
 * @extends {GameDebugger}
 * @classdesc Volatile debugger to reset information for each update
 */
class VolatileDebugger extends GameDebugger { // eslint-disable-line  no-unused-vars
    /**
     * Volatile debugger constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Registered debug information
         * @protected
         * @type {Object<string, string>}
         */
        this.registeredData = {};

        /**
         * Debug information for rendering
         * @protected
         * @type {Array<string>}
         */
        this.renderingData = [];
    }

    /**
     * Register debug information
     * @override
     * @param {string} name Debug information name
     * @param {string} value Debug information value
     */
    register(name, value) {
        this.registeredData[name] = value;
    }

    /**
     * Update debugger
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        this.renderingData.length = 0;
        for (const it in this.registeredData) {
            if (this.registeredData.hasOwnProperty(it)) {
                this.renderingData.push(this.registeredData[it]);
            }
        }
        this.registeredData = {};
    }

    /**
     * Render debugger
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Debugger x position
     * @param {number} y Debugger y position
     */
    render(ctx, x, y) {
        for (const it of this.renderingData) {
            ctx.fillText(`${it}`, x, y, 1.0, 0.0, 20, `white`);
            y += 30;
        }
    }
}
/**
 * Auto input event
 * - Updates and renders event
 * - ### Inputs automatically
 * @extends {GameEvent}
 * @classdesc Auto input event to wait to input automatically
 */
class AutoInputEvent extends GameEvent { // eslint-disable-line  no-unused-vars
    /**
     * Auto input event constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Input orders
         * @protected
         * @type {Array<InputOrder>}
         */
        this.orders = [];
        /**
         * Next order number
         * @protected
         * @type {number}
         */
        this.nextOrderNumber = 0;
    }

    /**
     * Add input order
     * @param {InputOrder} order Added order
     */
    addOrder(order) {
        this.orders.push(order);
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        Input.key.setInputEnable(false);
        this.nextOrderNumber = 0;
        if (this.orders.length > 0) {
            this.orders[this.nextOrderNumber].init();
        }
    }

    /**
     * Destructor of event
     * @override
     */
    destruct() {
        Input.key.setInputEnable(true);
    }

    /**
     * Update event
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether update is endped or not
     */
    update(dt) {
        if (this.orders.length <= this.nextOrderNumber) {
            this.op.next();
            return true;
        }
        // update order
        const order = this.orders[this.nextOrderNumber];
        if (!order.udpate(dt)) {
            return false;
        }
        // next
        order.destruct();
        // judge end
        if (this.orders.length > ++this.nextOrderNumber) {
            this.orders[this.nextOrderNumber].init();
            return false;
        }
        // next
        this.op.next();
        return true;
    }
}
/**
 * Delay event
 * - Updates and renders event
 * - ### Delaies time
 * @extends {GameEvent}
 * @classdesc Delay event to delay time
 */
class DelayEvent extends GameEvent { // eslint-disable-line  no-unused-vars
    /**
     * Delay event constructor
     * @constructor
     * @param {number} delay Delay time
     */
    constructor(delay) {
        super();

        /**
         * Delay time
         * @protected
         * @type {number}
         */
        this.delay = delay;

        /**
         * Delay count
         * @protected
         * @type {number}
         */
        this.count = 0;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        this.count = 0;
    }

    /**
     * Update event
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether update is endped or not
     */
    update(dt) {
        this.count += dt / 1000;
        if (this.count > this.delay) {
            this.op.next();
            return true;
        }
        return false;
    }
}
/**
 * Delete event
 * - Updates and renders event
 * - ### Deletes other event
 * @extends {GameEvent}
 * @classdesc Delete event to delete other event
 */
class DeleteEvent extends GameEvent { // eslint-disable-line  no-unused-vars
    /**
     * Delete event constructor
     * @constructor
     * @param {string} name Event name to delte
     */
    constructor(name) {
        super();

        /**
         * Event name to delte
         * @protected
         * @type {string}
         */
        this.name = name;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        const removes = [];
        for (const it of this.op.getRunningEvents()) {
            if (it instanceof NamedEvent) {
                if (it.getName() === this.name) {
                    removes.push(it);
                }
            }
        }
        for (const it of removes) {
            this.op.delete(it);
        }
        this.op.next();
    }
}
/**
 * Image event
 * - Updates and renders event
 * - Identified by name
 * - ### Renders the image
 * @extends {NamedEvent}
 * @classdesc Image event to render the image
 */
class ImageEvent extends NamedEvent { // eslint-disable-line  no-unused-vars
    /**
     * Image event constructor
     * @constructor
     * @param {string} name Image unique name
     * @param {number} x Image x position
     * @param {number} y Image y position
     * @param {GameImage} image Event image
     */
    constructor(name, x, y, image) {
        super(name);

        /**
         * Image x position
         * @protected
         * @type {number}
         */
        this.x = x;
        /**
         * Image y position
         * @protected
         * @type {number}
         */
        this.y = y;
        /**
         * Image for rendering
         * @protected
         * @type {GameImage}
         */
        this.image = image;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        this.op.next();
        this.image.init();
    }

    /**
     * Update event
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether update is endped or not
     */
    update(dt) {
        this.image.update();
        return false;
    }

    /**
     * Render event
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        super.render(ctx);
        this.image.render(ctx, this.x, this.y);
    }
}
/**
 * Input order
 * - ### Indicates order for delegation of input
 * @interface
 * @classdesc Input order to indicate order for delegation of input
 */
class InputOrder { // eslint-disable-line  no-unused-vars
    /**
     * Initialize input order
     * @abstract
     */
    init() {}

    /**
     * Destructor of input order
     * @abstract
     */
    destruct() {}

    /**
     * Update input order
     * @abstract
     * @param {number} dt Delta time
     * @return {boolean} Whether order is ended or not
     */
    udpate(dt) {}
}
/**
 * Loop input order
 * - Indicates order for delegation of input
 * - ### Loops input order
 * @extends {InputOrder}
 * @classdesc Loop input order to loop input oreder
 */
class LoopInputOrder extends InputOrder { // eslint-disable-line  no-unused-vars
    /**
     * Loop input order constructor
     * @constructor
     * @param {number} loopNumber Number of loop
     */
    constructor(loopNumber) {
        super();

        /**
         * Number of loop
         * @protected
         * @type {number}
         */
        this.loopNumber = loopNumber;

        /**
         * Loop list of input order
         * @protected
         * @type {Array<InputOrder>}
         */
        this.orders = [];
        /**
         * Index of currently running order
         * @protected
         * @type {number}
         */
        this.orderIndex = 0;
    }

    /**
     * Add input order to loop list
     * @param {InputOrder} order Added order
     */
    addOrder(order) {
        this.orders.push(order);
    }

    /**
     * Initialize input order
     * @abstract
     */
    init() {
        this.orderIndex = 0;
        if (this.orders.length > 0) {
            this.orders[this.orderIndex].init();
        }
    }

    /**
     * Update input order
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether order is ended or not
     */
    udpate(dt) {
        if (this.orders.length === 0) {
            return true;
        }
        // update order
        const order = this.orders[this.orderIndex];
        if (!order.udpate(dt)) {
            return false;
        }
        // next
        order.destruct();
        this.orderIndex += 1;
        // judge loop
        if (this.orderIndex < this.orders.length) {
            // init
            this.orders[this.orderIndex].init();
            return false;
        }
        // count loop
        this.orderIndex = 0;
        this.orders[this.orderIndex].init();
        this.loopNumber -= 1;
        if (this.loopNumber <= 0) {
            return true;
        }
        return false;
    }
}
/**
 * Wait input order
 * - Indicates order for delegation of input
 * - ### Waits
 * @extends {InputOrder}
 * @classdesc Wait input order to wait
 */
class WaitInputOrder extends InputOrder { // eslint-disable-line  no-unused-vars
    /**
     * Input order constructor
     * @constructor
     * @param {number} time Time of waiting
     */
    constructor(time) {
        super();

        /**
         * Time for waiting
         * @protected
         * @type {number}
         */
        this.time = time;
        /**
         * Remaining time
         * @proteted
         * @type {number}
         */
        this.remainingTime = time;
    }

    /**
     * Initialize input order
     * @override
     */
    init() {
        this.remainingTime = this.time;
    }

    /**
     * Update input order
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether order is ended or not
     */
    udpate(dt) {
        return (this.remainingTime -= dt / 1000) <= 0;
    }
}
/**
 * Seuqential event
 * - Updates and renders event
 * - Controls event
 * - ### Executes events continuously
 * @extends {GameEvent}
 * @implements {IEventOperator}
 * @classdesc Seuqential event to execute events continuously
 */
class SequentialEvent extends GameEvent /* IEventOperator */ { // eslint-disable-line  no-unused-vars
    /**
     * Seuqential event constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Event list
         * @protected
         * @type {Array<GameEvent>}
         */
        this.events = [];
        /**
         * Next event number
         * @protected
         * @type {number}
         */
        this.nextEventNumber = 0;

        /**
         * List of running events
         * @protected
         * @type {Array<GameEvent>}
         */
        this.runningEvents = [];
    }

    /**
     * Add game event to execute
     * @param {GameEvent} event Game event to execute
     */
    addEvent(event) {
        this.events.push(event);
    }

    /**
     * Execute next event
     * @override
     */
    next() {
        if (this.nextEventNumber < this.events.length) {
            const event = this.events[this.nextEventNumber++];
            this.runningEvents.push(event);
            event.init();
        } else {
            this.op.next();
        }
    }

    /**
     * Delete event
     * @override
     * @param {GameEvent} event Target event
     */
    delete(event) {
        const index = this.runningEvents.indexOf(event);
        if (index >= 0) {
            this.runningEvents.splice(index, 1);
            event.destruct();
        }
    }

    /**
     * Get currently running event
     * @abstract
     * @return {Array<GameEvent>} Currently running events
     */
    getRunningEvents() {
        return this.runningEvents;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        super.init();
        this.nextEventNumber = 0;
        for (const it of this.events) {
            it.setEventOperator(this);
        }
        this.next();
    }

    /**
     * Destructor of event
     * @override
     */
    destruct() {
        for (const it of this.runningEvents) {
            it.destruct();
        }
    }

    /**
     * Update event
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether update is endped or not
     */
    update(dt) {
        const removes = [];
        for (const it of this.runningEvents) {
            if (it.update(dt)) {
                removes.push(it);
            }
        }
        for (const it of removes) {
            const index = this.runningEvents.indexOf(it);
            if (index >= 0) {
                it.destruct();
                this.runningEvents.splice(index, 1);
            }
        }
        return this.runningEvents.length === 0 && this.nextEventNumber >= this.events.length;
    }

    /**
     * Render event
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        for (const it of this.runningEvents) {
            it.render(ctx);
        }
    }
}
/**
 * Camera event
 * - Updates and renders event
 * - Identified by name
 * - Controls the stage
 * - ### Moves camera
 * @extends {NamedEvent}
 * @implements {IStageEvent}
 * @classdesc Camera event to move camera
 */
class CameraEvent extends NamedEvent /* , IStageEvent */ { // eslint-disable-line  no-unused-vars
    /**
     * Camera event constructor
     * @constructor
     * @param {string} name Identified name
     * @param {number} x Camera x position to move
     * @param {number} y Camera y position to move
     */
    constructor(name, x, y) {
        super(name);

        /**
         * Camera x position to move
         * @protected
         * @type {number}
         */
        this.toX = x;
        /**
         * Camera y position to move
         * @protected
         * @type {number}
         */
        this.toY = y;

        /**
         * Event camera
         * @protected
         * @type {DelegateCamera}
         */
        this.camera = null;

        /**
         * Stage for constrol
         * @protected
         * @type {Stage}
         */
        this.stage = null;
    }

    /**
     * Set stage
     * @override
     * @param {Stage} stage Stage to set
     */
    setStage(stage) {
        this.stage = stage;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        this.camera = new EventCamera(this.stage.getCamera());
        this.camera.setToPosition(this.toX, this.toY);
        this.camera.setScreenSize(this.stage.getCamera().screenWidth, this.stage.getCamera().screenHeight);
        this.stage.setCamera(this.camera);
        this.op.next();
    }

    /**
     * Destructor of event
     * @override
     */
    destruct() {
        this.stage.setCamera(this.camera.getBaseCamera());
    }

    /**
     * Update event
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether update is endped or not
     */
    update(dt) {
        return false;
    }
}
/**
 * Control entity event
 * - Updates and renders event
 * - Controls the stage
 * - Stores stage instance
 * - ### Controls entity
 * @extends {StageEvent}
 * @classdesc Control entity event to control entity
 */
class ControlEntityEvent extends StageEvent { // eslint-disable-line  no-unused-vars
    /**
     * Control entity event constructor
     * @constructor
     * @param {string} name Target entity name
     */
    constructor(name) {
        super();

        /**
         * Target entity name
         * @protected
         * @type {string}
         */
        this.targetName = name;

        /**
         * Next velocity of x direction
         * @protected
         * @type {number}
         */
        this.vx = 0;
        /**
         * Next velocity of y direction
         * @protected
         * @type {number}
         */
        this.vy = 0;
        /**
         * Next force of x direction
         * @protected
         * @type {number}
         */
        this.fx = 0;
        /**
         * Next force of y direction
         * @protected
         * @type {number}
         */
        this.fy = 0;
    }

    /**
     * Set next velocity
     * @param {number} vx Next velocity of x direction
     * @param {number} vy Next velocity of y direction
     */
    setVelocity(vx, vy) {
        this.vx = vx;
        this.vy = vy;
    }

    /**
     * Set force
     * @param {number} fx Next force of x direction
     * @param {number} fy Next force of y direction
     */
    setForce(fx, fy) {
        this.fx = fx;
        this.fy = fy;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        super.init();
        let target = null;
        // TODO: Improve search method
        if (this.targetName === `player`) {
            target = this.stage.getEntities().find((it) => {
                return BaseUtil.implementsOf(it, IPlayable);
            });
        }
        if (target !== null) {
            if (target instanceof MutableEntity) {
                target.body.setNextAddVelocity(this.vx - target.body.velocityX, this.vy - target.body.velocityY);
                target.body.enforce(this.fx, this.fy);
            }
        }
        this.op.next();
    }
}
/**
 * Seuqential stage event
 * - Updates and renders event
 * - Controls event
 * - Executes events continuously
 * - ### Controls the stage
 * - ### It can set stage element
 * @extends {SequentialEvent}
 * @implements {IStageEvent}
 * @classdesc Seuqential stage event to control stage
 */
class SequentialStageEvent extends SequentialEvent /* IStageEvent */ { // eslint-disable-line  no-unused-vars
    /**
     * Seuqential stage event constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Stage for constrol
         * @protected
         * @type {Stage}
         */
        this.stage = null;
    }

    /**
     * Set stage
     * @param {Stage} stage Stage to set
     */
    setStage(stage) {
        this.stage = stage;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        for (const it of this.events) {
            if (BaseUtil.implementsOf(it, IStageEvent)) {
                it.setStage(this.stage);
            }
        }
        super.init();
    }
}
/**
 * Stage stop event
 * - Updates and renders event
 * - Identified by name
 * - Controls the stage
 * - ### Stops stage
 * @extends {NamedEvent}
 * @implements {IStageEvent}
 * @classdesc Stage stop event to stop stage
 */
class StageStopEvent extends NamedEvent /* , IStageEvent */ { // eslint-disable-line  no-unused-vars
    /**
     * Stage stop event constructor
     * @constructor
     * @param {string} name Identified name
     */
    constructor(name) {
        super(name);
        /**
         * Stage for constrol
         * @protected
         * @type {Stage}
         */
        this.stage = null;
    }

    /**
     * Set stage
     * @override
     * @param {Stage} stage Stage to set
     */
    setStage(stage) {
        this.stage = stage;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        this.stage.setEnable(false);
        this.op.next();
    }

    /**
     * Destructor of event
     * @override
     */
    destruct() {
        this.stage.setEnable(true);
    }

    /**
     * Update event
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether update is endped or not
     */
    update(dt) {
        return false;
    }
}
/**
 * Talk event
 * - Updates and renders event
 * - Controls the stage
 * - Stores stage instance
 * - ### Start talking and stop stage
 * @classdesc Talk event to control the stage
 */
class TalkEvent extends StageEvent { // eslint-disable-line  no-unused-vars
    /**
     * Talk event constructor
     * @constructor
     * @param {string} sentence Talking sentence
     */
    constructor(sentence) {
        super();

        /**
         * Talking sentence
         * @protected
         * @type {string}
         */
        this.sentence = sentence;

        /**
         * Talking word count
         * @protected
         * @type {number}
         */
        this.talkCount = 0;

        /**
         * Whether talking is ended or not
         * @protected
         * @type {boolean}
         */
        this.talked = false;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        this.talkCount = 0;
        this.talked = false;
        this.stage.setEnable(false);
    }

    /**
     * Destructor of event
     * @override
     */
    destruct() {
        this.stage.setEnable(true);
    }

    /**
     * Update event
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether update is endped or not
     */
    update(dt) {
        // count up talking
        if (!this.talked) {
            this.talkCount += dt / 100;
            if (this.talkCount > this.sentence.length) {
                this.talkCount = this.sentence.length;
                this.talked = true;
            }
        }

        if (Input.key.isPress(Input.key.yes())) {
            if (this.talked) {
                this.op.next();
                return true;
            } else {
                this.talkCount = this.sentence.length;
                this.talked = true;
            }
        }
        return false;
    }

    /**
     * Render event
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        const id = ResourceManager.image.load(`window/win2.png`);
        const face = ResourceManager.image.load(`face/actor.png`);
        Util.renderWindow(ctx, id, 0, 0, 600, 200);
        Util.renderWindow(ctx, id, 610, 10, 180, 180);
        ctx.drawImage(face, 636, 36, 128, 128);
        // measure text
        const texts = [];
        texts.push(``);
        for (const word of this.sentence.substr(0, this.talkCount)) {
            if (ctx.measureText(texts[texts.length - 1] + word, 25) <= 536) {
                texts[texts.length - 1] += word;
            } else {
                texts.push(word);
            }
        }
        for (let i = 0; i < texts.length; ++i) {
            ctx.fillText(texts[i], 32, 32 + 35 * i, 0, 0, 25);
        }
    }
}
/**
 * Transitional event
 * - Updates and renders event
 * - Controls the stage
 * - Stores stage instance
 * - ### Transitions the stage
 * @extends {StageEvent}
 * @classdesc Transitional event to transition the stage
 */
class TransitionalEvent extends StageEvent { // eslint-disable-line  no-unused-vars
    /**
     * Transitional event constructor
     * @constructor
     * @param {string} stageName Stage name
     * @param {boolean} isReplace Whether scene is replaced or not
     */
    constructor(stageName, isReplace) {
        super();

        /**
         * Stage name
         * @protected
         * @type {string}
         */
        this.stageName = stageName;
        /**
         * Whether scene is replaced or not
         * @protected
         * @type {boolean}
         */
        this.isReplace = isReplace;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        if (this.isReplace) {
            StageManager.it.replaceStage(this.stageName);
        } else {
            StageManager.it.pushStage(this.stageName);
        }
        this.op.next();
    }
}
/**
 * Wait key event
 * - Updates and renders event
 * - Controls the stage
 * - Stores stage instance
 * - ### Waits to input key
 * @extends {StageEvent}
 * @classdesc Wait key event to wait to input key
 */
class WaitKeyEvent extends StageEvent { // eslint-disable-line  no-unused-vars
    /**
     * Initialize event
     * @override
     */
    init() {
        this.stage.setEnable(false);
    }

    /**
     * Destructor of event
     * @override
     */
    destruct() {
        this.stage.setEnable(true);
    }

    /**
     * Update event
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether update is endped or not
     */
    update(dt) {
        if (Input.key.isPress(Input.key.yes())) {
            this.op.next();
            return true;
        }
        return false;
    }
}
/**
 * Event builder
 * - Generates event from json data
 * - ### Generate simple event
 * @extends {EventBuilder}
 * @classdesc Event builder to generate simple event
 */
class SimpleEventBuilder extends EventBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Make event image
     * @protected
     * @param {JSON} image Event image information json data
     * @return {GameImage} Event image
     */
    makeImage(image) {
        return this.imageBuilder.build(`event`, image);
    }

    /**
     * Make input order
     * @protected
     * @param {JSON} order Order json data
     * @return {InpurOrder} Input order
     */
    makeInputOrder(order) {
        switch (order.type) {
            case `up`:
                return new DirectionInputOrder(order.time, 0, -1);
            case `down`:
                return new DirectionInputOrder(order.time, 0, 1);
            case `right`:
                return new DirectionInputOrder(order.time, 1, 0);
            case `left`:
                return new DirectionInputOrder(order.time, -1, 0);
            case `wait`:
                return new WaitInputOrder(order.time);
            case `loop`:
                {
                    const ret = new LoopInputOrder(order.number);
                    for (const it of order.orders) {
                        ret.addOrder(this.makeInputOrder(it));
                    }
                    return ret;
                }
        }
    }

    /**
     * Make event
     * @protected
     * @param {JSON} event Event json data
     * @return {GameEvent} Event
     */
    makeEvent(event) {
        switch (event.type) {
            case `talk`:
                return new TalkEvent(event.sentence);
            case `waitkey`:
                return new WaitKeyEvent();
            case `image`:
                return new ImageEvent(event.name, event.x, event.y, this.makeImage(event.image));
            case `delete`:
                return new DeleteEvent(event.name);
            case `delay`:
                return new DelayEvent(event.delay);
            case `stop`:
                return new StageStopEvent(event.name);
            case `transition`:
                return new TransitionalEvent(event.stage, event.replace);
            case `auto`:
                {
                    const ret = new AutoInputEvent();
                    for (const it of event.orders) {
                        ret.addOrder(this.makeInputOrder(it));
                    }
                    return ret;
                }
            case `control`:
                {
                    const ret = new ControlEntityEvent(event.target);
                    if (event.vx !== undefined && event.vy !== undefined) {
                        ret.setVelocity(event.vx, event.vy);
                    }
                    if (event.fx !== undefined && event.fy !== undefined) {
                        ret.setForce(event.fx, event.fy);
                    }
                    return ret;
                }
            case `camera`:
                return new CameraEvent(event.name, event.x, event.y);
            case `sequential`:
                {
                    let ret = new SequentialEvent();
                    for (const it of event.events) {
                        if (BaseUtil.implementsOf(this.makeEvent(it), IStageEvent)) {
                            ret = new SequentialStageEvent();
                            break;
                        }
                    }
                    for (const it of event.events) {
                        ret.addEvent(this.makeEvent(it));
                    }
                    return ret;
                }
        }
    }

    /**
     * Build event from json data
     * @abstract
     * @param {JSON} json Event json data
     * @return {GameEvent} Generated event
     */
    build(json) {
        return this.makeEvent(json);
    }
}
/**
 * Queue event manager
 * - Manages update and rendering event
 * - Controls event
 * - Registers event
 * - ### Uses the queue to manage events
 * @extends {EventManager}
 * @implements {IEventRegister}
 * @implements {IEventOperator}
 * @classdesc Queue event manager to use the queue to manage events
 */
class QueueEventManager extends EventManager /* , IEventRegister, IEventOperator */ { // eslint-disable-line  no-unused-vars
    /**
     * Queue event manager constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Event queue
         * @protected
         * @type {Array<GameEvent>}
         */
        this.events = [];

        /**
         * List of running events
         * @protected
         * @type {Array<GameEvent>}
         */
        this.runningEvents = [];
    }

    /**
     * Register event
     * @override
     * @param {GameEvent} event Target vent
     */
    register(event) {
        event.setEventOperator(this);
        this.events.push(event);
        // if event is first event, execute it
        if (this.events.length === 1) {
            this.next();
        }
    }

    /**
     * Unregister event
     * @override
     * @param {GameEvent} event Target vent
     */
    unregister(event) {
        let index = this.events.indexOf(event);
        if (index >= 0) {
            this.events.splice(index, 1);
        }
        index = this.runningEvents.indexOf(event);
        if (index >= 0) {
            this.runningEvents.splice(index, 1);
            event.destruct();
        }
    }

    /**
     * Clear all events
     * @override
     */
    clear() {
        for (const it of this.runningEvents) {
            it.destruct();
        }
        this.events.length = 0;
        this.runningEvents.length = 0;
    }

    /**
     * Execute next event
     * @override
     */
    next() {
        const event = this.events[0];
        if (event !== undefined) {
            this.events.splice(0, 1);
            this.runningEvents.push(event);
            event.init();
        }
    }

    /**
     * Delete event
     * @override
     * @param {GameEvent} event Target event
     */
    delete(event) {
        this.unregister(event);
    }

    /**
     * Get currently running event
     * @override
     * @return {Array<GameEvent>} Currently running events
     */
    getRunningEvents() {
        return this.runningEvents;
    }

    /**
     * Remove events from event manager
     * @protected
     * @param {Array<GameEvent>} removes List of event for removing
     */
    removeEvents(removes) {
        for (const it of removes) {
            this.unregister(it);
        }
    }
}
/**
 * All input
 * - Manages input event
 * - Get key code
 * - Get mouse code
 * - Get mouse position
 * - ### Manages all input and delegate it
 * @interface
 * @extends {Input}
 * @implements {IKey}
 * @implements {IMouse}
 * @classdesc All input to manage all input and delegate it
 */
class AllInput extends Input /* , IKey, IMouse */ { // eslint-disable-line  no-unused-vars
    /**
     * All input constructor
     * @constructor
     * @param {IKey} key Key instance for input
     * @param {IMouse} mouse Mouse instance for input
     */
    constructor(key, mouse) {
        super();

        /**
         * Key instance for delegation
         * @protected
         * @type {IKey}
         */
        this.keyDelegate = key;
        /**
         * Mouse instance for delegation
         * @protected
         * @type {IMouse}
         */
        this.mouseDelegate = mouse;

        /**
         * Mouse base code number
         * @protected
         * @const
         * @type {number}
         */
        this.mousBaseCode = 1000;
    }

    /**
     * Set screen instance for getting screen ratio and setting inut target
     * @override
     * @param {GameScreen} screen
     */
    setScreen(screen) {
        super.setScreen(screen);
        if (this.keyDelegate instanceof Input) {
            this.keyDelegate.setScreen(screen);
        }
        if (this.mouseDelegate instanceof Input) {
            this.mouseDelegate.setScreen(screen);
        }
    }

    /**
     * Initialize input
     * @override
     */
    init() {
        if (this.keyDelegate instanceof Input) {
            this.keyDelegate.init();
        }
        if (this.mouseDelegate instanceof Input) {
            this.mouseDelegate.init();
        }
    }

    /**
     * Update input
     * @override
     */
    update() {
        if (this.keyDelegate instanceof Input) {
            this.keyDelegate.update();
        }
        if (this.mouseDelegate instanceof Input) {
            this.mouseDelegate.update();
        }
    }

    /**
     * Get A key code
     * @override
     * @return {number} A key code
     */
    a() {
        return this.keyDelegate.a();
    }
    /**
     * Get 0 key code
     * @override
     * @return {number} 0 key code
     */
    zero() {
        return this.keyDelegate.zero();
    }
    /**
     * Get space key code
     * @override
     * @return {number} Space key code
     */
    space() {
        return this.keyDelegate.space();
    }

    /**
     * Get right key code
     * @override
     * @return {number} Right key code
     */
    right() {
        return this.keyDelegate.right();
    }
    /**
     * Get left key code
     * @override
     * @return {number} Left key code
     */
    left() {
        return this.keyDelegate.left();
    }
    /**
     * Get up key code
     * @override
     * @return {number} Up key code
     */
    up() {
        return this.keyDelegate.up();
    }
    /**
     * Get down key code
     * @override
     * @return {number} Down key code
     */
    down() {
        return this.keyDelegate.down();
    }

    /**
     * Get yes key code
     * @override
     * @return {number} Yes key code
     */
    yes() {
        return this.keyDelegate.yes();
    }
    /**
     * Get no key code
     * @override
     * @return {number} No key code
     */
    no() {
        return this.keyDelegate.no();
    }
    /**
     * Get sub key code
     * @override
     * @return {number} Sub key code
     */
    sub() {
        return this.keyDelegate.sub();
    }

    /**
     * Get mouse right code
     * @override
     * @return {number} Mouse right code
     */
    mRight() {
        return this.mouseDelegate.mRight() + this.mousBaseCode;
    }
    /**
     * Get mouse left code
     * @override
     * @return {number} Mouse left code
     */
    mLeft() {
        return this.mouseDelegate.mLeft() + this.mousBaseCode;
    }
    /**
     * Get mouse center code
     * @override
     * @return {number} Mouse center code
     */
    mCenter() {
        return this.mouseDelegate.mCenter() + this.mousBaseCode;
    }

    /**
     * Get mouse x position
     * @override
     * @return mouse x position
     */
    getMouseX() {
        return this.mouseDelegate.getMouseX();
    }

    /**
     * Get mouse x position
     * @override
     * @return mouse x position
     */
    getMouseY() {
        return this.mouseDelegate.getMouseY();
    }

    /**
     * Clear input state
     * @override
     */
    clear() {
        this.keyDelegate.clear();
        this.mouseDelegate.clear();
    }

    /**
     * Set inpt enable
     * @override
     * @param {boolean} enable Input enable
     */
    setInputEnable(enable) {
        this.mouseDelegate.setInputEnable(enable);
        this.keyDelegate.setInputEnable(enable);
    }

    /**
     * Block input
     * @override
     * @param {number} code Target code
     */
    blockInput(code) {
        if (code >= this.mousBaseCode) {
            this.mouseDelegate.blockInput(code - this.mousBaseCode);
        } else {
            this.keyDelegate.blockInput(code);
        }
    }

    /**
     * Unblock input
     * @override
     * @param {number} code Target code
     */
    unblockInput(code) {
        if (code >= this.mousBaseCode) {
            this.mouseDelegate.unblockInput(code - this.mousBaseCode);
        } else {
            this.keyDelegate.unblockInput(code);
        }
    }

    /**
     * Press target code
     * @override
     * @param {number} code Target code
     */
    press(code) {
        if (code >= this.mousBaseCode) {
            this.mouseDelegate.press(code - this.mousBaseCode);
        } else {
            this.keyDelegate.press(code);
        }
    }

    /**
     * Unpress target code
     * @override
     * @param {number} code Target code
     */
    unpress(code) {
        if (code >= this.mousBaseCode) {
            this.mouseDelegate.unpress(code - this.mousBaseCode);
        } else {
            this.keyDelegate.unpress(code);
        }
    }

    /**
     * Judge whether pressed now
     * @override
     * @param {number} code Target code
     * @return {boolean} whether pressed now
     */
    isPress(code) {
        if (code >= this.mousBaseCode) {
            return this.mouseDelegate.isPress(code - this.mousBaseCode);
        } else {
            return this.keyDelegate.isPress(code);
        }
    }

    /**
     * Judge whether pressed
     * @override
     * @param {number} code Target code
     * @return {boolean} whether pressed
     */
    isPressed(code) {
        if (code >= this.mousBaseCode) {
            return this.mouseDelegate.isPressed(code - this.mousBaseCode);
        } else {
            return this.keyDelegate.isPressed(code);
        }
    }
}
/**
 * State input manager
 * - Manages input event
 * - It can get input state
 * - It can make input blocked
 * - ### Registers input state by input event
 * @extends {Input}
 * @implements {IInput}
 * @classdesc State input manager to regiter input state by input event
 */
class StateInputManager extends Input /* , IInput */ { // eslint-disable-line  no-unused-vars
    /**
     * State input manager constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Array for registering input state
         * @protected
         * @type {Array<number>}
         */
        this.inputState = [];

        /**
         * Whether input is blocked or not
         * @protected
         * @type {Array<boolean>}
         */
        this.blocked = [];

        /**
         * Input state
         * @protected
         * @const
         * @enum {Enum<number>}
         */
        this.STATE = {
            NONE: 0,
            PRESS: 1,
            PRESSED: 2,
            ON: 3,
        };

        /**
         * Input target
         * For example, div, document
         * @protected
         * @type {Element}
         */
        this.target = null;

        /**
         * Enable for input
         * @protected
         * @type {boolean}
         */
        this.enable = true;
    }

    /**
     * Initialize input
     * @override
     */
    init() {
        this.target = this.screen.getTarget();
        this.enable = true;
    }

    /**
     * Update input state
     * @override
     */
    update() {
        // update input state
        for (let i = 0; i < this.inputState.length; ++i) {
            if (this.inputState[i] === this.STATE.PRESS) {
                this.inputState[i] = this.STATE.PRESSED;
            } else if (this.inputState[i] === this.STATE.PRESSED) {
                this.inputState[i] = this.STATE.ON;
            }
            this.blocked[i] = false;
        }
    }

    /**
     * Clear input state
     * @override
     */
    clear() {
        for (let i = 0; i < this.inputState.length; ++i) {
            this.inputState[i] = this.STATE.NONE;
        }
    }

    /**
     * Set inpt enable
     * @override
     * @param {boolean} enable Input enable
     */
    setInputEnable(enable) {
        this.enable = enable;
        this.clear();
    }

    /**
     * Block input
     * @iverride
     * @param {number} code Target code
     */
    blockInput(code) {
        this.blocked[code] = true;
    }

    /**
     * Unblock input
     * @override
     * @param {number} code Target code
     */
    unblockInput(code) {
        this.blocked[code] = false;
    }

    /**
     * Press target code
     * @override
     * @param {number} code Target code
     */
    press(code) {
        this.inputState[code] = this.STATE.PRESSED;
    }

    /**
     * Unpress target code
     * @override
     * @param {number} code Target code
     */
    unpress(code) {
        this.inputState[code] = this.STATE.NONE;
    }

    /**
     * Judge whether pressed now
     * @override
     * @param {number} code Target code
     * @return {boolean} whether pressed now
     */
    isPress(code) {
        return !this.blocked[code] && this.inputState[code] !== undefined && this.inputState[code] === this.STATE.PRESSED;
    }

    /**
     * Judge whether pressed
     * @override
     * @param {number} code Target code
     * @return {boolean} whether pressed
     */
    isPressed(code) {
        return !this.blocked[code] && this.inputState[code] !== undefined && (this.inputState[code] === this.STATE.PRESSED || this.inputState[code] === this.STATE.ON);
    }
}
/**
 * Cached array manager
 * - Resources Abstraction of resource management
 * - ### Manage resources by array
 * - ### Resources are cached by file path
 * @interface
 * @extends {ResourceManager}
 * @classdesc Cached array manager to manage resources by array and cached by file path
 */
class CachedArrayManager extends ResourceManager { // eslint-disable-line  no-unused-vars
    /**
     * Cached array constructor
     * @constructor
     * @param {string} root Resource root path
     */
    constructor(root) {
        super(root);

        /**
         * Resources array
         * @protected
         * @type {Array<Object>}
         */
        this.resources = [];

        /**
         * Cached image array
         * @protected
         * @type {Object<string, Object>}
         */
        this.caches = {};
    }

    /**
     * Load resource and return it
     * @abstract
     * @param {string} filePath Resource file path
     * @return {Object} Resource
     */
    loadResource(filePath) {}

    /**
     * Load resource and return ID
     * @override
     * @param {string} filePath Resource file path
     * @return {number} Resource ID
     */
    load(filePath) {
        // append root
        if (!filePath.startsWith(this.root)) {
            filePath = this.root + filePath;
        }
        const cache = this.caches[filePath];
        if (cache !== undefined) {
            return cache;
        }
        this.resources.push(this.loadResource(filePath));
        return this.caches[filePath] = this.resources.length - 1;
    }

    /**
     * Unload resource
     * @override
     * @param {Object} id Resource ID
     */
    unload(id) {
        delete this.caches[this.getPath(id)];
        this.resources.splice(index, 1, null);
    }

    /**
     * Reload all resources
     * @override
     */
    reload() {
        for (const it in this.caches) {
            if (this.caches.hasOwnProperty(it)) {
                this.resources[this.caches[it]] = this.loadResource(`${it}?time=${new Date()}`);
            }
        }
    }

    /**
     * Get resource path
     * @override
     * @param {Object} id Resrouce ID
     * @return {string} Resource path (return null if not exists)
     */
    getPath(id) {
        for (const path in this.caches) {
            if (this.caches.hasOwnProperty(path)) {
                if (this.caches[path] === id) {
                    return path.replace(this.root, ``);
                }
            }
        }
        return null;
    }
}
/**
 * Cached image
 * - Resources Abstraction of resource management
 * - Manage resources by array
 * - Resources are cached by file path
 * - It can be acquired information as an image
 * - ### Manages image resources
 * @extends {CachedArrayManager}
 * @implements {IImageManager}
 * @classdesc Cached image to manage image resources
 */
class CachedImage extends CachedArrayManager /* , IImageManager */ { // eslint-disable-line  no-unused-vars
    /**
     * Load resource and return it
     * @override
     * @param {string} filePath Resource file path
     * @return {Image} Resource
     */
    loadResource(filePath) {
        const image = new Image();
        image.src = filePath;
        return image;
    }

    /**
     * Get image width
     * @param {Object} id Image ID
     * @return {number} Image width
     */
    getWidth(id) {
        const image = this.resources[id];
        return image === undefined ? -1 : image.width;
    }

    /**
     * Get image height
     * @param {Object} id Image ID
     * @return {number} Image height
     */
    getHeight(id) {
        const image = this.resources[id];
        return image === undefined ? -1 : image.height;
    }

    /**
     * Get image by ID
     * @override
     * @param {Object} id Image ID
     * @return {Image} Music resource
     */
    getImage(id) {
        const ret = this.resources[id];
        return ret === undefined ? null : ret;
    }
}
/**
 * Cached music
 * - Resources Abstraction of resource management
 * - Manage resources by array
 * - Resources are cached by file path
 * - It can be acquired information as an music
 * - ### Manages music resources
 * @extends {CachedArrayManager}
 * @implements {IMusicManager}
 * @classdesc Cached music to manage music resources
 */
class CachedMusic extends CachedArrayManager /* , IMusicManager */ { // eslint-disable-line  no-unused-vars
    /**
     * Cached music constructor
     * @constructor
     * @param {string} root Resource root path
     */
    constructor(root) {
        super(root);

        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        /**
         * Audio context
         * @protectedd
         * @type {AudioContext}
         */
        this.context = new AudioContext();
    }
    /**
     * Load resource and return it
     * @override
     * @param {string} filePath Resource file path
     * @return {Object} Resource
     */
    loadResource(filePath) {
        const id = this.resources.length;
        const instance = this;
        const request = new XMLHttpRequest();
        request.open('GET', filePath, true);
        request.responseType = 'arraybuffer';
        request.onload = function() {
            // status ===0 is local
            if (request.status === 200 || request.status === 0) {
                instance.context.decodeAudioData(request.response, function(buffer) {
                    const source = instance.context.createBufferSource();
                    source.buffer = buffer;
                    source.connect(instance.context.destination);
                    source.loop = true;
                    instance.resources[id] = source;
                });
            }
        };
        request.send();
        return null;
    }

    /**
     * Get music by ID
     * @param {Object} id Music ID
     * @return {BufferSource} Music resource
     */
    getMusic(id) {
        const music = this.resources[id];
        return music === undefined ? null : music;
    }
}
/**
 * Delegate image
 * - Renders image
 * - Considers the direction
 * - Clips area when rendering
 * - ### Delegates other image
 * @extends {GameImage}
 * @implements {IDirectionalImage}
 * @implements {IClipImage}
 * @classdesc Delegate image to delegate other image
 */
class DelegateImage extends GameImage /* , IDirectionalImage, IClipImage */ { // eslint-disable-line  no-unused-vars
    /**
     * Delegate image constructor
     * @constructor
     * @param {GameImage} baseImage Base image for delegation
     */
    constructor(baseImage) {
        super();

        /**
         * Base image for delegation
         * @protected
         * @type {GameImage}
         */
        this.baseImage = baseImage;
    }

    /**
     * Set direction of image
     * @override
     * @param {number} directionX Direction of x
     * @param {number} directionY Direction of y
     */
    setDirection(directionX, directionY) {
        if (BaseUtil.implementsOf(this.baseImage, IDirectionalImage)) {
            this.baseImage.setDirection(directionX, directionY);
        }
    }

    /**
     * Set clipingArea
     * @override
     * @param {number} clipX Cliping x position
     * @param {number} clipY Cliping y position
     * @param {number} clipWidth Cliping width
     * @param {number} clipWidth Cliping height
     */
    setClipArea(clipX, clipY, clipWidth, clipHeight) {
        if (BaseUtil.implementsOf(this.baseImage, IClipImage)) {
            this.baseImage.setClipArea(clipX, clipY, clipWidth, clipHeight);
        }
    }

    /**
     * Set image size
     * @override
     * @param {number} width Image width
     * @param {number} height Image height
     */
    setSize(width, height) {
        this.baseImage.setSize(width, height);
    }

    /**
     * Set image ID
     * @override
     * @param {number} imageID Image ID
     */
    setImageID(imageID) {
        this.baseImage.setImageID(imageID);
    }

    /**
     * Get image ID
     * @override
     * @return {number} Image ID
     */
    getImageID() {
        return this.baseImage.getImageID();
    }

    /**
     * Get image width
     * @override
     * @return {number} Imag width
     */
    getWidth() {
        return this.baseImage.getWidth();
    }

    /**
     * Get image height
     * @override
     * @return {number} Imag height
     */
    getHeight() {
        return this.baseImage.getHeight();
    }

    /**
     * Get source offset x position
     * @override
     * @protected
     * @type {number}
     */
    getSourceOffsetX() {
        return this.baseImage.getSourceOffsetX();
    }

    /**
     * Get source offset y position
     * @override
     * @protected
     * @type {number}
     */
    getSourceOffsetY() {
        return this.baseImage.getSourceOffsetY();
    }

    /**
     * Get source width
     * @override
     * @protected
     * @type {number}
     */
    getSourceWidth() {
        return this.baseImage.getSourceWidth();
    }
    /**
     * Get source height
     * @override
     * @protected
     * @type {number}
     */
    getSourceHeight() {
        return this.baseImage.getSourceHeight();
    }

    /**
     * Initialize image
     * @override
     */
    init() {
        this.baseImage.init();
    }

    /**
     * Update image
     * @override
     * @param {number} dt
     */
    update(dt) {
        this.baseImage.update(dt);
    }

    /**
     * Render image
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx, x, y) {
        this.baseImage.render(ctx, x, y);
    }
}
/**
 * Directional image
 * - Renders image
 * - Considers the direction
 * - Clips area when rendering
 * - Delegates other image
 * - ### Renders considering the direction
 * @extends {DelegateImage}
 * @implements {IDirectionalImage}
 * @classdesc Directional image to render considering the direction
 */
class DirectionalImage extends DelegateImage /* , IDirectionalImage */ { // eslint-disable-line  no-unused-vars
    /**
     * Directional image constructor
     * @constructor
     * @param {GameImage} baseImage Base image for delegation
     */
    constructor(baseImage) {
        super(baseImage);

        /**
         * Image direction of X
         * @protected
         * @type {number}
         */
        this.directionX = 0;
        /**
         * Image direction of y
         * @protected
         * @type {number}
         */
        this.directionY = 0;
    }

    /**
     * Set direction of image
     * @override
     * @param {number} directionX Direction of x
     * @param {number} directionY Direction of y
     */
    setDirection(directionX, directionY) {
        this.directionX = directionX;
        this.directionY = directionY;
    }

    /**
     * Render image
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx, x, y) {
        this.setSize(this.getWidth() * (this.directionX === 0 ? 1 : this.directionX), this.getHeight() * (this.directionY === 0 ? 1 : this.directionY * -1));
        super.render(ctx, x, y);
        this.setSize(this.getWidth() * (this.directionX === 0 ? 1 : this.directionX), this.getHeight() * (this.directionY === 0 ? 1 : this.directionY * -1));
    }
}
// TODO: Should implements
/**
 * Context for rendering by WebGL
 * Renders by using WebGL
 * @extends {Context}
 * @classdesc Context for rendering by WebGL
 */
class GLContext extends Context { // eslint-disable-line  no-unused-vars
    /**
     * Set screen
     * @param {GameScreen} screen Screen system
     */
    setScreen(screen) {
        super.setScreen(screen);
        /**
         * GL context for rendering
         * @private
         * @type {WebGLRenderingContext}
         */
        this.gl_ = this.screen.getCanvas().getContext(`webgl`);
    }

    /**
     * Function to be executed before drawing
     */
    preRendering() {}

    /**
     * Function to be executed after drawing
     */
    postRendering() {}

    /**
     * Render text
     * @param {string} text Rendering text
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} anchorX Anchor x point in percent (0.0 <= anchorX <= 1.0)
     * @param {number} anchorY Anchor y point in percent (0.0 <= anchorX <= 1.0)
     * @param {number} size Font size
     * @param {string} color Font color
     * @param {string} font Font name
     */
    fillText(text, x, y, anchorX, anchorY, size, color, font) {}

    /**
     * Rendering line
     * @param {number} sx Start x position
     * @param {number} sy Start y position
     * @param {number} ex Terminal x position
     * @param {number} ey Terminal y position
     * @param {string} color Color name of line
     * @param {number} lineWidth Line width
     */
    strokeLine(sx, sy, ex, ey, color, lineWidth) {}

    /**
     * Rendering circle outline
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} radius Raius of circle
     * @param {number} startAngle Beginning of arc
     * @param {number} endAngle End of arc
     * @param {boolean} anticlockwise Whether it is clockwise or not
     * @param {string} color Color name of circle
     * @param {number} lineWidth Line of circle width
     */
    strokeCircle(x, y, radius, startAngle, endAngle, anticlockwise, color, lineWidth) {}

    /**
     * Rendering square outline
     * @param {number} x Upper left x position
     * @param {number} y Upper left y position
     * @param {number} width Width of the rectangle
     * @param {number} height Height of the rectangle
     * @param {string} color Color name of rectangle
     * @param {number} lineWidth Line of rectangle width
     */
    strokeRect(x, y, width, height, color, lineWidth) {}

    /**
     * Rendering image
     * @param {number} imageID Image ID
     * @param {number} x Image x position
     * @param {number} y Image y position
     * @param {number} width Image width
     * @param {number} height Image height
     * @param {number} srcX Upper left x position of source
     * @param {number} srcY Upper left y position of source
     * @param {number} srcW Source width
     * @param {number} srcH Source height
     */
    drawImage(imageID, x, y, width, height, srcX, srcY, srcW, srcH) {}
}
/**
 * JavaScript context
 * - Controls rendering to the screen
 * - ### Renders by using HTML5 API
 * @extends {Context}
 * @classdesc JavaScript context for rendering by using HTML5 API
 */
class JSContext extends Context { // eslint-disable-line  no-unused-vars
    /**
     * JavaScript context constructor
     * @constructor
     */
    constructor() {
        super();
        /**
         * Color of the text
         * @private
         * @type {string}
         */
        this._fontColor = `black`;
        /**
         * Size of the text
         * @private
         * @type {number}
         */
        this._fontSize = 50;
        /**
         * Font name of the text
         * @private
         * @type {string}
         */
        this._fontName = `Arial`;

        /**
         * Color of the line
         * @private
         * @type {string}
         */
        this._lineColor = `red`;
        /**
         * Size of the line
         * @private
         * @type {number}
         */
        this._lineWidth = 1;

        /**
         * Canvas context for rendering
         * @protected
         * @type {CanvasRenderingContext2D}
         */
        this.ctx = null;
    }

    /**
     * Initialize context
     * @override
     */
    init() {
        this.ctx = this.screen.getCanvas().getContext(`2d`);
    }

    /**
     * Function to be executed before drawing
     * @override
     */
    preRendering() {
        // ignore antialiasing
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.webkitImageSmoothingEnabled = false;
        this.ctx.msImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;
        // save state
        this.ctx.save();
        // scale rendering size
        this.ctx.scale(this.screen.gameSize, this.screen.gameSize);
        // render background
        this.ctx.fillStyle = `black`;
        this.ctx.fillRect(0, 0, this.screen.width, this.screen.height);
    }

    /**
     * Function to be executed after drawing
     * @override
     */
    postRendering() {
        this.ctx.restore();
    }

    /**
     * Render text
     * @override
     * @param {string} text Rendering text
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} [anchorX=0] Anchor x point in percent (0.0 <= anchorX <= 1.0)
     * @param {number} [anchorY=0] Anchor y point in percent (0.0 <= anchorX <= 1.0)
     * @param {number} [size=fontSize] Font size
     * @param {string} [color=fontColor] Font color
     * @param {string} [font=fontName] Font name
     */
    fillText(text, x, y, anchorX = 0, anchorY = 0, size = this._fontSize, color = this._fontColor, font = this._fontName) {
        this.ctx.font = size + `px ` + font;
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, x - anchorX * this.ctx.measureText(text).width, y + (1 - anchorY) * size);
    }

    /**
     * Get rendering text width
     * @abstract
     * @param {string} text Rendering text
     * @param {number} [size=fontSize] Font size
     * @param {string} [font=fontName] Font name
     * @return {number} Text width
     */
    measureText(text, size = this._fontSize, font = this._fontName) {
        this.ctx.font = size + `px ` + font;
        return this.ctx.measureText(text).width;
    }

    /**
     * Rendering line
     * @param {number} sx Start x position
     * @param {number} sy Start y position
     * @param {number} ex Terminal x position
     * @param {number} ey Terminal y position
     * @param {string} color Color name of line
     * @param {number} lineWidth Line width
     */
    strokeLine(sx, sy, ex, ey, color = this._lineColor, lineWidth = this._lineWidth) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(sx, sy);
        this.ctx.lineTo(ex, ey);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    /**
     * Rendering circle
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} radius Raius of circle
     * @param {number} startAngle Beginning of arc
     * @param {number} endAngle End of arc
     * @param {boolean} anticlockwise Whether it is clockwise or not
     * @param {string} color Color name of circle
     * @param {number} lineWidth Line of circle width
     */
    strokeCircle(x, y, radius, startAngle, endAngle, anticlockwise, color = this._lineColor, lineWidth = this._lineWidth) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    /**
     * Rendering rectangle outline
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {string} color Color name of rectangle
     * @param {number} lineWidth Line of rectangle width
     */
    strokeRect(x, y, width, height, color = this._lineColor, lineWidth = this._lineWidth) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeRect(x, y, width, height);
    }

    /**
     * Rendering rectangle
     * @override
     * @param {number} x Upper left x position
     * @param {number} y Upper left y position
     * @param {number} width Width of the rectangle
     * @param {number} height Height of the rectangle
     * @param {string} color Color name of rectangle
     * @param {number} lineWidth Line of rectangle width
     */
    fillRect(x, y, width, height, color = this._lineColor, lineWidth = this._lineWidth) {
        this.ctx.fillStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.fillRect(x, y, width, height);
    }

    /**
     * Rendering image
     * @param {number} imageID Image ID
     * @param {number} x Image x position
     * @param {number} y Image y position
     * @param {number} width Image width
     * @param {number} height Image height
     * @param {number} srcX Upper left x position of source
     * @param {number} srcY Upper left y position of source
     * @param {number} srcW Source width
     * @param {number} srcH Source height
     */
    drawImage(imageID, x, y, width, height, srcX, srcY, srcW, srcH) {
        const image = this.image.getImage(imageID);
        x = Math.round(x);
        y = Math.round(y);
        if (width === undefined) {
            this.ctx.drawImage(image, x, y);
            return;
        }
        width = Math.round(width);
        height = Math.round(height);
        this.ctx.save();
        if (width < 0) {
            width = -width;
            x = -x - width;
            this.ctx.scale(-1, 1);
        }
        if (height < 0) {
            height = -height;
            y = -y - height;
            this.ctx.scale(1, -1);
        }
        if (srcX === undefined) {
            this.ctx.drawImage(image, x, y, width, height);
        } else {
            srcX = Math.round(srcX);
            srcY = Math.round(srcY);
            srcW = Math.round(srcW);
            srcH = Math.round(srcH);
            this.ctx.drawImage(image, srcX, srcY, srcW, srcH, x, y, width, height);
        }
        this.ctx.restore();
    }
}
/**
 * Single image
 * - Renders image
 * - ### Renders single image
 * @extends {GameImage}
 * @classdesc Single image to render single image
 */
class SingleImage extends GameImage { // eslint-disable-line  no-unused-vars
    /**
     * Single image constructor
     * @constructor
     * @param {number} imageID Image ID
     * @param {number} [width = null] Image width
     * @param {number} [height = null] Image height
     */
    constructor(imageID, width = null, height = null) {
        super();

        /**
         * Image ID
         * @protected
         * @type {number}
         */
        this.imageID = imageID;

        /**
         * Image width
         * @protected
         * @type {number}
         */
        this.width = width;
        /**
         * Image height
         * @protected
         * @type {number}
         */
        this.height = height;
    }

    /**
     * Set image size
     * @override
     * @param {number} width Image width
     * @param {number} height Image height
     */
    setSize(width, height) {
        this.width = width;
        this.height = height;
    }

    /**
     * Set image ID
     * @override
     * @param {number} imageID Image ID
     */
    setImageID(imageID) {
        this.imageID = imageID;
    }

    /**
     * Get image ID
     * @abstract
     * @return {number} Image ID
     */
    getImageID() {
        return this.imageID;
    }

    /**
     * Get image width
     * @override
     * @return {number} Imag width
     */
    getWidth() {
        return this.width;
    }

    /**
     * Get image height
     * @override
     * @return {number} Imag height
     */
    getHeight() {
        return this.height;
    }

    /**
     * Get source offset x position
     * @override
     * @protected
     * @type {number}
     */
    getSourceOffsetX() {
        return 0;
    }

    /**
     * Get source offset y position
     * @override
     * @protected
     * @type {number}
     */
    getSourceOffsetY() {
        return 0;
    }

    /**
     * Get source width
     * @override
     * @protected
     * @type {number}
     */
    getSourceWidth() {
        return ResourceManager.image.getWidth(this.imageID);
    }
    /**
     * Get source height
     * @override
     * @protected
     * @type {number}
     */
    getSourceHeight() {
        return ResourceManager.image.getHeight(this.imageID);
    }

    /**
     * Update image
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        if (this.width === null) {
            const width = this.getSourceWidth();
            if (width > 0) {
                this.width = width;
            }
        }
        if (this.height === null) {
            const height = this.getSourceHeight();
            if (height > 0) {
                this.height = height;
            }
        }
    }

    /**
     * Render image
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx, x, y) {
        ctx.drawImage(this.imageID, x, y, this.width, this.height);
    }
}
/**
 * Tile image
 * - Renders image
 * - Renders single image
 * - ### Renders partially
 * @extends {SingleImage}
 * @classdesc Tile image to render partially
 */
class TileImage extends SingleImage { // eslint-disable-line  no-unused-vars
    /**
     * Tile image constructor
     * @constructor
     * @param {number} imageID Image ID
     * @param {number} width Image width
     * @param {number} height Image height
     * @param {number} srcX X coordinate on the file
     * @param {number} srcY Y coordinate on the file
     * @param {number} srcW Width on file
     * @param {number} srcH Height on file
     */
    constructor(imageID, width, height, srcX, srcY, srcW, srcH) {
        super(imageID, width, height);

        /**
         * X coordinate on the file
         * @protected
         * @type {number}
         */
        this.srcX = srcX;
        /**
         * Y coordinate on the file
         * @protected
         * @type {number}
         */
        this.srcY = srcY;
        /**
         * Width on file
         * @protected
         * @type {number}
         */
        this.srcW = srcW;
        /**
         * Height on file
         * @protected
         * @type {number}
         */
        this.srcH = srcH;
    }

    /**
     * Get source offset x position
     * @override
     * @protected
     * @type {number}
     */
    getSourceOffsetX() {
        return this.srcX;
    }

    /**
     * Get source offset y position
     * @override
     * @protected
     * @type {number}
     */
    getSourceOffsetY() {
        return this.srcY;
    }

    /**
     * Get source width
     * @override
     * @protected
     * @type {number}
     */
    getSourceWidth() {
        return this.srcW;
    }
    /**
     * Get source height
     * @override
     * @protected
     * @type {number}
     */
    getSourceHeight() {
        return this.srcH;
    }

    /**
     * Render image
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx, x, y) {
        ctx.drawImage(this.imageID, x, y, this.width, this.height, this.srcX, this.srcY, this.srcW, this.srcH);
    }
}
/**
 * Buffer source music
 * - Control to play music as BGM or SE
 * - ### Playback as buffer source
 * - ### If music is not loaded, it will be played later
 * @extends {Music}
 * @classdesc Buffer source music to play sound by buffer source
 */
class BufferSourceMusic extends Music { // eslint-disable-line  no-unused-vars
    /**
     * Buffer source music constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Currently playing BGM
         * @protected
         * @type {AudioBufferSourceNode}
         */
        this.bgm = null;
    }
    /**
     * Play sound
     * @private
     * @param {number} musicID SE Music id
     * @param {boolean} loop Whether sound is loop or not
     * @return {AudioBufferSourceNode} Playing sound
     */
    _play(musicID, loop) {
        const music = this.music.getMusic(musicID);
        if (music !== null) {
            music.loop = loop;
            music.start(0);
        } else {
            const instance = this;
            const id = setInterval(() => {
                const music = instance.music.getMusic(musicID);
                if (music !== null) {
                    this._play(musicID, loop);
                    clearInterval(id);
                    if (loop) {
                        this.bgm = music;
                    }
                }
            }, 1000 / 60);
        }
        return music;
    }

    /**
     * Sound the SE
     * @override
     * @param {number} musicID SE Music id
     */
    playSE(musicID) {
        this._play(musicID, false);
    }

    /**
     * Sound the BGM
     * @override
     * @param {number} musicID BGM Music id
     */
    playBGM(musicID) {
        if (this.bgm !== null) {
            this.stopBGM();
        }
        this.bgm = this._play(musicID, true);
    }

    /**
     * Pause BGM
     * @override
     */
    pauseBGM() {
        // TODO: Should be implemented
    }

    /**
     * Resume BGM
     * @override
     */
    resumeBGM() {
        // TODO: Should be implemented
    }

    /**
     * Stop BGM
     * @override
     */
    stopBGM() {
        if (this.bgm !== null) {
            this.bgm.stop();
        }
    }
}
/**
 * Default title scene
 * - Controls updating and rendering
 * - ### Default title scene example
 * - ### Sample of mouse processing, input processing and drawing processing
 * @extends {Scene}
 * @classdesc Default title scene indicating sample scene
 */
class DefaultTitleScene extends Scene { // eslint-disable-line  no-unused-vars
    /**
     * Default title scene constructor
     * @constructor
     */
    constructor() {
        super();
        /**
         * Circle radius
         * @private
         * @type {number}
         */
        this.r_ = 10;
        /**
         * Circle angle
         * @private
         * @type {number}
         */
        this.angle_ = 0;
    }

    /**
     * Update scene
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        // update circle angle and radius
        if (Input.mouse.isPressed(Input.mouse.mLeft())) {
            this.r_ += dt / 20;
            this.angle_ = this.angle_ + Math.PI / 10 * dt / 20;
        } else {
            this.r_ -= dt / 20;
            this.angle_ = this.angle_ + Math.PI / 30 * dt / 20;
        }
        this.r_ = this.r_ > 20 ? 20 : this.r_ < 10 ? 10 : this.r_;
        if (this.angle_ > Math.PI * 2.5) {
            this.angle_ -= Math.PI * 2.5;
        }
    }

    /**
     * Render scene
     * @override
     * @param {Context} ctx
     */
    render(ctx) {
        // render sample text
        ctx.fillText(`Sample`, 400, 300, 0.5);

        // render when enter pressed
        if (Input.key.isPressed(Input.key.space())) {
            ctx.fillText(`Enter pressed`, 400, 400, 0.5, 0, 30, `red`);
        }

        // render circle on mouse
        const angle = this.angle_ > Math.PI * 2 ? Math.PI * 2 : this.angle_;
        ctx.strokeCircle(Input.mouse.getMouseX(), Input.mouse.getMouseY(), this.r_, 0, angle, false);
    }
}
/**
 * Float layer
 * - Performs drawing processing collectively
 * - ### It can move freely
 * @extends {Layer}
 * @classdesc Float layer that can move freely
 */
class FloatLayer extends Layer { // eslint-disable-line  no-unused-vars
    /**
     * Float layer constructor
     * @constructor
     * @param {Layer} delegate Delegte layer
     */
    constructor(delegate) {
        super();
        /**
         * Delegate layer
         * @protected
         * @type {Layer}
         */
        this.delegate = delegate;
    }

    /**
     * Set layer position
     * @override
     * @param {number} x Layer x position
     * @param {number} y Layer y position
     * @param {number} z Layer z position
     */
    setPosition(x, y, z) {
        super.setPosition(x, y, z);
        this.delegate.setPosition(x, y, z);
    }

    /**
     * Set layer size
     * @override
     * @param {number} width Layer width
     * @param {number} height Layer height
     */
    setSize(width, height) {
        super.setSize(width, height);
        this.delegate.setSize(width, height);
    }

    /**
     * Initialize scene
     * @override
     */
    init() {
        this.delegate.init();
    }

    /**
     * Update layer
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        this.delegate.update(dt);

        // TODO:: move in screen
    }

    /**
     * Render layer
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        this.delegate.render(ctx);
    }
}
/**
 * Gameover layer
 * - Performs drawing processing collectively
 * - ### Display gameover
 * @extends {Layer}
 * @classdesc Gameover layer to display gamover
 */
class GameoverLayer extends Layer { // eslint-disable-line  no-unused-vars
    /**
     * Update layer
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {}

    /**
     * Render layer
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        ctx.fillText(`Gameover`, this.x + this.width / 2, this.y + this.height / 2, 0.5, 0.5, 100, `red`);
    }
}
/**
 * Scroll layer
 * - Performs drawing processing collectively
 * - ### It can scroll inner elements
 * @extends {Layer}
 * @classdesc Scroll layer that can scroll inner elements
 */
class ScrollLayer extends Layer { // eslint-disable-line  no-unused-vars
    /**
     * Scroll layer constructor
     * @constructor
     * @param {ClipLayer} delegate Delegte cliping layer
     */
    constructor(delegate) {
        super();
        /**
         * Delegate cliping layer
         * @protected
         * @type {ClipLayer}
         */
        this.delegate = delegate;

        /**
         * Scrolling x position
         * @protected
         * @type {number}
         */
        this.scrollX = 0;
        /**
         * Scrolling y position
         * @protected
         * @type {number}
         */
        this.scrollY = 0;
    }

    /**
     * Scroll relatively
     * @param {number} x Scroll relative x
     * @param {number} y Scroll relative y
     */
    scroll(x, y) {
        this.scrollX += x;
        this.scrollY += y;
    }

    /**
     * Initialize scene
     * @override
     */
    init() {
        this.delegate.init();
    }

    /**
     * Update layer
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        const width = this.delegate.width;
        const height = this.delegate.height;
        if (this.width < width) {
            if (this.scrollX < 0) {
                this.scrollX = 0;
            } else if (this.scrollX > width - this.width) {
                this.scrollX = width - this.width;
            }
        } else {
            this.scrollX = 0;
        }
        if (this.height < height) {
            if (this.scrollY < 0) {
                this.scrollY = 0;
            } else if (this.scrollY > height - this.height) {
                this.scrollY = height - this.height;
            }
        } else {
            this.scrollY = 0;
        }
        // update
        this.delegate.setPosition(this.x - this.scrollX, this.y - this.scrollY, this.z);
        this.delegate.clip(this.x, this.y, this.width, this.height);
        this.delegate.update(dt);
    }

    /**
     * Render layer
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        this.delegate.render(ctx);
    }
}
/**
 * Tabbed layer
 * - Performs drawing processing collectively
 * - ### It can manage layers by tab
 * @interface
 * @extends {Layer}
 * @classdesc Tabbed layer that can manage layers by tab
 */
class TabbedLayer extends Layer { // eslint-disable-line  no-unused-vars
    /**
     * Set layer position
     * @override
     * @param {number} x Layer x position
     * @param {number} y Layer y position
     * @param {number} z Layer z position
     */
    setPosition(x, y, z) {
        super.setPosition(x, y, z);
        for (const it of this.getTabs()) {
            it.setPosition(x, y, z);
        }
    }

    /**
     * Set layer size
     * @override
     * @param {number} width Layer width
     * @param {number} height Layer height
     */
    setSize(width, height) {
        super.setSize(width, height);
        for (const it of this.getTabs()) {
            it.setSize(width, height);
        }
    }

    /**
     * Add tab layer
     * @param {Layer} layer Added layer
     */
    addTab(layer) {
        layer.init();
    }

    /**
     * Remove tab layer
     * @abstract
     * @param {Layer} layer Removed layer
     */
    removeTab(layer) {}

    /**
     * Get currently tab
     * @abstract
     * @return {Layer} Currently tab layer
     */
    getTab() {}

    /**
     * Get all tab layers
     * @abstract
     * @return {Array<Layer>} all tab layers
     */
    getTabs() {}

    /**
     * Update layer
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        const tab = this.getTab();
        if (tab !== null) {
            tab.update(dt);
        }
    }

    /**
     * Render layer
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        const tab = this.getTab();
        if (tab !== null) {
            tab.render(ctx);
        }
    }
}
/**
 * Stack scene manager
 * - Manages transitions of scenes, ie additions and deletions
 * - ### Uses the stack to manage scenes
 * @extends {SceneManager}
 * @classdesc Stack scene manager using the stack to manage scenes
 */
class StackSceneManager extends SceneManager { // eslint-disable-line  no-unused-vars
    /**
     * Stack scene manager constructor
     * @constructor
     */
    constructor() {
        super();
        /**
         * Scene stack
         * @protected
         * @type {Array<Scene>}
         */
        this.scenes = [];
    }

    /**
     * Get currently running scene
     * @override
     * @return {Scene} Currently running scene
     */
    getScene() {
        return this.scenes[this.scenes.length - 1];
    }

    /**
     * Push scene instance for running it
     * @override
     * @param {Scene} scene Scene instance for running it
     */
    pushScene(scene) {
        this.scenes.push(scene);
        super.pushScene(scene);
    }

    /**
     * Pop currently scene for returning to the previous scene
     * @override
     */
    popScene() {
        this.scenes.pop();
    }
}
/**
 * Canvas screen
 * - Indicates the rendering target and input target
 * - ### Both input and rendering target is canvas
 * @interface
 * @extends {GameScreen}
 * @classdesc Canvas screen that both input and rendering target is canvas
 */
class CanvasScreen extends GameScreen { // eslint-disable-line  no-unused-vars
    /**
     * Canvas screen constructor
     * @constructor
     * @param {number} [width = 800] Screen width
     * @param {number} [height = 600] Screen height
     */
    constructor(width = 800, height = 600) {
        super(width, height);

        /**
         * Game canvas
         * @protected
         * @type {Canvas}
         */
        this.canvas = null;
    }

    /**
     * Get input target element
     * @override
     * @return {Element} Element of input target
     */
    getTarget() {
        return this.canvas;
    }

    /**
     * Get canvas for rendering
     * @override
     * @return {Canvas} Canvas
     */
    getCanvas() {
        return this.canvas;
    }
}
/**
 * Delegate screen
 * - Indicates the rendering target and input target
 * - ### Delegates the process to the destination
 * @interface
 * @extends {GameScreen}
 * @classdesc Delegate screen to delegate the process to the destination
 */
class DelegateScreen extends GameScreen { // eslint-disable-line  no-unused-vars
    /**
     * Generatable screen constructor
     * @constructor
     * @param {GameScreen} delegate Original screen
     */
    constructor(delegate) {
        super(delegate.width, delegate.height);

        /**
         * Original screen
         * @protected
         * @type {GameScreen}
         */
        this.delegate = delegate;
    }

    /**
     * Initialize screen
     * @override
     */
    init() {
        this.delegate.init();
    }

    /**
     * Get input target element
     * @override
     * @return {Element} Element of input target
     */
    getTarget() {
        return this.delegate.getTarget();
    }

    /**
     * Get canvas for rendering
     * @override
     * @return {Canvas} Canvas
     */
    getCanvas() {
        return this.delegate.getCanvas();
    }
}
/**
 * Detective screen
 * - Indicates the rendering target and input target
 * - Both input and rendering target is canvas
 * - ### It can detect canvas
 * @extends {CanvasScreen}
 * @classdesc Detective screen to detect canvas
 */
class DetectiveScreen extends CanvasScreen { // eslint-disable-line  no-unused-vars
    /**
     * Initialize screen
     * @override
     */
    init() {
        // detect canvas
        this.canvas = document.querySelector(`canvas`);

        // generate style
        const style = document.createElement(`style`);
        style.append(`canvas {display:block;width: ` + this.width + `px;height: ` + this.height + `px;margin: 0px auto;}`);
        document.head.appendChild(style);

        // set canvas default size
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.setAttribute(`style`, `canvas`);
    }
}
/**
 * Fitable screen
 * - Indicates the rendering target and input target
 * - Delegates the process to the destination
 * - ### Fits the window
 * @extends {DelegateScreen}
 * @classdesc Fitable screen to fit the window
 */
class FitableScreen extends DelegateScreen { // eslint-disable-line     no-unused-vars
    /**
     * Initialize screen
     * @override
     */
    init() {
        super.init();
        // resize
        (window.onresize = () => {
            const size = Math.min((innerWidth - 16) / this.width, (innerHeight - 16) / this.height);
            this.width = size * this.width;
            this.height = size * this.height;
            this.delegate.getCanvas().width = this.width;
            this.delegate.getCanvas().style.width = this.delegate.getCanvas().width + `px`;
            this.delegate.getCanvas().height = this.height;
            this.delegate.getCanvas().style.height = this.delegate.getCanvas().height + `px`;
        })();
    }
}
/**
 * Generatable screen
 * - Indicates the rendering target and input target
 * - Both input and rendering target is canvas
 * - ### It can generate a canvas automatically
 * @extends {CanvasScreen}
 * @classdesc Generatable screen to generate a canvas automatically
 */
class GeneratableScreen extends CanvasScreen { // eslint-disable-line  no-unused-vars
    /**
     * Initialize screen
     * @override
     */
    init() {
        // generate canvas
        this.canvas = document.createElement(`canvas`);
        // set canvas
        document.body.appendChild(this.canvas);

        // generate style
        const style = document.createElement(`style`);
        style.append(`canvas {display:block;width: ` + this.width + `px;height: ` + this.height + `px;margin: 0px auto;}`);
        document.head.appendChild(style);

        // set canvas default size
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.setAttribute(`style`, `canvas`);
    }
}
/**
 * Scalable screen
 * - Indicates the rendering target and input target
 * - Delegates the process to the destination
 * - ### Scales screen automatically
 * @extends {DelegateScreen}
 * @classdesc Scalable screen to scale automatically
 */
class ScalableScreen extends DelegateScreen { // eslint-disable-line     no-unused-vars
    /**
     * Initialize screen
     * @override
     */
    init() {
        super.init();
        // resize
        (window.onresize = () => {
            this.gameSize = Math.min((innerWidth - 16) / this.width, (innerHeight - 16) / this.height);
            this.delegate.getCanvas().width = this.gameSize * this.width;
            this.delegate.getCanvas().style.width = this.delegate.getCanvas().width + `px`;
            this.delegate.getCanvas().height = this.gameSize * this.height;
            this.delegate.getCanvas().style.height = this.delegate.getCanvas().height + `px`;
        })();
    }
}
/**
 * Attack object AI
 * - Determines the behavior of an entity
 * - ### AI that is attached to attack object
 * @extends {AI}
 * @classdesc Attack object AI that is attached to attack object
 */
class AttackObjectAI extends AI { // eslint-disable-line  no-unused-vars
    /**
     * Attack object AI Constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Owned entity
         * @protected
         * @type {Entity}
         */
        this.actor = null;

        /**
         * Previous actor x position
         * @protected
         * @type {number}
         */
        this.preActorX = 0;
        /**
         * Previous actor y position
         * @protected
         * @type {number}
         */
        this.preActorY = 0;
    }

    /**
     * Initialize
     * @override
     */
    init() {
        if (BaseUtil.implementsOf(this.entity, IOwned)) {
            this.actor = this.entity.getOwner();
            if (this.actor !== null) {
                this.preActorX = this.actor.x;
                this.preActorY = this.actor.y;
            }
        }
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // move to actor
        if (this.actor !== null) {
            this.entity.deltaMove(this.actor.x - this.preActorX, this.actor.y - this.preActorY);
            this.preActorX = this.actor.x;
            this.preActorY = this.actor.y;
        }

        // If damageable object is collided, damage
        for (const it of this.entity.collider.collisions) {
            const entity = Util.getCollidedEntity(this.entity, it);
            if (this.actor !== entity && BaseUtil.implementsOf(entity, IDamagable)) {
                entity.damage(1);
            }
        }
        return true;
    }
}
/**
 * Straight attack AI
 * - Determines the behavior of an entity
 * - ### AI that moves straightly for attacking
 * @extends {AI}
 * @classdesc Straight attack AI that moves straightly for attacking
 */
class StraightAttackAI extends AI { // eslint-disable-line  no-unused-vars
    /**
     * Straight attack AI Constructor
     * @constructor
     * @param {number} maxVeocityX Maximum speed x vector
     * @param {number} maxVeocityY Maximum speed y vector
     * @param {number} movePowerX Force of x direction applied when moving
     * @param {number} movePowerY Force of y direction applied when moving
     */
    constructor(maxVelocityX, maxVelocityY, movePowerX, movePowerY) {
        super();

        /**
         * Maximum speed x vector
         * @protected
         * @type {number}
         */
        this.maxVelocityX = maxVelocityX;
        /**
         * Maximum speed y vector
         * @protected
         * @type {number}
         */
        this.maxVelocityY = maxVelocityY;

        /**
         * Force of x direction applied when moving
         * @protected
         * @type {number}
         */
        this.movePowerX = movePowerX;
        /**
         * Force of x direction applied when moving
         * @protected
         * @type {number}
         */
        this.movePowerY = movePowerY;

        /**
         * Owned entity
         * @protected
         * @type {Entity}
         */
        this.actor = null;
    }

    /**
     * Initialize
     * @override
     */
    init() {
        if (BaseUtil.implementsOf(this.entity, IOwned)) {
            this.actor = this.entity.getOwner();
        }
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // move to actor
        if (this.entity.body.velocityX * this.entity.directionX < 0 || Math.abs(this.entity.body.velocityX) < Math.abs(this.maxVelocityX)) {
            this.entity.body.enforce(this.movePowerX * this.entity.material.mass * this.entity.directionX / dt, 0);
        }
        if (this.entity.body.velocityY * this.entity.directionY < 0 || Math.abs(this.entity.body.velocityY) < Math.abs(this.maxVelocityY)) {
            this.entity.body.enforce(0, this.movePowerY * this.entity.material.mass * this.entity.directionY / dt);
        }

        // If damageable object is collided, damage
        for (const it of this.entity.collider.collisions) {
            const entity = Util.getCollidedEntity(this.entity, it);
            if (this.actor === entity) {
                continue;
            }
            if (BaseUtil.implementsOf(entity, IDamagable)) {
                entity.damage(1);
            }
            // destroy if it is collided
            if (BaseUtil.implementsOf(this.entity, IBreakable)) {
                this.entity.destroy();
            }
        }
        return true;
    }
}
/**
 * Enemy AI
 * - Determines the behavior of an entity
 * - ### Damages to the collided opponent
 * @extends {AI}
 * @classdesc Enemy AI to damage to the conflicting opponent
 */
class EnemyAI extends AI { // eslint-disable-line  no-unused-vars
    /**
     * Enemy AI constructor
     * @constructor
     * @param {AI} baseAI Base delegation AI
     */
    constructor(baseAI) {
        super();

        /**
         * Base delegation AI
         * @protected
         * @type {AI}
         */
        this.baseAI = baseAI;

        /**
         * X direction of entity before applying
         * @protected
         * @type {number}
         */
        this.preDirectionX = 0;
        /**
         * Y direction of entity before applying
         * @protected
         * @type {number}
         */
        this.preDirectionY = 0;
    }

    /**
     * Set autonomy entity
     * @override
     * @param {AutonomyEntity} entity Autonomy entity
     */
    setEntity(entity) {
        super.setEntity(entity);
        this.baseAI.setEntity(entity);
    }

    /**
     * Initialize AI
     * @override
     */
    init() {
        this.baseAI.init();
    }

    /**
     * Update AI
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        this.baseAI.update(dt);
        this.preDirectionX = this.entity.directionX;
        this.preDirectionY = this.entity.directionY;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // apply base AI
        if (this.baseAI.apply(dt)) {
            // check collided
            for (const it of this.entity.collider.collisions) {
                if ((it.colliding === this.entity && it.nx * this.preDirectionX + it.ny * this.preDirectionY > 0) || (it.collided === this.entity && it.nx * this.preDirectionX + it.ny * this.preDirectionY < 0)) {
                    const opponent = Util.getCollidedEntity(this.entity, it);
                    if (BaseUtil.implementsOf(opponent, IDamagable) && BaseUtil.implementsOf(opponent, IPlayable)) {
                        opponent.damage(1);
                    }
                }
            }
            return true;
        }
        return false;
    }
}
/**
 * Elevator AI
 * - Determines the behavior of an entity
 * @extends {AI}
 * @classdesc Elevator AI to go straight ahead and reverses direction if it hit something
 */
class ElevatorAI extends AI { // eslint-disable-line  no-unused-vars
    /**
     * Elevator AI Constructor
     * @constructor
     * @param {number} maxVelocity Maximum speed velocity
     * @param {number} movePower Force applied when moving
     */
    constructor(maxVelocity, movePower) {
        super();

        /**
         * Maximum speed velocity
         * @protected
         * @type {number}
         */
        this.maxVelocity = maxVelocity;
        /**
         * Force applied when moving
         * @protected
         * @type {number}
         */
        this.movePower = movePower;

        /**
         * Elevator floor
         * @protected
         * @type {number}
         */
        this.floor = -1;
        /**
         * Elevator x position list
         * @protected
         * @type {Array<number>}
         */
        this.elevatorXList = [];
        /**
         * Elevator y position list
         * @protected
         * @type {Array<number>}
         */
        this.elevatorYList = [];

        /**
         * Whether player is on it or not
         * @protected
         * @type {boolean}
         */
        this.onPlayer = false;
        /**
         * Whether it moves or not
         * @protected
         * @type {boolean}
         */
        this.isMoving = false;
        /**
         * Counter for not on player
         * @protected
         * @type {number}
         */
        this.notOnPlayercount = 0;
    }

    /**
     * Add elevator position
     * @param {number} x Elevator x position
     * @param {number} y Elevator y position
     */
    addPosition(x, y) {
        this.elevatorXList.push(x);
        this.elevatorYList.push(y);
    }

    /**
     * Initialize AI
     * @override
     */
    init() {
        // apply relative position
        let x = this.entity.x;
        let y = this.entity.y;
        for (let i = 0; i < this.elevatorXList.length; ++i) {
            x += this.elevatorXList[i];
            y += this.elevatorYList[i];
            this.elevatorXList[i] = x;
            this.elevatorYList[i] = y;
        }
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        let localCheck = false;
        // check on ground
        for (const it of this.entity.collider.collisions) {
            const you = Util.getCollidedEntity(this.entity, it);
            if (BaseUtil.implementsOf(you, IPlayable)) {
                if (!this.isMoving && !this.onPlayer) {
                    // move next floor
                    this.floor = (this.floor + 1) % this.elevatorXList.length;
                    this.isMoving = true;
                    this.notOnPlayercount = 0;
                }
                localCheck = true;
                break;
            }
        }
        if (!localCheck) {
            this.notOnPlayercount += dt / 1000;
        }
        if (localCheck || (this.onPlayer && this.notOnPlayercount > 0.5)) {
            this.onPlayer = localCheck;
        }
        if (this.isMoving) {
            let dx = this.elevatorXList[this.floor] - this.entity.x;
            let dy = this.elevatorYList[this.floor] - this.entity.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (dx * this.entity.directionX < 0) {
                dx = 0;
                this.entity.setDirection(0);
                this.entity.body.setNextAddVelocity(-this.entity.body.velocityX, 0);
            }
            if (dy * this.entity.directionY < 0) {
                dy = 0;
                this.entity.setDirection(undefined, 0);
                this.entity.body.setNextAddVelocity(0, -this.entity.body.velocityY);
            }
            if (dx === 0 && dy === 0) {
                this.isMoving = false;
                return true;
            }
            this.entity.setDirection(Math.sign(dx), Math.sign(dy));
            const fx = Math.abs(this.entity.body.velocityX) < this.maxVelocity ? dx / d * this.movePower * this.entity.material.mass : 0;
            const fy = Math.abs(this.entity.body.velocityY) < this.maxVelocity ? dy / d * this.movePower * this.entity.material.mass : 0;
            this.entity.body.enforce(fx, fy);
        }
        return true;
    }
}
/**
 * Vanish state
 * - Determines the operation by AI according to the state and renders based on state
 * - ### Showes entity
 * @extends {State}
 * @classdesc Vanish state to show entity
 */
class ShowState extends State { // eslint-disable-line  no-unused-vars
    /**
     * Vanish state constructor
     * @constructor
     * @param {number} showTime Showing time
     */
    constructor(showTime) {
        super();

        /**
         * Showing time
         * @protected
         * @type {number}
         */
        this.showTime = showTime;
        /**
         * Showing count
         * @protected
         * @type {number}
         */
        this.showCount = 0;
    }

    /**
     * Initialize
     * @override
     */
    init() {
        this.entity.collider.enable = true;
        this.showCount = 0;
        this.canRendering = true;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        this.showCount += dt / 1000;
        if (this.showCount >= this.showTime) {
            this.ai.changeState(`interval`);
        }
        return true;
    }

    /**
     * Render entity by this state
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        this.canRendering = false;
        this.entity.render(ctx, shiftX, shiftY);
        this.canRendering = true;
    }
}
/**
 * Vanish state
 * - Determines the operation by AI according to the state and renders based on state
 * - ### Vanishes entity
 * @extends {State}
 * @classdesc Vanish state to vanish entity
 */
class VanishState extends State { // eslint-disable-line  no-unused-vars
    /**
     * Vanish state constructor
     * @constructor
     * @param {number} hideTime Hiding time
     * @param {boolean} isShowingNext Whether to show next
     */
    constructor(hideTime, isShowingNext) {
        super();

        /**
         * Hiding time
         * @protected
         * @type {number}
         */
        this.hideTime = hideTime;
        /**
         * Whether to show next
         * @protected
         * @type {boolean}
         */
        this.isShowingNext = isShowingNext;
        /**
         * Hiding count
         * @protected
         * @type {number}
         */
        this.hideCount = 0;
    }

    /**
     * Initialize
     * @override
     */
    init() {
        this.entity.collider.enable = false;
        this.hideCount = 0;
        this.canRendering = true;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        this.hideCount += dt / 1000;
        if (this.hideCount >= this.hideTime) {
            this.ai.changeState(this.isShowingNext ? `show` : `vanish`);
        }
        return true;
    }
}
/**
 * Jump AI
 * - Determines the behavior of an entity
 * - ### Jumps
 * @extends {AI}
 * @classdesc Jump AI to jump
 */
class JumpAI extends AI { // eslint-disable-line  no-unused-vars
    /**
     * Jump AI Constructor
     * @constructor
     * @param {number} jumpPower Jumping power
     */
    constructor(jumpPower) {
        super();

        /**
         * Jumping force
         * @protected
         * @type {number}
         */
        this.jumpPower = jumpPower;

        /**
         * On ground counter
         * @protected
         * @type {number}
         */
        this.onGroundCount = 0;
        /**
         * Jumped conter
         * @protected
         * @type {number}
         */
        this.jumpedCount = 0;
    }

    /**
     * Update AI
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        if (Util.onGround(this.entity)) {
            this.entity.getImage().init();
            this.onGroundCount += dt / 1000;
            this.jumpedCount -= dt / 1000;
        } else {
            this.jumpedCount = 1;
            this.onGroundCount = 0;
        }
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // judge
        if (this.onGroundCount > 1 && this.jumpedCount <= 0) {
            // reset and jump
            this.entity.body.enforce(0, -this.jumpPower * this.entity.material.mass * 1000 / dt);
        }
        return true;
    }
}
/**
 * Named state AI
 * - Determines the behavior of an entity
 * - Determines by state
 * - ### Manages state by name
 * @extends {StateAI}
 * @classdesc Named state AI to manage state by name
 */
class NamedStateAI extends StateAI { // eslint-disable-line  no-unused-vars
    /**
     * Named State AI Constructor
     * @param {string} id Initial state name
     */
    constructor(id) {
        super();

        /**
         * AI State
         * @protected
         * @type {State}
         */
        this.state = null;

        /**
         * AI State name
         * @protected
         * @type {string}
         */
        this.stateName = id;

        /**
         * List of named states
         * Associates a name with a state
         * @protected
         * @type {Object<string, State>}
         */
        this.namedStates = {};
    }

    /**
     * Initialize AI
     * @override
     */
    init() {
        // save
        const state = this.stateName;
        this.stateName = ``;
        this.changeState(state);
    }

    /**
     * Get state
     * @override
     * @return {State} state of ai
     */
    getState() {
        return this.state;
    }

    /**
     * Get currently state ID
     * @abstract
     * @return {string} Currently state ID
     */
    getStateID() {
        return this.stateName;
    }

    /**
     * Set state by name
     * @override
     * @param {State} state State
     * @param {string} id State ID
     */
    setState(state, id) {
        this.namedStates[id] = state;
    }

    /**
     * Change state
     * @override
     * @param {string} id ID of state to change
     * @return {boolean} Whether change state or not
     */
    changeState(id) {
        // Do not process if it is in the same state
        if (id === this.stateName) {
            return false;
        }
        if (this.namedStates[id] === undefined) {
            return false;
        }
        this.stateName = id;
        this.state = this.namedStates[id];
        // initialize
        super.changeState(id);
        return true;
    }
}
/**
 * Player base State AI
 * - Determines the behavior of an entity
 * - Determines by state
 * - Manages state by name
 * - ### Manages player state
 * @extends {NamedStateAI}
 * @classdesc Player base State AI to manage player state
 */
class PlayerBaseStateAI extends NamedStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Player base State AI Constructor
     * @constructor
     */
    constructor() {
        super(`stationary`);

        this.namedStates[`stationary`] = new PStationaryState(300, 36000);
        this.namedStates[`walk`] = new PWalkState(300, 18000);
        this.namedStates[`jump`] = new PJumpState(230);
        this.namedStates[`walkjump`] = new PJumpState(300);
        this.namedStates[`jumping`] = new PJumpingState(200, 12000);
        this.namedStates[`attack`] = new PPunchState();
    }
}
/**
 * Player gameover state AI
 * - Determines the behavior of an entity
 * - Determines by state
 * - Manages state by name
 * - ### Manages gameover state
 * @extends {NamedStateAI}
 * @classdesc Player gameover state AI to manage gameover state
 */
class PlayerGameoverStateAI extends NamedStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Player gameover state AI Constructor
     * @constructor
     */
    constructor() {
        super(`gameover`);

        this.namedStates[`gameover`] = new PGameoverState();
    }
}
/**
 * Base State
 * - Determines the operation by AI according to the state and renders based on state
 * - ### Initialize state image
 * @interface
 * @extends {State}
 * @classdesc Base state to initialize state image
 */
class BaseState extends State { // eslint-disable-line  no-unused-vars
    /**
     * Initialize
     * @override
     */
    init() {
        // set image
        const image = this.entity.getImage();
        if (image instanceof NamedAnimation) {
            image.setName(this.ai.getStateID());
            image.init();
        }
    }
}
/**
 * None state
 * - Determines the operation by AI according to the state and renders based on state
 * - ### Does nothing
 * @extends {State}
 * @classdesc None state to do nothing
 */
class NoneState extends State { // eslint-disable-line  no-unused-vars
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        return true;
    }
}
/**
 * Straight AI
 * - Determines the behavior of an entity
 * - ### AI to go straight ahead and reverses direction if it hit something
 * @extends {AI}
 * @classdesc Straight AI to go straight ahead and reverses direction if it hit something
 */
class StraightAI extends AI { // eslint-disable-line  no-unused-vars
    /**
     * Straight AI Constructor
     * @constructor
     * @param {number} mvx Maximum speed vector of x
     * @param {number} px Force applied when moving
     */
    constructor(mvx, px) {
        super();

        /**
         * Maximum speed vector of x
         * @protected
         * @type {number}
         */
        this.maxVelocityX = mvx;
        /**
         * Force applied when moving
         * @protected
         * @type {number}
         */
        this.walkPower = px;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // check on ground
        if (!Util.onGround(this.entity)) {
            return true;
        }
        if (Util.getSideEntity(this.entity)) {
            this.entity.setDirection(this.entity.directionX * -1);
        }
        if (Math.abs(this.entity.body.velocityX) < this.maxVelocityX) {
            this.entity.body.enforce(this.entity.directionX * this.walkPower * this.entity.material.mass, 0);
        }
        return true;
    }
}
/**
 * Image background
 * - Renders and update backgrdoun image
 * - ### Manages image as background
 * @interface
 * @extends {Background}
 * @classdesc Image background to manage image as background
 */
class ImageBackground extends Background { // eslint-disable-line  no-unused-vars
    /**
     * Image background constructor
     * @constructor
     * @param {GameImage} backImage Background image
     */
    constructor(backImage) {
        super();

        /**
         * Background image
         * @protected
         * @type {GameImage}
         */
        this.backImage = backImage;
    }

    /**
     * Initialize background
     * @override
     */
    init() {
        this.backImage.init();
    }

    /**
     * Update background
     * @override
     * @param {number} dt delta time
     */
    update(dt) {
        this.backImage.update(dt);
    }
}
/**
 * Invariant background
 * - Renders and update backgrdoun image
 * - Manages image as background
 * - ### Background where the background does not move
 * @extends {ImageBackground}
 * @classdesc Invariant background where the background does not move
 */
class InvariantBackground extends ImageBackground { // eslint-disable-line  no-unused-vars
    /**
     * Render background
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     * @param {number} screenWidth Scren width
     * @param {number} screenWidth Scren height
     */
    render(ctx, shiftX, shiftY, screenWidth, screenHeight) {
        this.backImage.render(ctx, 0, 0);
    }
}
/**
 * Movement background
 * - Renders and update backgrdoun image
 * - Manages image as background
 * - ### Moves relatively
 * @extends {ImageBackground}
 * @classdesc Movement background to move relatively
 */
class MovementBackground extends ImageBackground { // eslint-disable-line  no-unused-vars
    /**
     * Movement background constructor
     * @constructor
     * @param {GameImage} backImage Background image
     * @param {number} x Background x position
     * @param {number} y Background x position
     * @param {number} speedRatioX Ratio of speed of x velocity
     * @param {number} speedRatioY Ratio of speed of y velocity
     */
    constructor(backImage, x, y, speedRatioX, speedRatioY) {
        super(backImage);

        /**
         * Background x position
         * @protected
         * @type {number}
         */
        this.x = x;
        /**
         * Background y position
         * @protected
         * @type {number}
         */
        this.y = y;
        /**
         * Ratio of speed of x velocity
         * @protected
         * @type {number}
         */
        this.speedRatioX = speedRatioX;
        /**
         * Ratio of speed of y velocity
         * @protected
         * @type {number}
         */
        this.speedRatioY = speedRatioY;
    }

    /**
     * Render background
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     * @param {number} screenWidth Scren width
     * @param {number} screenWidth Scren height
     */
    render(ctx, shiftX, shiftY, screenWidth, screenHeight) {
        this.backImage.render(ctx, this.x + shiftX * this.speedRatioX, this.y + shiftY * this.speedRatioY);
    }
}
/**
 * Sequential background
 * - Renders and update backgrdoun image
 * - ### Processes continuously
 * @extends {Background}
 * @classdesc Sequential background to process continuously
 */
class SequentialBackground extends Background { // eslint-disable-line  no-unused-vars
    /**
     * Sequential background constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * List of backgrounds to process consecutively
         * @protected
         * @type {Array<Background>}
         */
        this.backs = [];
    }

    /**
     * Add background to list
     * @param {Background} back Background
     */
    addBackground(back) {
        this.backs.push(back);
    }

    /**
     * Initialize background
     * @override
     */
    init() {
        for (const it of this.backs) {
            it.init();
        }
    }

    /**
     * Update background
     * @override
     * @param {number} dt delta time
     */
    update(dt) {
        for (const it of this.backs) {
            it.update(dt);
        }
    }

    /**
     * Render background
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     * @param {number} screenWidth Scren width
     * @param {number} screenWidth Scren height
     */
    render(ctx, shiftX, shiftY, screenWidth, screenHeight) {
        for (const back of this.backs) {
            back.render(ctx, shiftX, shiftY, screenWidth, screenHeight);
        }
    }
}
/**
 * Center camera
 * - Calculates the area to rendering
 * - ### Centering at the indicated coordinates
 * @extends {Camera}
 * @classdesc Center camera for centering at the indicated coodinates
 */
class CenterCamera extends Camera { // eslint-disable-line  no-unused-vars
    /**
     * Initialize camera
     * @override
     * @param {number} x First camera x position
     * @param {number} y First camera y position
     */
    init(x, y) {
        this.update(x, y, 0);
    }

    /**
     * Update camera
     * @override
     * @param {number} x Base x position
     * @param {number} y Base y position
     * @param {number} dt Delta time
     */
    update(x, y, dt) {
        this.cameraX = this.screenWidth / 2 - x;
        this.cameraY = this.screenHeight / 2 - y;
    }
}
/**
 * Clip camera
 * - Calculates the area to rendering
 * - Delegates some processing to another camera
 * - ### Cliping camera position by stage size
 * @extends {DelegateCamera}
 * @classdesc Clip camera for cliping camera position by stage size
 */
class ClipCamera extends DelegateCamera { // eslint-disable-line  no-unused-vars
    /**
     * Initialize camera
     * @override
     * @param {number} x First camera x position
     * @param {number} y First camera y position
     */
    init(x, y) {
        super.init(x, y);
        this.clip();
    }

    /**
     * Update camera
     * @override
     * @param {number} x Base x position
     * @param {number} y Base y position
     * @param {number} dt Delta time
     */
    update(x, y, dt) {
        // set position
        super.update(x, y, dt);
        this.clip();
    }

    /**
     * Clip camera position
     * @protected
     */
    clip() {
        this.cameraX = this.baseCamera.cameraX;
        this.cameraY = this.baseCamera.cameraY;

        // cliping
        if (this.cameraX < this.screenWidth - this.maxWidth) {
            this.cameraX = this.screenWidth - this.maxWidth;
        }
        if (this.cameraX > 0) {
            this.cameraX = 0;
        }
        if (this.cameraY > 0) {
            this.cameraY = 0;
        }
        if (this.cameraY < this.screenHeight - this.maxHeight) {
            this.cameraY = this.screenHeight - this.maxHeight;
        }
        // apply
        this.baseCamera.cameraX = this.cameraX;
        this.baseCamera.cameraY = this.cameraY;
    }
}
/**
 * Event camera
 * - Calculates the area to rendering
 * - Delegates some processing to another camera
 * - ### For using by event
 * @extends {DelegateCamera}
 * @classdesc Event camera to use by event
 */
class EventCamera extends DelegateCamera { // eslint-disable-line  no-unused-vars
    /**
     * Event camera constructor
     * @constructor
     * @param {Camera} baseCamera Base camera for delegation
     */
    constructor(baseCamera) {
        super(baseCamera);

        /**
         * Movement x position
         * @protected
         * @type {number}
         */
        this.toX = 0;
        /**
         * Movement y position
         * @protected
         * @type {number}
         */
        this.toY = 0;
    }

    /**
     * Set movement position
     * @param {number} x Movement x position
     * @param {number} y Movement y position
     */
    setToPosition(x, y) {
        this.toX = x;
        this.toY = y;
    }

    /**
     * Update camera
     * @override
     * @param {number} x Base x position
     * @param {number} y Base y position
     * @param {number} dt Delta time
     */
    update(x, y, dt) {
        super.update(this.toX, this.toY, dt);
        this.cameraX = this.baseCamera.cameraX;
        this.cameraY = this.baseCamera.cameraY;
    }
}
/**
 * Fix camera
 * - Calculates the area to rendering
 * - ### Fixes certain position
 * @extends {Camera}
 * @classdesc Fix camera to fix certain position
 */
class FixCamera extends Camera { // eslint-disable-line  no-unused-vars
    /**
     * Fix camera constructor
     * @constructor
     * @param {number} x Fixed x position
     * @param {number} y Fixed y position
     */
    constructor(x, y) {
        super();

        /**
         * Fixed x position
         * @protected
         * @type {number}
         */
        this.fixX = x;
        /**
         * Fixed y position
         * @protected
         * @type {number}
         */
        this.fixY = y;
    }

    /**
     * Initialize camera
     * @override
     * @param {number} x First camera x position
     * @param {number} y First camera y position
     */
    init(x, y) {
        this.update(x, y, 0);
    }

    /**
     * Update camera
     * @override
     * @param {number} x Base x position
     * @param {number} y Base y position
     * @param {number} dt Delta time
     */
    update(x, y, dt) {
        this.cameraY = -this.fixX;
        this.cameraY = -this.fixY;
    }
}
/**
 * Moving center camera
 * - Calculates the area to rendering
 * - Delegates some processing to another camera
 * - ### Forces to move camera
 * @extends {DelegateCamera}
 * @classdesc Moving center camera to force to move camera
 */
class ForceMoveCamera extends DelegateCamera { // eslint-disable-line  no-unused-vars
    /**
     * Moving Camera Constructor
     * @constructor
     * @param {Camera} baseCamera Base camera for delegation
     * @param {number} x Movement x position
     * @param {number} y Movement y position
     * @param {number} speed Movement speed
     */
    constructor(baseCamera, x, y, speed) {
        super(baseCamera);

        /**
         * Movement x position
         * @protected
         * @type {number}
         */
        this.toX = x;
        /**
         * Movement y position
         * @protected
         * @type {number}
         */
        this.toY = y;
        /**
         * Movement speed
         * @protected
         * @type {number}
         */
        this.speed = speed;

        /**
         * Next camera x position
         * @protected
         * @type {number}
         */
        this.nextX = 0;
        /**
         * Next camera y position
         * @protected
         * @type {number}
         */
        this.nextY = 0;
    }

    /**
     * Initialize camera
     * @override
     * @param {number} x First camera x position
     * @param {number} y First camera y position
     */
    init(x, y) {
        super.init(x, y);
        this.nextX = this.cameraY;
        this.nextY = this.cameraX;
    }

    /**
     * Update camera
     * @override
     * @param {number} x Base x position
     * @param {number} y Base y position
     * @param {number} dt Delta time
     */
    update(x, y, dt) {
        super.update(this.nextX, this.nextY, dt);
        this.cameraX = this.baseCamera.cameraX;
        this.cameraY = this.baseCamera.cameraY;

        // update next position
        const nx = this.nextX;
        const ny = this.nextY;
        if (this.nextX !== this.toX) {
            this.nextX = this.nextX + this.speed * dt / 1000 * Math.sign(this.toX - this.nextX);
        }
        if (Math.sign(this.toX - nx) * Math.sign(this.toX - this.nextX) < 0) {
            this.nextX = this.toX;
        }
        if (this.nextY !== this.toY) {
            this.nextY = this.nextY + this.speed * dt / 1000 * Math.sign(this.toY - this.nextY);
        }
        if (Math.sign(this.toY - ny) * Math.sign(this.toY - this.nextY) < 0) {
            this.nextY = this.toY;
        }
    }
}
/**
 * Moving center camera
 * - Calculates the area to rendering
 * - Delegates some processing to another camera
 * - ### Move gradually, not instantaneously
 * @extends {DelegateCamera}
 * @classdesc Moving center camera to move gradually, not instantaneously
 */
class MovingCamera extends DelegateCamera { // eslint-disable-line  no-unused-vars
    /**
     * Update camera
     * @override
     * @param {number} x Base x position
     * @param {number} y Base y position
     * @param {number} dt Delta time
     */
    update(x, y, dt) {
        super.update(x, y, dt);

        // move gradually
        if (this.cameraX !== this.baseCamera.cameraX || this.cameraY !== this.baseCamera.cameraY) {
            this.cameraX = this.cameraX + (this.baseCamera.cameraX - this.cameraX) * dt / 200;
            this.cameraY = this.cameraY + (this.baseCamera.cameraY - this.cameraY) * dt / 200;
        }
    }
}
/**
 * Immutable event object
 * - Object present on the stage that has coordinate and size
 * - It can hold event and fire it
 * - Object that has collide
 * - ### Fire event
 * @extends {Entity}
 * @implements {IEventEntity}
 * @implements {IColliderable}
 * @classdesc Immutable event object to fire event
 */
class ImmutableEvent extends Entity /* , IEventEntity, IColliderable */ { // eslint-disable-line  no-unused-vars
    /**
     * Immutable event object constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Event for firing
         * @protected
         * @type {GameEvent}
         */
        this.event = null;

        /**
         * Whether it has already collided
         * @@protected
         * @type {boolean}
         */
        this.collided = false;

        /**
         * Event collider for firing
         * @protected
         * @type {Collider}
         */
        this.eventCollider = null;
    }

    /**
     * Set game event
     * @override
     * @param {GameEvent} event Stage event
     */
    setEvent(event) {
        this.event = event;
    }

    /**
     * Get stage event
     * @override
     * @return {GameEvent} Stage event
     */
    getEvent() {
        return this.event;
    }

    /**
     * Fires event
     * @override
     */
    fire() {
        if (BaseUtil.implementsOf(this.event, IStageEvent)) {
            this.event.setStage(this.stage);
        }
        EventManager.it.register(this.event);
    }

    /**
     * Set collider
     * @param {Collider} collider collider
     */
    setCollider(collider) {
        this.eventCollider = collider;
        this.eventCollider.setEntity(this);
        this.eventCollider.init();
    }

    /**
     * Get collider
     * @override
     * @return {Collider} Collider that object has
     */
    getCollider() {
        return this.eventCollider;
    }

    /**
     * Initialize entity
     * @override
     */
    init() {
        this.eventCollider.update();
    }

    /**
     * Update entty
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        super.update(dt);
        let localCollided = false;
        for (const it of this.stage.getPhysicalWorld().getCollisionData(this.eventCollider)) {
            const you = Util.getCollidedEntity(this, it);
            if (BaseUtil.implementsOf(you, IPlayable)) {
                localCollided = true;
                if (!this.collided) {
                    this.fire();
                    break;
                }
            }
        }
        this.collided = localCollided;
    }
}
/**
 * Once event entity
 * - Object present on the stage that has coordinate and size
 * - It can hold event and fire it
 * - Object that has collide
 * - Fire event
 * - Object that can be destroyed
 * - ### Fire event once
 * @extends {ImmutableEvent}
 * @implements {IEventEntity}
 * @implements {IColliderable}
 * @classdesc Once event entity to fire event
 */
class OnceEventEntity extends ImmutableEvent /* , IBreakable */ { // eslint-disable-line  no-unused-vars
    /**
     * Destroy object
     * @override
     */
    destroy() {
        this.stage.removeEntity(this);
    }

    /**
     * Fires event
     * @override
     */
    fire() {
        if (BaseUtil.implementsOf(this.event, IStageEvent)) {
            this.event.setStage(this.stage);
        }
        EventManager.it.register(this.event);
        this.destroy();
    }
}
/**
 * Immutable event object
 * - Object present on the stage that has coordinate and size
 * - Manages image
 * - Object that has collide
 * - ### Show sign
 * @extends {ImagedEntity}
 * @implements {IColliderable}
 * @classdesc Immutable event object to show sign
 */
class DoorObject extends ImagedEntity /* , IColliderable */ { // eslint-disable-line  no-unused-vars
    /**
     * Influential event object constructor
     * @constructor
     * @param {string} [transition=null] Transition stage name
     * @param {boolean} [isReplace=false] Whether stage is replaced or not
     * @param {number} [popNumber=0] Number of applying pop
     */
    constructor(transition = null, isReplace = false, popNumber = 0) {
        super();

        /**
         * Transition stage name
         * @protected
         * @type {string}
         */
        this.transition = transition;
        /**
         * Whether stage is replaced or not
         * @protected
         * @type {boolean}
         */
        this.isReplace = isReplace;
        /**
         * Number of applying pop
         * @protected
         * @type {number}
         */
        this.popNumber = popNumber;

        /**
         * Door collider for
         * @protected
         * @type {Collider}
         */
        this.doorCollider = null;

        /**
         * Whether transition is executing now or not
         * @protected
         * @type {boolean}
         */
        this.isTransitioning = false;
    }

    /**
     * Set collider
     * @param {Collider} collider collider
     */
    setCollider(collider) {
        this.doorCollider = collider;
        this.doorCollider.setEntity(this);
        this.doorCollider.init();
    }

    /**
     * Get collider
     * @override
     * @return {Collider} Collider that object has
     */
    getCollider() {
        return this.doorCollider;
    }

    /**
     * Initialize entity
     * @override
     */
    init() {
        this.doorCollider.update();
    }

    /**
     * Update entty
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        // opening
        if (this.isTransitioning) {
            super.update(dt);
            if (Util.canEnd(this.image)) {
                // transition
                Input.key.setInputEnable(true);
                for (let i = 0; i < this.popNumber; ++i) {
                    StageManager.it.popStage();
                }
                if (this.transition !== null) {
                    if (this.isReplace) {
                        StageManager.it.replaceStage(this.transition);
                    } else {
                        StageManager.it.pushStage(this.transition);
                    }
                }
                this.isTransitioning = false;
            }
            return;
        }
        // open
        if (Input.key.isPress(Input.key.up())) {
            for (const it of this.stage.getPhysicalWorld().getCollisionData(this.doorCollider)) {
                const you = Util.getCollidedEntity(this, it);
                if (BaseUtil.implementsOf(you, IPlayable) && Util.onGround(you)) {
                    this.isTransitioning = true;
                    Input.key.setInputEnable(false);
                }
            }
        }
    }
}
/**
 * Immutable event object
 * - Object present on the stage that has coordinate and size
 * - Manages image
 * - Object that has collide
 * - ### Show sign
 * @extends {ImagedEntity}
 * @implements {IColliderable}
 * @classdesc Immutable event object to show sign
 */
class SignObject extends ImagedEntity /* , IColliderable */ { // eslint-disable-line  no-unused-vars
    /**
     * Influential event object constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Sign image
         * @protected
         * @type {GameImage}
         */
        this.signImage = null;
        /**
         * Sign realative x position
         * @protected
         * @type {number}
         */
        this.signX = 0;
        /**
         * Sign realative y position
         * @protected
         * @type {number}
         */
        this.signY = 0;

        /**
         * Sign collider for
         * @protected
         * @type {Collider}
         */
        this.signCollider = null;

        /**
         * Whether sign can be showed or not
         * @protected
         * @type {boolean}
         */
        this.isShowSign = false;

        /**
         * Show speed
         * @protected
         * @type {number}
         */
        this.speed = 100;
    }

    /**
     * Set sign information
     * @param {GameImage} signImage Sign image
     * @param {number} x Sign relative x position
     * @param {number} y Sign relative y position
     */
    setSign(signImage, x, y) {
        this.signImage = signImage;
        this.signX = x;
        this.signY = y;
    }

    /**
     * Set collider
     * @param {Collider} collider collider
     */
    setCollider(collider) {
        this.signCollider = collider;
        this.signCollider.setEntity(this);
        this.signCollider.init();
    }

    /**
     * Get collider
     * @override
     * @return {Collider} Collider that object has
     */
    getCollider() {
        return this.signCollider;
    }

    /**
     * Initialize entity
     * @override
     */
    init() {
        this.signCollider.init();
        if (this.signImage !== null) {
            this.signImage.init();
        }
        this.isShowSign = false;
    }

    /**
     * Update entty
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        this.isShowSign = false;
        for (const it of this.stage.getPhysicalWorld().getCollisionData(this.signCollider)) {
            const you = Util.getCollidedEntity(this, it);
            if (BaseUtil.implementsOf(you, IPlayable)) {
                this.isShowSign = true;
                break;
            }
        }
        if (this.isShowSign) {
            super.update(dt);
            // show
            if (this.signImage !== null && Util.canEnd(this.image)) {
                this.signImage.update(dt);
            }
        } else {
            // hide
            if (this.signImage !== null) {
                this.signImage.init();
            }
        }
    }

    /**
     * Render entity
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        super.render(ctx, shiftX, shiftY);
        if (this.signImage !== null && this.isShowSign && Util.canEnd(this.image)) {
            this.signImage.render(ctx, this.x + shiftX + this.signX, this.y + shiftY + this.signY);
        }
    }
}
/**
 * Obstacle
 * - Object present on the stage that has coordinate and size
 * - Manages image
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - ### Obstacle on the stage that renders simply
 * @extends {MutableEntity}
 * @classdesc Obstacle that renderes simply
 */
class Obstacle extends MutableEntity { // eslint-disable-line  no-unused-vars
}
/**
 * Only image entity
 * - Object present on the stage that has coordinate and size
 * - Manages image
 * - ### Renders image only
 * @extends {ImagedEntity}
 * @classdesc Only image entity to render image only
 */
class OnlyImageEntity extends ImagedEntity { // eslint-disable-line  no-unused-vars
}
/**
 * Base image builder
 * - Generates image from json data
 * - ### Generates normal image from json data
 * @extends {ImageBuilder}
 * @classdesc Base image builder to generate normal image from json
 */
class BaseImageBuilder extends ImageBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Build image from json data
     * @override
     * @param {string} root File root path
     * @param {JSON} image Image json data
     * @return {GameImage} Maked image
     */
    build(root, image) {
        let ret = null;
        const id = image.file === undefined ? -1 : ResourceManager.image.load(`${root}/${image.file}`);
        // build base
        switch (image.type) {
            case `tile`:
                {
                    const width = image.w === undefined ? image.width : image.w;
                    const height = image.h === undefined ? image.height : image.h;
                    ret = new TileImage(id, width, height, image.x, image.y, image.width, image.height);
                    break;
                }
            case `single`:
                ret = new SingleImage(id, image.width, image.height);
                break;
            case `anime`:
                ret = new SingleAnimation(image.loop);
                break;
            case `multianime`:
                ret = new MultiNamedAnimation();
                break;
        }
        // build transitional
        if (image.transition !== undefined) {
            switch (image.transition.type) {
                case `blink`:
                    if (ret instanceof NamedAnimation) {
                        ret = new TransitionalNamedAnimation(ret, image.transition.time, image.transition.interval);
                    }
                    break;
                case `stripe`:
                    if (ret instanceof NamedAnimation) {
                        ret = new TransitionalStripeAnimation(ret, image.transition.time);
                        image.clip = true;
                    }
                    break;
            }
        }
        // build clip
        if (image.clip) {
            if (ret instanceof NamedAnimation) {} else if (ret instanceof GameAnimation) {
                ret = new ClipAnimation(ret);
            } else if (ret instanceof GameImage) {
                ret = new ClipImage(ret);
            }
        }
        // build directional
        if (image.directional) {
            if (ret instanceof NamedAnimation) {
                ret = new DirectionalNamedAnimation(ret);
            } else if (ret instanceof GameAnimation) {
                ret = new DirectionalAnimation(ret);
            } else if (ret instanceof GameImage) {
                ret = new DirectionalImage(ret);
            }
        }
        if (ret instanceof MultiAnimation) {
            for (const anime of image.animations) {
                ret.setName(anime.name);
                anime.type = `anime`;
                anime.directional = image.directional;
                anime.clip = image.clip;
                const element = this.build(root, anime);
                if (element instanceof GameAnimation) {
                    ret.setAnimation(element);
                }
            }
            ret.setAllImageID(id);
            ret.setAllSize(image.width, image.height);
        } else if (ret instanceof GameAnimation) {
            for (const it of image.animation) {
                it.type = `tile`;
                it.directional = image.directional;
                it.clip = image.clip;
                ret.addAnimation(this.build(root, it), it.delta);
            }
            ret.setImageID(id);
            ret.setSize(image.width, image.height);
        }
        return ret;
    }
}
/**
 * CSV stage parser
 * - Generates a stage from a file
 * - ### Parses CSV file
 * @extends {StageParser}
 * @classdesc CSV stage parser to parse CSV file
 */
class CSVStageParser extends StageParser { // eslint-disable-line  no-unused-vars
    /**
     * Make base stage for parsing stage
     * @protected
     * @param {number} width Stage width
     * @param {height} height Stage height
     * @return {Stage} Stage instance for base of parsing
     */
    makeBaseStage(width, height) {
        return new SplitManagementStage(width, height);
    }

    /**
     * Make base background for parsing stage
     * @protected
     * @param {number} imageID Background image id
     * @return {Background} Background instance for base of parsing
     */
    makeBaseBackground(imageID) {
        return new InvariantBackground(imageID);
    }

    /**
     * Make base camera for parsing stage
     * @protected
     * @param {number} width Camera width
     * @param {height} height Camera height
     * @return {Camera} Camera instance for base of parsing
     */
    makeBaseCamera(width, height) {
        return new CenterCamera(width, height);
    }

    /**
     * Make base phisical world for parsing stage
     * @protected
     * @return {PhysicalWorld} Physical world instance for base of parsing
     */
    makeBaseWorld() {
        const world = new SequentialWorld();
        world.setResponse(new RepulsionResponse());
        return world;
    }

    /**
     * Make tile object
     * @protected
     * @param {number} verticalId Tile vertical id
     * @param {number} horizontalId Tile horizontal id
     * @param {number} tileWidth Tile width
     * @param {number} tileHeight Tile height
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} width Object width
     * @param {number} height Object height
     * @param {number} imageID Tile image id
     * @return {TileObject} Tile object
     */
    makeTileObject(verticalId, horizontalId, tileWidth, tileHeight, x, y, width, height, imageID) {
        const tile = new TileObject(horizontalId * tileWidth, verticalId * tileHeight, tileWidth, tileHeight, x, y, width, height, imageID);
        tile.setCollider(new RectangleCollider(0, 0, width, height));
        tile.setMaterial(new ImmutableMaterial());
        return tile;
    }

    /**
     * Parset file to stage
     * @override
     * @param {string} filePath Stage file path
     * @param {number} width Stage width for rendering area
     * @param {number} height Stage height for rendering area
     * @return {Stage} Stage instance
     */
    parse(filePath, width, height) {
        // Load stage file
        const req = new XMLHttpRequest();
        req.open(`GET`, filePath, false);
        req.send(null);
        // get stage file data
        const lines = req.responseText.split(`\n`);
        const stageBaseData = lines[0].split(`,`);
        const tileBaseData = lines[1].split(`,`);
        const stageData = lines[2].split(`,`);
        // set base data
        const backID = ResourceManager.image.load(`back/` + stageBaseData[0]);
        const stageWidth = parseInt(stageBaseData[1]);
        const stageHeight = parseInt(stageBaseData[2]);
        const tileID = ResourceManager.image.load(`tile/` + tileBaseData[0]);
        const tileWidth = parseInt(tileBaseData[1]);
        const tileHeight = parseInt(tileBaseData[2]);
        const tileHorizontalNumber = parseInt(tileBaseData[3]);

        // set base
        const stage = this.makeBaseStage(stageWidth * tileWidth, stageHeight * tileHeight);
        stage.setBackground(this.makeBaseBackground(backID));
        stage.setCamera(this.makeBaseCamera(width, height));
        stage.setPhysicalWorld(this.makeBaseWorld());
        // set tile
        for (const y = 0; y < stageHeight; ++y) {
            for (const x = 0; x < stageWidth; ++x) {
                const id = parseInt(stageData[x + y * stageWidth]);
                if (id > -1) {
                    stage.addEntity(this.makeTileObject(Math.floor(id / tileHorizontalNumber), id % tileHorizontalNumber, tileWidth, tileHeight, x * tileWidth, y * tileHeight, tileWidth, tileHeight, tileID));
                }
            }
        }
        return stage;
    }
}
/**
 * JSON entity factory
 * - Generates entity by ID
 * - ### Generates from JSON data
 * @extends {EntityFactory}
 * @classdesc JSON entity factory to generate from JSON data
 */
class JSONEntityFactory extends EntityFactory { // eslint-disable-line  no-unused-vars
    /**
     * JSON entity factory
     * @constructor
     * @param {EntityBuilder} [tile = TileBuilder] Tile builder instance
     * @param {EntityBuilder} [chara = CharacterBuilder] Character builder instance
     * @param {EventBuilder} [event = EventBuilder] Event builder instance
     * @param {ImageBuilder} [image = BaseImageBuilder] Image builder instance
     */
    constructor(tile = new TileBuilder(), chara = new CharacterBuilder(), event = new SimpleEventBuilder(), image = new BaseImageBuilder()) {
        super();

        /**
         * Tile builder instance
         * @protected
         * @type {EntityBuilder}
         */
        this.tileBuilder = tile;
        /**
         * Character builder instance
         * @protected
         * @type {EntityBuilder}
         */
        this.characterBuilder = chara;

        /**
         * Event builder instance
         * @protected
         * @type {EventBuilder}
         */
        this.eventBuilder = event;

        /**
         * Image builder instance
         * @protected
         * @type {ImageBuilder}
         */
        this.imageBuilder = image;

        /**
         * Tile information by JSON
         * @protected
         * @type {Object<number, JSON>}
         */
        this.tileInfo = {};
        /**
         * Entity information by JSON
         * @protected
         * @type {Object<number, JSON>}
         */
        this.entityInfo = {};

        // initialize
        this.tileBuilder.setImageBuilder(image);
        this.characterBuilder.setImageBuilder(image);
        this.eventBuilder.setImageBuilder(image);
    }

    /**
     * Add entity information
     * @param {JSON} entityInfo Entity information JSON data
     */
    addEntityInfo(entityInfo) {
        this.buildEntityInfo(entityInfo);
    }

    /**
     * Add tile information
     * @param {JSON} tileInfo Tile information JSON data
     */
    addTileInfo(tileInfo) {
        this.buildTileInfo(tileInfo);
    }

    /**
     * Override value from data to base
     * @param {JSON} base Base data
     * @param {JSON} data Override data
     */
    overrideValue(base, data) {
        for (let it in data) {
            if (data.hasOwnProperty(it)) {
                if (base[it] === undefined || base[it] instanceof Array || !isNaN(base[it]) || data[it] === null) {
                    base[it] = data[it] === null ? undefined : data[it];
                } else {
                    this.overrideValue(base[it], data[it]);
                }
            }
        }
    }

    /**
     * Build entity information
     * @protected
     * @param {JSON} entityInfo Added entity information
     */
    buildEntityInfo(entityInfo) {
        // set default info
        const defaultCollider = {
            type: `Rectangle`,
            startX: 0,
            startY: 0,
            width: 0,
            height: 0,
        };
        const defaultMaterial = {
            mass: 10,
            elasticity: 0.1,
            mu: 0.65,
        };
        const defaultBBody = {
            type: `MaxAdopt`,
            material: {
                type: `Immutable`,
                k: 0.5,
                frictionX: 1.0,
                frictionY: 0.0,
            },
        };
        for (const entity of entityInfo.entities) {
            // set default collider
            if (entity.collider === undefined) {
                entity.collider = JSON.parse(JSON.stringify(defaultCollider));
                entity.collider.width = entity.width;
                entity.collider.height = entity.height;
            }
            // set default material
            if (entity.material === undefined) {
                entity.material = JSON.parse(JSON.stringify(defaultMaterial));
            }
            // set default body
            if (entity.body === undefined) {
                entity.body = JSON.parse(JSON.stringify(defaultBBody));
            }
            // check serial
            if (entity.image !== undefined && entity.image.type === `anime`) {
                const animation = [];
                for (const it of entity.image.animation) {
                    if (it.serial) {
                        for (let cy = 0; cy < it.vertical; ++cy) {
                            for (let cx = 0; cx < it.horizontal; ++cx) {
                                const data = JSON.parse(JSON.stringify(it));
                                data.x = it.x + cx * it.width;
                                data.y = it.y + cy * it.height;
                                animation.push(data);
                            }
                        }
                    } else {
                        animation.push(it);
                    }
                }
                entity.image.animation = animation;
            }
            // check multi serial
            if (entity.image !== undefined && entity.image.type === `multianime`) {
                const animations = [];
                for (const it of entity.image.animations) {
                    if (it.serial && it.names !== undefined) {
                        const animation = [];
                        let index = 0;
                        let number = 0;
                        for (let cy = 0; cy < it.vertical; ++cy) {
                            for (let cx = 0; cx < it.horizontal; ++cx) {
                                const data = {};
                                data.x = it.x + cx * it.width;
                                data.y = it.y + cy * it.height;
                                data.width = it.width;
                                data.height = it.height;
                                data.delta = it.delta;
                                animation.push(data);
                                if (++number === it.number) {
                                    for (let i = 0; i < it.names[index].length; ++i) {
                                        const item = {};
                                        item.name = it.names[index][i];
                                        item.loop = it.loops[index][i];
                                        if (it.deltas !== undefined) {
                                            for (const anime of animation) {
                                                anime.delta = it.deltas[index][i];
                                            }
                                        }
                                        item.animation = JSON.parse(JSON.stringify(animation));
                                        animations.push(item);
                                    }
                                    animation.length = [];
                                    number = 0;
                                    index++;
                                }
                            }
                        }
                    } else {
                        const animation = [];
                        for (const e of it.animation) {
                            if (e.serial) {
                                for (let cy = 0; cy < e.vertical; ++cy) {
                                    for (let cx = 0; cx < e.horizontal; ++cx) {
                                        const data = JSON.parse(JSON.stringify(e));
                                        data.x = e.x + cx * e.width;
                                        data.y = e.y + cy * e.height;
                                        animation.push(data);
                                    }
                                }
                            } else {
                                animation.push(e);
                            }
                        }
                        it.animation = animation;
                        animations.push(it);
                    }
                }
                entity.image.animations = animations;
            }
            this.entityInfo[entity.id] = entity;
        }
    }

    /**
     * Build sirial chip data
     * @protected
     * @param {JSON} data Target base json data
     * @param {JSON} chip Serial chip information
     */
    buildChipSerial(data, chip) {}

    /**
     * Build tile information
     * @protected
     * @param {JSON} tileInfo Added tile information
     */
    buildTileInfo(tileInfo) {
        // set default info
        const defaultCollider = {
            type: `Rectangle`,
            startX: 0,
            startY: 0,
            width: 0,
            height: 0,
        };
        const defaultMaterial = {
            mass: 10,
            elasticity: 0.1,
            mu: 0.65,
        };
        for (const tile of tileInfo.tiles) {
            for (const chip of tile.chips) {
                // set default collider
                if (this.tileInfo[chip.id] === undefined && chip.collider === undefined) {
                    chip.collider = JSON.parse(JSON.stringify(defaultCollider));
                    chip.collider.width = chip.width;
                    chip.collider.height = chip.height;
                }
                // set default material
                if (this.tileInfo[chip.id] === undefined && chip.material === undefined) {
                    chip.material = JSON.parse(JSON.stringify(defaultMaterial));
                }
                // check serial
                if (chip.serial) {
                    let id = chip.id;
                    const x = chip.image.x;
                    const y = chip.image.y;
                    for (let cy = 0; cy < chip.vertical; ++cy) {
                        for (let cx = 0; cx < chip.horizontal; ++cx) {
                            const data = JSON.parse(JSON.stringify(chip));
                            data.id = id;
                            data.image.file = tile.file;
                            data.image.x = x + cx * chip.image.width;
                            data.image.y = y + cy * chip.image.height;
                            this.buildChipSerial(data, chip);
                            if (this.tileInfo[id] === undefined) {
                                this.tileInfo[id] = data;
                            } else {
                                this.overrideValue(this.tileInfo[id], data);
                            }
                            ++id;
                        }
                    }
                } else {
                    if (this.tileInfo[chip.id] === undefined) {
                        chip.image.file = tile.file;
                        this.tileInfo[chip.id] = chip;
                    } else {
                        this.overrideValue(this.tileInfo[chip.id], chip);
                    }
                }
            }
        }
    }

    /**
     * Build event
     * @protected
     * @param {Entity} base Based entity for setting event
     * @param {JSON} deploy Entity deploy json data
     */
    buildEvent(base, deploy) {
        if (BaseUtil.implementsOf(base, IEventEntity)) {
            let event = (deploy === undefined || deploy.event === undefined) ? info.event : deploy.event;
            base.setEvent(this.eventBuilder.build(event));
        }
    }

    /**
     * Create entity from factory data
     * @override
     * @param {Object} id ID for entity
     * @param {JSON} deploy Entity deploy json data
     * @return {Entity} Entity instance
     */
    createEntity(id, deploy) {
        let ret = null;
        let info = null;
        if (this.tileInfo[id] !== undefined) {
            // build tile
            info = this.tileInfo[id];
            ret = this.tileBuilder.build(deploy, info);
        } else {
            info = this.entityInfo[id];
            ret = this.characterBuilder.build(deploy, info);
        }
        this.buildEvent(ret, deploy);
        return ret;
    }
}
/**
 * JSON stage parser
 * - Generates a stage from a file
 * - ### Parses JSON file
 * @extends {StageParser}
 * @classdesc JSON stage parser to parse JSON file
 */
class JSONStageParser extends StageParser { // eslint-disable-line  no-unused-vars
    /**
     * JSON stage parser
     * @param {ImageBuilder} [image = BaseImageBuilder] Image builder instance
     */
    constructor(image = new BaseImageBuilder()) {
        super();
        /**
         * Image builder instance
         * @protected
         * @type {ImageBuilder}
         */
        this.imageBuilder = image;
    }

    /**
     * Make background image
     * @protected
     * @param {JSON} image Background image json data
     * @return {GameImage} Background image
     */
    makeBackgroundImage(image) {
        return this.imageBuilder.build(`back`, image);
    }

    /**
     * Make base stage for parsing stage
     * @protected
     * @param {JSON} stage Stage json data
     * @return {Stage} Stage instance for base of parsing
     */
    makeBaseStage(stage) {
        return new SplitManagementStage(stage.width, stage.height);
    }

    /**
     * Make background for parsing stage
     * @protected
     * @param {JSON} back Background json data
     * @return {Background} Background instance for base of parsing
     */
    makeBackground(back) {
        switch (back.type) {
            case `Sequential`:
                const ret = new SequentialBackground();
                for (const it of back.backs) {
                    ret.addBackground(this.makeBackground(it));
                }
                return ret;
            case `Invariant`:
                return new InvariantBackground(this.makeBackgroundImage(back.image));
            case `Movement`:
                return new MovementBackground(this.makeBackgroundImage(back.image), back.x, back.y, back.rx, back.ry);
            case `Area`:
                return new AreaBackground(this.makeBackgroundImage(back.image), back.x, back.y, back.width, back.height);
            case `Fixed`:
                return new FixedBackground(this.makeBackgroundImage(back.image), back.x, back.y);
            default:
                return null;
        }
    }

    /**
     * Make base camera for parsing stage
     * @protected
     * @param {JSON} camera Camera json data
     * @return {Camera} Camera instance for base of parsing
     */
    makeBaseCamera(camera) {
        let ret = null;
        if (camera.type === `center`) {
            ret = new CenterCamera();
        }
        if (camera.cliping) {
            ret = new ClipCamera(ret);
        }
        if (camera.moving) {
            ret = new MovingCamera(ret);
        }
        if (camera.force) {
            ret = new ForceMoveCamera(ret, camera.force.x, camera.force.y, camera.force.speed);
        }
        return ret;
    }

    /**
     * Make base phisical world for parsing stage
     * @protected
     * @param {JSON} stage Stage json data
     * @param {JSON} world World json data
     * @return {PhysicalWorld} Physical world instance for base of parsing
     */
    makeBaseWorld(stage, world) {
        switch (world.type) {
            case `sequential`:
                return new SequentialWorld();
            case `split`:
                return new SplitWorld(stage.width, stage.height);
            case `gravity`:
                {
                    const ret = new VariableGravityWorld(stage.width, stage.height);
                    for (const it of world.gravity) {
                        ret.addGravity(it.x, it.y, it.delta);
                    }
                    return ret;
                }
            default:
                return null;
        }
    }

    /**
     * Make physical response
     * @protected
     * @return {CollisionResponse} Physical response
     */
    makePhysicalResponse() {
        return new RepulsionResponse();
    }

    /**
     * Make entity factory
     * @protected
     * @param {JSON} stage Stage json data
     * @return {EntityFactory} Entity factory
     */
    makeEntityFactory(stage) {
        const ret = new JSONEntityFactory();
        for (const it of stage.tiles) {
            ret.addTileInfo(JSON.parse(Util.loadFile(`src/res/stage/${it}`)));
        }
        for (const it of stage.entities) {
            ret.addEntityInfo(JSON.parse(Util.loadFile(`src/res/stage/${it}`)));
        }
        return ret;
    }

    /**
     * Parset file to stage
     * @override
     * @param {string} filePath Stage file path
     * @param {number} width Stage width for rendering area
     * @param {number} height Stage height for rendering area
     * @return {Stage} Stage instance
     */
    parse(filePath, width, height) {
        // get stage file data
        const stage = JSON.parse(Util.loadFile(filePath));
        // make stage
        const base = this.makeBaseStage(stage);
        base.setBackground(this.makeBackground(stage.background));
        base.setCamera(this.makeBaseCamera(stage.camera));
        base.getCamera().setScreenSize(width, height);
        base.getCamera().setMaxSize(base.getStageWidth(), base.getStageHeight());
        base.setPhysicalWorld(this.makeBaseWorld(stage, stage.world));
        base.getPhysicalWorld().setResponse(this.makePhysicalResponse());
        base.setFactory(this.makeEntityFactory(stage));
        let layerIndex = 0;
        // make tile
        for (const layer of stage.layers) {
            for (const chip of layer) {
                if (chip.z === undefined) {
                    chip.z = layerIndex;
                }
                base.addEntityByID(chip.id, chip);
            }
            layerIndex += 1;
        }
        // make entity
        for (const entity of stage.deploy) {
            if (entity.z === undefined) {
                entity.z = layerIndex;
            }
            base.addEntityByID(entity.id, entity);
        }
        return base;
    }
}
/**
 * Tile builder
 * - Generates entity from json data
 * - ### Generate tile from json data
 * @extends {EntityBuilder}
 * @classdesc Tile builder to generate tile from json data
 */
class TileBuilder extends EntityBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Make image
     * @protected
     * @param {JSON} image Entity information json data
     * @return {GameImage} Image
     */
    makeImage(image) {
        return this.imageBuilder.build(`tile`, image);
    }

    /**
     * Try to replace deploy data
     * @protected
     * @param {JSON} deploy Deploy json data
     * @param {JSON} json Information json data
     * @param {JSON} data Data name
     * @return {JSON} Replaced JSON data
     */
    tryReplace(deploy, json, data) {
        return (deploy === undefined || deploy[data] === undefined) ? json[data] : deploy[data];
    }

    /**
     * Make collider
     * @protected
     * @param {JSON} collider Collider information json data
     * @return {Collider} Collider
     */
    makeCollider(collider) {
        switch (collider.type) {
            case `Rectangle`:
                return new RectangleCollider(collider.startX, collider.startY, collider.width, collider.height);
            case `Circle`:
                return new CircleCollider(ret.radius, ret.shiftX, ret.shiftY);
            case `RoundRectangle`:
                return new RoundRectangleCollider(collider.startX, collider.startY, collider.width, collider.height, collider.cut);
            default:
                return null;
        }
    }

    /**
     * Make AABB
     * @protected
     * @param {JSON} collider Collider information json data
     * @return {AABB} AABB
     */
    makeAABB(collider) {
        if (collider.directional) {
            return new DirectionalAABB();
        } else {
            return new SimpleAABB();
        }
    }

    /**
     * Make material
     * @protected
     * @param {JSON} material Material information json data
     * @return {Material} Material
     */
    makeMaterial(material) {
        if (material !== undefined) {
            return new ImmutableMaterial(material.mass, material.elasticity, material.mu);
        }
        return null;
    }

    /**
     * Make underlying tile object
     * @protected
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} tile Tile information json data
     * @return {Entity} Underlying tile object
     */
    makeTileBase(deploy, tile) {
        switch (tile.type) {
            case `image`:
                return new OnlyImageEntity();
            case undefined:
                return new TileObject();
            default:
                return null;
        }
    }

    /**
     * Build base data from json data
     * @param {Entity} base Base entity
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} json Character json data
     */
    buildBase(base, deploy, json) {
        if (deploy !== undefined) {
            base.setPosition(deploy.x, deploy.y, deploy.z);
        }
        base.setSize(this.tryReplace(deploy, json, `width`), this.tryReplace(deploy, json, `height`));
    }

    /**
     * Build image data from json data
     * @param {ImagedEntity} base Base entity
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} json Character json data
     */
    buildImage(base, deploy, json) {
        const image = this.tryReplace(deploy, json, `image`);
        if (image !== undefined) {
            base.setImage(this.makeImage(image));
        }
    }

    /**
     * Build physical parameter from json data
     * @protected
     * @param {InfluentialEntity} base Base entity
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} json Character json data
     */
    buildPhysical(base, deploy, json) {
        const colliderData = this.tryReplace(deploy, json, `collider`);
        const materialData = this.tryReplace(deploy, json, `material`);
        // set collider
        if (colliderData !== undefined) {
            const collider = this.makeCollider(colliderData);
            if (collider !== null) {
                collider.enable = colliderData.enable === undefined ? true : colliderData.enable;
                collider.response = colliderData.response === undefined ? true : colliderData.response;
                collider.setAABB(this.makeAABB(colliderData));
            }
            base.setCollider(collider);
            // set material
            base.setMaterial(this.makeMaterial(materialData));
        }
    }

    /**
     * Build tile from json data
     * @override
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} json tile json data
     * @return {Entity} Generated tile
     */
    build(deploy, json) {
        const base = this.makeTileBase(deploy, json);
        this.buildBase(base, deploy, json);
        if (base instanceof ImagedEntity) {
            this.buildImage(base, deploy, json);
        }
        if (base instanceof InfluentialEntity) {
            this.buildPhysical(base, deploy, json);
        }
        return base;
    }
}
/**
 * Joint interface
 * - ### It can joint to something
 * @interface
 * @classdesc Joint interface that can joint to something
 */
class IJoint extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Joint to something
     * @abstract
     * @param {Entity} jointed Jointed entity
     * @param {number} jointedX Jointed x position
     * @param {number} jointedY Jointed y position
     * @param {number} length Jointed length
     */
    joint(jointed, jointedX, jointedY, length) {}

    /**
     * Unjoint
     * @abstract
     */
    unjoint() {}
}
/**
 * Immutable rigid material
 * - Manages physical quantity
 * - ### Manages it as immutable information excluded velocity and acceleration
 * @extends {RigidMaterial}
 * @classdesc Immutable rigid material to manage as immutable information exclueded velocity and acceleration
 */
class ImmutableRigidMaterial extends RigidMaterial { // eslint-disable-line  no-unused-vars
    /**
     * Immutable rigid material constructor
     * @constructor
     * @param {number} [k = 0.5] Coefficient of air resistance
     * @param {number} [frictionX = 1] Coefficient of x friction coefficient
     * @param {number} [frictionY = 0] Coefficient of y friction coefficient
     * @param {number} [g = 1] Gravity scale
     */
    constructor(k = 0.5, frictionX = 1, frictionY = 0, g = 1) {
        super();
        /**
         * Coefficient of air resistance
         * @protected
         * @type {number}
         */
        this.kVal = k;
        /**
         * Coefficient of x friction coefficient
         * @protected
         * @type {number}
         */
        this.frictionXVal = frictionX;
        /**
         * Coefficient of y friction coefficient
         * @protected
         * @type {number}
         */
        this.frictionYVal = frictionY;

        /**
         * Gravity scale
         * @protected
         * @type {number}
         */
        this.gVal = g;
    }

    /**
     * Get coefficient of air resistance
     * @override
     * @return {number} Coefficient of air resistance
     */
    get k() {
        return this.kVal;
    }

    /**
     * Get coefficient of x friction coefficient
     * @override
     * @return {number} Coefficient of x friction coefficient
     */
    get frictionX() {
        return this.frictionXVal;
    }

    /**
     * Get coefficient of y friction coefficient
     * @override
     * @return {number} Coefficient of y friction coefficient
     */
    get frictionY() {
        return this.frictionYVal;
    }

    /**
     * Get gravity scale
     * @abstract
     * @return {number} Gravity scale
     */
    get gravityScale() {
        return this.gVal;
    }
}
/**
 * Max adopt body
 * - Update entity by physical quantity
 * - ### Adopt the maximum for adding to the next speed
 * @extends {RigidBody}
 * @classdesc Max adopt body to adopt the maximum for adding to the next speed
 */
class MaxAdoptBody extends RigidBody { // eslint-disable-line  no-unused-vars
    /**
     * Max adopt body constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Internal current x acceleration
         * @protected
         * @type {number}
         */
        this.internalAccelerationX = 0;
        /**
         * Internal current y acceleration
         * @protected
         * @type {number}
         */
        this.internalAccelerationY = 0;

        /**
         * Positive x velocity vector to be added nextly
         * @protected
         * @type {number}
         */
        this.vpx = 0;
        /**
         * Positive y velocity vector to be added nextly
         * @protected
         * @type {number}
         */
        this.vpy = 0;
        /**
         * Negative x velocity vector to be added nextly
         * @protected
         * @type {number}
         */
        this.vmx = 0;
        /**
         * Negative y velocity vector to be added nextly
         * @protected
         * @type {number}
         */
        this.vmy = 0;

        /**
         * Previous x position
         * @protected
         * @type {number}
         */
        this.preX = 0;
        /**
         * Previous y position
         * @protected
         * @type {number}
         */
        this.preY = 0;
    }

    /**
     * Set the value added to the next speed vector
     * @override
     * @param {number} vx X component of the velocity vector to be added
     * @param {number} vy Y component of the velocity vector to be added
     */
    setNextAddVelocity(vx, vy) {
        if (vx > 0) {
            this.vpx = Math.max(this.vpx, vx);
        } else {
            this.vmx = Math.min(this.vmx, vx);
        }
        if (vy > 0) {
            this.vpy = Math.max(this.vpy, vy);
        } else {
            this.vmy = Math.min(this.vmy, vy);
        }
    }

    /**
     * Reset rigid body state
     * @override
     */
    reset() {
        super.reset();
        this.internalVelocityX = 0;
        this.internalVelocityY = 0;
        this.internalAccelerationX = 0;
        this.internalAccelerationY = 0;
        this.vpx = 0;
        this.vpy = 0;
        this.vmx = 0;
        this.vmy = 0;
    }

    /**
     * Apply force to objects
     * @override
     * @param {number} forceX Force in x direction
     * @param {number} forceY Force in y direction
     */
    enforce(forceX, forceY) {
        this.internalAccelerationX += forceX / this.entity.material.mass;
        this.internalAccelerationY += forceY / this.entity.material.mass;
    }

    /**
     * Update rigid body information
     * @override
     * @protected
     */
    updateInfo(dt) {
        // set previous posiiton
        this.diffX = (this.entity.x - this.preX) * 1000 / dt;
        this.diffY = (this.entity.y - this.preY) * 1000 / dt;
        this.isFixX = Math.abs(this.diffX) < 25;
        this.isFixY = Math.abs(this.diffY) < 50;
        this.preX = this.entity.x;
        this.preY = this.entity.y;
    }

    /**
     * Update velocity
     * @override
     * @protected
     */
    updateVelocity(dt) {
        // next add velocity
        this.material.velocityX += this.vpx + this.vmx;
        this.material.velocityY += this.vpy + this.vmy;
        // enforce
        this.material.velocityX += this.internalAccelerationX * dt / 1000;
        this.material.velocityY += this.internalAccelerationY * dt / 1000;
        // air resistance
        const kx = -this.material.velocityX * this.material.k / this.entity.material.mass * dt / 1000;
        const ky = -this.material.velocityY * this.material.k / this.entity.material.mass * dt / 1000;
        if (Math.abs(this.material.velocityX) < Math.abs(kx)) {
            this.material.velocityX = 0;
        } else {
            this.material.velocityX += kx;
        }
        if (Math.abs(this.material.velocityY) < Math.abs(ky)) {
            this.material.velocityY = 0;
        } else {
            this.material.velocityY += ky;
        }
    }

    /**
     * Update entity by velocity
     * @override
     * @protected
     */
    updateEntity(dt) {
        // move
        const dx = this.material.velocityX * dt / 1000;
        const dy = this.material.velocityY * dt / 1000;
        this.entity.deltaMove(dx, dy);
    }

    /**
     * Cleanup body information
     * @override
     * @param {nuumber} dt Delta time
     */
    cleanup(dt) {
        this.material.accelerationX = this.internalAccelerationX;
        this.material.accelerationY = this.internalAccelerationY;
        this.internalAccelerationX = 0;
        this.internalAccelerationY = 0;
        this.vpx = 0;
        this.vpy = 0;
        this.vmx = 0;
        this.vmy = 0;
    }
}
/**
 * Mutable rigid material
 * - Manages physical quantity
 * - Manages it as immutable information excluded velocity and acceleration
 * - ### Manaes it as mutable
 * @extends {ImmutableRigidMaterial}
 * @classdesc Mutable rigid material to manage as mutable
 */
class MutableRigidMaterial extends ImmutableRigidMaterial { // eslint-disable-line  no-unused-vars
    /**
     * Get coefficient of air resistance
     * @override
     * @return {number} Coefficient of air resistance
     */
    get k() {
        return this.kVal;
    }

    /**
     * Get coefficient of x friction coefficient
     * @override
     * @return {number} Coefficient of x friction coefficient
     */
    get frictionX() {
        return this.frictionXVal;
    }

    /**
     * Get coefficient of y friction coefficient
     * @override
     * @return {number} Coefficient of y friction coefficient
     */
    get frictionY() {
        return this.frictionYVal;
    }

    /**
     * Get gravity scale
     * @abstract
     * @return {number} Gravity scale
     */
    get gravityScale() {
        return this.gVal;
    }

    /**
     * Set coefficient of air resistance
     * @override
     * @param {number} val Coefficient of air resistance
     */
    set k(val) {
        this.kVal = val;
    }

    /**
     * Set coefficient of x friction coefficient
     * @override
     * @param {number} val Coefficient of x friction coefficient
     */
    set frictionX(val) {
        this.frictionXVal = val;
    }

    /**
     * Set coefficient of y friction coefficient
     * @override
     * @param {number} val Coefficient of y friction coefficient
     */
    set frictionY(val) {
        this.frictionYVal = val;
    }

    /**
     * Set gravity scale
     * @override
     * @param {number} val Gravity scale
     */
    set gravityScale(val) {
        this.gVal = val;
    }
}
/**
 * Player body
 * - Update entity by physical quantity
 * - Adopt the maximum for adding to the next speed
 * - ### Implements player unique function
 * @extends {MaxAdoptBody}
 * @classdesc Player body to implement player unique function
 */
class PlayerBody extends MaxAdoptBody { // eslint-disable-line  no-unused-vars
}
/**
 * Precise body
 * - Update entity by physical quantity
 * - Adopt the maximum for adding to the next speed
 * - ### Confirm collision every time you move
 * @extends {MaxAdoptBody}
 * @classdesc Precise Body to confirm collision every time you move
 */
class PreciseBody extends MaxAdoptBody { // eslint-disable-line  no-unused-vars
    /**
     * Update entity by velocity
     * @override
     * @protected
     */
    updateEntity(dt) {
        // move
        let dx = this.velocityX * dt / 1000;
        let dy = this.velocityY * dt / 1000;
        const max = Math.floor(Math.max(Math.abs(dx), Math.abs(dy)));
        // move slightly
        if (max === 0) {
            this.entity.deltaMove(dx, dy);
            return;
        }
        for (let i = 0; i < max; ++i) {
            this.entity.deltaMove(dx / max, dy / max);
            for (const it of this.entity.stage.getPhysicalWorld().getCollisionData(this.entity.collider)) {
                if (it.colliding.collider.isResponse(it.collided.collider) && it.collided.collider.isResponse(it.colliding.collider)) {
                    if (it.nx * dx > 0) {
                        dx = 0;
                    }
                    if (it.ny * dy > 0) {
                        dy = 0;
                    }
                }
            }
            if (dx === 0 && dy === 0) {
                break;
            }
        }
    }
}
/**
 * Circle collider
 * - Store collider data for judgeing collision
 * - ### Makes a collision judgment considered to be circular
 * @extends {Collider}
 * @classdesc Circle collider to make a collision judgment considered to be circular
 */
class CircleCollider extends Collider { // eslint-disable-line  no-unused-vars
    /**
     * Circle collider constructor
     * @constructor
     * @param {number} radius Circle radius
     * @param {number} [shiftX = 0] Horizontal distance to shift from center
     * @param {number} [shiftY = 0] Vertical distance to shift from center
     */
    constructor(radius, shiftX = 0, shiftY = 0) {
        super();
        /**
         * Circle radius
         * @protected
         * @type {number}
         */
        this.radius = radius;

        /**
         * Horizontal distance to shift from center
         * @protected
         * @type {number}
         */
        this.shiftX = shiftX;
        /**
         * Vertical distance to shift from center
         * @protected
         * @type {number}
         */
        this.shiftY = shiftY;

        /**
         * Center x position calculated by update
         * @protected
         * @type {number}
         */
        this.centerX = 0;

        /**
         * Center y position calculated by update
         * @protected
         * @type {number}
         */
        this.centerY = 0;

        // calculate initial value
        this.update();
    }

    /**
     * Judge whether position is in collider
     * @override
     * @param {number} x X position
     * @param {number} y Y position
     * @return {boolean} whether position is in collider
     */
    isInCollider(x, y) {
        const sx = this.centerX - x;
        const sy = this.centerY - y;
        return sx * sx + sy * sy <= this.radius * this.radius;
    }

    /**
     * Judge whether collision
     * @override
     * @param {Colllder} collider Target collider
     * @param {CollisionData} [data=null] Pointer to save conflict information
     * @return {boolean} whether collision
     */
    isCollision(collider, data = null) {
        if (collider instanceof CircleCollider) {
            let nx = collider.centerX - this.centerX;
            let ny = collider.centerY - this.centerY;
            const r = this.radius + collider.radius;
            if (nx * nx + ny * ny < r * r) {
                if (data !== null) {
                    let me = this.entity;
                    let you = collider.entity;
                    const nlen = Math.sqrt(nx * nx + ny * ny);
                    nx = nx / nlen;
                    ny = ny / nlen;
                    const px = this.centerX + this.radius * nx;
                    const py = this.centerY + this.radius * ny;
                    const depth = r - nlen;
                    if (me instanceof MutableEntity && me.body.velocityX * nx + me.body.velocityY * ny > 0) {} else if (you instanceof MutableEntity && you.body.velocityX * nx + you.body.velocityY * ny < 0) {
                        const swap = me;
                        me = you;
                        you = swap;
                        nx = -nx;
                        ny = -ny;
                    } else if (!me instanceof MutableEntity || !you instanceof InfluentialEntity) {
                        console.log(`Error: Colliding entity should be mutable and collided entity should be influential`);
                    }
                    data.register(me, you, nx, ny, px, py, depth);
                }
                return true;
            }
        } else if (collider instanceof RectangleCollider) {
            // TODO: Should implement
        }
        return false;
    }

    /**
     * Fix collider bounds
     * @override
     * @param {number} startX Relative x coordinate of the upper left
     * @param {number} startY Relative y coordinate of the upper left
     * @param {number} endX Relative x coordinate of the lower right
     * @param {number} endY Relative y coordinate of the lower right
     */
    fixBound(startX, startY, endX, endY) {
        this.shiftX = startX;
        this.shiftY = startY;
        this.radius = Math.max(endX - startX, endY - startY) / 2;
        this.update();
    }

    /**
     * Update collide information
     * Called whenever coordinate information is updated
     * @override
     */
    update() {
        // AABB
        this.aabb.update(this.shiftX, this.shiftY, this.radius * 2 + this.shiftX, this.radius * 2 + this.shiftY, this.entity);
        // Center position
        this.centerX = this.entity.x + this.radius + this.shiftX;
        this.centerY = this.entity.y + this.radius + this.shiftY;
    }

    /**
     * Render collider for debug
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX, shiftY) {
        ctx.strokeCircle(this.centerX + shiftX, this.centerY + shiftY, this.radius, 0, 2 * Math.PI, false);
        // collision
        let me = 0;
        let you = 0;
        for (const it of this.collisions) {
            if (it.colliding === this.entity) {
                me += 1;
            } else {
                you += 1;
            }
        }
        if (me !== 0 || you !== 0) {
            ctx.fillText(me + ``, this.aabb.startX + shiftX + 15, this.aabb.startY + shiftY, 0.0, 0.0, 15, `blue`);
            ctx.fillText(you + ``, this.aabb.startX + shiftX, this.aabb.startY + shiftY + 15, 0.0, 0.0, 15, `red`);
        }
        // vector
        for (const it of this.collisions) {
            if (it.e2 === this.entity) {
                continue;
            }
            ctx.strokeLine(
                this.aabb.startX + shiftX + (this.endX - this.startX) / 2,
                this.aabb.startY + shiftY + (this.endY - this.startY) / 2,
                this.aabb.startX + shiftX + (this.endX - this.startX) / 2 + it.nx * 30 * (it.colliding === this.entity ? 1 : -1),
                this.aabb.startY + shiftY + (this.endY - this.startY) / 2 + it.ny * 30 * (it.colliding === this.entity ? 1 : -1),
                `red`);
        }
    }
}
/**
 * Lower priority data
 * - Data obtained by collision detection
 * - ### Prioritizes what collision point is below
 * @classdesc Lower priority data to prioritize what collision point is below
 */
class LowerPriorityData extends CollisionData { // eslint-disable-line  no-unused-vars
    /**
     * Lower priority constructor
     * @constructor
     */
    constructor() {
        super(null, null, 0, 0, 0, 0, 0);
    }

    /**
     * Initialize collision data
     * @override
     */
    init() {
        super.init();
        this.py = -1000000000;
    }

    /**
     * Calculate descending priority
     * @override
     * @protected
     * @return {number} Priority
     */
    calcPriority() {
        return this.py;
    }
}
/**
 * Rectangle collider
 * - Store collider data for judgeing collision
 * - ### Makes a collision judgment considered to be rectangle
 * @extends {Collider}
 * @classdesc Rectangle collider to make a collision judgment considered to be rectangle
 */
class RectangleCollider extends Collider { // eslint-disable-line  no-unused-vars
    /**
     * Rectangle collider constructor
     * @constructor
     * @param {number} startX X coordinate of upper left corner of rectangle
     * @param {number} startY Y coordinate of upper left corner of rectangle
     * @param {number} width Width of rectangle
     * @param {number} height Height of rectangle
     */
    constructor(startX, startY, width, height) {
        super();

        /**
         * X coordinate of upper left corner of rectangle
         * @protected
         * @type {number}
         */
        this.startX = startX;
        /**
         * Y coordinate of upper left corner of rectangle
         * @protected
         * @type {number}
         */
        this.startY = startY;
        /**
         * X coordinate of lower right corner of the rectangle
         * @protected
         * @type {number}
         */
        this.endX = startX + width;
        /**
         * Y coordinate of lower right corner of the rectangle
         * @protected
         * @type {number}
         */
        this.endY = startY + height;
    }

    /**
     * Judge whether position is in collider
     * @override
     * @param {number} x X position
     * @param {number} y Y position
     * @return {boolean} whether position is in collider
     */
    isInCollider(x, y) {
        return this.aabb.startX < x && x < this.aabb.endX && this.aabb.startY < y && y < this.aabb.endY;
    }

    /**
     * Judge whether collision
     * @override
     * @param {Colllder} collider Target collider
     * @param {CollisionData} [data=null] Pointer to save conflict information
     * @return {boolean} whether collision
     */
    isCollision(collider, data = null) {
        if (collider instanceof RoundRectangleCollider) {
            return collider.isCollision(this, data);
        } else if (collider instanceof RectangleCollider) {
            const sx = this.aabb.endX - collider.aabb.startX;
            const ex = this.aabb.startX - collider.aabb.endX;
            const sy = this.aabb.endY - collider.aabb.startY;
            const ey = this.aabb.startY - collider.aabb.endY;
            if (0 < sx && ex < 0 && 0 < sy && ey < 0) {
                if (data !== null) {
                    let me = this.entity;
                    let you = collider.entity;
                    let nx = Math.abs(sx) < Math.abs(ex) ? sx : ex;
                    let ny = Math.abs(sy) < Math.abs(ey) ? sy : ey;
                    let depth = 0;
                    if (me instanceof MutableEntity && me.body.velocityX * nx + me.body.velocityY * ny > 0) {} else if (you instanceof MutableEntity && you.body.velocityX * nx + you.body.velocityY * ny < 0) {
                        const swap = me;
                        me = you;
                        you = swap;
                        nx = -nx;
                        ny = -ny;
                    } else if (!me instanceof MutableEntity || !you instanceof InfluentialEntity) {
                        console.log(`Error: Colliding entity should be mutable and collided entity should be influential`);
                    }
                    if (me instanceof MutableEntity && Math.abs(Math.abs(nx) - Math.abs(ny)) < 1) {
                        if (me.body.velocityX * nx <= 0) {
                            nx = Math.abs(ny) + 1;
                        }
                        if (me.body.velocityY * ny <= 0) {
                            ny = Math.abs(nx) + 1;
                        }
                    }
                    if (Math.abs(nx) < Math.abs(ny)) {
                        depth = Math.abs(nx);
                        nx = Math.sign(nx);
                        ny = 0;
                    } else {
                        depth = Math.abs(ny);
                        nx = 0;
                        ny = Math.sign(ny);
                    }
                    const px = me.x + nx * depth;
                    const py = me.y + ny * depth;
                    data.register(me, you, nx, ny, px, py, depth);
                }
                return true;
            }
        } else if (collider instanceof CircleCollider) {
            // TODO: Should implement
        }
        return false;
    }

    /**
     * Fix collider bounds
     * @override
     * @param {number} startX Relative x coordinate of the upper left
     * @param {number} startY Relative y coordinate of the upper left
     * @param {number} endX Relative x coordinate of the lower right
     * @param {number} endY Relative y coordinate of the lower right
     */
    fixBound(startX, startY, endX, endY) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.update();
    }

    /**
     * Update collide information
     * Called whenever coordinate information is updated
     * @override
     */
    update() {
        // AABB
        this.aabb.update(this.startX, this.startY, this.endX, this.endY, this.entity);
    }

    /**
     * Render collider for debug
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX, shiftY) {
        // rect
        ctx.strokeRect(this.aabb.startX + shiftX, this.aabb.startY + shiftY, this.endX - this.startX, this.endY - this.startY);
        // collision
        let me = 0;
        let you = 0;
        for (const it of this.collisions) {
            if (it.colliding === this.entity) {
                me += 1;
            } else {
                you += 1;
            }
        }
        if (me !== 0 || you !== 0) {
            ctx.fillText(me + ``, this.aabb.startX + shiftX + 15, this.aabb.startY + shiftY, 0.0, 0.0, 15, `blue`);
            ctx.fillText(you + ``, this.aabb.startX + shiftX, this.aabb.startY + shiftY + 15, 0.0, 0.0, 15, `red`);
        }
        // vector
        for (const it of this.collisions) {
            if (it.collided === this.entity) {
                continue;
            }
            ctx.strokeLine(
                this.aabb.startX + shiftX + (this.endX - this.startX) / 2,
                this.aabb.startY + shiftY + (this.endY - this.startY) / 2,
                this.aabb.startX + shiftX + (this.endX - this.startX) / 2 + it.nx * 30 * (it.colliding === this.entity ? 1 : -1),
                this.aabb.startY + shiftY + (this.endY - this.startY) / 2 + it.ny * 30 * (it.colliding === this.entity ? 1 : -1),
                `red`);
        }
    }
}
/**
 * Round rectangle collider
 * - Store collider data for judgeing collision
 * - Makes a collision judgment considered to be rectangle
 * - ### Makes a collision judgment considered to be rectangle taken a horn
 * @extends {Collider}
 * @classdesc Round rectangle collider to make a collision judgment considered to be rectangle taken a horn
 */
class RoundRectangleCollider extends RectangleCollider { // eslint-disable-line  no-unused-vars
    /**
     * Rectangle collider constructor
     * @constructor
     * @param {number} startX X coordinate of upper left corner of rectangle
     * @param {number} startY Y coordinate of upper left corner of rectangle
     * @param {number} width Width of rectangle
     * @param {number} height Height of rectangle
     * @param {number} cut Amount of taken horn
     */
    constructor(startX, startY, width, height, cut) {
        super(startX, startY, width, height);
        /**
         * Amount of taken horn
         * @protected
         * @type {number}
         */
        this.cut = cut;
    }

    /**
     * Judge whether collision
     * @override
     * @param {Colllder} collider Target collider
     * @param {CollisionData} [data=null] Pointer to save conflict information
     * @return {boolean} whether collision
     */
    isCollision(collider, data = null) {
        if (collider instanceof RoundRectangleCollider) {
            const cutX = this.cut;
            const cutY = this.cut;
            // In the meantime, the opponent is regarded as a rectangle
            const cutCX = 0;
            const cutCY = 0;
            let nx = 0;
            let ny = 0;
            let d = Number.MAX_SAFE_INTEGER;
            let collided = false;


            let sx = this.aabb.endX - cutX - collider.aabb.startX - cutCX;
            let ex = this.aabb.startX + cutX - collider.aabb.endX + cutCX;
            let sy = this.aabb.endY - collider.aabb.startY;
            let ey = this.aabb.startY - collider.aabb.endY;
            let len = Math.abs(sy) < Math.abs(ey) ? sy : ey;
            if (0 < sx && ex < 0 && 0 < sy && ey < 0) {
                d = Math.abs(len);
                nx = 0;
                ny = Math.sign(len);
                collided = true;
            }

            sx = this.aabb.endX - cutX - collider.aabb.startX;
            ex = this.aabb.startX + cutX - collider.aabb.endX;
            sy = this.aabb.endY - collider.aabb.startY - cutCY;
            ey = this.aabb.startY - collider.aabb.endY + cutCY;
            len = Math.abs(sx) < Math.abs(ex) ? sx : ex;
            if (0 < sx && ex < 0 && 0 < sy && ey < 0 && Math.abs(len) < d) {
                d = Math.abs(len);
                nx = Math.sign(len);
                ny = 0;
                collided = true;
            }

            sx = this.aabb.endX - collider.aabb.startX - cutCX;
            ex = this.aabb.startX - collider.aabb.endX + cutCX;
            sy = this.aabb.endY - cutY - collider.aabb.startY;
            ey = this.aabb.startY + cutY - collider.aabb.endY;
            len = Math.abs(sx) < Math.abs(ex) ? sx : ex;
            if (0 < sx && ex < 0 && 0 < sy && ey < 0 && Math.abs(len) < d) {
                d = Math.abs(len);
                nx = Math.sign(len);
                ny = 0;
                collided = true;
            }

            sx = this.aabb.endX - collider.aabb.startX;
            ex = this.aabb.startX - collider.aabb.endX;
            sy = this.aabb.endY - cutY - collider.aabb.startY - cutCY;
            ey = this.aabb.startY + cutY - collider.aabb.endY + cutCY;
            len = Math.abs(sx) < Math.abs(ex) ? sx : ex;
            if (0 < sx && ex < 0 && 0 < sy && ey < 0 && Math.abs(len) < d) {
                d = Math.abs(len);
                nx = Math.sign(len);
                ny = 0;
                collided = true;
            }

            if (collided) {
                if (data !== null) {
                    let me = this.entity;
                    let you = collider.entity;
                    if (me instanceof MutableEntity && me.body.velocityX * nx + me.body.velocityY * ny > 0) {} else if (you instanceof MutableEntity && you.body.velocityX * nx + you.body.velocityY * ny < 0) {
                        const swap = me;
                        me = you;
                        you = swap;
                        nx = -nx;
                        ny = -ny;
                    } else if (!me instanceof MutableEntity || !you instanceof InfluentialEntity) {
                        console.log(`Error: Colliding entity should be mutable`);
                    }
                    const px = me.x + nx * d;
                    const py = me.y + ny * d;
                    data.register(me, you, nx, ny, px, py, d);
                }
                return true;
            }
        } else if (collider instanceof RectangleCollider) {
            const cutX = this.cut;
            const cutY = this.cut;
            let nx = 0;
            let ny = 0;
            let d = Number.MAX_SAFE_INTEGER;
            let collided = false;

            let sx = this.aabb.endX - cutX - collider.aabb.startX;
            let ex = this.aabb.startX + cutX - collider.aabb.endX;
            let sy = this.aabb.endY - collider.aabb.startY;
            let ey = this.aabb.startY - collider.aabb.endY;
            let len = Math.abs(sy) < Math.abs(ey) ? sy : ey;
            if (0 < sx && ex < 0 && 0 < sy && ey < 0) {
                d = Math.abs(len);
                nx = 0;
                ny = Math.sign(len);
                collided = true;
            }

            sx = this.aabb.endX - collider.aabb.startX;
            ex = this.aabb.startX - collider.aabb.endX;
            sy = this.aabb.endY - cutY - collider.aabb.startY;
            ey = this.aabb.startY + cutY - collider.aabb.endY;
            len = Math.abs(sx) < Math.abs(ex) ? sx : ex;
            if (0 < sx && ex < 0 && 0 < sy && ey < 0 && Math.abs(len) < d) {
                d = Math.abs(len);
                nx = Math.sign(len);
                ny = 0;
                collided = true;
            }

            if (collided) {
                if (data !== null) {
                    let me = this.entity;
                    let you = collider.entity;
                    if (me instanceof MutableEntity && me.body.velocityX * nx + me.body.velocityY * ny > 0) {} else if (you instanceof MutableEntity && you.body.velocityX * nx + you.body.velocityY * ny < 0) {
                        const swap = me;
                        me = you;
                        you = swap;
                        nx = -nx;
                        ny = -ny;
                    } else if (!me instanceof MutableEntity || !you instanceof InfluentialEntity) {
                        console.log(`Error: Colliding entity should be mutable and collided entity should be influential`);
                    }
                    const px = me.x + nx * d;
                    const py = me.y + ny * d;
                    data.register(me, you, nx, ny, px, py, d);
                }
                return true;
            }
        } else if (collider instanceof CircleCollider) {
            // TODO: Should implement
        }
        return false;
    }

    /**
     * Render collider for debug
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX, shiftY) {
        // rect
        ctx.strokeLine(this.aabb.startX + this.cut + shiftX, this.aabb.startY + shiftY, this.aabb.endX - this.cut + shiftX, this.aabb.startY + shiftY);
        ctx.strokeLine(this.aabb.startX + shiftX, this.aabb.startY + this.cut + shiftY, this.aabb.startX + shiftX, this.aabb.endY - this.cut + shiftY);
        ctx.strokeLine(this.aabb.endX + shiftX, this.aabb.startY + this.cut + shiftY, this.aabb.endX + shiftX, this.aabb.endY - this.cut + shiftY);
        ctx.strokeLine(this.aabb.startX + this.cut + shiftX, this.aabb.endY + shiftY, this.aabb.endX - this.cut + shiftX, this.aabb.endY + shiftY);

        // collision
        let me = 0;
        let you = 0;
        for (const it of this.collisions) {
            if (it.colliding === this.entity) {
                me += 1;
            } else {
                you += 1;
            }
        }
        if (me !== 0 || you !== 0) {
            ctx.fillText(me + ``, this.aabb.startX + shiftX + 15, this.aabb.startY + shiftY, 0.0, 0.0, 15, `blue`);
            ctx.fillText(you + ``, this.aabb.startX + shiftX, this.aabb.startY + shiftY + 15, 0.0, 0.0, 15, `red`);
        }
        // vector
        for (const it of this.collisions) {
            if (it.collided === this.entity) {
                continue;
            }
            ctx.strokeLine(
                this.aabb.startX + shiftX + (this.endX - this.startX) / 2,
                this.aabb.startY + shiftY + (this.endY - this.startY) / 2,
                this.aabb.startX + shiftX + (this.endX - this.startX) / 2 + it.nx * 30 * (it.colliding === this.entity ? 1 : -1),
                this.aabb.startY + shiftY + (this.endY - this.startY) / 2 + it.ny * 30 * (it.colliding === this.entity ? 1 : -1),
                `red`);
        }
    }
}
/**
 * Axis Aligned Bounding Box
 * - Uses for rough collision determination
 * - ### Decides from 4 vertices
 * @extends {AABB}
 * @classdesc Simple Axis Aligned Bounding Box to decide from 4 vertices
 */
class SimpleAABB extends AABB { // eslint-disable-line  no-unused-vars
    /**
     * AABB Constructor
     * @constructor
     * @param {number} [startX = 0] X coordinate of the upper left
     * @param {number} [startY = 0] Y coordinate of the upper left
     * @param {number} [endX = 0] X coordinate of the lower right
     * @param {number} [endY = 0] Y coordinate of the lower right
     */
    constructor(startX = 0, startY = 0, endX = 0, endY = 0) {
        super();

        /**
         * X coordinate of the upper left
         * @type {number}
         */
        this.startXVal = startX;
        /**
         * Y coordinate of the upper left
         * @type {number}
         */
        this.startYVal = startY;
        /**
         * X coordinate of the lower right
         * @type {number}
         */
        this.endXVal = endX;
        /**
         * Y coordinate of the lower right
         * @type {number}
         */
        this.endYVal = endY;
    }

    /**
     * Get start x position
     * @override
     * @return {number} Start x position
     */
    get startX() {
        return this.startXVal;
    }

    /**
     * Get start y position
     * @override
     * @return {number} Start y position
     */
    get startY() {
        return this.startYVal;
    }

    /**
     * Get end x position
     * @override
     * @return {number} End x position
     */
    get endX() {
        return this.endXVal;
    }

    /**
     * Get end y position
     * @override
     * @return {number} End y position
     */
    get endY() {
        return this.endYVal;
    }

    /**
     * Update AABB
     * @override
     * @param {number} startX Relative x coordinate of the upper left
     * @param {number} startY Relative y coordinate of the upper left
     * @param {number} endX Relative x coordinate of the lower right
     * @param {number} endY Relative y coordinate of the lower right
     * @param {InfluentialEntity} entity Entity attaced it
     */
    update(startX, startY, endX, endY, entity) {
        this.startXVal = entity.x + startX;
        this.startYVal = entity.y + startY;
        this.endXVal = entity.x + endX;
        this.endYVal = entity.y + endY;
    }
}
/**
 * Impulse based collision response
 * Performs collision response by impulse based method
 * @extends {CollisionResponse}
 * @classdesc Collision response to performs collision response by impulse based method
 */
class ImpulseBasedResponse extends CollisionResponse { // eslint-disable-line  no-unused-vars
    /**
     * Perform collision response
     * @param {CollisionData} data Collision data
     * @param {number} dt delta time
     */
    collisionResponse(data, dt) {
        const nx = data.nx;
        const ny = data.ny;
        const d = data.depth * 600;
        const e1 = data.colliding;
        const e2 = data.collided;
        const b1 = e1.body;
        if (e2 instanceof MutableEntity) {
            const b2 = e2.body;
            const dot1 = b1.velocityX * nx + b1.velocityY * ny;
            const dot2 = b2.velocityX * nx + b2.velocityY * ny;
            const v1x = dot1 * nx;
            const v1y = dot1 * ny;
            const v2x = dot2 * nx;
            const v2y = dot2 * ny;
            const vdx = v2x - v1x;
            const vdy = v2y - v1y;
            const m1 = e1.material.mass;
            const m2 = e2.material.mass;
            const e = Math.max(e1.material.e, e2.material.e);
            const n1 = e1.collider.collisions.length;
            const n2 = e2.collider.collisions.length;
            const j = (1 + e) * m1 * m2 / (m1 + m2) * 1000 / dt;
            const j1 = j / n1;
            const j2 = j / n2;
            const d1 = d / n1;
            const d2 = d / n2;
            b1.enforce(j1 * vdx - d1 * nx, j1 * vdy - d1 * ny);
            b2.enforce(-j2 * vdx + d2 * nx, -j2 * vdy + d2 * ny);
        } else {
            const dot1 = b1.velocityX * nx + b1.velocityY * ny;
            const v1x = dot1 * nx;
            const v1y = dot1 * ny;
            const m1 = e1.material.mass;
            const e = e1.material.e;
            const n1 = e1.collider.collisions.length;
            const j = (1 + e) * m1 * 1000 / -dt / n1;
            const dd = d / n1 * 4;
            b1.enforce(j * v1x - dd * nx, j * v1y - dd * ny);
        }
    }
}
/**
 * Default material
 * - Object information
 * - If the object has a Collider, it must be held
 * - ### Manages it as immutable information
 * @extends {Material}
 * @classdesc Default material to manage it as immutable information
 */
class ImmutableMaterial extends Material { // eslint-disable-line  no-unused-vars
    /**
     * Default material constructor
     * @param {number} mass Entity mass
     * @param {number} elasticity Coefficient of restitution
     * @param {number} mu Coefficient of friction
     */
    constructor(mass = 10, elasticity = 0.1, mu = 0.6) {
        super();

        /**
         * Entity mass
         * @protected
         * @type {number}
         */
        this.massVal = mass;

        /**
         * Coefficient of restitution
         * @protected
         * @type {number}
         */
        this.eVal = elasticity;

        /**
         * Coefficient of friction
         * @protected
         * @type {number}
         */
        this.muVal = mu;
    }

    /**
     * Get mass
     * @override
     * @return {number} Mass
     */
    get mass() {
        return this.massVal;
    }

    /**
     * Get coefficient of restitution
     * @override
     * @return {number} Coefficient of restitution
     */
    get e() {
        return this.eVal;
    }

    /**
     * Get coefficient of restitution
     * @override
     * @return {number} Coefficient of restitution
     */
    get mu() {
        return this.muVal;
    }
}
/**
 * Replusion collision response
 * Performs collision response by replusion
 * @extends {CollisionResponse}
 * @classdesc Collision response to performs collision response by replusion
 */
class RepulsionResponse extends CollisionResponse { // eslint-disable-line  no-unused-vars
    /**
     * Perform collision response
     * @param {CollisionData} data Collision data
     * @param {number} dt delta time
     */
    collisionResponse(data, dt) {
        // set data
        const e1 = data.colliding;
        const e2 = data.collided;
        const b1 = e1.body;
        let b2 = null;
        const nx = data.nx;
        const ny = data.ny;
        const d = data.depth;
        // only push back if not actively colliding
        if (b1.velocityX * nx + b1.velocityY * ny <= 0) {
            if (d < 1.0e-4) {
                return;
            }
            if (e2 instanceof MutableEntity) {
                const nm1 = d / 5;
                const n1x = -nx * nm1;
                const n1y = -ny * nm1;
                const nm2 = d / 100;
                const n2x = nx * nm2;
                const n2y = ny * nm2;
                // push back
                let i = 0;
                while (i++ < 10 && e1.collider.isCollision(e2.collider)) {
                    e1.deltaMove(n1x, n1y);
                    e2.deltaMove(n2x, n2y);
                }
            } else {
                // push back
                let i = 0;
                const n1x = -nx * d / 10;
                const n1y = -ny * d / 10;
                while (i++ < 10 && e1.collider.isCollision(e2.collider)) {
                    e1.deltaMove(n1x, n1y);
                }
            }
            return;
        }

        // replusion calculate
        let vdx1 = 0;
        let vdy1 = 0;
        let vdx2 = 0;
        let vdy2 = 0;
        if (e2 instanceof MutableEntity && (ny < 1 || b1.velocityX * e2.body.velocityX + b1.velocityY * e2.body.velocityY < 0)) {
            b2 = e2.body;
            const dot1 = b1.velocityX * nx + b1.velocityY * ny;
            const dot2 = b2.velocityX * nx + b2.velocityY * ny;
            const v1x = dot1 * nx;
            const v1y = dot1 * ny;
            const v2x = dot2 * nx;
            const v2y = dot2 * ny;
            const v1 = v1x * v1x + v1y * v1y;
            const v2 = v2x * v2x + v2y * v2y;
            // push back
            if (d > 1.0e-4) {
                let i = 0;
                const nm1 = d / 5;
                const n1x = -nx * nm1;
                const n1y = -ny * nm1;
                const nm2 = d / 100;
                const n2x = b2.isFixX ? 0 : nx * nm2;
                const n2y = b2.isFixY ? 0 : ny * nm2;
                while (i++ < 10 && e1.collider.isCollision(e2.collider)) {
                    e1.deltaMove(n1x, n1y);
                    e2.deltaMove(n2x, n2y);
                }
            }
            // check impossible collision
            if (Math.abs(v1) < Math.abs(v2) && dot2 >= 0) {
                return;
            }
            // repulsion
            const e = (e1.material.e + e2.material.e) / 2;
            vdx1 = (v2x - v1x) * (1 + e) * (e2.material.mass) / (e1.material.mass + e2.material.mass);
            vdy1 = (v2y - v1y) * (1 + e) * (e2.material.mass) / (e1.material.mass + e2.material.mass);
            vdx2 = -(v2x - v1x) * (1 + e) * (e1.material.mass) / (e1.material.mass + e2.material.mass);
            vdy2 = -(v2y - v1y) * (1 + e) * (e1.material.mass) / (e1.material.mass + e2.material.mass);
        } else {
            const dot1 = b1.velocityX * nx + b1.velocityY * ny;
            const v1x = dot1 * nx;
            const v1y = dot1 * ny;
            // push back
            if (d > 1.0e-4) {
                let i = 0;
                while (i++ < 10 && e1.collider.isCollision(e2.collider)) {
                    e1.deltaMove(-nx * d / 10, -ny * d / 10);
                }
            }
            // repulsion
            const e = e2.material.e;
            vdx1 = -v1x * (1 + e);
            vdy1 = -v1y * (1 + e);
        }

        // friction
        if (e1.collider.getAABB().startY < e2.collider.getAABB().startY) {
            // e1 on e2
            const mu = e2.material.mu;
            const dotp = b1.accelerationX * nx + b1.accelerationY * ny;
            const px = dotp * nx;
            const py = dotp * ny;
            const p = Math.sqrt(px * px + py * py);
            let dvx = 0;
            let dvy = 0;
            const ovx = (b2 === null || b2.isFixX || b2.diffX * b2.velocityX < 0) ? b1.velocityX : b1.diffX - b2.diffX;
            const ovy = (b2 === null || b2.isFixY || b2.diffY * b2.velocityY < 0) ? b1.velocityY : b1.diffY - b2.diffY;
            const dot = Math.sign(ovx * -ny + ovy * nx);
            dvx = dot * -ny * p * mu * dt / 1000;
            dvy = dot * nx * p * mu * dt / 1000;
            if (ovx === b1.velocityX && Math.abs(dvx) > Math.abs(b1.velocityX)) {
                dvx = b1.velocityX;
            }
            if (ovy === b1.velocityY && Math.abs(dvy) > Math.abs(b1.velocityY)) {
                dvy = b1.velocityY;
            }
            vdx1 -= dvx * b1.material.frictionX;
            // Apply only to down wall
            vdy1 -= dvy < 0 ? 0 : dvy * b1.material.frictionY;
        } else if (b2 !== null) {
            // e2 on e1
            const mu = e1.material.mu;
            const dotp = b2.accelerationX * nx + b2.accelerationY * ny;
            const px = dotp * nx;
            const py = dotp * ny;
            const p = Math.sqrt(px * px + py * py);
            let dvx = 0;
            let dvy = 0;
            const ovx = (b1.isFixX || b1.diffX * b1.velocityX < 0) ? b2.velocityX : b2.diffX - b1.diffX;
            const ovy = (b1.isFixY || b1.diffY * b1.velocityY < 0) ? b2.velocityY : b2.diffY - b1.diffY;
            const dot = Math.sign(ovx * -ny + ovy * nx);
            dvx = dot * -ny * p * mu * dt / 1000;
            dvy = dot * nx * p * mu * dt / 1000;
            if (ovx === b2.velocityX && Math.abs(dvx) > Math.abs(b2.velocityX)) {
                dvx = b2.velocityX;
            }
            if (ovy === b2.velocityY && Math.abs(dvy) > Math.abs(b2.velocityY)) {
                dvy = b2.velocityY;
            }
            vdx2 -= dvx * b2.material.frictionX;
            // Apply only to down wall
            vdy2 -= dvy < 0 ? 0 : dvy * b2.material.frictionY;
        }

        b1.setNextAddVelocity(vdx1, vdy1);
        if (b2 !== null) {
            b2.setNextAddVelocity(vdx2, vdy2);
        }
    }
}
/**
 * Sequential world
 * - Performs a physical operation
 * - Registers entities and apply a physical operation
 * - ### Continually perform collision processing
 * @extends {PhysicalWorld}
 * @classdesc Sequential world to perform collision processing continually
 */
class SequentialWorld extends PhysicalWorld { // eslint-disable-line  no-unused-vars
    /**
     * Sequential world constructor
     * @constructor
     * @param {number} [gravity=9.8] gravity of the world
     */
    constructor(gravity = 9.8) {
        super(gravity);

        /**
         * Collision data list
         * @protected
         * @type {Array<CollisionData>}
         */
        this.collisions = [];

        /**
         * Size of collision data list
         * @protected
         * @type {number}
         */
        this.collisionSize = 0;

        /**
         * List of entities to act on
         * @protected
         * @type {Array<MutableEntity>}
         */
        this.actors = [];

        /**
         * List of entities not to act on
         * @protected
         * @type {Array<InfluentialEntity>}
         */
        this.notActors = [];

        /**
         * List of all entities
         * @protected
         * @type {Array<InfluentialEntity>}
         */
        this.entities = [];

        // initialize
        for (let i = 0; i < 100; ++i) {
            const data = new LowerPriorityData();
            data.init();
            this.collisions.push(data);
        }
    }

    /**
     * Add entity in physical world
     * @override
     * @param {InfluentialEntity} entity Entity in physical world
     */
    addEntity(entity) {
        this.entities.push(entity);
        if (entity instanceof MutableEntity) {
            this.actors.push(entity);
        } else {
            this.notActors.push(entity);
        }
    }

    /**
     * Remove entity from physical world
     * @override
     * @param {InfluentialEntity} entity Entity to remove from physical world
     */
    removeEntity(entity) {
        let index = this.entities.indexOf(entity);
        if (index >= 0) {
            this.entities.splice(index, 1);
        }
        index = this.actors.indexOf(entity);
        if (index >= 0) {
            this.actors.splice(index, 1);
        }
        index = this.notActors.indexOf(entity);
        if (index >= 0) {
            this.notActors.splice(index, 1);
        }
    }

    /**
     * Get collision information now
     * @override
     * @param {Collider} collider Target collider
     * @return {Array<CollisionData>} Collision information now
     */
    getCollisionData(collider) {
        const ret = [];
        if (collider === null) {
            return ret;
        }
        const data = new LowerPriorityData();
        for (const it of this.entities) {
            const itCollider = it.collider;
            if (itCollider === null || it === collider.entity || !itCollider.enable) {
                continue;
            }
            if (collider.isCollisionRoughly(itCollider) && collider.isCollision(itCollider, data)) {
                ret.push(data);
                data = new LowerPriorityData();
            }
        }
        return ret;
    }

    /**
     * Get the total number of collisions
     * @override
     * @return {number} Total number of collisions
     */
    getCollisionSize() {
        return this.collisionSize;
    }

    /**
     * Update external force
     * @protected
     * @override
     * @param {number} dt Delta time
     */
    updateExternalForce(dt) {
        for (const target of this.actors) {
            if (target.body !== null) {
                target.body.enforce(0, this.gravity * target.material.mass * target.body.material.gravityScale);
            }
        }
    }

    /**
     * Prepare body
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    prepareBody(dt) {
        for (const target of this.actors) {
            if (target.body !== null) {
                target.body.prepare(dt);
            }
        }
    }

    /**
     * Update body
     * @protected
     * @override
     * @param {number} dt Delta time
     */
    updateBody(dt) {
        for (const target of this.actors) {
            if (target.body !== null) {
                target.body.update(dt);
            }
        }
    }

    /**
     * Update body to cleanup
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateBodyCleanup(dt) {
        for (const target of this.actors) {
            if (target.body !== null) {
                target.body.cleanup(dt);
            }
        }
    }

    /**
     * Initialize collision state
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    initCollision(dt) {
        // collision initialize
        for (let j = 0; j < this.collisionSize; ++j) {
            this.collisions[j].init();
        }
        this.collisionSize = 0;
        for (const it of this.entities) {
            if (it.collider !== null) {
                it.collider.init();
            }
        }
    }

    /**
     * Update collisions
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateCollision(dt) {
        // collision detection
        for (let i = 0; i < this.actors.length; ++i) {
            const target = this.actors[i];
            const targetCollider = target.collider;
            if (targetCollider === null || !targetCollider.enable) {
                continue;
            }
            // check actors
            for (let j = i + 1; j < this.actors.length; ++j) {
                const it = this.actors[j];
                const itCollider = it.collider;
                if (itCollider === null || !itCollider.enable || !targetCollider.isCollisionRoughly(itCollider) || !targetCollider.isCollision(itCollider, this.collisions[this.collisionSize])) {
                    continue;
                }
                // add collision data
                targetCollider.addCollision(this.collisions[this.collisionSize]);
                itCollider.addCollision(this.collisions[this.collisionSize]);
                if (++this.collisionSize >= this.collisions.length) {
                    const data = new LowerPriorityData();
                    data.init();
                    this.collisions.push(data);
                }
            }
            // check tiles
            for (const it of this.notActors) {
                const itCollider = it.collider;
                if (itCollider === null || !itCollider.enable || !targetCollider.isCollisionRoughly(itCollider) || !targetCollider.isCollision(itCollider, this.collisions[this.collisionSize])) {
                    continue;
                }
                // add collision data
                targetCollider.addCollision(this.collisions[this.collisionSize]);
                itCollider.addCollision(this.collisions[this.collisionSize]);
                if (++this.collisionSize >= this.collisions.length) {
                    const data = new LowerPriorityData();
                    data.init();
                    this.collisions.push(data);
                }
            }
        }
    }

    /**
     * Update collisions response
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateResponse(dt) {
        // collision response
        for (let j = 0; j < this.collisionSize; ++j) {
            const it = this.collisions[j];
            if (it.colliding.collider.isResponse(it.collided.collider) && it.collided.collider.isResponse(it.colliding.collider)) {
                this.response.collisionResponse(it, dt);
            }
        }
    }
}
/**
 * Split world
 * - Performs a physical operation
 * - Registers entities and apply a physical operation
 * - Continually perform collision processing
 * - ### Manages not actor by split area
 * @extends {SequentialWorld}
 * @classdesc Split world to manage not actor by split area
 */
class SplitWorld extends SequentialWorld { // eslint-disable-line  no-unused-vars
    /**
     * Split world constructor
     * @constructor
     * @param {number} stageWidth Stage width (pixel)
     * @param {number} stageHeight Stage height (pixel)
     * @param {number} [gravity=9.8] gravity of the world
     * @param {number} [splitNumber=128] One unit of division
     */
    constructor(stageWidth, stageHeight, gravity = 9.8, splitNumber = 128) {
        super(gravity);

        /**
         * One unit of division
         * @protected
         * @type {number}
         */
        this.splitNumber = splitNumber;

        /**
         * Stage width (area)
         * @protected
         * @type {number}
         */
        this.stageWidth = Math.floor(stageWidth / this.splitNumber) + ((stageWidth % this.splitNumber === 0) ? 0 : 1);
        /**
         * Stage height (area)
         * @protected
         * @type {number}
         */
        this.stageHeight = Math.floor(stageHeight / this.splitNumber) + ((stageHeight % this.splitNumber === 0) ? 0 : 1);

        /**
         * List of list of entities that exist in each division unit
         * @protected
         * @type {Array<Array<InfluentialEntity>>}
         */
        this.notActorsMap = [];

        // initialize
        for (let y = 0; y < this.stageHeight + 1; ++y) {
            for (let x = 0; x < this.stageWidth + 1; ++x) {
                this.notActorsMap.push([]);
            }
        }
    }

    /**
     * Add entity in physical world
     * @override
     * @param {InfluentialEntity} entity Entity in physical world
     */
    addEntity(entity) {
        this.entities.push(entity);
        if (entity instanceof MutableEntity) {
            this.actors.push(entity);
        } else {
            const sx = Math.floor(entity.collider.aabb.startX / this.splitNumber);
            const sy = Math.floor(entity.collider.aabb.startY / this.splitNumber);
            const ex = Math.floor(entity.collider.aabb.endX / this.splitNumber);
            const ey = Math.floor(entity.collider.aabb.endY / this.splitNumber);
            for (let y = sy; y <= ey; ++y) {
                for (let x = sx; x <= ex; ++x) {
                    this.notActorsMap[x + this.stageWidth * y].push(entity);
                }
            }
            this.notActors.push(entity);
        }
    }

    /**
     * Remove entity from physical world
     * @override
     * @param {InfluentialEntity} entity Entity to remove from physical world
     */
    removeEntity(entity) {
        let index = this.entities.indexOf(entity);
        if (index >= 0) {
            this.entities.splice(index, 1);
        }
        index = this.actors.indexOf(entity);
        if (index >= 0) {
            this.actors.splice(index, 1);
        }
        index = this.notActors.indexOf(entity);
        if (index >= 0) {
            this.notActors.splice(index, 1);
            const sx = Math.floor(entity.collider.aabb.startX / this.splitNumber);
            const sy = Math.floor(entity.collider.aabb.startY / this.splitNumber);
            const ex = Math.floor(entity.collider.aabb.endX / this.splitNumber);
            const ey = Math.floor(entity.collider.aabb.endY / this.splitNumber);
            for (let y = sy; y <= ey; ++y) {
                for (let x = sx; x <= ex; ++x) {
                    this.notActorsMap[x + this.stageWidth * y].splice(this.notActorsMap[x + this.stageWidth * y].indexOf(entity), 1);
                }
            }
        }
    }

    /**
     * Get collision information now
     * @override
     * @param {Collider} collider Target collider
     * @return {Array<CollisionData>} Collision information now
     */
    getCollisionData(collider) {
        const ret = [];
        if (collider === null) {
            return ret;
        }
        // check region
        let sx = Math.floor(collider.aabb.startX / this.splitNumber);
        let sy = Math.floor(collider.aabb.startY / this.splitNumber);
        const ex = Math.floor(collider.aabb.endX / this.splitNumber);
        const ey = Math.floor(collider.aabb.endY / this.splitNumber);
        if (ex < 0 || ey < 0 || sx >= this.stageWidth || sy >= this.stageHeight) {
            return ret;
        }
        if (sx < 0) {
            sx = 0;
        }
        if (sy < 0) {
            sy = 0;
        }
        const collidedList = [];
        let data = new LowerPriorityData();
        for (const it of this.actors) {
            const itCollider = it.collider;
            if (itCollider === null || it === collider.entity || !itCollider.enable) {
                continue;
            }
            if (collider.isCollisionRoughly(itCollider) && collider.isCollision(itCollider, data)) {
                ret.push(data);
                data = new LowerPriorityData();
            }
        }
        for (let y = sy; y <= ey; ++y) {
            for (let x = sx; x <= ex; ++x) {
                for (const it of this.notActorsMap[x + this.stageWidth * y]) {
                    const itCollider = it.collider;
                    if (itCollider === null || !itCollider.enable) {
                        continue;
                    }
                    if (collidedList.indexOf(it) !== -1) {
                        continue;
                    }
                    if (collider.isCollisionRoughly(itCollider) && collider.isCollision(itCollider, data)) {
                        collidedList.push(it);
                        ret.push(data);
                        data = new LowerPriorityData();
                    }
                }
            }
        }
        return ret;
    }

    /**
     * Update collisions
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateCollision(dt) {
        // collision detection
        for (let i = 0; i < this.actors.length; ++i) {
            const target = this.actors[i];
            const targetCollider = target.collider;
            if (targetCollider === null || !targetCollider.enable) {
                continue;
            }
            let sx = Math.floor(targetCollider.aabb.startX / this.splitNumber);
            let sy = Math.floor(targetCollider.aabb.startY / this.splitNumber);
            const ex = Math.floor(targetCollider.aabb.endX / this.splitNumber);
            const ey = Math.floor(targetCollider.aabb.endY / this.splitNumber);
            if (ex < 0 || ey < 0 || sx >= this.stageWidth || sy >= this.stageHeight) {
                continue;
            }
            if (sx < 0) {
                sx = 0;
            }
            if (sy < 0) {
                sy = 0;
            }
            const collidedList = [];
            for (let j = i + 1; j < this.actors.length; ++j) {
                const it = this.actors[j];
                const itCollider = it.collider;
                if (itCollider === null || !itCollider.enable || !targetCollider.isCollisionRoughly(itCollider) || !targetCollider.isCollision(itCollider, this.collisions[this.collisionSize])) {
                    continue;
                }
                // add collision data
                targetCollider.addCollision(this.collisions[this.collisionSize]);
                itCollider.addCollision(this.collisions[this.collisionSize]);
                if (++this.collisionSize >= this.collisions.length) {
                    this.collisions.push(new LowerPriorityData());
                }
            }
            for (let y = sy; y <= ey; ++y) {
                for (let x = sx; x <= ex; ++x) {
                    for (const it of this.notActorsMap[x + this.stageWidth * y]) {
                        const itCollider = it.collider;
                        if (itCollider === null || !itCollider.enable || collidedList.indexOf(it) !== -1 || !targetCollider.isCollisionRoughly(itCollider) || !targetCollider.isCollision(itCollider, this.collisions[this.collisionSize])) {
                            continue;
                        }
                        // add collision data
                        collidedList.push(it);
                        targetCollider.addCollision(this.collisions[this.collisionSize]);
                        itCollider.addCollision(this.collisions[this.collisionSize]);
                        if (++this.collisionSize >= this.collisions.length) {
                            this.collisions.push(new LowerPriorityData());
                        }
                    }
                }
            }
        }
    }
}
// TODO: Comment
/**
 * Gravity world
 * - Performs a physical operation
 * - Registers entities and apply a physical operation
 * - Continually perform collision processing
 * - ### Manages not actor by split area
 * @extends {SplitWorld}
 * @classdesc Gravity world to manage not actor by split area
 */
class VariableGravityWorld extends SplitWorld { // eslint-disable-line  no-unused-vars
    /**
     * Gravity world constructor
     * @constructor
     * @param {number} stageWidth Stage width (pixel)
     * @param {number} stageHeight Stage height (pixel)
     * @param {number} [gravity=9.8] gravity of the world
     */
    constructor(stageWidth, stageHeight, gravity = 9.8) {
        super(stageWidth, stageHeight, gravity);

        /**
         * Gravity x direction
         * @protected
         * @param {number}
         */
        this.gravityX = 0;
        /**
         * Gravity y direction
         * @protected
         * @param {number}
         */
        this.gravityY = 1;

        this.gravityXs = [];
        this.gravityYs = [];
        this.deltas = [];

        this.number = 0;
    }

    /**
     * Add gravity change time
     * @param {number} gravityX Gravity x direction
     * @param {number} gravityY Gravity y direction
     * @param {number} delta Delta time
     */
    addGravity(gravityX, gravityY, delta) {
        this.gravityXs.push(gravityX);
        this.gravityYs.push(gravityY);
        this.deltas.push(delta);
    }

    /**
     * Update external force
     * @protected
     * @override
     * @param {number} dt Delta time
     */
    updateExternalForce(dt) {
        if (this.deltas[this.number] < 0) {
            this.number++;
        }
        if (this.number < this.deltas.length) {
            this.gravityX = this.gravityXs[this.number];
            this.gravityY = this.gravityYs[this.number];
            this.deltas[this.number] -= dt / 1000;
            if (this.deltas[this.number] < 1) {
                this.gravityX = 0;
                this.gravityY = 1;
            }
        }

        for (const target of this.actors) {
            if (target.body !== null) {
                const g = this.gravity * target.material.mass * target.body.material.gravityScale;
                target.body.enforce(g * this.gravityX, g * this.gravityY);
            }
        }
    }

    /**
     * Render world
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        if (this.number < this.deltas.length) {
            const delta = this.deltas[this.number];
            if (delta < 1 && Math.floor(delta * 1000) % 2 === 0) {
                if (this.number < this.deltas.length - 1) {
                    const x = this.gravityXs[this.number + 1];
                    const y = this.gravityYs[this.number + 1];
                    if (x > 0) {
                        ctx.fillText(`>`, GameScreen.it.width - 10, GameScreen.it.height / 2, 1.0, 0.5, 100, `red`);
                    }
                    if (x < 0) {
                        ctx.fillText(`<`, 10, GameScreen.it.height / 2, 0.0, 0.5, 100, `red`);
                    }
                    if (y > 0) {
                        ctx.fillText(`|`, GameScreen.it.width / 2, GameScreen.it.height - 10, 0.5, 1.0, 100, `red`);
                    }
                    if (y < 0) {
                        ctx.fillText(`^`, GameScreen.it.width / 2, 10, 0.5, 0.0, 100, `red`);
                    }
                }
            }
        }
    }
}
/**
 * Split management stage
 * - Store stage size
 * - Performs updating and rendering stage
 * - Manages stage element such as entity
 * - ### Dividingly manages entities according to type
 * - ### Do not update immutable objects
 * @extends {Stage}
 * @classdesc Split management stage to manage entities according to type dividingly
 */
class SplitManagementStage extends Stage { // eslint-disable-line  no-unused-vars
    /**
     * Split management stage constructor
     * @constructor
     * @param {number} stageWidth Stage width (pixel)
     * @param {number} stageHeight Stage height (pixel)
     */
    constructor(stageWidth, stageHeight) {
        super(stageWidth, stageHeight);
        /**
         * All entity list
         * @protected
         * @type {Array<Entity>}
         */
        this.entities = [];
        /**
         * Sorted entity for rendering
         * @protected
         * @type {Array<Entity>}
         */
        this.sortedEntity = [];

        /**
         * List of entity that will be removed
         * @protected
         * @type {Array<Entity>}
         */
        this.removeList = [];

        /**
         * Playable instance for camera
         * @protected
         * @type {IPlayable}
         */
        this.player = null;

        /**
         * Whehter initialize is ended or not
         * @protected
         * @type {boolean}
         */
        this.inited = false;
    }

    /**
     * Initialize stage
     * @override
     */
    init() {
        this.inited = true;
        this.sortedEntity = Object.assign([], this.entities).sort((a, b) => {
            return a.z < b.z ? -1 : a.z > b.z ? 1 : 0;
        });

        if (this.player !== null) {
            const x = this.player.getCameraX();
            const y = this.player.getCameraY();
            this.camera.init(x, y);
        }
    }

    /**
     * Add entity to stage
     * @override
     * @param {Entity} entity Entity object
     */
    addEntity(entity) {
        // set player
        if (this.player === null && BaseUtil.implementsOf(entity, IPlayable)) {
            this.player = entity;
        }
        if (entity instanceof InfluentialEntity) {
            this.physic.addEntity(entity);
        }
        this.entities.push(entity);
        // initialize entity
        super.addEntity(entity);
        // sort
        if (this.inited) {
            const index = this.sortedEntity.findIndex((it) => {
                return entity.z < it.z;
            });
            if (index >= 0) {
                this.sortedEntity.splice(index, 0, entity);
            } else {
                this.sortedEntity.push(entity);
            }
        }
    }

    /**
     * Remove entity from stage
     * @override
     * @param {Entity} entity Entity object
     */
    removeEntity(entity) {
        this.removeList.push(entity);
    }

    /**
     * Remove entity from stage immediately
     * @abstract
     * @protected
     * @param {Entity} entity Entity object
     */
    removeEntityImmediately(entity) {
        // remove player
        if (entity === this.player) {
            this.player = null;
        }
        if (entity instanceof InfluentialEntity) {
            this.physic.removeEntity(entity);
        }
        let index = this.entities.indexOf(entity);
        if (index >= 0) {
            this.entities.splice(index, 1);
        }
        index = this.sortedEntity.indexOf(entity);
        if (index >= 0) {
            this.sortedEntity.splice(index, 1);
        }
    }

    /**
     * Get all entities
     * @override
     * @return {Array<Entity>} All entities
     */
    getEntities() {
        return this.entities;
    }

    /**
     * Update entity in stage
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateEntity(dt) {
        for (const it of this.entities) {
            it.update(dt);
        }
        // remove entity
        for (const entity of this.removeList) {
            this.removeEntityImmediately(entity);
        }
        this.removeList.length = 0;
    }

    /**
     * Update entity in stage by physical world
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updatePhysics(dt) {
        this.physic.update(dt);
    }

    /**
     * Update background
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateBackground(dt) {
        this.back.update(dt);
    }

    /**
     * Update camera
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateCamera(dt) {
        if (this.player !== null) {
            const x = this.player.getCameraX();
            const y = this.player.getCameraY();
            this.camera.update(x, y, dt);
        }
    }

    /**
     * Render background in stage
     * @override
     * @protected
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    renderBackground(ctx, shiftX, shiftY) {
        this.back.render(ctx, shiftX + this.camera.cameraX, shiftY + this.camera.cameraY, this.camera.screenWidth, this.camera.screenHeight);
    }

    /**
     * Render entities in stage
     * @override
     * @protected
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    renderEntity(ctx, shiftX, shiftY) {
        const startX = -this.camera.cameraX;
        const startY = -this.camera.cameraY;
        const endX = startX + this.camera.screenWidth;
        const endY = startY + this.camera.screenHeight;
        for (const it of this.sortedEntity) {
            if (it.x + it.width >= startX && it.x < endX && it.y + it.height >= startY && it.y < endY) {
                it.render(ctx, this.camera.baseX - startX, this.camera.baseY - startY);
            }
        }
    }

    /**
     * Render world in stage
     * @abstract
     * @protected
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    renderWorld(ctx, shiftX, shiftY) {
        this.physic.render(ctx, shiftX, shiftY);
    }
}
/**
 * Stack stage manager
 * - Manages stage
 * - ### Uses the stack
 * @extends {StageManager}
 * @classdesc Stack stage manager to ues the stack
 */
class StackStageManager extends StageManager { // eslint-disable-line  no-unused-vars
    /**
     * Stack stage manager constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Stack of stages
         * @protected
         * @type {Array<Stage>}
         */
        this.stageStack = [];
    }

    /**
     * Push stage to list
     * @override
     * @param {string} stageName Stage name
     */
    pushStage(stageName) {
        const stage = this.parser.parse(`src/res/stage/${stageName}.json`, this.width, this.height);
        this.stageStack.push(stage);
        stage.init();
    }

    /**
     * Pop stage from list
     * @override
     * @return {Stage} Stage that is popped from list
     */
    popStage(stage) {
        return this.stageStack.pop();
    }

    /**
     * Get stage
     * @override
     * @return {Stage} Currently stage
     */
    getStage() {
        return this.stageStack.length === 0 ? null : this.stageStack[this.stageStack.length - 1];
    }
}
/**
 * Simple Timer
 * - Measure the time
 * - ### Measure time by Date
 * @extends {Timer}
 * @classdesc Simple TImer to measure time by Date
 */
class SimpleTimer extends Timer { // eslint-disable-line  no-unused-vars
    /**
     * Simple timer constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Named timer for measuring time
         * @protected
         * @type {Object<string, number>}
         */
        this.namedTimer = {};

        /**
         * Named timer for registering start time
         * @protected
         * @type {Object<string, number>}
         */
        this.namedStartTimer = {};
    }

    /**
     * Start to measure timer by name
     * @override
     * @param {string} name Timer name
     */
    startTimer(name) {
        this.namedStartTimer[name] = +(new Date());
    }

    /**
     * Stop measuring timer by name
     * @override
     * @param {string} name Timer name
     */
    stopTimer(name) {
        this.namedTimer[name] = +(new Date()) - this.namedStartTimer[name];
    }

    /**
     * Get timer by name
     * @override
     * @param {string} name Timer name
     * @return {number} Timer by name
     */
    getTimer(name) {
        return this.namedTimer[name];
    }

    /**
     * Render timer
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Timer x position
     * @param {number} y Timer y position
     */
    render(ctx, x, y) {
        for (const name in this.namedTimer) {
            if (this.namedTimer.hasOwnProperty(name)) {
                ctx.fillText(`${name} : ${this.getTimer(name)} msec`, x, y, 0.0, 0.0, 20, `white`);
                y += 30;
            }
        }
    }
}
/**
 * Under engine
 * - Control the core of the game
 * - Manages each piece of game information
 * - Fires update and rendering processing respectively
 * - ### Executes the main loop by requestAnimationFrame
 * @extends {Engine}
 * @classdesc Under engine to execute main loop by requestAnimationFrame
 */
class UnderEngine extends Engine { // eslint-disable-line  no-unused-vars
    /**
     * Under engine constructor
     * @constructor
     */
    constructor() {
        super();
        /**
         * Previous measurement time
         * @protected
         * @type {number}
         */
        this.oldTime = +new Date();

        /**
         * Rendering lambda function
         * @private
         * @type {lambda}
         */
        this._loop = null;
    }

    /**
     * Update in main loop
     * @protected
     */
    update() {
        const newTime = +new Date();
        this.timer.update(newTime - this.oldTime);
        this.input.update();
        // minimum delta time is 30 milisec
        this.manager.update(this.timer.deltaTime > 30 ? 30 : this.timer.deltaTime);
        this.oldTime = newTime;
    }

    /**
     * Rendering in main loop
     * @protected
     */
    render() {
        this.context.preRendering();
        this.manager.render(this.context);
        this.context.postRendering();
    }

    /**
     * Game main process
     * @override
     * @protected
     */
    main() {
        // start main loop
        this.oldTime = +new Date();
        this._loop = (_) => {
            requestAnimationFrame(this._loop);
            this.update();
            this.render();
        };
        requestAnimationFrame(this._loop);
    }
}
/**
 * Under engine builder
 * - Performs initial construction of the game engine
 * - ### Generates all necessary instances
 * @extends {EngineBuilder}
 * @classdesc Under engine builder to perform initial construction of the game engine
 */
class UnderEngineBuilder extends EngineBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Make game engine
     * @override
     * @protected
     * @return {Engine} Game engine
     */
    makeEngine() {
        return new UnderEngine();
    }

    /**
     * Make input system
     * @override
     * @protected
     * @return {Input} Input system
     */
    makeInput() {
        return new AllInput(new KeyInput(), new MouseInput());
    }

    /**
     * Make screen system
     * @override
     * @protected
     * @return {GameScreen} Screen system
     */
    makeScreen() {
        return new DetectiveScreen();
    }

    /**
     * Make context to render
     * @override
     * @protected
     * @return {Context} Context to render
     */
    makeContext() {
        return new JSContext();
    }

    /**
     * Make image manager
     * @override
     * @protected
     * @return {IImageManager} Image manager
     */
    makeImageManager() {
        return new CachedImage(`src/res/image/`);
    }

    /**
     * Make music system
     * @override
     * @protected
     * @return {Music} Music system
     */
    makeMusic() {
        return new BufferSourceMusic();
    }

    /**
     * Make music manager
     * @override
     * @protected
     * @return {IMusicManager} Music manager
     */
    makeMusicManager() {
        return new CachedMusic(`src/res/sound/`);
    }

    /**
     * Make timer
     * @override
     * @protected
     * @return {Timer} Timer
     */
    makeTimer() {
        return new SimpleTimer();
    }

    /**
     * Make scene manager
     * @override
     * @protected
     * @return {SceneManager} Scene manager
     */
    makeSceneManager() {
        return new StackSceneManager();
    }
}
/**
 * Convenient method group
 * @classdesc Convenient method group
 */
class Util { // eslint-disable-line  no-unused-vars
    /**
     * Determine whether entity is on the ground
     * @param {InfluentialEntity} entity Target entity
     * @return {boolean} Whether entity is on the ground
     */
    static onGround(entity) {
        return this.getUnderEntity(entity) !== null;
    }

    /**
     * Get under entity
     * @param {InfluentialEntity} entity Target entity
     * @return {InfluentialEntity} Under entity (if not, return null)
     */
    static getUnderEntity(entity) {
        const data = entity.collider.collisions.find((it) => {
            return ((it.colliding === entity && it.ny > 0) || (it.collided === entity && it.ny < 0)) && it.colliding.collider.isResponse(it.collided.collider) && it.collided.collider.isResponse(it.colliding.collider);
        });
        return data === undefined ? null : this.getCollidedEntity(entity, data);
    }

    /**
     * Get collided entity
     * @param {InfluentialEntity} entity Target entity
     * @return {InfluentialEntity} Under entity (if not, return null)
     */
    static getSideEntity(entity) {
        const list = entity.collider.collisions;
        for (const it of list) {
            if (it.ny !== 0) {
                continue;
            }
            const dot = entity.body.velocityX * it.nx + entity.body.velocityY * it.ny;
            if ((it.colliding === entity && dot > 0) || (it.collided === entity && dot < 0)) {
                return this.getCollidedEntity(entity, it);
            }
        }
        return null;
    }

    /**
     * Get entity from collision data
     * @param {InfluentialEntity} self Entity itself
     * @param {CollisionData} data Collision data
     * @return {Entity} Collided entity
     */
    static getCollidedEntity(self, data) {
        return data.colliding === self ? data.collided : data.colliding;
    }

    /**
     * Load text file
     * @param {string} filePath File path
     * @return {string} Loaded text
     */
    static loadFile(filePath) {
        const req = new XMLHttpRequest();
        req.open(`GET`, filePath, false);
        req.send(null);
        return req.responseText;
    }

    /**
     * Renders window
     * @param {Context} ctx Canvas context
     * @param {number} id Window image ID
     * @param {number} x Window x position
     * @param {number} y Window x position
     * @param {number} width Window width
     * @param {number} height Window height
     */
    static renderWindow(ctx, id, x, y, width, height) {
        const imageWidth = ResourceManager.image.getWidth(id) / 3;
        const imageHeight = ResourceManager.image.getHeight(id) / 3;
        x = Math.floor(x);
        y = Math.floor(y);
        width = Math.floor(width);
        height = Math.floor(height);

        ctx.drawImage(id, x, y, imageWidth, imageHeight, 0, 0, imageWidth, imageHeight);
        ctx.drawImage(id, x + imageWidth, y, width - imageWidth * 2, imageHeight, imageWidth, 0, imageWidth, imageHeight);
        ctx.drawImage(id, x + width - imageWidth, y, imageWidth, imageHeight, imageWidth * 2, 0, imageWidth, imageHeight);

        ctx.drawImage(id, x, y + imageHeight, imageWidth, height - imageHeight * 2, 0, imageHeight, imageWidth, imageHeight);
        ctx.drawImage(id, x + imageWidth, y + imageHeight, width - imageWidth * 2, height - imageHeight * 2, imageWidth, imageHeight, imageWidth, imageHeight);
        ctx.drawImage(id, x + width - imageWidth, y + imageHeight, imageWidth, height - imageHeight * 2, imageWidth * 2, imageHeight, imageWidth, imageHeight);

        ctx.drawImage(id, x, y + height - imageHeight, imageWidth, imageHeight, 0, imageHeight * 2, imageWidth, imageHeight);
        ctx.drawImage(id, x + imageWidth, y + height - imageHeight, width - imageWidth * 2, imageHeight, imageWidth, imageHeight * 2, imageWidth, imageHeight);
        ctx.drawImage(id, x + width - imageWidth, y + height - imageHeight, imageWidth, imageHeight, imageWidth * 2, imageHeight * 2, imageWidth, imageHeight);
    }

    /**
     * Whether it is not animation or animation is ended
     * @param {GameImage} image Target image
     * @return {boolean} Whether it is not animation or animation is ended
     */
    static canEnd(image) {
        return !(image instanceof GameAnimation) || image.isEnded();
    }

    /**
     * Remove element from list if element exists
     * @param {Array<?>} list Tartget list
     * @param {?} element Target  element
     * @return {number} Index of element if it exists
     */
    static removeIfExists(list, element) {
        const index = list.indexOf(element);
        if (index >= 0) {
            list.splice(index, 1);
        }
        return index;
    }
}
/**
 * Editor engine builder
 * - Performs initial construction of the game engine
 * - Generates all necessary instances
 * - ### Generates instance related to editor
 * @extends {UnderEngineBuilder}
 * @classdesc Editor engine builder to generate instance related to editor
 */
class EditorBuilder extends UnderEngineBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Make game engine
     * @override
     * @protected
     * @return {Engine} Game engine
     */
    makeEngine() {
        return new UnderDebugEngine();
    }

    /**
     * Make screen system
     * @override
     * @protected
     * @return {GameScreen} Screen system
     */
    makeScreen() {
        return new FitableScreen(new DetectiveScreen(800, 850));
    }

    /**
     * Make input system
     * @override
     * @protected
     * @return {Input} Input system
     */
    makeInput() {
        return new AllInput(new KeyInput(), new MouseInput());
    }

    /**
     * Make context to render
     * @override
     * @protected
     * @return {Context} Context to render
     */
    makeContext() {
        return new EditorContext();
    }

    /**
     * Make timer
     * @override
     * @protected
     * @return {Timer} Timer
     */
    makeTimer() {
        return new RecordedTimer();
    }
}
/**
 * Editor event
 * - Updates and renders event
 * - Identified by name
 * - It can save data
 * - Controls the stage
 * - ### Enables to use in editor
 * @extends {NamedEvent}
 * @implements {IEditorSave}
 * @implements {IStageEvent}
 * @classdesc Editor event to enable to use in editor
 */
class EditorEvent extends NamedEvent /* , IEditorSave, IStageEvent */ { // eslint-disable-line  no-unused-vars
    /**
     * Editor event constructor
     * @constructor
     * @param {GameEvent} baseEvent Base event
     */
    constructor(baseEvent) {
        super();

        /**
         * Base event
         * @protected
         * @type{GameEvent}
         */
        this.baseEvent = baseEvent;
    }

    /**
     * Unparse from input order to json
     * @protected
     * @param {InputOrder} order Traget input order
     * @return {JSON} JSON data
     */
    unparseInputOrder(order) {
        const ret = {};
        if (order instanceof DirectionInputOrder) {
            if (order.directionX === 1) {
                ret.type = `right`;
            } else if (order.directionX === -1) {
                ret.type = `left`;
            } else if (order.directionY === 1) {
                ret.type = `down`;
            } else if (order.directionY === -1) {
                ret.type = `up`;
            }
            ret.time = order.time;
        } else if (order instanceof WaitInputOrder) {
            ret.type = `wait`;
            ret.time = order.time;
        } else if (order instanceof LoopInputOrder) {
            ret.type = `loop`;
            ret.number = order.loopNumber;
            ret.orders = [];
            for (const it of order.orders) {
                ret.orders.push(this.unparseInputOrder(it));
            }
        }
        return ret;
    }

    /**
     * Unparses from event to json
     * @protected
     * @param {GameEvent} event Event to unparse
     * @return {JSON} Json data
     */
    unparse(event) {
        const ret = {};
        if (event instanceof AutoInputEvent) {
            ret.type = `auto`;
            ret.orders = [];
            for (const it of event.orders) {
                ret.orders.push(this.unparseInputOrder(it));
            }
        } else if (event instanceof DelayEvent) {
            ret.type = `delay`;
            ret.delay = event.delay;
        } else if (event instanceof DeleteEvent) {
            ret.type = `delete`;
            ret.name = event.name;
        } else if (event instanceof ImageEvent) {
            ret.type = `image`;
            ret.name = event.name;
            ret.x = event.x;
            ret.y = event.y;
            if (BaseUtil.implementsOf(event.image, IEditorSave)) {
                ret.image = event.image.getSaveData();
            }
        } else if (event instanceof CameraEvent) {
            ret.type = `camera`;
            ret.name = event.name;
            ret.x = event.toX;
            ret.y = event.toY;
        } else if (event instanceof ControlEntityEvent) {
            ret.type = `control`;
            ret.target = event.targetName;
            if (event.vx !== 0 || event.vy !== 0) {
                ret.vx = event.vx;
                ret.vy = event.vy;
            }
            if (event.fx !== 0 || event.fy !== 0) {
                ret.fx = event.fx;
                ret.fy = event.fy;
            }
        } else if (event instanceof StageStopEvent) {
            ret.type = `stop`;
            ret.name = event.name;
        } else if (event instanceof TalkEvent) {
            ret.type = `talk`;
            ret.sentence = event.sentence;
        } else if (event instanceof TransitionalEvent) {
            ret.type = `transition`;
            ret.stage = event.stage;
            ret.replace = event.isReplace;
        } else if (event instanceof WaitKeyEvent) {
            ret.type = `waitkey`;
        } else if (event instanceof LinkEvent) {
            ret.type = `link`;
            ret.url = event.url;
        } else if (event instanceof TextWindowEvent) {
            ret.type = `talkwindow`;
            ret.name = event.name;
            ret.x = event.x;
            ret.y = event.y;
            ret.sentence = event.sentence;
            ret.size = event.size;
        } else if (event instanceof CameraChangeEvent) {
            ret.type = `changeCamera`;
            ret.camera = event.type;
            ret.moving = event.isMoving;
            ret.cliping = event.isCliping;
        } else if (event instanceof PhysicalChangeEvent) {
            ret.type = `changePhysical`;
            ret.physical = event.response instanceof UnderRepulsionResponse ? `under` : event.response instanceof RepulsionResponse ? `repulsion` : `impulse`;
        } else if (event instanceof SequentialEvent) {
            ret.type = `sequential`;
            ret.events = [];
            for (const it of event.events) {
                ret.events.push(this.unparse(it));
            }
        }
        return ret;
    }

    /**
     * Get json data for saving
     * @override
     * @return {JSON} Json data for saving
     */
    getSaveData() {
        return this.unparse(this.baseEvent);
    }

    /**
     * Set stage
     * @override
     * @param {Stage} stage Stage to set
     */
    setStage(stage) {
        if (BaseUtil.implementsOf(this.baseEvent, IStageEvent)) {
            this.baseEvent.setStage(stage);
        }
    }

    /**
     * Get event's identified name
     * @override
     * @return {string} Identified name
     */
    getName() {
        return this.baseEvent instanceof NamedEvent ? this.baseEvent.getName() : null;
    }

    /**
     * Set event operator
     * @override
     * @param {IEventOperator} op Event operator
     */
    setEventOperator(op) {
        super.setEventOperator(op);
        this.baseEvent.setEventOperator(op);
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        this.baseEvent.init();
    }

    /**
     * Destructor of event
     * @override
     */
    destruct() {
        this.baseEvent.destruct();
    }

    /**
     * Update event
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether update is endped or not
     */
    update(dt) {
        return this.baseEvent.update(dt);
    }

    /**
     * Render event
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        this.baseEvent.render(ctx);
    }
}
/**
 * Editor context
 * - Controls rendering to the screen
 * - Renders by using HTML5 API
 * - ### Renders back by gray
 * @extends {JSContext}
 * @classdesc Editor context for rendering back by gray
 */
class EditorContext extends JSContext { // eslint-disable-line  no-unused-vars
    /**
     * Function to be executed before drawing
     * @override
     */
    preRendering() {
        super.preRendering();
        this.ctx.fillStyle = `gray`;
        this.ctx.fillRect(0, 0, this.screen.width, this.screen.height);
    }
}
/**
 * Editor background
 * - Renders and update background image
 * - It can save data
 * - ### Delegate background and enable to save
 * @interface
 * @extends {Background}
 * @implements {IEditorSave}
 * @classdesc Editor background to delegate background and enable to save
 */
class EditorBackground extends Background /* , IEditorSave */ { // eslint-disable-line  no-unused-vars
    /**
     * Editor background constructor
     * @constructor
     * @param {BackGround} baseBackground Base delegation background
     */
    constructor(baseBackground) {
        super();

        /**
         * Base delegation background
         * @type {Background}
         * @protected
         */
        this.baseBackground = baseBackground;
    }

    /**
     * Unparses from background to json
     * @protected
     * @param {Background} back Background to unparse
     * @return {JSON} Json data
     */
    unparse(back) {
        const ret = {};
        if (back instanceof EditorBackground) {
            back = back.baseBackground;
        }
        if (back instanceof SequentialBackground) {
            ret.type = `Sequential`;
            ret.backs = [];
            for (const it of back.backs) {
                ret.backs.push(this.unparse(it));
            }
        } else if (back instanceof InvariantBackground) {
            ret.type = `Invariant`;
        } else if (back instanceof MovementBackground) {
            ret.type = `Movement`;
            ret.x = back.x;
            ret.y = back.y;
            ret.rx = back.speedRatioX;
            ret.ry = back.speedRatioY;
        } else if (back instanceof AreaBackground) {
            ret.type = `Area`;
            ret.x = back.x;
            ret.y = back.y;
            ret.width = back.areaWidth;
            ret.height = back.areaHeight;
        } else if (back instanceof FixedBackground) {
            ret.type = `Fixed`;
            ret.x = back.x;
            ret.y = back.y;
        }
        if (back instanceof ImageBackground && BaseUtil.implementsOf(back.backImage, IEditorSave)) {
            ret.image = back.backImage.getSaveData();
        }
        return ret;
    }

    /**
     * Get json data for saving
     * @override
     * @return {JSON} Json data for saving
     */
    getSaveData() {
        return this.unparse(this.baseBackground);
    }

    /**
     * Initialize background
     * @override
     */
    init() {
        this.baseBackground.update();
    }

    /**
     * Update background
     * @override
     * @param {number} dt delta time
     */
    update(dt) {
        this.baseBackground.update(dt);
    }

    /**
     * Render background
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     * @param {number} screenWidth Scren width
     * @param {number} screenWidth Scren height
     */
    render(ctx, shiftX, shiftY, screenWidth, screenHeight) {
        this.baseBackground.render(ctx, shiftX, shiftY, screenWidth, screenHeight);
    }
}
/**
 * Editor camera
 * - Calculates the area to rendering
 * - Delegates some processing to another camera
 * - It can save data
 * - ### Moves by right clicked and dragging
 * @extends {DelegateCamera}
 * @implements {IEditorSave}
 * @classdesc Editor camera to move by right clicked and dragging
 */
class EditorCamera extends DelegateCamera /* , IEditorSave */ { // eslint-disable-line  no-unused-vars
    /**
     * Editor camera Constructor
     * @constructor
     * @param {Camera} baseCamera Base camera for delegation
     */
    constructor(baseCamera) {
        super(baseCamera);

        /**
         * Camera moving
         * @protected
         * @type {boolean}
         */
        this.moving = false;
        /**
         * Right click start x position
         * @protected
         * @type {number}
         */
        this.moveStartX = 0;
        /**
         * Right click start y position
         * @protected
         * @type {number}
         */
        this.moveStartY = 0;

        /**
         * Difference from actual screen width
         * @protected
         * @type {number}
         */
        this.screenDiffX = 0;
        /**
         * Difference from actual screen height
         * @protected
         * @type {number}
         */
        this.screenDiffY = 0;
    }

    /**
     * Unparses from camera to json
     * @param {JSON} base Added target
     * @param {Camera} camera Camera to unparse
     */
    unparse(base, camera) {
        if (camera instanceof CenterCamera) {
            base.type = `center`;
        } else if (camera instanceof MovingCamera) {
            base.moving = true;
        } else if (camera instanceof ClipCamera) {
            base.cliping = true;
        } else if (camera instanceof ForceMoveCamera) {
            base.force = {};
            base.force.x = camera.toX;
            base.force.y = camera.toY;
            base.force.speed = camera.speed;
        }
        if (camera instanceof DelegateCamera) {
            this.unparse(base, camera.baseCamera);
        }
    }

    /**
     * Get json data for saving
     * @override
     * @return {JSON} Json data for saving
     */
    getSaveData() {
        const ret = {};
        this.unparse(ret, this.baseCamera);
        return ret;
    }

    /**
     * Set screen size
     * @override
     * @param {number} screenWidth Camera screen width
     * @param {number} screenHeight Camera screen height
     */
    setScreenSize(screenWidth, screenHeight) {
        super.setScreenSize(screenWidth, screenHeight);

        this.screenDiffX = screenWidth - GameScreen.it.width;
        this.screenDiffY = screenHeight - GameScreen.it.height;
    }

    /**
     * Update camera
     * @override
     * @param {number} x Base x position
     * @param {number} y Base y position
     * @param {number} dt Delta time
     */
    update(x, y, dt) {
        // move by mouse
        if (Input.mouse.isPress(Input.mouse.mRight())) {
            this.moveStartX = Input.mouse.getMouseX();
            this.moveStartY = Input.mouse.getMouseY();
            this.moving = true;
        } else if (this.moving && Input.mouse.isPressed(Input.mouse.mRight())) {
            this.cameraX += Input.mouse.getMouseX() - this.moveStartX;
            this.cameraY += Input.mouse.getMouseY() - this.moveStartY;
            this.moveStartX = Input.mouse.getMouseX();
            this.moveStartY = Input.mouse.getMouseY();
        }
        // move by key
        if (Input.key.isPress(Input.key.right())) {
            this.cameraX = this.cameraX - this.screenWidth / 2;
        }
        if (Input.key.isPress(Input.key.left())) {
            this.cameraX = this.cameraX + this.screenWidth / 2;
        }
        if (Input.key.isPress(Input.key.up())) {
            this.cameraY = this.cameraY + this.screenHeight / 2;
        }
        if (Input.key.isPress(Input.key.down())) {
            this.cameraY = this.cameraY - this.screenHeight / 2;
        }
    }
}
/**
 * Editor function interface
 * - ### Operates editor
 * @interface
 * @classdesc Editor function interface to operate editor
 */
class IEditorFunction extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Get editor target
     * @abstract
     * @protected
     * @return {IEditorTarget} Editor target
     */
    getTarget() {}

    /**
     * Change editor tool by name
     * @abstract
     * @protected
     * @param {string} name Tool name
     */
    changeTool(name) {}

    /**
     * Set current ID
     * @abstract
     * @protected
     * @param {number} id Setting ID
     */
    setCurrentID(id) {}

    /**
     * Get current ID
     * @abstract
     * @protected
     * @return {number} Current ID
     */
    getCurrentID(id) {}
}
/**
 * Editor target interface
 * - ### Target for editing
 * @interface
 * @classdesc Editor target interface that target for editing
 */
class IEditorTarget extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Replace and paint
     * @abstract
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @param {number} id Painting ID
     */
    paint(x, y, id) {}

    /**
     * Get editor entity
     * @abstract
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @return {IEditorEntity} Editor entity
     */
    getEditorEntity(x, y) {}
}
/**
 * Pencil tool
 * - Tool for editing
 * - Selects something
 * - ### Paints one by one and automaticaly tiling
 * @extends {BaseTool}
 * @classdesc Pencil tool to paint one by one and automaticaly tiling
 */
class AutoTileTool extends BaseTool { // eslint-disable-line  no-unused-vars
    /**
     * Calclulate auto tile ID
     * @protected
     * @param {number} baseID Base tile ID
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @return {number} Auto tile ID
     */
    calculateID(baseID, x, y) {
        let willID = baseID;
        let spaceCount = 0;
        let checkLT = true;
        let checkRT = true;
        let checkLU = true;
        let checkRU = true;
        let top = this.editor.getTarget().getEditorEntity(x, y - 32);
        if (top === null || !top.isAutoTile() || top.getAutoTileBaseID() !== baseID) {
            checkLT = false;
            checkRT = false;
            willID = baseID + 16;
            top = null;
        } else {
            top = 1;
        }
        let right = this.editor.getTarget().getEditorEntity(x + 32, y);
        if (right === null || !right.isAutoTile() || right.getAutoTileBaseID() !== baseID) {
            checkRT = false;
            checkRU = false;
            willID = top === null ? baseID + 34 : baseID + 20;
            right = null;
        } else {
            right = 1;
        }
        let under = this.editor.getTarget().getEditorEntity(x, y + 32);
        if (under === null || !under.isAutoTile() || under.getAutoTileBaseID() !== baseID) {
            checkLU = false;
            checkRU = false;
            willID = top === null ? (right === null ? baseID + 43 : baseID + 40) : (right === null ? baseID + 36 : baseID + 24);
            under = null;
        } else {
            under = 1;
        }
        let left = this.editor.getTarget().getEditorEntity(x - 32, y);
        if (left === null || !left.isAutoTile() || left.getAutoTileBaseID() !== baseID) {
            checkLT = false;
            checkLU = false;
            willID = top === null ? (right === null ? (under === null ? baseID + 46 : baseID + 42) : (under === null ? baseID + 45 : baseID + 32)) : (right === null ? (under === null ? baseID + 44 : baseID + 41) : (under === null ? baseID + 38 : baseID + 28));
        }
        if (checkLT) {
            const check = this.editor.getTarget().getEditorEntity(x - 32, y - 32);
            if (check === null || !check.isAutoTile() || check.getAutoTileBaseID() !== baseID) {
                willID += 1 << spaceCount;
            }
            ++spaceCount;
        }
        if (checkRT) {
            const check = this.editor.getTarget().getEditorEntity(x + 32, y - 32);
            if (check === null || !check.isAutoTile() || check.getAutoTileBaseID() !== baseID) {
                willID += 1 << spaceCount;
            }
            ++spaceCount;
        }
        if (checkRU) {
            const check = this.editor.getTarget().getEditorEntity(x + 32, y + 32);
            if (check === null || !check.isAutoTile() || check.getAutoTileBaseID() !== baseID) {
                willID += 1 << spaceCount;
            }
            ++spaceCount;
        }
        if (checkLU) {
            const check = this.editor.getTarget().getEditorEntity(x - 32, y + 32);
            if (check === null || !check.isAutoTile() || check.getAutoTileBaseID() !== baseID) {
                willID += 1 << spaceCount;
            }
        }
        return willID;
    }

    /**
     * Paint auto tile
     * @protected
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @param {number} id Painting ID
     */
    paint(x, y, id) {
        let check = this.editor.getTarget().getEditorEntity(x, y);
        if (check !== null && check.isAutoTile() && check.getAutoTileBaseID() === id) {
            this.editor.getTarget().paint(x, y, this.calculateID(id, x, y));
        }
    }

    /**
     * Paint around
     * @protected
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @param {number} id Painting ID
     */
    paintAround(x, y, id) {
        for (let i = -1; i < 2; ++i) {
            for (let j = -1; j < 2; ++j) {
                this.paint(x + i * 32, y + j * 32, id);
            }
        }
    }


    /**
     * Update tool
     * @override
     * @protected
     */
    shortcut() {
        this.editor.changeTool(`tile`);
    }

    /**
     * Use tool by ID
     * @override
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @param {number} id Painting ID
     */
    use(x, y, id) {
        super.use(x, y, id);
        if (id >= 0 && Input.mouse.isPressed(Input.mouse.mLeft())) {
            this.editor.getTarget().paint(this.selectedX, this.selectedY, this.calculateID(id, this.selectedX, this.selectedY));
            this.paintAround(this.selectedX, this.selectedY, id);
        }
    }
}
/**
 * Editor stage
 * - Store stage size
 * - Performs updating and rendering stage
 * - Manages stage element such as entity
 * - Dividingly manages entities according to type
 * - Do not update immutable objects
 * - Executes debug process
 * - It can save data
 * - Target for editing
 * - ### Enable to put, remove and replace entity
 * @extends {DebugStage}
 * @implements {IEditorSave}
 * @implements {IEditable}
 * @implements {IEditorTarget}
 * @classdesc Editor stage that can put, remove and replace entity
 */
class EditorStage extends DebugStage /* , IEditorSave, IEditable, IEditorTarget */ { // eslint-disable-line  no-unused-vars
    /**
     * Editor stage constructor
     * @constructor
     * @param {Stage} stage Original stage for delegation
     * @param {Array<string>} tileFiles Tile information json file
     * @param {Array<string>} entityFiles Entity information json file
     */
    constructor(stage, tileFiles, entityFiles) {
        super(stage);

        /**
         * Tile information json files
         * @protected
         * @type {Array<string>}
         */
        this.tileFiles = tileFiles;
        /**
         * Entity information json files
         * @protected
         * @type {Array<string>}
         */
        this.entityFiles = entityFiles;

        /**
         * Whether the test play is in progress or not
         * @protected
         * @type {boolean}
         */
        this.playMode = false;
        /**
         * Save data of string
         * @protected
         * @type {JSON}
         */
        this.saveData = null;

        /**
         * Previous camera instance
         * @protected
         * @type {Camera}
         */
        this.preCamera = null;

        /**
         * List of editor entity
         * @protected
         * @type {Array<IEditorEntity>}
         */
        this.editorEntities = [];

        /**
         * Editor for editing
         * @protected
         * @type {EditorBase}
         */
        this.editor = null;
    }

    /**
     * Restore stage mutable object data
     * @protected
     */
    restore() {
        // remove not tile object
        const removeList = [];
        for (const it of this.editorEntities) {
            if (it.isDeployer()) {
                removeList.push(it);
            }
        }
        for (const it of removeList) {
            this.removeEntityImmediately(it.getEntity());
        }
        // add saved object
        for (const it of this.saveData.deploy) {
            this.addEntityByID(it.id, it);
        }
        EventManager.it.clear();
    }

    /**
     * Get json data for saving
     * @override
     * @return {JSON} Json data for saving
     */
    getSaveData() {
        const data = {};
        data.width = this.getStageWidth();
        data.height = this.getStageHeight();
        if (BaseUtil.implementsOf(this.stage.back, IEditorSave)) {
            data.background = this.stage.back.getSaveData();
        }
        if (BaseUtil.implementsOf(this.getCamera(), IEditorSave)) {
            data.camera = this.getCamera().getSaveData();
        }
        if (BaseUtil.implementsOf(this.getPhysicalWorld(), IEditorSave)) {
            data.world = this.getPhysicalWorld().getSaveData();
        }
        data.tiles = this.tileFiles;
        data.entities = this.entityFiles;
        data.layers = [];
        data.layers.push([]);
        data.deploy = [];
        for (const it of this.editorEntities) {
            const save = it.getSaveData();
            // set
            if (it.isDeployer()) {
                data.deploy.push(save);
            } else {
                // convert z order to layer index
                const z = parseInt(save.z);
                if (data.layers[z] === undefined) {
                    data.layers[z] = [];
                }
                delete save.z;
                data.layers[z].push(save);
            }
        }
        return data;
    }

    /**
     * Set editor base
     * @override
     * @param {EditorBase} editor Editor base
     */
    setEditor(editor) {
        this.editor = editor;
        this.editor.setTarget(this);
        this.editor.init();
    }

    /**
     * Set tile selection
     * @override
     * @param {ISelection} selection Tile selection
     */
    setTileSelection(selection) {
        const factory = this.getFactory();
        if (BaseUtil.implementsOf(factory, IEditorInfo)) {
            selection.setSelectionInfo(factory.getTileInfo());
        }
        this.editor.addSelector(selection);
    }

    /**
     * Set entity selection
     * @override
     * @param {ISelection} selection Entity selection
     */
    setEntitySelection(selection) {
        const factory = this.getFactory();
        if (BaseUtil.implementsOf(factory, IEditorInfo)) {
            selection.setSelectionInfo(factory.getEntityInfo());
        }
        this.editor.addSelector(selection);
    }

    /**
     * Replace and paint
     * @override
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @param {number} id Painting ID
     */
    paint(x, y, id) {
        let replaceTile = true;
        if (id !== -1) {
            const willEntity = this.getFactory().createEntity(id);
            replaceTile = !BaseUtil.implementsOf(willEntity, IEditorEntity) || !willEntity.isDeployer();
        }
        // remove
        for (const it of this.editorEntities) {
            const entity = it.getEntity();
            if (entity.x <= x && x < entity.x + entity.width && entity.y <= y && y < entity.y + entity.height) {
                if (it.isDeployer() || replaceTile) {
                    this.removeEntityImmediately(entity);
                }
            }
        }
        // deploy
        if (id !== -1) {
            this.addEntityByID(id, {
                x: x,
                y: y,
                z: 0,
            });
        }
    }

    /**
     * Get editor entity
     * @abstract
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @return {IEditorEntity} Editor entity
     */
    getEditorEntity(x, y) {
        for (const it of this.editorEntities) {
            const entity = it.getEntity();
            if (entity.x <= x && x < entity.x + entity.width && entity.y <= y && y < entity.y + entity.height) {
                return it;
            }
        }
        return null;
    }

    /**
     * Add entity to stage by ID
     * @param {Object} id Added entity ID
     * @param {JSON} deploy Deploy json data
     * @return {Entity} Added entity
     */
    addEntityByID(id, deploy) {
        let ret = super.addEntityByID(id, deploy);
        if (BaseUtil.implementsOf(ret, IEditorEntity)) {
            ret = ret.getEntity();
        }
        return ret;
    }

    /**
     * Add entity to stage
     * @override
     * @param {Entity} entity Entity object
     */
    addEntity(entity) {
        if (BaseUtil.implementsOf(entity, IEditorEntity)) {
            this.editorEntities.push(entity);
            entity = entity.getEntity();
        }
        super.addEntity(entity);
    }
    /**
     * Remove entity from stage
     * @override
     * @param {Entity} entity Entity object
     */
    removeEntity(entity) {
        const index = this.editorEntities.findIndex((it) => it.equals(entity));
        if (index >= 0) {
            this.editorEntities.splice(index, 1);
        }
        super.removeEntity(entity);
    }

    /**
     * Remove entity from stage immediately
     * @abstract
     * @protected
     * @param {Entity} entity Entity object
     */
    removeEntityImmediately(entity) {
        const index = this.editorEntities.findIndex((it) => it.equals(entity));
        if (index >= 0) {
            this.editorEntities.splice(index, 1);
        }
        super.removeEntityImmediately(entity);
    }

    /**
     * Update camera
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateCamera(dt) {
        super.updateCamera(dt);

        // move camera to player (E)
        if (!this.playMode && Input.key.isPress(Input.key.a() + 4)) {
            const player = this.getEntities().filter((it) => BaseUtil.implementsOf(it, IPlayable));
            if (player.length > 0) {
                const p = player[0];
                this.getCamera().init(p.getCameraX(), p.getCameraY());
            }
        }
    }

    /**
     * Update stage
     * @override
     * @param {number} dt delta time
     */
    update(dt) {
        // switch test play (P)
        if (Input.key.isPress(Input.key.a() + 15)) {
            if (this.playMode) {
                this.setCamera(this.preCamera);
                this.restore();
            } else {
                this.preCamera = this.getCamera();
                if (this.preCamera instanceof DelegateCamera) {
                    this.setCamera(this.preCamera.getBaseCamera());
                }
                this.saveData = this.getSaveData();
            }
            this.playMode = !this.playMode;
        }

        // test play
        if (this.playMode) {
            super.update(dt);
        } else if (!this.getEntities().find((it) => BaseUtil.implementsOf(it, IPlayable))) {
            this.updateBackground(dt);
            this.getCamera().update(0, 0, dt);
        } else {
            this.updateBackground(dt);
            this.updateCamera(dt);
        }

        // update editor
        const x = Input.mouse.getMouseX() - this.getCamera().baseX - this.getCamera().cameraX;
        const y = Input.mouse.getMouseY() - this.getCamera().baseY - this.getCamera().cameraY;
        // check camera position
        if (x + 32 >= -this.stage.camera.cameraX && x < this.stage.camera.screenWidth - this.stage.camera.cameraX && y + 32 >= -this.stage.camera.cameraY && y < this.stage.camera.screenHeight - this.stage.camera.cameraY) {
            // check background position
            if (0 <= x && x <= this.stageWidth && 0 <= y && y <= this.stageHeight) {
                this.editor.update(x, y, dt);
            }
        }
    }

    /**
     * Render stage
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        super.render(ctx, shiftX, shiftY);
        // render editor
        this.editor.render(ctx, this.getCamera().cameraX, this.getCamera().cameraY);
    }
}
/**
 * Editor stage manager
 * - Manages stage
 * - Uses the stack
 * - It can save data
 * - ### It can save the current stage
 * @extends {StackStageManager}
 * @implements {IEditorSave}
 * @classdesc Editor stage manager that can save the current stage
 */
class EditorStageManager extends StackStageManager /* , IEditorSave */ { // eslint-disable-line  no-unused-vars
    /**
     * Get json data for saving
     * @override
     * @return {JSON} Json data for saving
     */
    getSaveData() {
        const stage = this.getStage();
        if (BaseUtil.implementsOf(stage, IEditorSave)) {
            return stage.getSaveData();
        }
    }
}
/**
 * Editor tile
 * - Object present on the stage that has coordinate and size
 * - It can save data
 * - Stores ID
 * - ### Tile in editor
 * @extends {Entity}
 * @implements {IEditorEntity}
 * @implements {IEditorSave}
 * @classdesc Editor tile in editor
 */
class EditorTile extends Entity /* , IEditorEntity, IEditorSave */ { // eslint-disable-line  no-unused-vars
    /**
     * Editor tile constructor
     * @constructor
     * @param {Entity} entity Entity for saving
     * @param {JSON} deployData Entity deploy JSON data
     * @param {number} id Entity ID
     * @param {number} [autoTileBaseID=-1] Auto tile base ID
     */
    constructor(entity, deployData, id, autoTileBaseID = -1) {
        super();

        /**
         * Entity for saving
         * @protected
         * @type {Entity}
         */
        this.entity = entity;
        /**
         * Entity deploy JSON data
         * @protected
         * @type {JSON}
         */
        this.deployData = deployData;
        /**
         * Entity ID
         * @protected
         * @type {number}
         */
        this.id = id;
        /**
         * Auto tile base ID
         * @protected
         * @type {number}
         */
        this.autoTileBaseID = autoTileBaseID;
    }

    /**
     * Build base save data
     * @protected
     * @param {JSON} base Target data
     */
    buildBaseData(base) {
        base.id = this.id;
        base.x = this.entity.x;
        base.y = this.entity.y;
        base.z = this.entity.z;
    }

    /**
     * Build event save data
     * @protected
     * @param {JSON} base Target data
     */
    buildEventData(base) {
        if (BaseUtil.implementsOf(this.entity, IEventEntity)) {
            const event = this.entity.getEvent();
            if (event !== null && BaseUtil.implementsOf(event, IEditorSave)) {
                base.event = event.getSaveData();
            }
        }
    }

    /**
     * Get json data for saving
     * @override
     * @return {JSON} Json data for saving
     */
    getSaveData() {
        const ret = this.deployData;
        this.buildBaseData(ret);
        this.buildEventData(ret);
        return ret;
    }

    /**
     * Get entity getID
     * @override
     * @return {number} Entity ID
     */
    getID() {
        return this.id;
    }

    /**
     * Get entity
     * @override
     * @return {number} Entity
     */
    getEntity() {
        return this.entity;
    }

    /**
     * Whether it is auto tile or not
     * @abstract
     * @return {boolean} Whether it is auto tile or not
     */
    isAutoTile() {
        return this.getAutoTileBaseID() >= 0;
    }

    /**
     * Get auto tile base ID
     * @abstract
     * @returns {number} Auto tile base ID
     */
    getAutoTileBaseID() {
        return this.autoTileBaseID;
    }

    /**
     * Judge whether entity is same entity
     * @override
     * @param {Entity} entity Judging entity
     * @return {boolean} Whether entity is same entity
     */
    equals(entity) {
        return this.entity === entity;
    }

    /**
     * Judege whether entity is deployer
     * @override
     * @return {boolen} Whether entity is deployer
     */
    isDeployer() {
        return false;
    }

    /**
     * Set stage
     * @override
     * @param {Stage} stage  Stage instance
     */
    setStage(stage) {
        super.setStage(stage);
        this.entity.setStage(stage);
        this.stage = stage;
    }

    /**
     * Set entity position
     * @override
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} z Z position
     */
    setPosition(x, y, z) {
        super.setPosition(x, y, z);
        this.entity.setPosition(x, y, z);
    }

    /**
     * Set entity size
     * @override
     * @param {number} width Entity width
     * @param {number} height Entity height
     */
    setSize(width, height) {
        super.setSize(width, height);
        this.entity.setSize(width, height);
    }

    /**
     * Initialize entity
     * @override
     */
    init() {
        this.entity.init();
    }

    /**
     * Update entty
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        this.entity.update(dt);
    }

    /**
     * Render entity
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        this.entity.render(ctx, shiftX, shiftY);
    }
}
/**
 * Editable interface
 * - ### It can be edited by tile and entity information
 * @interface
 * @classdesc Editable interface that can be edited by tile and entity information
 */
class IEditable extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Set editor base
     * @abstract
     * @param {EditorBase} editor Editor base
     */
    setEditor(editor) {}

    /**
     * Set tile selection
     * @abstract
     * @param {ISelection} selection Tile selection
     */
    setTileSelection(selection) {}

    /**
     * Set entity selection
     * @abstract
     * @param {ISelection} selection Entity selection
     */
    setEntitySelection(selection) {}
}
/**
 * Editor save interface
 * - ### It can save data
 * @interface
 * @classdesc Editor save interface that can save data
 */
class IEditorSave extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Get json data for saving
     * @abstract
     * @return {JSON} Json data for saving
     */
    getSaveData() {}
}
/**
 * Editor entity factory
 * - Generates entity by ID
 * - Generates from JSON data
 * - Gets entity information
 * - ### Passes information
 * @extends {JSONEntityFactory}
 * @classdesc Editor entity factory to pass information
 */
class EditorEntityFactory extends JSONEntityFactory /* , IEditorInfo */ { // eslint-disable-line  no-unused-vars
    /**
     * Get tile information
     * @override
     * @return {Object<number, JSON>} Tile information
     */
    getTileInfo() {
        return this.tileInfo;
    }

    /**
     * Get entity information
     * @override
     * @return {Object<number, JSON>} Entity information
     */
    getEntityInfo() {
        return this.entityInfo;
    }

    /**
     * Build sirial chip data
     * @override
     * @protected
     * @param {JSON} data Target base json data
     * @param {JSON} chip Serial chip information
     */
    buildChipSerial(data, chip) {
        data.auto = chip.auto;
        data.autoID = chip.id;
    }

    /**
     * Create entity from factory data
     * @override
     * @param {Object} id ID for entity
     * @param {JSON} deploy Entity deploy json data
     * @return {Entity} Entity instance
     */
    createEntity(id, deploy) {
        let ret = super.createEntity(id, deploy);
        if (BaseUtil.implementsOf(ret, IEditorEntity)) {
            this.buildEvent(ret.getEntity(), deploy);
        }
        return ret;
    }
}
/**
 * Editor image builder
 * - Generates image from json data
 * - Generates normal image from json data
 * - ### Generates editor image
 * @extends {BaseImageBuilder}
 * @classdesc Editor image builder to generate edito image
 */
class EditorImageBuilder extends BaseImageBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Build image from json data
     * @override
     * @param {string} root File root path
     * @param {JSON} image Image json data
     * @return {GameImage} Maked image
     */
    build(root, image) {
        return new EditorImage(super.build(root, image), root);
    }
}
/**
 * Editor information interface
 * - ### Gets entity information
 * @interface
 * @classdesc Editor information interface to get information
 */
class IEditorInfo extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Get tile information
     * @abstract
     * @return {Object<number, JSON>} Tile information
     */
    getTileInfo() {}

    /**
     * Get entity information
     * @abstract
     * @return {Object<number, JSON>} Entity information
     */
    getEntityInfo() {}
}
/**
 * Editor world
 * - Performs a physical operation
 * - Registers entities and apply a physical operation
 * - Measure time for debugging by delegation
 * - It can save data
 * - ### Changes world type
 * @extends {DebugWorld}
 * @implements {IEditorSave}
 * @classdesc Editor world to chane world type
 */
class EditorWorld extends DebugWorld /* , IEditorSave */ { // eslint-disable-line  no-unused-vars
    /**
     * Get json data for saving
     * @override
     * @return {JSON} Json data for saving
     */
    getSaveData() {
        const ret = {};
        if (this.world instanceof SplitWorld) {
            ret.type = `split`;
        } else if (this.world instanceof SequentialWorld) {
            ret.type = `sequential`;
        } else if (this.world instanceof VariableGravityWorld) {
            ret.type = `gravity`;
            ret.gravity = [];
            for (let i = 0; i < this.world.gravityXs.length; ++i) {
                const data = {};
                data.x = this.world.gravityXs[i];
                data.y = this.world.gravityYs[i];
                data.delta = this.world.deltas[i];
                ret.gravity.push(data);
            }
        }
        return ret;
    }
}
/**
 * Selection interface
 * - ### Selects something and set selected
 * @interface
 * @classdesc Selection to select something and set selected
 */
class ISelection extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Set information for selection
     * @abstract
     * @param {JSON} info Selection information
     */
    setSelectionInfo(info) {}

    /**
     * Get selected ID
     * @abstract
     * @return {number} Selected ID (return -1 if not selected)
     */
    getSelected() {}
    /**
     * Set selected by ID
     * @abstract
     * @param {number} id Selected ID
     */
    setSelected(id) {}
}
/**
 * Link event
 * - Updates and renders event
 * - ### Link other page
 * @extends {GameEvent}
 * @classdesc Link event to link other page
 */
class LinkEvent extends GameEvent { // eslint-disable-line  no-unused-vars
    /**
     * Link event constructor
     * @constructor
     * @param {string} url Other page url
     */
    constructor(url) {
        super();

        /**
         * Other page url
         * @protected
         * @type {string}
         */
        this.url = url;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        this.op.next();
        if (Input.key !== null) {
            Input.key.clear();
        }
        if (Input.mouse !== null) {
            Input.mouse.clear();
        }
        window.open(this.url, `_blank`);
    }
}
/**
 * Text window event
 * - Updates and renders event
 * - Identified by name
 * - ### Render text and window
 * @extends {NamedEvent}
 * @classdesc Text window event to render text and window
 */
class TextWindowEvent extends NamedEvent { // eslint-disable-line  no-unused-vars
    /**
     * Text window event constructor
     * @constructor
     * @param {string} name Identified name
     * @param {number} x Text x position
     * @param {number} y Text y position
     * @param {string} sentence Talking sentence
     * @param {number} [size=-1] Font size
     */
    constructor(name, x, y, sentence, size = -1) {
        super(name);

        /**
         * Text x position
         * @protected
         * @type {number}
         */
        this.x = x;
        /**
         * Text y position
         * @protected
         * @type {number}
         */
        this.y = y;

        /**
         * Talking sentence
         * @protected
         * @type {string}
         */
        this.sentence = sentence;

        /**
         * Font size
         * @protected
         * @type {number}
         */
        this.size = size;

        /**
         * Show count
         * @@protected
         * @type {number}
         */
        this.showCount = 0;

        /**
         * Whether Showing is ended or not
         * @protected
         * @type {boolean}
         */
        this.ended = false;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        this.showCount = 0;
        this.ended = false;
        if (this.op !== null) {
            this.op.next();
        }
    }

    /**
     * Update event
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether update is endped or not
     */
    update(dt) {
        if (this.ended) {
            this.showCount -= dt / 200;
            if (this.showCount < 0) {
                this.showCount = 0;
                return true;
            }
        } else {
            this.showCount += dt / 1000;
            if (this.showCount > 1) {
                this.showCount = 1;
            }
            if (this.showCount === 1 && Input.key.isPressed(Input.key.yes())) {
                this.ended = true;
            }
        }
        return false;
    }

    /**
     * Render event
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        const id = ResourceManager.image.load(`window/win2.png`);
        const size = (this.size === -1 ? 25 : this.size) * this.showCount * this.showCount;
        const width = ctx.measureText(this.sentence, size);
        Util.renderWindow(ctx, id, this.x - (width + 64) / 2, this.y - (64 + size) / 2, width + 64, 64 + size);
        ctx.fillText(this.sentence, this.x, this.y, 0.5, 0.5, size);
    }
}
/**
 * Camera change event
 * - Updates and renders event
 * - Controls the stage
 * - Stores stage instance
 * - ### Changes camera type
 * @extends {StageEvent}
 * @classdesc Camera change event to change camera type
 */
class CameraChangeEvent extends StageEvent { // eslint-disable-line  no-unused-vars
    /**
     * Camera change event constructor
     * @constructor
     * @param {string} type Camera type
     * @param {boolean} [isMoving=false] Whehter camera can move or not
     * @param {boolean} [isCliping=false] Whehter camera can clip or not
     */
    constructor(type, isMoving = false, isCliping = false) {
        super();

        /**
         * Camera type
         * @protected
         * @type {string}
         */
        this.type = type;
        /**
         * Whehter camera can move or not
         * @protected
         * @type {boolean}
         */
        this.isMoving = isMoving;
        /**
         * Whehter camera can clip or not
         * @protected
         * @type {boolean}
         */
        this.isCliping = isCliping;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        let camera = null;
        if (this.type === `center`) {
            camera = new CenterCamera();
        }
        if (this.isCliping) {
            camera = new ClipCamera(camera);
        }
        if (this.isMoving) {
            camera = new MovingCamera(camera);
        }
        const old = this.stage.getCamera();
        camera.setScreenSize(old.screenWidth, old.screenHeight);
        camera.setMaxSize(old.maxWidth, old.maxHeight);
        this.stage.setCamera(camera);
        this.op.next();
    }
}
/**
 * Physical change event
 * - Updates and renders event
 * - Controls the stage
 * - Stores stage instance
 * - ### Changes physical type
 * @extends {StageEvent}
 * @classdesc Physical change event to change physical type
 */
class PhysicalChangeEvent extends StageEvent { // eslint-disable-line  no-unused-vars
    /**
     * Physical change event constructor
     * @constructor
     * @param {CollisionResponse} response Response for collision
     */
    constructor(response) {
        super();

        /**
         * Response for collision
         * @protected
         * @type {CollisionResponse}
         */
        this.response = response;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        this.stage.getPhysicalWorld().setResponse(this.response);
        this.op.next();
    }
}
/**
 * Simple event builder
 * - Generates event from json data
 * - Generate simple event
 * - ### Gemerates under event
 * @extends {SimpleEventBuilder}
 * @classdesc Simple event builder to generate simple event
 */
class UnderEventBuilder extends SimpleEventBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Make event
     * @protected
     * @param {JSON} event Event json data
     * @return {Event} Event
     */
    makeEvent(event) {
        switch (event.type) {
            case `talkwindow`:
                return new TextWindowEvent(event.name, event.x, event.y, event.sentence, event.size);
            case `changeCamera`:
                return new CameraChangeEvent(event.camera, event.moving, event.cliping);
            case `changePhysical`:
                let response = null;
                switch (event.physical) {
                    case `under`:
                        response = new UnderRepulsionResponse();
                        break;
                    case `repulsion`:
                        response = new RepulsionResponse();
                        break;
                    case `impulse`:
                        response = new ImpulseBasedResponse();
                        break;
                }
                return new PhysicalChangeEvent(response);
            case `link`:
                return new LinkEvent(event.url);
            default:
                return super.makeEvent(event);
        }
    }
}
/**
 * Main game engine builder
 * - Performs initial construction of the game engine
 * - Generates all necessary instances
 * - ### Generates unique instance
 * @extends {UnderEngineBuilder}
 * @classdesc Main game engine builder to perform initial construction of the game engine
 */
class MainBuilder extends UnderEngineBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Make input system
     * @override
     * @protected
     * @return {Input} Input system
     */
    makeInput() {
        return new PreventKeyInput();
    }
}
/**
 * UI layer
 * - Performs drawing processing collectively
 * - ### Display UI
 * @extends {Layer}
 * @classdesc UI layer to display UI
 */
class UILayer extends Layer { // eslint-disable-line  no-unused-vars
    /**
     * UI layer constructor
     * @constructor
     * @param {Stage} stage Stage instance
     */
    constructor(stage) {
        super();
        /**
         * Stage instance
         * @protected
         * @type {Stage}
         */
        this.stage = stage;
        /**
         * Damagable player instance
         * @protected
         * @type {IDamagable}
         */
        this.player = null;
        /**
         * Player hit point
         * @protected
         * @type {number}
         */
        this.playerHP = 0;

        /**
         * UI Image
         * @protected
         * @type {NamedAnimation}
         */
        this.uiAnimation = new MultiNamedAnimation();
    }

    /**
     * Initialize scene
     * @override
     */
    init() {
        // find player
        this.player = this.stage.getEntities().find((it) => BaseUtil.implementsOf(it, IPlayable) && BaseUtil.implementsOf(it, IDamagable));
        this.playerHP = this.player.getHP();

        // load animation
        const uiImage = ResourceManager.image.load(`ui/hp.png`);
        for (let i = 0; i < 6; ++i) {
            this.uiAnimation.setName(`${3 - (Math.floor(i / 2) % 4)}-${3 - (Math.floor((i + 1) / 2) % 4)}`);
            this.uiAnimation.setAnimation(new SingleAnimation(i % 2 === 0));
            if (i !== 5) {
                for (let j = 0; j < 4; ++j) {
                    this.uiAnimation.addAnimation(new TileImage(uiImage, 64, 64, 32 * j, 32 * i, 32, 32), i % 2 === 0 ? 300 : 200);
                }
            } else {
                for (let j = 0; j < 8; ++j) {
                    this.uiAnimation.addAnimation(new TileImage(uiImage, 64, 64, 32 * (j % 4), 32 * (i + Math.floor(j / 4)), 32, 32), 200);
                }
            }
        }
        this.uiAnimation.setName(`${this.player.getHP()}-${this.player.getHP()}`);
        this.uiAnimation.init();
    }

    /**
     * Update layer
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        // Check hp change
        const diff = this.playerHP - this.player.getHP();
        if (diff !== 0 && (this.uiAnimation.isEnded() || this.uiAnimation.isLoop())) {
            // decreasing animation
            this.uiAnimation.setName(`${this.playerHP}-${this.playerHP - Math.sign(diff)}`);
            this.uiAnimation.init();
            this.playerHP = this.playerHP - Math.sign(diff);
        } else if (this.playerHP > 0 && diff === 0 && (this.uiAnimation.isEnded() && !this.uiAnimation.isLoop())) {
            // transition to normal animation
            this.uiAnimation.setName(`${this.playerHP}-${this.playerHP}`);
            this.uiAnimation.init();
        }
        // animation
        this.uiAnimation.update(dt);
    }

    /**
     * Render layer
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        this.uiAnimation.render(ctx, this.x + 10, this.y + 530);
    }
}
/**
 * Title Scene
 * - Controls updating and rendering
 * - ### Display title image
 * @extends {Scene}
 * @classdesc Title scene to display title image
 */
class TitleScene extends Scene { // eslint-disable-line  no-unused-vars
    /**
     * Title scene constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Title image id
         * @private
         * @type {GameImage}
         */
        this._title = null;
    }

    /**
     * Initialize scene
     * @override
     */
    init() {
        this._title = new SingleImage(ResourceManager.image.load(`ui/title.png`), 370, 120);
        this._title.init();
    }

    /**
     * Update scene
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        this._title.update(dt);
        if (Input.key.isPress(Input.key.yes())) {
            SceneManager.it.replaceScene(new GameScene());
        }
    }

    /**
     * Render scene
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        this._title.render(ctx, 215, 240);
    }
}
/**
 * Movable state interface
 * - ### Sets max velocity and move power for moving
 * @interface
 * @classdesc Movable state interface to set max velocity and move power
 */
class IMovableState extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Get max velocity of x
     * @abstract
     * @return {number} Max velocity of x
     */
    get maxVX() {}

    /**
     * Get max velocity of y
     * @abstract
     * @return {number} Max velocity of y
     */
    get maxVY() {}

    /**
     * Get power of x
     * @abstract
     * @return {number} Power of x
     */
    get movePX() {}

    /**
     * Get power of y
     * @abstract
     * @return {number} Power of y
     */
    get movePY() {}

    /**
     * Set max velocity
     * @abstract
     * @param {number} maxVelocityX The max velocity of x direction
     * @param {number} maxVelocityY The max velocity of y direction
     */
    setMaxVelocity(maxVelocityX, maxVelocityY) {}

    /**
     * Set moving power
     * @abstract
     * @param {number} movePowerX The power of x direction
     * @param {number} movePowerY The power of y direction
     */
    setMovePower(movePowerX, movePowerY) {}
}
/**
 * Prepare state interface
 * - ### Sets the power to be applied and the magnification of the elapsed speed of the preparation time
 * @interface
 * @classdesc Prepare state interface to set the applied power and the magnification of preparation time
 */
class IPrepareState extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Set the magnification of the elapsed speed of the preparation time
     * @abstract
     * @param {number} val The magnification of the elapsed speed of the preparation time
     */
    set speedMagnification(val) {}

    /**
     * Set the power to be applied
     * @abstract
     * @param {number} val The power to be applied
     */
    set appliedPower(val) {}

    /**
     * Get the magnification of the elapsed speed of the preparation time
     * @abstract
     * @return {number} The magnification of the elapsed speed of the preparation time
     */
    get speedMagnification() {}

    /**
     * Get the power to be applied
     * @abstract
     * @return {number} The power to be applied
     */
    get appliedPower() {}
}
/**
 * Hooking state
 * - Determines the operation by AI according to the state and renders based on state
 * - ### Hook condition before collision to create post hook
 * @extends {State}
 * @classdesc Hooking state before collision to create post hook
 */
class HookingState extends State { // eslint-disable-line  no-unused-vars
    /**
     * Hooking state
     * @constructor
     */
    constructor() {
        super();

        /**
         * Hook for getting hook information
         * @protected
         * @type {IHook}
         */
        this.hook = null;
    }

    /**
     * Initialize
     * @override
     */
    init() {
        if (BaseUtil.implementsOf(this.entity, IHook)) {
            this.hook = this.entity;
        }
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        if (this.hook !== null) {
            this.hook.createPost();
        }
        return true;
    }
}
/**
 * Hook released state
 * - Determines the operation by AI according to the state and renders based on state
 * - ### Hook condition after released
 * @extends {State}
 * @classdesc Hook released state after released
 */
class HookReleasedState extends State { // eslint-disable-line  no-unused-vars
    /**
     * Hook released state
     * @constructor
     * @param {IHook} hook Hook for getting hook information
     */
    constructor(hook) {
        super();

        /**
         * Hook for getting hook information
         * @protected
         * @type {IHook}
         */
        this.hook = null;
    }

    /**
     * Initialize
     * @override
     */
    init() {
        if (BaseUtil.implementsOf(this.entity, IHook)) {
            this.hook = this.entity;
        }
    }
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // check hook
        if (this.hook === null) {
            return true;
        }

        // check collisions
        for (const it of this.entity.collider.collisions) {
            const you = Util.getCollidedEntity(this.entity, it);
            if (you === this.hook.getActor()) {
                this.hook.tryRemove();
                break;
            }
        }
        return true;
    }
}
/**
 * Hook state AI
 * - Determines the behavior of an entity
 * - Determines by state
 * - Manages state by name
 * - ### Indicates hooking and released state
 * @extends {NamedStateAI}
 * @classdesc Hook state AI to indicate hooked and released state
 */
class HookStateAI extends NamedStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Hook State AI Constructor
     * @constructor
     */
    constructor() {
        super(`hooking`);

        this.namedStates[`hooking`] = new HookingState();
        this.namedStates[`released`] = new HookReleasedState();
    }
}
/**
 * Transferable state
 * - Determines the operation by AI according to the state and renders based on state
 * - Enable to set animation
 * - Initialize state image
 * - ### Basic information can be transferred to another state
 * @interface
 * @extends {BaseState}
 * @classdesc Transferable state to transfer information to another state
 */
class TransferableState extends BaseState { // eslint-disable-line  no-unused-vars
    /**
     * Transfer information to another state
     * @param {TransferableState} state Where to give information
     */
    transfer(state) {}
}
/**
 * Transferable state AI
 * - Determines the behavior of an entity
 * - Determines by state
 * - Manages state by name
 * - ### Basic information can be transferred to another state AI
 * @interface
 * @extends {NamedStateAI}
 * @classdesc Transferable state AI to transfer information to another state AI
 */
class TransferableStateAI extends NamedStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Transfer information to another state AI
     * @param {TransferableStateAI} state Where to give information
     */
    transfer(state) {
        for (const name in this.namedStates) {
            if (this.namedStates.hasOwnProperty(name)) {
                const other = state.namedStates[name];
                if (other instanceof TransferableState) {
                    // transfer state
                    this.namedStates[name].transfer(other);
                }
            }
        }
        // set same state
        state.stateName = this.stateName;
    }
}
/**
 * Hook interface
 * - ### It can get hook position and change state
 * @interface
 * @classdesc Hook interface that can get hook position and change state
 */
class IHook extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Get actor who it belongs to
     * @abstract
     * @return {Entity} Actor who it belongs to
     */
    getActor() {}

    /**
     * Create post hook (Do not create it if it already exists)
     * @abstract
     */
    createPost() {}

    /**
     * Hooked hook
     * @abstract
     */
    hooked() {}

    /**
     * Release hook
     * @abstract
     */
    release() {}

    /**
     * Try to remove it
     * @abstract
     * @return {boolean} Whether it was removed
     */
    tryRemove() {}

    /**
     * Whether the tip of the hook
     * @abstract
     * @return {boolean} Whether the tip of the hook
     */
    isHead() {}
}
/**
 * Terrain interface
 * - ### It can be gotten terrain ID
 * @interface
 * @classdesc Terrain interface that can be gotten terrain ID
 */
class ITerrain extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Get terrain ID
     * @abstract
     * @return {number} Terrain ID
     */
    getTerrainID() {}
}
/**
 * Immutable event object
 * - Object present on the stage that has coordinate and size
 * - Manages image
 * - Show sign
 * - ### Show sign text
 * @extends {SignObject}
 * @classdesc Immutable event object to show sign text
 */
class TextSignObject extends SignObject { // eslint-disable-line  no-unused-vars
    /**
     * Influential event object constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Sign text
         * @protected
         * @type {string}
         */
        this.signText = ``;

        /**
         * Sign text size
         * @protected
         * @type {number}
         */
        this.size = 0;

        /**
         * Whether sign text has already exists
         * @protected
         * @type {boolean}
         */
        this.isExec = false;
    }

    /**
     * Set sign information
     * @param {number} x Sign relative x position
     * @param {number} y Sign relative y position
     * @param {number} size Sign text size
     * @param {string} text Sign text
     */
    setSign(x, y, size, text) {
        super.setSign(null, x, y);
        this.size = size;
        this.signText = text;
    }

    /**
     * Initialize entity
     * @override
     */
    init() {
        super.init();
        this.textWindow = new TextWindowEvent(this.signText, this.x + this.signX, this.y + this.signY, this.signText, this.size);
    }

    /**
     * Update entty
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        super.update(dt);
        if (this.isShowSign && !this.isExec) {
            this.textWindow.init();
        }
        if (this.isShowSign) {
            Input.key.blockInput(Input.key.sub());
            this.textWindow.update(dt);
            Input.key.unblockInput(Input.key.sub());
        }
        if (!this.isShowSign && this.isExec) {
            Input.key.unblockInput(Input.key.sub());
        }
        this.isExec = this.isShowSign;
    }
    /**
     * Render entity
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        super.render(ctx, shiftX, shiftY);
        this.textWindow.x = this.x + this.signX + shiftX;
        this.textWindow.y = this.y + this.signY + shiftY;
        if (this.isShowSign) {
            this.textWindow.render(ctx);
        }
    }
}
/**
 * Under stage parser to generate stage
 * - Generates a stage from a file
 * - Parses JSON file
 * - ### Set original response
 * - ### Set unique builder by default
 * @extends {JSONStageParser}
 * @classdesc Under stage parser to set original response and unique builder by default
 */
class UnderStageParser extends JSONStageParser { // eslint-disable-line  no-unused-vars
    /**
     * Make entity factory
     * @override
     * @protected
     * @param {JSON} stage Stage json data
     * @return {EntityFactory} Entity factory
     */
    makeEntityFactory(stage) {
        const ret = new JSONEntityFactory(new UnderTileBuilder(), new UnderCharacterBuilder(), new UnderEventBuilder());
        for (const it of stage.tiles) {
            ret.addTileInfo(JSON.parse(Util.loadFile(`src/res/stage/${it}`)));
        }
        for (const it of stage.entities) {
            ret.addEntityInfo(JSON.parse(Util.loadFile(`src/res/stage/${it}`)));
        }
        return ret;
    }

    /**
     * Make physical response
     * @override
     * @protected
     * @return {CollisionResponse} Physical response
     */
    makePhysicalResponse() {
        return new UnderRepulsionResponse();
    }
}
/**
 * Under tile builder
 * - Generates entity from json data
 * - Generate tile from json data
 * - ### Generates unique tile object
 * @extends {TileBuilder}
 * @classdesc Under tile builder to generates unique tile object
 */
class UnderTileBuilder extends TileBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Make base collider
     * @protected
     * @param {JSON} collider Collider information json data
     * @return {Collider} Collider
     */
    makeCollider(collider) {
        if (collider !== undefined && collider.excluded) {
            switch (collider.type) {
                case `Rectangle`:
                    return new ExcludedRectangleCollider(collider.startX, collider.startY, collider.width, collider.height, collider.id);
                case `RoundRectangle`:
                    return new ExcludedRoundRectangleCollider(collider.startX, collider.startY, collider.width, collider.height, collider.cut, collider.id);
            }
        }
        return super.makeCollider(collider);
    }

    /**
     * Make underlying tile object
     * @override
     * @protected
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} tile Tile information json data
     * @return {Entity} Underlying tile object
     */
    makeTileBase(deploy, tile) {
        switch (tile.type) {
            case undefined:
                return new UnderTileObject(tile.terrain);
            default:
                return super.makeTileBase(deploy, tile);
        }
    }
}
/**
 * String interface
 * - ### It can add or remove rigid body
 * @interface
 * @classdesc String interface that can add or remove rigid body
 */
class IString extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Get string length
     * @abstract
     * @return {number} String length
     */
    getLength() {}

    /**
     * Get body list
     * @abstract
     * @return {Array<RigidBody>} Body list
     */
    getBodies() {}

    /**
     * Add entity for string
     * @abstract
     * @param {RigidBody} jointing Jointing body
     * @param {number} jointingX Jointing x position
     * @param {number} jointingY Jointing y position
     * @param {number} length Jointing length
     */
    addBody(jointing, jointingX, jointingY, length) {}

    /**
     * Remove body from string
     * @abstract
     * @param {RigidBody} body Joiting body
     */
    removeBody(body) {}
}
/**
 * String body
 * - Update entity by physical quantity
 * - It can add or remove rigid body
 * - ### Connects all rigid bodies and processes them all together
 * @extends {RigidBody}
 * @implements {IString}
 * @classdesc String body to connect all rigid bodies and process them all together
 */
class StringBody extends RigidBody /* , IString */ { // eslint-disable-line  no-unused-vars
    /**
     * String body constructor
     * @constructor
     * @param {RigidBody} body Original body for delegation
     * @param {number} jointingX Jointing x position
     * @param {number} jointingY Jointing y position
     * @param {number} length Jointing length
     * @param {number} k String power
     * @param {number} count String loop count
     */
    constructor(body, jointingX, jointingY, length, k, count) {
        super();

        /**
         * Original body for delegation
         * @protected
         * @type {RigidBody}
         */
        this.body = body;

        /**
         * Jointing body list
         * @protected
         * @type {Array<RigidBody>}
         */
        this.jointingList = [];
        /**
         * Jointing x position list
         * @protected
         * @type {Array<number>}
         */
        this.jointingXList = [];
        /**
         * Jointing y position list
         * @protected
         * @type {Array<number>}
         */
        this.jointingYList = [];
        /**
         * Jointing length list
         * @protected
         * @type {Array<number>}
         */
        this.jointingLengthList = [];

        /**
         * Jointing body enable list
         * @protected
         * @type {Array<boolean>}
         */
        this.enableList = [];

        /**
         * String power
         * @protected
         * @type {number}
         */
        this.k = k;
        /**
         * String loop count
         * @protected
         * @type {number}
         */
        this.count = count;

        // initialize
        this.jointingList.push(body);
        this.jointingXList.push(jointingX);
        this.jointingYList.push(jointingY);
        this.jointingLengthList.push(length);
    }

    /**
     * Get horizontal velocity of entity
     * @override
     * @return {number} Horizontal velocity of entity
     */
    get velocityX() {
        return this.body.velocityX;
    }

    /**
     * Get vertical velocity of entityD
     * @override
     * @return {number} Vertical velocity of entityD
     */
    get velocityY() {
        return this.body.velocityY;
    }

    /**
     * Get horizontal acceleration of entity
     * @override
     * @return {number} Horizontal acceleration of entity
     */
    get accelerationX() {
        return this.body.accelerationX;
    }

    /**
     * Get vertical acceleration of entity
     * @override
     * @return {number} Vertical acceleration of entity
     */
    get accelerationY() {
        return this.body.accelerationY;
    }

    /**
     * Set mutable entity
     * @override
     * @param {MutableEntity} entity Mutable entity
     */
    setEntity(entity) {
        super.setEntity(entity);
        this.body.setEntity(entity);
    }

    /**
     * Set rigid material
     * @override
     * @param {RigidMaterial} material Rigid material
     */
    setMaterial(material) {
        super.setMaterial(material);
        this.body.setMaterial(material);
    }

    /**
     * Reset rigid body state
     * @override
     */
    reset() {
        super.reset();
        this.body.reset();
    }

    /**
     * Set the value added to the next speed vector
     * @override
     * @param {number} vx X component of the velocity vector to be added
     * @param {number} vy Y component of the velocity vector to be added
     */
    setNextAddVelocity(vx, vy) {
        this.body.setNextAddVelocity(vx, vy);
    }

    /**
     * Apply force to objects
     * @override
     * @param {number} forceX Force in x direction
     * @param {number} forceY Force in y direction
     */
    enforce(forceX, forceY) {
        this.body.enforce(forceX, forceY);
    }

    /**
     * Initialize body
     * @override
     */
    init() {
        this.body.init();
    }

    /**
     * Prepare for updagte
     * @override
     * @param {number} dt delta time
     */
    prepare() {
        for (let i = 0; i < this.jointingList.length; ++i) {
            const it = this.jointingList[i];
            this.enableList[i] = it.enable;
            it.enable = false;
        }
    }

    /**
     * Update by rigid body
     * @override
     * @param {number} dt delta time
     */
    update(dt) {
        if (!this.enable) {
            return;
        }
        // initialize
        const collisions = [];
        // set constant value
        const listLength = this.jointingLengthList.length;
        const milisec = dt / 1000;
        const milisec2 = milisec * milisec;
        const elim = 1;
        // generate element
        const world = this.entity.stage.getPhysicalWorld();
        // generate list
        const dxList = new Array(listLength);
        const dyList = new Array(listLength);
        const willXList = [];
        willXList.push(new Array(listLength));
        willXList.push(new Array(listLength));
        const willYList = [];
        willYList.push(new Array(listLength));
        willYList.push(new Array(listLength));
        const pxList = new Array(listLength);
        const pyList = new Array(listLength);
        const movedList = new Array(listLength);
        const xRepulsionList = new Array(listLength);
        const yRepulsionList = new Array(listLength);
        // initialize
        for (let i = 0; i < listLength; ++i) {
            const it = this.jointingList[i];
            // update information
            if (this.enableList[i]) {
                it.updateInfo(dt);
                it.updateVelocity(dt);
                it.updateEntity(dt);
            }
            // initialize list
            dxList[i] = it.entity.directionX >= 0 ? this.jointingXList[i] : it.entity.width - this.jointingXList[i];
            dyList[i] = it.entity.directionY >= 0 ? this.jointingYList[i] : it.entity.height - this.jointingYList[i];
            willXList[1][i] = it.entity.x + dxList[i];
            willYList[1][i] = it.entity.y + dyList[i];
            pxList[i] = 0;
            pyList[i] = 0;
            xRepulsionList[i] = false;
            yRepulsionList[i] = false;
            // check collision
            if (this.enableList[i]) {
                const data = world.getCollisionData(it.entity.collider);
                for (const col of data) {
                    if (!col.colliding.collider.isResponse(col.collided.collider) || !col.collided.collider.isResponse(col.colliding.collider)) {
                        continue;
                    }
                    // push back
                    willXList[1][i] -= col.nx * col.depth;
                    willYList[1][i] -= col.ny * col.depth;
                    // repulsion
                    if (it.velocityX * col.nx + it.velocityY * col.ny > 0) {
                        if (!xRepulsionList[i]) {
                            pxList[i] -= col.nx * it.entity.material.mass * Math.abs(it.velocityX) / milisec / 2;
                            xRepulsionList[i] = col.nx !== 0;
                        }
                        if (!yRepulsionList[i]) {
                            pyList[i] -= col.ny * it.entity.material.mass * Math.abs(it.velocityY) / milisec / 2;
                            yRepulsionList[i] = col.ny !== 0;
                        }
                    }
                    collisions.push(col);
                }
                // correct
                it.entity.deltaMove(willXList[1][i] - it.entity.x - dxList[i], willYList[1][i] - it.entity.y - dyList[i]);
            }
            // decide position
            willXList[0][i] = willXList[1][i];
            willYList[0][i] = willYList[1][i];
        }
        // repeat move
        let isLoop = true;
        for (let count = 0; count < this.count && isLoop; count += listLength) {
            isLoop = false;
            for (let i = 0; i < listLength - 1; ++i) {
                // check length
                const length = this.jointingLengthList[i + 1] + this.jointingLengthList[i];
                const dx = willXList[0][i + 1] - willXList[0][i];
                const dy = willYList[0][i + 1] - willYList[0][i];
                const d2 = dx * dx + dy * dy;
                if ((d2 - length * length) < elim || d2 === 0) {
                    continue;
                }
                // set power
                const m1 = this.jointingList[i].entity.material.mass;
                const m2 = this.jointingList[i + 1].entity.material.mass;
                const d = Math.sqrt(d2);
                const power = (d - length) * this.k;
                const px = power * dx / d;
                const py = power * dy / d;
                // move by power
                if (this.enableList[i]) {
                    willXList[1][i] += px * milisec2 / m1;
                    willYList[1][i] += py * milisec2 / m1;
                    movedList[i] = true;
                }
                if (this.enableList[i + 1]) {
                    willXList[1][i + 1] -= px * milisec2 / m2;
                    willYList[1][i + 1] -= py * milisec2 / m2;
                    movedList[i + 1] = true;
                }
                // register force
                pxList[i] += px;
                pyList[i] += py;
                pxList[i + 1] -= px;
                pyList[i + 1] -= py;
                // set moved
                isLoop = true;
            }
            // move and check collision
            for (let i = 0; i < listLength; ++i) {
                if (movedList[i]) {
                    const it = this.jointingList[i];
                    // move
                    it.entity.deltaMove(willXList[1][i] - it.entity.x - dxList[i], willYList[1][i] - it.entity.y - dyList[i]);
                    // check collision
                    const data = world.getCollisionData(it.entity.collider);
                    for (const col of data) {
                        if (!col.colliding.collider.isResponse(col.collided.collider) || !col.collided.collider.isResponse(col.colliding.collider)) {
                            continue;
                        }
                        // push back
                        willXList[1][i] -= col.nx * col.depth;
                        willYList[1][i] -= col.ny * col.depth;
                        // repulsion
                        if (it.velocityX * col.nx + it.velocityY * col.ny > 0) {
                            if (!xRepulsionList[i]) {
                                pxList[i] -= col.nx * it.entity.material.mass * Math.abs(it.velocityX) / milisec / 2;
                                xRepulsionList[i] = col.nx !== 0;
                            }
                            if (!yRepulsionList[i]) {
                                pyList[i] -= col.ny * it.entity.material.mass * Math.abs(it.velocityY) / milisec / 2;
                                yRepulsionList[i] = col.ny !== 0;
                            }
                        }
                        collisions.push(col);
                    }
                    // decide position
                    willXList[0][i] = willXList[1][i];
                    willYList[0][i] = willYList[1][i];
                }
                movedList[i] = false;
            }
        }
        // cleaunp and update velocity
        for (let i = 0; i < listLength; ++i) {
            const it = this.jointingList[i];
            it.cleanup(dt);
            if (this.enableList[i]) {
                it.enforce(pxList[i], pyList[i]);
                it.updateVelocity(dt);
                it.cleanup(dt);
            }
            // clear collision data
            it.entity.collider.clear();
        }
        // update collision data
        for (const it of collisions) {
            it.colliding.collider.addCollision(it);
            it.collided.collider.addCollision(it);
        }
    }

    /**
     * Cleanup body information
     * @override
     * @param {nuumber} dt Delta time
     */
    cleanup(dt) {
        for (let i = 0; i < this.jointingList.length; ++i) {
            const it = this.jointingList[i];
            it.enable = this.enableList[i];
        }
    }
    /**
     * Get string length
     * @override
     * @return {number} String length
     */
    getLength() {
        return this.jointingLengthList[this.jointingLengthList.length - 1];
    }

    /**
     * Get body list
     * @override
     * @return {Array<RigidBody>} Body list
     */
    getBodies() {
        return this.jointingList;
    }

    /**
     * Add entity for string
     * @override
     * @param {RigidBody} jointing Jointing body
     * @param {number} jointingX Jointing x position
     * @param {number} jointingY Jointing y position
     * @param {number} length Jointing length
     */
    addBody(jointing, jointingX, jointingY, length) {
        this.jointingList.push(jointing);
        this.jointingXList.push(jointingX);
        this.jointingYList.push(jointingY);
        this.jointingLengthList.push(length);
        this.enableList.push(jointing.enable);
    }

    /**
     * Remove body from string
     * @override
     * @param {RigidBody} body Joiting body
     */
    removeBody(body) {
        const index = this.jointingList.indexOf(body);
        if (index >= 0) {
            this.jointingList.splice(index, 1);
            this.jointingXList.splice(index, 1);
            this.jointingYList.splice(index, 1);
            this.jointingLengthList.splice(index, 1);
            this.enableList.splice(index, 1);
        }
    }
}
/**
 * Excluded rectangle collider
 * - Store collider data for judgeing collision
 * - Makes a collision judgment considered to be rectangle
 * - Acquire the ID of the exclusion target
 * - ### Excludes some colliders
 * @extends {RectangleCollider}
 * @implements {IExclude}
 * @classdesc Excluded rectangle collider to exclude some colliders
 */
class ExcludedRectangleCollider extends RectangleCollider /* , IExclude */ { // eslint-disable-line  no-unused-vars
    /**
     * Excluded rectangle collider constructor
     * @constructor
     * @param {number} startX X coordinate of upper left corner of rectangle
     * @param {number} startY Y coordinate of upper left corner of rectangle
     * @param {number} width Width of rectangle
     * @param {number} height Height of rectangle
     * @param {number} targetID Excluded target ID
     */
    constructor(startX, startY, width, height, targetID) {
        super(startX, startY, width, height);

        /**
         * Excluded target ID
         * @protected
         * @type {number}
         */
        this.targetID = targetID;
    }

    /**
     * Get excluded target ID
     * @override
     * @type {number}
     */
    getTargetID() {
        return this.targetID;
    }

    /**
     * Set whether to perform collision response or not
     * @override
     * @param {Colllder} collider Target collider
     * @return {boolean} whether to perform collision response or not
     */
    isResponse(collider) {
        return super.isResponse() && (!BaseUtil.implementsOf(collider, IExclude) || !this.targetID === collider.getTargetID());
    }
}
/**
 * Excluded round rectangle collider
 * - Store collider data for judgeing collision
 * - Makes a collision judgment considered to be rectangle
 * - Makes a collision judgment considered to be rectangle taken a horn
 * - Acquire the ID of the exclusion target
 * - ### Excludes some colliders
 * @extends {RoundRectangleCollider}
 * @implements {IExclude}
 * @classdesc Excluded round rectangle collider to exclude some collider
 */
class ExcludedRoundRectangleCollider extends RoundRectangleCollider /* , IExclude */ { // eslint-disable-line  no-unused-vars
    /**
     * Excluded round rectangle collider constructor
     * @constructor
     * @param {number} startX X coordinate of upper left corner of rectangle
     * @param {number} startY Y coordinate of upper left corner of rectangle
     * @param {number} width Width of rectangle
     * @param {number} height Height of rectangle
     * @param {number} cut Amount of taken horn
     * @param {number} targetID Excluded target ID
     */
    constructor(startX, startY, width, height, cut, targetID) {
        super(startX, startY, width, height, cut);

        /**
         * Excluded target ID
         * @protected
         * @type {number}
         */
        this.targetID = targetID;
    }

    /**
     * Get excluded target ID
     * @override
     * @type {number}
     */
    getTargetID() {
        return this.targetID;
    }

    /**
     * Set whether to perform collision response or not
     * @override
     * @param {Colllder} collider Target collider
     * @return {boolean} whether to perform collision response or not
     */
    isResponse(collider) {
        return super.isResponse() && (!BaseUtil.implementsOf(collider, IExclude) || !this.targetID === collider.getTargetID());
    }
}
/**
 * Exclude interface
 * - ### Acquire the ID of the exclusion target
 * @interface
 * @classdesc Exclude interface to acquire the ID of the exclusion target
 */
class IExclude extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Get excluded target ID
     * @abstract
     * @type {number}
     */
    getTargetID() {}
}
/**
 * Replusion collision response
 * Performs collision response by replusion
 * @extends {CollisionResponse}
 * @classdesc Collision response to performs collision response by replusion
 */
class UnderRepulsionResponse extends CollisionResponse { // eslint-disable-line  no-unused-vars
    /**
     * Perform collision response
     * @param {CollisionData} data Collision data
     * @param {number} dt delta time
     */
    collisionResponse(data, dt) {
        // set data
        const e1 = data.colliding;
        const e2 = data.collided;
        const b1 = e1.body;
        let b2 = null;
        const nx = data.nx;
        const ny = data.ny;
        const d = data.depth;
        // only push back if not actively colliding
        if (b1.velocityX * nx + b1.velocityY * ny <= 0) {
            if (d < 1.0e-4) {
                return;
            }
            if (e2 instanceof MutableEntity) {
                const nm1 = d / 5;
                const n1x = -nx * nm1;
                const n1y = -ny * nm1;
                const nm2 = d / 100;
                const n2x = nx * nm2;
                const n2y = ny * nm2;
                // push back
                let i = 0;
                while (i++ < 10 && e1.collider.isCollision(e2.collider)) {
                    e1.deltaMove(n1x, n1y);
                    e2.deltaMove(n2x, n2y);
                }
            } else {
                // push back
                let i = 0;
                const n1x = -nx * d / 10;
                const n1y = -ny * d / 10;
                while (i++ < 10 && e1.collider.isCollision(e2.collider)) {
                    e1.deltaMove(n1x, n1y);
                }
            }
            return;
        }

        // replusion calculate
        let vdx1 = 0;
        let vdy1 = 0;
        let vdx2 = 0;
        let vdy2 = 0;
        if (e2 instanceof MutableEntity) {
            b2 = e2.body;
            const dot1 = b1.velocityX * nx + b1.velocityY * ny;
            const dot2 = b2.velocityX * nx + b2.velocityY * ny;
            const v1x = dot1 * nx;
            const v1y = dot1 * ny;
            const v2x = dot2 * nx;
            const v2y = dot2 * ny;
            const v1 = v1x * v1x + v1y * v1y;
            const v2 = v2x * v2x + v2y * v2y;
            // push back
            if (d > 1.0e-4) {
                let i = 0;
                const nm1 = d / 5;
                const n1x = -nx * nm1;
                const n1y = -ny * nm1;
                const nm2 = d / 100;
                const n2x = b2.isFixX ? 0 : nx * nm2;
                const n2y = b2.isFixY ? 0 : ny * nm2;
                while (i++ < 10 && e1.collider.isCollision(e2.collider)) {
                    e1.deltaMove(n1x, n1y);
                    e2.deltaMove(n2x, n2y);
                }
                // player -> mutable -> immutable
                // 1. mutable -> immutable is very fast(mutable is light) and push back later so player did not collided immutable
                // 2. mutable -> immutable push back then player -> mutable push back so mutable is over immutable
                // Solve
                // 1. collision data priority - Either one is immutable -> high priority (lower one is high priority (for gravity))
                /*
                 if (dot2 > 0 || e1 instanceof AutonomyEntity) {
                     while (i++ < 10 && e1.collider.isCollision(e2.collider)) {
                         e1.deltaMove(n1x, n1y);
                     }
                 } else if (e2 instanceof AutonomyEntity) {
                     while (i++ < 10 && e1.collider.isCollision(e2.collider)) {
                         e2.deltaMove(n2x, n2y);
                     }
                 } else if (v1 > v2) {
                     while (i++ < 10 && e1.collider.isCollision(e2.collider)) {
                         e1.deltaMove(n1x, n1y);
                     }
                 } else if (v2 < v1) {
                     while (i++ < 10 && e1.collider.isCollision(e2.collider)) {
                         e2.deltaMove(n2x, n2y);
                     }
                 } else {
                     while (i++ < 10 && e1.collider.isCollision(e2.collider)) {
                         e1.deltaMove(n1x, n1y);
                         e2.deltaMove(n2x, n2y);
                     }
                 }
                 */
            }
            // check impossible collision
            if (Math.abs(v1) < Math.abs(v2) && dot2 >= 0) {
                return;
            }
            // repulsion
            const e = (e1.material.e + e2.material.e) / 2;
            vdx1 = (v2x - v1x) * (1 + e) * (e2.material.mass) / (e1.material.mass + e2.material.mass);
            vdy1 = (v2y - v1y) * (1 + e) * (e2.material.mass) / (e1.material.mass + e2.material.mass);
            vdx2 = -(v2x - v1x) * (1 + e) * (e1.material.mass) / (e1.material.mass + e2.material.mass);
            vdy2 = -(v2y - v1y) * (1 + e) * (e1.material.mass) / (e1.material.mass + e2.material.mass);
        } else {
            const dot1 = b1.velocityX * nx + b1.velocityY * ny;
            const v1x = dot1 * nx;
            const v1y = dot1 * ny;
            // push back
            if (d > 1.0e-4) {
                let i = 0;
                while (i++ < 10 && e1.collider.isCollision(e2.collider)) {
                    e1.deltaMove(-nx * d / 10, -ny * d / 10);
                }
            }
            // repulsion
            const e = e2.material.e;
            vdx1 = -v1x * (1 + e);
            vdy1 = -v1y * (1 + e);
        }

        // friction
        if (e1.collider.getAABB().startY < e2.collider.getAABB().startY) {
            // e1 on e2
            const mu = e2.material.mu;
            const dotp = b1.accelerationX * nx + b1.accelerationY * ny;
            const px = dotp * nx;
            const py = dotp * ny;
            const p = Math.sqrt(px * px + py * py);
            let dvx = 0;
            let dvy = 0;
            const ovx = (b2 === null || b2.isFixX || b2.diffX * b2.velocityX < 0) ? b1.velocityX : b1.diffX - b2.diffX;
            const ovy = (b2 === null || b2.isFixY || b2.diffY * b2.velocityY < 0) ? b1.velocityY : b1.diffY - b2.diffY;
            const dot = Math.sign(ovx * -ny + ovy * nx);
            dvx = dot * -ny * p * mu * dt / 1000;
            dvy = dot * nx * p * mu * dt / 1000;
            if (ovx === b1.velocityX && Math.abs(dvx) > Math.abs(b1.velocityX)) {
                dvx = b1.velocityX;
            }
            if (ovy === b1.velocityY && Math.abs(dvy) > Math.abs(b1.velocityY)) {
                dvy = b1.velocityY;
            }
            vdx1 -= dvx * b1.material.frictionX;
            // Apply only to down wall
            vdy1 -= dvy < 0 ? 0 : dvy * b1.material.frictionY;
        } else if (b2 !== null) {
            // e2 on e1
            const mu = e1.material.mu;
            const dotp = b2.accelerationX * nx + b2.accelerationY * ny;
            const px = dotp * nx;
            const py = dotp * ny;
            const p = Math.sqrt(px * px + py * py);
            let dvx = 0;
            let dvy = 0;
            const ovx = (b1.isFixX || b1.diffX * b1.velocityX < 0) ? b2.velocityX : b2.diffX - b1.diffX;
            const ovy = (b1.isFixY || b1.diffY * b1.velocityY < 0) ? b2.velocityY : b2.diffY - b1.diffY;
            const dot = Math.sign(ovx * -ny + ovy * nx);
            dvx = dot * -ny * p * mu * dt / 1000;
            dvy = dot * nx * p * mu * dt / 1000;
            if (ovx === b2.velocityX && Math.abs(dvx) > Math.abs(b2.velocityX)) {
                dvx = b2.velocityX;
            }
            if (ovy === b2.velocityY && Math.abs(dvy) > Math.abs(b2.velocityY)) {
                dvy = b2.velocityY;
            }
            vdx2 -= dvx * b2.material.frictionX;
            // Apply only to down wall
            vdy2 -= dvy < 0 ? 0 : dvy * b2.material.frictionY;
        }

        b1.setNextAddVelocity(vdx1, vdy1);
        if (b2 !== null) {
            b2.setNextAddVelocity(vdx2, vdy2);
        }
    }
}
/**
 * Event operator interface
 * - ### Controls event
 * @interface
 * @classdesc Event operator interface to control event
 */
class IEventOperator extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Execute next event
     * @abstract
     */
    next() {}

    /**
     * Delete event
     * @abstract
     * @param {GameEvent} event Target event
     */
    delete(event) {}

    /**
     * Get currently running event
     * @abstract
     * @return {Array<GameEvent>} Currently running events
     */
    getRunningEvents() {}
}
/**
 * Event register interface
 * - ### Registers event
 * @interface
 * @classdesc Event register interface to registers event
 */
class IEventRegister extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Register event
     * @abstract
     * @param {GameEvent} event Target event
     */
    register(event) {}

    /**
     * Unregister event
     * @abstract
     * @param {GameEvent} event Target event
     */
    unregister(event) {}

    /**
     * Clear all events
     * @abstract
     */
    clear() {}
}
/**
 * Stage event interface
 * - ### Controls the stage
 * @interface
 * @classdesc Stage event interface to control the stage
 */
class IStageEvent extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Set stage
     * @abstract
     * @param {Stage} stage Stage to set
     */
    setStage(stage) {}
}
/**
 * Input interface
 * - ### It can get input state and meddle input system
 * @interface
 * @classdesc Input interface that can get input state and meddle input system
 */
class IInput extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Clear input state
     * @abstract
     */
    clear() {}

    /**
     * Set inpt enable
     * @abstract
     * @param {boolean} enable Input enable
     */
    setInputEnable(enable) {}

    /**
     * Block input
     * @abstract
     * @param {number} code Target code
     */
    blockInput(code) {}

    /**
     * Unblock input
     * @abstract
     * @param {number} code Target code
     */
    unblockInput(code) {}

    /**
     * Press target code
     * @abstract
     * @param {number} code Target code
     */
    press(code) {}

    /**
     * Unpress target code
     * @abstract
     * @param {number} code Target code
     */
    unpress(code) {}

    /**
     * Judge whether pressed now
     * @abstract
     * @param {number} code Target code
     * @return {boolean} whether pressed now
     */
    isPress(code) {}

    /**
     * Judge whether pressed
     * @abstract
     * @param {number} code Target code
     * @return {boolean} whether pressed
     */
    isPressed(code) {}
}
/**
 * Key interface
 * - It can get input state
 * - It can make input blocked
 * - ### Gets key code
 * @interface
 * @extends {IInput}
 * @classdesc Key interface to get key code
 */
class IKey extends IInput { // eslint-disable-line  no-unused-vars
    /**
     * Get A key code
     * @abstract
     * @return {number} A key code
     */
    a() {}
    /**
     * Get 0 key code
     * @abstract
     * @return {number} 0 key code
     */
    zero() {}
    /**
     * Get space key code
     * @abstract
     * @return {number} Space key code
     */
    space() {}

    /**
     * Get right key code
     * @abstract
     * @return {number} Right key code
     */
    right() {}
    /**
     * Get left key code
     * @abstract
     * @return {number} Left key code
     */
    left() {}
    /**
     * Get up key code
     * @abstract
     * @return {number} Up key code
     */
    up() {}
    /**
     * Get down key code
     * @abstract
     * @return {number} Down key code
     */
    down() {}

    /**
     * Get yes key code
     * @abstract
     * @return {number} Yes key code
     */
    yes() {}
    /**
     * Get no key code
     * @abstract
     * @return {number} No key code
     */
    no() {}
    /**
     * Get sub key code
     * @abstract
     * @return {number} Sub key code
     */
    sub() {}
}
/**
 * Mouse interface
 * - It can get input state
 * - It can make input blocked
 * - ### Get mouse code and position
 * @interface
 * @extends {IInput}
 * @classdesc Mouse interface to get mouse code and position
 */
class IMouse extends IInput { // eslint-disable-line  no-unused-vars
    /**
     * Get mouse right code
     * @abstract
     * @return {number} Mouse right code
     */
    mRight() {}
    /**
     * Get mouse left code
     * @abstract
     * @return {number} Mouse left code
     */
    mLeft() {}
    /**
     * Get mouse center code
     * @abstract
     * @return {number} Mouse center code
     */
    mCenter() {}

    /**
     * Get mouse x position
     * @abstract
     * @return mouse x position
     */
    getMouseX() {}

    /**
     * Get mouse x position
     * @abstract
     * @return mouse x position
     */
    getMouseY() {}
}
/**
 * Game animation
 * - Renders image
 * - ### Manages animation
 * @interface
 * @extends {GameImage}
 * @classdesc Game animation to manage animation
 */
class GameAnimation extends GameImage { // eslint-disable-line  no-unused-vars
    /**
     * Whether to loop or not
     * @abstract
     * @return {boolean} Whether to loop or not
     */
    isLoop() {}

    /**
     * Whether the animation has ended or not
     * @abstract
     * @return {boolean} Whether the animation has ended or not
     */
    isEnded() {}

    /**
     * Pause animation
     * @abstract
     */
    pause() {}

    /**
     * Restore animation
     * @abstract
     */
    restore() {}

    /**
     * Get animation count indicating animation progress
     * @abstract
     * @return {number} Animation count
     */
    getAnimationCount() {}

    /**
     * Add animation
     * @abstract
     * @param {GameImage} image Animation element
     * @param {number} delta Animation delta time
     */
    addAnimation(image, delta) {}

    /**
     * Get list of animation elements
     * @abstract
     * @protected
     * @return {Array<GameImage>} List of animation elements
     */
    getImages() {}

    /**
     * Get current image of animation
     * @abstract
     * @protected
     * @return {GameImage} Current image of animation
     */
    getCurrentImage() {}

    /**
     * Set image size
     * @override
     * @param {number} width Image width
     * @param {number} height Image height
     */
    setSize(width, height) {
        for (const it of this.getImages()) {
            it.setSize(width, height);
        }
    }

    /**
     * Set image ID
     * @override
     * @param {number} imageID Image ID
     */
    setImageID(imageID) {
        for (const it of this.getImages()) {
            it.setImageID(imageID);
        }
    }

    /**
     * Get image ID
     * @abstract
     * @return {number} Image ID
     */
    getImageID() {
        return this.getCurrentImage() === null ? 0 : this.getCurrentImage().getImageID();
    }

    /**
     * Get image width
     * @override
     * @return {number} Imag width
     */
    getWidth() {
        return this.getCurrentImage() === null ? 0 : this.getCurrentImage().getWidth();
    }

    /**
     * Get image height
     * @override
     * @return {number} Imag height
     */
    getHeight() {
        return this.getCurrentImage() === null ? 0 : this.getCurrentImage().getHeight();
    }

    /**
     * Get source offset x position
     * @override
     * @protected
     * @type {number}
     */
    getSourceOffsetX() {
        return this.getCurrentImage() === null ? 0 : this.getCurrentImage().getSourceOffsetX();
    }

    /**
     * Get source offset y position
     * @override
     * @protected
     * @type {number}
     */
    getSourceOffsetY() {
        return this.getCurrentImage() === null ? 0 : this.getCurrentImage().getSourceOffsetY();
    }

    /**
     * Get source width
     * @override
     * @protected
     * @type {number}
     */
    getSourceWidth() {
        return this.getCurrentImage() === null ? 0 : this.getCurrentImage().getSourceWidth();
    }

    /**
     * Get source height
     * @override
     * @protected
     * @type {number}
     */
    getSourceHeight() {
        return this.getCurrentImage() === null ? 0 : this.getCurrentImage().getSourceHeight();
    }

    /**
     * Initialize image
     * @override
     */
    init() {
        for (const it of this.getImages()) {
            it.init();
        }
    }

    /**
     * Update image
     * @override
     * @param {number} dt
     */
    update(dt) {
        const image = this.getCurrentImage();
        if (image !== null) {
            image.update(dt);
        }
    }

    /**
     * Render image
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx, x, y) {
        const image = this.getCurrentImage();
        if (image !== null) {
            image.render(ctx, x, y);
        }
    }
}
/**
 * Clip image interface
 * - ### Clips area when rendering
 * @interface
 * @classdesc Clip image interface to clip area when rendering
 */
class IClipImage extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Set clipingArea
     * @abstract
     * @param {number} clipX Cliping x position
     * @param {number} clipY Cliping y position
     * @param {number} clipWidth Cliping width
     * @param {number} clipWidth Cliping height
     */
    setClipArea(clipX, clipY, clipWidth, clipHeight) {}
}
/**
 * Directional imageimage interface
 * - ### Considers the direction
 * @interface
 * @classdesc Directional imageimage interface to consider the direction
 */
class IDirectionalImage extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Set direction of image
     * @abstract
     * @param {number} directionX Direction of x
     * @param {number} directionY Direction of y
     */
    setDirection(directionX, directionY) {}
}
/**
 * Multi animation
 * - Renders image
 * - Manages animation
 * - ### Manages multiple animations
 * @interface
 * @extends {GameAnimation}
 * @classdesc Multi animation to manage multiple animations
 */
class MultiAnimation extends GameAnimation { // eslint-disable-line  no-unused-vars
    /**
     * Get animation from animations
     * @abstract
     * @return {GameAnimation} animation
     */
    getAnimation() {}

    /**
     * Get list of animation
     * @abstract
     * @protected
     * @return {Array<GameAnimation>} List of animation
     */
    getAnimations() {}

    /**
     * Set animation into animations
     * @abstract
     * @param {GameAnimation} animation Set animation
     */
    setAnimation(animation) {}

    /**
     * Set all animation size
     * @param {number} width Image width
     * @param {number} height Image height
     */
    setAllSize(width, height) {
        for (const it of this.getAnimations()) {
            it.setSize(width, height);
        }
    }

    /**
     * Set all animation size
     * @param {number} imageID Image ID
     */
    setAllImageID(imageID) {
        for (const it of this.getAnimations()) {
            it.setImageID(imageID);
        }
    }

    /**
     * Whether to loop or not
     * @override
     * @return {boolean} Whether to loop or not
     */
    isLoop() {
        const anime = this.getAnimation();
        return anime !== null && anime.isLoop();
    }

    /**
     * Whether the animation has ended or not
     * @override
     * @return {boolean} Whether the animation has ended or not
     */
    isEnded() {
        const anime = this.getAnimation();
        return anime !== null && anime.isEnded();
    }

    /**
     * Pause animation
     * @override
     */
    pause() {
        const anime = this.getAnimation();
        if (anime !== null) {
            anime.pause();
        }
    }

    /**
     * Restore animation
     * @override
     */
    restore() {
        const anime = this.getAnimation();
        if (anime !== null) {
            anime.restore();
        }
    }

    /**
     * Get animation count indicating animation progress
     * @override
     * @return {number} Animation count
     */
    getAnimationCount() {
        const anime = this.getAnimation();
        return anime !== null ? anime.getAnimationCount() : 0;
    }

    /**
     * Add animation
     * @override
     * @param {GameImage} image Animation element
     * @param {number} delta Animation delta time
     */
    addAnimation(image, delta) {
        const anime = this.getAnimation();
        if (anime !== null) {
            anime.addAnimation(image, delta);
        }
    }

    /**
     * Get list of animation elements
     * @override
     * @protected
     * @return {Array<GameImage>} List of animation elements
     */
    getImages() {
        const anime = this.getAnimation();
        return anime === null ? [] : anime.getImages();
    }

    /**
     * Get current image of animation
     * @override
     * @protected
     * @return {GameImage} Current image of animation
     */
    getCurrentImage() {
        const anime = this.getAnimation();
        return anime === null ? null : anime.getCurrentImage();
    }

    /**
     * Initialize animation
     * @override
     */
    init() {
        const anime = this.getAnimation();
        if (anime !== null) {
            anime.init();
        }
    }

    /**
     * Update animation
     * @override
     * @param {number} dt
     */
    update(dt) {
        const anime = this.getAnimation();
        if (anime !== null) {
            anime.update(dt);
        }
    }

    /**
     * Render animation
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx, x, y) {
        const anime = this.getAnimation();
        if (anime !== null) {
            anime.render(ctx, x, y);
        }
    }
}
/**
 * Named animation
 * - Renders image
 * - Manages animation
 * - Manages multiple animations
 * - ### Manages animation by name
 * @interface
 * @extends {MultiAnimation}
 * @classdesc Named animation to manage animation by name
 */
class NamedAnimation extends MultiAnimation { // eslint-disable-line  no-unused-vars
    /**
     * Set animation name
     * @abstract
     * @param {string} name Animation name
     */
    setName(name) {}
}
/**
 * Resource manager interface
 * - ### Resources abstraction of resource management
 * @interface
 * @classdesc Resource manager interface that indicatas abstraction of resource management
 */
class IResourceManager extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Load resource and return ID
     * @abstract
     * @param {string} filePath Resource file path
     * @return {Object} Resource ID
     */
    load(filePath) {}

    /**
     * Unload resource
     * @abstract
     * @param {Object} id Resource ID
     */
    unload(id) {}

    /**
     * Reload all resources
     * @abstract
     */
    reload() {}

    /**
     * Get resource path
     * @abstract
     * @param {Object} id Resrouce ID
     * @return {string} Resource path (return null if not exists)
     */
    getPath(id) {}
}
/**
 * Clip layer
 * - Performs drawing processing collectively
 * - ### Clips area when rendering
 * @interface
 * @extends {Layer}
 * @classdesc Clip layer to clip area when rendering
 */
class ClipLayer extends Layer { // eslint-disable-line  no-unused-vars
    /**
     * Clip layer constructor
     * @constructo
     */
    constructor() {
        super();

        /**
         * Clip x position
         * @protected
         * @type {number}
         */
        this.clipX = 0;
        /**
         * Clip y position
         * @protected
         * @type {number}
         */
        this.clipY = 0;
        /**
         * Clip width
         * @protected
         * @type {number}
         */
        this.clipWidth = 0;
        /**
         * Clip height
         * @protected
         * @type {number}
         */
        this.clipHeight = 0;
    }

    /**
     * Clip area
     * @param {number} clipX Cliping x position
     * @param {number} clipY Cliping y position
     * @param {number} clipWidth Cliping width
     * @param {number} clipWidth Cliping height
     */
    clip(clipX, clipY, clipWidth, clipHeight) {
        this.clipX = clipX;
        this.clipY = clipY;
        this.clipWidth = clipWidth;
        this.clipHeight = clipHeight;
    }
}
/**
 * Layered scene
 * - Controls updating and rendering
 * - ### It consists of layers
 * @extends {Scene}
 * @classdesc Layered scene that consists of layers
 */
class LayeredScene extends Scene { // eslint-disable-line  no-unused-vars
    /**
     * Add layer
     * @param {Layer} layer Added layer
     */
    addLayer(layer) {
        layer.init();
    }

    /**
     * Remove layer
     * @abstract
     * @param {Layer} layer Removed layer
     */
    removeLayer(layer) {}

    /**
     * Clear all layer
     */
    clearLayer() {
        for (const it of this.getLayers().reverse()) {
            this.removeLayer(it);
        }
    }

    /**
     * Get list pf layers
     * @abstract
     * @protected
     * @return {Array<Layer>} List of layers
     */
    getLayers() {}

    /**
     * Update scene
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        for (const layer of this.getLayers()) {
            layer.update(dt);
        }
    }

    /**
     * Render scene
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        for (const layer of this.getLayers()) {
            layer.render(ctx);
        }
    }
}
/**
 * Autonomy entity
 * - Object present on the stage that has coordinate and size
 * - Manages image
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - ### It can move by AI
 * @interface
 * @extends {MutableEntity}
 * @classdesc Autonomy entity to move by AI
 */
class AutonomyEntity extends MutableEntity { // eslint-disable-line  no-unused-vars
    /**
     * Add AI system
     * @param {AI} ai AI to control this
     * @param {number} priority Priority of AI
     */
    addAI(ai, priority) {
        ai.setEntity(this);
        ai.init();
    }

    /**
     * Remove AI system
     * @abstract
     * @param {AI} ai AI to control this
     */
    removeAI(ai) {}

    /**
     * Update entity's AI
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    updateAI(dt) {}

    /**
     * Apply entity's AI
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    applyAI(dt) {}

    /**
     * Update entty
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        super.update(dt);
        this.updateAI(dt);
        this.applyAI(dt);
    }
}
/**
 * Immutable entity
 * - Object present on the stage that has coordinate and size
 * - Manages image
 * - It can be collided because it has material and collider
 * - ### It is fixed and no change will occur
 * @interface
 * @extends {InfluentialEntity}
 * @classdesc Immutable entity that is fixed and no change will occur
 */
class ImmutableEntity extends InfluentialEntity { // eslint-disable-line  no-unused-vars

}
/**
 * Breakable interface
 * - ### Object that can be destroyed
 * @interface
 * @classdesc Breakable interface that can be destroyed
 */
class IBreakable extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Destroy object
     * @abstract
     */
    destroy() {}
}
/**
 * Colliderable interface
 * - ### Object that has collide
 * @interface
 * @classdesc Colliderable interface that has collider
 */
class IColliderable extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Get collider
     * @abstract
     * @return {Collider} Collider that object has
     */
    getCollider() {}
}
/**
 * Damageable interface
 * - Object that can be destroyed
 * - ### Object that can be damaged
 * @interface
 * @extends {IBreakable}
 * @classdesc Damagable interface that can be damaged
 */
class IDamagable extends IBreakable { // eslint-disable-line  no-unused-vars
    /**
     * Get hit point
     * @abstract
     * @return {number} Hit point
     */
    getHP() {}

    /**
     * Damage object
     * @abstract
     * @param {number} damage Amount of damage
     */
    damage(damage) {}
}
/**
 * Event entity interface
 * - ### It can hold event and fire it
 * @interface
 * @classdesc Event entity interface that can hold event and fire it
 */
class IEventEntity extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Set game event
     * @abstract
     * @param {GameEvent} event Stage event
     */
    setEvent(event) {}

    /**
     * Get stage event
     * @abstract
     * @return {GameEvent} Stage event
     */
    getEvent() {}

    /**
     * Fires event
     * @abstract
     */
    fire() {}
}
/**
 * Owned interface
 * - ### Owned by someone
 * @interface
 * @classdesc Owned interface owned by someone
 */
class IOwned extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Set owned entity
     * @abstract
     * @param {Entity} owner Owned entity
     */
    setOwner(owner) {}

    /**
     * Get owned entity
     * @abstract
     * @return {Entity} Owned entity
     */
    getOwner() {}
}
/**
 * Playable interface
 * - ### Player function interface
 * @interface
 * @classdesc Playable interface for player function
 */
class IPlayable extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Get x position for camera
     * @abstract
     * @return {number} X position for camera
     */
    getCameraX() {}

    /**
     * Get y position for camera
     * @abstract
     * @return {number} y position for camera
     */
    getCameraY() {}

    /**
     * Judge whether game over or not
     * @abstract
     * @return {boolean} whether game over or not
     */
    isGameover() {}
}
/**
 * Under debug engine
 * - Control the core of the game
 * - Manages each piece of game information
 * - Fires update and rendering processing respectively
 * - Executes the main loop by requestAnimationFrame
 * - ### Measure time for debugging
 * @extends {UnderEngine}
 * @classdesc Under debug engine to measure time for debugging
 */
class UnderDebugEngine extends UnderEngine { // eslint-disable-line  no-unused-vars
    /**
     * Update in main loop
     * @override
     * @protected
     */
    update() {
        this.timer.startTimer(`overall`);
        this.timer.startTimer(`update`);
        super.update();
        this.timer.stopTimer(`update`);
    }

    /**
     * Rendering in main loop
     * @override
     * @protected
     */
    render() {
        this.timer.startTimer(`render`);
        super.render();
        this.timer.stopTimer(`render`);
        this.timer.stopTimer(`overall`);
    }
}
/**
 * Direction input order
 * - Indicates order for delegation of input
 * - ### Inputs direction key
 * @extends {InputOrder}
 * @classdesc Direction input order to input direction key
 */
class DirectionInputOrder extends InputOrder { // eslint-disable-line  no-unused-vars
    /**
     * Direction input order constructor
     * @constructor
     * @param {number} time Time of input action
     * @param {number} directionX X direction for input
     * @param {number} directionY Y direction for input
     */
    constructor(time, directionX, directionY) {
        super();

        /**
         * Time for waiting
         * @protected
         * @type {number}
         */
        this.time = time;
        /**
         * Remaining time
         * @proteted
         * @type {number}
         */
        this.remainingTime = time;
        /**
         * X direction for input
         * @protected
         * @type {number}
         */
        this.directionX = directionX;
        /**
         * Y direction for input
         * @protected
         * @type {number}
         */
        this.directionY = directionY;
    }

    /**
     * Initialize input order
     * @override
     */
    init() {
        this.remainingTime = this.time;
        if (this.directionX === 1) {
            Input.key.press(Input.key.right());
        } else if (this.directionX === -1) {
            Input.key.press(Input.key.left());
        }
        if (this.directionY === 1) {
            Input.key.press(Input.key.down());
        } else if (this.directionY === -1) {
            Input.key.press(Input.key.up());
        }
    }

    /**
     * Destructor of input order
     * @override
     */
    destruct() {
        if (this.directionX === 1) {
            Input.key.unpress(Input.key.right());
        } else if (this.directionX === -1) {
            Input.key.unpress(Input.key.left());
        }
        if (this.directionY === 1) {
            Input.key.unpress(Input.key.down());
        } else if (this.directionY === -1) {
            Input.key.unpress(Input.key.up());
        }
    }

    /**
     * Update input order
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether order is ended or not
     */
    udpate(dt) {
        this.remainingTime -= dt / 1000;
        if (this.directionX === 1) {
            Input.key.press(Input.key.right());
        } else if (this.directionX === -1) {
            Input.key.press(Input.key.left());
        }
        if (this.directionY === 1) {
            Input.key.press(Input.key.down());
        } else if (this.directionY === -1) {
            Input.key.press(Input.key.up());
        }
        return this.remainingTime <= 0;
    }
}
/**
 * Key input
 * - Manages input event
 * - It can get input state
 * - It can make input blocked
 * - Registers input state by input event
 * - Get key code
 * - ### Manages key input event and register state
 * @extends {StateInputManager}
 * @implements {IKey}
 * @classdesc Key input to manage key input event and register state
 */
class KeyInput extends StateInputManager /* , IKey */ { // eslint-disable-line  no-unused-vars
    /**
     * Get A key code
     * @override
     * @return {number} A key code
     */
    a() {
        return 65;
    }
    /**
     * Get 0 key code
     * @override
     * @return {number} 0 key code
     */
    zero() {
        return 48;
    }
    /**
     * Get space key code
     * @override
     * @return {number} Space key code
     */
    space() {
        return 13;
    }

    /**
     * Get right key code
     * @override
     * @return {number} Right key code
     */
    right() {
        return 39;
    }
    /**
     * Get left key code
     * @override
     * @return {number} Left key code
     */
    left() {
        return 37;
    }
    /**
     * Get up key code
     * @override
     * @return {number} Up key code
     */
    up() {
        return 38;
    }
    /**
     * Get down key code
     * @override
     * @return {number} Down key code
     */
    down() {
        return 40;
    }

    /**
     * Get yes key code
     * @override
     * @return {number} Yes key code
     */
    yes() {
        return 90;
    }
    /**
     * Get no key code
     * @override
     * @return {number} No key code
     */
    no() {
        return 88;
    }
    /**
     * Get sub key code
     * @override
     * @return {number} Sub key code
     */
    sub() {
        return 67;
    }

    /**
     * Initialize input
     * @override
     */
    init() {
        super.init();
        // initialize key state
        for (let i = 0; i < 255; ++i) {
            this.inputState.push(this.STATE.NONE);
        }

        // key
        this.target.parentElement.onkeydown = (e) => {
            this.onKeyDown(e);
        };
        this.target.parentElement.onkeyup = (e) => {
            this.onKeyUp(e);
        };

        // clear
        const blur = this.target.parentElement.onblur;
        this.target.parentElement.onblur = () => {
            this.clear();
            if (blur !== undefined && blur !== null) {
                blur();
            }
        };
    }

    /**
     * Key down function
     * @protected
     * @param {KeyBoardEvent} e Key event
     */
    onKeyDown(e) {
        if (!this.enable) {
            return;
        }
        const code = e.keyCode;
        if (this.inputState[code] === undefined || this.inputState[code] === this.STATE.NONE) {
            this.inputState[code] = this.STATE.PRESS;
        }
    }

    /**
     * Key up function
     * @protected
     * @param {KeyBoardEvent} e Key event
     */
    onKeyUp(e) {
        if (!this.enable) {
            return;
        }
        const code = e.keyCode;
        this.inputState[code] = this.STATE.NONE;
    }
}
/**
 * Mouse input
 * - Manages input event
 * - It can get input state
 * - It can make input blocked
 * - Registers input state by input event
 * - Get mouse code
 * - Get mouse position
 * - ### Manages mouse input event and register state
 * @extends {StateInputManager}
 * @classdesc Mouse input to manage mouse input event and register state
 */
class MouseInput extends StateInputManager /* , IMouse */ { // eslint-disable-line  no-unused-vars
    /**
     * Mouse input constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Mouse x position
         * @protected
         * @type {number}
         */
        this.mouseX = 0;
        /**
         * Mouse y position
         * @protected
         * @type {number}
         */
        this.mouseY = 0;
    }

    /**
     * Initialize input
     * @override
     */
    init() {
        super.init();
        // initialize key state
        for (let i = 0; i < 3; ++i) {
            this.inputState.push(this.STATE.NONE);
        }

        // mouse
        this.target.onmousemove = (e) => {
            this.onMouseMove(e);
        };
        this.target.onmousedown = (e) => {
            this.onMouseDown(e);
        };
        this.target.onmouseup = (e) => {
            this.onMouseUp(e);
        };

        // clear
        const blur = this.target.parentElement.onblur;
        this.target.parentElement.onblur = () => {
            this.clear();
            if (blur !== undefined && blur !== null) {
                blur();
            }
        };

        // ban context menu
        document.oncontextmenu = function() {
            return false;
        };
    }

    /**
     * Get mouse right code
     * @override
     * @return {number} Mouse right code
     */
    mRight() {
        return 2;
    }
    /**
     * Get mouse left code
     * @override
     * @return {number} Mouse left code
     */
    mLeft() {
        return 0;
    }
    /**
     * Get mouse center code
     * @override
     * @return {number} Mouse center code
     */
    mCenter() {
        return 1;
    }

    /**
     * Get mouse x position
     * @override
     * @return mouse x position
     */
    getMouseX() {
        return this.mouseX;
    }

    /**
     * Get mouse x position
     * @override
     * @return mouse x position
     */
    getMouseY() {
        return this.mouseY;
    }

    /**
     * Mouse move function
     * @protected
     * @param {MouseEvent} e - mouse event
     */
    onMouseMove(e) {
        const rect = this.target.getBoundingClientRect();
        this.mouseX = (e.clientX - rect.left) / this.screen.gameSize;
        this.mouseY = (e.clientY - rect.top) / this.screen.gameSize;
    }

    /**
     * Mouse down function
     * @protected
     * @param {MouseEvent} e - mouse event
     */
    onMouseDown(e) {
        if (!this.enable) {
            return;
        }
        const button = e.button;
        if (this.inputState[button] === undefined || this.inputState[button] === this.STATE.NONE) {
            this.inputState[button] = this.STATE.PRESS;
        }
    }

    /**
     * Mouse up function
     * @protected
     * @param {MouseEvent} e - mouse event
     */
    onMouseUp(e) {
        if (!this.enable) {
            return;
        }
        const button = e.button;
        this.inputState[button] = this.STATE.NONE;
    }
}
/**
 * Prevent key input
 * - Manages input event
 * - It can get input state
 * - It can make input blocked
 * - Registers input state by input event
 * - Get key code
 * - ### Prevents default key function
 * @extends {KeyInput}
 * @classdesc Prevent key input to prevent default key function
 */
class PreventKeyInput extends KeyInput { // eslint-disable-line  no-unused-vars
    /**
     * Prevent key event if it's key code is used
     * @protected
     * @param {KeyBoardEvent} e Key event
     */
    prevent(e) {
        const code = e.keyCode;
        if (code === this.up() || code === this.down() || code === this.right() || code === this.left() || code === this.yes() || code === this.no() || code === this.sub()) {
            e.preventDefault();
        }
    }
    /**
     * Prevent key down function
     * @protected
     * @param {KeyBoardEvent} e Key event
     */
    onKeyDown(e) {
        this.prevent(e);
        super.onKeyDown(e);
    }

    /**
     * Key up function
     * @protected
     * @param {KeyBoardEvent} e Key event
     */
    onKeyUp(e) {
        this.prevent(e);
        super.onKeyUp(e);
    }
}
/**
 * Clip image
 * - Renders image
 * - Considers the direction
 * - Clips area when rendering
 * - Delegates other image
 * - ### Renders by cliping
 * @extends {DelegateImage}
 * @classdesc Clip image to render by cliping
 */
class ClipImage extends DelegateImage { // eslint-disable-line  no-unused-vars
    /**
     * Clip image constructor
     * @constructor
     * @param {GameImage} baseImage Base image for delegation
     */
    constructor(baseImage) {
        super(baseImage);

        /**
         * Cliping x position
         * @protected
         * @type {number}
         */
        this.clipX = 0;
        /**
         * Cliping y position
         * @protected
         * @type {number}
         */
        this.clipY = 0;
        /**
         * Cliping width
         * @protected
         * @type {number}
         */
        this.clipWidth = Number.MAX_SAFE_INTEGER;
        /**
         * Cliping height
         * @protected
         * @type {number}
         */
        this.clipHeight = Number.MAX_SAFE_INTEGER;
    }

    /**
     * Set clipingArea
     * @override
     * @param {number} clipX Cliping x position
     * @param {number} clipY Cliping y position
     * @param {number} clipWidth Cliping width
     * @param {number} clipWidth Cliping height
     */
    setClipArea(clipX, clipY, clipWidth, clipHeight) {
        this.clipX = clipX;
        this.clipY = clipY;
        this.clipWidth = clipWidth;
        this.clipHeight = clipHeight;
    }

    /**
     * Render image
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx, x, y) {
        const width = Math.abs(this.getWidth());
        const height = Math.abs(this.getHeight());
        const widthPer = this.getSourceWidth() / width;
        const heightPer = this.getSourceHeight() / height;
        // set destination
        const dx = x < this.clipX ? this.clipX : x;
        const dy = y < this.clipY ? this.clipY : y;
        const dw = this.clipX + this.clipWidth < x + width ? this.clipX + this.clipWidth - dx : width - dx + x;
        const dh = this.clipY + this.clipHeight < y + height ? this.clipY + this.clipHeight - dy : height - dy + y;
        // set source
        let sx = this.getSourceOffsetX() + (x < this.clipX ? (this.clipX - x) * widthPer : 0);
        const sy = this.getSourceOffsetY() + (y < this.clipY ? (this.clipY - y) * heightPer : 0);
        const sw = this.clipX + this.clipWidth < x + width ? (this.clipX + this.clipWidth - dx) * widthPer : this.getSourceWidth() - sx + this.getSourceOffsetX();
        const sh = this.clipY + this.clipHeight < y + height ? (this.clipY + this.clipHeight - dy) * heightPer : this.getSourceHeight() - sy + this.getSourceOffsetY();
        sx -= (this.getWidth() > 0 ? 0 : this.getSourceWidth() - sw);
        if (sw > 0 && sh > 0) {
            ctx.drawImage(this.getImageID(), dx, dy, dw * Math.sign(this.getWidth()), dh * Math.sign(this.getHeight()), sx, sy, sw, sh);
        }
    }
}
/**
 * Delegate animation
 * - Renders image
 * - Manages animation
 * - Considers the direction
 * - Clips area when rendering
 * - ### Delegates other animation
 * @extends {GameAnimation}
 * @implements {IDirectionalImage}
 * @implements {IClipImage}
 * @classdesc Delegate animation to delegate other animation
 */
class DelegateAnimation extends GameAnimation /* , IDirectionalImage, IClipImage */ { // eslint-disable-line  no-unused-vars
    /**
     * Delegate animation constructor
     * @constructor
     * @param {GameAnimation} baseAnimation Base image for delegation
     */
    constructor(baseAnimation) {
        super();

        /**
         * Base image for delegation
         * @protected
         * @type {GameAnimation}
         */
        this.baseAnimation = baseAnimation;
    }

    /**
     * Set direction of image
     * @override
     * @param {number} directionX Direction of x
     * @param {number} directionY Direction of y
     */
    setDirection(directionX, directionY) {
        if (BaseUtil.implementsOf(this.baseAnimation, IDirectionalImage)) {
            this.baseAnimation.setDirection(directionX, directionY);
        }
    }

    /**
     * Set clipingArea
     * @override
     * @param {number} clipX Cliping x position
     * @param {number} clipY Cliping y position
     * @param {number} clipWidth Cliping width
     * @param {number} clipWidth Cliping height
     */
    setClipArea(clipX, clipY, clipWidth, clipHeight) {
        if (BaseUtil.implementsOf(this.baseAnimation, IClipImage)) {
            this.baseAnimation.setClipArea(clipX, clipY, clipWidth, clipHeight);
        }
    }

    /**
     * Whether to loop or not
     * @override
     * @return {boolean} Whether to loop or not
     */
    isLoop() {
        return this.baseAnimation.isLoop();
    }

    /**
     * Whether the animation has ended or not
     * @override
     * @return {boolean} Whether the animation has ended or not
     */
    isEnded() {
        return this.baseAnimation.isEnded();
    }

    /**
     * Pause animation
     * @override
     */
    pause() {
        this.baseAnimation.pause();
    }

    /**
     * Restore animation
     * @override
     */
    restore() {
        this.baseAnimation.restore();
    }

    /**
     * Get animation count indicating animation progress
     * @override
     * @return {number} Animation count
     */
    getAnimationCount() {
        return this.baseAnimation.getAnimationCount();
    }

    /**
     * Add animation
     * @override
     * @param {GameImage} image Animation element
     * @param {number} delta Animation delta time
     */
    addAnimation(image, delta) {
        this.baseAnimation.addAnimation(image, delta);
    }

    /**
     * Get list of animation elements
     * @override
     * @protected
     * @return {Array<GameImage>} List of animation elements
     */
    getImages() {
        return this.baseAnimation.getImages();
    }

    /**
     * Get current image of animation
     * @abstract
     * @protected
     * @return {GameImage} Current image of animation
     */
    getCurrentImage() {
        return this.baseAnimation.getCurrentImage();
    }

    /**
     * Initialize image
     * @override
     */
    init() {
        this.baseAnimation.init();
    }

    /**
     * Update image
     * @override
     * @param {number} dt
     */
    update(dt) {
        this.baseAnimation.update(dt);
    }

    /**
     * Render image
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx, x, y) {
        this.baseAnimation.render(ctx, x, y);
    }
}
/**
 * Delegate named animation
 * - Renders image
 * - Manages animation
 * - Manages multiple animations
 * - Manages animation by name
 * - Considers the direction
 * - Clips area when rendering
 * - ### Delegates other animation
 * @extends {NamedAnimation}
 * @implements {IDirectionalImage}
 * @implements {IClipImage}
 * @classdesc Delegate named animation to delegate other animation
 */
class DelegateNamedAnimation extends NamedAnimation /* , IDirectionalImage, IClipImage */ { // eslint-disable-line  no-unused-vars
    /**
     * Delegate named animation constructor
     * @constructor
     * @param {NamedAnimation} baseAnimation Base image for delegation
     */
    constructor(baseAnimation) {
        super();

        /**
         * Base image for delegation
         * @protected
         * @type {NamedAnimation}
         */
        this.baseAnimation = baseAnimation;
    }

    /**
     * Set direction of image
     * @override
     * @param {number} directionX Direction of x
     * @param {number} directionY Direction of y
     */
    setDirection(directionX, directionY) {
        if (BaseUtil.implementsOf(this.baseAnimation, IDirectionalImage)) {
            this.baseAnimation.setDirection(directionX, directionY);
        }
    }

    /**
     * Set clipingArea
     * @override
     * @param {number} clipX Cliping x position
     * @param {number} clipY Cliping y position
     * @param {number} clipWidth Cliping width
     * @param {number} clipWidth Cliping height
     */
    setClipArea(clipX, clipY, clipWidth, clipHeight) {
        if (BaseUtil.implementsOf(this.baseAnimation, IClipImage)) {
            this.baseAnimation.setClipArea(clipX, clipY, clipWidth, clipHeight);
        }
    }

    /**
     * Set running animation name
     * @override
     * @param {string} name Running animation name
     */
    setName(name) {
        this.baseAnimation.setName(name);
    }

    /**
     * Set all animation size
     * @override
     * @param {number} width Image width
     * @param {number} height Image height
     */
    setAllSize(width, height) {
        this.baseAnimation.setAllSize(width, height);
    }

    /**
     * Set all animation image ID
     * @override
     * @param {number} imageID Image ID
     */
    setAllImageID(imageID) {
        this.baseAnimation.setAllImageID(imageID);
    }

    /**
     * Get animation from animations
     * @override
     * @return {GameAnimation} animation
     */
    getAnimation() {
        return this.baseAnimation.getAnimation();
    }

    /**
     * Get list of animation
     * @override
     * @protected
     * @return {Array<GameImage>} List of animation
     */
    getAnimations() {
        return this.baseAnimation.getAnimations();
    }

    /**
     * Set animation into animations
     * @override
     * @param {GameAnimation} animation
     */
    setAnimation(animation) {
        this.baseAnimation.setAnimation(animation);
    }

    /**
     * Initialize animation
     * @override
     */
    init() {
        this.baseAnimation.init();
    }

    /**
     * Update animation
     * @override
     * @param {number} dt
     */
    update(dt) {
        this.baseAnimation.update(dt);
    }

    /**
     * Render animation
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx, x, y) {
        this.baseAnimation.render(ctx, x, y);
    }
}
/**
 * Directional animation
 * - Renders image
 * - Manages animation
 * - Considers the direction
 * - Clips area when rendering
 * - Delegates other animation
 * - ### Render animation considering the direction
 * @extends {DelegateAnimation}
 * @implements {IDirectionalImage}
 * @classdesc Directional animation to render animation considering the direction
 */
class DirectionalAnimation extends DelegateAnimation /* , IDirectionalImage */ { // eslint-disable-line  no-unused-vars
    /**
     * Set direction of image
     * @override
     * @param {number} directionX Direction of x
     * @param {number} directionY Direction of y
     */
    setDirection(directionX, directionY) {
        for (const it of this.getImages()) {
            if (BaseUtil.implementsOf(it, IDirectionalImage)) {
                it.setDirection(directionX, directionY);
            }
        }
    }
}
/**
 * Directional named animation
 * - Renders image
 * - Manages animation
 * - Manages multiple animations
 * - Manages animation by name
 * - Considers the direction
 * - Clips area when rendering
 * - Delegates other animation
 * - ### Render animation considering the direction
 * @extends {DelegateNamedAnimation}
 * @implements {IDirectionalImage}
 * @classdesc Directional named animation to render animation considering the direction
 */
class DirectionalNamedAnimation extends DelegateNamedAnimation /* , IDirectionalImage */ { // eslint-disable-line  no-unused-vars
    /**
     * Set direction of image
     * @override
     * @param {number} directionX Direction of x
     * @param {number} directionY Direction of y
     */
    setDirection(directionX, directionY) {
        for (const it of this.getAnimations()) {
            if (BaseUtil.implementsOf(it, IDirectionalImage)) {
                it.setDirection(directionX, directionY);
            }
        }
    }
}
/**
 * Multi named animation
 * - Renders image
 * - Manages animation
 * - Manages multiple animations
 * - Manages animation by name
 * - ### Sets and gets by currently name
 * @extends {NamedAnimation}
 * @classdesc Multi named animation to set and get by currently name
 */
class MultiNamedAnimation extends NamedAnimation { // eslint-disable-line  no-unused-vars
    /**
     * Multi named animation constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Dictionary of animation by string
         * @protected
         * @type {Object<string, GameAnimation>}
         */
        this.animation = {};

        /**
         * Running animation name
         * @protected
         * @type {string}
         */
        this.name = null;
    }

    /**
     * Set running animation name
     * @override
     * @param {string} name Running animation name
     */
    setName(name) {
        this.name = name;
    }

    /**
     * Get animation from animations
     * @override
     * @return {GameAnimation} animation
     */
    getAnimation() {
        const ret = this.animation[this.name];
        return ret !== undefined ? ret : null;
    }

    /**
     * Get list of animation
     * @override
     * @protected
     * @return {Array<GameAnimation>} List of animation
     */
    getAnimations() {
        const list = [];
        for (const it in this.animation) {
            if (this.animation.hasOwnProperty(it)) {
                list.push(this.animation[it]);
            }
        }
        return list;
    }

    /**
     * Set animation into animations
     * @override
     * @param {GameAnimation} animation
     */
    setAnimation(animation) {
        this.animation[this.name] = animation;
    }
}
/**
 * Single animation
 * - Renders image
 * - Manages animation
 * - ### Runs single animation
 * @extends {GameAnimation}
 * @classdesc Single animation to run single animation
 */
class SingleAnimation extends GameAnimation { // eslint-disable-line  no-unused-vars
    /**
     * Single animation constructor
     * @constructor
     * @param {boolean} [loop=true] Whether to loop or not
     */
    constructor(loop = true) {
        super();

        /**
         * List of animation element
         * @protected
         * @type {Array<GameImage>}
         */
        this.animation = [];
        /**
         * List of animation delta number
         * @protected
         * @type {Array<number>}
         */
        this.deltas = [];

        /**
         * Animation counter
         * @protected
         * @type {number}
         */
        this.animationCount = 0;

        /**
         * Running animation number
         * @protected
         * @type {number}
         */
        this.runningAnimation = 0;

        /**
         * Whether to loop or not
         * @protected
         * @type {boolean}
         */
        this.loop = loop;

        /**
         * Whether the animation has ended or not
         * @protected
         * @type {boolean}
         */
        this.ended = false;

        /**
         * Whether pause animation or not
         * @protected
         * @type {boolean}
         */
        this.paused = false;
    }

    /**
     * Whether to loop or not
     * @override
     * @return {boolean} Whether to loop or not
     */
    isLoop() {
        return this.loop;
    }

    /**
     * Whether the animation has ended or not
     * @override
     * @return {boolean} Whether the animation has ended or not
     */
    isEnded() {
        return this.ended;
    }

    /**
     * Pause animation
     * @override
     */
    pause() {
        this.paused = true;
    }

    /**
     * Restore animation
     * @override
     */
    restore() {
        this.paused = false;
    }

    /**
     * Get animation count indicating animation progress
     * @return {number} Animation count
     */
    getAnimationCount() {
        return this.runningAnimation / this.animation.length;
    }

    /**
     * Add animation
     * @override
     * @param {GameImage} image Animation element
     * @param {number} delta Animation delta time
     */
    addAnimation(image, delta) {
        this.animation.push(image);
        this.deltas.push(delta);
    }

    /**
     * Get list of animation elements
     * @override
     * @protected
     * @return {Array<GameImage>} List of animation elements
     */
    getImages() {
        return this.animation;
    }

    /**
     * Get current image of animation
     * @abstract
     * @protected
     * @return {GameImage} Current image of animation
     */
    getCurrentImage() {
        return this.animation[this.runningAnimation] === undefined ? null : this.animation[this.runningAnimation];
    }

    /**
     * Initialize animation
     * @override
     */
    init() {
        super.init();
        this.animationCount = 0;
        this.runningAnimation = 0;
        this.ended = false;
    }

    /**
     * Update animation
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        // check
        if (this.paused || this.animation.length === 0) {
            return;
        }
        if (!this.isLoop() && this.isEnded()) {
            return;
        }
        // update image
        super.update(dt);
        // update animation
        let delta = this.deltas[this.runningAnimation];
        this.animationCount += dt;
        while (this.animationCount >= delta) {
            this.animationCount -= delta;
            if (++this.runningAnimation >= this.animation.length) {
                this.ended = true;
                if (this.isLoop()) {
                    this.runningAnimation = 0;
                } else {
                    this.runningAnimation--;
                }
            }
            delta = this.deltas[this.runningAnimation];
        }
    }
}
/**
 * Transitional blink animation
 * - Renders image
 * - Manages animation
 * - Manages multiple animations
 * - Manages animation by name
 * - Considers the direction
 * - Clips area when rendering
 * - Delegates other animation
 * - ### Animates transitions to other images by blink
 * @extends {DelegateNamedAnimation}
 * @classdesc Transitional blink animation to animate transitions to other images by blink
 */
class TransitionalBlinkAnimation extends DelegateNamedAnimation { // eslint-disable-line  no-unused-vars
    /**
     * Transitional blink animation constructor
     * @constructor
     * @param {NamedAnimation} baseAnimation Base image for delegation
     * @param {nunber} transitionTime Transitional time
     * @param {number} transitionInterval Transitional interval
     */
    constructor(baseAnimation, transitionTime, transitionInterval) {
        super(baseAnimation);

        /**
         * Transitional time
         * @protected
         * @type {number}
         */
        this.transitionTime = transitionTime;
        /**
         * Transitional interval
         * @protected
         * @type {number}
         */
        this.transitionInterval = transitionInterval;

        /**
         * Old image ID
         * @protected
         * @type {number}
         */
        this.oldImageID = -1;
        /**
         * Transition image ID
         * @protected
         * @type {number}
         */
        this.transitionID = -1;
        /**
         * Transitional counter for transition
         * @protected
         * @type {number}
         */
        this.transitionCount = -1;
    }

    /**
     * Set all animation ID
     * @override
     * @param {number} imageID Image ID
     */
    setAllImageID(imageID) {
        if (this.transitionID === -1) {
            this.transitionID = imageID;
        } else {
            this.transitionCount = this.transitionTime;
        }
        this.oldImageID = this.transitionID;
        this.transitionID = imageID;
        super.setAllImageID(imageID);
    }

    /**
     * Update animation
     * @override
     * @param {number} dt
     */
    update(dt) {
        if (this.transitionCount > 0) {
            this.transitionCount -= dt / 1000;
            if ((this.transitionCount * 1000) % (this.transitionInterval * 2) >= this.transitionInterval) {
                super.setAllImageID(this.oldImageID);
            } else {
                super.setAllImageID(this.transitionID);
            }
        } else if (this.transitionCount !== -1) {
            this.transitionCount = -1;
            super.setAllImageID(this.transitionID);
        }
        super.update(dt);
    }
}
/**
 * Transitional stripe animation
 * - Renders image
 * - Manages animation
 * - Manages multiple animations
 * - Manages animation by name
 * - Considers the direction
 * - Clips area when rendering
 * - Delegates other animation
 * - ### Animates transitions to other images by stripe
 * @extends {DelegateNamedAnimation}
 * @classdesc Transitional stripe animation to animate transitions to other images by stripe
 */
class TransitionalStripeAnimation extends DelegateNamedAnimation { // eslint-disable-line  no-unused-vars
    /**
     * Transitional stripe animation constructor
     * @constructor
     * @param {NamedAnimation} baseAnimation Base image for delegation
     * @param {nunber} transitioTime Transitional time
     */
    constructor(baseAnimation, transitioTime) {
        super(baseAnimation);

        /**
         * Transitional time
         * @protected
         * @type {number}
         */
        this.transitioTime = transitioTime;


        /**
         * Old image ID
         * @protected
         * @type {number}
         */
        this.oldImageID = -1;
        /**
         * Transition image ID
         * @protected
         * @type {number}
         */
        this.transitionID = -1;
        /**
         * Transitional counter for transition
         * @protected
         * @type {number}
         */
        this.transitionCount = -1;
    }

    /**
     * Set all animation ID
     * @override
     * @param {number} imageID Image ID
     */
    setAllImageID(imageID) {
        if (this.transitionID === -1) {
            this.transitionID = imageID;
        } else {
            this.transitionCount = this.transitioTime;
        }
        this.oldImageID = this.transitionID;
        this.transitionID = imageID;
        super.setAllImageID(imageID);
    }

    /**
     * Update animation
     * @override
     * @param {number} dt
     */
    update(dt) {
        if (this.transitionCount > 0) {
            this.transitionCount -= dt / 1000;
        }
        super.update(dt);
    }

    /**
     * Render animation
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx, x, y) {
        if (this.transitionCount > 0) {
            super.setAllImageID(this.oldImageID);
            const image = super.getAnimation();
            const oldHeight = Math.floor(super.getHeight() * (this.transitionCount / this.transitioTime));
            if (BaseUtil.implementsOf(image, IClipImage)) {
                image.setClipArea(x, y, super.getWidth(), oldHeight);
            }
            super.render(ctx, x, y);

            super.setAllImageID(this.transitionID);
            const newHeight = super.getHeight() - oldHeight;
            if (BaseUtil.implementsOf(image, IClipImage)) {
                image.setClipArea(x, y + oldHeight, super.getWidth(), newHeight);
            }
            super.render(ctx, x, y);
            if (BaseUtil.implementsOf(image, IClipImage)) {
                image.setClipArea(0, 0, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
            }
        } else {
            super.render(ctx, x, y);
        }
    }
}
/**
 * Layer base scene
 * - Controls updating and rendering
 * - It consists of layers
 * - ### Basic form of a scene composed of layers
 * @extends {LayeredScene}
 * @classdesc Layer base scene composed of layers
 */
class BaseLayeredScene extends LayeredScene { // eslint-disable-line  no-unused-vars
    /**
     * Base scene constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Layers of scene
         * @protected
         * @type {Array<Layer>}
         */
        this.layers = [];

        /**
         * Sorted layers by z order
         * @protected
         * @type {Array<Layer>}
         */
        this.sortedLayers = [];
    }

    /**
     * Add layer
     * @override
     * @param {Layer} layer Added layer
     */
    addLayer(layer) {
        this.layers.push(layer);
        super.addLayer(layer);

        // sort
        const index = this.sortedLayers.findIndex((it) => {
            return layer.z < it.z;
        });
        if (index >= 0) {
            this.sortedLayers.splice(index, 0, layer);
        } else {
            this.sortedLayers.push(layer);
        }
    }

    /**
     * Remove layer
     * @abstract
     * @param {Layer} layer Removed layer
     */
    removeLayer(layer) {
        let index = this.layers.indexOf(layer);
        if (index >= 0) {
            this.layers.splice(index, 1);
        }
        index = this.sortedLayers.indexOf(layer);
        if (index >= 0) {
            this.sortedLayers.splice(index, 1);
        }
    }

    /**
     * Get list pf layers
     * @override
     * @protected
     * @return {Array<Layer>} List of layers
     */
    getLayers() {
        return this.layers;
    }


    /**
     * Render scene
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        for (const layer of this.sortedLayers) {
            layer.render(ctx);
        }
    }
}
/**
 * Drag scroll layer
 * - Performs drawing processing collectively
 * - It can scroll inner elements
 * - ### It can scroll by mouse dragging
 * @extends {ScrollLayer}
 * @classdesc Drag scroll layer that can scroll mouse dragging
 */
class DragScrollLayer extends ScrollLayer { // eslint-disable-line  no-unused-vars
    /**
     * Drag scroll layer constructor
     * @constructor
     * @param {ClipLayer} delegate Delegte cliping layer
     */
    constructor(delegate) {
        super(delegate);

        /**
         * Currently mouse x position
         * @protected
         * @type {number}
         */
        this.oldMouseX = 0;
        /**
         * Currently mouse y position
         * @protected
         * @type {number}
         */
        this.oldMouseY = 0;

        /**
         * Whether scrolling or not
         * @protected
         * @type {boolean}
         */
        this.scrolling = false;
    }

    /**
     * Update layer
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        const x = Input.mouse.getMouseX();
        const y = Input.mouse.getMouseY();
        if (this.x <= x && x < this.x + this.width && this.y <= y && y < this.y + this.height && Input.mouse.isPress(Input.mouse.mRight())) {
            this.scrolling = true;
            this.oldMouseX = x;
            this.oldMouseY = y;
        }
        if (!Input.mouse.isPressed(Input.mouse.mRight())) {
            this.scrolling = false;
        }
        if (this.scrolling) {
            // block
            Input.mouse.blockInput(Input.mouse.mRight());
            this.scroll(x - this.oldMouseX, y - this.oldMouseY);
            this.oldMouseX = x;
            this.oldMouseY = y;
        }
        // update scroll
        super.update(dt);
    }
}
/**
 * Named tabbed layer
 * - Performs drawing processing collectively
 * - It can manage layers by tab
 * - ### Shows name and it can tap name tab
 * @extends {TabbedLayer}
 * @classdesc Named tabbed layer to show name and it can tap name tab
 */
class NamedTabbedLayer extends TabbedLayer { // eslint-disable-line  no-unused-vars
    /**
     * Named tabbed layer constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * List of tab names
         * @protected
         * @type {Array<string>}
         */
        this.tabNames = [];

        /**
         * List of tab layers
         * @protected
         * @type {Array<Layer>}
         */
        this.tabLayers = [];

        /**
         * Currently tab index
         * @protected
         * @type {number}
         */
        this.currentlyTabIndex = 0;

        /**
         * Tab reference x position
         * @protected
         * @type {number}
         */
        this.tabX = 0;
        /**
         * Tab reference y position
         * @protected
         * @type {number}
         */
        this.tabY = -20;
        /**
         * Tab width
         * @protected
         * @type {number}
         */
        this.tabWidth = 70;
        /**
         * Tab height
         * @protected
         * @type {number}
         */
        this.tabHeight = 20;
        /**
         * Tab padding
         * @protected
         * @type {number}
         */
        this.tabPadding = 10;
    }

    /**
     * Add tab layer
     * @override
     * @param {Layer} layer Added layer
     */
    addTab(layer) {
        super.addTab(layer);
        this.tabLayers.push(layer);
        this.tabNames.push(layer.toString());
    }

    /**
     * Add tab with name
     * @param {Layer} layer Added layer
     * @param {string} name Tab name
     */
    addTabWithName(layer, name) {
        this.addTab(layer);
        this.tabNames[this.tabNames.length - 1] = name;
    }

    /**
     * Remove tab layer
     * @override
     * @param {Layer} layer Removed layer
     */
    removeTab(layer) {
        const index = this.tabLayers.indexOf(layer);
        if (index >= 0) {
            this.tabLayers.splice(index, 1);
            this.tabNames.splice(index, 1);
        }
    }

    /**
     * Get currently tab
     * @override
     * @return {Layer} Currently tab layer
     */
    getTab() {
        const ret = this.tabLayers[this.currentlyTabIndex];
        return ret !== undefined ? ret : null;
    }

    /**
     * Get all tab layers
     * @abstract
     * @return {Array<Layer>} all tab layers
     */
    getTabs() {
        return this.tabLayers;
    }

    /**
     * Update layer
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        super.update(dt);

        const x = Input.mouse.getMouseX() - this.x;
        const y = Input.mouse.getMouseY() - this.y;
        if (Input.mouse.isPress(Input.mouse.mLeft())) {
            for (let i = 0; i < this.tabLayers.length; ++i) {
                const sx = this.x + this.tabX + (this.tabWidth + this.tabPadding) * i;
                if (sx < x && x < sx + this.tabWidth && this.tabY < y && y < this.tabY + this.tabHeight) {
                    this.currentlyTabIndex = i;
                    break;
                }
            }
        }
    }

    /**
     * Render layer
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        for (let i = 0; i < this.tabNames.length; ++i) {
            ctx.fillRect(this.x + this.tabX + (this.tabWidth + this.tabPadding) * i, this.y + this.tabY, 70, 15, `white`);
            ctx.fillText(`${this.tabNames[i]}`, this.x + this.tabX + (this.tabWidth + this.tabPadding) * (i + 0.4), this.y + this.tabY + this.tabHeight / 2.7, 0.5, 0.5, 12, `black`);
        }
        super.render(ctx);
    }
}
/**
 * Vanish state AI
 * - Determines the behavior of an entity
 * - Determines by state
 * - Manages state by name
 * - ### Initializes by vanish state
 * @extends {NamedStateAI}
 * @classdesc Vanish state AI to initialize by vanish state
 */
class VanishStateAI extends NamedStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Vanish state AI constructor
     * @constructor
     * @param {number} hideTime Hiding time
     * @param {number} showTime Showing time
     * @param {number} intervalTime Interval time
     */
    constructor(hideTime, showTime, intervalTime) {
        super(`vanish`);

        this.namedStates[`vanish`] = new VanishState(hideTime, true);
        this.namedStates[`show`] = new ShowState(showTime);
        this.namedStates[`interval`] = new VanishState(intervalTime, false);
    }
}
/**
 * Player gameover state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - ### The state in which the player got over game
 * @extends {BaseState}
 * @classdesc Player gameover state in which the player got over game
 */
class PGameoverState extends BaseState { // eslint-disable-line  no-unused-vars
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        return true;
    }
}
/**
 * Player jump state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - ### Decides actions while jumping
 * @extends {BaseState}
 * @classdesc Player jump state to decide actions while jumping
 */
class PJumpingState extends BaseState { // eslint-disable-line  no-unused-vars
    /**
     * Player jump state constructor
     * @constructor
     * @param {number} maxVelocityX Maximum speed
     * @param {number} movePower The power to move in the air
     */
    constructor(maxVelocityX, movePower) {
        super();

        /**
         * Maximum speed vector
         * @protected
         * @type {number}
         */
        this.maxVelocityX = maxVelocityX;
        /**
         * Force applied when moving
         * @protected
         * @type {number}
         */
        this.movePower = movePower;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // input
        let vx = 0;
        if (Input.key.isPressed(Input.key.left())) {
            vx += -1;
        }
        if (Input.key.isPressed(Input.key.right())) {
            vx += 1;
        }
        if (vx !== 0) {
            this.entity.setDirection(vx);
            if (this.entity.body.velocityX * vx < 0 || Math.abs(this.entity.body.velocityX) < Math.abs(this.maxVelocityX)) {
                this.entity.body.enforce(this.movePower * vx / dt, 0);
            }
        }
        if (Util.onGround(this.entity)) {
            if (this.entity.body.isFixX) {
                this.ai.changeState(`stationary`);
            } else {
                this.ai.changeState(`walk`);
            }
        }
        return true;
    }
}
/**
 * Player jump state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - ### Prepares for jumping
 * @extends {BaseState}
 * @classdesc Player jump state to prepare for jumping
 */
class PJumpState extends BaseState { // eslint-disable-line  no-unused-vars
    /**
     * Player jump state constructor
     * @constructor
     * @param {number} jumpPower Jumping force
     */
    constructor(jumpPower) {
        super();

        /**
         * Count for judging on air
         * @protected
         * @type {number}
         */
        this.inAirCount = 0;

        /**
         * Jump button pressed time
         * @protected
         * @type {number}
         */
        this.jumpPressedTime = 0;
        /**
         * Jump time
         * @protected
         * @type {number}
         */
        this.jumpDeltaTime = 0;

        /**
         * Jumping force
         * @protected
         * @type {number}
         */
        this.jumpPower = jumpPower;

        /**
         * Reserved velocity of X
         * @protected
         * @type {number}
         */
        this.reservedVelocityX = 0;
    }

    /**
     * Initialize
     * @override
     */
    init() {
        super.init();
        this.inAirCount = 0;
        this.jumpPressedTime = 0;
        this.jumpDeltaTime = 0;
        this.reservedVelocityX = this.entity.body.velocityX;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // animation
        this.entity.body.setNextAddVelocity(-this.entity.body.velocityX / 11, 0);
        if (Input.key.isPressed(Input.key.up())) {
            this.jumpPressedTime += 1;
        }
        this.jumpDeltaTime += 1;

        // judge
        if (!Util.onGround(this.entity)) {
            if (++this.inAirCount > 5) {
                this.ai.changeState(`stationary`);
            }
        } else {
            this.inAirCount = 0;
        }
        if (Util.canEnd(this.entity.getImage()) && this.inAirCount === 0) {
            // reset and jump
            this.entity.body.setNextAddVelocity(this.reservedVelocityX * 0.8 - this.entity.body.velocityX, -this.entity.body.velocityY);
            this.entity.body.enforce(0, -this.jumpPower * this.entity.material.mass * 1000 / dt * (this.jumpPressedTime + this.jumpDeltaTime) / 2 / this.jumpDeltaTime);
            this.ai.changeState(`jumping`);
        }
        return true;
    }
}
/**
 * Player punch state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - ### About to attack
 * @extends {BaseState}
 * @classdesc Player punch state that about to attack
 */
class PPunchState extends BaseState { // eslint-disable-line  no-unused-vars
    /**
     * Player punch state
     * @constructor
     */
    constructor() {
        super();

        /**
         * Whether it attacked or not
         * @protected
         * @type {boolean}
         */
        this.attacked = false;

        /**
         * Animation threshold for starting attack
         * @protected
         * @type {number}
         */
        this.threshold = 0.5;
    }

    /**
     * Make attack object
     * @protected
     * @return {Entity} Attack object
     */
    makeAttackObject() {
        const punch = this.entity.stage.addEntityByID(200000, {
            x: this.entity.x + (this.entity.directionX === 1 ? this.entity.width - 22 : -32 + 22),
            y: this.entity.y + 27,
            z: this.entity.z + 1,
            owner: this.entity,
        });
        return punch;
    }

    /**
     * Initialize
     * @override
     */
    init() {
        super.init();
        this.attacked = false;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        if (!Util.canEnd(this.entity.getImage()) && this.entity.getImage().getAnimationCount() < this.threshold) {
            return;
        }
        if (!this.attacked) {
            this.makeAttackObject();
            this.attacked = true;
        }
        // change state
        if (Util.canEnd(this.entity.getImage())) {
            // punch
            if (this.entity.body.isFixX) {
                this.ai.changeState(`stationary`);
            } else {
                this.ai.changeState(`walk`);
            }
        }
        return true;
    }
}
/**
 * Stationary state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - ### Moves, jumps, and attacks
 * @extends {BaseState}
 * @classdesc Stationary state to move, jump, and attack
 */
class PStationaryState extends BaseState { // eslint-disable-line  no-unused-vars
    /**
     * Player stationary state constructor
     * @constructor
     * @param {number} maxVelocityX Maximum speed
     * @param {number} walkPower The power to walk
     */
    constructor(maxVelocityX, walkPower) {
        super();

        /**
         * Maximum speed vector
         * @protected
         * @type {number}
         */
        this.maxVelocityX = maxVelocityX;
        /**
         * Force applied when moving
         * @protected
         * @type {number}
         */
        this.walkPower = walkPower;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        let vx = 0;
        // walk
        if (Input.key.isPressed(Input.key.left())) {
            vx += -1;
        }
        if (Input.key.isPressed(Input.key.right())) {
            vx += 1;
        }
        if (vx !== 0) {
            this.entity.setDirection(vx);
            if (this.entity.body.velocityX * vx < 0 || Math.abs(this.entity.body.velocityX) < this.maxVelocityX) {
                this.entity.body.enforce(vx * this.walkPower * this.entity.material.mass / dt, 0);
            }
            this.ai.changeState(`walk`);
        }
        if (Util.onGround(this.entity)) {
            if (Input.key.isPressed(Input.key.up())) {
                this.ai.changeState(`jump`);
            }
            if (Input.key.isPress(Input.key.yes())) {
                this.ai.changeState(`attack`);
            }
        }
        return true;
    }
}
/**
 * Player walk state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - ### Walks, jumps, and attacks
 * @extends {BaseState}
 * @classdesc Player walk state to walk, jump and attack
 */
class PWalkState extends BaseState { // eslint-disable-line  no-unused-vars
    /**
     * Player walk state constructor
     * @constructor
     * @param {number} maxVelocityX Maximum speed
     * @param {number} walkPower The power to walk
     */
    constructor(maxVelocityX, walkPower) {
        super();

        /**
         * Maximum speed vector
         * @protected
         * @type {number}
         */
        this.maxVelocityX = maxVelocityX;
        /**
         * Force applied when moving
         * @protected
         * @type {number}
         */
        this.walkPower = walkPower;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // input
        let input = false;
        let vx = 0;
        // walk
        if (Input.key.isPressed(Input.key.left())) {
            vx += -1;
            input = true;
        }
        if (Input.key.isPressed(Input.key.right())) {
            vx += 1;
            input = true;
        }
        if (vx !== 0) {
            this.entity.setDirection(vx);
            if (this.entity.body.velocityX * vx < 0 || Math.abs(this.entity.body.velocityX) < this.maxVelocityX) {
                this.entity.body.enforce(vx * this.walkPower * this.entity.material.mass / dt, 0);
            }
        }
        // stationary
        if (!input) {
            this.ai.changeState(`stationary`);
        }
        if (Util.onGround(this.entity)) {
            // jump
            if (Input.key.isPressed(Input.key.up())) {
                this.ai.changeState(`walkjump`);
            }
            // punch
            if (Input.key.isPress(Input.key.yes())) {
                this.ai.changeState(`attack`);
            }
        }
        return true;
    }
}
/**
 * Movement background
 * - Renders and update backgrdoun image
 * - Manages image as background
 * - ### Renders certain area
 * @extends {ImageBackground}
 * @classdesc Movement background to render certain area
 */
class AreaBackground extends ImageBackground { // eslint-disable-line  no-unused-vars
    /**
     * Movement background constructor
     * @constructor
     * @param {GameImage} backImage Background image
     * @param {number} x Background x position
     * @param {number} y Background x position
     * @param {number} areaWidth Renderign area width
     * @param {number} areaHeight Rendering area height
     */
    constructor(backImage, x, y, areaWidth, areaHeight) {
        super(backImage);

        /**
         * Background x position
         * @protected
         * @type {number}
         */
        this.x = x;
        /**
         * Background y position
         * @protected
         * @type {number}
         */
        this.y = y;
        /**
         * Renderign area width
         * @protected
         * @type {number}
         */
        this.areaWidth = areaWidth;
        /**
         * Renderign area height
         * @protected
         * @type {number}
         */
        this.areaHeight = areaHeight;
    }

    /**
     * Render background
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     * @param {number} screenWidth Scren width
     * @param {number} screenWidth Scren height
     */
    render(ctx, shiftX, shiftY, screenWidth, screenHeight) {
        let x = -shiftX - this.x;
        let y = -shiftY - this.y;
        const width = this.backImage.getWidth();
        const height = this.backImage.getHeight();
        if (x <= 0) {
            x = this.x + shiftX;
        } else if (this.areaWidth - screenWidth <= -shiftX - this.x) {
            x = this.x + shiftX - width + this.areaWidth;
        } else {
            x = -(screenWidth - width) / (this.areaWidth - screenWidth) * (shiftX + this.x);
        }
        if (y <= 0) {
            y = this.y + shiftY;
        } else if (this.areaHeight - screenHeight <= -shiftY - this.y) {
            y = this.y + shiftY - height + this.areaHeight;
        } else {
            y = -(screenHeight - height) / (this.areaHeight - screenHeight) * (shiftY + this.y);
        }
        this.backImage.render(ctx, x, y);
    }
}
/**
 * Fixed background
 * - Renders and update backgrdoun image
 * - Manages image as background
 * - ### Background that is fixed to certain coordinates
 * @extends {ImageBackground}
 * @classdesc Fixed background that is fixed to certain coordinates
 */
class FixedBackground extends ImageBackground { // eslint-disable-line  no-unused-vars
    /**
     * Fixed background constructor
     * @constructor
     * @param {GameImage} backImage Background image
     * @param {number} x Background x position
     * @param {number} y Background x position
     */
    constructor(backImage, x, y) {
        super(backImage);

        /**
         * Background x position
         * @protected
         * @type {number}
         */
        this.x = x;
        /**
         * Background y position
         * @protected
         * @type {number}
         */
        this.y = y;
    }

    /**
     * Render background
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     * @param {number} screenWidth Scren width
     * @param {number} screenWidth Scren height
     */
    render(ctx, shiftX, shiftY, screenWidth, screenHeight) {
        this.backImage.render(ctx, this.x + shiftX, this.y + shiftY);
    }
}
/**
 * AI listed object
 * - Object present on the stage that has coordinate and size
 * - Manages image
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - It can move by AI
 * - ### Manages AI by list
 * @extends {AutonomyEntity}
 * @classdesc AI listed object to manage AI by list
 */
class AIListedObject extends AutonomyEntity { // eslint-disable-line  no-unused-vars
    /**
     * AI listed object constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * AI list to control this
         * @protected
         * @type {Array<AI>}
         */
        this.ai = [];
    }

    /**
     * Add AI system
     * @override
     * @param {AI} ai AI to control this
     * @param {number} [priority=-1] Priority of AI. If it is a positive number count from the front, if it is a negative number count from the back
     */
    addAI(ai, priority = -1) {
        const index = priority < 0 ? this.ai.length + priority + 1 : priority;
        this.ai.splice(index, 0, ai);
        // initialize
        super.addAI(ai, priority);
    }

    /**
     * Remove AI system
     * @override
     * @param {AI} ai AI to control this
     */
    removeAI(ai) {
        const index = this.ai.indexOf(ai);
        if (index !== -1) {
            this.ai.splice(index, 1);
        }
    }

    /**
     * Update entity's AI
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateAI(dt) {
        for (const it of this.ai) {
            it.update(dt);
        }
    }

    /**
     * Apply entity's AI
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    applyAI(dt) {
        for (const it of this.ai) {
            if (it.apply(dt)) {
                break;
            }
        }
    }
}
/**
 * Character
 * - Object present on the stage that has coordinate and size
 * - Manages image
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - It can move by AI
 * - Manages AI by list
 * - Object that can be destroyed
 * - Object that can be damaged
 * - ### Implements damagable and animationable
 * @extends {AIListedObject}
 * @implements {IDamagable}
 * @classdesc Character that implements damagable and animationable
 */
class Character extends AIListedObject /* , IDamagable */ { // eslint-disable-line  no-unused-vars
    /**
     * Character constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Hit point
         * @protected
         * @type {number}
         */
        this.hp = 0;
    }

    /**
     * Set hit point
     * @param {number} hp Hit point
     */
    setHP(hp) {
        this.hp = hp;
    }

    /**
     * Get hit point
     * @override
     * @return {number} Hit point
     */
    getHP() {
        return this.hp;
    }

    /**
     * Damage object
     * @override
     * @param {number} damage Amount of damage
     */
    damage(damage) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.destroy();
        }
    }

    /**
     * Destroy object
     * @override
     */
    destroy() {
        this.stage.removeEntity(this);
    }
}
/**
 * Enemy
 * - Object present on the stage that has coordinate and size
 * - Manages image
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - It can move by AI
 * - Manages AI by list
 * - Object that can be destroyed
 * - Object that can be damaged
 * - Implements damagable and animationable
 * - ### Entity operated as the enemy
 * @implements {Character}
 * @classdesc Enemy to be operated as the enemy
 */
class Enemy extends Character { // eslint-disable-line  no-unused-vars
    /**
     * Enemy constructor
     * @constructor
     */
    constructor() {
        super();

        // initialize
        this.setHP(1);
        this.setDirection(1);
    }
}
/**
 * State character
 * - Object present on the stage that has coordinate and size
 * - Manages image
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - It can move by AI
 * - Manages AI by list
 * - Object that can be destroyed
 * - Object that can be damaged
 * - Implements damagable and animationable
 * - ### Entity that manages AI according to state and rendering by it
 * @extends {Character}
 * @classdesc State character that manages AI according to state and rendering by it
 */
class StateCharacter extends Character { // eslint-disable-line  no-unused-vars
    /**
     * State character constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * State of character
         * @protected
         * @type {State}
         */
        this.state = null;
    }

    /**
     * Apply entity's AI
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    applyAI(dt) {
        for (const it of this.ai) {
            if (it.apply(dt)) {
                this.state = it instanceof StateAI ? it.getState() : null;
                break;
            }
        }
    }

    /**
     * Render entity
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        if (this.state !== null && this.state.canRendering) {
            this.state.render(ctx, shiftX, shiftY);
        } else {
            super.render(ctx, shiftX, shiftY);
        }
    }
}
/**
 * Possessed object
 * - Object present on the stage that has coordinate and size
 * - Manages image
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - It can move by AI
 * - Manages AI by list
 * - Owned by someone
 * - ### Generated and owned by someone
 * @extends {AIListedObject}
 * @classdesc Possessed object that is generated and owned by someone
 */
class PossessedObject extends AIListedObject /* , IOwned */ { // eslint-disable-line  no-unused-vars
    /**
     * Possessed object constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Owned entity
         * @protected
         * @type {Entity}
         */
        this.owner = null;
    }

    /**
     * Set owned entity
     * @override
     * @param {Entity} owner Owned entity
     */
    setOwner(owner) {
        this.owner = owner;
    }

    /**
     * Get owned entity
     * @override
     * @return {Entity} Owned entity
     */
    getOwner() {
        return this.owner;
    }
}
/**
 * Tile object
 * - Object present on the stage that has coordinate and size
 * - Manages image
 * - It can be collided because it has material and collider
 * - It is fixed and no change will occur
 * - ### Decides the tile to be displayed by the ID and position, using the sprite indicating the stage tiles
 * @extends {ImmutableEntity}
 * @classdesc Tile object to decide the tile to be displayed by the IDand position, using the sprite indecating the stage tiles
 */
class TileObject extends ImmutableEntity { // eslint-disable-line  no-unused-vars
}
/**
 * Character builder
 * - Generates entity from json data
 * - Generate tile from json data
 * - ### Generate not tile but mutable entity from json data
 * @extends {TileBuilder}
 * @classdesc Character builder to generate mutable entity
 */
class CharacterBuilder extends TileBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Make image
     * @override
     * @protected
     * @param {JSON} image Entity information json data
     * @return {GameImage} Image
     */
    makeImage(image) {
        return this.imageBuilder.build(`chara`, image);
    }

    /**
     * Make rigid body
     * @protected
     * @param {JSON} body Rigid body information json data
     * @return {RigidBody} Rigid body
     */
    makeBody(body) {
        switch (body.type) {
            case `MaxAdopt`:
                return new MaxAdoptBody();
            case `Precise`:
                return new PreciseBody();
            case `Player`:
                return new PlayerBody();
            default:
                return null;
        }
    }

    /**
     * Make rigid body material
     * @protected
     * @param {JSON} material Rigid body material
     * @return {RigidBodyMaterial} Rigid body material
     */
    makeBodyMaterial(material) {
        switch (material.type) {
            case `Immutable`:
                return new ImmutableRigidMaterial(material.k, material.frictionX, material.frictionY, material.g);
            case `Mutable`:
                return new MutableRigidMaterial(material.k, material.frictionX, material.frictionY, material.g);
            default:
                return null;
        }
    }

    /**
     * Make AI
     * @protected
     * @param {JSON} ai AI information json data
     * @return {AI} AI
     */
    makeAI(ai) {
        switch (ai.type) {
            case `EnemyAI`:
                return new EnemyAI(this.makeAI(ai.ai));
            case `StraightAI`:
                return new StraightAI(ai.mvx, ai.px);
            case `JumpAI`:
                return new JumpAI(ai.jump);
            case `ElevatorAI`:
                {
                    const ret = new ElevatorAI(ai.velocity, ai.power);
                    for (const it of ai.floors) {
                        ret.addPosition(it.x, it.y);
                    }
                    return ret;
                }
            case `VanishStateAI`:
                return new VanishStateAI(ai.hide, ai.show, ai.interval);
            case `PlayerGameoverStateAI`:
                return new PlayerGameoverStateAI();
            case `PlayerBaseStateAI`:
                return new PlayerBaseStateAI();
            case `AttackObjectAI`:
                return new AttackObjectAI();
            case `StraightAttackAI`:
                return new StraightAttackAI(ai.vx === undefined ? 0 : ai.vx, ai.vy === undefined ? 0 : ai.vy, ai.px === undefined ? 0 : ai.px, ai.py === undefined ? 0 : ai.py);
            default:
                return null;
        }
    }

    /**
     * Make underlying entity
     * @protected
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} entity Entity information json data
     * @return {Entity} Underlying entity
     */
    makeEntityBase(deploy, entity) {
        switch (entity.type) {
            case `OnlyImage`:
                return new OnlyImageEntity();
            case `AIObject`:
                return new AIListedObject();
            case `Character`:
                return new Character();
            case `StateCharacter`:
                return new StateCharacter();
            case `Player`:
                return new Player();
            case `Enemy`:
                return new Enemy();
            case `Obstacle`:
                return new Obstacle();
            case `Door`:
                {
                    const ret = new DoorObject(deploy.stage, deploy.replace, deploy.pop);
                    const colliderData = this.trDyReplace(deploy, entity, `collider`);
                    const collider = this.makeCollider(colliderData);
                    collider.setAABB(this.makeAABB(colliderData));
                    ret.setCollider(collider);
                    return ret;
                }
            case `Sign`:
                {
                    const ret = new SignObject();
                    const colliderData = this.tryReplace(deploy, entity, `collider`);
                    const collider = this.makeCollider(colliderData);
                    collider.setAABB(this.makeAABB(colliderData));
                    ret.setCollider(collider);
                    const signData = this.tryReplace(deploy, entity, `sign`);
                    ret.setSign(this.imageBuilder.build(`event`, signData.image), signData.x, signData.y);
                    return ret;
                }
            case `Event`:
                {
                    const once = this.tryReplace(deploy, entity, `once`);
                    const ret = once ? new OnceEventEntity() : new ImmutableEvent();
                    const colliderData = this.tryReplace(deploy, entity, `collider`);
                    const collider = this.makeCollider(colliderData);
                    collider.setAABB(this.makeAABB(colliderData));
                    ret.setCollider(collider);
                    return ret;
                }
            case `Attack`:
                return new AttackObject(this.tryReplace(deploy, entity, `lifespan`));
            default:
                return null;
        }
    }

    /**
     * Build phsical body from json data
     * @protected
     * @param {MutableEntity} base Base entity
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} json Character json data
     */
    buildBody(base, deploy, json) {
        const bodyData = this.tryReplace(deploy, json, `body`);
        base.setRigidBody(this.makeBody(bodyData));
        if (base.body !== null) {
            base.body.enable = bodyData.enable === undefined ? true : bodyData.enable;
            base.body.setMaterial(this.makeBodyMaterial(bodyData.material));
        }
    }

    /**
     * Build AI from json data
     * @protected
     * @param {AutonomyEntity} base Base entity
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} json Character json data
     */
    buildAI(base, deploy, json) {
        const aiData = [];
        if (json.ai !== undefined) {
            for (const it of json.ai) {
                aiData.push(it);
            }
        }
        if (deploy !== undefined && deploy.ai !== undefined) {
            for (const it of deploy.ai) {
                const index = aiData.findIndex((v) => v.type === it.type);
                if (index >= 0) {
                    for (const item in it) {
                        if (it.hasOwnProperty(item)) {
                            aiData[index][item] = it[item];
                        }
                    }
                } else {
                    aiData.push(it);
                }
            }
        }
        for (const ai of aiData) {
            base.addAI(this.makeAI(ai));
        }
    }

    /**
     * Build owner by json data
     * @protected
     * @param {IOwned} base Base entity
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} json Character json data
     */
    buildOwner(base, deploy, json) {
        if (deploy !== undefined && deploy.owner !== undefined) {
            base.setOwner(deploy.owner);
        }
    }

    /**
     * Build character from json data
     * @override
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} json Character json data
     * @return {Entity} Generated character
     */
    build(deploy, json) {
        const base = this.makeEntityBase(deploy, json);
        this.buildBase(base, deploy, json);
        if (BaseUtil.implementsOf(base, IOwned)) {
            this.buildOwner(base, deploy, json);
        }
        if (base instanceof ImagedEntity) {
            this.buildImage(base, deploy, json);
        }
        if (base instanceof InfluentialEntity) {
            this.buildPhysical(base, deploy, json);
        }
        if (base instanceof MutableEntity) {
            this.buildBody(base, deploy, json);
        }
        if (base instanceof AutonomyEntity) {
            this.buildAI(base, deploy, json);
        }
        return base;
    }
}
/**
 * Joint body
 * - Update entity by physical quantity
 * - Adopt the maximum for adding to the next speed
 * - ### Fits within a certain length range of some object
 * @extends {MaxAdoptBody}
 * @classdesc Joint body to fit within a certain length range of some object
 */
class JointBody extends PreciseBody { // eslint-disable-line  no-unused-vars
    /**
     * Joint body constructor
     * @constructor
     * @param {number} jointingX Jointing x position (object that attached it)
     * @param {number} jointingY Jointing y position (object that attached it)
     */
    constructor(jointingX, jointingY) {
        super();

        /**
         * Jointing x position
         * @protected
         * @type {number}
         */
        this.jointingX = jointingX;
        /**
         * Jointing y position
         * @protected
         * @type {number}
         */
        this.jointingY = jointingY;

        /**
         * Jointed entity
         * @protected
         * @type {Entity}
         */
        this.jointed = null;
        /**
         * Jointed x position
         * @protected
         * @type {number}
         */
        this.jointedX = 0;
        /**
         * Jointed y position
         * @protected
         * @type {number}
         */
        this.jointedY = 0;

        /**
         * Jointed length
         * @protected
         * @type {number}
         */
        this.length = 0;
    }

    /**
     * Joint to something
     * @override
     * @param {Entity} jointed Jointed entity
     * @param {number} jointedX Jointed x position
     * @param {number} jointedY Jointed y position
     * @param {number} length Jointed length
     */
    joint(jointed, jointedX, jointedY, length) {
        this.jointed = jointed;
        this.jointedX = jointedX;
        this.jointedY = jointedY;
        this.length = length;
    }

    /**
     * Unjoint
     * @override
     */
    unjoint() {
        this.jointed = null;
    }

    /**
     * Update velocity
     * @override
     * @protected
     */
    updateVelocity(dt) {
        if (this.jointed !== null) {
            if (this.jointed instanceof MutableEntity) {
                if (this.jointed.body !== null) {
                    this.material.velocityX = this.jointed.velocityX;
                    this.material.velocityY = this.jointed.velocityY;
                }
            } else {
                this.material.velocityX = 0;
                this.material.velocityY = 0;
            }
        } else {
            super.updateVelocity(dt);
        }
    }

    /**
     * Update entity by velocity
     * @override
     * @param {number} dt Delta time
     */
    updateEntity(dt) {
        super.updateEntity(dt);

        if (this.jointed !== null) {
            const ex = this.entity.directionX >= 0 ? this.entity.x + this.jointingX : this.entity.x + this.entity.width - this.jointingX;
            const ey = this.entity.directionY > 0 ? this.entity.y + this.jointingY : this.entity.y + this.entity.height - this.jointingY;
            const jx = this.jointed.directionX >= 0 ? this.jointed.x + this.jointedX : this.jointed.x + this.jointed.width - this.jointedX;
            const jy = this.jointed.directionY > 0 ? this.jointed.y + this.jointedY : this.jointed.y + this.jointed.height - this.jointedY;
            const dx = jx - ex;
            const dy = jy - ey;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d > this.length) {
                const l = d - this.length;
                for (const it of this.entity.collider.collisions) {
                    if ((it.colliding === this.entity && it.nx * dx > 0) || (it.collided === this.entity && it.nx * dx < 0)) {
                        if (this.length < Math.abs(dx)) {
                            dy = dy * d / l + Math.sign(dy);
                        }
                        dx = 0;
                    }
                    if ((it.colliding === this.entity && it.ny * dy > 0) || (it.collided === this.entity && it.ny * dy < 0)) {
                        if (this.length < Math.abs(dy)) {
                            dx = dx * d / l + Math.sign(dx);
                        }
                        dy = 0;
                    }
                }
                this.entity.deltaMove(l * dx / d, l * dy / d);
            }
        }
    }
}
/**
 * Axis Aligned Bounding Box
 * - Uses for rough collision determination
 * - Decides from 4 vertices
 * - ### Considers the direction
 * @extends {SimpleAABB}
 * @classdesc Directional Axis Aligned Bounding Box to consider the direction
 */
class DirectionalAABB extends SimpleAABB { // eslint-disable-line  no-unused-vars
    /**
     * Update AABB
     * @override
     * @param {number} startX X coordinate of the upper left
     * @param {number} startY Y coordinate of the upper left
     * @param {number} endX X coordinate of the lower right
     * @param {number} endY Y coordinate of the lower right
     * @param {InfluentialEntity} entity Entity attaced it
     */
    update(startX, startY, endX, endY, entity) {
        if (entity instanceof MutableEntity) {
            if (entity.directionX >= 0) {
                this.startXVal = entity.x + startX;
                this.endXVal = entity.x + endX;
            } else {
                this.startXVal = entity.width - endX + entity.x;
                this.endXVal = entity.width - startX + entity.x;
            }
            if (entity.directionY <= 0) {
                this.startYVal = entity.y + startY;
                this.endYVal = entity.y + endY;
            } else {
                this.startYVal = entity.height - endY + entity.y;
                this.endYVal = entity.height - startY + entity.y;
            }
        }
    }
}
/**
 * Simple Timer
 * - Measure the time
 * - ### Measure time by Date
 * @extends {Timer}
 * @classdesc Simple TImer to measure time by Date
 */
class RecordedTimer extends SimpleTimer { // eslint-disable-line  no-unused-vars
    /**
     * Simple timer constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Elapsed time
         * @protected
         * @type {number}
         */
        this.elapsedTime = 0;

        /**
         * Recorded time
         * @protected
         * @type {Object<string, Array<number>>}
         */
        this.recordedTime = {};

        /**
         * Recorded max time
         * @protected
         * @type {Object<string, number>}
         */
        this.maxTime = {};
        /**
         * Recorded min time
         * @protected
         * @type {Object<string, number>}
         */
        this.minTime = {};
        /**
         * Recorded mean time
         * @protected
         * @type {Object<string, number>}
         */
        this.meanTime = {};
    }

    /**
     * Update timer
     * @param {number} dt Delta time
     */
    update(dt) {
        super.update(dt);
        for (const it in this.namedTimer) {
            if (this.namedTimer.hasOwnProperty(it)) {
                if (this.recordedTime[it] === undefined) {
                    this.recordedTime[it] = [];
                }
                this.recordedTime[it].push(this.namedTimer[it]);
            }
        }

        // register
        this.elapsedTime += dt;
        if (this.elapsedTime > 1000) {
            this.elapsedTime -= 1000;
            for (const it in this.recordedTime) {
                if (this.recordedTime.hasOwnProperty(it)) {
                    this.maxTime[it] = 0;
                    this.minTime[it] = Number.MAX_SAFE_INTEGER;
                    this.meanTime[it] = 0;
                    for (const e of this.recordedTime[it]) {
                        this.maxTime[it] = Math.max(this.maxTime[it], e);
                        this.minTime[it] = Math.min(this.minTime[it], e);
                        this.meanTime[it] += e;
                    }
                    this.meanTime[it] = Math.floor(this.meanTime[it] / this.recordedTime[it].length);
                    this.recordedTime[it].length = 0;
                }
            }
        }
    }

    /**
     * Render timer
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Timer x position
     * @param {number} y Timer y position
     */
    render(ctx, x, y) {
        for (const name in this.namedTimer) {
            if (this.namedTimer.hasOwnProperty(name)) {
                const max = this.maxTime[name] === undefined ? 0 : this.maxTime[name];
                const min = this.minTime[name] === undefined ? 0 : this.minTime[name];
                const mean = this.meanTime[name] === undefined ? 0 : this.meanTime[name];
                ctx.fillText(`${name} : ${max} - ${min} (${mean}) msec`, x, y, 0.0, 0.0, 20, `white`);
                y += 30;
            }
        }
    }
}
/**
 * Editor event builder
 * - Generates event from json data
 * - Generate simple event
 * - Gemerates under event
 * - ### Generates editor event
 * @extends {UnderEventBuilder}
 * @classdesc Editor event builder to generate editor event
 */
class EditorEventBuilder extends UnderEventBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Build event from json data
     * @override
     * @param {JSON} json Event json data
     * @return {GameEvent} Generated event
     */
    build(json) {
        return new EditorEvent(super.build(json));
    }
}
/**
 * Editor image
 * - Renders image
 * - Manages animation
 * - Manages multiple animations
 * - Manages animation by name
 * - It can save data
 * - Considers the direction
 * - Clips area when rendering
 * - ### Enables to use in editor
 * @extends {NamedAnimation}
 * @implements {IEditorSave}
 * @implements {IDirectionalImage}
 * @implements {IClipImage}
 * @classdesc Editor image to enable to use in editor
 */
class EditorImage extends NamedAnimation /* , IEditorSave, IDirectionalImage, IClipImage */ { // eslint-disable-line  no-unused-vars
    /**
     * Editor image constructor
     * @constructor
     * @param {GameImage} baseImage Based image
     * @param {string} root Image root path
     */
    constructor(baseImage, root) {
        super();

        /**
         * Based image
         * @protected
         * @type {GameImage}
         */
        this.baseImage = baseImage;
        /**
         * Image root path
         * @protected
         * @type {string}
         */
        this.root = root;
    }

    /**
     * Load background resource path
     * @protected
     * @param {number} id Background image ID
     */
    loadPath(id) {
        return ResourceManager.image.getPath(id).replace(`${this.root}/`, ``);
    }

    /**
     * Get json data for saving
     * @override
     * @return {JSON} Json data for saving
     */
    getSaveData() {
        const ret = {};
        let id = 0;
        if (this.baseImage instanceof MultiNamedAnimation) {
            ret.type = `multianime`;
            ret.animations = [];
            for (const it in this.baseImage.animation) {
                if (this.baseImage.animation.hasOwnProperty(it)) {
                    const anime = this.baseImage.animation[it];
                    if (anime instanceof SingleAnimation) {
                        let width = 0;
                        let height = 0;
                        const animeData = {};
                        animeData.name = it;
                        if (anime.loop) {
                            animeData.loop = anime.loop;
                        }
                        animeData.animaton = [];
                        for (const e of anime.animation) {
                            if (e instanceof TileImage) {
                                id = e.imageID;
                                width = e.width;
                                height = e.height;
                                const data = {};
                                data.x = e.srcX;
                                data.y = e.srcY;
                                data.width = e.srcW;
                                data.height = e.srcH;
                                animeData.animation.push(data);
                            }
                        }
                        animeData.width = width;
                        animeData.height = height;
                        ret.animations.push(animeData);
                    }
                }
            }
        } else if (this.baseImage instanceof SingleAnimation) {
            ret.type = `anime`;
            if (this.baseImage.loop) {
                ret.loop = this.baseImage.loop;
            }
            ret.animation = [];
            for (const it of this.baseImage.animation) {
                if (it instanceof TileImage) {
                    const data = {};
                    id = it.imageID;
                    data.x = it.srcX;
                    data.y = it.srcY;
                    data.width = it.srcW;
                    data.height = it.srcH;
                    ret.animation.push(data);
                }
            }
        } else if (this.baseImage instanceof TileImage) {
            id = this.baseImage.imageID;
            ret.type = `tile`;
            ret.width = this.baseImage.width;
            ret.height = this.baseImage.height;
            ret.x = this.baseImage.srcX;
            ret.y = this.baseImage.srcY;
            ret.width = this.baseImage.width === this.baseImage.srcW ? undefined : this.baseImage.srcW;
            ret.height = this.baseImage.height === this.baseImage.srcH ? undefined : this.baseImage.srcH;
        } else if (this.baseImage instanceof SingleImage) {
            id = this.baseImage.imageID;
            ret.type = `single`;
            ret.width = this.baseImage.width;
            ret.height = this.baseImage.height;
        }
        ret.file = this.loadPath(id);
        return ret;
    }

    /**
     * Set direction of image
     * @override
     * @param {number} directionX Direction of x
     * @param {number} directionY Direction of y
     */
    setDirection(directionX, directionY) {
        if (BaseUtil.implementsOf(this.baseImage, IDirectionalImage)) {
            this.baseImage.setDirection(directionX, directionY);
        }
    }

    /**
     * Set clipingArea
     * @override
     * @param {number} clipX Cliping x position
     * @param {number} clipY Cliping y position
     * @param {number} clipWidth Cliping width
     * @param {number} clipWidth Cliping height
     */
    setClipArea(clipX, clipY, clipWidth, clipHeight) {
        if (BaseUtil.implementsOf(this.baseImage, IClipImage)) {
            this.baseImage.setClipArea(clipX, clipY, clipWidth, clipHeight);
        }
    }

    /**
     * Set animation name
     * @override
     * @param {string} name Animation name
     */
    setName(name) {
        if (this.baseImage instanceof NamedAnimation) {
            this.baseImage.setName(name);
        }
    }

    /**
     * Get animation from animations
     * @override
     * @return {GameAnimation} animation
     */
    getAnimation() {
        return this.baseImage instanceof MultiAnimation ? this.baseImage.getAnimation() : null;
    }
    /**
     * Get list of animation
     * @override
     * @protected
     * @return {Array<GameAnimation>} List of animation
     */
    getAnimations() {
        return this.baseImage instanceof MultiAnimation ? this.baseImage.getAnimations() : null;
    }

    /**
     * Set animation into animations
     * @override
     * @param {GameAnimation} animation Set animation
     */
    setAnimation(animation) {
        if (this.baseImage instanceof MultiAnimation) {
            this.baseImage.setAnimation(animation);
        }
    }

    /**
     * Set all animation size
     * @override
     * @param {number} width Image width
     * @param {number} height Image height
     */
    setAllSize(width, height) {
        if (this.baseImage instanceof MultiAnimation) {
            this.baseImage.setAllSize(width, height);
        }
    }

    /**
     * Set all animation ID
     * @override
     * @param {number} imageID Image ID
     */
    setAllImageID(imageID) {
        if (this.baseImage instanceof MultiAnimation) {
            this.baseImage.setAllImageID(imageID);
        }
    }

    /**
     * Whether to loop or not
     * @override
     * @return {boolean} Whether to loop or not
     */
    isLoop() {
        return this.baseImage instanceof GameAnimation && this.baseImage.isLoop();
    }

    /**
     * Whether the animation has ended or not
     * @override
     * @return {boolean} Whether the animation has ended or not
     */
    isEnded() {
        return !(this.baseImage instanceof GameAnimation) || this.baseImage.isEnded();
    }

    /**
     * Pause animation
     * @override
     */
    pause() {
        if (this.baseImage instanceof GameAnimation) {
            this.baseImage.pause();
        }
    }

    /**
     * Restore animation
     * @override
     */
    restore() {
        if (this.baseImage instanceof GameAnimation) {
            this.baseImage.restore();
        }
    }

    /**
     * Get animation count indicating animation progress
     * @return {number} Animation count
     */
    getAnimationCount() {
        return this.baseImage instanceof GameAnimation ? this.baseImage.getAnimationCount() : 0;
    }

    /**
     * Add animation
     * @override
     * @param {GameImage} image Animation element
     * @param {number} delta Animation delta time
     */
    addAnimation(image, delta) {
        if (this.baseImage instanceof GameAnimation) {
            this.baseImage.addAnimation(image, delta);
        }
    }

    /**
     * Get list of animation elements
     * @override
     * @protected
     * @return {Array<GameImage>} List of animation elements
     */
    getImages() {
        return this.baseImage instanceof GameAnimation ? this.baseImage.getImages() : [];
    }

    /**
     * Get current image of animation
     * @override
     * @protected
     * @return {GameImage} Current image of animation
     */
    getCurrentImage() {
        return this.baseImage instanceof GameAnimation ? this.baseImage.getCurrentImage() : null;
    }

    /**
     * Set image size
     * @override
     * @param {number} width Image width
     * @param {number} height Image height
     */
    setSize(width, height) {
        this.baseImage.setSize(width, height);
    }

    /**
     * Set image ID
     * @override
     * @param {number} imageID Image ID
     */
    setImageID(imageID) {
        this.baseImage.setImageID(imageID);
    }

    /**
     * Get image ID
     * @override
     * @return {number} Image ID
     */
    getImageID() {
        return this.baseImage.getImageID();
    }

    /**
     * Get image width
     * @override
     * @return {number} Imag width
     */
    getWidth() {
        return this.baseImage.getWidth();
    }

    /**
     * Get image height
     * @override
     * @return {number} Imag height
     */
    getHeight() {
        return this.baseImage.getHeight();
    }

    /**
     * Get source offset x position
     * @override
     * @protected
     * @type {number}
     */
    getSourceOffsetX() {
        return this.baseImage.getSourceOffsetY();
    }

    /**
     * Get source offset y position
     * @override
     * @protected
     * @type {number}
     */
    getSourceOffsetY() {
        return this.baseImage.getSourceOffsetY();
    }

    /**
     * Get source width
     * @override
     * @protected
     * @type {number}
     */
    getSourceWidth() {
        return this.getSourceWidth();
    }

    /**
     * Get source height
     * @override
     * @protected
     * @type {number}
     */
    getSourceHeight() {
        return this.getSourceHeight();
    }

    /**
     * Initialize animation
     * @override
     */
    init() {
        this.baseImage.init();
    }

    /**
     * Update animation
     * @override
     * @param {number} dt
     */
    update(dt) {
        this.baseImage.update(dt);
    }

    /**
     * Render animation
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx, x, y) {
        this.baseImage.render(ctx, x, y);
    }
}
/**
 * Editor scene
 * - Controls updating and rendering
 * - It consists of layers
 * - Basic form of a scene composed of layers
 * - ### Makes stage
 * @extends {BaseLayeredScene}
 * @classdesc Editor scene to make stage
 */
class EditorScene extends BaseLayeredScene { // eslint-disable-line  no-unused-vars
    /**
     * Editor scene constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Stage instance
         * @protected
         * @type {StageManager}
         */
        this.stageManager = null;
        /**
         * Event manager
         * @protected
         * @type {EventManager}
         */
        this.eventManager = null;

        /**
         * Chip save data
         * @protected
         * @type {IEditorSave}
         */
        this.chipData = null;
        /**
         * Entity save data
         * @protected
         * @type {IEditorSave}
         */
        this.entityData = null;

        /**
         * Save target
         * @protected
         * @type {IEditorSave}
         */
        this.saveTarget = null;
    }
    /**
     * Initialize scene
     * @override
     */
    init() {
        // set stage manager
        const manager = new EditorStageManager();
        manager.setStageParser(new EditorStageParser());
        manager.setStageSize(GameScreen.it.width, GameScreen.it.height - 250);
        manager.pushStage(`map1`);
        this.stageManager = manager;
        this.saveTarget = manager;

        // make event manager
        this.eventManager = new QueueEventManager();

        // make layer
        const chipLayer = new ChipLayer();
        const entityLayer = new EntityLayer();
        const debug = new DebugLayer(new VolatileDebugger());
        // set save data
        this.chipData = chipLayer;
        this.entityData = entityLayer;

        // make real layer
        const chip = new FloatLayer(chipLayer);
        const entity = new FloatLayer(new DragScrollLayer(entityLayer));

        // set information
        const stage = this.stageManager.getStage();
        if (BaseUtil.implementsOf(stage, IEditable)) {
            stage.setTileSelection(chipLayer);
            stage.setEntitySelection(entityLayer);
        }

        this.addLayer(chip);
        this.addLayer(entity);
        this.addLayer(debug);

        debug.setSize(GameScreen.it.width, GameScreen.it.height - 250);
        chip.setPosition(20, GameScreen.it.height - 230, 0);
        chip.setSize(GameScreen.it.width / 2 - 40, 210);
        entity.setPosition(GameScreen.it.width / 2 + 20, GameScreen.it.height - 230, 0);
        entity.setSize(GameScreen.it.width / 2 - 40, 210);
        chipLayer.setPosition(20, GameScreen.it.height - 230, 0);
        chipLayer.setSize(GameScreen.it.width / 2 - 40, 210);
        entityLayer.setPosition(GameScreen.it.width / 2 + 20, GameScreen.it.height - 230, 0);
        entityLayer.setSize(GameScreen.it.width / 2 - 40, 210);
    }


    /**
     * Update scene
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        // update
        super.update(dt);

        // update stage
        this.stageManager.update(dt);
        // update event
        this.eventManager.update(dt);

        // save stage (S)
        if (Input.key.isPress(Input.key.a() + 18)) {
            console.log(JSON.stringify(this.saveTarget.getSaveData()));
        }
        // save tile (T)
        if (Input.key.isPress(Input.key.a() + 19)) {
            console.log(JSON.stringify(this.chipData.getSaveData()));
        }
        // save entity (U)
        if (Input.key.isPress(Input.key.a() + 20)) {
            console.log(JSON.stringify(this.entityData.getSaveData()));
        }
        // change debug mode (D)
        if (Input.key.isPress(Input.key.a() + 3)) {
            GameDebugger.debug = !GameDebugger.debug;
        }

        // reload images (G)
        if (Input.key.isPress(Input.key.a() + 6)) {
            ResourceManager.image.reload();
        }
    }

    /**
     * Render scene
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        this.stageManager.render(ctx);
        this.eventManager.render(ctx);
        ctx.fillRect(0, GameScreen.it.height - 250, GameScreen.it.width, 250, `blue`);
        super.render(ctx);
    }
}
/**
 * Chip layer
 * - Performs drawing processing collectively
 * - It can manage layers by tab
 * - Shows name and it can tap name tab
 * - Selects something and set selected
 * - It can save data
 * - ### Selects chips
 * @extends {NamedTabbedLayer}
 * @implements {ISelection}
 * @implements {IEditorSave}
 * @classdesc Chip layer to select chips
 */
class ChipLayer extends NamedTabbedLayer /* , ISelection, IEditorSave */ { // eslint-disable-line  no-unused-vars
    /**
     * Chip layer constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Tile information
         * @protected
         * @type {Object<number, JSON>}
         */
        this.tileInfo = null;

        /**
         * List of chip layer
         * @protected
         * @type {Array<SelectionLayer>}
         */
        this.chipLayers = [];
        /**
         * Selected item
         * @protected
         * @type {ISelection}
         */
        this.selected = null;
    }

    /**
     * Set information for selection
     * @override
     * @param {JSON} info Selection information
     */
    setSelectionInfo(info) {
        this.tileInfo = {};
        for (const it in info) {
            if (info.hasOwnProperty(it) && !isNaN(it)) {
                const fileName = info[it].image.file;
                if (this.tileInfo[fileName] === undefined) {
                    this.tileInfo[fileName] = {};
                }
                this.tileInfo[fileName][it] = info[it];
            }
        }
    }

    /**
     * Get selected tile ID
     * @override
     * @return {number} Selected tile ID (return -1 if not selected)
     */
    getSelected() {
        return this.chipLayers[this.currentlyTabIndex].getSelected();
    }

    /**
     * Set selected tile by ID
     * @override
     * @param {number} id Tile ID
     */
    setSelected(id) {
        for (let i = 0; i < this.chipLayers.length; ++i) {
            this.chipLayers[i].setSelected(id);
            if (this.chipLayers[i].getSelected() !== -1) {
                this.currentlyTabIndex = i;
            }
        }
    }

    /**
     * Get json data for saving
     * @override
     * @return {JSON} Json data for saving
     */
    getSaveData() {
        const data = {};
        data.tiles = [];
        for (let i = 0; i < this.chipLayers.length; ++i) {
            const tile = {};
            tile.file = this.tabNames[i];
            tile.chips = this.chipLayers[i].getSaveData();
            data.tiles.push(tile);
        }
        return data;
    }

    /**
     * Initialize layer
     * @override
     */
    init() {
        for (const it in this.tileInfo) {
            if (this.tileInfo.hasOwnProperty(it)) {
                // create layer
                const layer = new SingleChipLayer(it);
                layer.setSelectionInfo(this.tileInfo[it]);
                this.chipLayers.push(layer);
                this.addTabWithName(new DragScrollLayer(layer), it);
            }
        }
    }

    /**
     * Render layer
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        ctx.fillRect(this.x, this.y, this.width, this.height, `green`);
        super.render(ctx);
    }
}
// TODO: Make the selection system more uniform
/**
 * Selection layer
 * - Performs drawing processing collectively
 * - Clips area when rendering
 * - Selects something and set selected
 * - It can save data
 * - ### Selects something
 * @interface
 * @extends {ClipLayer}
 * @implements {ISelection}
 * @implements {IEditorSave}
 * @classdesc Selection layer to select something
 */
class SelectionLayer extends ClipLayer /* , ISelection, IEditorSave */ { // eslint-disable-line  no-unused-vars
    /**
     * Set information for selection
     * @abstract
     * @param {JSON} info Selection information
     */
    setSelectionInfo(info) {}

    /**
     * Get selected ID
     * @abstract
     * @return {number} Selected ID (return -1 if not selected)
     */
    getSelected() {}

    /**
     * Set selected by ID
     * @abstract
     * @param {number} id Selected ID
     */
    setSelected(id) {}

    /**
     * Get json data for saving
     * @abstract
     * @return {JSON} Json data for saving
     */
    getSaveData() {}
}
/**
 * Single chip layer
 * - Performs drawing processing collectively
 * - Clips area when rendering
 * - Selects something and set selected
 * - It can save data
 * - Selects something
 * - ### Selects chip
 * @extends {ClipLayer}
 * @classdesc Single chip layer to select chip
 */
class SingleChipLayer extends SelectionLayer { // eslint-disable-line  no-unused-vars
    /**
     * Single chip layer constructor
     * @constructor
     * @param {string} fileName Chip file path
     */
    constructor(fileName) {
        super();
        /**
         * Tile inforamtion json data
         * @protected
         * @type {Object<number, JSON>}
         */
        this.tileInfo = null;

        /**
         * Chip file path
         * @protected
         * @type {string}
         */
        this.fileName = fileName;
        /**
         * Tile image
         * @protected
         * @type {GameImage}
         */
        this.tileImage = null;

        /**
         * Selection tile
         * @protected
         * @type {JSON}
         */
        this.selectTile = null;
        /**
         * Selected tile
         * @protected
         * @type {JSON}
         */
        this.selectedTile = null;
    }

    /**
     * Set information for selection
     * @override
     * @param {JSON} info Selection information
     */
    setSelectionInfo(info) {
        this.tileInfo = info;
    }

    /**
     * Get selected tile ID
     * @override
     * @return {number} Selected tile ID (return -1 if not selected)
     */
    getSelected() {
        return this.selectedTile === null ? -1 : this.selectedTile.id;
    }

    /**
     * Set selected tile by ID
     * @override
     * @param {number} id Tile ID
     */
    setSelected(id) {
        this.selectedTile = this.tileInfo[id];
        if (this.selectedTile === undefined) {
            this.selectedTile = null;
        }
    }

    /**
     * Get json data for saving
     * @override
     * @return {JSON} Json data for saving
     */
    getSaveData() {
        const data = [];
        const list = [];
        // sort
        for (const it in this.tileInfo) {
            if (this.tileInfo.hasOwnProperty(it) && !isNaN(it)) {
                list.push(parseInt(it));
            }
        }
        list = list.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
        for (const it of list) {
            data.push(this.tileInfo[it]);
        }
        return data;
    }

    /**
     * Initialize layer
     * @override
     */
    init() {
        super.init();
        this.tileImage = new ClipImage(new SingleImage(ResourceManager.image.load(`tile/${this.fileName}`)));
        this.tileImage.init();
    }

    /**
     * Update layer
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        super.update(dt);

        this.tileImage.update(dt);
        if (BaseUtil.implementsOf(this.tileImage, IClipImage)) {
            this.tileImage.setClipArea(this.clipX, this.clipY, this.clipWidth, this.clipHeight);
        }
        // tile selection
        this.selectTile = null;
        let x = Input.mouse.getMouseX();
        let y = Input.mouse.getMouseY();
        this.width = this.tileImage.getWidth();
        this.height = this.tileImage.getHeight();
        // check layer
        if (x < this.clipX || this.clipX + this.clipWidth < x || y < this.clipY || this.clipY + this.clipHeight < y) {
            return;
        }
        x -= this.x;
        y -= this.y;
        for (const id in this.tileInfo) {
            if (this.tileInfo.hasOwnProperty(id)) {
                const tile = this.tileInfo[id];
                if (tile.image.x <= x && x < tile.image.x + tile.image.width && tile.image.y <= y && y < tile.image.y + tile.image.height) {
                    this.selectTile = tile;
                    break;
                }
            }
        }
        if (Input.mouse.isPress(Input.mouse.mLeft())) {
            this.selectedTile = this.selectTile;
        }
    }

    /**
     * Render layer
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        this.tileImage.render(ctx, this.x, this.y);
        if (this.selectTile !== null) {
            ctx.strokeRect(this.selectTile.image.x + this.x, this.selectTile.image.y + this.y, this.selectTile.image.width, this.selectTile.image.height, `red`);
        }
        if (this.selectedTile !== null) {
            ctx.strokeRect(this.selectedTile.image.x + this.x, this.selectedTile.image.y + this.y, this.selectedTile.image.width, this.selectedTile.image.height, `white`);
        }
    }
}
/**
 * Single entity layer
 * - Performs drawing processing collectively
 * - Clips area when rendering
 * - Selects something and set selected
 * - It can save data
 * - Selects something
 * - ### Selects a entity
 * @extends {SelectionLayer}
 * @classdesc Entity layer to select a entity
 */
class SingleEntityLayer extends SelectionLayer { // eslint-disable-line  no-unused-vars
    /**
     * Single entity layer constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Entity information json data
         * @protected
         * @type {JSON}
         */
        this.entityData = null;

        /**
         * Entity animation
         * @type {GameImage}
         */
        this.animation = null;

        /**
         * Selection entity
         * @protected
         * @type {JSON}
         */
        this.selectEntity = null;

        /**
         * Selected entity
         * @protected
         * @type {JSON}
         */
        this.selectedEntity = null;
    }

    /**
     * Set information for selection
     * @override
     * @param {JSON} info Selection information
     */
    setSelectionInfo(info) {
        this.entityData = info;
    }

    /**
     * Get selected entity ID
     * @override
     * @return {number} Selected entity ID (return -1 if not selected)
     */
    getSelected() {
        return this.selectedEntity === null ? -1 : this.selectedEntity.id;
    }

    /**
     * Set selected entity by ID
     * @override
     * @param {number} id Entity ID (if not selected, -1)
     */
    setSelected(id) {
        this.selectedEntity = id === this.entityData.id ? this.entityData : null;
    }

    /**
     * Initialize layer
     * @override
     */
    init() {
        // set size
        this.setSize(this.entityData.width, this.entityData.height);

        // load animation
        if (this.entityData.image !== undefined) {
            const file = ResourceManager.image.load(`chara/${this.entityData.image.file}`);
            if (this.entityData.image.type === `single`) {
                this.animation = new ClipImage(new SingleImage(file, this.entityData.image.width, this.entityData.image.height));
            } else if (this.entityData.image.type === `anime`) {
                const animation = new ClipAnimation(new SingleAnimation());
                for (const it of this.entityData.image.animation) {
                    animation.addAnimation(new ClipImage(new TileImage(file, this.entityData.image.width, this.entityData.image.height, it.x, it.y, it.width, it.height)), it.delta);
                }
                this.animation = animation;
            } else if (this.entityData.image.type === `multianime`) {
                const animation = new ClipAnimation(new SingleAnimation());
                for (const it of this.entityData.image.animations[0].animation) {
                    animation.addAnimation(new ClipImage(new TileImage(file, this.entityData.image.width, this.entityData.image.height, it.x, it.y, it.width, it.height)), it.delta);
                }
                this.animation = animation;
            }
            this.animation.init();
        }
    }

    /**
     * Update layer
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        if (this.animation !== null) {
            this.animation.update(dt);
            if (BaseUtil.implementsOf(this.animation, IClipImage)) {
                this.animation.setClipArea(this.clipX, this.clipY, this.clipWidth, this.clipHeight);
            }
        }
        this.selectEntity = null;
        let x = Input.mouse.getMouseX();
        let y = Input.mouse.getMouseY();
        // check cliping
        if (x < this.clipX || this.clipX + this.clipWidth < x || y < this.clipY || this.clipY + this.clipHeight < y) {
            return;
        }
        x -= this.x;
        y -= this.y;
        // check layer
        if (0 <= x && x < this.width && 0 <= y && y < this.height) {
            this.selectEntity = this.entityData;
        }
        if (Input.mouse.isPress(Input.mouse.mLeft())) {
            this.selectedEntity = this.selectEntity;
        }
    }

    /**
     * Render layer
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        if (this.x + this.width < this.clipX || this.clipX + this.clipWidth < this.x || this.y + this.height < this.clipY || this.clipY + this.clipHeight < this.y) {
            return;
        }
        if (this.animation !== null) {
            this.animation.render(ctx, this.x, this.y);
        }
        if (this.selectEntity !== null) {
            ctx.strokeRect(this.x, this.y, this.width, this.height, `red`);
        }
        if (this.selectedEntity !== null) {
            ctx.strokeRect(this.x, this.y, this.width, this.height, `white`);
        }
    }
}
/**
 * Editor deployer
 * - Object present on the stage that has coordinate and size
 * - It can save data
 * - Stores ID
 * - Tile in editor
 * - ### Deployer in edito
 * @extends {EditorTile}
 * @classdesc Editor deployer in editor
 */
class EditorDeployer extends EditorTile { // eslint-disable-line  no-unused-vars
    /**
     * Judege whether entity is deployer
     * @override
     * @return {boolen} Whether entity is deployer
     */
    isDeployer() {
        return true;
    }
}
/**
 * Editor entity interface
 * - It can save data
 * - ### Stores ID
 * @interface
 * @classdesc Editor entity interface to store ID
 */
class IEditorEntity extends IEditorSave { // eslint-disable-line  no-unused-vars
    /**
     * Get entity getID
     * @abstract
     * @return {number} Entity ID
     */
    getID() {}

    /**
     * Get entity
     * @abstract
     * @return {Entity} Entity
     */
    getEntity() {}

    /**
     * Whether it is auto tile or not
     * @abstract
     * @return {boolean} Whether it is auto tile or not
     */
    isAutoTile() {}

    /**
     * Get auto tile base ID
     * @abstract
     * @returns {number} Auto tile base ID
     */
    getAutoTileBaseID() {}

    /**
     * Judge whether entity is same entity
     * @abstract
     * @param {Entity} entity Judging entity
     * @return {boolean} Whether entity is same entity
     */
    equals(entity) {}

    /**
     * Judege whether entity is deployer
     * @abstract
     * @return {boolen} Whether entity is deployer
     */
    isDeployer() {}
}
/**
 * Editor stage parser to generate stage
 * - Generates a stage from a file
 * - Parses JSON file
 * - Set original response
 * - Set unique builder by default
 * - ### Generates editor element
 * @extends {UnderStageParser}
 * @classdesc Editor stage parser to generate editor element
 */
class EditorStageParser extends UnderStageParser { // eslint-disable-line  no-unused-vars
    /**
     * Editor stage parser
     * @param {ImageBuilder} [image = EditorImageBuilder] Image builder instance
     * @param {EditBuilder} [edit = SimpleEditBuilder] Edit builder instance
     */
    constructor(image = new EditorImageBuilder(), edit = new SimpleEditBuilder()) {
        super(image);
        /**
         * Edit builder instance
         * @protected
         * @type {EditBuilder}
         */
        this.editBuilder = edit;
    }

    /**
     * Make base stage for parsing stage
     * @override
     * @protected
     * @param {JSON} stage Stage json data
     * @return {Stage} Stage instance for base of parsing
     */
    makeBaseStage(stage) {
        return new EditorStage(super.makeBaseStage(stage), stage.tiles, stage.entities);
    }

    /**
     * Make background for parsing stage
     * @override
     * @protected
     * @param {JSON} back Background json data
     * @return {Background} Background instance for base of parsing
     */
    makeBackground(back) {
        return new EditorBackground(super.makeBackground(back));
    }

    /**
     * Make base camera for parsing stage
     * @override
     * @protected
     * @param {JSON} camera Camera json data
     * @param {number} width Camera width
     * @param {number} height Camera height
     * @return {Camera} Camera instance for base of parsing
     */
    makeBaseCamera(camera) {
        return new EditorCamera(super.makeBaseCamera(camera));
    }

    /**
     * Make base phisical world for parsing stage
     * @protected
     * @param {JSON} stage Stage json data
     * @param {JSON} world World json data
     * @return {PhysicalWorld} Physical world instance for base of parsing
     */
    makeBaseWorld(stage, world) {
        return new EditorWorld(super.makeBaseWorld(stage, world), stage.width, stage.height);
    }

    /**
     * Make entity factory
     * @override
     * @protected
     * @param {JSON} stage Stage json data
     * @return {EntityFactory} Entity factory
     */
    makeEntityFactory(stage) {
        const ret = new EditorEntityFactory(new EditorTileBuilder(), new EditorCharacterBuilder(), new EditorEventBuilder(), this.imageBuilder);
        for (const it of stage.tiles) {
            ret.addTileInfo(JSON.parse(Util.loadFile(`src/res/stage/${it}`)));
        }
        for (const it of stage.entities) {
            ret.addEntityInfo(JSON.parse(Util.loadFile(`src/res/stage/${it}`)));
        }
        return ret;
    }

    /**
     * Parse file to stage
     * @abstract
     * @param {string} filePath Stage file path
     * @param {number} width Stage width for rendering area
     * @param {number} height Stage height for rendering area
     * @return {Stage} Generated stage
     */
    parse(filePath, width, height) {
        const stage = super.parse(filePath, width, height);
        if (BaseUtil.implementsOf(stage, IEditable)) {
            stage.setEditor(this.editBuilder.build());
        }
        return stage;
    }
}
/**
 * Under tile builder
 * - Generates entity from json data
 * - Generate tile from json data
 * - Generates unique tile object
 * - ### Generates editor tile object
 * @extends {UnderTileBuilder}
 * @classdesc Under tile builder to generates editor tile object
 */
class EditorTileBuilder extends UnderTileBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Build tile from json data
     * @override
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} json tile json data
     * @return {Entity} Generated tile
     */
    build(deploy, json) {
        return new EditorTile(super.build(deploy, json), deploy, json.id, json.autoID);
    }
}
/**
 * Game Scene
 * - Controls updating and rendering
 * - It consists of layers
 * - Basic form of a scene composed of layers
 * - ### Render stage and control gameover
 * @extends {BaseLayeredScene}
 * @classdesc Game scene to render stage and control gameover
 */
class GameScene extends BaseLayeredScene { // eslint-disable-line  no-unused-vars
    /**
     * Game scene
     */
    constructor() {
        super();

        /**
         * Game stage manager
         * @protected
         * @type {StageManager}
         */
        this.stageManager = null;

        /**
         * Event manager
         * @protected
         * @type {EventManager}
         */
        this.eventManager = null;

        /**
         * Game player
         * @protected
         * @type {IPlayable}
         */
        this.player = null;

        /**
         * Whether the game is over
         * @protected
         * @type {boolean}
         */
        this.gameover = false;
    }

    /**
     * Initialize scene
     * @override
     */
    init() {
        this.stageManager = new StackStageManager();
        this.stageManager.setStageParser(new UnderStageParser());
        this.stageManager.setStageSize(GameScreen.it.width, GameScreen.it.height);
        this.stageManager.pushStage(`map1`);

        this.eventManager = new QueueEventManager();

        // set player
        this.player = this.stageManager.getStage().getEntities().find((it) => BaseUtil.implementsOf(it, IPlayable));

        // initialize layer
        this.clearLayer();
        const ui = new UILayer(this.stageManager.getStage());
        ui.setPosition(0, 0);
        ui.setSize(GameScreen.it.width, GameScreen.it.height);
        this.addLayer(ui);
        this.gameover = false;
    }

    /**
     * Update scene
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        // gameover
        if (this.player.isGameover() && !this.gameover) {
            const layer = new GameoverLayer();
            layer.setPosition(0, 0, 1);
            layer.setSize(GameScreen.it.width, GameScreen.it.height);
            this.addLayer(layer);
            this.gameover = true;
        }

        this.stageManager.update(dt);
        super.update(dt);
        if (this.gameover) {
            // retry
            if (Input.key.isPress(Input.key.yes())) {
                this.init();
            } else if (Input.key.isPress(Input.key.no())) {
                SceneManager.it.replaceScene(new TitleScene());
            }
        }

        // update event
        this.eventManager.update(dt);
    }

    /**
     * Render scene
     * @override
     * @param {Context} ctx
     */
    render(ctx) {
        this.stageManager.render(ctx);
        super.render(ctx);
        this.eventManager.render(ctx);
    }
}
/**
 * Common base state AI
 * - Determines the behavior of an entity
 * - Determines by state
 * - Manages state by name
 * - Basic information can be transferred to another state AI
 * - ### Implements by common state
 * @extends {TransferableStateAI}
 * @classdesc Common base state AI to implement by common state
 */
class CommonBaseStateAI extends TransferableStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Common base state AI constructor
     * @constructor
     */
    constructor() {
        super(`none`);

        this.namedStates[`none`] = new CpmmonJudgeState();
        this.namedStates[`gameover`] = new CommonGameoverState();
    }
}
/**
 * Under player state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - ### Render entity by entity own image ID for change type
 * @interface
 * @extends {TransferableState}
 * @classdesc Under player state to render entity by entity own image ID
 */
class UnderPlayerState extends TransferableState { // eslint-disable-line  no-unused-vars
    /**
     * Transition usual state such as stationary, walk, fall
     * @protected
     */
    transitionUsualState() {
        if (!Util.onGround(this.entity)) {
            this.ai.changeState(`fall`);
        } else if (this.entity.body.isFixX) {
            this.ai.changeState(`stationary`);
        } else {
            this.ai.changeState(`walk`);
        }
    }
}
/**
 * Under state AI
 * - Determines the behavior of an entity
 * - Determines by state
 * - Manages state by name
 * - Basic information can be transferred to another state AI
 * - ### Changes special state by alias
 * @interface
 * @extends {TransferableStateAI}
 * @classdesc Under state AI to change special state by alias
 */
class UnderStateAI extends TransferableStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Under state AI constructor
     * @constructor
     * @param {string} state Initial state name
     */
    constructor(state) {
        super(state);

        /**
         * Special action name
         * @protected
         * @type {string}
         */
        this.specialActionName = `special`;
    }

    /**
     * Change state
     * @override
     * @param {string} state State to change
     * @return {boolean} Whether change state or not
     */
    changeState(state) {
        if (state === `special`) {
            state = this.specialActionName;
        }
        return super.changeState(state);
    }
}
/**
 * Wild rolling state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - ### Stops rolling after landing
 * @extends {UnderPlayerState}
 * @classdesc Wild rolling state to stop rolling after landing
 */
class WildRollingState extends UnderPlayerState { // eslint-disable-line  no-unused-vars
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // change state
        if (Util.onGround(this.entity)) {
            this.entity.body.setNextAddVelocity(-this.entity.body.velocityX, 0);
            this.transitionUsualState();
        }
        return true;
    }
}
/**
 * Head hooking state
 * - Determines the operation by AI according to the state and renders based on state
 * - Hook condition before collision to create post hook
 * - ### Transition to hooked state
 * @extends {HookingState}
 * @classdesc Head Hooking state for transition to hooked sate
 */
class HeadHookingState extends HookingState { // eslint-disable-line  no-unused-vars
    /**
     * Head hooking state constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Count during descent
         * @protected
         * @type {number}
         */
        this.descentCount = 0;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        super.apply(dt);
        // set direction
        const vx = Math.sign(this.entity.body.velocityX);
        const vy = Math.sign(this.entity.body.velocityY);
        this.entity.setDirection(vx === 0 ? undefined : vx, vy === 0 ? undefined : vy);
        // check hook
        if (this.hook === null) {
            return true;
        }
        // auto release
        if (vy > 0 && this.descentCount++ >= 5) {
            const hooks = this.entity.stage.getEntities().filter((it) => BaseUtil.implementsOf(it, IHook));
            if (hooks.length >= 1) {
                for (const it of hooks) {
                    if (it.getActor() === this.hook.getActor()) {
                        it.release();
                    }
                }
            }
            return true;
        }
        // check collisions
        for (const it of this.entity.collider.collisions) {
            const dot = it.nx * this.entity.directionX + it.ny * this.entity.directionY;
            if ((it.colliding === this.entity && dot > 0) || (it.collided === this.entity && dot < 0)) {
                const you = Util.getCollidedEntity(this.entity, it);
                if (!you.collider.isResponse(this.entity.collider) || !this.entity.collider.isResponse(you.collider)) {
                    continue;
                }
                if (BaseUtil.implementsOf(you, IHook) && you.getActor() === this.hook.getActor()) {
                    continue;
                }
                // hook
                this.hook.hooked();
                this.ai.changeState(`hooked`);
                break;
            }
        }
        return true;
    }
}
 /**
  * Head Hook state AI
  * - Determines the behavior of an entity
  * - Determines by state
  * - Manages state by name
  * - Indicates hooking and released state
  * - ### Also indicates hooked state
  * @extends {HookStateAI}
  * @classdesc AI with state for determining action
  */
 class HeadHookStateAI extends HookStateAI { // eslint-disable-line  no-unused-vars
     /**
      * Head hook State AI Constructor
      * @constructor
      */
     constructor() {
         super();

         this.namedStates[`hooking`] = new HeadHookingState();
         this.namedStates[`hooked`] = new NoneState();
     }
 }
/**
 * Hook object
 * - Object present on the stage that has coordinate and size
 * - Manages image
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - It can move by AI
 * - Manages AI by list
 * - Generated and owned by someone
 * - Object that can be destroyed
 * - It can get hook position and change state
 * - ### Implements hook and automatically generates post hook object
 * @interface
 * @extends {PossessedObject}
 * @implements {IBreakable}
 * @implements {IHook}
 * @classdesc Hook object to implement hook and automatically generate post hook object
 */
class HookObject extends PossessedObject /* , IBreakable, IHook */ { // eslint-disable-line  no-unused-vars
    /**
     * Hook object constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Previous hook object
         * @protected
         * @type {HookObject}
         */
        this.previous = null;
        /**
         * Post hook object
         * @protected
         * @type {HookObject}
         */
        this.post = null;

        /**
         * Hook string
         * @protected
         * @type {IString}
         */
        this.string = null;

        /**
         * Hook rest length
         * @protected
         * @type {number}
         */
        this.restLength = 0;
        /**
         * Hook length of hooked
         * @protected
         * @type {number}
         */
        this.hookedLength = 0;

        /**
         * Child id for generating child
         * @protected
         * @type {number}
         */
        this.childID = 0;

        /**
         * Generated x position
         * @protected
         * @type {number}
         */
        this.generatedX = 0;
        /**
         * Generated y position
         * @protected
         * @type {number}
         */
        this.generatedY = 0;

        /**
         * Whether it is hooked or not
         * @protected
         * @type {boolean}
         */
        this.isHooked = false;
    }

    /**
     * Hook center x position
     * @abstract
     * @protected
     * @return {number} Hook center x position
     */
    getHookX() {}

    /**
     * Hook center x position
     * @abstract
     * @protected
     * @return {number} Hook center x position
     */
    getHookY() {}

    /**
     * Set hook information
     * @protected
     * @param {HookObject} previous Previous hook object
     * @param {IString} string Hook string
     * @param {number} restLength Hook rest length
     * @param {number} hookedLength Hook length of hooked
     */
    setHookInfo(previous, string, restLength, hookedLength, childID) {
        this.previous = previous;
        this.string = string;
        this.restLength = restLength;
        this.hookedLength = hookedLength;
        this.childID = childID;
    }

    /**
     * Connect hook to player
     * @protected
     */
    connectPlayer() {
        let x = this.generatedX;
        let y = this.generatedY;
        if (this.owner instanceof MutableEntity) {
            x = this.owner.directionX >= 0 ? this.generatedX + this.owner.x + this.owner.width : this.owner.x - this.generatedX;
            y = this.owner.y - this.generatedY;
        }
        this.post = new HookOwner();
        this.post.setPosition(x, y, this.z);
        this.post.setSize(8, 8);
        this.post.setOwner(this.owner);
        this.post.setHookInfo(this, this.string, this.restLength - 15, this.hookedLength, this.childID);
        this.post.init();
    }

    /**
     * Generete hook child
     * @protected
     * @param {number} vx Generated velocity of x
     * @param {number} vy Generated velocity of y
     */
    makeChild(vx, vy) {
        // create player
        if (this.restLength - 15 <= 0) {
            this.connectPlayer();
            return;
        }
        // check length
        let x = this.generatedX;
        let y = this.generatedY;
        if (this.owner instanceof MutableEntity) {
            x = this.owner.directionX >= 0 ? this.generatedX + this.owner.x + this.owner.width : this.owner.x - this.generatedX;
            y = this.owner.y - this.generatedY;
        }
        const dx = Math.abs(x - this.getHookX());
        const dy = Math.abs(y - this.getHookY());
        const d = Math.sqrt(dx * dx + dy * dy);
        const l = this.string.getLength() + 3;
        if (d > l) {
            // generate
            this.post = this.stage.addEntityByID(this.childID, {
                x: x,
                y: y,
                z: this.z,
                owner: this.owner,
            });
            this.post.setHookInfo(this, this.string, this.restLength - 15, this.hookedLength, this.childID);
            // set initial info
            this.post.body.setNextAddVelocity(vx, vy);
            this.string.addBody(this.post.body, (this.post.directionX >= 0 ? this.post.getHookX() - this.post.x : this.post.x + this.post.width - this.post.getHookX()), (this.post.directionY > 0 ? this.post.getHookY() - this.post.y : this.post.y + this.post.height - this.post.getHookY()), 3);
            this.post.deltaMove(-dx * (d - l) / d, -dy * (d - l) / d);
            // generate continuously
            this.post.makeChild(vx, vy);
        }
    }

    /**
     * Get actor who it belongs to
     * @override
     * @return {Entity} Actor who it belongs to
     */
    getActor() {
        return this.owner;
    }

    /**
     * Create post hook (Do not create it if it already exists)
     * @override
     */
    createPost() {
        // check head or connected
        if (!this.isHead() && this.previous === null) {
            return;
        }
        // check already created
        if (this.post !== null) {
            return;
        }
        // check max length or hooked
        if (this.restLength <= 0 && this.isHooked) {
            return;
        }

        this.makeChild(this.body.velocityX, this.body.velocityY);
    }

    /**
     * Hooked hook
     * @override
     */
    hooked() {
        this.isHooked = true;
        if (this.post !== null) {
            this.post.hooked();
        } else {
            this.connectPlayer();
        }
        if (this.restLength < this.hookedLength) {
            this.destroy();
            return;
        }
    }

    /**
     * Release hook
     * @override
     */
    release() {
        for (const it of this.ai) {
            if (it instanceof StateAI) {
                it.changeState(`released`);
            }
        }
        if ((this.isHead() || this.previous !== null) && this.post === null) {
            this.connectPlayer();
        }
    }

    /**
     * Try to remove it
     * @override
     * @return {boolean} Whether it was removed
     */
    tryRemove() {
        if (this.post instanceof HookOwner) {
            this.destroy();
            return true;
        }
        return false;
    }

    /**
     * Whether the tip of the hook
     * @override
     * @return {boolean} Whether the tip of the hook
     */
    isHead() {
        return false;
    }

    /**
     * Destroy object
     * @override
     */
    destroy() {
        if (this.previous !== null) {
            this.post.previous = this.previous;
            this.previous.post = this.post;
        }
        this.previous = null;
        this.post = null;
        this.string.removeBody(this.body);
        this.stage.removeEntity(this);
    }

    /**
     * Initialize entity
     * @override
     */
    init() {
        super.init();
        this.generatedX = this.x;
        this.generatedY = this.y;
        if (this.owner instanceof MutableEntity) {
            this.generatedX = this.owner.directionX >= 0 ? this.x - this.owner.width - this.owner.x : this.owner.x - this.x;
            this.generatedY = this.owner.y - this.y;
        }
    }

    /**
     * Render entity
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        super.render(ctx, shiftX, shiftY);
        if (this.post !== null) {
            ctx.strokeLine(this.getHookX() + shiftX, this.getHookY() + shiftY, this.post.getHookX() + shiftX, this.post.getHookY() + shiftY, `#FFCC66`, 4);
        } else if (this.owner instanceof MutableEntity) {
            const x = this.owner.directionX >= 0 ? this.generatedX + this.owner.x + this.owner.width : this.owner.x - this.generatedX;
            const y = this.owner.y - this.generatedY;
            ctx.strokeLine(this.getHookX() + shiftX, this.getHookY() + shiftY, x + shiftX, y + shiftY, `#FFCC66`, 4);
        }
    }
}
/**
 * Hook player object
 * - Object present on the stage that has coordinate and size
 * - Manages image
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - It can move by AI
 * - Manages AI by list
 * - Generated and owned by someone
 * - Object that can be destroyed
 * - It can get hook position and change state
 * - Implements hook and automatically generates post hook object
 * - ### Owner's representation so it does not exists on stage
 * @extends {HookObject}
 * @classdesc Hook player object that player's representation so it does not exists on stage
 */
class HookOwner extends HookObject { // eslint-disable-line  no-unused-vars
    /**
     * Hook center x position
     * @override
     * @return {number} Hook center x position
     */
    getHookX() {
        if (this.owner instanceof MutableEntity) {
            return this.owner.directionX >= 0 ? this.generatedX + this.owner.x + this.owner.width : this.owner.x - this.generatedX;
        } else {
            return this.x;
        }
    }

    /**
     * Hook center x position
     * @override
     * @return {number} Hook center x position
     */
    getHookY() {
        if (this.owner instanceof MutableEntity) {
            return this.owner.y - this.generatedY;
        } else {
            return this.y;
        }
    }

    /**
     * Hooked hook
     * @override
     */
    hooked() {}

    /**
     * Release hook
     * @override
     */
    release() {}

    /**
     * Destroy object
     * @override
     */
    destroy() {}

    /**
     * Initialize entity
     * @override
     */
    init() {
        super.init();
        if (this.owner instanceof MutableEntity) {
            this.string.addBody(this.owner.body, this.owner.width + this.generatedX, -this.generatedY, this.string.getLength());
        }
    }
}
/**
 * Under playable interface
 * - Player function interface
 * - ### Under player function interface
 * @interface
 * @implements {IPlayable}
 * @classdesc Under playable interface for under player function
 */
class IUnderPlayable extends IPlayable { // eslint-disable-line  no-unused-vars
    /**
     * Change working AI
     * @abstract
     * @param {number} id Terrain ID for changing player type
     * @return {boolean} Whther player is changed or not
     */
    changeType(id) {}
}
/**
 * Under tile object
 * - Object present on the stage that has coordinate and size
 * - Manages image
 * - It can be collided because it has material and collider
 * - It is fixed and no change will occur
 * - Decides the tile to be displayed by the ID and position, using the sprite indicating the stage tiles
 * - It can be gotten terrain ID
 * - ### Has terrain information
 * @extends {TileObject}
 * @implements {ITerrain}
 * @classdesc Under tile object to have terrain information
 */
class UnderTileObject extends TileObject /* , ITerrain */ { // eslint-disable-line  no-unused-vars
    /**
     * Under tile object constructor
     * @constructor
     */
    constructor(terrainID) {
        super();

        /**
         * Terrain ID
         * @protected
         * @type {number}
         */
        this.terrainID = terrainID;
    }

    /**
     * Get terrain ID
     * @override
     * @return {number} Terrain ID
     */
    getTerrainID() {
        return this.terrainID;
    }
}
/**
 * Under character builder
 * - Generates entity from json data
 * - Generate tile from json data
 * - Generate not tile but mutable entity from json data
 * - ### Gemerates under player
 * - ### Automatically sets normal none state
 * @extends {CharacterBuilder}
 * @classdesc Under character builder to generate under player and sets normal none state automatically
 */
class UnderCharacterBuilder extends CharacterBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Make rigid body
     * @protected
     * @param {JSON} body Rigid body information json data
     * @return {RigidBody} Rigid body
     */
    makeBody(body) {
        switch (body.type) {
            case `String`:
                return new StringBody(this.makeBody(body.body), body.x, body.y, body.length, body.k, body.count);
            default:
                return super.makeBody(body);
        }
    }

    /**
     * Make collider
     * @protected
     * @param {JSON} collider Collider information json data
     * @return {Collider} Collider
     */
    makeCollider(collider) {
        if (collider.excluded) {
            switch (collider.type) {
                case `Rectangle`:
                    return new ExcludedRectangleCollider(collider.startX, collider.startY, collider.width, collider.height, collider.id);
                case `RoundRectangle`:
                    return new ExcludedRoundRectangleCollider(collider.startX, collider.startY, collider.width, collider.height, collider.cut, collider.id);
            }
        }
        return super.makeCollider(collider);
    }

    /**
     * Make AI
     * @override
     * @protected
     * @param {JSON} ai AI information json data
     * @return {AI} AI
     */
    makeAI(ai) {
        switch (ai.type) {
            case `CommonBaseStateAI`:
                return new CommonBaseStateAI();
            case `NormalBaseStateAI`:
                return new NormalBaseStateAI();
            case `WildBaseStateAI`:
                return new WildBaseStateAI();
            case `AdventurerBaseStateAI`:
                return new AdventurerBaseStateAI();
            case `PropellerBaseStateAI`:
                return new PropellerBaseStateAI();
            case `HookStateAI`:
                return new HookStateAI();
            case `HeadHookStateAI`:
                return new HeadHookStateAI();
            default:
                return super.makeAI(ai);
        }
    }

    /**
     * Make underlying entity
     * @override
     * @protected
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} entity Entity information json data
     * @return {InfluentialEntity} Underlying entity
     */
    makeEntityBase(deploy, entity) {
        switch (entity.type) {
            case `Player`:
                return new UnderPlayer();
            case `HookHead`:
                return new HookHead(this.tryReplace(deploy, entity, `max`), this.tryReplace(deploy, entity, `hook`), this.tryReplace(deploy, entity, `child`));
            case `HookChild`:
                return new HookChild();
            case `Sign`:
                {
                    const signData = this.tryReplace(deploy, entity, `sign`);
                    if (signData.image !== undefined) {
                        return super.makeEntityBase(deploy, entity);
                    }
                    const ret = new TextSignObject();
                    const colliderData = this.tryReplace(deploy, entity, `collider`);
                    const collider = this.makeCollider(colliderData);
                    collider.setAABB(this.makeAABB(colliderData));
                    ret.setCollider(collider);
                    ret.setSign(signData.x, signData.y, signData.size, signData.text);
                    return ret;
                }
                break;
            default:
                return super.makeEntityBase(deploy, entity);
        }
    }
}
/**
 * Image manager interface
 * - Resources abstraction of resource management
 * - ### It can be acquired information as an image
 * @interface
 * @extends {IResourceManager}
 * @classdesc Image manager interface that can be acquired information as image
 */
class IImageManager extends IResourceManager { // eslint-disable-line  no-unused-vars
    /**
     * Get image width
     * @abstract
     * @param {Object} id Image ID
     * @return {number} Image width
     */
    getWidth(id) {}

    /**
     * Get image height
     * @abstract
     * @param {Object} id Image ID
     * @return {number} Image height
     */
    getHeight(id) {}

    /**
     * Get image by ID
     * @abstract
     * @param {Object} id Image ID
     * @return {Image} Music resource
     */
    getImage(id) {}
}
/**
 * Music manager interface
 * - Resources abstraction of resource management
 * - ### It can be acquired information as an music
 * @interface
 * @extends {IResourceManager}
 * @classdesc Music manager interface that can be acquired information as music
 */
class IMusicManager extends IResourceManager { // eslint-disable-line  no-unused-vars
    /**
     * Get music by ID
     * @abstract
     * @param {Object} id Music ID
     * @return {BufferSource} Music resource
     */
    getMusic(id) {}
}
/**
 * Clip animation
 * - Renders image
 * - Manages animation
 * - Considers the direction
 * - Clips area when rendering
 * - Delegates other animation
 * - ### Renders by cliping
 * @extends {DelegateAnimation}
 * @classdesc Clip animation to render by cliping
 */
class ClipAnimation extends DelegateAnimation { // eslint-disable-line  no-unused-vars
    /**
     * Set clipingArea
     * @override
     * @param {number} clipX Cliping x position
     * @param {number} clipY Cliping y position
     * @param {number} clipWidth Cliping width
     * @param {number} clipWidth Cliping height
     */
    setClipArea(clipX, clipY, clipWidth, clipHeight) {
        for (const it of this.getImages()) {
            if (BaseUtil.implementsOf(it, IClipImage)) {
                it.setClipArea(clipX, clipY, clipWidth, clipHeight);
            }
        }
    }
}
/**
 * Player
 * - Object present on the stage that has coordinate and size
 * - Manages image
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - It can move by AI
 * - Manages AI by list
 * - Object that can be destroyed
 * - Object that can be damaged
 * - Implements damagable and animationable
 * - Entity that manages AI according to state and rendering by it
 * - Player function interface
 * - ### Entity operated by the player
 * @extends {StateCharacter}
 * @implements {IPlayable}
 * @classdesc Player to be operate by the player
 */
class Player extends StateCharacter /* , IPlayable */ { // eslint-disable-line  no-unused-vars
    /**
     * Player constructor
     * @constructor
     */
    constructor() {
        super();

        // initialize
        this.setHP(3);
        this.setDirection(1);

        /**
         * Remaining time of invincible state
         * @protected
         * @type {number}
         */
        this.invincible = 0;
    }

    /**
     * Damage object
     * @override
     * @param {number} damage Amount of damage
     */
    damage(damage) {
        if (this.invincible === 0 && this.hp > 0) {
            this.hp -= damage;
            this.invincible = 1000;
        }
    }

    /**
     * Get x position for camera
     * @override
     * @return {number} X position for camera
     */
    getCameraX() {
        return this.x + this.width / 2;
    }

    /**
     * Get y position for camera
     * @override
     * @return {number} y position for camera
     */
    getCameraY() {
        return this.y + this.height / 2;
    }

    /**
     * Judge whether game over or not
     * @abstract
     * @return {boolean} whether game over or not
     */
    isGameover() {
        return this.getHP() <= 0 || this.stage.getStageHeight() < this.y;
    }

    /**
     * Update object
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        this.invincible -= dt;
        if (this.invincible <= 0) {
            this.invincible = 0;
        }
        super.update(dt);
    }

    /**
     * Render entity
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        if (this.invincible % 2 === 0 || this.hp <= 0) {
            super.render(ctx, shiftX, shiftY);
        }
    }
}
/**
 * Attack object
 * - Object present on the stage that has coordinate and size
 * - Manages image
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - It can move by AI
 * - Manages AI by list
 * - Owned by someone
 * - Generated and owned by someone
 * - Object that can be destroyed
 * - ### Object indicating attack that have lifespan
 * @extends {PossessedObject}
 * @implements {IBreakable}
 * @classdesc Attack object indicating attack that have lifespan
 */
class AttackObject extends PossessedObject /* , IBreakable */ { // eslint-disable-line  no-unused-vars
    /**
     * Attack object constructor
     * @constructor
     * @param {number} lifespan Lifespan of attack object
     */
    constructor(lifespan) {
        super();

        /**
         * Lifespan of attack object
         * @protected
         * @type {number}
         */
        this.lifespan = lifespan;
    }

    /**
     * Destroy object
     * @override
     */
    destroy() {
        this.stage.removeEntity(this);
    }

    /**
     * Update object
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        this.lifespan -= dt;
        if (this.lifespan < 0) {
            this.destroy();
            return;
        }
        super.update(dt);
    }
}
/**
 * Entity layer
 * - Performs drawing processing collectively
 * - Clips area when rendering
 * - Selects something and set selected
 * - It can save data
 * - Selects something
 * - ### Selects entities
 * @extends {SelectionLayer}
 * @classdesc Entity layer to select entities
 */
class EntityLayer extends SelectionLayer { // eslint-disable-line  no-unused-vars
    /**
     * Entity layer constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Entity information json data
         * @protected
         * @type {Object<number, JSON>}
         */
        this.entityInfo = null;

        /**
         * Entity layers
         * @protected
         * @type {Array<SelectionLayer>}
         */
        this.entityLayers = [];
    }

    /**
     * Set information for selection
     * @override
     * @param {JSON} info Selection information
     */
    setSelectionInfo(info) {
        this.entityInfo = {};
        for (const it in info) {
            if (info.hasOwnProperty(it) && !isNaN(it)) {
                this.entityInfo[it] = info[it];
            }
        }
    }

    /**
     * Get selected entity ID
     * @override
     * @return {number} Selected entity ID (return -1 if not selected)
     */
    getSelected() {
        for (const it of this.entityLayers) {
            const selected = it.getSelected();
            if (selected >= 0) {
                return selected;
            }
        }
        return -1;
    }

    /**
     * Set selected entity by ID
     * @override
     * @param {number} id Entity ID
     */
    setSelected(id) {
        for (const it of this.entityLayers) {
            it.setSelected(id);
        }
    }

    /**
     * Initialize layer
     * @override
     */
    init() {
        for (const it in this.entityInfo) {
            if (this.entityInfo.hasOwnProperty(it)) {
                const layer = new SingleEntityLayer();
                layer.setSelectionInfo(this.entityInfo[it]);
                layer.init();
                this.entityLayers.push(layer);
            }
        }
        this.entityLayers = this.entityLayers.sort((a, b) => a.height < b.height ? -1 : a.height > b.height ? 1 : 0);
    }

    /**
     * Update layer
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        // set entity layer position
        let sx = this.x;
        let sy = this.y;
        let maxHeight = 0;
        let innerHeight = 0;
        for (const it of this.entityLayers) {
            if (it.height !== maxHeight || sx + it.width > this.x + this.width) {
                sx = this.x;
                sy += maxHeight;
                innerHeight += maxHeight;
                maxHeight = 0;
            }
            it.setPosition(sx, sy);
            sx += it.width;
            maxHeight = Math.max(maxHeight, it.height);
        }
        this.height = innerHeight + maxHeight;
        // cliping
        for (const it of this.entityLayers) {
            it.clip(this.clipX, this.clipY, this.clipWidth, this.clipHeight);
        }

        // update
        for (const it of this.entityLayers) {
            it.update(dt);
        }
    }

    /**
     * Render layer
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        ctx.fillRect(this.clipX, this.clipY, this.clipWidth, this.clipHeight, `green`);
        for (const it of this.entityLayers) {
            it.render(ctx);
        }
    }
}
/**
 * Under character builder
 * - Generates entity from json data
 * - Generate tile from json data
 * - Generate not tile but mutable entity from json data
 * - Gemerates under player
 * - ### Generate editor character
 * @extends {UnderCharacterBuilder}
 * @classdesc Under character builder to generate editor character
 */
class EditorCharacterBuilder extends UnderCharacterBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Build tile from json data
     * @override
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} json tile json data
     * @return {Entity} Generated tile
     */
    build(deploy, json) {
        return new EditorDeployer(super.build(deploy, json), deploy, json.id, json.autoID);
    }
}
/**
 * Adventurer hook state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - ### It can generate and release hook
 * @extends {UnderPlayerState}
 * @classdesc Adventurer hook state that can generate and release hook
 */
class AdventurerHookState extends UnderPlayerState { // eslint-disable-line  no-unused-vars
    /**
     * Initilaize state
     * @override
     */
    init() {
        super.init();
        // check release
        const hooks = this.entity.stage.getEntities().filter((it) => BaseUtil.implementsOf(it, IHook));
        if (hooks.length >= 1) {
            for (const it of hooks) {
                if (it.getActor() === this.entity) {
                    it.release();
                }
            }
            this.transitionUsualState();
        }
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // generate hook
        if (Util.canEnd(this.entity.getImage())) {
            const hook = this.entity.stage.addEntityByID(200010, {
                x: this.entity.x + this.entity.width / 2,
                y: this.entity.y + this.entity.height / 2,
                z: this.entity.z - 1,
                owner: this.entity,
            });
            if (hook instanceof MutableEntity) {
                hook.body.enforce(1200000 * this.entity.directionX / dt, -2000000 / dt);
            }
            this.transitionUsualState();
        }
        return true;
    }
}
/**
 * Common gameover state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - ### The state in which the player got over game
 * @extends {UnderPlayerState}
 * @classdesc Common gameover state in which the player got over game
 */
class CommonGameoverState extends UnderPlayerState { // eslint-disable-line  no-unused-vars
    /**
     * Initialize state
     * @override
     */
    init() {
        super.init();
        this.entity.collider.fixBound(0, this.entity.height / 2, this.entity.width, this.entity.height);
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        return true;
    }
}
/**
 * Common judge state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - ### Does nothing but transfer gameover only if entity is died
 * @extends {UnderPlayerState}
 * @classdesc Common judge state to do nothing but transfer gameover only if entity is died
 */
class CpmmonJudgeState extends UnderPlayerState { // eslint-disable-line  no-unused-vars
    /**
     * Common judge state constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Damaged target at registered entity
         * @protected
         * @type {IDamagable}
         */
        this.damagedTarget = null;
    }

    /**
     * Initialize
     * @override
     */
    init() {
        super.init();
        if (BaseUtil.implementsOf(this.entity, IDamagable)) {
            this.damagedTarget = this.entity;
        }
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        if (this.damagedTarget !== null && this.damagedTarget.getHP() <= 0) {
            this.ai.changeState(`gameover`);
            return true;
        }
        return false;
    }
}
/**
 * Normal base state AI
 * - Determines the behavior of an entity
 * - Determines by state
 * - Manages state by name
 * - Basic information can be transferred to another state AI
 * - Changes special state by alias
 * - ### Initializes by normal state
 * @extends {UnderStateAI}
 * @classdesc Normal base state AI to initialize by normal state
 */
class NormalBaseStateAI extends UnderStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Normal base state AI constructor
     * @constructor
     */
    constructor() {
        super(`stationary`);

        this.specialActionName = `pray`;
        this.namedStates[`stationary`] = new NormalStationaryState(300, 36000);
        this.namedStates[`walk`] = new NormalWalkState(300, 18000);
        this.namedStates[`jump`] = new NormalJumpState(240);
        this.namedStates[`walkjump`] = new NormalJumpState(320);
        this.namedStates[`jumping`] = new NormalJumpingState(225, 12000);
        this.namedStates[`fall`] = new NormalFallState(225, 12000);
        this.namedStates[`falling`] = new NormalFallState(225, 12000);
        this.namedStates[`attack`] = new NormalPunchState();
        this.namedStates[`grab`] = new NormalGrabState(100, 30000);
        this.namedStates[`grabwalk`] = new NormalGrabState(100, 15000);
        this.namedStates[`pray`] = new NormalSpecialState();
    }
}
/**
 * Normal jump state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - Sets the power to be applied and the magnification of the elapsed speed of the preparation time
 * - ### Prepares for jumping
 * @extends {UnderPlayerState}
 * @implements {IPrepareState}
 * @classdesc Normal jump state to prepare for jumping
 */
class NormalJumpState extends UnderPlayerState /* , IPrepareState */ { // eslint-disable-line  no-unused-vars
    /**
     * Normal jump state constructor
     * @constructor
     * @param {number} jumpPower Jumping force
     */
    constructor(jumpPower) {
        super();

        /**
         * Jumping force
         * @protected
         * @type {number}
         */
        this.jumpPower = jumpPower;

        /**
         * Count for judging on air
         * @protected
         * @type {numebr}
         */
        this.inAirCount = 0;

        /**
         * Jump button pressed time
         * @protected
         * @type {number}
         */
        this.jumpPressedTime = 0;
        /**
         * Jump time
         * @protected
         * @type {number}
         */
        this.jumpDeltaTime = 0;

        /**
         * Animation speed magnification
         * @protected
         * @type {number}
         */
        this.animationMagnification = 1;

        /**
         * Reserved velocity of X
         * @protected
         * @type {number}
         */
        this.reservedVelocityX = 0;
    }

    /**
     * Set the magnification of the elapsed speed of the preparation time
     * @override
     * @param {number} val The magnification of the elapsed speed of the preparation time
     */
    set speedMagnification(val) {
        this.animationMagnification = val;
    }

    /**
     * Set the power to be applied
     * @override
     * @param {number} val The power to be applied
     */
    set appliedPower(val) {
        this.jumpPower = val;
    }

    /**
     * Get the magnification of the elapsed speed of the preparation time
     * @override
     * @return {number} The magnification of the elapsed speed of the preparation time
     */
    get speedMagnification() {
        return this.animationMagnification;
    }

    /**
     * Get the power to be applied
     * @override
     * @return {number} The power to be applied
     */
    get appliedPower() {
        return this.jumpPower;
    }

    /**
     * Initialize
     * @override
     */
    init() {
        super.init();
        this.inAirCount = 0;
        this.jumpPressedTime = 0;
        this.jumpDeltaTime = 0;
        this.reservedVelocityX = this.entity.body.velocityX;
    }

    /**
     * Update state
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        const image = this.entity.getImage();
        if (image !== null) {
            image.update(dt * (this.animationMagnification - 1));
        }
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        this.entity.body.setNextAddVelocity(-this.entity.body.velocityX / 11, 0);
        if (Input.key.isPressed(Input.key.up())) {
            this.jumpPressedTime += 1;
        }
        this.jumpDeltaTime += 1;

        // judge
        if (!Util.onGround(this.entity)) {
            if (++this.inAirCount > 5) {
                this.ai.changeState(`stationary`);
            }
        } else {
            this.inAirCount = 0;
        }
        if (Util.canEnd(this.entity.getImage()) && this.inAirCount === 0) {
            // reset and jump
            this.entity.body.setNextAddVelocity(this.reservedVelocityX * 0.8 - this.entity.body.velocityX, -this.entity.body.velocityY);
            this.entity.body.enforce(0, -this.jumpPower * this.entity.material.mass * 1000 / dt * (this.jumpPressedTime + this.jumpDeltaTime) / 2 / this.jumpDeltaTime);
            this.ai.changeState(`jumping`);
        }

        return true;
    }
}
/**
 * Normal punch state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - ### About to attack
 * @extends {UnderPlayerState}
 * @classdesc Normal punch state that about to attack
 */
class NormalPunchState extends UnderPlayerState { // eslint-disable-line  no-unused-vars
    /**
     * Normal punch state
     * @constructor
     */
    constructor() {
        super();

        /**
         * Whether it attacked or not
         * @protected
         * @type {boolean}
         */
        this.attacked = false;

        /**
         * Animation threshold for starting attack
         * @protected
         * @type {number}
         */
        this.threshold = 0.5;
    }

    /**
     * Make attack object
     * @protected
     * @return {Entity} Attack object
     */
    makeAttackObject() {
        return this.entity.stage.addEntityByID(200000, {
            x: this.entity.x + (this.entity.directionX === 1 ? this.entity.width - 22 : -32 + 22),
            y: this.entity.y + 27,
            z: this.entity.z + 1,
            owner: this.entity,
        });
    }

    init() {
        super.init();
        this.attacked = false;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        if (!Util.canEnd(this.entity.getImage()) && this.entity.getImage().getAnimationCount() < this.threshold) {
            return;
        }
        if (!this.attacked) {
            this.makeAttackObject();
            this.attacked = true;
        }
        // change state
        if (Util.canEnd(this.entity.getImage())) {
            // punch
            if (this.entity.body.isFixX) {
                this.ai.changeState(`stationary`);
            } else {
                this.ai.changeState(`walk`);
            }
        }
        return true;
    }
}
/**
 * Normal special state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - ### Does special action
 * @extends {UnderPlayerState}
 * @classdesc Normal special state to do special action
 */
class NormalSpecialState extends UnderPlayerState { // eslint-disable-line  no-unused-vars
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        if (!Input.key.isPressed(Input.key.sub())) {
            // change state
            this.transitionUsualState();
        }
        return true;
    }
}
/**
 * Propeller base state AI
 * - Determines the behavior of an entity
 * - Determines by state
 * - Manages state by name
 * - Basic information can be transferred to another state AI
 * - Changes special state by alias
 * - Initializes by normal state
 * - ### Initializes by propeller state
 * @extends {NormalBaseStateAI}
 * @classdesc Propeller base state AI to initialize by propeller state
 */
class PropellerBaseStateAI extends NormalBaseStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Propeller base state AI Constructor
     * @constructor
     */
    constructor() {
        super();

        this.specialActionName = `none`;
        for (const name in this.namedStates) {
            if (this.namedStates.hasOwnProperty(name)) {
                const state = this.namedStates[name];
                if (BaseUtil.implementsOf(state, IMovableState)) {
                    state.setMaxVelocity(state.maxVX * 7 / 6, state.maxVY * 7 / 6);
                    state.setMovePower(state.movePX * 7 / 6, state.movePY * 7 / 6);
                }
                if (BaseUtil.implementsOf(state, IPrepareState)) {
                    state.appliedPower = state.appliedPower * 2;
                }
            }
        }
        this.namedStates[`jumping`] = new PropellerJumpingState(350, 500, 21000, 30000);
    }
}
/**
 * Under movable state that can be movable
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - Sets max velocity and move power for moving
 * - ### Enable to set velocity and power
 * @interface
 * @extends {UnderPlayerState}
 * @implements {IMovableState}
 * @classdesc Under movable state to enable to set velocity and power
 */
class UnderMovableState extends UnderPlayerState /* , IMovableState */ { // eslint-disable-line  no-unused-vars
    /**
     * Under movable state constructor
     * @constructor
     * @param {number} maxVeocityX Maximum speed x vector
     * @param {number} maxVeocityY Maximum speed y vector
     * @param {number} movePowerX Force of x direction applied when moving
     * @param {number} movePowerY Force of y direction applied when moving
     */
    constructor(maxVelocityX, maxVelocityY, movePowerX, movePowerY) {
        super();

        /**
         * Maximum speed x vector
         * @protected
         * @type {number}
         */
        this.maxVelocityX = maxVelocityX;
        /**
         * Maximum speed y vector
         * @protected
         * @type {number}
         */
        this.maxVelocityY = maxVelocityY;

        /**
         * Force of x direction applied when moving
         * @protected
         * @type {number}
         */
        this.movePowerX = movePowerX;
        /**
         * Force of x direction applied when moving
         * @protected
         * @type {number}
         */
        this.movePowerY = movePowerY;
    }

    /**
     * Get max velocity of x
     * @override
     * @return {number} Max velocity of x
     */
    get maxVX() {
        return this.maxVelocityX;
    }

    /**
     * Get max velocity of y
     * @override
     * @return {number} Max velocity of y
     */
    get maxVY() {
        return this.maxVelocityY;
    }

    /**
     * Get power of x
     * @override
     * @return {number} Power of x
     */
    get movePX() {
        return this.movePowerX;
    }

    /**
     * Get power of y
     * @override
     * @return {number} Power of y
     */
    get movePY() {
        return this.movePowerY;
    }

    /**
     * Set max velocity
     * @override
     * @param {number} maxVelocityX The max velocity of x direction
     * @param {number} maxVelocityY The max velocity of y direction
     */
    setMaxVelocity(maxVelocityX, maxVelocityY) {
        this.maxVelocityX = maxVelocityX;
        this.maxVelocityY = maxVelocityY;
    }

    /**
     * Set moving power
     * @override
     * @param {number} movePowerX The power of x direction
     * @param {number} movePowerY The power of y direction
     */
    setMovePower(movePowerX, movePowerY) {
        this.movePowerX = movePowerX;
        this.movePowerY = movePowerY;
    }

    /**
     * Move x direction by input
     * @protected
     * @param {number} vx X direction
     * @param {number} dt Delta time
     */
    moveX(vx, dt) {
        this.entity.setDirection(vx === 0 ? this.directionX : vx);
        if (this.entity.body.velocityX * vx < 0 || Math.abs(this.entity.body.velocityX) < Math.abs(this.maxVelocityX)) {
            this.entity.body.enforce(this.movePowerX * this.entity.material.mass * vx / dt, 0);
        }
    }

    /**
     * Move y direction by input
     * @protected
     * @param {number} vy y direction
     * @param {number} dt Delta time
     */
    moveY(vy, dt) {
        this.entity.setDirection(undefined, vy === 0 ? this.directionY : vy);
        if (this.entity.body.velocityY * vy < 0 || Math.abs(this.entity.body.velocityY) < Math.abs(this.maxVelocityY)) {
            this.entity.body.enforce(0, this.movePowerY * this.entity.material.mass * vy / dt);
        }
    }

    /**
     * Move by input
     * @protected
     * @param {number} dt Delta time
     * @return {boolean} Whether move or not
     */
    moveByInput(dt) {
        let moved = false;
        // input
        if (this.movePowerX > 0) {
            let vx = 0;
            if (Input.key.isPressed(Input.key.left())) {
                vx += -1;
            }
            if (Input.key.isPressed(Input.key.right())) {
                vx += 1;
            }
            if (vx !== 0) {
                this.moveX(vx, dt);
                moved = true;
            }
        }
        if (this.movePowerY > 0) {
            let vy = 0;
            if (Input.key.isPressed(Input.key.up())) {
                vy += -1;
            }
            if (Input.key.isPressed(Input.key.down())) {
                vy += 1;
            }
            if (vy !== 0) {
                this.moveY(vy, dt);
                moved = true;
            }
        }
        return moved;
    }
}
/**
 * Wild base state AI
 * - Determines the behavior of an entity
 * - Determines by state
 * - Manages state by name
 * - Basic information can be transferred to another state AI
 * - Changes special state by alias
 * - Initializes by normal state
 * - ### Initializes by wild state
 * @extends {NormalBaseStateAI}
 * @classdesc Wild base state AI to initialize by wild state
 */
class WildBaseStateAI extends NormalBaseStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Wild base state AI Constructor
     * @constructor
     */
    constructor() {
        super();

        this.specialActionName = `roll`;
        for (const name in this.namedStates) {
            if (this.namedStates.hasOwnProperty(name)) {
                const state = this.namedStates[name];
                if (BaseUtil.implementsOf(state, IMovableState)) {
                    state.setMaxVelocity(state.maxVX * 4 / 3, state.maxVY * 4 / 3);
                    state.setMovePower(state.movePX * 5 / 4, state.movePY * 5 / 3);
                }
                if (BaseUtil.implementsOf(state, IPrepareState)) {
                    state.speedMagnification = state.speedMagnification * 5;
                    state.appliedPower = state.appliedPower * 3 / 2;
                }
            }
        }

        this.namedStates[`attack`] = new WildClawState();
        this.namedStates[`roll`] = new WildRollState(880000, 240000);
        this.namedStates[`rolling`] = new WildRollingState();
    }
}
/**
 * Wild claw state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - About to attack
 * - ### Attacks by claw
 * @extends {NormalPunchState}
 * @classdesc Wild claw state to attack by claw
 */
class WildClawState extends NormalPunchState { // eslint-disable-line  no-unused-vars
    /**
     *
     * Make attack object
     * @protected
     * @return {Entity} Attack object
     */
    makeAttackObject() {
        const attack = this.entity.stage.addEntityByID(200002, {
            x: this.entity.x + (this.entity.directionX === 1 ? this.entity.width - 22 : -26),
            y: this.entity.y + 8,
            z: this.entity.z + 1,
            owner: this.entity,
        });
        if (attack instanceof MutableEntity) {
            attack.setDirection(this.entity.directionX);
        }
        return attack;
    }
    /**
     * Update state
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        const image = this.entity.getImage();
        if (image !== null) {
            image.update(dt);
        }
        super.update(dt);
    }
}
/**
 * Wild roll state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - Sets max velocity and move power for moving
 * - Enable to set velocity and power
 * - ### Prepares rolling action
 * @extends {UnderMovableState}
 * @classdesc Wild roll state to prepare rolling action
 */
class WildRollState extends UnderMovableState { // eslint-disable-line  no-unused-vars
    /**
     * Wild roll state constructor
     * @constructor
     * @param {number} movePowerX The power of x direction to move in the air
     * @param {number} movePowerY The power of y direction to move in the air
     */
    constructor(movePowerX, movePowerY) {
        super(0, 0, movePowerX, movePowerY);
    }

    /**
     * Initialize state
     * @override
     */
    init() {
        super.init();
        this.entity.body.setNextAddVelocity(-this.entity.body.velocityX, 0);
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        if (Util.canEnd(this.entity.getImage())) {
            // big jump
            this.entity.body.enforce(this.movePowerX * this.entity.material.mass * this.entity.directionX / dt, -this.movePowerY * this.entity.material.mass / dt);
            this.ai.changeState(`rolling`);
        }
        return true;
    }
}
/**
 * Under player
 * - Object present on the stage that has coordinate and size
 * - Manages image
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - It can move by AI
 * - Manages AI by list
 * - Object that can be destroyed
 * - Object that can be damaged
 * - Implements damagable and animationable
 * - Entity that manages AI according to state and rendering by it
 * - Player function interface
 * - Entity operated by the player
 * - Under player function interface
 * - ### It can change type
 * @extends {Player}
 * @implements {IUnderPlayable}
 * @classdesc Under player that can change type
 */
class UnderPlayer extends Player /* , IUnderPlayable */ { // eslint-disable-line  no-unused-vars
    /**
     * Under player constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Currently used AI
         * @protected
         * @type {TransferableStateAI}
         */
        this.aiType = null;

        /**
         * Previous terrain ID
         * @protected
         * @type {number}
         */
        this.preTerrain = 1;
    }

    /**
     * Add AI system
     * @override
     * @param {AI} ai AI to control this
     * @param {number} priority priority of AI. If it is a positive number count from the front, if it is a negative number count from the back
     */
    addAI(ai, priority = -1) {
        if (ai instanceof TransferableStateAI) {
            this.aiType = ai;
        }
        super.addAI(ai, priority);
    }

    /**
     * Change working AI
     * @override
     * @param {number} id Terrain ID for changing player type
     * @return {boolean} Whther player is changed or not
     */
    changeType(id) {
        // initialize
        if (this.preTerrain === id) {
            return false;
        }
        // set type
        let ai = null;
        let fileName = ``;
        switch (id) {
            case 0:
                ai = new WildBaseStateAI();
                fileName = `wild.png`;
                this.body.material.frictionY = 0;
                break;
            case 1:
                ai = new NormalBaseStateAI();
                fileName = `player.png`;
                this.body.material.frictionY = 0;
                break;
            case 2:
                ai = new AdventurerBaseStateAI();
                fileName = `adventurer.png`;
                this.body.material.frictionY = 2;
                break;
            case 3:
                ai = new PropellerBaseStateAI();
                fileName = `propeller.png`;
                this.body.material.frictionY = 0;
                break;
        }
        // inspect whether it changes
        if (ai === null || this.aiType.constructor === ai.constructor) {
            return false;
        }
        if (this.image instanceof MultiAnimation) {
            this.image.setAllImageID(ResourceManager.image.load(`chara/${fileName}`));
        }
        // remove currently AI
        this.aiType.transfer(ai);
        this.removeAI(this.aiType);
        this.addAI(ai);
        this.preTerrain = id;

        return true;
    }
}
/**
 * Hook child object
 * - Object present on the stage that has coordinate and size
 * - Manages image
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - It can move by AI
 * - Manages AI by list
 * - Generated and owned by someone
 * - Object that can be destroyed
 * - It can get hook position and change state
 * - Implements hook and automatically generates post hook object
 * - ### Implements as rectangle
 * @extends {HookObject}
 * @classdesc Hook child object to implement as rectangle
 */
class HookChild extends HookObject { // eslint-disable-line  no-unused-vars
    /**
     * Hook center x position
     * @override
     * @protected
     * @return {number} Hook center x position
     */
    getHookX() {
        return this.x + this.width / 2;
    }

    /**
     * Hook center x position
     * @override
     * @protected
     * @return {number} Hook center x position
     */
    getHookY() {
        return this.y + this.height / 2;
    }

    /**
     * Initialize entity
     * @override
     */
    init() {
        super.init();
        this.setPosition(this.x + this.x - this.getHookX(), this.y + this.y - this.getHookY());
    }
}
/**
 * Hook head object
 * - Object present on the stage that has coordinate and size
 * - Manages image
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - It can move by AI
 * - Manages AI by list
 * - Generated and owned by someone
 * - Object that can be destroyed
 * - It can get hook position and change state
 * - Implements hook and automatically generates post hook object
 * - ### Implements as head
 * @extends {HookObject}
 * @classdesc Hook head object to implement as head
 */
class HookHead extends HookObject { // eslint-disable-line  no-unused-vars
    /**
     * Hook head object constructor
     * @constructor
     * @param {number} restLength Hook rest length
     * @param {number} hookedLength Hook length of hooked
     * @param {number} childID Child id for generating child
     */
    constructor(restLength, hookedLength, childID) {
        super();

        /**
         * Hook head original body
         * @protected
         * @type {RigidBody}
         */
        this.originalBody = null;

        // initialize
        this.setHookInfo(null, null, restLength, hookedLength, childID);
    }

    /**
     * Hook center x position
     * @override
     * @protected
     * @return {number} Hook center x position
     */
    getHookX() {
        return this.x + Math.abs(this.width) / 2;
    }

    /**
     * Hook center x position
     * @override
     * @protected
     * @return {number} Hook center x position
     */
    getHookY() {
        return this.y + Math.abs(this.height) / 2;
    }

    /**
     * Hooked hook
     * @override
     */
    hooked() {
        super.hooked();
        this.originalBody.enable = false;
    }

    /**
     * Release hook
     * @override
     */
    release() {
        super.release();
        this.originalBody.enable = true;
    }

    /**
     * Whether the tip of the hook
     * @override
     * @return {boolean} Whether the tip of the hook
     */
    isHead() {
        return true;
    }

    /**
     * Initialize entity
     * @override
     */
    init() {
        super.init();

        if (BaseUtil.implementsOf(this.body, IString)) {
            this.string = this.body;
            const bodies = this.string.getBodies().filter((it) => it.getEntity() === this);
            this.originalBody = bodies.length === 0 ? null : bodies[0];
        }

        if (this.owner instanceof MutableEntity) {
            this.directionX = this.owner.directionX;
            this.directionY = -1;
        }
        this.setPosition(this.x + this.x - this.getHookX(), this.y + this.y - this.getHookY());
    }
}
/**
 * Adventurer base State AI
 * - Determines the behavior of an entity
 * - Determines by state
 * - Manages state by name
 * - Basic information can be transferred to another state AI
 * - Changes special state by alias
 * - Initializes by normal state
 * - ### Initializes by adventurer state
 * @extends {NormalBaseStateAI}
 * @classdesc Adventurer base state AI to initialize by adventurer state
 */
class AdventurerBaseStateAI extends NormalBaseStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Adventurer base State AI Constructor
     * @constructor
     */
    constructor() {
        super();

        this.specialActionName = `hook`;
        for (const name in this.namedStates) {
            if (this.namedStates.hasOwnProperty(name)) {
                const state = this.namedStates[name];
                if (BaseUtil.implementsOf(state, IMovableState)) {
                    state.setMaxVelocity(state.maxVX * 7 / 6, state.maxVY * 7 / 6);
                    state.setMovePower(state.movePX * 7 / 6, state.movePY * 7 / 6);
                }
                if (BaseUtil.implementsOf(state, IPrepareState)) {
                    state.speedMagnification = state.speedMagnification * 3;
                    state.appliedPower = state.appliedPower * 5 / 4;
                }
            }
        }
        this.namedStates[`stationary`] = new AdventurerStationaryState(350, 42000);
        this.namedStates[`walk`] = new AdventurerWalkState(350, 21000);
        this.namedStates[`grab`] = new AdventurerGrabState(110, 30000);
        this.namedStates[`jumping`] = new AdventurerJumpingState(262.5, 14000);
        this.namedStates[`fall`] = new AdventurerFallState(250, 15000);
        this.namedStates[`falling`] = new AdventurerFallState(250, 15000);
        this.namedStates[`hook`] = new AdventurerHookState();
        this.namedStates[`downwall`] = new AdventurerDownWallState(250, 15000);
    }
}
/**
 * State of adventurer down wall
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - Sets max velocity and move power for moving
 * - Enable to set velocity and power
 * @extends {UnderMovableState}
 * @classdesc State of adventurer down wall
 */
class AdventurerDownWallState extends UnderMovableState { // eslint-disable-line  no-unused-vars
    /**
     * Adventurer down wall state constructor
     * @constructor
     * @param {number} maxVelocityX Maximum speed
     * @param {number} movePower The power to move in the air
     */
    constructor(maxVelocityX, movePower) {
        super(maxVelocityX, 0, movePower, 0);

        /**
         * Down wall direction
         * @protected
         * @type {number}
         */
        this.directionX = 0;

        /**
         * Down wall counter
         * @protected
         * @type {number}
         */
        this.downWallCount = 0;
    }

    /**
     * Initialize state
     * @override
     */
    init() {
        super.init();
        // Check direction
        this.entity.setDirection(-Math.sign(this.entity.body.velocityX));
        this.directionX = this.entity.directionX;
        this.downWallCount = 0;
        // push wall
        this.entity.body.enforce(-1500 * this.entity.material.mass * this.directionX, 0);
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // input
        let vx = 0;
        if (Input.key.isPressed(Input.key.left()) && this.directionX === -1) {
            vx += -1;
        }
        if (Input.key.isPressed(Input.key.right()) && this.directionX === 1) {
            vx += 1;
        }
        if (vx !== 0) {
            this.entity.body.enforce(this.movePowerX * this.entity.material.mass * vx / dt, 0);
            this.ai.changeState(`falling`);
            return true;
        }
        if (Util.onGround(this.entity)) {
            this.transitionUsualState();
            return true;
        }
        if (Input.key.isPress(Input.key.sub())) {
            // check already
            const hooks = this.entity.stage.getEntities().filter((it) => BaseUtil.implementsOf(it, IHook));
            if (hooks.length >= 1) {
                for (const it of hooks) {
                    if (it.getActor() === this.entity) {
                        it.release();
                    }
                }
            } else {
                const hook = this.entity.stage.addEntityByID(200010, {
                    x: this.entity.x + this.entity.width / 2,
                    y: this.entity.y + this.entity.height / 2,
                    z: this.entity.z - 1,
                    owner: this.entity,
                });
                if (hook instanceof MutableEntity) {
                    hook.body.enforce(900000 * this.entity.directionX / dt, -1500000 / dt);
                }
            }
        }

        // always push wall
        this.entity.body.enforce(-30000 * this.entity.material.mass * this.directionX / dt, 0);
        this.entity.setDirection(this.directionX);
        const collided = this.entity.collider.collisions.some((it) => Math.abs(it.nx) && this.directionX * it.nx < 0);
        if (collided) {
            this.downWallCount = 0;
        } else if (++this.downWallCount > 2) {
            this.entity.body.enforce(90000 * this.entity.material.mass * this.directionX / dt, 0);
            this.ai.changeState(`falling`);
        }
        return true;
    }
}
/**
 * Normal fall state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - Sets max velocity and move power for moving
 * - Enable to set velocity and power
 * - ### To falling, walk and stop
 * @extends {UnderMovableState}
 * @classdesc Normal fall state to falling, walk and stop
 */
class NormalFallState extends UnderMovableState { // eslint-disable-line  no-unused-vars
    /**
     * Normal fall state constructor
     * @constructor
     * @param {number} maxVelocityX Maximum speed
     * @param {number} movePower The power to move in the air
     */
    constructor(maxVelocityX, movePower) {
        super(maxVelocityX, 0, movePower, 0);
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // move
        this.moveByInput(dt);
        if (Util.canEnd(this.entity.getImage())) {
            this.ai.changeState(`falling`);
        }
        if (Util.onGround(this.entity)) {
            this.transitionUsualState();
        }
        return true;
    }
}
/**
 * Normal grab state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - Sets max velocity and move power for moving
 * - Enable to set velocity and power
 * - ### Manages grabed behavior
 * @extends {UnderMovableState}
 * @classdesc Normal grab state to manage grabed behavior
 */
class NormalGrabState extends UnderMovableState { // eslint-disable-line  no-unused-vars
    /**
     * Normal grab state constructor
     * @constructor
     * @param {number} maxVelocityX Maximum speed
     * @param {number} walkPower The power to walk
     */
    constructor(maxVelocityX, walkPower) {
        super(maxVelocityX, 0, walkPower, 0);

        /**
         * Count for action
         * @protected
         * @type {number}
         */
        this.underCount = 0;

        /**
         * Amount of indicating difference of height
         * @protected
         * @type {number}
         */
        this.underDiffY = 12;

        /**
         * Player at registered entity
         * @protected
         * @type {IUnderPlayable}
         */
        this.player = null;
    }

    /**
     * Type changed function
     * @protected
     */
    changed() {
        this.restoreCollider();
    }

    /**
     * Change collider for grab action
     * @protected
     */
    grabCollider() {
        const aabb = this.entity.collider.getAABB();
        this.entity.collider.fixBound(aabb.startX - this.entity.x, aabb.startY + this.underDiffY - this.entity.y, aabb.endX - this.entity.x, aabb.endY - this.entity.y);
    }

    /**
     * Restore collider information
     * @protected
     */
    restoreCollider() {
        const aabb = this.entity.collider.getAABB();
        this.entity.collider.fixBound(aabb.startX - this.entity.x, aabb.startY - this.underDiffY - this.entity.y, aabb.endX - this.entity.x, aabb.endY - this.entity.y);
    }

    /**
     * Judged whether or not the state continues
     * @protected
     * @return {boolean} Whether or not the state continues
     */
    judgeContinue() {
        if (++this.underCount <= 5) {
            return true;
        }

        // check collision
        this.restoreCollider();
        const check = this.entity.stage.getPhysicalWorld().getCollisionData(this.entity.collider).some((it) => it.collided.collider.isResponse(this.entity) && it.ny < -0.5);
        if (check) {
            this.grabCollider();
            return true;
        }

        // restore
        this.entity.image.init();
        this.transitionUsualState();
        return false;
    }

    /**
     * Walk whle grab state
     * @protected
     * @param {number} dt Delta time
     */
    grabWalk(dt) {
        const moved = this.moveByInput(dt);
        if (moved) {
            if (this.entity.getImage() instanceof GameAnimation) {
                this.entity.getImage().restore();
            }
            if (this.ai.getStateID() === `grab`) {
                this.entity.image.init();
            }
            if (this.ai.changeState(`grabwalk`)) {
                // restore
                this.restoreCollider();
            }
        } else {
            if (this.entity.getImage() instanceof GameAnimation) {
                this.entity.getImage().pause();
            }
        }
    }

    /**
     * Initialize state
     * @override
     */
    init() {
        // set image
        const image = this.entity.getImage();
        if (image instanceof NamedAnimation) {
            image.setName(this.ai.getStateID());
        }
        if (image instanceof GameAnimation) {
            image.restore();
        }
        this.underCount = 0;
        this.grabCollider();

        if (BaseUtil.implementsOf(this.entity, IUnderPlayable)) {
            this.player = this.entity;
        }
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        const image = this.entity.getImage();
        const canGrabAction = (!(image instanceof GameAnimation) || (image.isEnded() || image.isLoop()));
        // judge
        if (!Util.onGround(this.entity) || !Input.key.isPressed(Input.key.down())) {
            if (!this.judgeContinue()) {
                return true;
            }
        } else {
            this.underCount = 0;
        }
        // move
        if (canGrabAction && Util.onGround(this.entity)) {
            this.grabWalk(dt);
        }
        // grab action
        if (canGrabAction && Util.onGround(this.entity)) {
            // change
            const ground = Util.getUnderEntity(this.entity);
            if (BaseUtil.implementsOf(ground, ITerrain)) {
                if (this.player.changeType(ground.getTerrainID())) {
                    this.changed();
                    return true;
                }
            }
        }
        return true;
    }
}
/**
 * Normal jumping state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - Sets max velocity and move power for moving
 * - Enable to set velocity and power
 * - ### To fall, walk and stop
 * @extends {UnderMovableState}
 * @classdesc Normal jumping state to fall, walk and stop
 */
class NormalJumpingState extends UnderMovableState { // eslint-disable-line  no-unused-vars
    /**
     * Normal jumping state constructor
     * @constructor
     * @param {number} maxVelocityX Maximum speed
     * @param {number} movePower The power to move in the air
     */
    constructor(maxVelocityX, movePower) {
        super(maxVelocityX, 0, movePower, 0);
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // move
        this.moveByInput(dt);
        if (this.entity.body.velocityY > 0) {
            this.ai.changeState(`fall`);
        }
        if (Util.onGround(this.entity)) {
            this.transitionUsualState();
        }
        return true;
    }
}
/**
 * Normal stationary state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - Sets max velocity and move power for moving
 * - Enable to set velocity and power
 * - ### To walk, jump, grab, attack, special and fall
 * @extends {UnderMovableState}
 * @classdesc Normal stationary state to walk, jump, grab, attack, special and fall
 */
class NormalStationaryState extends UnderMovableState { // eslint-disable-line  no-unused-vars
    /**
     * Normal stationary state constructor
     * @constructor
     * @param {number} maxVelocityX Maximum speed
     * @param {number} walkPower The power to walk
     */
    constructor(maxVelocityX, walkPower) {
        super(maxVelocityX, 0, walkPower, 0);

        /**
         * Falling count
         * @protected
         * @type {number}
         */
        this.fallCount = 0;
    }

    /**
     * Initialize state
     * @override
     */
    init() {
        super.init();
        this.fallCount = 0;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // move
        const moved = this.moveByInput(dt);
        if (moved) {
            this.ai.changeState(`walk`);
        }
        if (Util.onGround(this.entity)) {
            if (Input.key.isPressed(Input.key.down())) {
                this.ai.changeState(`grab`);
            }
            if (Input.key.isPressed(Input.key.up())) {
                if (moved) {
                    this.ai.changeState(`walkjump`);
                } else {
                    this.ai.changeState(`jump`);
                }
            }
            if (Input.key.isPress(Input.key.yes())) {
                this.ai.changeState(`attack`);
            }
            if (Input.key.isPress(Input.key.sub())) {
                this.ai.changeState(`special`);
            }
            this.fallCount = 0;
        } else {
            if (++this.fallCount > 2) {
                this.ai.changeState(`fall`);
            }
        }
        return true;
    }
}
/**
 * Normal walk state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - Sets max velocity and move power for moving
 * - Enable to set velocity and power
 * - ### To stop, jump, grab, attack, special and fall
 * @extends {UnderMovableState}
 * @classdesc Normal walk state to stop, jump, grab, attack, special and fall
 */
class NormalWalkState extends UnderMovableState { // eslint-disable-line  no-unused-vars
    /**
     * Normal walk state constructor
     * @constructor
     * @param {number} maxVelocityX Maximum speed
     * @param {number} walkPower The power to walk
     */
    constructor(maxVelocityX, walkPower) {
        super(maxVelocityX, 0, walkPower, 0);

        /**
         * Falling count
         * @protected
         * @type {number}
         */
        this.fallCount = 0;
    }

    /**
     * Initialize state
     * @override
     */
    init() {
        super.init();
        this.fallCount = 0;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // input
        const input = this.moveByInput(dt);
        // stationary
        if (!input) {
            this.ai.changeState(`stationary`);
        }
        if (Util.onGround(this.entity)) {
            if (Input.key.isPressed(Input.key.down())) {
                this.ai.changeState(`grab`);
            }
            if (Input.key.isPressed(Input.key.up())) {
                this.ai.changeState(`walkjump`);
            }
            if (Input.key.isPress(Input.key.yes())) {
                this.ai.changeState(`attack`);
            }
            if (Input.key.isPress(Input.key.sub())) {
                this.ai.changeState(`special`);
            }
            this.fallCount = 0;
        } else {
            if (++this.fallCount > 2) {
                this.ai.changeState(`fall`);
            }
        }
        return true;
    }
}
/**
 * Propeller jump state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - Sets max velocity and move power for moving
 * - Enable to set velocity and power
 * - ### It not transitate falling and can fly
 * @extends {UnderMovableState}
 * @classdesc Propeller jump state that can fly
 */
class PropellerJumpingState extends UnderMovableState { // eslint-disable-line  no-unused-vars
    /**
     * Propeller jump state constructor
     * @constructor
     * @param {number} maxVeocityX Maximum speed x vector
     * @param {number} maxVeocityY Maximum speed y vector
     * @param {number} movePowerX Force of x direction applied when moving
     * @param {number} movePowerY Force of y direction applied when moving
     */
    constructor(maxVelocityX, maxVelocityY, movePowerX, movePowerY) {
        super(maxVelocityX, maxVelocityY, movePowerX, movePowerY);

        /**
         * Amount of indicating difference of height
         * @protected
         * @type {number}
         */
        this.propellerDiffY = 8;
    }

    /**
     * Move y direction by input
     * @override
     * @protected
     * @param {number} vy y direction
     * @param {number} dt Delta time
     */
    moveY(vy, dt) {
        if (this.entity.body.velocityY * vy < 0 || Math.abs(this.entity.body.velocityY) < Math.abs(this.maxVelocityY)) {
            const power = vy === 1 ? this.movePowerY / 10 : this.movePowerY;
            this.entity.body.enforce(0, power * this.entity.material.mass * vy / dt);
        }
    }

    /**
     * Initialize state
     * @override
     */
    init() {
        super.init();
        if (this.entity.getImage() instanceof GameAnimation) {
            this.entity.getImage().restore();
        }
        const aabb = this.entity.collider.getAABB();
        this.entity.collider.fixBound(aabb.startX - this.entity.x, aabb.startY - this.propellerDiffY - this.entity.y, aabb.endX - this.entity.x, aabb.endY - this.entity.y);
    }

    /**
     * Update state
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        super.update(dt);
        if (this.entity.getImage() !== null) {
            this.entity.getImage().update(dt * 3);
        }
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        this.moveByInput(dt);
        if (Util.onGround(this.entity)) {
            this.transitionUsualState();
            // restore
            const aabb = this.entity.collider.getAABB();
            this.entity.collider.fixBound(aabb.startX - this.entity.x, aabb.startY + this.propellerDiffY - this.entity.y, aabb.endX - this.entity.x, aabb.endY - this.entity.y);
        }
        return true;
    }
}
/**
 * Adventurer fall state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - Sets max velocity and move power for moving
 * - Enable to set velocity and power
 * - To falling, walk and stop
 * - ### It can release and drag hook and down wall
 * @extends {NormalFallState}
 * @classdesc Adventurer fall state that can release hook and down wall
 */
class AdventurerFallState extends NormalFallState { // eslint-disable-line  no-unused-vars
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // down wall check
        let vx = 0;
        if (Input.key.isPressed(Input.key.left())) {
            vx += -1;
        }
        if (Input.key.isPressed(Input.key.right())) {
            vx += 1;
        }
        // down wall
        if (vx !== 0) {
            for (const it of this.entity.collider.collisions) {
                if (Math.abs(it.nx) > 0.5 && vx * it.nx > 0 && it.colliding.collider.isResponse(it.collided.collider) && it.collided.collider.isResponse(it.colliding.collider)) {
                    this.ai.changeState(`downwall`);
                    this.entity.body.enforce(this.movePowerX * this.entity.material.mass * vx / dt, 0);
                    return true;
                }
            }
        }
        // drag hook
        if (Input.key.isPressed(Input.key.up())) {
            for (const it of this.entity.collider.collisions) {
                const you = Util.getCollidedEntity(this.entity, it);
                if (BaseUtil.implementsOf(you, IHook) && !you.isHead() && you.getActor() === this.entity) {
                    if (you.tryRemove()) {
                        return true;
                    }
                }
            }
        }
        // release hook
        if (Input.key.isPress(Input.key.sub())) {
            const hooks = this.entity.stage.getEntities().filter((it) => BaseUtil.implementsOf(it, IHook));
            if (hooks.length >= 1) {
                for (const it of hooks) {
                    if (it.getActor() === this.entity) {
                        it.release();
                    }
                }
            }
        }
        return super.apply(dt);
    }
}
/**
 * Adventurer grab state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - Sets max velocity and move power for moving
 * - Enable to set velocity and power
 * - Manages grabed behavior
 * - ### If entity changed, all hook is released
 * @extends {NormalGrabState}
 * @classdesc Adventurer grab state that relase all hook if entity changed
 */
class AdventurerGrabState extends NormalGrabState { // eslint-disable-line  no-unused-vars
    /**
     * Type changed function
     * @override
     * @protected
     */
    changed() {
        super.changed();

        // auto release
        const hooks = this.entity.stage.getEntities().filter((it) => BaseUtil.implementsOf(it, IHook));
        for (const it of hooks) {
            if (it.getActor() === this.entity) {
                it.release();
            }
        }
    }
}
/**
 * Adventurer jump state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - Sets max velocity and move power for moving
 * - Enable to set velocity and power
 * - To fall, walk and stop
 * - ### It can drag hook
 * @extends {NormalJumpingState}
 * @classdesc Adventurer jump state that can drag hook
 */
class AdventurerJumpingState extends NormalJumpingState { // eslint-disable-line  no-unused-vars
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // drag hook
        if (Input.key.isPressed(Input.key.up())) {
            for (const it of this.entity.collider.collisions) {
                const you = Util.getCollidedEntity(this.entity, it);
                if (BaseUtil.implementsOf(you, IHook) && !you.isHead() && you.getActor() === this.entity) {
                    if (you.tryRemove()) {
                        return true;
                    }
                }
            }
        }
        // release hook
        if (Input.key.isPress(Input.key.sub())) {
            const hooks = this.entity.stage.getEntities().filter((it) => BaseUtil.implementsOf(it, IHook));
            if (hooks.length >= 1) {
                for (const it of hooks) {
                    if (it.getActor() === this.entity) {
                        it.release();
                    }
                }
            }
        }
        return super.apply(dt);
    }
}
/**
 * Adventurer stationary state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - Sets max velocity and move power for moving
 * - Enable to set velocity and power
 * - To walk, jump, grab, attack, special and fall
 * - ### It can drag hook
 * @extends {NormalStationaryState}
 * @classdesc Adventurer stationary state that can drag hook
 */
class AdventurerStationaryState extends NormalStationaryState { // eslint-disable-line  no-unused-vars
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // drag hook
        if (Input.key.isPressed(Input.key.up())) {
            for (const it of this.entity.collider.collisions) {
                const you = Util.getCollidedEntity(this.entity, it);
                if (BaseUtil.implementsOf(you, IHook) && !you.isHead() && you.getActor() === this.entity) {
                    if (you.tryRemove()) {
                        return true;
                    }
                }
            }
        }
        return super.apply(dt);
    }
}
/**
 * Adventurer walk state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - Sets max velocity and move power for moving
 * - Enable to set velocity and power
 * - To stop, jump, grab, attack, special and fall
 * - ### It can drag hook
 * @implements {NormalWalkState}
 * @classdesc Adventurer walk state that can drag hok
 */
class AdventurerWalkState extends NormalWalkState { // eslint-disable-line  no-unused-vars
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // drag hook
        if (Input.key.isPressed(Input.key.up())) {
            for (const it of this.entity.collider.collisions) {
                const you = Util.getCollidedEntity(this.entity, it);
                if (BaseUtil.implementsOf(you, IHook) && !you.isHead() && you.getActor() === this.entity) {
                    if (you.tryRemove()) {
                        return true;
                    }
                }
            }
        }
        return super.apply(dt);
    }
}
GameDebugger.debug = true;
// Play title scene
new EditorBuilder().build().execute(new EditorScene());
