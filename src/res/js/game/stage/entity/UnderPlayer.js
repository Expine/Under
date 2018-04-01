/**
 * Under player object
 * Entities operated by the player
 * @extends {Player}
 * @classdesc Under player object to operate by input
 */
class UnderPlayer extends Player /* , UnderPlayable */ { // eslint-disable-line  no-unused-vars
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
     * @override
     * @param {number} id Terrain ID for changing player type
     * @return {bool} Whther player is changed or not
     */
    changeType(id) {
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
        switch (id) {
            case 0:
                ai = new WildBaseStateAI();
                this.imageID = ContextImage.it.loadImage(`chara/wild.png`);
                break;
            case 1:
                ai = new NormalBaseStateAI();
                this.imageID = ContextImage.it.loadImage(`chara/player.png`);
                break;
        }
        // inspect whether it changes
        if (this.aiType.constructor == ai.constructor || ai == null) {
            return false;
        }
        // remove currently AI
        this.aiType.transfer(ai);
        this.removeAI(this.aiType);
        this.addAI(ai);

        return true;
    }
}
