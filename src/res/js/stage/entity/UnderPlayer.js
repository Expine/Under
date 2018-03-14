/**
 * Under player object
 * Entities operated by the player
 * @implements {StateCharacter}
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

        this.addAI(new UnderStateAI(this), 0);

        /**
         * Currently used AI
         * @type {AI}
         */
        this.aiType = this.ai[1];
    }

    /**
     * Change working AI
     * @param {UnderTileObject} ground Ground object
     */
    changeType(ground) {
        // set type
        let ai = null;
        let id = ground.getGlobalID();
        //        console.log(`Tile ID is ${id}`);
        switch (id) {
            case 0:
                ai = new WildBaseStateAI(this);
                break;
            case 1:
                ai = new PlayerBaseStateAI(this);
                break;
        }
        // inspect whether it changes
        if (this.aiType == ai || ai == null) {
            return;
        }
        // remove currently AI
        this.removeAI(this.aiType);
        this.addAI(ai);
        this.aiType = ai;
    }
}
