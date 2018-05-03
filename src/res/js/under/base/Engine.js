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
         * Event manager
         * @protected
         * @type {EventManager}
         */
        this.events = null;
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
     * Set event manager
     * @param {EventManager} events Event manager
     */
    setEventManager(events) {
        this.events = events;
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
 * Whether it is debug mode or not
 * @static
 * @type {boolean}
 */
Engine.debug = true;
