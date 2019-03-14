/**
 * Curtain stage
 * - Store stage size
 * - Performs updating and rendering stage
 * - Manages stage element such as entity
 * - Delegates other stage
 * - ### In charge of the stage transition by curtain
 * @extends {DelegateStage}
 * @classdesc Curtain stage in charge of the stage transition by curtain
 */
class CurtainStage extends DelegateStage {
    /**
     * Curtain stage constructor
     * @constructor
     * @param {Stage} baseStage Base stage for delegation
     * @param {number} nameTime Time for staying name
     * @param {number} transitionTIme Transition counter
     */
    constructor(baseStage, nameTime, transitionTIme) {
        super(baseStage);

        /**
         * Time for staying name
         * @protected
         * @type {number}
         */
        this.nameTime = nameTime;
        /**
         * Transition time
         * @protected
         * @type {number}
         */
        this.transitionTIme = transitionTIme;
        /**
         * Transition counter
         * @protected
         * @type {number}
         */
        this.transitionCount = 0;
    }

    /**
     * Initialize stage
     * @override
     */
    init() {
        super.init();
        // disable stage
        this.setEnable(false);
        // set timer
        this.transitionCount = this.transitionTIme + this.nameTime;
    }

    /**
     * Update stage
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        super.update(dt);

        this.transitionCount -= dt / 1000;
        if (this.transitionCount < 0) {
            this.setEnable(true);
            StageManager.it.replaceStageDirectry(this.baseStage);
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

        const per = this.transitionCount < this.transitionTIme ? Math.cos(Math.PI / 2 * (this.transitionTIme - this.transitionCount)) : 1;
        ctx.fillRect(0, 0, GameScreen.it.width, GameScreen.it.height * per, `black`);
        ctx.fillText(this.baseStage.name, GameScreen.it.width / 2, GameScreen.it.height * (per - 0.5), 0.5, 0.5, 40, `white`);
    }
}
