/**
 * Under player object
 * Entities operated by the player
 * @extends {Player}
 * @classdesc Under player object to operate by input
 */
class UnderPlayer extends Player { // eslint-disable-line  no-unused-vars
    /**
     * Under player constructor
     * @constructor
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} width object width
     * @param {number} height object height
     * @param {number} imageID image ID for rendering
     */
    constructor(x, y, width, height, imageID) {
        super(x, y, width, height, imageID);

        /**
         * Currently used AI
         * @protected
         * @type {TransferableStateAI}
         */
        this.aiType = null;
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
     * @param {UnderTileObject} ground Ground object
     */
    changeType(ground) {
        // check ground
        if (ground.terrainID === undefined) {
            return;
        }
        // initialize
        if (this.aiType == null) {
            for (let it of this.ai) {
                if (it instanceof PlayerBaseStateAI) {
                    this.aiType = it;
                    break;
                }
            }
        }
        // set type
        let ai = null;
        let id = ground.terrainID;
        switch (id) {
            case 0:
                ai = new WildBaseStateAI();
                break;
            case 1:
                ai = new NormalBaseStateAI();
                break;
        }
        // inspect whether it changes
        if (this.aiType.constructor == ai.constructor || ai == null) {
            return;
        }
        // remove currently AI
        this.aiType.transfer(ai);
        this.removeAI(this.aiType);
        this.addAI(ai);
    }
}
