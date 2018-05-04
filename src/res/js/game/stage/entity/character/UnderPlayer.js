/**
 * Under player
 * - Object present on the stage that has coordinate and size
 * - Has image ID
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
        if (this.aiType == null) {
            for (let it of this.ai) {
                if (it instanceof PlayerBaseStateAI) {
                    this.aiType = it;
                    break;
                }
            }
        }
        if (this.preTerrain == id) {
            return false;
        }
        // set type
        let ai = null;
        switch (id) {
            case 0:
                ai = new WildBaseStateAI();
                this.image.setImageID(ResourceManager.image.load(`chara/wild.png`));
                if (this.body.material.frictionY != 0) {
                    this.body.setMaterial(new ImmutableRigidMaterial(this.body.material.k, this.body.material.frictionX, 0));
                }
                break;
            case 1:
                ai = new NormalBaseStateAI();
                this.image.setImageID(ResourceManager.image.load(`chara/player.png`));
                if (this.body.material.frictionY != 0) {
                    this.body.setMaterial(new ImmutableRigidMaterial(this.body.material.k, this.body.material.frictionX, 0));
                }
                break;
            case 2:
                ai = new AdventurerBaseStateAI();
                this.image.setImageID(ResourceManager.image.load(`chara/adventurer.png`));
                if (this.body.material.frictionY != 2) {
                    this.body.setMaterial(new ImmutableRigidMaterial(this.body.material.k, this.body.material.frictionX, 2));
                }
                break;
            case 3:
                ai = new PropellerBaseStateAI();
                this.image.setImageID(ResourceManager.image.load(`chara/propeller.png`));
                if (this.body.material.frictionY != 0) {
                    this.body.setMaterial(new ImmutableRigidMaterial(this.body.material.k, this.body.material.frictionX, 0));
                }
                break;
        }
        // inspect whether it changes
        if (ai == null || this.aiType.constructor == ai.constructor) {
            return false;
        }
        // remove currently AI
        this.aiType.transfer(ai);
        this.removeAI(this.aiType);
        this.addAI(ai);
        this.preTerrain = id;

        return true;
    }
}
