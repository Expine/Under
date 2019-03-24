import { Player } from "../../../../under/extend/stage/entity/character/Player";
import { IUnderPlayable } from "../interface/IUnderPlayable";
import { ITerrain } from "../interface/ITerrain";
import { AI } from "../../../../under/base/stage/ai/AI";
import { TransferableStateAI } from "../../ai/TransferabletateAI";
import { ResourceManager } from "../../../../under/base/resources/ResourceManager";
import { MultiAnimation } from "../../../../under/base/resources/image/MultiAnimation";
import { NormalBaseStateAI } from "../../ai/player/normal/NormalBaseStateAI";
import { PropellerBaseStateAI } from "../../ai/player/propeller/PropellerBaseStateAI";
import { WildBaseStateAI } from "../../ai/player/wild/WildBaseStateAI";
import { AdventurerBaseStateAI } from "../../ai/player/adventurer/AdventurerBaseStateAI";

/**
 * Under player
 * - It can change type
 * @extends {Player}
 * @implements {IUnderPlayable}
 * @classdesc Under player that can change type
 */
export class UnderPlayer extends Player implements IUnderPlayable, ITerrain {
    /**
     * Currently used AI
     * @protected
     * @type {TransferableStateAI}
     */
    protected aiType: TransferableStateAI | null;

    /**
     * Previous terrain ID
     * @protected
     * @type {number}
     */
    protected preTerrain: number;
    /**
     * Under player constructor
     * @constructor
     */
    constructor() {
        super();

        this.aiType = null;
        this.preTerrain = 1;
    }

    /**
     * Get terrain ID
     * @override
     * @return {number} Terrain ID
     */
    getTerrainID(): number {
        return this.preTerrain;
    }

    /**
     * Take over information
     * @override
     * @param {Object} target Target element
     */
    takeOver(target: object) {
        super.takeOver(target);
        if (target instanceof UnderPlayer && target.image !== null) {
            target.changeType(this.preTerrain);
            target.image.update(10000);
        }
    }

    /**
     * Add AI system
     * @override
     * @param {AI} ai AI to control this
     * @param {number} priority priority of AI. If it is a positive number count from the front, if it is a negative number count from the back
     */
    addAI(ai: AI, priority: number | null) {
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
    changeType(id: number): boolean {
        console.log("Change: " + id);
        // initialize
        if (this.preTerrain === id) {
            return false;
        }
        // set type
        let ai = null;
        let fileName = ``;
        let frictionY = 0;
        switch (id) {
            case 0:
                ai = new WildBaseStateAI();
                fileName = `wild.png`;
                frictionY = 0;
                break;
            case 1:
                ai = new NormalBaseStateAI();
                fileName = `player.png`;
                frictionY = 0;
                break;
            case 2:
                ai = new AdventurerBaseStateAI();
                fileName = `adventurer.png`;
                frictionY = 2;
                break;
            case 3:
                ai = new PropellerBaseStateAI();
                fileName = `propeller.png`;
                frictionY = 0;
                break;
        }
        if (this.body !== null && this.body.material !== null) {
            this.body.material.frictionY = frictionY;
        }
        // inspect whether it changes
        if (ai === null || this.aiType === null || this.aiType.constructor === ai.constructor) {
            return false;
        }
        if (this.image instanceof MultiAnimation) {
            this.image.setAllImageID(ResourceManager.image.load(`chara/${fileName}`));
        }
        // remove currently AI
        if (this.aiType !== null) {
            this.aiType.transfer(ai);
            this.removeAI(this.aiType);
        }
        this.addAI(ai, null);
        this.preTerrain = id;

        return true;
    }
}
